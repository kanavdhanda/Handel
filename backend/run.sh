#!/bin/bash

# Check if Go is installed
if ! command -v go &> /dev/null
then
    echo "Go could not be found. Please install Go to run this application."
    exit 1
fi

# Load environment variables from a .env file for better security
if [ -f ".env" ]; then
    export $(cat .env | xargs)
else
    echo ".env file does not exist. Please create one with the necessary environment variables."
    exit 1
fi

# Run the Go application
go run main.go                    