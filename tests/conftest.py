import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from fastapi.testclient import TestClient
from your_app_name.main import app  # Import your FastAPI app
from your_app_name.database import Base, get_db  # Import your Base and get_db

# Create a new SQLAlchemy engine instance
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Create a configured "Session" class
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a new base class for declarative class definitions
Base = declarative_base()

# Define your models here or import them
# Example:
# class User(Base):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)

@pytest.fixture(scope="function")
def db_session():
    # Create the database tables
    Base.metadata.create_all(bind=engine)
    # Create a new database session
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Drop the database tables
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            db_session.close()

    # Override the dependency in the FastAPI app
    app.dependency_overrides[get_db] = override_get_db
    # Create a TestClient for the app with overridden dependencies
    with TestClient(app) as c:
        yield c