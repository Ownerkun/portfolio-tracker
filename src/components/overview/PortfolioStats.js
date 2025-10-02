import React from "react";
import { View, StyleSheet } from "react-native";
import PortfolioSummaryCard from "./PortfolioSummaryCard";
import { calculatePortfolioSummary } from "../../data/mockData";

const PortfolioStats = () => {
  const portfolioSummary = calculatePortfolioSummary();

  return (
    <View style={styles.container}>
      <PortfolioSummaryCard
        title="Total Value"
        value={portfolioSummary.totalValue}
        icon="attach-money"
        color="#10B981"
        isMain={true}
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
        color={portfolioSummary.totalProfitLoss >= 0 ? "#10B981" : "#EF4444"}
        isMain={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

export default PortfolioStats;
