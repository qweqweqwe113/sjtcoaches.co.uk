#!/bin/bash

# Albion Coach Admin Setup Script
# This script sets up the D1 database and admin credentials

set -e

echo "🚀 Setting up Albion Coach Admin..."
echo ""

# Step 1: Create D1 database
echo "📦 Creating D1 database..."
DB_OUTPUT=$(wrangler d1 create albion-coach-db 2>&1)
echo "$DB_OUTPUT"

# Extract database_id from output
DB_ID=$(echo "$DB_OUTPUT" | grep -oP 'database_id = "\K[^"]+' || echo "")

if [ -z "$DB_ID" ]; then
  echo "⚠️  Could not extract database_id. It may already exist."
  echo "Please check wrangler.toml and update database_id manually if needed."
else
  echo "✅ Database ID: $DB_ID"
  
  # Update wrangler.toml
  echo "📝 Updating wrangler.toml..."
  sed -i "s/database_id = \"replace-with-your-d1-database-id\"/database_id = \"$DB_ID\"/" wrangler.toml
fi

# Step 2: Generate session secret
echo ""
echo "🔐 Generating session secret..."
SESSION_SECRET=$(openssl rand -base64 32)
sed -i "s/SESSION_SECRET = \"replace-with-a-long-random-secret\"/SESSION_SECRET = \"$SESSION_SECRET\"/" wrangler.toml
echo "✅ Session secret generated"

# Step 3: Initialize database schema
echo ""
echo "🗄️  Initializing database schema..."
wrangler d1 execute albion-coach-db --file=server/schema.sql
echo "✅ Schema created"

# Step 4: Generate admin credentials
echo ""
echo "👤 Generating admin credentials..."
SEED_OUTPUT=$(npx tsx server/seed.ts)
echo "$SEED_OUTPUT"

# Extract the SQL command
SQL_COMMAND=$(echo "$SEED_OUTPUT" | grep "INSERT OR REPLACE")

# Step 5: Insert admin credentials
echo ""
echo "💾 Inserting admin credentials..."
wrangler d1 execute albion-coach-db --command="$SQL_COMMAND"
echo "✅ Admin credentials created"

echo ""
echo "✨ Setup complete!"
echo ""
echo "📋 Default credentials:"
echo "   Email:    admin@albioncoach.co.uk"
echo "   Password: ChangeMe123!"
echo ""
echo "🌐 Start the dev server with: npm run dev"
echo "🔗 Access admin at: http://localhost:8080/admin"
echo ""
echo "⚠️  Remember to change your password after first login!"
