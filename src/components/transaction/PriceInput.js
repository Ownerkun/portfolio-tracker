import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./TransactionForm.styles";

const PriceInput = ({ label, value, onValueChange, required = false }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>
        {label}
        {required && " *"}
      </Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.currencySymbol}>$</Text>
        <TextInput
          style={[styles.input, styles.priceInput]}
          placeholder="0.00"
          value={value}
          onChangeText={onValueChange}
          keyboardType="decimal-pad"
          placeholderTextColor="#ADB5BD"
        />
      </View>
    </View>
  );
};

export default PriceInput;
