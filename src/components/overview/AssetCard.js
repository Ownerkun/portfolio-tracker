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
    switch (assetType) {
      case "Stock":
        return "📈";
      case "Cryptocurrency":
        return "₿";
      case "Mutual Fund":
        return "📊";
      case "Bond":
        return "🏦";
      case "Real Estate":
        return "🏠";
      case "Commodity":
        return "🪙";
      default:
        return "💼";
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.assetInfo}>
          <Text style={styles.assetIcon}>
            {getAssetIcon(asset.asset_type?.name)}
          </Text>
          <View>
            <Text style={styles.symbol}>{asset.symbol}</Text>
            <Text style={styles.name}>{asset.name}</Text>
          </View>
        </View>
        <View style={styles.values}>
          <Text style={styles.totalValue}>
            {formatCurrency(asset.total_value || 0)}
          </Text>
          <Text style={styles.quantity}>
            {asset.quantity}{" "}
            {asset.asset_type?.name === "Cryptocurrency" ? "coins" : "shares"}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Avg. Buy Price:</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(asset.average_buy_price)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Current Price:</Text>
          <Text style={styles.detailValue}>
            {formatCurrency(asset.current_price || 0)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>P&L:</Text>
          <View style={styles.plContainer}>
            <MaterialIcons
              name={asset.profit_loss >= 0 ? "trending-up" : "trending-down"}
              size={16}
              color={asset.profit_loss >= 0 ? "#4CAF50" : "#f44336"}
            />
            <Text
              style={[
                styles.plValue,
                { color: asset.profit_loss >= 0 ? "#4CAF50" : "#f44336" },
              ]}
            >
              {formatCurrency(asset.profit_loss || 0)} (
              {formatPercentage(asset.profit_loss_percentage || 0)})
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  assetInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  assetIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  name: {
    fontSize: 12,
    color: "#666",
  },
  values: {
    alignItems: "flex-end",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: 12,
    color: "#666",
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  plContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  plValue: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default AssetCard;
