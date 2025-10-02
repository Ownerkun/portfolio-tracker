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
          legendFontColor: "#6C757D",
          legendFontSize: 13,
        };
      })
      .filter((item) => item.value > 0);

    return allocationByType;
  };

  const getColorForType = (typeName) => {
    const colors = {
      Stock: "#3B82F6",
      Cryptocurrency: "#F59E0B",
      "Mutual Fund": "#8B5CF6",
      Bond: "#10B981",
      "Real Estate": "#EC4899",
      Commodity: "#EF4444",
    };
    return colors[typeName] || "#6C757D";
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
        width={320}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(26, 26, 26, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        hasLegend={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  emptyState: {
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    color: "#6C757D",
    fontSize: 15,
    fontWeight: "500",
  },
});

export default AssetAllocationChart;
