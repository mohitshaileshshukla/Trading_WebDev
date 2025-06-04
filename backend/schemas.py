from pydantic import SecretStr, BaseModel, EmailStr, constr, confloat, conint
from datetime import datetime
from typing import Optional, List
from enum import Enum

class OrderType(str, Enum):
    BUY = "buy"
    SELL = "sell"

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: constr(min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: int
    cash_balance: float
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class PortfolioBase(BaseModel):
    stock_symbol: str
    quantity: conint(gt=0)
    average_buy_price: confloat(gt=0)

class Portfolio(PortfolioBase):
    id: int
    user_id: int
    last_updated: datetime

    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    stock_symbol: str
    order_type: OrderType
    quantity: conint(gt=0)
    price: confloat(gt=0)

class Transaction(TransactionBase):
    id: int
    user_id: int
    total_value: float
    timestamp: datetime

    class Config:
        from_attributes = True

class StockBase(BaseModel):
    symbol: str
    name: str
    current_price: float
    previous_close: float
    volume: int

class Stock(StockBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True

class TradeRequest(BaseModel):
    stock_symbol: str
    order_type: OrderType
    quantity: conint(gt=0)
    price: confloat(gt=0)