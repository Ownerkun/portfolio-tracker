import React from "react";
import { View, StyleSheet } from "react-native";
import PortfolioSummaryCard from "./PortfolioSummaryCard";
import { calculatePortfolioSummary } from "../../data/mockData";

const PortfolioStats = () => {
  const portfolioSummary = calculatePortfolioSummary();

  return (
    <View style={styles.container}>
      <PortfolioSummaryCard
        title="Total Portfolio Value"
        value={portfolioSummary.totalValue}
        icon="attach-money"
        color="#4CAF50"
      />
      <PortfolioSummaryCard
        title="Total P&L"
        value={portfolioSummary.totalProfitLoss}
        percentage={portfolioSummary.totalProfitLossPercentage}
        icon={
          portfolioSummary.totalProfitLoss >= 0
            ? "trending-up"
            : "trending-down"
        }
        color={portfolioSummary.totalProfitLoss >= 0 ? "#4CAF50" : "#f44336"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 10,
  },
});

export default PortfolioStats;
