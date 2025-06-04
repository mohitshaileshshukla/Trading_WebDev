import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../shared/Card';
import Button from '../shared/Button';
import { Stock } from '../../types';
import { formatCurrency, formatPercentage, getColorClass } from '../../utils/formatter';

interface StockCardProps {
  stock: Stock;
  onBuy: (stock: Stock) => void;
  onSell: (stock: Stock) => void;
}

const StockCard: React.FC<StockCardProps> = ({ stock, onBuy, onSell }) => {
  const renderSignal = () => {
    if (stock.signal === 'buy') {
      return (
        <div className="flex items-center text-green-500">
          <TrendingUp className="h-5 w-5 mr-1" />
          <span>Buy Signal</span>
        </div>
      );
    } else if (stock.signal === 'sell') {
      return (
        <div className="flex items-center text-red-500">
          <TrendingDown className="h-5 w-5 mr-1" />
          <span>Sell Signal</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-amber-500">
          <AlertCircle className="h-5 w-5 mr-1" />
          <span>Hold</span>
        </div>
      );
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-bold">{stock.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stock.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{formatCurrency(stock.currentPrice)}</p>
              <p className={`text-sm font-medium ${getColorClass(stock.changePercent)}`}>
                {stock.changePercent > 0 ? '+' : ''}{formatPercentage(stock.changePercent)}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">9-Day MA</p>
              <div className="flex items-center">
                <p className="font-medium">{formatCurrency(stock.nineMA)}</p>
                {stock.nineMAChange === 'up' && <TrendingUp className="h-4 w-4 ml-1 text-green-500" />}
                {stock.nineMAChange === 'down' && <TrendingDown className="h-4 w-4 ml-1 text-red-500" />}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">14-Day RSI</p>
              <div className="flex items-center">
                <p className="font-medium">{stock.rsi.toFixed(1)}</p>
                {stock.rsi > 70 && <AlertCircle className="h-4 w-4 ml-1 text-amber-500" />}
                {stock.rsi < 30 && <AlertCircle className="h-4 w-4 ml-1 text-amber-500" />}
              </div>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="mb-3">
              {renderSignal()}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={stock.signal === 'buy' ? 'success' : 'outline'}
                onClick={() => onBuy(stock)}
              >
                Buy
              </Button>
              <Button
                variant={stock.signal === 'sell' ? 'danger' : 'outline'}
                onClick={() => onSell(stock)}
              >
                Sell
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;