from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_
from .database import get_session, engine, Base
from .models import User, Portfolio, Transaction, Stock
from .schemas import UserCreate, UserLogin, Token, TradeRequest
from .auth import get_password_hash, verify_password, create_access_token, get_current_user
from datetime import timedelta
from .config import settings

app = FastAPI(title="ProfNITT Trading Platform API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.post("/register", response_model=Token)
async def register(user: UserCreate, session: AsyncSession = Depends(get_session)):
    # Check if user exists
    result = await session.execute(
        select(User).where(User.email == user.email)
    )
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=get_password_hash(user.password)
    )
    session.add(db_user)
    await session.commit()
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(user: UserLogin, session: AsyncSession = Depends(get_session)):
    # Find user
    result = await session.execute(
        select(User).where(User.email == user.email)
    )
    db_user = result.scalar_one_or_none()
    
    print("db_user =", db_user)

    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/all-users")
async def get_all_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    users = result.scalars().all()
    return users

@app.post("/trade")
async def execute_trade(
    trade: TradeRequest,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    # Get current stock price
    result = await session.execute(
        select(Stock).where(Stock.symbol == trade.stock_symbol)
    )
    stock = result.scalar_one_or_none()
    if not stock:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Stock not found"
        )
    
    total_value = trade.quantity * trade.price
    
    if trade.order_type == "buy":
        if current_user.cash_balance < total_value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient funds"
            )
        
        # Update user's cash balance
        current_user.cash_balance -= total_value
        
        # Update or create portfolio entry
        result = await session.execute(
            select(Portfolio).where(
                and_(
                    Portfolio.user_id == current_user.id,
                    Portfolio.stock_symbol == trade.stock_symbol
                )
            )
        )
        portfolio = result.scalar_one_or_none()
        
        if portfolio:
            # Update existing position
            new_quantity = portfolio.quantity + trade.quantity
            new_total = (portfolio.average_buy_price * portfolio.quantity) + total_value
            portfolio.quantity = new_quantity
            portfolio.average_buy_price = new_total / new_quantity
        else:
            # Create new position
            portfolio = Portfolio(
                user_id=current_user.id,
                stock_symbol=trade.stock_symbol,
                quantity=trade.quantity,
                average_buy_price=trade.price
            )
            session.add(portfolio)
    
    else:  # sell
        # Check if user has enough shares
        result = await session.execute(
            select(Portfolio).where(
                and_(
                    Portfolio.user_id == current_user.id,
                    Portfolio.stock_symbol == trade.stock_symbol
                )
            )
        )
        portfolio = result.scalar_one_or_none()
        
        if not portfolio or portfolio.quantity < trade.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient shares"
            )
        
        # Update user's cash balance
        current_user.cash_balance += total_value
        
        # Update portfolio
        if portfolio.quantity == trade.quantity:
            await session.delete(portfolio)
        else:
            portfolio.quantity -= trade.quantity
    
    # Record transaction
    transaction = Transaction(
        user_id=current_user.id,
        stock_symbol=trade.stock_symbol,
        order_type=trade.order_type,
        quantity=trade.quantity,
        price=trade.price,
        total_value=total_value
    )
    session.add(transaction)
    
    await session.commit()
    
    return {"message": "Trade executed successfully"}

@app.get("/portfolio")
async def get_portfolio(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Portfolio).where(Portfolio.user_id == current_user.id)
    )
    portfolio = result.scalars().all()
    return portfolio

@app.get("/transactions")
async def get_transactions(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Transaction).where(Transaction.user_id == current_user.id)
    )
    transactions = result.scalars().all()
    return transactions

@app.get("/stocks")
async def get_stocks(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Stock))
    stocks = result.scalars().all()
    return stocks