import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./TransactionForm.styles";
import TransactionTypeToggle from "./TransactionTypeToggle";
import QuantityInput from "./QuantityInput";
import PriceInput from "./PriceInput";
import DateInput from "./DateInput";
import NotesInput from "./NotesInput";
import TotalCalculation from "./TotalCalculation";
import TransactionActions from "./TransactionActions";

const TransactionForm = ({
  asset,
  initialData = {},
  onSubmit,
  onCancel,
  mode = "add", // 'add' or 'edit'
}) => {
  const [transactionMode, setTransactionMode] = useState(
    initialData.transaction_type || "buy"
  );
  const [quantity, setQuantity] = useState(
    initialData.quantity?.toString() || ""
  );
  const [pricePerUnit, setPricePerUnit] = useState(
    initialData.price_per_unit?.toString() || ""
  );
  const [fees, setFees] = useState(initialData.fees?.toString() || "");
  const [notes, setNotes] = useState(initialData.notes || "");
  const [date, setDate] = useState(
    initialData.transaction_date
      ? new Date(initialData.transaction_date)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);

  const isBuyMode = transactionMode === "buy";
  const themeColor = isBuyMode ? "#10B981" : "#EF4444";

  const handleSubmit = () => {
    // Validation
    if (!quantity || !pricePerUnit) {
      Alert.alert("Error", "Please fill in quantity and price");
      return;
    }

    if (parseFloat(quantity) <= 0 || parseFloat(pricePerUnit) <= 0) {
      Alert.alert("Error", "Quantity and price must be greater than 0");
      return;
    }

    // Create transaction object
    const transaction = {
      id: initialData.id || Date.now().toString(),
      asset_id: asset.id,
      transaction_type: isBuyMode ? "buy" : "sell",
      quantity: parseFloat(quantity),
      price_per_unit: parseFloat(pricePerUnit),
      fees: parseFloat(fees) || 0,
      total_amount:
        parseFloat(quantity) * parseFloat(pricePerUnit) +
        (parseFloat(fees) || 0),
      transaction_date: date.toISOString(),
      notes: notes.trim(),
    };

    onSubmit(transaction);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Asset Card */}
        <View style={styles.selectedAssetCard}>
          <View style={styles.selectedAssetHeader}>
            <View>
              <Text style={styles.selectedAssetSymbol}>{asset.symbol}</Text>
              <Text style={styles.selectedAssetName}>{asset.name}</Text>
            </View>
            {onCancel && (
              <TouchableOpacity onPress={onCancel}>
                <MaterialIcons name="close" size={24} color="#6C757D" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Buy/Sell Toggle */}
        <TransactionTypeToggle
          transactionMode={transactionMode}
          onModeChange={setTransactionMode}
        />

        {/* Transaction Form */}
        <View style={styles.form}>
          <QuantityInput
            quantity={quantity}
            onQuantityChange={setQuantity}
            transactionMode={transactionMode}
            availableQuantity={asset.holdings}
          />

          <PriceInput
            label="Price per Unit"
            value={pricePerUnit}
            onValueChange={setPricePerUnit}
            required
          />

          <PriceInput
            label="Fees (Optional)"
            value={fees}
            onValueChange={setFees}
          />

          {/* Fixed DateInput - removed unnecessary props */}
          <DateInput
            date={date}
            onShowDatePicker={() => setShowDatePicker(true)}
          />

          <NotesInput notes={notes} onNotesChange={setNotes} />

          {/* Total Calculation */}
          {quantity && pricePerUnit && (
            <TotalCalculation
              quantity={quantity}
              pricePerUnit={pricePerUnit}
              fees={fees}
              themeColor={themeColor}
            />
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <TransactionActions
        mode={mode}
        transactionMode={transactionMode}
        asset={asset}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        disabled={!quantity || !pricePerUnit}
      />

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default TransactionForm;
