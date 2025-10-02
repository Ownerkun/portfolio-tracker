export const getAssetIcon = (assetType) => {
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

export const getAssetColor = (assetType) => {
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
