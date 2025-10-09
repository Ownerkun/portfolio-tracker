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
  const { asset } = route.params;
  const { user } = useAuth();
  const { refreshUserAssets } = useAssets();
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [assetWithRealTimeData, setAssetWithRealTimeData] = useState(asset);

  const fetchTransactions = useCallback(async () => {
    if (!user || !asset.id) return;

    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("asset_id", asset.id)
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Failed to load transactions");
    }
  }, [user, asset.id]);

  const fetchAssetWithRealTimeData = useCallback(async () => {
    if (!user || !asset.id) return;

    try {
      // Refresh the entire portfolio to get updated data
      await refreshUserAssets();

      // The updated asset data will be in the AssetContext
      // We'll rely on the parent to pass the correct data
    } catch (error) {
      console.error("Error fetching asset data:", error);
    }
  }, [user, asset.id, refreshUserAssets]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchTransactions(), fetchAssetWithRealTimeData()]);
    setRefreshing(false);
  }, [fetchTransactions, fetchAssetWithRealTimeData]);

  useEffect(() => {
    console.log(
      `State updated - transactions: ${transactions.length}, refreshing: ${refreshing}`
    );
  }, [transactions, refreshing]);

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
    navigation.navigate("AddTransaction", { asset: assetWithRealTimeData });
  };

  const handleEditTransaction = (transaction) => {
    navigation.navigate("EditTransaction", {
      asset: assetWithRealTimeData,
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

              // Refresh transactions list and asset data using AssetContext
              await Promise.all([fetchTransactions(), refreshUserAssets()]);

              Alert.alert("Success", "Transaction deleted successfully");
            } catch (error) {
              console.error("Error deleting transaction:", error);
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
          asset={assetWithRealTimeData}
          formatCurrency={formatCurrency}
          formatPercentage={formatPercentage}
        />

        {/* Asset Details Grid */}
        <AssetDetailsGrid
          asset={assetWithRealTimeData}
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
