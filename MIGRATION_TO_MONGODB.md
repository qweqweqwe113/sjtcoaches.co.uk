# Migration Guide: D1/SQLite to MongoDB

This guide helps you migrate from Cloudflare D1 (SQLite) to MongoDB.

## Overview

The application has been updated to use MongoDB instead of Cloudflare D1. This provides:
- Better scalability for production workloads
- More flexible data modeling
- Easier local development
- Standard database tooling and monitoring

## Breaking Changes

### Database Layer
- **Before**: Used Cloudflare D1 (SQLite) via `env.DB`
- **After**: Uses MongoDB via `MONGODB_URI` environment variable

### Data Types
- **IDs**: Changed from `number` (auto-increment) to `string` (MongoDB ObjectId)
- **Dates**: Changed from `string` (ISO format) to `Date` objects (serialized as ISO strings in API responses)
- **Arrays**: `add_ons` changed from JSON string to native array

### Environment Variables
- **Removed**: `DB` binding in wrangler.toml
- **Added**: `MONGODB_URI` environment variable

## Migration Steps

### 1. Install MongoDB

Choose one of these options:

**Option A: Local MongoDB**
```bash
# macOS
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Or run manually
mongod --dbpath /path/to/data
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string

### 2. Set Environment Variable

Create a `.env` file:
```bash
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
```

For Cloudflare deployment, set in dashboard or wrangler.toml:
```toml
[vars]
MONGODB_URI = "your-connection-string"
```

### 3. Export Existing Data (Optional)

If you have existing data in D1:

```bash
# Export from D1
wrangler d1 export sjt-coaches-db --output=backup.sql

# Convert SQL to MongoDB (manual process)
# You'll need to parse the SQL and insert into MongoDB
# Or use a migration script
```

### 4. Seed MongoDB

Run the seed script:
```bash
# With default credentials
npx tsx server/seed-mongodb.ts

# With custom credentials
npx tsx server/seed-mongodb.ts admin@example.com MyPassword123
```

### 5. Update Dependencies

The `mongodb` package is already in package.json. If you need to install:
```bash
npm install mongodb
# or
bun install mongodb
```

### 6. Test Locally

```bash
# Start development server
npm run dev

# Test admin login
# Navigate to /admin
# Use credentials from seed script
```

### 7. Deploy

For Cloudflare Workers:
1. Ensure `MONGODB_URI` is set in Cloudflare dashboard
2. MongoDB Atlas is recommended for production
3. Whitelist Cloudflare IPs in MongoDB Atlas

```bash
npm run build
# Deploy using your preferred method
```

## Code Changes Summary

### Server Files Changed
- `server/db.ts` - Updated all database functions for MongoDB
- `server/mongodb.ts` - New file for MongoDB connection
- `server/contact.ts` - Updated to use MongoDB
- `server/bookings.ts` - Updated to use MongoDB
- `server/seed-mongodb.ts` - New seed script for MongoDB

### Route Files Changed
- `src/routes/admin.tsx` - Updated server functions and ID types
- `src/routes/fleet.tsx` - Updated server functions

### Schema Changes

**admin_credentials**
```javascript
// Before (D1)
{ id: 1, email: "...", password_hash: "..." }

// After (MongoDB)
{ _id: ObjectId, email: "...", password_hash: "..." }
```

**bookings**
```javascript
// Before (D1)
{
  id: 123,
  add_ons: '["wifi","refreshments"]',  // JSON string
  created_at: "2024-01-01T12:00:00"    // string
}

// After (MongoDB)
{
  _id: ObjectId("..."),
  add_ons: ["wifi", "refreshments"],   // native array
  created_at: Date("2024-01-01T12:00:00")  // Date object
}
```

## Rollback Plan

If you need to rollback to D1:

1. Checkout previous commit:
```bash
git log --oneline  # Find commit before MongoDB migration
git checkout <commit-hash>
```

2. Restore D1 configuration in wrangler.toml

3. Redeploy

## Troubleshooting

### Connection Errors

**Error**: "MongoDB URI not configured"
- **Solution**: Ensure `MONGODB_URI` environment variable is set

**Error**: "MongoServerError: Authentication failed"
- **Solution**: Check username/password in connection string

**Error**: "Connection timeout"
- **Solution**: Check network access, whitelist IP in MongoDB Atlas

### Data Issues

**Error**: "Cannot read property '_id' of undefined"
- **Solution**: Run seed script to populate database

**Error**: "Cast to ObjectId failed"
- **Solution**: Ensure IDs are strings, not numbers

### Performance

If queries are slow:
- Check indexes are created (seed script creates them)
- Monitor with MongoDB Atlas dashboard
- Consider connection pooling settings

## Support

For issues:
1. Check DATABASE_SETUP.md for detailed setup instructions
2. Review MongoDB logs
3. Check application logs for specific errors

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
