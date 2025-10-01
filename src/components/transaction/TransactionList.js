import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TransactionCard from "./TransactionCard";

const TransactionList = ({
  transactions,
  onAddTransaction,
  onEditTransaction,
  onDeleteTransaction,
  formatCurrency,
  formatDate,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddTransaction}>
          <MaterialIcons name="add" size={20} color="#fff" />
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>

      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          transaction={transaction}
          onEdit={() => onEditTransaction(transaction)}
          onDelete={() => onDeleteTransaction(transaction.id)}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
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
});

export default TransactionList;
