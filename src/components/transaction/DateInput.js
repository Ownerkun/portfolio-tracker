import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./TransactionForm.styles";

const DateInput = ({ date, onShowDatePicker }) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Date & Time</Text>
      <TouchableOpacity
        style={styles.dateInputWrapper}
        onPress={onShowDatePicker}
        activeOpacity={0.7}
      >
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        <MaterialIcons name="calendar-today" size={20} color="#6C757D" />
      </TouchableOpacity>
    </View>
  );
};

export default DateInput;
