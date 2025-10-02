import React from "react";
import { View, Text } from "react-native";
import styles from "./AssetDetailScreen.styles";

const DetailCard = ({
  label,
  value,
  unit,
  isProfitLoss = false,
  isPositive = true,
}) => {
  const valueStyle = isProfitLoss
    ? [styles.detailValue, { color: isPositive ? "#10B981" : "#EF4444" }]
    : styles.detailValue;

  return (
    <View style={styles.detailCard}>
      <View style={styles.detailCardInner}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={valueStyle}>{value}</Text>
        {unit && <Text style={styles.detailUnit}>{unit}</Text>}
      </View>
    </View>
  );
};

export default DetailCard;
