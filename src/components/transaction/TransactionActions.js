import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./TransactionForm.styles";

const TransactionActions = ({
  mode,
  transactionMode,
  asset,
  onSubmit,
  onCancel,
  disabled,
  loading = false,
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
            disabled={loading}
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
            (disabled || loading) && styles.actionButtonDisabled,
          ]}
          onPress={onSubmit}
          disabled={disabled || loading}
          activeOpacity={0.7}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <MaterialIcons
                name={isBuyMode ? "add" : "remove"}
                size={20}
                color="#FFFFFF"
              />
              <Text style={styles.actionButtonText}>
                {mode === "edit" ? "Update" : isBuyMode ? "Buy" : "Sell"}{" "}
                {asset.symbol}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionActions;
