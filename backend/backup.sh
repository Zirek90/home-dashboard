#!/bin/bash

# Load environment variables
export $(cat .env.production | xargs)

# Backup directory
BACKUP_DIR="./backup"
DATE=$(date +%d-%m-%Y)
BACKUP_FILE="$BACKUP_DIR/$DATE.backup"

# Check if pg_dump is installed
if ! command -v pg_dump &> /dev/null
then
    echo "pg_dump could not be found. Please install PostgreSQL client utilities."
    exit 1
fi

# Create a backup
echo "Creating backup..."
pg_dump -h "$POSTGRESS_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -F c -b -v -f "$BACKUP_FILE"
if [ $? -eq 0 ]; then
  echo "Backup created: $BACKUP_FILE"
else
  echo "Backup failed!"
  exit 1
fi

# Clean up old backups (older than 60 days)
echo "Cleaning up old backups..."
find "$BACKUP_DIR" -type f -name "*.backup" -mtime +60 -exec rm {} \;
echo "Old backups cleaned up."
