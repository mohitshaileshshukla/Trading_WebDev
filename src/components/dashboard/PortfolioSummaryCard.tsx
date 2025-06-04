import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/Card';
import { formatCurrency, formatPercentage, getColorClass } from '../../utils/formatter';
import { PortfolioSummary, ChartData } from '../../types';
import Button from '../shared/Button';

interface PortfolioSummaryCardProps {
  summary: PortfolioSummary;
  performanceData: ChartData[];
}

const PortfolioSummaryCard: React.FC<PortfolioSummaryCardProps> = ({ summary, performanceData }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
          <p className="text-sm font-medium">{payload[0].payload.date}</p>
          <p className="text-sm">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Portfolio Summary</CardTitle>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            leftIcon={<Wallet className="h-4 w-4" />}
          >
            Deposit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Value</p>
                <div className="flex items-center">
                  <h2 className="text-3xl font-bold">{formatCurrency(summary.totalValue)}</h2>
                  <div className={`ml-2 flex items-center ${getColorClass(summary.profitLoss)}`}>
                    {summary.profitLoss > 0 ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium ml-0.5">
                      {formatPercentage(summary.profitLossPercent)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cash Balance</p>
                  <p className="text-xl font-semibold">{formatCurrency(summary.cashBalance)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Invested</p>
                  <p className="text-xl font-semibold">{formatCurrency(summary.investedAmount)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Profit/Loss</p>
                <div className={`flex items-center ${getColorClass(summary.profitLoss)}`}>
                  {summary.profitLoss > 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  <p className="text-xl font-semibold">{formatCurrency(summary.profitLoss)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Performance</p>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioSummaryCard;