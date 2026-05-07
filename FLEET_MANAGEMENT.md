# Fleet Management Feature

## Overview

The admin panel includes a Fleet Management section that allows you to edit vehicle images and pricing for the fleet page.

## Important: Database Setup Required

This feature requires MongoDB. You have two options:

### Option 1: Use Without Database (Default)
The fleet page will work with hardcoded data from `src/routes/fleet.tsx`. No setup needed, but admin edits won't persist.

### Option 2: Enable Database Features
To enable persistent fleet management:

1. **Install and start MongoDB**:
   
   **Local MongoDB:**
   ```bash
   # macOS
   brew install mongodb-community
   brew services start mongodb-community
   
   # Or run manually
   mongod --dbpath /path/to/data
   ```
   
   **MongoDB Atlas (Cloud):**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string

2. **Set environment variable**:
   
   Create `.env` file:
   ```bash
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017
   
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

3. **Seed the database**:
   ```bash
   # With default credentials
   npx tsx server/seed-mongodb.ts
   
   # With custom credentials
   npx tsx server/seed-mongodb.ts admin@example.com MyPassword123
   ``` `MONGODB_URI` in your deployment environment (Cloudflare dashboard, Vercel, etc.)

## Features

- **Edit Vehicle Images**: Update the image path for each vehicle
- **Edit Pricing**: Update the price range for each vehicle
- **Live Preview**: See image preview while editing
- **Database Persistence**: Changes are saved to MongoDB and reflected on the public fleet page

## Database Schema

The `fleet` collection in MongoDB:
## Database Schema

The `fleet` collection in MongoDB:

```javascript
{
  _id: ObjectId,
  id: String,        // e.g. 'royal-suite' (unique)
  img: String,       // image path
  range: String      // price range, e.g. 'From £640 / day'
}
```Setup

See "Important: Database Setup Required" section
If you don't set up the database, the fleet page will still work with hardcoded data, but admin panel edits won't be saved.

## Usage

1. Log in to the admin panel at `/admin`
2. Navigate to **Resources > Fleet** in the sidebar
3. Click **Edit** on any vehicle
4. Update the image path and/or price range
5. Click **Save** to persist changes
6. Visit `/fleet` to see the updated information

## Technical Details

### Files Modified

### Files Modified

- `server/db.ts` - Added FleetVehicle interface and MongoDB database functions
- `server/mongodb.ts` - MongoDB connection management
- `server/seed-mongodb.ts` - Seed script with fleet data
- `src/routes/admin.tsx` - Added FleetPanel component and server functions
- `src/routes/fleet.tsx` - Added database integration to load fleet data

### How It Works

1. The fleet page loads default vehicle data from the hardcoded `FLEET` array
2. On mount, it fetches any overrides from MongoDB via `getFleetDataFn()`
3. Database values (if present) override the default image and price for each vehicle
4. The admin panel allows editing these overrides, which are saved to MongoDB
5. All other vehicle properties (name, capacity, features, etc.) remain hardcoded

The following vehicle IDs are available for editing:

- `royal-suite`
- `v-class-prive`
- `setra-touring`
- `phantom-saloon`
- `bentayga-suv`
- `tourismo-midi`
- `double-decker-thames`
- `lumiere-electric`
- `concorde-shuttle`
- `claridge-heritage`
- `highland-sleeper`

## Image Paths

Image paths should be relative to the project root, e.g.:
- `/src/assets/fleet-executive.jpg`
- `/src/assets/fleet-minibus.jpg`

Or use external URLs:
- `https://example.com/images/vehicle.jpg`
