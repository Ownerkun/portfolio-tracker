import React from "react";
import { Alert } from "react-native";
import TransactionForm from "../../components/transaction/TransactionForm";

const AddTransactionScreen = ({ route, navigation }) => {
  const { asset } = route.params;

  const handleSubmit = (transaction) => {
    // TODO: Save transaction to backend
    console.log("New transaction:", transaction);

    Alert.alert(
      "Success",
      `Transaction ${transaction.transaction_type} for ${asset.symbol} added successfully`,
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
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      mode="add"
    />
  );
};

export default AddTransactionScreen;
