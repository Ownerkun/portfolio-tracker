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
import { useRealTimeAssets } from "../hooks/useRealTimeAssets";
import { useFocusEffect } from "@react-navigation/native";
import PortfolioStats from "../components/overview/PortfolioStats";
import AssetAllocationChart from "../components/overview/AssetAllocationChart";
import AssetCard from "../components/overview/AssetCard";
import AddAssetButton from "../components/overview/AddAssetButton";

const OverviewScreen = ({ navigation }) => {
  const { user, profile } = useAuth();
  const { assets, loading, refreshAssets, lastUpdated } = useRealTimeAssets(
    user?.id
  );
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshAssets();
    }, [refreshAssets])
  );

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

      // Refresh assets list
      await refreshAssets();

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

  const onRefresh = async () => {
    await refreshAssets();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio</Text>
        {profile && <Text style={styles.welcomeText}>{profile.username}</Text>}
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
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
            <AddAssetButton onPress={handleAddAsset} />
          </View>

          {/* Assets List */}
          {assets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onPress={() => handleAssetPress(asset)}
              onViewTransactions={handleViewTransactions}
              onAddTransaction={handleAddTransaction}
              onRemoveAsset={handleRemoveAsset}
            />
          ))}

          {assets.length === 0 && !loading && (
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
