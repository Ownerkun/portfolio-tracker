import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./AssetDetailScreen.styles";
import { getAssetColor, getAssetIcon } from "../../utils/assetHelper";

const AssetHeader = ({ asset, formatCurrency, formatPercentage }) => {
  const assetColor = getAssetColor(asset.asset_type?.name);
  const isProfitable = asset.profit_loss >= 0;

  return (
    <View style={styles.header}>
      <View
        style={[styles.iconContainer, { backgroundColor: `${assetColor}15` }]}
      >
        <MaterialIcons
          name={getAssetIcon(asset.asset_type?.name)}
          size={32}
          color={assetColor}
        />
      </View>

      <View style={styles.headerInfo}>
        <Text style={styles.assetSymbol}>{asset.symbol}</Text>
        <Text style={styles.assetName}>{asset.name}</Text>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.totalValue}>
          {formatCurrency(asset.total_value || 0)}
        </Text>
        <View
          style={[
            styles.plBadge,
            { backgroundColor: isProfitable ? "#10B98115" : "#EF444415" },
          ]}
        >
          <MaterialIcons
            name={isProfitable ? "arrow-drop-up" : "arrow-drop-down"}
            size={16}
            color={isProfitable ? "#10B981" : "#EF4444"}
          />
          <Text
            style={[
              styles.plText,
              { color: isProfitable ? "#10B981" : "#EF4444" },
            ]}
          >
            {formatPercentage(asset.profit_loss_percentage || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AssetHeader;
