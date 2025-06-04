# NIFTY50 Stock Screener & Virtual Portfolio Manager

A full-stack web application to screen NIFTY 50 stocks and manage a virtual trading portfolio. Users can log in, track performance, simulate buy/sell decisions, and analyze their portfolio metrics using real-time indicators.

## Tech Stack

Frontend:
- React (with Vite)
- TypeScript
- Tailwind CSS
- lucide-react for icons

Backend:
- FastAPI (Python)
- SQLite database
- Authentication handled server-side (login, registration, etc.)

## Features and Project Workflow

### Landing Page
- Introductory information about the platform
- Login and Register options

### Dashboard (Home Page)
- Displays:
  - Account balance
  - Profit & Loss (P&L)
  - Allocation breakdown
  - Watchlist of selected stocks
- Side navigation includes:
  - Portfolio
  - Transactions
  - Settings
  - Mode (Light/Dark) toggle
  - Logout

### Stock Screener Page
- Search bar with dropdown list of NIFTY 50 stocks
- Selected stocks shown as cards displaying:
  - 9-day Moving Average (MA)
  - 14-day Relative Strength Index (RSI)
- Buy/Sell signals based on:
  - Buy if RSI < 30 AND Price > MA
  - Sell if RSI > 70 AND Price < MA (only if user owns the stock)
- Dynamic activation of Buy/Sell buttons based on signal conditions

### Portfolio Page
- Table with:
  - Stock, Quantity, Avg. Buy, Current Price, Invested, Current Value, P/L, Actions
- Export feature for CSV/Excel
- Additional metrics:
  - Total Portfolio Value (real-time)
  - Total P&L (realized + unrealized)
  - Best/Worst Performing Stocks
  - Win Rate (%)
  - Sharpe Ratio
  - Maximum Drawdown

### Transactions Page
- Table showing:
  - Date, Stock, Type (Buy/Sell), Quantity, Price, Total
- Export feature for CSV/Excel

### Settings Page
- Update name
- Change password
- Delete account

## UX Details

- Fully mobile responsive
- Dark/Light mode toggle
- Intuitive and production-ready UI with colour gradient animations

## User Manual

1. Register or log in via the landing page
2. Use the dashboard to view portfolio overview
3. Search and screen stocks in the Screener page
4. Make buy/sell decisions based on indicator logic
5. Manage existing holdings via the Portfolio page
6. Track trade history via the Transactions page
7. Update account details in Settings

## Local Development Setup

### Frontend (React)

npm install
npm run dev

### Backend (FastAPI)

pip install -r requirements.txt
uvicorn main:app --reload

Environment variables (in frontend `.env` file):

VITE_API_URL=http://localhost:8000


## Deployment URLs

Frontend (Vercel): https://trading-web-dev.vercel.app

Backend (Render): https://your-backend.onrender.com

## License

MIT License © Mohit Shukla
