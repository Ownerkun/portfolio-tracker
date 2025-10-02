import React, { useState } from "react";
import {
  ScrollView,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { mockTransactions } from "../../data/mockData";
import TransactionList from "../../components/transaction/TransactionList";

const AssetDetailScreen = ({ route, navigation }) => {
  const { asset } = route.params;
  const [transactions, setTransactions] = useState(
    mockTransactions.filter((t) => t.asset_id === asset.id)
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddTransaction = () => {
    navigation.navigate("AddTransaction", { asset });
  };

  const handleEditTransaction = (transaction) => {
    // For now, navigate to AddTransaction screen with edit mode
    // implement proper edit functionality later
    navigation.navigate("AddTransaction", {
      asset,
      transaction,
      isEditing: true,
    });
  };

  const handleDeleteTransaction = (transactionId) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTransactions(transactions.filter((t) => t.id !== transactionId));
          },
        },
      ]
    );
  };

  const getAssetIcon = (assetType) => {
    const icons = {
      Stock: "show-chart",
      Cryptocurrency: "currency-bitcoin",
      "Mutual Fund": "pie-chart",
      Bond: "account-balance",
      "Real Estate": "home",
      Commodity: "star",
    };
    return icons[assetType] || "account-balance-wallet";
  };

  const getAssetColor = (assetType) => {
    const colors = {
      Stock: "#3B82F6",
      Cryptocurrency: "#F59E0B",
      "Mutual Fund": "#8B5CF6",
      Bond: "#10B981",
      "Real Estate": "#EC4899",
      Commodity: "#EF4444",
    };
    return colors[assetType] || "#6C757D";
  };

  const assetColor = getAssetColor(asset.asset_type?.name);
  const isProfitable = asset.profit_loss >= 0;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Asset Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${assetColor}15` },
            ]}
          >
            <MaterialIcons
              name={getAssetIcon(asset.asset_type?.name)}
              size={32}
              color={assetColor}
            />
          </View>

          <View style={styles.headerInfo}>
            <Text style={styles.assetSymbol}>{asset.symbol}</Text>
            <Text style={styles.assetName}>{asset.name}</Text>
          </View>

          <View style={styles.valueContainer}>
            <Text style={styles.totalValue}>
              {formatCurrency(asset.total_value || 0)}
            </Text>
            <View
              style={[
                styles.plBadge,
                { backgroundColor: isProfitable ? "#10B98115" : "#EF444415" },
              ]}
            >
              <MaterialIcons
                name={isProfitable ? "arrow-drop-up" : "arrow-drop-down"}
                size={16}
                color={isProfitable ? "#10B981" : "#EF4444"}
              />
              <Text
                style={[
                  styles.plText,
                  { color: isProfitable ? "#10B981" : "#EF4444" },
                ]}
              >
                {formatPercentage(asset.profit_loss_percentage || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Asset Details Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Details</Text>

          <View style={styles.detailGrid}>
            <View style={styles.detailCard}>
              <View style={styles.detailCardInner}>
                <Text style={styles.detailLabel}>Quantity</Text>
                <Text style={styles.detailValue}>{asset.quantity}</Text>
                <Text style={styles.detailUnit}>
                  {asset.asset_type?.name === "Cryptocurrency"
                    ? "coins"
                    : "shares"}
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailCardInner}>
                <Text style={styles.detailLabel}>Avg. Buy Price</Text>
                <Text style={styles.detailValue}>
                  {formatCurrency(asset.average_buy_price)}
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailCardInner}>
                <Text style={styles.detailLabel}>Current Price</Text>
                <Text style={styles.detailValue}>
                  {formatCurrency(asset.current_price || 0)}
                </Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <View style={styles.detailCardInner}>
                <Text style={styles.detailLabel}>Total P&L</Text>
                <Text
                  style={[
                    styles.detailValue,
                    { color: asset.profit_loss >= 0 ? "#10B981" : "#EF4444" },
                  ]}
                >
                  {formatCurrency(asset.profit_loss || 0)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Transactions Section */}
        <TransactionList
          transactions={transactions}
          onAddTransaction={handleAddTransaction}
          onEditTransaction={handleEditTransaction}
          onDeleteTransaction={handleDeleteTransaction}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Floating Action Button for Add Transaction */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddTransaction}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.3,
    marginBottom: 2,
  },
  assetName: {
    fontSize: 13,
    color: "#6C757D",
    fontWeight: "500",
  },
  valueContainer: {
    alignItems: "flex-end",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  plBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  plText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: -0.1,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  detailCard: {
    width: "50%",
    padding: 6,
  },
  detailCardInner: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  detailLabel: {
    fontSize: 12,
    color: "#6C757D",
    marginBottom: 6,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: -0.3,
  },
  detailUnit: {
    fontSize: 11,
    color: "#ADB5BD",
    marginTop: 2,
    fontWeight: "500",
  },
  bottomSpacing: {
    height: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default AssetDetailScreen;
