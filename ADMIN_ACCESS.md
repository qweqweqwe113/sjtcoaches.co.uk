# Admin Panel Quick Access

## 🔐 Login Credentials

**URL:** http://localhost:8082/admin

**Email:** `admin@sjtcoaches.co.uk`  
**Password:** `ChangeMe123!`

## 📋 Quick Links

- **Admin Dashboard:** http://localhost:8082/admin
- **Blog Management:** http://localhost:8082/admin (navigate to Resource Management → Blog)
- **Fleet Management:** http://localhost:8082/admin (navigate to Resource Management → Fleet)
- **Settings:** http://localhost:8082/admin (Settings tab)

## 🎯 What You Can Do

### Blog Management
- ✅ Create new articles
- ✅ Edit existing articles
- ✅ Publish/unpublish articles
- ✅ Delete articles
- ✅ Auto-generate URL slugs
- ✅ Add featured images
- ✅ Set author names

### Fleet Management
- ✅ Update vehicle images
- ✅ Update vehicle ranges
- ✅ Manage fleet data

### Settings
- ✅ Change admin email
- ✅ Change admin password

### Messages & Bookings
- ✅ View contact form submissions
- ✅ View booking requests
- ✅ Update booking status

## 🗄️ Database

**Type:** MongoDB Atlas (Cloud)  
**Cluster:** cluster0.uh3jo1f.mongodb.net  
**Database:** albion_coach

**Collections:**
- `blog_posts` - Blog articles
- `fleet` - Fleet vehicles
- `contact_messages` - Contact submissions
- `bookings` - Booking requests
- `admin_credentials` - Admin login (currently in-memory)

## 🚀 Server Status

**Dev Server:** http://localhost:8082  
**Status:** ✅ Running

To restart server:
```bash
npm run dev
```

## 📝 Notes

- Admin credentials are currently hardcoded in `server/auth.ts`
- You can change them in Settings, but they reset on server restart
- For production, implement database-backed authentication
- MongoDB connection string is in `.env` file
