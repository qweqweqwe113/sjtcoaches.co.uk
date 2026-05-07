# 🚀 SJT Coaches Project Launcher

Multiple ways to start your project with a single click!

## 📋 Available Launchers

| File | Type | Difficulty | Recommended |
|------|------|------------|-------------|
| `Start_Project.vbs` | VBScript | ⭐ Easiest | ✅ YES |
| `Start-Project.ps1` | PowerShell | Easy | ✅ YES |
| `start-project.bat` | Batch | Easy | ✅ YES |
| `launcher.js` | Node.js | Medium | For developers |
| `Start_Project.exe` | Executable | Easy | After creation |

---

## 🎯 Quick Start (Choose One)

### Option 1: VBScript (RECOMMENDED) ⭐

**Just double-click:** `Start_Project.vbs`

✅ No setup required  
✅ Auto-opens browser  
✅ Shows startup notification  
✅ Works on all Windows versions  

### Option 2: PowerShell

**Right-click** `Start-Project.ps1` → **Run with PowerShell**

✅ Colorful terminal output  
✅ Auto-opens browser  
✅ Shows detailed information  

### Option 3: Batch File

**Double-click:** `start-project.bat`

✅ Simple and reliable  
✅ Classic command prompt  

### Option 4: Node.js Launcher

```bash
node launcher.js
```

✅ Cross-platform  
✅ Colorful output  
✅ Auto-installs dependencies  

---

## 🔧 Creating Start_Project.exe

See detailed instructions in `CREATE_EXECUTABLE.md`

**Quick method:**
1. Download [Bat to Exe Converter](http://www.f2ko.de/en/b2e.php)
2. Open `start-project.bat`
3. Click "Compile"
4. Save as `Start_Project.exe`

---

## 🌐 What Happens When You Launch

1. **Checks dependencies** - Installs npm packages if needed (first run only)
2. **Starts dev server** - Runs `npm run dev`
3. **Opens browser** - Automatically navigates to http://localhost:8080
4. **Ready to use!** - Frontend and backend are running

---

## 📍 Access Points

After launching, you can access:

- **Frontend:** http://localhost:8080
- **Admin Panel:** http://localhost:8080/admin
- **API Endpoints:** http://localhost:8080/api/*

### Default Admin Credentials

- **Email:** admin@sjtcoaches.co.uk
- **Password:** admin123

⚠️ **To change:** Edit `server/auth.ts`

---

## 🛑 Stopping the Server

Press **Ctrl + C** in the terminal window

Or simply close the terminal window.

---

## 🎨 Creating a Desktop Shortcut

1. **Right-click** on `Start_Project.vbs` (or any launcher)
2. Select **"Create shortcut"**
3. **Drag** the shortcut to your Desktop
4. **Rename** to "Start SJT Coaches"
5. (Optional) Right-click → Properties → Change Icon

---

## 🔍 Troubleshooting

### "Cannot find npm" or "node is not recognized"

**Solution:** Install Node.js from https://nodejs.org/

Verify installation:
```bash
node --version
npm --version
```

### Port 8080 already in use

**Solution:** Another app is using port 8080. Either:
- Stop the other application
- Or change the port in `vite.config.ts`

### "Windows protected your PC" (for .exe files)

**Solution:** This is normal for unsigned executables.
- Click "More info" → "Run anyway"
- Or use the VBS/PS1 scripts instead (no warning)

### Dependencies won't install

**Solution:** Run manually:
```bash
npm install
```

Check your internet connection and npm configuration.

### Browser doesn't open automatically

**Solution:** Manually open your browser to:
```
http://localhost:8080
```

### Script execution is disabled (PowerShell)

**Solution:** Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📦 What's Included

```
project/
├── Start_Project.vbs          # VBScript launcher (RECOMMENDED)
├── Start-Project.ps1          # PowerShell launcher
├── start-project.bat          # Batch file launcher
├── launcher.js                # Node.js launcher
├── LAUNCHER_README.md         # This file
├── CREATE_EXECUTABLE.md       # Guide to create .exe
└── package.json               # Project dependencies
```

---

## 🎯 Recommended Setup for Different Users

### For End Users (Non-Technical)
1. Use `Start_Project.vbs` - just double-click
2. Create a desktop shortcut
3. Done!

### For Developers
1. Use `Start-Project.ps1` for best terminal experience
2. Or use `launcher.js` for cross-platform compatibility
3. Or run `npm run dev` directly

### For Professional Distribution
1. Create `Start_Project.exe` using Bat to Exe Converter
2. Add a custom icon
3. Create an installer (optional)

---

## 🔐 Security Notes

- All launchers are safe and only run `npm run dev`
- VBS and batch files are plain text - you can inspect them
- Executables may be flagged by antivirus (false positive)
- Never run executables from untrusted sources

---

## 💡 Tips

1. **First run takes longer** - npm installs dependencies
2. **Keep terminal open** - closing it stops the server
3. **Use Ctrl+C to stop** - don't just close the window
4. **Check console for errors** - if something goes wrong
5. **Update dependencies** - run `npm update` occasionally

---

## 🆘 Need Help?

1. Check the terminal output for error messages
2. Verify Node.js is installed: `node --version`
3. Try running `npm run dev` manually
4. Check `package.json` for correct scripts
5. Ensure you're in the project directory

---

## 📝 Technical Details

### What `npm run dev` does:
- Starts Vite development server
- Enables hot module replacement (HMR)
- Runs on http://localhost:8080
- Watches for file changes
- Provides source maps for debugging

### System Requirements:
- Node.js 18+ (recommended: latest LTS)
- npm 9+ (comes with Node.js)
- Windows 10/11 (for .vbs/.bat/.ps1)
- 4GB RAM minimum
- Modern web browser

---

## 🎉 Success!

If you see this in your terminal:
```
VITE v7.x.x  ready in xxx ms
➜  Local:   http://localhost:8080/
```

**Your project is running!** Open the URL in your browser.

---

**Happy Coding! 🚀**
