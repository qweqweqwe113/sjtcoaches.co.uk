# 🚀 SJT Coaches - Quick Start Guide

## Instant Launch (Choose Your Method)

### 🎯 Method 1: VBScript (EASIEST - RECOMMENDED)

**Just double-click:** `Start_Project.vbs`

That's it! The server will start and your browser will open automatically.

---

### ⚡ Method 2: PowerShell (Colorful Terminal)

**Right-click** `Start-Project.ps1` → **Run with PowerShell**

---

### 📟 Method 3: Batch File (Classic)

**Double-click:** `start-project.bat`

---

### 🌐 Method 4: HTML Launcher (Visual Interface)

**Double-click:** `Start_Project.html`

Then click the launch button in your browser.

---

## 🎯 Creating Start_Project.exe

Want a real executable? Follow these steps:

### Quick Method (5 minutes):

1. **Download** [Bat to Exe Converter](http://www.f2ko.de/en/b2e.php)
2. **Open** the program
3. **Load** `start-project.bat`
4. **Click** "Compile"
5. **Save** as `Start_Project.exe`
6. **Done!** Now you can double-click the .exe file

### Detailed Instructions:

See `CREATE_EXECUTABLE.md` for complete guide with multiple methods.

---

## 📍 After Launch

The server will be available at:

- **Frontend:** http://localhost:8080
- **Admin Panel:** http://localhost:8080/admin

### Default Admin Login:
- **Email:** admin@sjtcoaches.co.uk
- **Password:** admin123

⚠️ **To change:** Edit `server/auth.ts`

---

## 🛑 Stopping the Server

Press **Ctrl + C** in the terminal window.

---

## 📁 All Launcher Files

| File | Description |
|------|-------------|
| `Start_Project.vbs` | ⭐ VBScript - easiest, just double-click |
| `Start-Project.ps1` | PowerShell - colorful terminal |
| `start-project.bat` | Batch file - simple and reliable |
| `Start_Project.html` | HTML interface - visual launcher |
| `launcher.js` | Node.js - for developers |
| `Start_Project.exe` | Executable (you create this) |

---

## 🆘 Troubleshooting

### "Cannot find npm"
**Install Node.js:** https://nodejs.org/

### "Port 8080 in use"
**Stop other apps** using port 8080, or change port in config.

### "Windows protected your PC"
**Click** "More info" → "Run anyway" (only for .exe files)

### Script won't run
**Use VBS file** - it works without any setup!

---

## 📚 Documentation

- `LAUNCHER_README.md` - Complete launcher documentation
- `CREATE_EXECUTABLE.md` - How to create .exe file
- `ADMIN_SETUP.md` - Admin authentication setup

---

## ✨ First Time Setup

On first run, the launcher will:
1. ✅ Check for dependencies
2. ✅ Install npm packages (if needed)
3. ✅ Start the development server
4. ✅ Open your browser automatically

**First run takes 2-5 minutes** (installing dependencies)  
**Subsequent runs take 5-10 seconds**

---

## 🎉 You're Ready!

1. **Double-click** `Start_Project.vbs`
2. **Wait** for the server to start
3. **Browser opens** automatically
4. **Start developing!**

---

**Need help?** Check the documentation files or run `npm run dev` manually to see error messages.

**Happy Coding! 🚀**
