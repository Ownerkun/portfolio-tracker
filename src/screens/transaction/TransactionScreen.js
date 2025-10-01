import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TransactionsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.comingSoon}>Transactions History Coming Soon</Text>
        <Text style={styles.description}>
          This screen will show your transaction history and allow you to add
          new buy/sell transactions.
        </Text>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  comingSoon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});

export default TransactionsScreen;
