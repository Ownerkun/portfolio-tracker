const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function populateAssets() {
  try {
    // First, get asset types from database to map correctly
    const { data: assetTypes, error: typesError } = await supabase
      .from("asset_types")
      .select("id, name");

    if (typesError) throw typesError;

    // Create mapping from name to UUID
    const typeMap = {};
    assetTypes.forEach((type) => {
      typeMap[type.name.toLowerCase()] = type.id;
    });

    console.log("Asset type mapping:", typeMap);

    // Fetch data from APIs
    const [
      stocksResponse,
      cryptoResponse,
      etfsResponse,
      fundsResponse,
      commoditiesResponse,
    ] = await Promise.all([
      fetch("https://api.twelvedata.com/stocks?apikey=demo").then((r) =>
        r.json()
      ),
      fetch("https://api.twelvedata.com/cryptocurrencies?apikey=demo").then(
        (r) => r.json()
      ),
      fetch("https://api.twelvedata.com/etf?apikey=demo").then((r) => r.json()),
      fetch("https://api.twelvedata.com/funds?apikey=demo").then((r) =>
        r.json()
      ),
      fetch("https://api.twelvedata.com/commodities?apikey=demo").then((r) =>
        r.json()
      ),
    ]);

    // Helper function to safely extract data array
    const getDataArray = (response, path = "data") => {
      let data = response;
      const paths = path.split(".");

      for (const p of paths) {
        if (data && data[p] !== undefined) {
          data = data[p];
        } else {
          console.warn(`Path '${path}' not found in response`);
          return [];
        }
      }

      return Array.isArray(data) ? data : [];
    };

    // Map assets with proper fallbacks for missing data
    const allAssets = [
      // Stocks → 'Stock'
      ...getDataArray(stocksResponse, "data").map((a) => ({
        symbol: a.symbol,
        name: a.name,
        asset_type_id: typeMap["stock"],
        asset_type: a.type || "Stock", // Fallback value
        exchange: a.exchange,
        currency: a.currency || "USD",
        data_source: "twelvedata",
        is_active: true,
      })),

      // Crypto → 'Cryptocurrency'
      ...getDataArray(cryptoResponse, "data").map((a) => ({
        symbol: a.symbol.replace("/USD", ""),
        name: a.currency_base,
        asset_type_id: typeMap["cryptocurrency"],
        asset_type: "Cryptocurrency",
        currency: "USD",
        data_source: "twelvedata",
        is_active: true,
      })),

      // ETFs → 'ETF'
      ...getDataArray(etfsResponse, "data").map((a) => ({
        symbol: a.symbol,
        name: a.name,
        asset_type_id: typeMap["etf"],
        asset_type: a.type || "ETF",
        exchange: a.exchange,
        currency: a.currency || "USD",
        data_source: "twelvedata",
        is_active: true,
      })),

      // Funds → 'Mutual Fund'
      ...getDataArray(fundsResponse, "result.list").map((a) => ({
        symbol: a.symbol,
        name: a.name,
        asset_type_id: typeMap["mutual fund"],
        asset_type: a.type || "Mutual Fund", // Fallback value
        exchange: a.exchange,
        currency: a.currency || "USD",
        data_source: "twelvedata",
        is_active: true,
      })),

      // Commodities → 'Commodity'
      ...getDataArray(commoditiesResponse, "data").map((a) => ({
        symbol: a.symbol,
        name: a.name,
        asset_type_id: typeMap["commodity"],
        asset_type: a.category || "Commodity",
        data_source: "twelvedata",
        is_active: true,
      })),
    ];

    console.log(`Total assets prepared: ${allAssets.length}`);

    // Remove duplicates within the same dataset (fixes ON CONFLICT error)
    const uniqueAssets = [];
    const seenSymbols = new Set();

    for (const asset of allAssets) {
      if (asset.symbol && asset.name && !seenSymbols.has(asset.symbol)) {
        seenSymbols.add(asset.symbol);
        uniqueAssets.push(asset);
      }
    }

    console.log(`Unique assets (after deduplication): ${uniqueAssets.length}`);

    // Ensure ALL assets have required fields
    const validAssets = uniqueAssets.map((asset) => ({
      ...asset,
      asset_type: asset.asset_type || "Unknown", // Ensure never null
      currency: asset.currency || "USD",
      exchange: asset.exchange || null,
      is_active: asset.is_active !== undefined ? asset.is_active : true,
    }));

    // Insert in smaller batches to avoid timeout
    const BATCH_SIZE = 500; // Reduced from 1000
    let totalInserted = 0;
    let failedBatches = 0;

    for (let i = 0; i < validAssets.length; i += BATCH_SIZE) {
      const batch = validAssets.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;

      console.log(`Inserting batch ${batchNumber} (${batch.length} assets)...`);

      try {
        const { data, error } = await supabase
          .from("market_assets")
          .upsert(batch, { onConflict: "symbol" })
          .select();

        if (error) {
          console.error(`❌ Batch ${batchNumber} error:`, error.message);
          failedBatches++;

          // Try individual inserts for failed batch
          await insertIndividualAssets(batch, batchNumber);
        } else {
          totalInserted += data?.length || 0;
          console.log(
            `✅ Batch ${batchNumber} completed: ${data?.length || 0} assets`
          );
        }
      } catch (batchError) {
        console.error(`❌ Batch ${batchNumber} failed:`, batchError.message);
        failedBatches++;
      }

      // Small delay between batches to avoid overwhelming the database
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`🎉 Successfully processed ${totalInserted} assets total`);
    console.log(`❌ Failed batches: ${failedBatches}`);
  } catch (error) {
    console.error("Overall error:", error);
  }
}

// Helper function for individual asset insertion
async function insertIndividualAssets(assets, batchNumber) {
  let individualSuccess = 0;
  let individualErrors = 0;

  for (const asset of assets) {
    try {
      const { error } = await supabase
        .from("market_assets")
        .upsert(asset, { onConflict: "symbol" });

      if (error) {
        console.log(
          `   Individual insert failed for ${asset.symbol}:`,
          error.message
        );
        individualErrors++;
      } else {
        individualSuccess++;
      }
    } catch (error) {
      console.log(
        `   Individual insert error for ${asset.symbol}:`,
        error.message
      );
      individualErrors++;
    }
  }

  console.log(
    `   Individual results: ${individualSuccess} success, ${individualErrors} errors`
  );
}

populateAssets();
