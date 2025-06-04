import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HoldingsTable from '../components/portfolio/HoldingsTable';
import TradeModal from '../components/shared/TradeModal';
import { usePortfolioStore } from '../store/portfolioStore';

const Portfolio: React.FC = () => {
  const { holdings, fetchPortfolio, isLoading } = usePortfolioStore();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [selectedHoldingId, setSelectedHoldingId] = useState<string>('');
  
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);
  
  const handleSell = (holdingId: string) => {
    setSelectedHoldingId(holdingId);
    setIsTradeModalOpen(true);
  };
  
  const closeTradeModal = () => {
    setIsTradeModalOpen(false);
    setSelectedHoldingId('');
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
      
      <HoldingsTable
        holdings={holdings}
        onSell={handleSell}
      />
      
      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={closeTradeModal}
        stock={null}
        type="sell"
        holdingId={selectedHoldingId}
      />
    </motion.div>
  );
};

export default Portfolio;