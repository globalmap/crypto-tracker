import { LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from "recharts";

const PriceChart: React.FC<{
  data: number[];
  change24h: number;
  isDarkMode: boolean;
}> = ({ data, change24h, isDarkMode }) => (
  <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      7-Day Price Chart
    </h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data.map((price, i) => ({ price, day: i }))}>
        <XAxis 
          dataKey="day" 
          stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
          tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
        />
        <YAxis 
          stroke={isDarkMode ? '#6B7280' : '#9CA3AF'}
          tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
            border: `1px solid ${isDarkMode ? '#374151' : '#E5E7EB'}`,
            borderRadius: '8px',
            color: isDarkMode ? '#FFFFFF' : '#111827'
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
          labelFormatter={(label) => `Day ${label}`}
        />
        <Line 
          type="monotone" 
          dataKey="price" 
          stroke={change24h >= 0 ? '#10B981' : '#EF4444'}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default PriceChart;