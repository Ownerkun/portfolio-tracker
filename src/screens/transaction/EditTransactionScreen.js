import React, { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import TransactionForm from "../../components/transaction/TransactionForm";

const EditTransactionScreen = ({ route, navigation }) => {
  const { asset, transaction } = route.params;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (updatedTransaction) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to update transactions");
      return;
    }

    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transaction.id)
        .eq("user_id", user.id);

      if (deleteError) throw deleteError;

      const { data, error: insertError } = await supabase
        .from("transactions")
        .insert([
          {
            user_id: user.id,
            asset_id: asset.id,
            transaction_type: updatedTransaction.transaction_type,
            quantity: updatedTransaction.quantity,
            price_per_unit: updatedTransaction.price_per_unit,
            total_amount: updatedTransaction.total_amount,
            fees: updatedTransaction.fees,
            transaction_date: updatedTransaction.transaction_date,
            notes: updatedTransaction.notes,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;

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
      Alert.alert(
        "Error",
        error.message || "Failed to update transaction. Please try again."
      );
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
