import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./AddAssetScreen.styles";

const AssetListItem = ({ item, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.assetItem, isSelected && styles.selectedAssetItem]}
      onPress={() => onSelect(item)}
    >
      <View style={styles.assetInfo}>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
        <Text style={styles.assetName}>{item.name}</Text>
      </View>
      <View style={styles.assetTypeBadge}>
        <Text style={styles.assetTypeText}>{item.type}</Text>
      </View>
      {isSelected && (
        <MaterialIcons name="check-circle" size={20} color="#3B82F6" />
      )}
    </TouchableOpacity>
  );
};

export default AssetListItem;
