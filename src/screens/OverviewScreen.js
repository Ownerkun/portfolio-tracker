import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
} from "react-native";
import { useAuth } from "../AuthContext";
import { supabase } from "../services/supabase/supabase";
import { useAssets } from "../AssetContext";
import { useFocusEffect } from "@react-navigation/native";
import PortfolioStats from "../components/overview/PortfolioStats";
import AssetAllocationChart from "../components/overview/AssetAllocationChart";
import AssetCard from "../components/overview/AssetCard";
import AddAssetButton from "../components/overview/AddAssetButton";

const OverviewScreen = ({ navigation }) => {
  const { user, profile } = useAuth();
  const {
    userAssets,
    pricesLoading,
    lastPriceUpdate,
    refreshUserAssets,
    refreshPrices,
  } = useAssets();
  const [refreshing, setRefreshing] = useState(false);

  // Refresh prices when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      if (user) {
        refreshPrices(); // Only refresh prices, not the entire user assets
      }
    }, [user, refreshPrices])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshUserAssets(); // Full refresh on pull-to-refresh
    setRefreshing(false);
  };

  const handleAssetPress = (asset) => {
    navigation.navigate("AssetDetail", { asset });
  };

  const handleAddAsset = () => {
    navigation.navigate("AddAsset");
  };

  const handleViewTransactions = (asset) => {
    navigation.navigate("AssetDetail", { asset });
  };

  const handleAddTransaction = (asset) => {
    navigation.navigate("AddTransaction", { asset });
  };

  const handleRemoveAsset = async (assetId) => {
    try {
      const { error } = await supabase
        .from("user_assets")
        .delete()
        .eq("id", assetId)
        .eq("user_id", user.id);

      if (error) throw error;

      // Refresh assets list using AssetContext
      await refreshUserAssets();

      Alert.alert(
        "Asset Removed",
        "The asset has been removed from your portfolio.",
        [{ text: "OK" }]
      );
    } catch (error) {
      console.error("Error removing asset:", error);
      Alert.alert("Error", "Failed to remove asset. Please try again.", [
        { text: "OK" },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        {profile && <Text style={styles.welcomeText}>{profile.username}</Text>}
        {lastPriceUpdate && (
          <Text style={styles.lastUpdated}>
            Last updated: {lastPriceUpdate.toLocaleTimeString()}
          </Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Portfolio Summary Cards - Pass userAssets as prop */}
        <PortfolioStats userAssets={userAssets} />

        {/* Asset Allocation - Pass userAssets as prop */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allocation</Text>
          <AssetAllocationChart userAssets={userAssets} />
        </View>

        {/* Assets List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Holdings</Text>
            <AddAssetButton onPress={handleAddAsset} />
          </View>

          {/* Assets List - Using userAssets from AssetContext */}
          {userAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onPress={() => handleAssetPress(asset)}
              onViewTransactions={handleViewTransactions}
              onAddTransaction={handleAddTransaction}
              onRemoveAsset={handleRemoveAsset}
            />
          ))}

          {userAssets.length === 0 && !pricesLoading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No assets in your portfolio</Text>
              <Text style={styles.emptySubtext}>
                Add your first asset to get started
              </Text>
            </View>
          )}
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
  lastUpdated: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 2,
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
  emptyState: {
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#6C757D",
    fontWeight: "600",
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#6C757D",
  },
  bottomSpacing: {
    height: 20,
  },
});

export default OverviewScreen;
