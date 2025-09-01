#!/bin/bash

# make sure you're in your project folder
cd ~/trustyfin/backend

# remove the old broken venv
rm -rf venv

# create a fresh one
python3 -m venv venv

# activate it
source venv/bin/activate

# upgrade pip
pip install --upgrade pip

# install your requirements
pip install -r requirements.txt

