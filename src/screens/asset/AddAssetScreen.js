import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, Text, Alert } from "react-native";
import { useAssets } from "../../AssetContext";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import SearchBar from "../../components/addAsset/SearchBar";
import AssetList from "../../components/addAsset/AssetList";
import AddButton from "../../components/addAsset/AddButton";
import styles from "../../components/addAsset/AddAssetScreen.styles";

const AddAssetScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayAssets, setDisplayAssets] = useState([]);

  const { user } = useAuth();
  const {
    assets,
    searchAssets,
    searchLoading,
    clearSearch,
    loading: assetsLoading,
  } = useAssets();

  // Load initial assets when component mounts
  useEffect(() => {
    if (assets && assets.length > 0) {
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
      clearSearch();
      if (assets && assets.length > 0) {
        setDisplayAssets(assets.slice(0, 50));
      }
      setSelectedAsset(null);
    }
  }, [searchQuery, assets]);

  const handleAssetSelect = (asset) => {
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(null);
    } else {
      setSelectedAsset(asset);
    }
  };

  const handleAddAsset = async () => {
    if (!selectedAsset || !user) return;

    setLoading(true);
    try {
      // Check if asset already exists in user's portfolio
      const { data: existingAssets, error: checkError } = await supabase
        .from("user_assets")
        .select("id")
        .eq("user_id", user.id)
        .eq("market_asset_id", selectedAsset.id);

      if (checkError) throw checkError;

      if (existingAssets && existingAssets.length > 0) {
        Alert.alert(
          "Asset Already Exists",
          `${selectedAsset.symbol} is already in your portfolio.`,
          [{ text: "OK" }]
        );
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_assets")
        .insert([
          {
            user_id: user.id,
            market_asset_id: selectedAsset.id,
            symbol: selectedAsset.symbol,
            name: selectedAsset.name,
            quantity: 0,
            average_buy_price: 0,
            asset_type_id: selectedAsset.asset_type_id,
          },
        ])
        .select();

      if (error) throw error;

      Alert.alert(
        "Success",
        `${selectedAsset.symbol} has been added to your portfolio!`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error adding asset:", error);

      let errorMessage = "Failed to add asset. Please try again.";
      if (error.code === "23502") {
        errorMessage = "Required fields are missing. Please try again.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
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
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {searchLoading && (
        <View style={styles.searchLoadingContainer}>
          <ActivityIndicator size="small" color="#3B82F6" />
          <Text style={styles.searchLoadingText}>Searching...</Text>
        </View>
      )}

      <AssetList
        assets={displayAssets}
        selectedAsset={selectedAsset}
        onAssetSelect={handleAssetSelect}
      />

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
