import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "./services/supabase/supabase";
import { twelvedataAPI } from "./services/api/twelvedataAPI";
import { useAuth } from "./AuthContext";

const AssetsContext = createContext();

export const useAssets = () => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetsProvider");
  }
  return context;
};

export const AssetsProvider = ({ children }) => {
  const { user } = useAuth();

  // Asset data states
  const [assets, setAssets] = useState([]);
  const [userAssets, setUserAssets] = useState([]);
  const [userAssetsWithPrices, setUserAssetsWithPrices] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(false);

  // Other states
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null);

  // Fetch all assets (with pagination for large datasets)
  const fetchAllAssets = async (limit = 1000) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("market_assets")
        .select(
          `
          *,
          asset_types (
            name,
            description
          )
        `
        )
        .eq("is_active", true)
        .order("symbol")
        .limit(limit);

      if (error) throw error;

      setAssets(data || []);
      return data || [];
    } catch (err) {
      console.error("Error fetching assets:", err);
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Search assets by symbol or name
  const searchAssets = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      return [];
    }

    setSearchLoading(true);

    try {
      const searchTerm = `%${query.trim()}%`;

      const { data, error } = await supabase
        .from("market_assets")
        .select(
          `
          *,
          asset_types (
            name,
            description
          )
        `
        )
        .or(`symbol.ilike.${searchTerm},name.ilike.${searchTerm}`)
        .eq("is_active", true)
        .order("symbol")
        .limit(50);

      if (error) throw error;

      const results = data || [];
      setSearchResults(results);
      return results;
    } catch (err) {
      console.error("Error searching assets:", err);
      setError(err.message);
      return [];
    } finally {
      setSearchLoading(false);
    }
  };

  // Get asset by symbol
  const getAssetBySymbol = async (symbol) => {
    try {
      const { data, error } = await supabase
        .from("market_assets")
        .select(
          `
          *,
          asset_types (
            name,
            description
          )
        `
        )
        .eq("symbol", symbol.toUpperCase())
        .eq("is_active", true)
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Error fetching asset by symbol:", err);
      return null;
    }
  };

  // Get assets by type
  const getAssetsByType = async (assetType) => {
    try {
      const { data, error } = await supabase
        .from("market_assets")
        .select(
          `
          *,
          asset_types (
            name,
            description
          )
        `
        )
        .eq("asset_types.name", assetType)
        .eq("is_active", true)
        .order("symbol")
        .limit(200);

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching assets by type:", err);
      return [];
    }
  };

  // Fetch user assets from Supabase (without prices)
  const fetchUserAssets = useCallback(async () => {
    if (!user) {
      setUserAssets([]);
      setUserAssetsWithPrices([]);
      return [];
    }

    try {
      const { data: userAssets, error: assetsError } = await supabase
        .from("user_assets")
        .select(
          `
          *,
          market_assets (
            symbol,
            name,
            asset_type_id,
            asset_types (name)
          )
        `
        )
        .eq("user_id", user.id);

      if (assetsError) throw assetsError;

      const assets = userAssets || [];
      setUserAssets(assets);
      return assets;
    } catch (err) {
      console.error("Error fetching user assets:", err);
      setError(err.message);
      return [];
    }
  }, [user]);

  // Fetch real-time prices only
  const fetchRealTimePrices = useCallback(
    async (assetsToUpdate = userAssets) => {
      if (!assetsToUpdate || assetsToUpdate.length === 0) {
        setUserAssetsWithPrices([]);
        return [];
      }

      setPricesLoading(true);
      try {
        // Extract unique symbols
        const symbols = [
          ...new Set(
            assetsToUpdate
              .map((asset) => asset.market_assets?.symbol)
              .filter(Boolean)
          ),
        ];

        if (symbols.length === 0) {
          setUserAssetsWithPrices(assetsToUpdate);
          return assetsToUpdate;
        }

        // Fetch current prices
        const prices = await twelvedataAPI.getMultiplePrices(symbols);

        // Enrich assets with real-time data
        const enrichedAssets = assetsToUpdate.map((asset) => {
          const symbol = asset.market_assets?.symbol || asset.symbol;
          const currentPrice = prices[symbol] || 0;
          const totalValue = currentPrice * asset.quantity;
          const totalCost = asset.average_buy_price * asset.quantity;
          const profitLoss = totalValue - totalCost;
          const profitLossPercentage =
            totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

          return {
            ...asset,
            current_price: currentPrice,
            total_value: totalValue,
            profit_loss: profitLoss,
            profit_loss_percentage: profitLossPercentage,
            asset_type: asset.market_assets?.asset_types,
          };
        });

        setUserAssetsWithPrices(enrichedAssets);
        setLastPriceUpdate(new Date());
        return enrichedAssets;
      } catch (err) {
        console.error("Error fetching real-time prices:", err);
        setError(err.message);
        // Return assets without prices if API fails
        setUserAssetsWithPrices(assetsToUpdate);
        return assetsToUpdate;
      } finally {
        setPricesLoading(false);
      }
    },
    [userAssets]
  );

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
  };

  // Combined refresh - fetches user assets and prices
  const refreshUserAssets = useCallback(async () => {
    const assets = await fetchUserAssets();
    return await fetchRealTimePrices(assets);
  }, [fetchUserAssets, fetchRealTimePrices]);

  // Refresh only prices (faster)
  const refreshPrices = useCallback(async () => {
    return await fetchRealTimePrices();
  }, [fetchRealTimePrices]);

  // Refresh assets list
  const refreshAssets = () => {
    return fetchAllAssets();
  };

  // Initialize user assets when user changes
  useEffect(() => {
    if (user) {
      fetchUserAssets();
    } else {
      setUserAssets([]);
      setUserAssetsWithPrices([]);
    }
  }, [user, fetchUserAssets]);

  useEffect(() => {
    fetchAllAssets();
  }, []);

  const value = {
    // Market assets
    assets,
    searchResults,
    loading,
    searchLoading,
    error,

    // User portfolio assets
    userAssets: userAssetsWithPrices, // Use the enriched version
    userAssetsRaw: userAssets, // Raw data without prices
    pricesLoading,
    lastPriceUpdate,

    // Market asset functions
    fetchAllAssets,
    searchAssets,
    getAssetBySymbol,
    getAssetsByType,
    clearSearch,

    // User asset functions
    refreshUserAssets,
    refreshPrices,
    fetchUserAssets,
  };

  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
};
