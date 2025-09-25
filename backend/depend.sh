#!/bin/bash

# Exit if any command fails
set -e

echo "📦 Installing dependencies..."

pip install \
  "Flask>=2.0" \
  "Flask-Mail>=0.9.1" \
  "celery>=5.2" \
  "redis>=4.0" \
  "python-dotenv>=1.0" \
  "jinja2>=3.0" \
  "bleach>=6.0" \
  "marshmallow>=3.0" \
  "marshmallow-enum>=1.5.1"

echo "✅ All dependencies installed successfully."

