
import pytest
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from myapp import create_app  # Import your Flask app factory
from myapp.database import db as _db  # Import your database instance

@pytest.fixture(scope='module')
def app():
    """Create and configure a new app instance for each test."""
    app = create_app({'TESTING': True})

    # Establish an application context before running the tests.
    with app.app_context():
        yield app

@pytest.fixture(scope='module')
def db(app):
    """Setup the database for tests."""
    _db.create_all()

    # Insert any necessary setup data here

    yield _db

    # Tear down the database after tests
    _db.drop_all()