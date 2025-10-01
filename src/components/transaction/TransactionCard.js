import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const TransactionCard = ({
  transaction,
  onEdit,
  onDelete,
  formatCurrency,
  formatDate,
}) => {
  const getTransactionColor = (type) => {
    return type === "buy" ? "#4CAF50" : "#f44336";
  };

  const getTransactionIcon = (type) => {
    return type === "buy" ? "arrow-upward" : "arrow-downward";
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.type}>
          <MaterialIcons
            name={getTransactionIcon(transaction.transaction_type)}
            size={20}
            color={getTransactionColor(transaction.transaction_type)}
          />
          <Text
            style={[
              styles.typeText,
              { color: getTransactionColor(transaction.transaction_type) },
            ]}
          >
            {transaction.transaction_type.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.date}>
          {formatDate(transaction.transaction_date)}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{transaction.quantity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Price per unit:</Text>
          <Text style={styles.value}>
            {formatCurrency(transaction.price_per_unit)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Total Amount:</Text>
          <Text style={styles.totalAmount}>
            {formatCurrency(transaction.total_amount)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <MaterialIcons name="edit" size={16} color="#666" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onDelete}>
          <MaterialIcons name="delete" size={16} color="#f44336" />
          <Text style={[styles.actionText, { color: "#f44336" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  type: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 6,
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    color: "#666",
  },
  value: {
    fontSize: 12,
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  actions: {
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
});

export default TransactionCard;
