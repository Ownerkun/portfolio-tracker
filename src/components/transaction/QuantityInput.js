import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "./TransactionForm.styles";

const QuantityInput = ({
  quantity,
  onQuantityChange,
  transactionMode,
  availableQuantity = 0,
}) => {
  const handleMaxQuantity = () => {
    if (transactionMode === "sell" && availableQuantity > 0) {
      onQuantityChange(availableQuantity.toString());
    }
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Quantity</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter quantity"
          value={quantity}
          onChangeText={onQuantityChange}
          keyboardType="decimal-pad"
          placeholderTextColor="#ADB5BD"
        />
        {transactionMode === "sell" && availableQuantity > 0 && (
          <TouchableOpacity
            style={[styles.maxButton, { backgroundColor: "#EF444415" }]}
            onPress={handleMaxQuantity}
            activeOpacity={0.7}
          >
            <Text style={[styles.maxButtonText, { color: "#EF4444" }]}>
              MAX
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {transactionMode === "sell" && availableQuantity > 0 && (
        <Text style={styles.helperText}>Available: {availableQuantity}</Text>
      )}
    </View>
  );
};

export default QuantityInput;
