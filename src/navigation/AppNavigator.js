import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../AuthContext";
import { View, ActivityIndicator } from "react-native";

// Auth Screens
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgetPasswordScreen from "../screens/auth/ForgetPasswordScreen";

// Portfolio Screens
import OverviewScreen from "../screens/OverviewScreen";
import AssetDetailScreen from "../screens/asset/AssetDetailScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AddAssetScreen from "../screens/asset/AddAssetScreen";
import AddTransactionScreen from "../screens/transaction/AddTransactionScreen";
import EditProfileScreen from "../screens/profile/EditProfileScreen";
import EditTransactionScreen from "../screens/transaction/EditTransactionScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for authenticated users
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen
        name="AssetDetail"
        component={AssetDetailScreen}
        options={{
          headerShown: true,
          title: "Asset Details",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="EditPro"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          title: "EditProfile",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="AddAsset"
        component={AddAssetScreen}
        options={{
          headerShown: true,
          title: "Add Asset",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{
          headerShown: true,
          title: "Add Transaction",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="EditTransaction"
        component={EditTransactionScreen}
        options={{
          headerShown: true,
          title: "Edit Transaction",
          headerBackTitle: "Back",
        }}
      />
    </Stack.Navigator>
  );
};

// Main tab navigator for portfolio app
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#6200EA",
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" color={color} size={size} />
          ),
          title: "Overview",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Auth stack for unauthenticated users
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200EA" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
