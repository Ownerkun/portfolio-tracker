import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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

  const renderAssetItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.assetItem,
        selectedAsset?.id === item.id && styles.selectedAssetItem,
      ]}
      onPress={() => handleAssetSelect(item)}
    >
      <View style={styles.assetInfo}>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
        <Text style={styles.assetName}>{item.name}</Text>
      </View>
      <View style={styles.assetTypeBadge}>
        <Text style={styles.assetTypeText}>{item.type}</Text>
      </View>
      {selectedAsset?.id === item.id && (
        <MaterialIcons name="check-circle" size={20} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#6C757D" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by symbol or name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#ADB5BD"
        />
      </View>

      {/* Asset List */}
      <FlatList
        data={filteredAssets}
        renderItem={renderAssetItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={48} color="#CED4DA" />
            <Text style={styles.emptyText}>No assets found</Text>
            <Text style={styles.emptySubtext}>
              Try searching with different keywords
            </Text>
          </View>
        }
      />

      {/* Add Button */}
      {selectedAsset && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddAsset}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <MaterialIcons name="add" size={20} color="#FFFFFF" />
                <Text style={styles.addButtonText}>
                  Add {selectedAsset.symbol}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1A1A1A",
  },
  listContent: {
    padding: 16,
  },
  assetItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedAssetItem: {
    borderColor: "#3B82F6",
    borderWidth: 2,
    backgroundColor: "#F0F7FF",
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  assetName: {
    fontSize: 14,
    color: "#6C757D",
  },
  assetTypeBadge: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  assetTypeText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C757D",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ADB5BD",
    marginTop: 4,
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default AddAssetScreen;
