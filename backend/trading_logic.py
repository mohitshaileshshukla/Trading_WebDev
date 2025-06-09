from typing import Dict, Optional
import numpy as np
from datetime import datetime, timedelta

def calculate_moving_average(prices: list[float], period: int) -> Optional[float]:
    if len(prices) < period:
        return None
    return sum(prices[-period:]) / period

def calculate_rsi(prices: list[float], period: int = 14) -> Optional[float]:
    if len(prices) < period + 1:
        return None
        
    deltas = np.diff(prices)
    gain = np.where(deltas > 0, deltas, 0)
    loss = np.where(deltas < 0, -deltas, 0)
    
    avg_gain = np.mean(gain[:period])
    avg_loss = np.mean(loss[:period])
    
    if avg_loss == 0:
        return 100
    
    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    
    return float(rsi)

def generate_trading_signals(
    current_price: float,
    ma9: Optional[float],
    rsi: Optional[float]
) -> Dict[str, str]:
    signals = {
        "ma_signal": "neutral",
        "rsi_signal": "neutral",
        "overall_signal": "hold"
    }
    
    # Moving Average Signal
    if ma9:
        if current_price > ma9: 
            signals["ma_signal"] = "buy"
        elif current_price < ma9:
            signals["ma_signal"] = "sell"
    
    # RSI Signal
    if rsi:
        if rsi > 70:
            signals["rsi_signal"] = "sell"
        elif rsi < 30:
            signals["rsi_signal"] = "buy"
    
    # Overall Signal
    if signals["ma_signal"] == "buy" and signals["rsi_signal"]=='sell':
        signals["overall_signal"] = "buy"
    elif signals["ma_signal"] == "sell" and signals["rsi_signal"]=='sell':
        signals["overall_signal"] = "sell"
    
    return signals