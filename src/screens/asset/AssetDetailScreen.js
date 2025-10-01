import React, { useState } from "react";
import { ScrollView, Modal, TextInput, Alert } from "react-native";
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

  return (
    <ScrollView style={styles.container}>
      {/* Asset Header */}
      <View style={styles.header}>
        <Text style={styles.assetName}>{asset.name}</Text>
        <Text style={styles.totalValue}>
          {formatCurrency(asset.total_value || 0)}
        </Text>
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
    marginTop: 0,
  },
  assetName: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
});

export default AssetDetailScreen;
