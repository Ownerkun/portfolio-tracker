import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TransactionModal = ({
  visible,
  editingTransaction,
  formData,
  setFormData,
  onSave,
  onCancel,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingTransaction ? "Edit Transaction" : "Add Transaction"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={formData.quantity}
            onChangeText={(text) =>
              setFormData({ ...formData, quantity: text })
            }
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Price per unit"
            value={formData.price_per_unit}
            onChangeText={(text) =>
              setFormData({ ...formData, price_per_unit: text })
            }
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Fees (optional)"
            value={formData.fees}
            onChangeText={(text) => setFormData({ ...formData, fees: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notes (optional)"
            value={formData.notes}
            onChangeText={(text) => setFormData({ ...formData, notes: text })}
            multiline
          />

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
  },
  saveButton: {
    backgroundColor: "#6200EA",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TransactionModal;
