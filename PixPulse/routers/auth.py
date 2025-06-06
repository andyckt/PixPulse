from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from models import User, SafeUser
from typing import Annotated, Optional
from datetime import timedelta, timezone, datetime
from pydantic import BaseModel
from utils.dbconn import create_session
from sqlmodel import select
import jwt


router = APIRouter(prefix="/api/auth")

# Auth related variables (USE .ENV LATER)
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(minutes=120)

# OAuth stuff
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class Token(BaseModel):
    access_token: str
    token_type: str


def compare_password(plain: str, hashed: str) -> bool:
    return bcrypt_context.verify(plain, hashed)

def get_password_hash(password) -> str:
    return bcrypt_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc)+expires_delta
    else:
        expire = datetime.now(timezone.utc)+timedelta(hours=2)
    
    to_encode["exp"] = expire

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Query and authenticate user
def authenticate_user(username: str, password: str):
    session = create_session()
    statement = select(User).where(User.username==username)
    query_result = session.exec(statement)
    user = query_result.one()

    if not user:
        return False
    if not compare_password(password, user.hashed_password):
        return False
    session.close()
    return user


# Get current user based on userid in token
@router.get("/current_user")
def get_current_user(token: str = Depends(oauth2_scheme)) -> SafeUser:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        userid = int(payload["sub"])
        if userid is None:
            raise credentials_exception
        
        session = create_session()
        statement = select(User).where(User.userid==userid)
        user = session.exec(statement).first()
        user = SafeUser.model_validate(user)

        session.close()
        return user
        
    except Exception as e:
        print(e)
        raise credentials_exception
    
    
@router.post("/login")
def login(response: Response, form_data: OAuth2PasswordRequestForm = Depends()) -> Token:
    login_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect username or password",
    )

    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise login_exception
    access_token = create_access_token(data={"sub": str(user.userid)}, expires_delta=ACCESS_TOKEN_EXPIRE_MINUTES)
    token = Token(access_token=access_token, token_type="bearer") 

    print(token)
    return token

