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
  const isBuy = transaction.transaction_type === "buy";

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.typeContainer}>
          <View
            style={[
              styles.typeBadge,
              { backgroundColor: isBuy ? "#10B98115" : "#EF444415" },
            ]}
          >
            <MaterialIcons
              name={isBuy ? "arrow-upward" : "arrow-downward"}
              size={16}
              color={isBuy ? "#10B981" : "#EF4444"}
            />
            <Text
              style={[
                styles.typeText,
                { color: isBuy ? "#10B981" : "#EF4444" },
              ]}
            >
              {transaction.transaction_type.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.date}>
          {formatDate(transaction.transaction_date)}
        </Text>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.value}>{transaction.quantity}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Price per unit</Text>
          <Text style={styles.value}>
            {formatCurrency(transaction.price_per_unit)}
          </Text>
        </View>
        {transaction.fees > 0 && (
          <View style={styles.detailRow}>
            <Text style={styles.label}>Fees</Text>
            <Text style={styles.value}>{formatCurrency(transaction.fees)}</Text>
          </View>
        )}
        <View style={[styles.detailRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>
            {formatCurrency(transaction.total_amount)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onEdit}
          activeOpacity={0.7}
        >
          <MaterialIcons name="edit" size={16} color="#6C757D" />
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onDelete}
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete" size={16} color="#EF4444" />
          <Text style={[styles.actionText, { color: "#EF4444" }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F9FA",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "700",
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 12,
    color: "#ADB5BD",
    fontWeight: "500",
  },
  details: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    color: "#6C757D",
    fontWeight: "500",
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: -0.1,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "600",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingVertical: 4,
  },
  actionText: {
    fontSize: 13,
    color: "#6C757D",
    marginLeft: 4,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});

export default TransactionCard;
