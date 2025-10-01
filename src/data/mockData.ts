export interface Profile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  birth_date: string | null;
  job_title: string | null;
  income: number | null;
  created_at: string;
  updated_at: string;
}

export interface AssetType {
  id: string;
  name: string;
  icon: string;
  description: string;
  created_at: string;
}

export interface UserAsset {
  id: string;
  user_id: string;
  asset_type_id: string;
  symbol: string;
  name: string;
  quantity: number;
  average_buy_price: number;
  current_price: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Computed fields
  asset_type?: AssetType;
  total_value?: number;
  profit_loss?: number;
  profit_loss_percentage?: number;
}

export interface Transaction {
  id: string;
  user_id: string;
  asset_id: string;
  transaction_type: 'buy' | 'sell';
  quantity: number;
  price_per_unit: number;
  total_amount: number;
  transaction_date: string;
  fees: number;
  notes: string | null;
  created_at: string;
  // For display
  asset?: UserAsset;
}

// ============================================
// MOCK USER PROFILE
// ============================================

export const mockProfile: Profile = {
  id: 'user-123-456-789',
  username: 'john_investor',
  full_name: 'John Anderson',
  avatar_url: 'https://i.pravatar.cc/150?img=12',
  birth_date: '1990-05-15',
  job_title: 'Software Engineer',
  income: 85000.00,
  created_at: '2024-01-15T08:30:00Z',
  updated_at: '2024-09-28T14:22:00Z',
};

// ============================================
// ASSET TYPES (SEED DATA)
// ============================================

export const mockAssetTypes: AssetType[] = [
  {
    id: 'asset-type-1',
    name: 'Stock',
    icon: '📈',
    description: 'Company stocks and equities',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'asset-type-2',
    name: 'Cryptocurrency',
    icon: '₿',
    description: 'Digital currencies',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'asset-type-3',
    name: 'Mutual Fund',
    icon: '📊',
    description: 'Mutual funds and ETFs',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'asset-type-4',
    name: 'Bond',
    icon: '🏦',
    description: 'Government and corporate bonds',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'asset-type-5',
    name: 'Real Estate',
    icon: '🏠',
    description: 'Property investments',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: 'asset-type-6',
    name: 'Commodity',
    icon: '🪙',
    description: 'Gold, silver, oil, etc.',
    created_at: '2024-01-01T00:00:00Z',
  },
];

// ============================================
// USER ASSETS WITH COMPUTED FIELDS
// ============================================

