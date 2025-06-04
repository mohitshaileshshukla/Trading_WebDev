import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import Button from '../shared/Button';
import { Stock } from '../../types';
import { formatCurrency, formatPercentage, getColorClass } from '../../utils/formatter';

interface WatchlistCardProps {
  stocks: Stock[];
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ stocks }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Watchlist</CardTitle>
        <Button 
          size="sm" 
          variant="outline"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {stocks.slice(0, 5).map((stock) => (
            <div key={stock.id} className="px-6 py-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <p className="font-semibold">{stock.symbol}</p>
                    <div className={`ml-2 flex items-center text-xs ${getColorClass(stock.changePercent)}`}>
                      {stock.changePercent > 0 ? (
                        <TrendingUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                      )}
                      {formatPercentage(stock.changePercent)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(stock.currentPrice)}</p>
                  <p className={`text-sm ${getColorClass(stock.change)}`}>
                    {stock.change > 0 ? '+' : ''}{formatCurrency(stock.change)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchlistCard;