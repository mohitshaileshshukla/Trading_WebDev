import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Button from '../shared/Button';

interface StockFilterProps {
  selectedStocks: string[];
  onSelectStock: (symbol: string) => void;
  onDeselectStock: (symbol: string) => void;
  onClearSelection: () => void;
}

const StockFilter: React.FC<StockFilterProps> = ({
  selectedStocks,
  onSelectStock,
  onDeselectStock,
  onClearSelection,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nifty50Stocks = ["RELIANCE",
    "TCS",
    "HDFCBANK - HDFC Bank",
    "INFY - Infosys",
    "ICICIBANK - ICICI Bank",
    "HINDUNILVR - Hindustan Unilever",
    "ITC - ITC Limited",
    "SBIN - State Bank of India",
    "BHARTIARTL - Bharti Airtel",
    "BAJFINANCE - Bajaj Finance",
    "KOTAKBANK - Kotak Mahindra Bank",
    "LT - Larsen & Toubro",
    "HCLTECH - HCL Technologies",
    "AXISBANK - Axis Bank",
    "ASIANPAINT - Asian Paints",
    "MARUTI - Maruti Suzuki India",
    "WIPRO - Wipro",
    "SUNPHARMA - Sun Pharmaceutical Industries",
    "TITAN - Titan Company",
    "ULTRACEMCO - UltraTech Cement",
    "POWERGRID - Power Grid Corporation of India",
    "NESTLEIND - Nestlé India",
    "TECHM - Tech Mahindra",
    "ONGC - Oil and Natural Gas Corporation",
    "DIVISLAB - Divi’s Laboratories",
    "HDFCLIFE - HDFC Life Insurance",
    "M&M - Mahindra & Mahindra",
    "JSWSTEEL - JSW Steel",
    "BAJAJ-AUTO - Bajaj Auto",
    "ADANIPORTS - Adani Ports and Special Economic Zone",
    "TATASTEEL - Tata Steel",
    "HINDALCO - Hindalco Industries",
    "COALINDIA - Coal India",
    "EICHERMOT - Eicher Motors",
    "GRASIM - Grasim Industries",
    "BRITANNIA - Britannia Industries",
    "CIPLA - Cipla",
    "BPCL - Bharat Petroleum Corporation Limited",
    "DRREDDY - Dr. Reddy’s Laboratories",
    "HEROMOTOCO - Hero MotoCorp",
    "SBILIFE - SBI Life Insurance",
    "HAVELLS",
    "SHREECEM - Shree Cement",
    "GAIL - GAIL (India)",
    "IOC - Indian Oil Corporation",
    "VEDL - Vedanta Limited",
    "MCDOWELL-N - United Spirits (McDowell’s)",
    "INDUSINDBK - IndusInd Bank",
    "ADANIGREEN - Adani Green Energy",
    "AMBUJACEM",];

  const filteredStocks = nifty50Stocks.filter(
    (stock) =>
      stock.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedStocks.includes(stock)
  );

  const handleSelect = (stock: string) => {
    onSelectStock(stock);
    setSearchQuery('');
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 relative"
    >
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search NIFTY50 stocks..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true);
          }}
          onFocus={() => setDropdownOpen(true)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-900 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {isDropdownOpen && filteredStocks.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
            {filteredStocks.map((stock) => (
              <button
                key={stock}
                onClick={() => handleSelect(stock)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                type="button"
              >
                {stock}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {selectedStocks.map((stock) => (
          <div
            key={stock}
            className="inline-flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
          >
            {stock}
            <button
              onClick={() => onDeselectStock(stock)}
              className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {selectedStocks.length > 0 && (
        <div className="flex justify-end">
          <Button size="sm" variant="secondary" onClick={onClearSelection}>
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  );
};

export default StockFilter;
