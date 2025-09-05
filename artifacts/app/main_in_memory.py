from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

app = FastAPI()

# In-memory database
users_db = []

# Pydantic Models

# Model for creating a new user
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

# Model for updating an existing user
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None

# Model for reading user data
class UserRead(BaseModel):
    user_id: int
    username: str
    email: EmailStr
    created_at: datetime

# Helper function to find a user by ID
def get_user_by_id(user_id: int):
    for user in users_db:
        if user['user_id'] == user_id:
            return user
    return None

# FastAPI Endpoints

@app.post("/users", response_model=UserRead, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    user_id = len(users_db) + 1
    new_user = user.dict()
    new_user.update({"user_id": user_id, "created_at": datetime.utcnow()})

    # Check for existing username or email
    for u in users_db:
        if u['username'] == new_user['username'] or u['email'] == new_user['email']:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username or email already exists")

    users_db.append(new_user)
    return new_user

@app.get("/users", response_model=List[UserRead])
async def list_users():
    return users_db

@app.get("/users/{user_id}", response_model=UserRead)
async def read_user(user_id: int):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user

@app.put("/users/{user_id}", response_model=UserRead)
async def update_user(user_id: int, user: UserUpdate):
    existing_user = get_user_by_id(user_id)
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    for key, value in user.dict(exclude_unset=True).items():
        existing_user[key] = value

    return existing_user

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    users_db.remove(user)

# Start the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)