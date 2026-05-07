# Quick MongoDB Setup Guide

## Current Status

❌ MongoDB is **NOT running** - you need to set it up first before the blog management (and other features) will work.

## Option 1: Local MongoDB (Recommended for Development)

### Windows Setup

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run the installer

2. **Install MongoDB**
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool) - optional but helpful

3. **Verify Installation**
   ```bash
   # Check if MongoDB is running
   mongosh --version
   ```

4. **Start MongoDB Service** (if not auto-started)
   ```powershell
   # Start MongoDB service
   net start MongoDB
   
   # Or use Services app (services.msc)
   # Find "MongoDB Server" and start it
   ```

### Alternative: MongoDB in Docker (Easier)

If you have Docker installed:

```bash
# Pull and run MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps
```

## Option 2: MongoDB Atlas (Cloud - Free Tier Available)

1. **Create Account**
   - Go to: https://www.mongodb.com/cloud/atlas
   - Sign up for free

2. **Create Cluster**
   - Choose "Free" tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Setup Access**
   - Create database user (username/password)
   - Add IP address: `0.0.0.0/0` (allow from anywhere) for development
   - Get connection string

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## Step 2: Configure Your Project

1. **Create .env file**
   ```bash
   # Copy the example
   cp .env.example .env
   ```

2. **Edit .env file**
   
   For **Local MongoDB**:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```
   
   For **MongoDB Atlas**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

## Step 3: Seed the Database

Run the seed script to create initial data:

```bash
npx tsx server/seed-mongodb.ts
```

This will create:
- Database: `albion_coach`
- Collections: `blog_posts`, `contact_messages`, `bookings`, `fleet`, `admin_credentials`
- Sample data for testing

## Step 4: Start Your Application

```bash
npm run dev
```

## Verify Everything Works

1. **Check MongoDB Connection**
   - Open: http://localhost:8080
   - If no errors, MongoDB is connected

2. **Test Admin Panel**
   - Go to: http://localhost:8080/admin
   - Login: `admin@test.com` / `admin123`
   - Navigate to Blog section
   - Try creating a test article

3. **Check Database** (Optional)
   
   Using MongoDB Compass (GUI):
   - Connect to: `mongodb://localhost:27017`
   - Browse `albion_coach` database
   - View collections and data
   
   Using mongosh (CLI):
   ```bash
   mongosh
   use albion_coach
   db.blog_posts.find()
   ```

## Troubleshooting

### "MongoDB URI not configured"
- Make sure `.env` file exists in project root
- Check `MONGODB_URI` is set correctly
- Restart your dev server after creating `.env`

### "Connection refused" or "ECONNREFUSED"
- MongoDB service is not running
- Windows: Check Services app, start "MongoDB Server"
- Docker: Run `docker start mongodb`

### "Authentication failed"
- Check username/password in connection string
- For Atlas: Verify database user credentials

### Port 27017 already in use
- Another MongoDB instance is running
- Stop it or use a different port

## What Collections Are Used?

- **blog_posts** - Blog articles (what you just implemented)
- **contact_messages** - Contact form submissions
- **bookings** - Booking requests
- **fleet** - Fleet vehicle data
- **admin_credentials** - Admin login (currently using in-memory, not DB)
- **site_content** - CMS content (future use)
- **pricing_rules** - Pricing configuration (future use)

## Next Steps After Setup

Once MongoDB is running:

1. ✅ Blog management will work
2. ✅ Contact form submissions will be saved
3. ✅ Booking requests will be stored
4. ✅ Fleet management will persist changes

## Need Help?

- MongoDB Docs: https://docs.mongodb.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- MongoDB Compass: https://docs.mongodb.com/compass/

## Quick Commands Reference

```bash
# Check if MongoDB is running (Windows)
net start | findstr MongoDB

# Start MongoDB service (Windows)
net start MongoDB

# Stop MongoDB service (Windows)
net stop MongoDB

# Connect with mongosh
mongosh

# Run seed script
npx tsx server/seed-mongodb.ts

# Start dev server
npm run dev
```
