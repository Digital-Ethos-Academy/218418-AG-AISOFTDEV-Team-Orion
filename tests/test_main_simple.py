# tests/test_main_simple.py

import pytest
from fastapi.testclient import TestClient
from main import app, Base, engine, SessionLocal
from sqlalchemy.orm import sessionmaker

# Initialize TestClient
client = TestClient(app)

# Create a new database session for testing
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Drop and recreate the tables for a fresh start before each test
@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_user():
    # Define the user data to send in the request
    user_data = {
        "username": "testuser",
        "email": "testuser@example.com",
        "full_name": "Test User",
        "hashed_password": "hashedpassword"
    }
    
    # Send a POST request to create a new user
    response = client.post("/users", json=user_data)
    
    # Assert that the response status code is 201 Created
    assert response.status_code == 201
    
    # Assert that the response body contains the correct user data
    response_data = response.json()
    assert response_data["username"] == user_data["username"]
    assert response_data["email"] == user_data["email"]
    assert response_data["full_name"] == user_data["full_name"]
    assert "id" in response_data  # Ensure the 'id' is in the response

def test_list_users():
    # First, create a user to ensure the endpoint returns something
    test_create_user()
    
    # Send a GET request to retrieve the list of users
    response = client.get("/users")
    
    # Assert that the response status code is 200 OK
    assert response.status_code == 200
    
    # Assert that the response body is a list
    response_data = response.json()
    assert isinstance(response_data, list)
    
    # Assert that the list contains at least one user
    assert len(response_data) > 0
    assert response_data[0]["username"] == "testuser"