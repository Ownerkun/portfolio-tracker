import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { useAssets } from "../../AssetContext";
import SearchBar from "../../components/addAsset/SearchBar";
import AssetList from "../../components/addAsset/AssetList";
import AddButton from "../../components/addAsset/AddButton";
import styles from "../../components/addAsset/AddAssetScreen.styles";

const AddAssetScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayAssets, setDisplayAssets] = useState([]);

  const {
    assets,
    searchAssets,
    searchResults,
    searchLoading,
    clearSearch,
    loading: assetsLoading,
  } = useAssets();

  // Load initial assets when component mounts
  useEffect(() => {
    if (assets && assets.length > 0) {
      // Show top 50 assets initially, sorted by symbol
      setDisplayAssets(assets.slice(0, 50));
    }
  }, [assets]);

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timeoutId = setTimeout(async () => {
        const results = await searchAssets(searchQuery);
        setSelectedAsset(null);
        setDisplayAssets(results);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      // Reset to initial list when search is cleared
      clearSearch();
      setDisplayAssets(assets.slice(0, 50));
      setSelectedAsset(null);
    }
  }, [searchQuery, assets]);

  const handleAssetSelect = (asset) => {
    // Toggle selection - if same asset clicked, unselect it
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(null);
    } else {
      setSelectedAsset(asset);
    }
  };

  const handleAddAsset = async () => {
    if (!selectedAsset) return;

    setLoading(true);
    try {
      // Add to user's portfolio
      const { data, error } = await supabase
        .from("user_assets")
        .insert([
          {
            user_id: user.id,
            market_asset_id: selectedAsset.id,
            asset_type_id: selectedAsset.asset_type_id,
            symbol: selectedAsset.symbol,
            name: selectedAsset.name,
            quantity: 0,
            average_buy_price: 0,
          },
        ])
        .select();

      if (!error) {
        navigation.goBack();
      } else {
        console.error("Error adding asset:", error);
      }
    } catch (error) {
      console.error("Add asset error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (assetsLoading && displayAssets.length === 0) {
    return (
      <View style={styles.container}>
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading assets...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Loading Indicator for Search */}
      {searchLoading && (
        <View style={styles.searchLoadingContainer}>
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      )}

      {/* Asset List */}
      <AssetList
        assets={displayAssets}
        selectedAsset={selectedAsset}
        onAssetSelect={handleAssetSelect}
        loading={searchLoading}
        searchQuery={searchQuery}
      />

      {/* Add Button */}
      {selectedAsset && (
        <AddButton
          selectedAsset={selectedAsset}
          loading={loading}
          onAddAsset={handleAddAsset}
        />
      )}
    </View>
  );
};

export default AddAssetScreen;