export const mockUserAssets: UserAsset[] = [
  {
    id: 'asset-1',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    quantity: 50,
    average_buy_price: 150.25,
    current_price: 178.50,
    notes: 'Long-term hold',
    created_at: '2024-03-10T10:30:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-2',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-1',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    quantity: 25,
    average_buy_price: 135.80,
    current_price: 142.30,
    notes: null,
    created_at: '2024-04-15T14:20:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-3',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-1',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    quantity: 30,
    average_buy_price: 380.00,
    current_price: 415.25,
    notes: 'Tech sector diversification',
    created_at: '2024-02-20T11:45:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-4',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-2',
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.5,
    average_buy_price: 42000.00,
    current_price: 63500.00,
    notes: 'DCA strategy',
    created_at: '2024-01-05T16:00:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-5',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-2',
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 2.5,
    average_buy_price: 2200.00,
    current_price: 2650.00,
    notes: 'Staking rewards',
    created_at: '2024-02-01T09:30:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-6',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-3',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    quantity: 100,
    average_buy_price: 410.50,
    current_price: 445.80,
    notes: 'Retirement fund',
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-7',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-3',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    quantity: 75,
    average_buy_price: 225.00,
    current_price: 248.90,
    notes: null,
    created_at: '2024-03-01T10:30:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-8',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-4',
    symbol: 'AGG',
    name: 'iShares Core U.S. Aggregate Bond ETF',
    quantity: 200,
    average_buy_price: 98.50,
    current_price: 95.20,
    notes: 'Fixed income allocation',
    created_at: '2024-02-15T13:00:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
  {
    id: 'asset-9',
    user_id: 'user-123-456-789',
    asset_type_id: 'asset-type-6',
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    quantity: 50,
    average_buy_price: 185.00,
    current_price: 195.40,
    notes: 'Hedge against inflation',
    created_at: '2024-04-01T15:30:00Z',
    updated_at: '2024-09-28T09:15:00Z',
  },
];

// Add computed fields to assets
export const enrichedMockAssets = mockUserAssets.map(asset => {
  const assetType = mockAssetTypes.find(t => t.id === asset.asset_type_id);
  const totalValue = asset.current_price ? asset.quantity * asset.current_price : 0;
  const totalCost = asset.quantity * asset.average_buy_price;
  const profitLoss = totalValue - totalCost;
  const profitLossPercentage = totalCost > 0 ? (profitLoss / totalCost) * 100 : 0;

  return {
    ...asset,
    asset_type: assetType,
    total_value: totalValue,
    profit_loss: profitLoss,
    profit_loss_percentage: profitLossPercentage,
  };
});

// ============================================
// TRANSACTIONS
// ============================================

export const mockTransactions: Transaction[] = [
  // Apple transactions
  {
    id: 'txn-1',
    user_id: 'user-123-456-789',
    asset_id: 'asset-1',
    transaction_type: 'buy',
    quantity: 30,
    price_per_unit: 148.50,
    total_amount: 4455.00,
    transaction_date: '2024-03-10T10:30:00Z',
    fees: 5.00,
    notes: 'Initial position',
    created_at: '2024-03-10T10:30:00Z',
  },
  {
    id: 'txn-2',
    user_id: 'user-123-456-789',
    asset_id: 'asset-1',
    transaction_type: 'buy',
    quantity: 20,
    price_per_unit: 152.75,
    total_amount: 3055.00,
    transaction_date: '2024-05-22T14:15:00Z',
    fees: 5.00,
    notes: 'Adding to position',
    created_at: '2024-05-22T14:15:00Z',
  },
  // Google transactions
  {
    id: 'txn-3',
    user_id: 'user-123-456-789',
    asset_id: 'asset-2',
    transaction_type: 'buy',
    quantity: 25,
    price_per_unit: 135.80,
    total_amount: 3395.00,
    transaction_date: '2024-04-15T14:20:00Z',
    fees: 5.00,
    notes: null,
    created_at: '2024-04-15T14:20:00Z',
  },
  // Microsoft transactions
  {
    id: 'txn-4',
    user_id: 'user-123-456-789',
    asset_id: 'asset-3',
    transaction_type: 'buy',
    quantity: 30,
    price_per_unit: 380.00,
    total_amount: 11400.00,
    transaction_date: '2024-02-20T11:45:00Z',
    fees: 10.00,
    notes: 'Tech sector diversification',
    created_at: '2024-02-20T11:45:00Z',
  },
  // Bitcoin transactions
  {
    id: 'txn-5',
    user_id: 'user-123-456-789',
    asset_id: 'asset-4',
    transaction_type: 'buy',
    quantity: 0.25,
    price_per_unit: 40000.00,
    total_amount: 10000.00,
    transaction_date: '2024-01-05T16:00:00Z',
    fees: 50.00,
    notes: 'First BTC purchase',
    created_at: '2024-01-05T16:00:00Z',
  },
  {
    id: 'txn-6',
    user_id: 'user-123-456-789',
    asset_id: 'asset-4',
    transaction_type: 'buy',
    quantity: 0.25,
    price_per_unit: 44000.00,
    total_amount: 11000.00,
    transaction_date: '2024-03-15T09:20:00Z',
    fees: 50.00,
    notes: 'DCA buy',
    created_at: '2024-03-15T09:20:00Z',
  },
  // Ethereum transactions
  {
    id: 'txn-7',
    user_id: 'user-123-456-789',
    asset_id: 'asset-5',
    transaction_type: 'buy',
    quantity: 2.5,
    price_per_unit: 2200.00,
    total_amount: 5500.00,
    transaction_date: '2024-02-01T09:30:00Z',
    fees: 25.00,
    notes: null,
    created_at: '2024-02-01T09:30:00Z',
  },
  // VOO transactions
  {
    id: 'txn-8',
    user_id: 'user-123-456-789',
    asset_id: 'asset-6',
    transaction_type: 'buy',
    quantity: 50,
    price_per_unit: 405.00,
    total_amount: 20250.00,
    transaction_date: '2024-01-10T08:00:00Z',
    fees: 0.00,
    notes: 'Commission-free trade',
    created_at: '2024-01-10T08:00:00Z',
  },
  {
    id: 'txn-9',
    user_id: 'user-123-456-789',
    asset_id: 'asset-6',
    transaction_type: 'buy',
    quantity: 50,
    price_per_unit: 416.00,
    total_amount: 20800.00,
    transaction_date: '2024-06-15T10:30:00Z',
    fees: 0.00,
    notes: 'Monthly contribution',
    created_at: '2024-06-15T10:30:00Z',
  },
  // VTI transactions
  {
    id: 'txn-10',
    user_id: 'user-123-456-789',
    asset_id: 'asset-7',
    transaction_type: 'buy',
    quantity: 75,
    price_per_unit: 225.00,
    total_amount: 16875.00,
    transaction_date: '2024-03-01T10:30:00Z',
    fees: 0.00,
    notes: null,
    created_at: '2024-03-01T10:30:00Z',
  },
  // Bond transactions
  {
    id: 'txn-11',
    user_id: 'user-123-456-789',
    asset_id: 'asset-8',
    transaction_type: 'buy',
    quantity: 200,
    price_per_unit: 98.50,
    total_amount: 19700.00,
    transaction_date: '2024-02-15T13:00:00Z',
    fees: 0.00,
    notes: 'Fixed income allocation',
    created_at: '2024-02-15T13:00:00Z',
  },
  // Gold transactions
  {
    id: 'txn-12',
    user_id: 'user-123-456-789',
    asset_id: 'asset-9',
    transaction_type: 'buy',
    quantity: 50,
    price_per_unit: 185.00,
    total_amount: 9250.00,
    transaction_date: '2024-04-01T15:30:00Z',
    fees: 0.00,
    notes: 'Hedge against inflation',
    created_at: '2024-04-01T15:30:00Z',
  },
  // Recent sell transaction
  {
    id: 'txn-13',
    user_id: 'user-123-456-789',
    asset_id: 'asset-2',
    transaction_type: 'sell',
    quantity: 0, // Sold 0 shares for now (adjust if needed)
    price_per_unit: 140.50,
    total_amount: 0,
    transaction_date: '2024-09-01T11:00:00Z',
    fees: 5.00,
    notes: 'Partial profit taking',
    created_at: '2024-09-01T11:00:00Z',
  },
];

// ============================================
// PORTFOLIO SUMMARY (COMPUTED)
// ============================================

export const calculatePortfolioSummary = () => {
  let totalValue = 0;
  let totalCost = 0;

  enrichedMockAssets.forEach(asset => {
    totalValue += asset.total_value || 0;
    totalCost += asset.quantity * asset.average_buy_price;
  });

  const totalProfitLoss = totalValue - totalCost;
  const totalProfitLossPercentage = totalCost > 0 ? (totalProfitLoss / totalCost) * 100 : 0;

  return {
    totalValue,
    totalCost,
    totalProfitLoss,
    totalProfitLossPercentage,
    totalAssets: mockUserAssets.length,
  };
};

// ============================================
// HELPER FUNCTIONS FOR FRONTEND
// ============================================

export const getAssetsByType = (assetTypeId: string) => {
  return enrichedMockAssets.filter(asset => asset.asset_type_id === assetTypeId);
};

export const getTransactionsByAsset = (assetId: string) => {
  return mockTransactions.filter(txn => txn.asset_id === assetId);
};

export const getRecentTransactions = (limit: number = 10) => {
  return [...mockTransactions]
    .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
    .slice(0, limit);
};

// ============================================
// EXPORT ALL
// ============================================

export default {
  profile: mockProfile,
  assetTypes: mockAssetTypes,
  assets: enrichedMockAssets,
  transactions: mockTransactions,
  portfolioSummary: calculatePortfolioSummary(),
};