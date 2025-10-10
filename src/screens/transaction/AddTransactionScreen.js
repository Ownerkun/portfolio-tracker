import React, { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import TransactionForm from "../../components/transaction/TransactionForm";

const AddTransactionScreen = ({ route, navigation }) => {
  const { asset } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (transactionData) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to add transactions");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: user.id,
            asset_id: asset.id,
            transaction_type: transactionData.transaction_type,
            quantity: transactionData.quantity,
            price_per_unit: transactionData.price_per_unit,
            total_amount: transactionData.total_amount,
            fees: transactionData.fees,
            transaction_date: transactionData.transaction_date,
            notes: transactionData.notes,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      Alert.alert(
        "Success",
        `Transaction ${transactionData.transaction_type} for ${asset.symbol} added successfully`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error adding transaction:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to add transaction. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!loading) {
      navigation.goBack();
    }
  };

  return (
    <TransactionForm
      asset={asset}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      mode="add"
      loading={loading}
    />
  );
};

export default AddTransactionScreen;
