import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { mockTransactions, enrichedMockAssets } from "../../data/mockData";
import { MaterialIcons } from "@expo/vector-icons";

const TransactionsScreen = () => {
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

  const getAssetSymbol = (assetId) => {
    const asset = enrichedMockAssets.find((a) => a.id === assetId);
    return asset ? asset.symbol : "Unknown";
  };

  const getTransactionIcon = (type) => {
    return type === "buy" ? "arrow-upward" : "arrow-downward";
  };

  const getTransactionColor = (type) => {
    return type === "buy" ? "#4CAF50" : "#f44336";
  };

  const sortedTransactions = [...mockTransactions].sort(
    (a, b) => new Date(b.transaction_date) - new Date(a.transaction_date)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>
          {sortedTransactions.length} total transactions
        </Text>
      </View>

      <View style={styles.transactionsList}>
        {sortedTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionHeader}>
              <View style={styles.transactionType}>
                <MaterialIcons
                  name={getTransactionIcon(transaction.transaction_type)}
                  size={20}
                  color={getTransactionColor(transaction.transaction_type)}
                />
                <Text
                  style={[
                    styles.typeText,
                    {
                      color: getTransactionColor(transaction.transaction_type),
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
                <Text style={styles.detailLabel}>Asset:</Text>
                <Text style={styles.detailValue}>
                  {getAssetSymbol(transaction.asset_id)}
                </Text>
              </View>
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
              {transaction.fees > 0 && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Fees:</Text>
                  <Text style={styles.detailValue}>
                    {formatCurrency(transaction.fees)}
                  </Text>
                </View>
              )}
            </View>

            {transaction.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesText}>{transaction.notes}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Transaction Summary</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Buys:</Text>
          <Text style={styles.summaryValue}>
            {
              sortedTransactions.filter((t) => t.transaction_type === "buy")
                .length
            }
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Sells:</Text>
          <Text style={styles.summaryValue}>
            {
              sortedTransactions.filter((t) => t.transaction_type === "sell")
                .length
            }
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total Invested:</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(
              sortedTransactions
                .filter((t) => t.transaction_type === "buy")
                .reduce((sum, t) => sum + t.total_amount, 0)
            )}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  transactionsList: {
    padding: 20,
  },
  transactionCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
    marginBottom: 8,
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
  notesContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
  },
  notesText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  summaryCard: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default TransactionsScreen;
