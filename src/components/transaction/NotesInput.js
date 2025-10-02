import React from "react";
import { View, Text, TextInput } from "react-native";
import styles from "./TransactionForm.styles";

const NotesInput = ({ notes, onNotesChange }) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Notes (Optional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Add notes about this transaction..."
        value={notes}
        onChangeText={onNotesChange}
        multiline
        numberOfLines={3}
        placeholderTextColor="#ADB5BD"
        textAlignVertical="top"
      />
    </View>
  );
};

export default NotesInput;
