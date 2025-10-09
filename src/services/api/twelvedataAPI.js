export const twelvedataAPI = {
  async getMultiplePrices(symbols) {
    try {
      if (!symbols || symbols.length === 0) return {};

      const symbolString = symbols.join(",");
      const apiKey = process.env.EXPO_PUBLIC_TWELVEDATA_API_KEY || "demo";

      const response = await fetch(
        `https://api.twelvedata.com/price?symbol=${symbolString}&apikey=${apiKey}`
      );

      // Debug Log
      console.log(
        `https://api.twelvedata.com/price?symbol=${symbolString}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      // Debug Log
      console.log("Raw API response:", JSON.stringify(data, null, 2));

      // Process the response
      const prices = {};
      if (symbols.length === 1) {
        // Single symbol case: response is { "price": "193.87" }
        const symbol = symbols[0];
        if (data.price) {
          prices[symbol] = parseFloat(data.price);
        }
      } else {
        // Multiple symbols case: response is { "SYMBOL1": { "price": "123.45" }, "SYMBOL2": { "price": "67.89" } }
        symbols.forEach((symbol) => {
          if (data[symbol] && data[symbol].price) {
            prices[symbol] = parseFloat(data[symbol].price);
          }
        });
      }

      // Debug Log
      console.log("Price: " + prices);

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
