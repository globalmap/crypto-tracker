import type { PortfolioItem, CryptoData, PortfolioStats } from "../types";

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
};

export const formatMarketCap = (num: number): string => {
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return formatNumber(num);
};

export const calculatePortfolioValue = (
  portfolio: PortfolioItem[],
  cryptoData: CryptoData[]
): PortfolioStats => {
  let totalValue = 0;
  let totalInvested = 0;
  
  portfolio.forEach(coin => {
    const currentPrice = cryptoData.find(c => c.id === coin.id)?.price || 0;
    totalValue += coin.amount * currentPrice;
    totalInvested += coin.amount * coin.buyPrice;
  });
  
  return {
    totalValue,
    totalInvested,
    profit: totalValue - totalInvested,
    profitPercent: totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested) * 100 : 0
  };
};