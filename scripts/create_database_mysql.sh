#!/bin/bash

DB_NAME="inkvi_images_store"
MYSQL_USER="root"
MYSQL_PASSWORD="root"

mysql -u$MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

echo "Database '$DB_NAME' has been created (if it didn't exist already)."