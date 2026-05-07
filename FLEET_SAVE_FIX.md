# Fleet Save Issue - Quick Fix

## Problem
Cannot save fleet price edits in the admin panel.

## Root Cause
The application has been migrated to MongoDB, but MongoDB is not configured or running.

## Quick Fix

### Option 1: Set up MongoDB (Recommended)

1. **Install MongoDB locally:**
   ```bash
   # Windows - Download from https://www.mongodb.com/try/download/community
   # Or use Chocolatey:
   choco install mongodb
   
   # Start MongoDB
   mongod --dbpath C:\data\db
   ```

2. **Set environment variable:**
   Create `.env` file in project root:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```

3. **Seed the database:**
   ```bash
   npx tsx server/seed-mongodb.ts
   ```

4. **Restart the dev server:**
   ```bash
   npm run dev
   ```

5. **Try saving again** - it should work now!

### Option 2: Use MongoDB Atlas (Cloud - No local install)

1. **Create free account:** https://www.mongodb.com/cloud/atlas

2. **Create cluster** (takes 3-5 minutes)

3. **Get connection string:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password

4. **Set environment variable:**
   Create `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

5. **Seed the database:**
   ```bash
   npx tsx server/seed-mongodb.ts
   ```

6. **Restart dev server and try again**

## Verify It's Working

After setup, check browser console (F12) when you click Save. You should see:
- ✅ No errors
- ✅ Success message
- ✅ Price updates on the page

If you see "MongoDB URI not configured" error:
- Make sure `.env` file exists in project root
- Make sure `MONGODB_URI` is set correctly
- Restart the dev server after creating `.env`

## Alternative: Disable Database (Temporary)

If you just want to test without database:

The fleet page will still work with hardcoded data, but edits won't persist. To make edits persist, you MUST set up MongoDB.

## Check Current Status

Open browser console (F12) and look for errors when clicking Save. Common errors:

1. **"MongoDB URI not configured"** → Set up `.env` file
2. **"MongoServerError: Authentication failed"** → Check connection string password
3. **"Connection timeout"** → MongoDB not running or network issue

## Need Help?

See `DATABASE_SETUP.md` for detailed MongoDB setup instructions.
