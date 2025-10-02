import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import SearchBar from "../../components/addAsset/SearchBar";
import AssetList from "../../components/addAsset/AssetList";
import AddButton from "../../components/addAsset/AddButton";
import styles from "../../components/addAsset/AddAssetScreen.styles";

// Mock data for available assets - this will be replaced with API call
const mockAvailableAssets = [
  { id: "1", symbol: "AAPL", name: "Apple Inc.", type: "Stock" },
  { id: "2", symbol: "GOOGL", name: "Alphabet Inc.", type: "Stock" },
  { id: "3", symbol: "MSFT", name: "Microsoft Corporation", type: "Stock" },
  { id: "4", symbol: "TSLA", name: "Tesla Inc.", type: "Stock" },
  { id: "5", symbol: "AMZN", name: "Amazon.com Inc.", type: "Stock" },
  { id: "6", symbol: "BTC", name: "Bitcoin", type: "Cryptocurrency" },
  { id: "7", symbol: "ETH", name: "Ethereum", type: "Cryptocurrency" },
  {
    id: "8",
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    type: "Mutual Fund",
  },
  {
    id: "9",
    symbol: "BND",
    name: "Vanguard Total Bond Market ETF",
    type: "Bond",
  },
];

const AddAssetScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filter assets based on search query
  const filteredAssets = mockAvailableAssets.filter(
    (asset) =>
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
  };

  const handleAddAsset = () => {
    if (!selectedAsset) return;

    // Typically make an API call to add the asset to the user's portfolio
    // For now, just navigate back to Overview
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Asset List */}
      <AssetList
        assets={filteredAssets}
        selectedAsset={selectedAsset}
        onAssetSelect={handleAssetSelect}
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
