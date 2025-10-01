import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { enrichedMockAssets } from "../../data/mockData";
import { MaterialIcons } from "@expo/vector-icons";

const AssetsScreen = () => {
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Assets</Text>
        <Text style={styles.subtitle}>
          {enrichedMockAssets.length} assets in portfolio
        </Text>
      </View>

      <View style={styles.assetsList}>
        {enrichedMockAssets.map((asset) => (
          <TouchableOpacity key={asset.id} style={styles.assetCard}>
            <View style={styles.assetHeader}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetIconText}>
                  {getAssetIcon(asset.asset_type?.name)}
                </Text>
              </View>
              <View style={styles.assetInfo}>
                <Text style={styles.assetSymbol}>{asset.symbol}</Text>
                <Text style={styles.assetName}>{asset.name}</Text>
              </View>
              <View style={styles.assetValue}>
                <Text style={styles.currentValue}>
                  {formatCurrency(asset.total_value || 0)}
                </Text>
                <Text style={styles.quantity}>
                  {asset.quantity}{" "}
                  {asset.asset_type?.name === "Cryptocurrency"
                    ? "coins"
                    : "shares"}
                </Text>
              </View>
            </View>

            <View style={styles.assetDetails}>
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
                    name={
                      asset.profit_loss >= 0 ? "trending-up" : "trending-down"
                    }
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

            {asset.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{asset.notes}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Add New Asset</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  assetsList: {
    padding: 20,
  },
  assetCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  assetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 18,
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  assetName: {
    fontSize: 12,
    color: "#666",
  },
  assetValue: {
    alignItems: "flex-end",
  },
  currentValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantity: {
    fontSize: 12,
    color: "#666",
  },
  assetDetails: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  notesContainer: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  notesText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#6200EA",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginTop: 0,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});

export default AssetsScreen;
