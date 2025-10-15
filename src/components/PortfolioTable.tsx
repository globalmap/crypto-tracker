import type { PortfolioItem, CryptoData } from "../types";
import PortfolioRow from "./PortfolioRow";

const PortfolioTable: React.FC<{
  portfolio: PortfolioItem[];
  cryptoData: CryptoData[];
  isDarkMode: boolean;
  lastUpdate: Date;
  expandedRows: Set<string>;
  onToggleRow: (id: string) => void;
}> = ({ portfolio, cryptoData, isDarkMode, lastUpdate, expandedRows, onToggleRow }) => (
  <div className={`rounded-lg shadow-sm overflow-hidden ${
    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
  }`}>
    <div className={`p-6 ${isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}`}>
      <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Your Portfolio
      </h2>
      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Last updated: {lastUpdate.toLocaleTimeString()}
      </p>
    </div>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className={isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}>
            <th className={`text-left p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Asset
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Price
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              24h Change
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Holdings
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Value
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Profit/Loss
            </th>
            <th className={`text-right p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Market Cap
            </th>
            <th className={`text-center p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Chart
            </th>
          </tr>
        </thead>
        <tbody>
          {portfolio.map((coin) => {
            const crypto = cryptoData.find(c => c.id === coin.id);
            if (!crypto) return null;
            
            return (
              <PortfolioRow
                key={coin.id}
                coin={coin}
                crypto={crypto}
                isDarkMode={isDarkMode}
                isExpanded={expandedRows.has(coin.id)}
                onToggle={() => onToggleRow(coin.id)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

export default PortfolioTable;