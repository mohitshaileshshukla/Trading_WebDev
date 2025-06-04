from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base
import enum

class OrderType(enum.Enum):
    BUY = "buy"
    SELL = "sell"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    hashed_password = Column(String)
    cash_balance = Column(Float, default=100000.0)  # Starting balance
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    portfolio = relationship("Portfolio", back_populates="user")
    transactions = relationship("Transaction", back_populates="user")

class Portfolio(Base):
    __tablename__ = "portfolio"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stock_symbol = Column(String, index=True)
    quantity = Column(Integer)
    average_buy_price = Column(Float)
    last_updated = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="portfolio")

class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stock_symbol = Column(String, index=True)
    order_type = Column(Enum(OrderType))
    quantity = Column(Integer)
    price = Column(Float)
    total_value = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="transactions")

class Stock(Base):
    __tablename__ = "stocks"
    
    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String, unique=True, index=True)
    name = Column(String)
    current_price = Column(Float)
    previous_close = Column(Float)
    volume = Column(Integer)
    last_updated = Column(DateTime(timezone=True), onupdate=func.now())