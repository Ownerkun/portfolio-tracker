import React from "react";
import { FlatList, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AssetListItem from "./AssetListItem";
import styles from "./AddAssetScreen.styles";

const AssetList = ({ assets, selectedAsset, onAssetSelect }) => {
  const renderAssetItem = ({ item }) => (
    <AssetListItem
      item={item}
      isSelected={selectedAsset?.id === item.id}
      onSelect={onAssetSelect}
    />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyState}>
      <MaterialIcons name="search-off" size={48} color="#CED4DA" />
      <Text style={styles.emptyText}>No assets found</Text>
      <Text style={styles.emptySubtext}>
        Try searching with different keywords
      </Text>
    </View>
  );

  return (
    <FlatList
      data={assets}
      renderItem={renderAssetItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default AssetList;
