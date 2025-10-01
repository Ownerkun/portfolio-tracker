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
      {/* Single Row Layout */}
      <View style={styles.row}>
        {/* Asset Icon */}
        <View style={styles.iconColumn}>
          <Text style={styles.assetIcon}>
            {getAssetIcon(asset.asset_type?.name)}
          </Text>
        </View>

        {/* Symbol */}
        <View style={styles.symbolColumn}>
          <Text style={styles.symbol}>{asset.symbol}</Text>
        </View>

        {/* Current Price */}
        <View style={styles.priceColumn}>
          <Text style={styles.currentPrice}>
            {formatCurrency(asset.current_price || 0)}
          </Text>
        </View>

        {/* Profit/Loss */}
        <View style={styles.plColumn}>
          <View style={styles.plContainer}>
            <MaterialIcons
              name={asset.profit_loss >= 0 ? "trending-up" : "trending-down"}
              size={16}
              color={asset.profit_loss >= 0 ? "#4CAF50" : "#f44336"}
            />
            <View style={styles.plTextContainer}>
              <Text
                style={[
                  styles.plAmount,
                  { color: asset.profit_loss >= 0 ? "#4CAF50" : "#f44336" },
                ]}
              >
                {formatCurrency(asset.profit_loss || 0)}
              </Text>
              <Text
                style={[
                  styles.plPercentage,
                  { color: asset.profit_loss >= 0 ? "#4CAF50" : "#f44336" },
                ]}
              >
                {formatPercentage(asset.profit_loss_percentage || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Chevron */}
        <View style={styles.chevronColumn}>
          <MaterialIcons name="chevron-right" size={20} color="#999" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconColumn: {
    width: 40,
    alignItems: "center",
  },
  assetIcon: {
    fontSize: 20,
  },
  symbolColumn: {
    flex: 1,
    marginLeft: 12,
  },
  symbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  priceColumn: {
    width: 80,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  plColumn: {
    width: 100,
    alignItems: "flex-end",
    marginRight: 8,
  },
  plContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  plTextContainer: {
    marginLeft: 4,
    alignItems: "flex-end",
  },
  plAmount: {
    fontSize: 12,
    fontWeight: "600",
  },
  plPercentage: {
    fontSize: 10,
    fontWeight: "500",
  },
  chevronColumn: {
    width: 20,
    alignItems: "center",
  },
});

export default AssetCard;
