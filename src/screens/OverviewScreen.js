import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  calculatePortfolioSummary,
  enrichedMockAssets,
} from "../data/mockData";
import AssetAllocationChart from "../components/AssetAllocationChart";
import AssetCard from "../components/AssetCard";

const OverviewScreen = ({ navigation }) => {
  const { profile } = useAuth();
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

  const handleAssetPress = (asset) => {
    navigation.navigate("AssetDetail", { asset });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio Overview</Text>
        {profile && (
          <Text style={styles.welcomeText}>
            Welcome back, {profile.username}!
          </Text>
        )}
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Portfolio Summary Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="attach-money" size={30} color="#4CAF50" />
            <Text style={styles.statValue}>
              {formatCurrency(portfolioSummary.totalValue)}
            </Text>
            <Text style={styles.statLabel}>Total Portfolio Value</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons
              name={
                portfolioSummary.totalProfitLoss >= 0
                  ? "trending-up"
                  : "trending-down"
              }
              size={30}
              color={
                portfolioSummary.totalProfitLoss >= 0 ? "#4CAF50" : "#f44336"
              }
            />
            <Text
              style={[
                styles.statValue,
                {
                  color:
                    portfolioSummary.totalProfitLoss >= 0
                      ? "#4CAF50"
                      : "#f44336",
                },
              ]}
            >
              {formatCurrency(portfolioSummary.totalProfitLoss)}
            </Text>
            <Text style={styles.statLabel}>Total P&L</Text>
            <Text
              style={[
                styles.statPercentage,
                {
                  color:
                    portfolioSummary.totalProfitLoss >= 0
                      ? "#4CAF50"
                      : "#f44336",
                },
              ]}
            >
              {formatPercentage(portfolioSummary.totalProfitLossPercentage)}
            </Text>
          </View>
        </View>

        {/* Asset Allocation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset Allocation</Text>
          <AssetAllocationChart />
        </View>

        {/* Assets List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Assets</Text>
            <Text style={styles.assetCount}>
              {enrichedMockAssets.length} assets
            </Text>
          </View>

          {enrichedMockAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onPress={() => handleAssetPress(asset)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
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
  scrollContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  statPercentage: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  section: {
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  assetCount: {
    fontSize: 14,
    color: "#666",
  },
});

export default OverviewScreen;
