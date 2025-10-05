// components/addAsset/AddAssetScreen.styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1A1A1A",
  },
  searchLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 8,
  },
  searchLoadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#6C757D",
  },
  listContent: {
    flexGrow: 1,
    padding: 16,
  },
  assetItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedAssetItem: {
    borderColor: "#3B82F6",
    borderWidth: 2,
    backgroundColor: "#F0F7FF",
  },
  assetInfo: {
    flex: 1,
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  assetName: {
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 2,
  },
  assetExchange: {
    fontSize: 12,
    color: "#ADB5BD",
  },
  assetTypeBadge: {
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 12,
  },
  assetTypeText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "500",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6C757D",
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ADB5BD",
    marginTop: 4,
    textAlign: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B82F6",
    paddingVertical: 16,
    borderRadius: 12,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6C757D",
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
});

export default styles;
