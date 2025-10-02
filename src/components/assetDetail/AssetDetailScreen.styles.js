import { StyleSheet } from "react-native";

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

export default styles;
