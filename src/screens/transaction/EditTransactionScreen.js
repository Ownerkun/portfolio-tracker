// TODO: Implement This Screen
import React from "react";
import { Alert } from "react-native";
import TransactionForm from "../components/TransactionForm";

const EditTransactionScreen = ({ route, navigation }) => {
  const { asset, transaction } = route.params;

  const handleSubmit = (updatedTransaction) => {
    // TODO: Update transaction to backend
    console.log("Updated transaction:", updatedTransaction);

    // Show success message and navigate back
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
    />
  );
};

export default EditTransactionScreen;
