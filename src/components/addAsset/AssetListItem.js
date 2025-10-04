import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./AddAssetScreen.styles";

const AssetListItem = ({ item, isSelected, onSelect }) => {
  // Get display type from asset_types relationship or fallback to asset_type
  const displayType = item.asset_types?.name || item.asset_type;

  return (
    <TouchableOpacity
      style={[styles.assetItem, isSelected && styles.selectedAssetItem]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.assetInfo}>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
        <Text style={styles.assetName}>{item.name}</Text>
        {item.exchange && (
          <Text style={styles.assetExchange}>{item.exchange}</Text>
        )}
      </View>
      <View style={styles.assetTypeBadge}>
        <Text style={styles.assetTypeText}>{displayType}</Text>
      </View>
      {isSelected && (
        <MaterialIcons name="check-circle" size={20} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );
};

export default AssetListItem;
