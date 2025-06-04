import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Input from './Input';
import { Stock } from '../../types';
import { formatCurrency } from '../../utils/formatter';
import { usePortfolioStore } from '../../store/portfolioStore';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock: Stock | null;
  type: 'buy' | 'sell';
  holdingId?: string;
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose, stock, type, holdingId }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string>('');
  const { summary, buyStock, sellStock, holdings } = usePortfolioStore();
  
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setError('');
    }
  }, [isOpen]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  
  const calculateMaxQuantity = () => {
    if (type === 'buy' && stock) {
      // For buy, max is 20% of cash balance
      const maxAffordable = Math.floor(summary.cashBalance / stock.currentPrice);
      const maxTwentyPercent = Math.floor(summary.cashBalance * 0.2 / stock.currentPrice);
      return Math.min(maxAffordable, maxTwentyPercent);
    } else if (type === 'sell' && holdingId) {
      // For sell, max is the quantity owned
      const holding = holdings.find(h => h.id === holdingId);
      return holding ? holding.quantity : 0;
    }
    return 0;
  };
  
  const setMaxQuantity = () => {
    setQuantity(calculateMaxQuantity());
  };
  
  const handleSubmit = async () => {
    try {
      if (type === 'buy' && stock) {
        if (quantity * stock.currentPrice > summary.cashBalance) {
          setError('Insufficient funds');
          return;
        }
        
        await buyStock(
          stock.id,
          stock.symbol,
          stock.name,
          quantity,
          stock.currentPrice
        );
      } else if (type === 'sell' && holdingId) {
        const holding = holdings.find(h => h.id === holdingId);
        if (!holding) {
          setError('Holding not found');
          return;
        }
        
        if (quantity > holding.quantity) {
          setError('Insufficient shares');
          return;
        }
        
        await sellStock(holdingId, quantity, holding.currentPrice);
      }
      
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  if (!stock && type === 'buy') return null;
  
  const holding = holdingId ? holdings.find(h => h.id === holdingId) : null;
  if (!holding && type === 'sell') return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {type === 'buy' ? 'Buy Stock' : 'Sell Stock'}
              </h3>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {type === 'buy' ? 'Stock' : 'Holding'}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {type === 'buy' ? stock?.name : holding?.stockName}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {type === 'buy' ? stock?.symbol : holding?.stockSymbol}
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Current Price
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(type === 'buy' ? stock?.currentPrice || 0 : holding?.currentPrice || 0)}
                </p>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity
                  </label>
                  <button
                    onClick={setMaxQuantity}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Max ({calculateMaxQuantity()})
                  </button>
                </div>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  error={error}
                  fullWidth
                />
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Value
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(quantity * (type === 'buy' ? stock?.currentPrice || 0 : holding?.currentPrice || 0))}
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant={type === 'buy' ? 'success' : 'danger'}
                  onClick={handleSubmit}
                >
                  {type === 'buy' ? 'Buy' : 'Sell'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TradeModal;