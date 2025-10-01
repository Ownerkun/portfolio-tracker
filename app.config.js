import "dotenv/config";

export default {
  expo: {
    name: "Portfolio Tracker",
    slug: "portfolio-tracker",
    extra: {
      eas: {
        projectId: "94f21bed-b513-4b96-85a1-56271efc4628",
      },
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
    android: {
      package: "com.ownerkun.portfoliotracker",
    },
  },
};
