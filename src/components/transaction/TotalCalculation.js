import React from "react";
import { View, Text } from "react-native";
import styles from "./TransactionForm.styles";

const TotalCalculation = ({ quantity, pricePerUnit, fees, themeColor }) => {
  const calculateTotal = () => {
    const quantityNum = parseFloat(quantity);
    const priceNum = parseFloat(pricePerUnit);
    const feesNum = parseFloat(fees) || 0;
    return quantityNum * priceNum + feesNum;
  };

  return (
    <View style={[styles.totalCard, { borderColor: themeColor }]}>
      <Text style={styles.totalLabel}>Total Amount</Text>
      <Text style={[styles.totalValue, { color: themeColor }]}>
        ${calculateTotal().toFixed(2)}
      </Text>
      <Text style={styles.totalDescription}>
        {quantity || "0"} units × ${(parseFloat(pricePerUnit) || 0).toFixed(2)}
        {fees ? ` + $${(parseFloat(fees) || 0).toFixed(2)} fees` : ""}
      </Text>
    </View>
  );
};

export default TotalCalculation;
