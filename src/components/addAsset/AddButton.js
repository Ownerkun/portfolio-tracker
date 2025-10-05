import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./AddAssetScreen.styles";

const AddButton = ({ selectedAsset, loading, onAddAsset }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={[styles.addButton, loading && styles.disabledButton]}
        onPress={onAddAsset}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <>
            <MaterialIcons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add {selectedAsset.symbol}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddButton;
