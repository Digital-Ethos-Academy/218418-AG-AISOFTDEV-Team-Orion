import os
import sys
from datetime import datetime, date
from typing import List, Optional

from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base, Session

# Import necessary modules from SQLAlchemy
from sqlalchemy import (
    create_engine, Column, Integer, String, DateTime, Date, 
    Text, BLOB, ForeignKey, CheckConstraint
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

# --- SQLAlchemy Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///./artifacts/onboarding.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Model for Users table
class User(Base):
    __tablename__ = 'Users'
    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)  # Remember to hash passwords in production
    created_at = Column(DateTime, default='CURRENT_TIMESTAMP')

# Model for Movies table
class Movie(Base):
    __tablename__ = 'Movies'
    movie_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    release_date = Column(Date)
    synopsis = Column(Text)
    duration = Column(Integer)  # Duration in minutes
    # 'metadata' is a reserved attribute name in SQLAlchemy Declarative API.
    # Map the DB column named 'metadata' to a safe attribute name 'meta_blob'.
    meta_blob = Column('metadata', BLOB)

# Model for TV_Shows table
class TVShow(Base):
    __tablename__ = 'TV_Shows'
    show_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    release_date = Column(Date)
    synopsis = Column(Text)
    seasons = Column(Integer)
    episodes = Column(Integer)
    # Map DB column 'metadata' to attribute 'meta_blob' to avoid reserved name.
    meta_blob = Column('metadata', BLOB)

# Model for User_Watchlist table
class UserWatchlist(Base):
    __tablename__ = 'User_Watchlist'
    watchlist_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('Movies.movie_id'))
    show_id = Column(Integer, ForeignKey('TV_Shows.show_id'))
    status = Column(String, CheckConstraint("status IN ('planned', 'watched')"), nullable=False)
    watched_date = Column(Date)

# Model for Ratings table
class Rating(Base):
    __tablename__ = 'Ratings'
    rating_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('Movies.movie_id'))
    show_id = Column(Integer, ForeignKey('TV_Shows.show_id'))
    rating = Column(Integer, CheckConstraint("rating BETWEEN 1 AND 5"))
    review = Column(Text)
    created_at = Column(DateTime, default='CURRENT_TIMESTAMP')

# Model for Viewing_History table
class ViewingHistory(Base):
    __tablename__ = 'Viewing_History'
    history_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), nullable=False)
    movie_id = Column(Integer, ForeignKey('Movies.movie_id'))
    show_id = Column(Integer, ForeignKey('TV_Shows.show_id'))
    watched_date = Column(Date, nullable=False)

# Model for Friends table
class Friend(Base):
    __tablename__ = 'Friends'
    user_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)
    friend_id = Column(Integer, ForeignKey('Users.user_id'), primary_key=True)

# Model for Notifications table
class Notification(Base):
    __tablename__ = 'Notifications'
    notification_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('Users.user_id'), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default='CURRENT_TIMESTAMP')

app = FastAPI()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


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

    class Config:
        orm_mode = True


# FastAPI Endpoints (SQLAlchemy-backed)


