import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./TransactionForm.styles";

const TransactionTypeToggle = ({ transactionMode, onModeChange }) => {
  const isBuyMode = transactionMode === "buy";
  const themeColor = isBuyMode ? "#10B981" : "#EF4444";

  return (
    <View style={styles.modeToggleContainer}>
      <TouchableOpacity
        style={[
          styles.modeButton,
          isBuyMode && styles.modeButtonActive,
          isBuyMode && { backgroundColor: "#10B98115", borderColor: "#10B981" },
        ]}
        onPress={() => onModeChange("buy")}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="arrow-upward"
          size={20}
          color={isBuyMode ? "#10B981" : "#6C757D"}
        />
        <Text
          style={[styles.modeButtonText, isBuyMode && { color: "#10B981" }]}
        >
          BUY
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.modeButton,
          !isBuyMode && styles.modeButtonActive,
          !isBuyMode && {
            backgroundColor: "#EF444415",
            borderColor: "#EF4444",
          },
        ]}
        onPress={() => onModeChange("sell")}
        activeOpacity={0.7}
      >
        <MaterialIcons
          name="arrow-downward"
          size={20}
          color={!isBuyMode ? "#EF4444" : "#6C757D"}
        />
        <Text
          style={[styles.modeButtonText, !isBuyMode && { color: "#EF4444" }]}
        >
          SELL
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionTypeToggle;
