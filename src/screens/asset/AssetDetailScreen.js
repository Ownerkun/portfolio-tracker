import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { mockTransactions } from "../../data/mockData";
import TransactionList from "../../components/transaction/TransactionList";
import AssetHeader from "../../components/assetDetail/AssetHeader";
import AssetDetailsGrid from "../../components/assetDetail/AssetDetailsGrid";
import styles from "../../components/assetDetail/AssetDetailScreen.styles";

const AssetDetailScreen = ({ route, navigation }) => {
  const { asset } = route.params;
  const [transactions, setTransactions] = useState(
    mockTransactions.filter((t) => t.asset_id === asset.id)
  );

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddTransaction = () => {
    navigation.navigate("AddTransaction", { asset });
  };

  const handleEditTransaction = (transaction) => {
    navigation.navigate("AddTransaction", {
      asset,
      transaction,
      isEditing: true,
    });
  };

  const handleDeleteTransaction = (transactionId) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTransactions(transactions.filter((t) => t.id !== transactionId));
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
      >
        {/* Asset Header */}
        <AssetHeader
          asset={asset}
          formatCurrency={formatCurrency}
          formatPercentage={formatPercentage}
        />

        {/* Asset Details Grid */}
        <AssetDetailsGrid asset={asset} formatCurrency={formatCurrency} />

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
