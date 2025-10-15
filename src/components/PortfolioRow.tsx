import { TrendingUp, TrendingDown, ChevronUp, ChevronDown } from "lucide-react";
import type { PortfolioItem, CryptoData } from "../types";
import { formatNumber, formatMarketCap } from "../utils";
import PriceChart from "./PriceChart";

const PortfolioRow: React.FC<{
  coin: PortfolioItem;
  crypto: CryptoData;
  isDarkMode: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ coin, crypto, isDarkMode, isExpanded, onToggle }) => {
  const currentValue = coin.amount * crypto.price;
  const investedValue = coin.amount * coin.buyPrice;
  const profit = currentValue - investedValue;
  const profitPercent = investedValue > 0 ? ((profit / investedValue) * 100) : 0;

  return (
    <>
      <tr 
        className={`transition-colors ${
          isDarkMode 
            ? 'border-t border-gray-700 hover:bg-gray-700' 
            : 'border-t border-gray-200 hover:bg-gray-50'
        }`}
      >
        <td className="p-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <span className={`font-bold text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {crypto.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {crypto.name}
              </p>
              <p className={`text-sm uppercase ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {coin.id}
              </p>
            </div>
          </div>
        </td>
        <td className={`text-right p-4 font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatNumber(crypto.price)}
        </td>
        <td className="text-right p-4">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
            crypto.change24h >= 0 
              ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
              : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
          }`}>
            {crypto.change24h >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(crypto.change24h).toFixed(2)}%
          </span>
        </td>
        <td className={`text-right p-4 font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {coin.amount.toLocaleString()}
        </td>
        <td className={`text-right p-4 font-mono font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {formatNumber(currentValue)}
        </td>
        <td className="text-right p-4">
          <div className={`font-mono ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <div className="font-semibold">{formatNumber(profit)}</div>
            <div className="text-sm">{profitPercent.toFixed(2)}%</div>
          </div>
        </td>
        <td className={`text-right p-4 font-mono ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {formatMarketCap(crypto.marketCap)}
        </td>
        <td className="text-center p-4">
          <button
            onClick={onToggle}
            className={`p-1 rounded hover:bg-gray-200 ${isDarkMode ? 'hover:bg-gray-600' : ''}`}
          >
            {isExpanded ? (
              <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            ) : (
              <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            )}
          </button>
        </td>
      </tr>
      {isExpanded && crypto.sparkline && crypto.sparkline.length > 0 && (
        <tr className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
          <td colSpan={8} className="p-6">
            <PriceChart data={crypto.sparkline} change24h={crypto.change24h} isDarkMode={isDarkMode} />
          </td>
        </tr>
      )}
    </>
  );
};

export default PortfolioRow;