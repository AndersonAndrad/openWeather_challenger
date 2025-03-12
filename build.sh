#!/bin/bash

# Remove the previous Docker image (if exists)
docker image rm -f openweather_challenger-app:latest

# Build the new Docker image
docker-compose build

# Start the Docker containers
docker-compose up -d

# Remove dangling images
docker image prune -f