from flask import Flask
from flask_session import Session
from backend import create_app  # your create_app function

# Create Flask app
app = create_app('development')

# Setup session
Session(app)

if __name__ == "__main__":
    app.run(debug=True)
