import React, { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../AuthContext";
import { supabase } from "../../services/supabase/supabase";
import { useAssets } from "../../AssetContext";
import TransactionForm from "../../components/transaction/TransactionForm";

const EditTransactionScreen = ({ route, navigation }) => {
  const { asset, transaction } = route.params;
  const { user } = useAuth();
  const { refreshUserAssets } = useAssets();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (updatedTransaction) => {
    if (!user) {
      Alert.alert("Error", "You must be logged in to update transactions");
      return;
    }

    setLoading(true);
    try {
      console.log("Updating transaction:", {
        id: transaction.id,
        old_type: transaction.transaction_type,
        old_quantity: transaction.quantity,
        old_price: transaction.price_per_unit,
        new_type: updatedTransaction.transaction_type,
        new_quantity: updatedTransaction.quantity,
        new_price: updatedTransaction.price_per_unit,
      });

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

      console.log("Transaction updated successfully:", data);

      // Wait a moment for the trigger to execute
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Fetch the updated asset to verify trigger executed
      const { data: updatedAsset, error: assetError } = await supabase
        .from("user_assets")
        .select("id, quantity, average_buy_price")
        .eq("id", transaction.asset_id)
        .single();

      if (assetError) {
        console.error("Error fetching updated asset:", assetError);
      } else {
        console.log("Updated asset after transaction:", updatedAsset);
      }

      // Force refresh user assets with fresh data
      await refreshUserAssets(true);

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
      } else if (
        error.message &&
        error.message.includes("Insufficient quantity")
      ) {
        Alert.alert("Error", error.message);
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
