import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PortfolioSummaryCard = ({
  title,
  value,
  percentage,
  icon,
  color,
  isMain,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  return (
    <View style={[styles.card, isMain && styles.cardMain]}>
      <View style={styles.header}>
        <MaterialIcons name={icon} size={20} color={color} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.value}>{formatCurrency(value)}</Text>
      {percentage !== undefined && (
        <View
          style={[styles.percentageBadge, { backgroundColor: `${color}15` }]}
        >
          <Text style={[styles.percentage, { color }]}>
            {formatPercentage(percentage)}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  cardMain: {
    borderColor: "#10B981",
    borderWidth: 1.5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 13,
    color: "#6C757D",
    marginLeft: 6,
    fontWeight: "500",
    letterSpacing: -0.1,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  percentageBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  percentage: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
});

export default PortfolioSummaryCard;
