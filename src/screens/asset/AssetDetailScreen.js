import React, { useState, useEffect, useCallback } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import { useAssets } from "../../AssetContext";
import AssetHeader from "../../components/assetDetail/AssetHeader";
import AssetDetailsGrid from "../../components/assetDetail/AssetDetailsGrid";
import styles from "../../components/assetDetail/AssetDetailScreen.styles";
import TransactionList from "../../components/transaction/TransactionList";

const AssetDetailScreen = ({ route, navigation }) => {
  const { asset: initialAsset } = route.params;
  const { user } = useAuth();
  const { refreshUserAssets, userAssets } = useAssets(); // Add userAssets from context
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentAsset, setCurrentAsset] = useState(initialAsset); // Use currentAsset state

  // Function to fetch updated asset data
  const fetchUpdatedAsset = useCallback(async () => {
    if (!user || !initialAsset.id) return;

    try {
      // Get the latest asset data from the database
      const { data: updatedAsset, error } = await supabase
        .from("user_assets")
        .select(
          `
          *,
          market_assets (
            symbol,
            name,
            asset_type_id,
            asset_types (name)
          )
        `
        )
        .eq("id", initialAsset.id)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;

      if (updatedAsset) {
        // Also get current price for the asset
        const symbol = updatedAsset.market_assets?.symbol;
        let currentPrice = 0;

        if (symbol) {
          // Find the current price from the context's userAssets
          const contextAsset = userAssets.find(
            (a) => a.market_assets?.symbol === symbol || a.symbol === symbol
          );
          currentPrice = contextAsset?.current_price || 0;
        }

        // Calculate derived values
        const totalValue = currentPrice * updatedAsset.quantity;
        const totalCost =
          updatedAsset.average_buy_price * updatedAsset.quantity;
        const profitLoss = totalValue - totalCost;
        const profitLossPercentage =
          totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

        const enrichedAsset = {
          ...updatedAsset,
          current_price: currentPrice,
          total_value: totalValue,
          profit_loss: profitLoss,
          profit_loss_percentage: profitLossPercentage,
          asset_type: updatedAsset.market_assets?.asset_types,
          symbol: updatedAsset.market_assets?.symbol || updatedAsset.symbol,
          name: updatedAsset.market_assets?.name || updatedAsset.name,
        };

        setCurrentAsset(enrichedAsset);
        return enrichedAsset;
      }
    } catch (error) {
      console.error("Error fetching updated asset:", error);
    }
  }, [user, initialAsset.id, userAssets]);

  const fetchTransactions = useCallback(async () => {
    if (!user || !initialAsset.id) return;

    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("asset_id", initialAsset.id)
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Failed to load transactions");
    }
  }, [user, initialAsset.id]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      fetchTransactions(),
      fetchUpdatedAsset(),
      refreshUserAssets(), // Also refresh the global context
    ]);
    setRefreshing(false);
  }, [fetchTransactions, fetchUpdatedAsset, refreshUserAssets]);

  // Refresh when screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchUpdatedAsset();
      fetchTransactions();
    });

    return unsubscribe;
  }, [navigation, fetchUpdatedAsset, fetchTransactions]);

  // Also refresh when the route params change
  useEffect(() => {
    if (route.params?.asset && route.params.asset.id !== currentAsset.id) {
      setCurrentAsset(route.params.asset);
    }
  }, [route.params?.asset]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value?.toFixed(2) || "0.00"}%`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddTransaction = () => {
    navigation.navigate("AddTransaction", { asset: currentAsset });
  };

  const handleEditTransaction = (transaction) => {
    navigation.navigate("EditTransaction", {
      asset: currentAsset,
      transaction,
    });
  };

  const handleDeleteTransaction = async (transactionId) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setRefreshing(true);

              const { error } = await supabase
                .from("transactions")
                .delete()
                .eq("id", transactionId)
                .eq("user_id", user.id);

              if (error) throw error;

              // Refresh both transactions and asset data
              await Promise.all([
                fetchTransactions(),
                fetchUpdatedAsset(),
                refreshUserAssets(),
              ]);

              Alert.alert("Success", "Transaction deleted successfully");
            } catch (error) {
              console.error("Error deleting transaction:", error);
              Alert.alert("Error", "Failed to delete transaction");
            } finally {
              setRefreshing(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Asset Header */}
        <AssetHeader
          asset={currentAsset}
          formatCurrency={formatCurrency}
          formatPercentage={formatPercentage}
        />

        {/* Asset Details Grid */}
        <AssetDetailsGrid
          asset={currentAsset}
          formatCurrency={formatCurrency}
        />

        {/* Transactions Section */}
        <TransactionList
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button for Add Transaction */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddTransaction}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default AssetDetailScreen;
