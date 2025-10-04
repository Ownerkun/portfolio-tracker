import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useAssets } from "../../AssetContext";
import SearchBar from "../../components/addAsset/SearchBar";
import AssetList from "../../components/addAsset/AssetList";
import AddButton from "../../components/addAsset/AddButton";
import styles from "../../components/addAsset/AddAssetScreen.styles";

const AddAssetScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  const { searchAssets, searchResults, searchLoading, clearSearch } =
    useAssets();

  // Debounced search
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timeoutId = setTimeout(() => {
        searchAssets(searchQuery);
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      clearSearch();
    }
  }, [searchQuery]);

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
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

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Loading Indicator for Search */}
      {searchLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      )}

      {/* Asset List */}
      <AssetList
        assets={searchResults}
        selectedAsset={selectedAsset}
        onAssetSelect={handleAssetSelect}
        loading={searchLoading}
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
