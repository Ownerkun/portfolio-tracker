import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PortfolioSummaryCard = ({ title, value, percentage, icon, color }) => {
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

  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={30} color={color} />
      <Text style={styles.value}>{formatCurrency(value)}</Text>
      <Text style={styles.label}>{title}</Text>
      {percentage !== undefined && (
        <Text style={[styles.percentage, { color }]}>
          {formatPercentage(percentage)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  value: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  percentage: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
});

export default PortfolioSummaryCard;
