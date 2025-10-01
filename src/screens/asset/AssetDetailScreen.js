import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { mockTransactions } from "../../data/mockData";
import { useNavigation } from "@react-navigation/native";

const AssetDetailScreen = ({ route }) => {
  const navigation = useNavigation();
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
    // Validation
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
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddTransaction}
          >
            <MaterialIcons name="add" size={20} color="#fff" />
            <Text style={styles.addButtonText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>

        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <View style={styles.transactionType}>
                <MaterialIcons
                  name={
                    transaction.transaction_type === "buy"
                      ? "arrow-upward"
                      : "arrow-downward"
                  }
                  size={20}
                  color={
                    transaction.transaction_type === "buy"
                      ? "#4CAF50"
                      : "#f44336"
                  }
                />
                <Text
                  style={[
                    styles.typeText,
                    {
                      color:
                        transaction.transaction_type === "buy"
                          ? "#4CAF50"
                          : "#f44336",
                    },
                  ]}
                >
                  {transaction.transaction_type.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.transactionDate}>
                {formatDate(transaction.transaction_date)}
              </Text>
            </View>

            <View style={styles.transactionDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Quantity:</Text>
                <Text style={styles.detailValue}>{transaction.quantity}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Price per unit:</Text>
                <Text style={styles.detailValue}>
                  {formatCurrency(transaction.price_per_unit)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Amount:</Text>
                <Text style={styles.totalAmount}>
                  {formatCurrency(transaction.total_amount)}
                </Text>
              </View>
            </View>

            <View style={styles.transactionActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleEditTransaction(transaction)}
              >
                <MaterialIcons name="edit" size={16} color="#666" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleDeleteTransaction(transaction.id)}
              >
                <MaterialIcons name="delete" size={16} color="#f44336" />
                <Text style={[styles.actionText, { color: "#f44336" }]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Transaction Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={formData.quantity}
              onChangeText={(text) =>
                setFormData({ ...formData, quantity: text })
              }
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Price per unit"
              value={formData.price_per_unit}
              onChangeText={(text) =>
                setFormData({ ...formData, price_per_unit: text })
              }
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Fees (optional)"
              value={formData.fees}
              onChangeText={(text) => setFormData({ ...formData, fees: text })}
              keyboardType="numeric"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notes (optional)"
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSaveTransaction}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
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
  addButton: {
    flexDirection: "row",
    backgroundColor: "#6200EA",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  transactionCard: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  transactionType: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
  transactionDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 12,
    color: "#666",
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  transactionActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  actionText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#6200EA",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AssetDetailScreen;
