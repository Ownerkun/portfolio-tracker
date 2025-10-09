import React, { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import { useAssets } from "../../AssetContext";
import TransactionForm from "../../components/transaction/TransactionForm";

const EditTransactionScreen = ({ route, navigation }) => {
  const { asset, transaction } = route.params;
  const { user } = useAuth();
  const { refreshUserAssets } = useAssets(); // ADD THIS
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (updatedTransaction) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to update transactions");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("transactions")
        .update({
          transaction_type: updatedTransaction.transaction_type,
          quantity: updatedTransaction.quantity,
          price_per_unit: updatedTransaction.price_per_unit,
          total_amount: updatedTransaction.total_amount,
          fees: updatedTransaction.fees,
          transaction_date: updatedTransaction.transaction_date,
          notes: updatedTransaction.notes,
        })
        .eq("id", transaction.id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;

      await refreshUserAssets();

      Alert.alert(
        "Success",
        `Transaction for ${asset.symbol} updated successfully`,
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error("Error updating transaction:", error);

      if (error.code === "23514") {
        Alert.alert(
          "Error",
          "Invalid transaction data. Please check that all values are valid."
        );
      } else {
        Alert.alert(
          "Error",
          error.message || "Failed to update transaction. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <TransactionForm
      asset={asset}
      initialData={transaction}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      mode="edit"
      loading={loading}
    />
  );
};

export default EditTransactionScreen;
