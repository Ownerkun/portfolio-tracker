import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import {
  calculatePortfolioSummary,
  getRecentTransactions,
} from "../data/mockData";

const HomeScreen = ({ navigation }) => {
  const { profile } = useAuth();
  const portfolioSummary = calculatePortfolioSummary();
  const recentTransactions = getRecentTransactions(2);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    }
  };

  const getTransactionIcon = (type) => {
    return type === "buy" ? "arrow-upward" : "arrow-downward";
  };

  const getTransactionColor = (type) => {
    return type === "buy" ? "#4CAF50" : "#f44336";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Portfolio Dashboard</Text>
        {profile && (
          <Text style={styles.welcomeText}>
            Welcome back, {profile.username}!
          </Text>
        )}
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialIcons name="attach-money" size={30} color="#4CAF50" />
          <Text style={styles.statValue}>
            {formatCurrency(portfolioSummary.totalValue)}
          </Text>
          <Text style={styles.statLabel}>Total Portfolio Value</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialIcons
            name={
              portfolioSummary.totalProfitLoss >= 0
                ? "trending-up"
                : "trending-down"
            }
            size={30}
            color={
              portfolioSummary.totalProfitLoss >= 0 ? "#4CAF50" : "#f44336"
            }
          />
          <Text
            style={[
              styles.statValue,
              {
                color:
                  portfolioSummary.totalProfitLoss >= 0 ? "#4CAF50" : "#f44336",
              },
            ]}
          >
            {formatCurrency(portfolioSummary.totalProfitLoss)}
          </Text>
          <Text style={styles.statLabel}>Total Profit/Loss</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Assets")}
          >
            <MaterialIcons name="add" size={24} color="#6200EA" />
            <Text style={styles.actionText}>Add Asset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate("Transactions")}
          >
            <MaterialIcons name="swap-horiz" size={24} color="#6200EA" />
            <Text style={styles.actionText}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.activityItem}>
            <MaterialIcons
              name={getTransactionIcon(transaction.transaction_type)}
              size={20}
              color={getTransactionColor(transaction.transaction_type)}
            />
            <Text style={styles.activityText}>
              {transaction.transaction_type === "buy" ? "Bought" : "Sold"}{" "}
              {transaction.quantity} {transaction.asset?.symbol || "shares"}
            </Text>
            <Text style={styles.activityTime}>
              {formatTimeAgo(transaction.transaction_date)}
            </Text>
          </View>
        ))}
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  quickActions: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 10,
    color: "#6200EA",
    fontWeight: "500",
  },
  recentSection: {
    padding: 20,
    paddingTop: 10,
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  activityText: {
    flex: 1,
    marginLeft: 10,
  },
  activityTime: {
    color: "#666",
    fontSize: 12,
  },
});

export default HomeScreen;
