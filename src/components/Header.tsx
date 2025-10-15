import { Wallet, Sun, Moon, RefreshCw } from "lucide-react";

const Header: React.FC<{
  isDarkMode: boolean;
  toggleTheme: () => void;
  onRefresh: () => void;
  loading: boolean;
}> = ({ isDarkMode, toggleTheme, onRefresh, loading }) => (
  <div className="flex items-center justify-between mb-8 pt-6">
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-800'}`}>
        <Wallet className="w-8 h-8 text-white" />
      </div>
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Crypto Portfolio Tracker
        </h1>
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Real-time cryptocurrency management
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg transition-colors ${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <button
        onClick={onRefresh}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white' 
            : 'bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400 text-white'
        }`}
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        Refresh
      </button>
    </div>
  </div>
);

export default Header; 