import React, { useState } from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ThreeDotMenu = ({
  asset,
  onViewTransactions,
  onAddTransaction,
  onRemoveAsset,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOptionPress = (action) => {
    setModalVisible(false);
    switch (action) {
      case "view":
        onViewTransactions();
        break;
      case "add":
        onAddTransaction();
        break;
      case "remove":
        onRemoveAsset();
        break;
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <MaterialIcons name="more-vert" size={20} color="#6C757D" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{asset.symbol}</Text>
                  <Text style={styles.modalSubtitle}>{asset.name}</Text>
                </View>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleOptionPress("view")}
                >
                  <MaterialIcons name="list-alt" size={20} color="#3B82F6" />
                  <Text style={styles.menuItemText}>View Transactions</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => handleOptionPress("add")}
                >
                  <MaterialIcons name="add-circle" size={20} color="#10B981" />
                  <Text style={styles.menuItemText}>Add Transaction</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, styles.removeMenuItem]}
                  onPress={() => handleOptionPress("remove")}
                >
                  <MaterialIcons name="delete" size={20} color="#EF4444" />
                  <Text style={[styles.menuItemText, styles.removeText]}>
                    Remove Asset
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 4,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  removeMenuItem: {
    marginBottom: 20,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 12,
  },
  removeText: {
    color: "#EF4444",
  },
  cancelButton: {
    backgroundColor: "#F8F9FA",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C757D",
  },
});

export default ThreeDotMenu;
