import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StockFilter from '../components/screener/StockFilter';
import StockCard from '../components/screener/StockCard';
import TradeModal from '../components/shared/TradeModal';
import { useStockStore } from '../store/stockStore';
import { Stock } from '../types';

const Screener: React.FC = () => {
  const { stocks, selectedStocks, fetchStocks, selectStock, deselectStock, clearSelection, isLoading } = useStockStore();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  
  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);
  
  const filteredStocks = selectedStocks.length > 0
    ? stocks.filter(stock => selectedStocks.includes(stock.symbol))
    : stocks;
  
  const handleBuy = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeType('buy');
    setIsTradeModalOpen(true);
  };
  
  const handleSell = (stock: Stock) => {
    setSelectedStock(stock);
    setTradeType('sell');
    setIsTradeModalOpen(true);
  };
  
  const closeTradeModal = () => {
    setIsTradeModalOpen(false);
    setSelectedStock(null);
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Screener</h1>
      
      <StockFilter
        selectedStocks={selectedStocks}
        onSelectStock={selectStock}
        onDeselectStock={deselectStock}
        onClearSelection={clearSelection}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStocks.map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        ))}
        
        {filteredStocks.length === 0 && (
          <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {selectedStocks.length > 0
                ? 'No stocks match your selection criteria.'
                : 'Select stocks to view detailed information.'}
            </p>
          </div>
        )}
      </div>
      
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={closeTradeModal}
        stock={selectedStock}
        type={tradeType}
      />
    </motion.div>
  );
};

export default Screener;