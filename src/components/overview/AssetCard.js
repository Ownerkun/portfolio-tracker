import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const AssetCard = ({ asset, onPress }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const getAssetIcon = (assetType) => {
    const icons = {
      Stock: "show-chart",
      Cryptocurrency: "currency-bitcoin",
      "Mutual Fund": "pie-chart",
      Bond: "account-balance",
      "Real Estate": "home",
      Commodity: "star",
    };
    return icons[assetType] || "account-balance-wallet";
  };

  const getAssetColor = (assetType) => {
    const colors = {
      Stock: "#3B82F6",
      Cryptocurrency: "#F59E0B",
      "Mutual Fund": "#8B5CF6",
      Bond: "#10B981",
      "Real Estate": "#EC4899",
      Commodity: "#EF4444",
    };
    return colors[assetType] || "#6C757D";
  };

  const assetColor = getAssetColor(asset.asset_type?.name);
  const isProfitable = asset.profit_loss >= 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.row}>
        {/* Asset Icon */}
        <View
          style={[styles.iconContainer, { backgroundColor: `${assetColor}15` }]}
        >
          <MaterialIcons
            name={getAssetIcon(asset.asset_type?.name)}
            size={20}
            color={assetColor}
          />
        </View>

        {/* Asset Info */}
        <View style={styles.assetInfo}>
          <Text style={styles.symbol}>{asset.symbol}</Text>
          <Text style={styles.assetType}>{asset.asset_type?.name}</Text>
        </View>

        {/* Values */}
        <View style={styles.valuesContainer}>
          <Text style={styles.currentPrice}>
            {formatCurrency(asset.current_price || 0)}
          </Text>
          <View style={styles.plRow}>
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
                  styles.plPercentage,
                  { color: isProfitable ? "#10B981" : "#EF4444" },
                ]}
              >
                {formatPercentage(asset.profit_loss_percentage || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Chevron */}
        <MaterialIcons name="chevron-right" size={20} color="#CED4DA" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  assetInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  assetType: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "500",
  },
  valuesContainer: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  plRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  plBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  plPercentage: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});

export default AssetCard;
