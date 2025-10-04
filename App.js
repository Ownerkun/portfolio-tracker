import React from "react";
import { AuthProvider } from "./src/AuthContext";
import { AssetsProvider } from "./src/AssetContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AssetsProvider>
        <AppNavigator />
      </AssetsProvider>
    </AuthProvider>
  );
}
