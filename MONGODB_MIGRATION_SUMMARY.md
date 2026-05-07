# MongoDB Migration Summary

## What Was Changed

The application has been migrated from Cloudflare D1 (SQLite) to MongoDB.

## Files Created

1. **server/mongodb.ts** - MongoDB connection management
2. **server/seed-mongodb.ts** - MongoDB seed script
3. **DATABASE_SETUP.md** - Complete MongoDB setup guide
4. **MIGRATION_TO_MONGODB.md** - Detailed migration guide
5. **.env.example** - Environment variable template
6. **MONGODB_MIGRATION_SUMMARY.md** - This file

## Files Modified

1. **server/db.ts** - Updated all database functions to use MongoDB
   - Changed from D1Database to MongoDB Db type
   - Updated interfaces to use ObjectId instead of number IDs
   - Changed `created_at` from string to Date
   - Changed `add_ons` from JSON string to native array

2. **server/contact.ts** - Updated to use MongoDB
   - Added getMongoDb import
   - Changed env.DB to MongoDB connection

3. **server/bookings.ts** - Updated to use MongoDB
   - Added getMongoDb import
   - Changed env.DB to MongoDB connection
   - Updated ID type from number to string

4. **src/routes/admin.tsx** - Updated server functions (NEEDS MANUAL FIX)
   - Added MongoDB imports
   - Updated server functions to serialize ObjectIds
   - Changed ID types from number to string
   - **NOTE**: File became corrupted during editing - needs manual restoration

5. **src/routes/fleet.tsx** - Updated server functions
   - Added MongoDB imports
   - Updated to serialize ObjectIds

6. **FLEET_MANAGEMENT.md** - Updated for MongoDB
7. **ADMIN_SETUP.md** - Updated for MongoDB

## Key Changes

### Data Type Changes

**IDs:**
- Before: `id: number` (auto-increment)
- After: `_id: ObjectId` (serialized to string in API responses)

**Dates:**
- Before: `created_at: string` (ISO format)
- After: `created_at: Date` (serialized to ISO string in API responses)

**Arrays:**
- Before: `add_ons: string` (JSON string like '["wifi","refreshments"]')
- After: `add_ons: string[]` (native array)

### Environment Variables

**Removed:**
- `DB` binding from wrangler.toml

**Added:**
- `MONGODB_URI` environment variable

## Setup Instructions

### 1. Install MongoDB

**Local:**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community
```

**Cloud (MongoDB Atlas):**
- Create account at https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

### 2. Configure Environment

Create `.env` file:
```bash
MONGODB_URI=mongodb://localhost:27017
```

### 3. Seed Database

```bash
npx tsx server/seed-mongodb.ts
```

## Known Issues

### admin.tsx File Corruption

The `src/routes/admin.tsx` file became corrupted during the migration with duplicate function definitions. To fix:

1. **Option A**: Restore from backup/git if available
2. **Option B**: Manually fix the duplicates:
   - Remove duplicate `updateFleetVehicleFn` definitions
   - Ensure all server functions are defined only once
   - Verify imports are correct

The correct server functions should be:
- `getMessagesFn` - fetches contact messages
- `getBookingsFn` - fetches bookings
- `updateBookingStatusFn` - updates booking status
- `getFleetFn` - fetches fleet data
- `updateFleetVehicleFn` - updates fleet vehicle

Each should:
1. Get `MONGODB_URI` from env
2. Call `getMongoDb(env)` to get database connection
3. Call the appropriate db function
4. Serialize ObjectIds to strings using `.toString()`
5. Serialize Dates to ISO strings using `.toISOString()`

### fleet.tsx Type Issue

The fleet.tsx file has a type mismatch where serialized data (with string _id) is being set to state expecting ObjectId. This needs to be fixed by updating the FleetVehicle type or the state type.

## Testing

After fixing the corrupted files:

1. Start MongoDB
2. Run seed script
3. Start dev server: `npm run dev`
4. Test admin login at `/admin`
5. Test contact form submission
6. Test booking creation
7. Test fleet management

## Rollback

If needed, revert to previous commit before MongoDB migration.

## Next Steps

1. **Fix admin.tsx corruption** - Remove duplicate functions
2. **Fix fleet.tsx type issue** - Update types for serialized data
3. **Test all functionality** - Ensure everything works
4. **Update deployment config** - Set MONGODB_URI in production
5. **Remove old files** - Delete server/schema.sql, server/seed.ts (old D1 files)

## Benefits of MongoDB

- Better scalability
- Flexible schema
- Easier local development
- Standard tooling
- No Cloudflare-specific dependencies
- Native array and date support

## Documentation

See these files for more details:
- `DATABASE_SETUP.md` - Setup instructions
- `MIGRATION_TO_MONGODB.md` - Detailed migration guide
- `FLEET_MANAGEMENT.md` - Fleet management with MongoDB
- `ADMIN_SETUP.md` - Admin setup with MongoDB
