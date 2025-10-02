import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  selectedAssetCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  selectedAssetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  selectedAssetSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  selectedAssetName: {
    fontSize: 14,
    color: "#6C757D",
    fontWeight: "500",
  },
  modeToggleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  modeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E9ECEF",
    backgroundColor: "#F8F9FA",
  },
  modeButtonActive: {
    borderWidth: 2,
  },
  modeButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6C757D",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  form: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    letterSpacing: -0.1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1A1A1A",
  },
  currencySymbol: {
    fontSize: 15,
    color: "#6C757D",
    fontWeight: "600",
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
  },
  maxButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  maxButtonText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  helperText: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 6,
    fontWeight: "500",
  },
  dateInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#F8F9FA",
  },
  dateText: {
    fontSize: 15,
    color: "#1A1A1A",
  },
  textArea: {
    height: 100,
    paddingTop: 14,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 14,
  },
  totalCard: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: "#F8F9FA",
    marginTop: 4,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C757D",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  totalDescription: {
    fontSize: 12,
    color: "#ADB5BD",
    textAlign: "center",
  },
  footer: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#6C757D",
  },
  submitButton: {
    flex: 2,
  },
  actionButtonDisabled: {
    backgroundColor: "#ADB5BD",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
    letterSpacing: -0.2,
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;
