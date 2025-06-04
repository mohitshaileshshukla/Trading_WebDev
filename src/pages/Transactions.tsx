import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import TransactionsTable from '../components/portfolio/TransactionsTable';
import { usePortfolioStore } from '../store/portfolioStore';

const Transactions: React.FC = () => {
  const { transactions, fetchPortfolio, isLoading } = usePortfolioStore();
  
  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);
  
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction History</h1>
      
      <TransactionsTable transactions={transactions} />
    </motion.div>
  );
};

export default Transactions;