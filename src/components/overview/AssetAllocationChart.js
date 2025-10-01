import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { enrichedMockAssets, mockAssetTypes } from "../../data/mockData";

const AssetAllocationChart = () => {
  const calculateAllocationData = () => {
    const allocationByType = mockAssetTypes
      .map((type) => {
        const typeAssets = enrichedMockAssets.filter(
          (asset) => asset.asset_type_id === type.id
        );
        const typeValue = typeAssets.reduce(
          (sum, asset) => sum + (asset.total_value || 0),
          0
        );

        return {
          name: type.name,
          value: typeValue,
          color: getColorForType(type.name),
          legendFontColor: "#7F7F7F",
          legendFontSize: 12,
        };
      })
      .filter((item) => item.value > 0);

    return allocationByType;
  };

  const getColorForType = (typeName) => {
    const colors = {
      Stock: "#FF6B6B",
      Cryptocurrency: "#4ECDC4",
      "Mutual Fund": "#45B7D1",
      Bond: "#96CEB4",
      "Real Estate": "#FFEAA7",
      Commodity: "#DDA0DD",
    };
    return colors[typeName] || "#CCCCCC";
  };

  const chartData = calculateAllocationData();
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  if (totalValue === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No assets to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={chartData}
        width={300}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  emptyState: {
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: "#666",
    fontSize: 16,
  },
});

export default AssetAllocationChart;
