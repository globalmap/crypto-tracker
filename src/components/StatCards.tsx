import { DollarSign, Wallet, TrendingUp, TrendingDown, Activity } from "lucide-react";
import type { PortfolioStats } from "../types";
import { formatNumber } from "../utils";

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  valueColor?: string;
  isDarkMode: boolean;
}> = ({ icon, label, value, valueColor, isDarkMode }) => (
  <div className={`rounded-lg p-6 shadow-sm ${
    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
  }`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{label}</p>
    </div>
    <p className={`text-3xl font-bold ${valueColor || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
      {value}
    </p>
  </div>
);

const StatsCards: React.FC<{
  stats: PortfolioStats;
  isDarkMode: boolean;
}> = ({ stats, isDarkMode }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <StatCard
      icon={<DollarSign className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
      label="Total Value"
      value={formatNumber(stats.totalValue)}
      isDarkMode={isDarkMode}
    />
    <StatCard
      icon={<Wallet className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
      label="Invested"
      value={formatNumber(stats.totalInvested)}
      isDarkMode={isDarkMode}
    />
    <StatCard
      icon={<Activity className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />}
      label="Profit/Loss"
      value={formatNumber(stats.profit)}
      valueColor={stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}
      isDarkMode={isDarkMode}
    />
    <StatCard
      icon={stats.profitPercent >= 0 ? (
        <TrendingUp className="w-5 h-5 text-green-600" />
      ) : (
        <TrendingDown className="w-5 h-5 text-red-600" />
      )}
      label="ROI"
      value={`${stats.profitPercent.toFixed(2)}%`}
      valueColor={stats.profitPercent >= 0 ? 'text-green-600' : 'text-red-600'}
      isDarkMode={isDarkMode}
    />
  </div>
);

export default StatsCards;