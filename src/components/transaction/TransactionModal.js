import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </Text>
            <TouchableOpacity onPress={onCancel} activeOpacity={0.7}>
              <MaterialIcons name="close" size={24} color="#6C757D" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Quantity *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChangeText={(text) =>
                    setFormData({ ...formData, quantity: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#ADB5BD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Price per unit *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter price"
                  value={formData.price_per_unit}
                  onChangeText={(text) =>
                    setFormData({ ...formData, price_per_unit: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#ADB5BD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Fees (optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter fees"
                  value={formData.fees}
                  onChangeText={(text) =>
                    setFormData({ ...formData, fees: text })
                  }
                  keyboardType="numeric"
                  placeholderTextColor="#ADB5BD"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Notes (optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Add notes..."
                  value={formData.notes}
                  onChangeText={(text) =>
                    setFormData({ ...formData, notes: text })
                  }
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#ADB5BD"
                  textAlignVertical="top"
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={onSave}
              activeOpacity={0.7}
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
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.3,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: "#1A1A1A",
    backgroundColor: "#F8F9FA",
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 6,
  },
  cancelButton: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  saveButton: {
    backgroundColor: "#3B82F6",
  },
  cancelButtonText: {
    color: "#6C757D",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: -0.1,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
    letterSpacing: -0.1,
  },
});

export default TransactionModal;
