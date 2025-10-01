import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../AuthContext";
import { enrichedMockAssets } from "../data/mockData";
import PortfolioStats from "../components/PortfolioStats";
import AssetAllocationChart from "../components/AssetAllocationChart";
import AssetCard from "../components/AssetCard";

const OverviewScreen = ({ navigation }) => {
  const { profile } = useAuth();

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
        <PortfolioStats />

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
