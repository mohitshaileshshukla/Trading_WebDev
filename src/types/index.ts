export interface User {
  id: string;
  name: string;
  email: string;
  portfolioValue: number;
  cashBalance: number;
}

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  nineMA: number;
  nineMAChange: 'up' | 'down' | 'neutral';
  rsi: number;
  signal: 'buy' | 'sell' | 'hold';
}

export interface PortfolioHolding {
  id: string;
  stockId: string;
  stockSymbol: string;
  stockName: string;
  quantity: number;
  averageBuyPrice: number;
  currentPrice: number;
  investmentValue: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
}

export interface Transaction {
  id: string;
  date: Date;
  stockSymbol: string;
  stockName: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalValue: number;
}

export interface PortfolioSummary {
  totalValue: number;
  investedAmount: number;
  profitLoss: number;
  profitLossPercent: number;
  cashBalance: number;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface PieChartData {
  name: string;
  value: number;
}