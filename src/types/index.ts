
export interface CryptoData {
  id: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  sparkline?: number[];
}

export interface PortfolioItem {
  id: string;
  amount: number;
  buyPrice: number;
}

export interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  profit: number;
  profitPercent: number;
}

export interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
  };
}

export interface CoinGeckoChartResponse {
  prices: [number, number][];
}