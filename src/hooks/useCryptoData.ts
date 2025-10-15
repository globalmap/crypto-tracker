import { useEffect, useState } from "react";
import type { PortfolioItem, CryptoData, CoinGeckoChartResponse, CoinGeckoResponse } from "../types";

export const useCryptoData = (portfolio: PortfolioItem[]) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchCryptoChart = async (id: string): Promise<number[]> => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      const data: CoinGeckoChartResponse = await response.json();
      return data.prices.map(p => p[1]);
    } catch (error) {
      console.error(`Error fetching chart for ${id}:`, error);
      return [];
    }
  };

  const fetchCryptoData = async (): Promise<void> => {
    setLoading(true);
    try {
      const ids = portfolio.map(p => p.id).join(',');
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true`
      );
      const data: CoinGeckoResponse = await response.json();
      
      const formattedData: CryptoData[] = await Promise.all(
        Object.keys(data).map(async key => {
          const sparkline = await fetchCryptoChart(key);
          return {
            id: key,
            name: key.charAt(0).toUpperCase() + key.slice(1),
            price: data[key].usd,
            change24h: data[key].usd_24h_change,
            marketCap: data[key].usd_market_cap,
            sparkline
          };
        })
      );
      
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
  }, []);

  return { cryptoData, loading, lastUpdate, fetchCryptoData };
};