@app.post('/users', response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check for existing username or email
    existing = db.query(User).filter((User.username == user.username) | (User.email == user.email)).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Username or email already exists')

    db_user = User(username=user.username, email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get('/users', response_model=List[UserRead])
def list_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users


@app.get('/users/{user_id}', response_model=UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    return user


@app.put('/users/{user_id}', response_model=UserRead)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    update_data = user_update.dict(exclude_unset=True)
    for k, v in update_data.items():
        setattr(user, k, v)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.delete('/users/{user_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')
    db.delete(user)
    db.commit()


# ---------------------- Movie endpoints ----------------------
class MovieCreate(BaseModel):
    title: str
    release_date: Optional[str] = None  # ISO date string (YYYY-MM-DD)
    synopsis: Optional[str] = None
    duration: Optional[int] = None


class MovieRead(BaseModel):
    movie_id: int
    title: str
    release_date: Optional[date] = None
    synopsis: Optional[str] = None
    duration: Optional[int] = None

    class Config:
        orm_mode = True


@app.post('/movies', response_model=MovieRead, status_code=status.HTTP_201_CREATED)
def create_movie(payload: MovieCreate, db: Session = Depends(get_db)):
    movie = Movie(
        title=payload.title,
        synopsis=payload.synopsis,
        duration=payload.duration
    )
    # parse release_date if provided
    if payload.release_date:
        try:
            from datetime import date
            movie.release_date = date.fromisoformat(payload.release_date)
        except Exception:
            pass

    db.add(movie)
    db.commit()
    db.refresh(movie)
    return movie


@app.get('/movies', response_model=List[MovieRead])
def list_movies(db: Session = Depends(get_db)):
    return db.query(Movie).all()


@app.get('/movies/{movie_id}', response_model=MovieRead)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    m = db.query(Movie).filter(Movie.movie_id == movie_id).first()
    if not m:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Movie not found')
    return m


# ---------------------- TV Show endpoints ----------------------
class TVShowCreate(BaseModel):
    title: str
    release_date: Optional[str] = None
    synopsis: Optional[str] = None
    seasons: Optional[int] = None
    episodes: Optional[int] = None


class TVShowRead(BaseModel):
    show_id: int
    title: str
    release_date: Optional[date] = None
    synopsis: Optional[str] = None
    seasons: Optional[int] = None
    episodes: Optional[int] = None

    class Config:
        orm_mode = True


@app.post('/tvshows', response_model=TVShowRead, status_code=status.HTTP_201_CREATED)
def create_tvshow(payload: TVShowCreate, db: Session = Depends(get_db)):
    show = TVShow(
        title=payload.title,
        synopsis=payload.synopsis,
        seasons=payload.seasons,
        episodes=payload.episodes,
    )
    if payload.release_date:
        try:
            from datetime import date
            show.release_date = date.fromisoformat(payload.release_date)
        except Exception:
            pass

    db.add(show)
    db.commit()
    db.refresh(show)
    return show


@app.get('/tvshows', response_model=List[TVShowRead])
def list_tvshows(db: Session = Depends(get_db)):
    return db.query(TVShow).all()


@app.get('/tvshows/{show_id}', response_model=TVShowRead)
def get_tvshow(show_id: int, db: Session = Depends(get_db)):
    s = db.query(TVShow).filter(TVShow.show_id == show_id).first()
    if not s:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='TV show not found')
    return s


# ---------------------- Watchlist endpoints ----------------------
class WatchlistCreate(BaseModel):
    user_id: int
    movie_id: Optional[int] = None
    show_id: Optional[int] = None
    status: Optional[str] = 'planned'
    watched_date: Optional[str] = None


class WatchlistRead(BaseModel):
    watchlist_id: int
    user_id: int
    movie_id: Optional[int]
    show_id: Optional[int]
    status: str
    watched_date: Optional[date]

    class Config:
        orm_mode = True


@app.post('/watchlist', response_model=WatchlistRead, status_code=status.HTTP_201_CREATED)
def create_watchlist(entry: WatchlistCreate, db: Session = Depends(get_db)):
    w = UserWatchlist(
        user_id=entry.user_id,
        movie_id=entry.movie_id,
        show_id=entry.show_id,
        status=entry.status,
    )
    if entry.watched_date:
        try:
            from datetime import date
            w.watched_date = date.fromisoformat(entry.watched_date)
        except Exception:
            pass

    db.add(w)
    db.commit()
    db.refresh(w)
    return w


@app.get('/watchlist', response_model=List[WatchlistRead])
def list_watchlist(db: Session = Depends(get_db)):
    return db.query(UserWatchlist).all()


# ---------------------- Ratings endpoints ----------------------
class RatingCreate(BaseModel):
    user_id: int
    movie_id: Optional[int] = None
    show_id: Optional[int] = None
    rating: int
    review: Optional[str] = None


class RatingRead(BaseModel):
    rating_id: int
    user_id: int
    movie_id: Optional[int]
    show_id: Optional[int]
    rating: int
    review: Optional[str]
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


@app.post('/ratings', response_model=RatingRead, status_code=status.HTTP_201_CREATED)
def create_rating(payload: RatingCreate, db: Session = Depends(get_db)):
    r = Rating(
        user_id=payload.user_id,
        movie_id=payload.movie_id,
        show_id=payload.show_id,
        rating=payload.rating,
        review=payload.review,
    )
    db.add(r)
    db.commit()
    db.refresh(r)
    return r


@app.get('/ratings', response_model=List[RatingRead])
def list_ratings(db: Session = Depends(get_db)):
    return db.query(Rating).all()


# ---------------------- Viewing history endpoints ----------------------
class ViewingCreate(BaseModel):
    user_id: int
    movie_id: Optional[int] = None
    show_id: Optional[int] = None
    watched_date: str


class ViewingRead(BaseModel):
    history_id: int
    user_id: int
    movie_id: Optional[int]
    show_id: Optional[int]
    watched_date: date

    class Config:
        orm_mode = True


@app.post('/history', response_model=ViewingRead, status_code=status.HTTP_201_CREATED)
def create_viewing(payload: ViewingCreate, db: Session = Depends(get_db)):
    vh = ViewingHistory(
        user_id=payload.user_id,
        movie_id=payload.movie_id,
        show_id=payload.show_id,
    )
    try:
        from datetime import date
        vh.watched_date = date.fromisoformat(payload.watched_date)
    except Exception:
        pass
    db.add(vh)
    db.commit()
    db.refresh(vh)
    return vh


@app.get('/history', response_model=List[ViewingRead])
def list_history(db: Session = Depends(get_db)):
    return db.query(ViewingHistory).all()


# ---------------------- Friends endpoints ----------------------
class FriendCreate(BaseModel):
    user_id: int
    friend_id: int


class FriendRead(BaseModel):
    user_id: int
    friend_id: int

    class Config:
        orm_mode = True


@app.post('/friends', response_model=FriendRead, status_code=status.HTTP_201_CREATED)
def add_friend(payload: FriendCreate, db: Session = Depends(get_db)):
    f = Friend(user_id=payload.user_id, friend_id=payload.friend_id)
    db.add(f)
    db.commit()
    return f


@app.get('/friends', response_model=List[FriendRead])
def list_friends(db: Session = Depends(get_db)):
    return db.query(Friend).all()


# ---------------------- Notifications endpoints ----------------------
class NotificationCreate(BaseModel):
    user_id: int
    message: str


class NotificationRead(BaseModel):
    notification_id: int
    user_id: int
    message: str
    created_at: Optional[datetime]

    class Config:
        orm_mode = True


@app.post('/notifications', response_model=NotificationRead, status_code=status.HTTP_201_CREATED)
def create_notification(payload: NotificationCreate, db: Session = Depends(get_db)):
    n = Notification(user_id=payload.user_id, message=payload.message)
    db.add(n)
    db.commit()
    db.refresh(n)
    return n


@app.get('/notifications', response_model=List[NotificationRead])
def list_notifications(db: Session = Depends(get_db)):
    return db.query(Notification).all()


if __name__ == "__main__":
    import uvicorn
    import importlib

    # Uvicorn's auto-reload requires the application to be importable by
    # module path (e.g. "app.main:app"). When running `python app/main.py`,
    # the interpreter's sys.path[0] is set to the `app/` directory and the
    # top-level package `app` is not importable which causes a
    # ModuleNotFoundError inside the reloader subprocess. We try to import
    # the package first and only enable reload when possible. Otherwise we
    # start the server without reload to avoid the error.
    try:
        importlib.import_module("app")
        uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
    except Exception:
        # Fallback: start without reload (safe when launching as a script)
        print("Note: 'app' package not importable — starting server without reload.")
        uvicorn.run(app, host="127.0.0.1", port=8000, reload=False)