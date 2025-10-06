import { useState, useEffect, useCallback } from "react";
import { twelvedataAPI } from "../services/api/twelvedataAPI";
import { supabase } from "../services/supabase/supabase";

export const useRealTimeAssets = (userId) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchUserAssets = useCallback(async () => {
    if (!userId) return [];

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
            asset_types (
              name
            )
          )
        `
        )
        .eq("user_id", userId);

      if (assetsError) throw assetsError;

      return userAssets || [];
    } catch (err) {
      console.error("Error fetching user assets:", err);
      setError(err.message);
      return [];
    }
  }, [userId]);

  // Fetch real-time prices and calculate portfolio values
  const fetchRealTimePrices = useCallback(async (userAssets) => {
    if (!userAssets || userAssets.length === 0) return [];

    try {
      // Extract unique symbols from market_assets
      const symbols = [
        ...new Set(
          userAssets.map((asset) => asset.market_assets?.symbol).filter(Boolean)
        ),
      ];

      if (symbols.length === 0) return userAssets;

      // Fetch current prices from TwelveData API
      const prices = await twelvedataAPI.getMultiplePrices(symbols);

      // Enrich assets with real-time data and calculations
      const enrichedAssets = userAssets.map((asset) => {
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
          transaction_count: asset.transactions?.length || 0,
        };
      });

      return enrichedAssets;
    } catch (err) {
      console.error("Error fetching real-time prices:", err);
      setError(err.message);
      return userAssets; // Return original assets if price fetch fails
    }
  }, []);

  const fetchAssetTransactions = async (assetId, userId) => {
    if (!userId) return [];

    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("asset_id", assetId)
        .eq("user_id", userId)
        .order("transaction_date", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Error fetching transactions:", err);
      return [];
    }
  };

  // Load assets and prices
  const loadAssets = useCallback(async () => {
    try {
      setLoading(true);
      const userAssets = await fetchUserAssets();
      const enrichedAssets = await fetchRealTimePrices(userAssets);

      setAssets(enrichedAssets);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Error loading assets:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchUserAssets, fetchRealTimePrices]);

  // Refresh assets
  const refreshAssets = useCallback(async () => {
    await loadAssets();
  }, [loadAssets]);

  // Initial load
  useEffect(() => {
    if (userId) {
      loadAssets();
    }
  }, [userId, loadAssets]);

  // Auto-refresh every 5 minutes when user is logged in
  useEffect(() => {
    if (!userId) return;

    const interval = setInterval(() => {
      loadAssets();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [userId, loadAssets]);

  return {
    assets,
    loading,
    error,
    lastUpdated,
    refreshAssets,
  };
};
