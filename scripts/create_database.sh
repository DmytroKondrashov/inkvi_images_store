#!/bin/bash

DB_NAME="inkvi_images_store"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"

# Check if the database already exists
if psql -U $POSTGRES_USER -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
    echo "Database '$DB_NAME' already exists."
else
    # Create the database
    psql -U $POSTGRES_USER -c "CREATE DATABASE $DB_NAME;"
    echo "Database '$DB_NAME' has been created."
fi
