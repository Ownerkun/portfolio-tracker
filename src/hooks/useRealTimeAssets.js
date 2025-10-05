import { useState, useEffect, useCallback } from "react";
import { twelvedataAPI } from "../services/api/twelvedataAPI";
import { supabase } from "../services/supabase/supabase";

export const useRealTimeAssets = (userId) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch user assets from Supabase
  const fetchUserAssets = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);

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

  // Fetch real-time prices and enrich assets
  const fetchRealTimePrices = useCallback(async (userAssets) => {
    if (!userAssets || userAssets.length === 0) return [];

    try {
      // Extract unique symbols
      const symbols = [
        ...new Set(
          userAssets.map((asset) => asset.market_assets?.symbol).filter(Boolean)
        ),
      ];

      if (symbols.length === 0) return userAssets;

      // Fetch current prices
      const prices = await twelvedataAPI.getMultiplePrices(symbols);

      // Enrich assets with real-time data
      const enrichedAssets = userAssets.map((asset) => {
        const symbol = asset.market_assets?.symbol;
        const currentPrice = prices[symbol] || asset.current_price || 0;
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

      return enrichedAssets;
    } catch (err) {
      console.error("Error fetching real-time prices:", err);
      setError(err.message);
      return userAssets; // Return original assets if price fetch fails
    }
  }, []);

  // Load assets and prices
  const loadAssets = useCallback(async () => {
    try {
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
    setLoading(true);
    await loadAssets();
  }, [loadAssets]);

  // Initial load
  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      loadAssets();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [loadAssets]);

  return {
    assets,
    loading,
    error,
    lastUpdated,
    refreshAssets,
  };
};
