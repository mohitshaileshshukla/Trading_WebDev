import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PortfolioSummaryCard from '../components/dashboard/PortfolioSummaryCard';
import WatchlistCard from '../components/dashboard/WatchlistCard';
import AllocationChart from '../components/dashboard/AllocationChart';
import { usePortfolioStore } from '../store/portfolioStore';
import { useStockStore } from '../store/stockStore';

const Dashboard: React.FC = () => {
  const { summary, performanceData, allocationData, fetchPortfolio, isLoading: portfolioLoading } = usePortfolioStore();
  const { stocks, fetchStocks, isLoading: stocksLoading } = useStockStore();
  
  useEffect(() => {
    fetchPortfolio();
    fetchStocks();
  }, [fetchPortfolio, fetchStocks]);
  
  const isLoading = portfolioLoading || stocksLoading;
  
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioSummaryCard 
            summary={summary} 
            performanceData={performanceData} 
          />
        </div>
        <div>
          <AllocationChart data={allocationData} />
        </div>
      </div>
      
      <div>
        <WatchlistCard stocks={stocks} />
      </div>
    </motion.div>
  );
};

export default Dashboard;