import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, Wallet, DollarSign, Activity } from 'lucide-react';

interface CryptoData {
  id: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
}

interface PortfolioItem {
  id: string;
  amount: number;
  buyPrice: number;
}

interface PortfolioStats {
  totalValue: number;
  totalInvested: number;
  profit: number;
  profitPercent: number;
}

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
  };
}

const CryptoTracker: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    { id: 'bitcoin', amount: 0.5, buyPrice: 45000 },
    { id: 'ethereum', amount: 3, buyPrice: 2800 },
    { id: 'cardano', amount: 1000, buyPrice: 0.45 }
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchCryptoData = async (): Promise<void> => {
    setLoading(true);
    try {
      const ids = portfolio.map(p => p.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
      );
      const data: CoinGeckoResponse = await response.json();
      
      const formattedData: CryptoData[] = Object.keys(data).map(key => ({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        price: data[key].usd,
        change24h: data[key].usd_24h_change,
        marketCap: data[key].usd_market_cap
      }));
      
      setCryptoData(formattedData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, [portfolio]);

  const calculatePortfolioValue = (): PortfolioStats => {
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

  const portfolioStats: PortfolioStats = calculatePortfolioValue();

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatMarketCap = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return formatNumber(num);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 pt-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Crypto Portfolio Tracker</h1>
              <p className="text-gray-600 text-sm">Real-time cryptocurrency management</p>
            </div>
          </div>
          <button
            onClick={fetchCryptoData}
            disabled={loading}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 text-sm">Total Value</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(portfolioStats.totalValue)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 text-sm">Invested</p>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatNumber(portfolioStats.totalInvested)}</p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-gray-600" />
              <p className="text-gray-600 text-sm">Profit/Loss</p>
            </div>
            <p className={`text-3xl font-bold ${portfolioStats.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatNumber(portfolioStats.profit)}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              {portfolioStats.profitPercent >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <p className="text-gray-600 text-sm">ROI</p>
            </div>
            <p className={`text-3xl font-bold ${portfolioStats.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioStats.profitPercent.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Portfolio</h2>
            <p className="text-gray-600 text-sm mt-1">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 text-gray-700 font-semibold">Asset</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">Price</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">24h Change</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">Holdings</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">Value</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">Profit/Loss</th>
                  <th className="text-right p-4 text-gray-700 font-semibold">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((coin) => {
                  const crypto = cryptoData.find(c => c.id === coin.id);
                  if (!crypto) return null;
                  
                  const currentValue = coin.amount * crypto.price;
                  const investedValue = coin.amount * coin.buyPrice;
                  const profit = currentValue - investedValue;
                  const profitPercent = investedValue > 0 ? ((profit / investedValue) * 100) : 0;
                  
                  return (
                    <tr key={coin.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-700 font-bold text-lg">
                              {crypto.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-gray-900 font-semibold">{crypto.name}</p>
                            <p className="text-gray-500 text-sm uppercase">{coin.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right p-4 text-gray-900 font-mono">
                        {formatNumber(crypto.price)}
                      </td>
                      <td className="text-right p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                          crypto.change24h >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {crypto.change24h >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {Math.abs(crypto.change24h).toFixed(2)}%
                        </span>
                      </td>
                      <td className="text-right p-4 text-gray-900 font-mono">
                        {coin.amount.toLocaleString()}
                      </td>
                      <td className="text-right p-4 text-gray-900 font-mono font-semibold">
                        {formatNumber(currentValue)}
                      </td>
                      <td className="text-right p-4">
                        <div className={`font-mono ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <div className="font-semibold">{formatNumber(profit)}</div>
                          <div className="text-sm">{profitPercent.toFixed(2)}%</div>
                        </div>
                      </td>
                      <td className="text-right p-4 text-gray-600 font-mono">
                        {formatMarketCap(crypto.marketCap)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p>Data provided by CoinGecko API • Updates every 60 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;