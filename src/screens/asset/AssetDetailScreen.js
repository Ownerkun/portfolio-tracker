// AssetDetailScreen.js - Enhanced with all asset details
import React, { useState } from "react";
import { ScrollView, Alert, StyleSheet, View, Text } from "react-native";
import { mockTransactions } from "../../data/mockData";
import TransactionList from "../../components/transaction/TransactionList";
import TransactionModal from "../../components/transaction/TransactionModal";

const AssetDetailScreen = ({ route }) => {
  const { asset } = route.params;
  const [transactions, setTransactions] = useState(
    mockTransactions.filter((t) => t.asset_id === asset.id)
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [formData, setFormData] = useState({
    transaction_type: "buy",
    quantity: "",
    price_per_unit: "",
    fees: "",
    notes: "",
  });

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
    setEditingTransaction(null);
    setFormData({
      transaction_type: "buy",
      quantity: "",
      price_per_unit: "",
      fees: "",
      notes: "",
    });
    setModalVisible(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setFormData({
      transaction_type: transaction.transaction_type,
      quantity: transaction.quantity.toString(),
      price_per_unit: transaction.price_per_unit.toString(),
      fees: transaction.fees.toString(),
      notes: transaction.notes || "",
    });
    setModalVisible(true);
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

  const handleSaveTransaction = () => {
    if (!formData.quantity || !formData.price_per_unit) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newTransaction = {
      id: editingTransaction ? editingTransaction.id : Date.now().toString(),
      asset_id: asset.id,
      transaction_type: formData.transaction_type,
      quantity: parseFloat(formData.quantity),
      price_per_unit: parseFloat(formData.price_per_unit),
      fees: parseFloat(formData.fees) || 0,
      total_amount:
        parseFloat(formData.quantity) * parseFloat(formData.price_per_unit) +
        (parseFloat(formData.fees) || 0),
      transaction_date: new Date().toISOString(),
      notes: formData.notes,
    };

    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? newTransaction : t
        )
      );
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    setModalVisible(false);
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
      {/* Asset Header */}
      <View style={styles.header}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetIcon}>
            {getAssetIcon(asset.asset_type?.name)}
          </Text>
          <View style={styles.assetInfo}>
            <Text style={styles.assetSymbol}>{asset.symbol}</Text>
            <Text style={styles.assetName}>{asset.name}</Text>
          </View>
        </View>
        <Text style={styles.totalValue}>
          {formatCurrency(asset.total_value || 0)}
        </Text>
      </View>

      {/* Asset Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Asset Details</Text>

        <View style={styles.detailGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Quantity</Text>
            <Text style={styles.detailValue}>
              {asset.quantity}{" "}
              {asset.asset_type?.name === "Cryptocurrency" ? "coins" : "shares"}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Avg. Buy Price</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(asset.average_buy_price)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Current Price</Text>
            <Text style={styles.detailValue}>
              {formatCurrency(asset.current_price || 0)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Total P&L</Text>
            <Text
              style={[
                styles.detailValue,
                { color: asset.profit_loss >= 0 ? "#4CAF50" : "#f44336" },
              ]}
            >
              {formatCurrency(asset.profit_loss || 0)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>P&L %</Text>
            <Text
              style={[
                styles.detailValue,
                {
                  color:
                    asset.profit_loss_percentage >= 0 ? "#4CAF50" : "#f44336",
                },
              ]}
            >
              {formatPercentage(asset.profit_loss_percentage || 0)}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Asset Type</Text>
            <Text style={styles.detailValue}>
              {asset.asset_type?.name || "Unknown"}
            </Text>
          </View>
        </View>
      </View>

      {/* Transactions Section */}
      <TransactionList
        transactions={transactions}
        onAddTransaction={handleAddTransaction}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      {/* Transaction Modal */}
      <TransactionModal
        visible={modalVisible}
        editingTransaction={editingTransaction}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveTransaction}
        onCancel={() => setModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  assetHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  assetIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  assetInfo: {
    alignItems: "center",
  },
  assetSymbol: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  assetName: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  detailItem: {
    width: "48%",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});

export default AssetDetailScreen;
