from sqlmodel import Session, create_engine, select

# from config import Settings

# Use SQLite instead of PostgreSQL
db_url = "sqlite:///./pixpulse.db"

engine = create_engine(db_url, echo=True, connect_args={"check_same_thread": False})

def create_session():
    return Session(engine)
