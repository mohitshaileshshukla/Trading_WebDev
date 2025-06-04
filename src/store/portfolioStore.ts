import { create } from 'zustand';
import { PortfolioHolding, PortfolioSummary, Transaction, ChartData, PieChartData } from '../types';

interface PortfolioState {
  holdings: PortfolioHolding[];
  transactions: Transaction[];
  summary: PortfolioSummary;
  performanceData: ChartData[];
  allocationData: PieChartData[];
  isLoading: boolean;
  fetchPortfolio: () => Promise<void>;
  buyStock: (stockId: string, stockSymbol: string, stockName: string, quantity: number, price: number) => Promise<void>;
  sellStock: (holdingId: string, quantity: number, price: number) => Promise<void>;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  holdings: [],
  transactions: [],
  summary: {
    totalValue: 0,
    investedAmount: 0,
    profitLoss: 0,
    profitLossPercent: 0,
    cashBalance: 50000
  },
  performanceData: [],
  allocationData: [],
  isLoading: false,

  fetchPortfolio: async () => {
    set({ isLoading: true });
    try {
      // Mock API call - in a real app this would call the backend
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock portfolio data
      const mockHoldings: PortfolioHolding[] = [
        {
          id: '1',
          stockId: '1',
          stockSymbol: 'RELIANCE',
          stockName: 'Reliance Industries',
          quantity: 10,
          averageBuyPrice: 2800.00,
          currentPrice: 2876.45,
          investmentValue: 28000,
          currentValue: 28764.50,
          profitLoss: 764.50,
          profitLossPercent: 2.73
        },
        {
          id: '2',
          stockId: '3',
          stockSymbol: 'HDFCBANK',
          stockName: 'HDFC Bank',
          quantity: 15,
          averageBuyPrice: 1650.00,
          currentPrice: 1678.90,
          investmentValue: 24750,
          currentValue: 25183.50,
          profitLoss: 433.50,
          profitLossPercent: 1.75
        }
      ];
      
      const mockTransactions: Transaction[] = [
        {
          id: '1',
          date: new Date('2025-05-15'),
          stockSymbol: 'RELIANCE',
          stockName: 'Reliance Industries',
          type: 'buy',
          quantity: 10,
          price: 2800.00,
          totalValue: 28000
        },
        {
          id: '2',
          date: new Date('2025-05-20'),
          stockSymbol: 'HDFCBANK',
          stockName: 'HDFC Bank',
          type: 'buy',
          quantity: 15,
          price: 1650.00,
          totalValue: 24750
        }
      ];
      
      const totalInvestment = mockHoldings.reduce((sum, holding) => sum + holding.investmentValue, 0);
      const totalValue = mockHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
      const profitLoss = totalValue - totalInvestment;
      const profitLossPercent = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
      
      const mockSummary: PortfolioSummary = {
        totalValue,
        investedAmount: totalInvestment,
        profitLoss,
        profitLossPercent,
        cashBalance: 50000
      };
      
      // Mock performance data for chart
      const mockPerformanceData: ChartData[] = [
        { date: '2025-05-01', value: 100000 },
        { date: '2025-05-05', value: 98500 },
        { date: '2025-05-10', value: 99200 },
        { date: '2025-05-15', value: 101500 },
        { date: '2025-05-20', value: 102300 },
        { date: '2025-05-25', value: 103948 },
        { date: '2025-05-28', value: 103948 + mockSummary.profitLoss }
      ];
      
      // Mock allocation data for pie chart
      const mockAllocationData: PieChartData[] = [
        { name: 'RELIANCE', value: mockHoldings[0].currentValue },
        { name: 'HDFCBANK', value: mockHoldings[1].currentValue },
        { name: 'Cash', value: mockSummary.cashBalance }
      ];
      
      set({
        holdings: mockHoldings,
        transactions: mockTransactions,
        summary: mockSummary,
        performanceData: mockPerformanceData,
        allocationData: mockAllocationData,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      console.error('Failed to fetch portfolio:', error);
    }
  },

  buyStock: async (stockId, stockSymbol, stockName, quantity, price) => {
    const { holdings, transactions, summary } = get();
    const totalCost = quantity * price;
    
    // Check if user has enough cash
    if (totalCost > summary.cashBalance) {
      throw new Error('Insufficient funds');
    }
    
    // Find if stock already exists in portfolio
    const existingHoldingIndex = holdings.findIndex(h => h.stockId === stockId);
    
    let updatedHoldings = [...holdings];
    
    if (existingHoldingIndex >= 0) {
      // Update existing holding
      const existingHolding = holdings[existingHoldingIndex];
      const totalShares = existingHolding.quantity + quantity;
      const newInvestmentValue = existingHolding.investmentValue + totalCost;
      const newAverageBuyPrice = newInvestmentValue / totalShares;
      
      updatedHoldings[existingHoldingIndex] = {
        ...existingHolding,
        quantity: totalShares,
        averageBuyPrice: newAverageBuyPrice,
        investmentValue: newInvestmentValue,
        currentValue: totalShares * price,
        profitLoss: (totalShares * price) - newInvestmentValue,
        profitLossPercent: (((totalShares * price) - newInvestmentValue) / newInvestmentValue) * 100
      };
    } else {
      // Add new holding
      const newHolding: PortfolioHolding = {
        id: Date.now().toString(),
        stockId,
        stockSymbol,
        stockName,
        quantity,
        averageBuyPrice: price,
        currentPrice: price,
        investmentValue: totalCost,
        currentValue: totalCost,
        profitLoss: 0,
        profitLossPercent: 0
      };
      
      updatedHoldings = [...holdings, newHolding];
    }
    
    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date(),
      stockSymbol,
      stockName,
      type: 'buy',
      quantity,
      price,
      totalValue: totalCost
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    
    // Update summary
    const totalInvestment = updatedHoldings.reduce((sum, holding) => sum + holding.investmentValue, 0);
    const totalValue = updatedHoldings.reduce((sum, holding) => sum + holding.currentValue, 0);
    const profitLoss = totalValue - totalInvestment;
    const profitLossPercent = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
    
    const updatedSummary: PortfolioSummary = {
      totalValue,
      investedAmount: totalInvestment,
      profitLoss,
      profitLossPercent,
      cashBalance: summary.cashBalance - totalCost
    };
    
    // Update allocation data
    const updatedAllocationData = updatedHoldings.map(holding => ({
      name: holding.stockSymbol,
      value: holding.currentValue
    }));
    updatedAllocationData.push({ name: 'Cash', value: updatedSummary.cashBalance });
    
    set({
      holdings: updatedHoldings,
      transactions: updatedTransactions,
      summary: updatedSummary,
      allocationData: updatedAllocationData
    });
  },

  sellStock: async (holdingId, quantity, price) => {
    const { holdings, transactions, summary } = get();
    
    // Find holding
    const holdingIndex = holdings.findIndex(h => h.id === holdingId);
    if (holdingIndex < 0) {
      throw new Error('Holding not found');
    }
    
    const holding = holdings[holdingIndex];
    
    // Check if user has enough shares
    if (quantity > holding.quantity) {
      throw new Error('Insufficient shares');
    }
    
    const saleValue = quantity * price;
    let updatedHoldings = [...holdings];
    
    if (quantity === holding.quantity) {
      // Remove holding if selling all shares
      updatedHoldings = holdings.filter(h => h.id !== holdingId);
    } else {
      // Update holding
      const remainingShares = holding.quantity - quantity;
      const remainingInvestment = (holding.investmentValue / holding.quantity) * remainingShares;
      
      updatedHoldings[holdingIndex] = {
        ...holding,
        quantity: remainingShares,
        investmentValue: remainingInvestment,
        currentValue: remainingShares * price,
        profitLoss: (remainingShares * price) - remainingInvestment,
        profitLossPercent: (((remainingShares * price) - remainingInvestment) / remainingInvestment) * 100
      };
    }
    
    // Add transaction
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      date: new Date(),
      stockSymbol: holding.stockSymbol,
      stockName: holding.stockName,
      type: 'sell',
      quantity,
      price,
      totalValue: saleValue
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    
    // Update summary
    const totalInvestment = updatedHoldings.reduce((sum, h) => sum + h.investmentValue, 0);
    const totalValue = updatedHoldings.reduce((sum, h) => sum + h.currentValue, 0);
    const profitLoss = totalValue - totalInvestment;
    const profitLossPercent = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
    
    const updatedSummary: PortfolioSummary = {
      totalValue,
      investedAmount: totalInvestment,
      profitLoss,
      profitLossPercent,
      cashBalance: summary.cashBalance + saleValue
    };
    
    // Update allocation data
    const updatedAllocationData = updatedHoldings.map(h => ({
      name: h.stockSymbol,
      value: h.currentValue
    }));
    updatedAllocationData.push({ name: 'Cash', value: updatedSummary.cashBalance });
    
    set({
      holdings: updatedHoldings,
      transactions: updatedTransactions,
      summary: updatedSummary,
      allocationData: updatedAllocationData
    });
  }
}));