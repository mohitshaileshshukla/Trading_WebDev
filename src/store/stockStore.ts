import { create } from 'zustand';
import { Stock } from '../types';

interface StockState {
  stocks: Stock[];
  selectedStocks: string[];
  isLoading: boolean;
  fetchStocks: () => Promise<void>;
  selectStock: (symbol: string) => void;
  deselectStock: (symbol: string) => void;
  clearSelection: () => void;
}

export const useStockStore = create<StockState>((set, get) => ({
  stocks: [],
  selectedStocks: [],
  isLoading: false,

  fetchStocks: async () => {
    set({ isLoading: true });
    try {
      // Mock API call - in a real app this would call the backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock stock data
      const mockStocks: Stock[] = [
        {
          id: '1',
          symbol: 'RELIANCE',
          name: 'Reliance Industries',
          currentPrice: 2876.45,
          previousClose: 2842.24,
          change: 34.21,
          changePercent: 1.25,
          nineMA: 2850.32,
          nineMAChange: 'up',
          rsi: 62.8,
          signal: 'buy'
        },
        {
          id: '2',
          symbol: 'TCS',
          name: 'Tata Consultancy Services',
          currentPrice: 3542.30,
          previousClose: 3558.26,
          change: -15.96,
          changePercent: -0.45,
          nineMA: 3550.75,
          nineMAChange: 'down',
          rsi: 48.5,
          signal: 'sell'
        },
        {
          id: '3',
          symbol: 'HDFCBANK',
          name: 'HDFC Bank',
          currentPrice: 1678.90,
          previousClose: 1665.25,
          change: 13.65,
          changePercent: 0.85,
          nineMA: 1665.40,
          nineMAChange: 'up',
          rsi: 58.2,
          signal: 'buy'
        },
        {
          id: '4',
          symbol: 'INFY',
          name: 'Infosys',
          currentPrice: 1489.65,
          previousClose: 1484.45,
          change: 5.20,
          changePercent: 0.35,
          nineMA: 1485.20,
          nineMAChange: 'up',
          rsi: 53.4,
          signal: 'hold'
        },
        {
          id: '5',
          symbol: 'ICICIBANK',
          name: 'ICICI Bank',
          currentPrice: 945.20,
          previousClose: 934.56,
          change: 10.64,
          changePercent: 1.15,
          nineMA: 935.80,
          nineMAChange: 'up',
          rsi: 65.7,
          signal: 'buy'
        },
        {
          id: '6',
          symbol: 'HINDUNILVR',
          name: 'Hindustan Unilever',
          currentPrice: 2456.75,
          previousClose: 2472.75,
          change: -16.00,
          changePercent: -0.65,
          nineMA: 2470.30,
          nineMAChange: 'down',
          rsi: 42.3,
          signal: 'sell'
        }
      ];
      
      set({ stocks: mockStocks, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch stocks:', error);
    }
  },

  selectStock: (symbol) => {
    const { selectedStocks } = get();
    if (selectedStocks.length < 5 && !selectedStocks.includes(symbol)) {
      set({ selectedStocks: [...selectedStocks, symbol] });
    }
  },

  deselectStock: (symbol) => {
    const { selectedStocks } = get();
    set({ selectedStocks: selectedStocks.filter(s => s !== symbol) });
  },

  clearSelection: () => {
    set({ selectedStocks: [] });
  }
}));