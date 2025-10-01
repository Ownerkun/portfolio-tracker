import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  enrichedMockAssets,
  calculatePortfolioSummary,
  mockAssetTypes,
} from "../../data/mockData";
import { MaterialIcons } from "@expo/vector-icons";

const PortfolioScreen = () => {
  const portfolioSummary = calculatePortfolioSummary();

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

  const getAssetsByType = (assetTypeId) => {
    return enrichedMockAssets.filter(
      (asset) => asset.asset_type_id === assetTypeId
    );
  };

  const calculateAllocationByType = () => {
    return mockAssetTypes
      .map((type) => {
        const typeAssets = getAssetsByType(type.id);
        const typeValue = typeAssets.reduce(
          (sum, asset) => sum + (asset.total_value || 0),
          0
        );
        const percentage =
          portfolioSummary.totalValue > 0
            ? (typeValue / portfolioSummary.totalValue) * 100
            : 0;

        return {
          type,
          value: typeValue,
          percentage,
          count: typeAssets.length,
        };
      })
      .filter((item) => item.value > 0);
  };

  const allocationData = calculateAllocationByType();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio Overview</Text>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Portfolio Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Value:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(portfolioSummary.totalValue)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Cost:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(portfolioSummary.totalCost)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total P&L:</Text>
          <Text
            style={[
              styles.summaryValue,
              {
                color:
                  portfolioSummary.totalProfitLoss >= 0 ? "#4CAF50" : "#f44336",
              },
            ]}
          >
            {formatCurrency(portfolioSummary.totalProfitLoss)} (
            {formatPercentage(portfolioSummary.totalProfitLossPercentage)})
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Assets:</Text>
          <Text style={styles.summaryValue}>
            {portfolioSummary.totalAssets}
          </Text>
        </View>
      </View>

      <View style={styles.allocationSection}>
        <Text style={styles.sectionTitle}>Asset Allocation</Text>
        {allocationData.map((item, index) => (
          <View key={item.type.id} style={styles.allocationItem}>
            <View style={styles.allocationHeader}>
              <Text style={styles.assetType}>
                {item.type.icon} {item.type.name}
              </Text>
              <Text style={styles.allocationValue}>
                {formatCurrency(item.value)} ({item.percentage.toFixed(1)}%)
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${item.percentage}%` }]}
              />
            </View>
            <Text style={styles.assetCount}>
              {item.count} asset{item.count !== 1 ? "s" : ""}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.topPerformers}>
        <Text style={styles.sectionTitle}>Top Performers</Text>
        {enrichedMockAssets
          .filter((asset) => asset.profit_loss_percentage > 0)
          .sort((a, b) => b.profit_loss_percentage - a.profit_loss_percentage)
          .slice(0, 3)
          .map((asset, index) => (
            <View key={asset.id} style={styles.performerItem}>
              <View style={styles.performerInfo}>
                <Text style={styles.performerSymbol}>{asset.symbol}</Text>
                <Text style={styles.performerName}>{asset.name}</Text>
              </View>
              <View style={styles.performerStats}>
                <MaterialIcons name="trending-up" size={20} color="#4CAF50" />
                <Text style={styles.positiveReturn}>
                  +{asset.profit_loss_percentage.toFixed(2)}%
                </Text>
              </View>
            </View>
          ))}
      </View>
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
  summaryCard: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  allocationSection: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  allocationItem: {
    marginBottom: 20,
  },
  allocationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  assetType: {
    fontSize: 14,
    fontWeight: "600",
  },
  allocationValue: {
    fontSize: 14,
    color: "#666",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6200EA",
    borderRadius: 4,
  },
  assetCount: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  topPerformers: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  performerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  performerInfo: {
    flex: 1,
  },
  performerSymbol: {
    fontSize: 16,
    fontWeight: "bold",
  },
  performerName: {
    fontSize: 12,
    color: "#666",
  },
  performerStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  positiveReturn: {
    color: "#4CAF50",
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default PortfolioScreen;
