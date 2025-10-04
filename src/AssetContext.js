import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "./services/supabase/supabase";

const AssetsContext = createContext();

export const useAssets = () => {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetsProvider");
  }
  return context;
};

export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

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

  // Clear search results
  const clearSearch = () => {
    setSearchResults([]);
  };

  // Refresh assets list
  const refreshAssets = () => {
    return fetchAllAssets();
  };

  useEffect(() => {
    fetchAllAssets();
  }, []);

  const value = {
    assets,
    searchResults,
    loading,
    searchLoading,
    error,

    fetchAllAssets,
    searchAssets,
    getAssetBySymbol,
    getAssetsByType,
    clearSearch,
    refreshAssets,
  };

  return (
    <AssetsContext.Provider value={value}>{children}</AssetsContext.Provider>
  );
};
