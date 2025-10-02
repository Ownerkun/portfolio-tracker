import React from "react";
import { View, Text } from "react-native";
import DetailCard from "./DetailCard";
import styles from "./AssetDetailScreen.styles";

const AssetDetailsGrid = ({ asset, formatCurrency }) => {
  const detailItems = [
    {
      label: "Quantity",
      value: asset.quantity?.toString(),
      unit: asset.asset_type?.name === "Cryptocurrency" ? "coins" : "shares",
    },
    {
      label: "Avg. Buy Price",
      value: formatCurrency(asset.average_buy_price),
    },
    {
      label: "Current Price",
      value: formatCurrency(asset.current_price || 0),
    },
    {
      label: "Total P&L",
      value: formatCurrency(asset.profit_loss || 0),
      isProfitLoss: true,
      isPositive: asset.profit_loss >= 0,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Details</Text>

      <View style={styles.detailGrid}>
        {detailItems.map((item, index) => (
          <DetailCard
            key={index}
            label={item.label}
            value={item.value}
            unit={item.unit}
            isProfitLoss={item.isProfitLoss}
            isPositive={item.isPositive}
          />
        ))}
      </View>
    </View>
  );
};

export default AssetDetailsGrid;
