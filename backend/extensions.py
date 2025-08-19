import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Get connection string
MONGO_URI = os.getenv("MONGO_URI")

# Initialize client
mongo_client = MongoClient(MONGO_URI)

# Select the default database (or specify one explicitly)
db = mongo_client.get_database("bnkin")  # replace "bnkin" with your db name if needed
