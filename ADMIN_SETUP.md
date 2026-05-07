# Admin Authentication - Simple Setup

The admin panel uses **hardcoded credentials** - no database setup required!

## Default Credentials

- **Email:** `admin@sjtcoaches.co.uk`
- **Password:** `admin123`

Just start the server and login with these credentials.

## Features

✅ **Simple Authentication**
- Hardcoded email and password
- Session-based login (no database needed)
- Secure session cookies

✅ **Data Management**
- View contact messages from database
- View and manage bookings from database
- Update booking status (pending/confirmed/cancelled)

## Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Open admin panel:**
   ```
   http://localhost:8080/admin
   ```

3. **Login with:**
   - Email: `admin@sjtcoaches.co.uk`
   - Password: `admin123`

That's it! No database setup needed for authentication.

## Changing Credentials

To change the default admin credentials:

1. Open `server/auth.ts`
2. Find these lines:
   ```typescript
   const DEFAULT_ADMIN_EMAIL = "admin@sjtcoaches.co.uk";
   const DEFAULT_ADMIN_PASSWORD = "admin123";
   ```
3. Change the values
4. Restart the server

## Database Setup (For Messages & Bookings)

The authentication doesn't need a database, but messages and bookings do.

### Quick Setup

1. **Install MongoDB:**
   
   **macOS:**
   ```bash
   brew install mongodb-community
   brew services start mongodb-community
   ```
   
   **Or use MongoDB Atlas (cloud):**
   - Create account at https://www.mongodb.com/cloud/atlas
   - Create a free cluster
   - Get connection string

2. **Set environment variable:**
   
   Create `.env` file:
   ```bash
   # Local MongoDB
   MONGODB_URI=mongodb://localhost:27017
   
   # MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

3. **Seed the database:**
   ```bash
   npx tsx server/seed-mongodb.ts
   ```

See `DATABASE_SETUP.md` for detailed instructions.

## Security Notes

- Credentials are hardcoded in the source code
- Session cookies are HttpOnly and SameSite=Strict
- Sessions expire after 24 hours
- For production, consider using environment variables

## Settings Panel

The Settings panel shows the current hardcoded credentials. To change them, you need to modify the source code in `server/auth.ts`.

## Troubleshooting

**Login fails:**
- Check you're using the correct email and password
- Verify the server is running
- Check browser console for errors

**"MongoDB URI not configured" for messages/bookings:**
- This means MongoDB isn't set up
- Set MONGODB_URI environment variable
- Run seed script to populate database
- Messages and bookings require database, but login doesn't

## Production Deployment

For production, consider:
1. Using environment variables for credentials
2. Implementing proper password hashing
3. Adding rate limiting
4. Using a proper authentication system

But for development and simple deployments, hardcoded credentials work fine!
