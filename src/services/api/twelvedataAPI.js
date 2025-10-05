export const twelvedataAPI = {
  async getMultiplePrices(symbols) {
    try {
      if (!symbols || symbols.length === 0) return {};

      const symbolString = symbols.join(",");
      const apiKey = process.env.EXPO_PUBLIC_TWELVEDATA_API_KEY || "demo";

      const response = await fetch(
        `https://api.twelvedata.com/price?symbol=${symbolString}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Process the response
      const prices = {};
      Object.keys(data).forEach((symbol) => {
        if (data[symbol] && data[symbol].price) {
          prices[symbol] = parseFloat(data[symbol].price);
        }
      });

      return prices;
    } catch (error) {
      console.error("Error fetching prices from TwelveData:", error);
      throw error;
    }
  },

  async getSinglePrice(symbol) {
    const prices = await this.getMultiplePrices([symbol]);
    return prices[symbol] || null;
  },
};
