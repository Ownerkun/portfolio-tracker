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

const HomeScreen = ({ navigation }) => {
  const { profile } = useAuth();

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
          <Text style={styles.statValue}>$125,430.75</Text>
          <Text style={styles.statLabel}>Total Portfolio Value</Text>
        </View>

        <View style={styles.statCard}>
          <MaterialIcons name="trending-up" size={30} color="#4CAF50" />
          <Text style={styles.statValue}>+$12,560.25</Text>
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
        <View style={styles.activityItem}>
          <MaterialIcons name="arrow-upward" size={20} color="#4CAF50" />
          <Text style={styles.activityText}>Bought 10 AAPL shares</Text>
          <Text style={styles.activityTime}>2 hours ago</Text>
        </View>
        <View style={styles.activityItem}>
          <MaterialIcons name="arrow-downward" size={20} color="#f44336" />
          <Text style={styles.activityText}>Sold 5 GOOGL shares</Text>
          <Text style={styles.activityTime}>1 day ago</Text>
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
