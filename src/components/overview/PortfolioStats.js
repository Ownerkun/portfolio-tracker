import React from "react";
import { View, StyleSheet } from "react-native";
import PortfolioSummaryCard from "./PortfolioSummaryCard";
import { useRealTimeAssets } from "../../hooks/useRealTimeAssets";
import { useAuth } from "../../AuthContext";

const PortfolioStats = () => {
  const { user } = useAuth();
  const { assets } = useRealTimeAssets(user?.id);

  const calculatePortfolioSummary = () => {
    const totalValue = assets.reduce(
      (sum, asset) => sum + (asset.total_value || 0),
      0
    );
    const totalCost = assets.reduce(
      (sum, asset) => sum + (asset.average_buy_price * asset.quantity || 0),
      0
    );
    const totalProfitLoss = totalValue - totalCost;
    const totalProfitLossPercentage =
      totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

    return {
      totalValue,
      totalProfitLoss,
      totalProfitLossPercentage,
    };
  };

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
