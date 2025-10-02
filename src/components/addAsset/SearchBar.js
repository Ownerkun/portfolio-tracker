import React from "react";
import { View, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./AddAssetScreen.styles";

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <View style={styles.searchContainer}>
      <MaterialIcons name="search" size={20} color="#6C757D" />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by symbol or name..."
        value={searchQuery}
        onChangeText={onSearchChange}
        placeholderTextColor="#ADB5BD"
      />
    </View>
  );
};

export default SearchBar;
