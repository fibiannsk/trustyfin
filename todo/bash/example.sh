#!/bin/bash

greet() {
    echo "Enter your name" #ask user for his name
    read name #store the user's data in the name variable
    
    sleep 2
    echo "Welcome! $name, we do hope you have a great evening"
    sleep 2 
    
    echo "done"
}

greet

