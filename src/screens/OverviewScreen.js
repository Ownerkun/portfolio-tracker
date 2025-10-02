import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useAuth } from "../AuthContext";
import { enrichedMockAssets } from "../data/mockData";
import PortfolioStats from "../components/overview/PortfolioStats";
import AssetAllocationChart from "../components/overview/AssetAllocationChart";
import AssetCard from "../components/overview/AssetCard";
import AddAssetButton from "../components/overview/AddAssetButton";

const OverviewScreen = ({ navigation }) => {
  const { profile } = useAuth();

  const handleAssetPress = (asset) => {
    navigation.navigate("AssetDetail", { asset });
  };

  const handleAddAsset = () => {
    navigation.navigate("AddAsset");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        {profile && <Text style={styles.welcomeText}>{profile.username}</Text>}
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Portfolio Summary Cards */}
        <PortfolioStats />

        {/* Asset Allocation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allocation</Text>
          <AssetAllocationChart />
        </View>

        {/* Assets List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Holdings</Text>
            {/* Add Asset Button */}
            <AddAssetButton onPress={handleAddAsset} />
          </View>

          {/* Assets List */}
          {enrichedMockAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onPress={() => handleAssetPress(asset)}
            />
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 50,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  scrollContent: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  welcomeText: {
    fontSize: 15,
    color: "#6C757D",
    marginTop: 4,
    fontWeight: "500",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: -0.3,
  },
  assetCount: {
    fontSize: 15,
    color: "#6C757D",
    fontWeight: "500",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default OverviewScreen;
