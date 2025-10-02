import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./TransactionForm.styles";

const TransactionActions = ({
  mode,
  transactionMode,
  asset,
  onSubmit,
  onCancel,
  disabled,
}) => {
  const isBuyMode = transactionMode === "buy";
  const themeColor = isBuyMode ? "#10B981" : "#EF4444";

  return (
    <View style={styles.footer}>
      <View style={styles.actionButtonsContainer}>
        {onCancel && (
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.submitButton,
            { backgroundColor: themeColor },
            disabled && styles.actionButtonDisabled,
          ]}
          onPress={onSubmit}
          disabled={disabled}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={isBuyMode ? "add" : "remove"}
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.actionButtonText}>
            {mode === "edit" ? "Update" : isBuyMode ? "Buy" : "Sell"}{" "}
            {asset.symbol}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionActions;
