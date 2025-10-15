import React, { useState } from 'react';
import Header from './components/Header';
import PortfolioTable from './components/PortfolioTable';
import StatsCards from './components/StatCards';
import { useCryptoData } from './hooks/useCryptoData';
import { useTheme } from './hooks/useTheme';
import type { PortfolioItem } from './types';
import { calculatePortfolioValue } from './utils';

const App: React.FC = () => {
  const [portfolio] = useState<PortfolioItem[]>([
    { id: 'bitcoin', amount: 0.5, buyPrice: 45000 },
    { id: 'ethereum', amount: 3, buyPrice: 2800 },
    { id: 'cardano', amount: 1000, buyPrice: 0.45 }
  ]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const { isDarkMode, toggleTheme } = useTheme();
  const { cryptoData, loading, lastUpdate, fetchCryptoData } = useCryptoData(portfolio);

  const portfolioStats = calculatePortfolioValue(portfolio, cryptoData);

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className={`min-h-screen p-4 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <Header
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onRefresh={fetchCryptoData}
          loading={loading}
        />
        
        <StatsCards stats={portfolioStats} isDarkMode={isDarkMode} />
        
        <PortfolioTable
          portfolio={portfolio}
          cryptoData={cryptoData}
          isDarkMode={isDarkMode}
          lastUpdate={lastUpdate}
          expandedRows={expandedRows}
          onToggleRow={toggleRow}
        />

        <div className={`mt-6 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
          <p>Data provided by CoinGecko API • Updates every 60 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default App;