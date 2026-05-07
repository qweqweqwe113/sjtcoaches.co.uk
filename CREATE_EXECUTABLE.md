# Creating Start_Project.exe

This guide explains how to create an executable file to launch the SJT Coaches project.

## Quick Start (Easiest Methods)

### Method 1: Use VBS Script (No Installation Required) ⭐ RECOMMENDED

Simply **double-click** `Start_Project.vbs` - it works immediately without any setup!

This will:
- Start the development server
- Automatically open your browser to http://localhost:8080
- Show a notification when starting

### Method 2: Use PowerShell Script

Right-click `Start-Project.ps1` and select **"Run with PowerShell"**

Or from PowerShell:
```powershell
.\Start-Project.ps1
```

### Method 3: Use Batch File

Double-click `start-project.bat`

---

## Creating an Actual .EXE File

If you want a true executable file, here are several methods:

### Option A: Using Bat to Exe Converter (Easiest)

1. **Download Bat to Exe Converter:**
   - Visit: https://bat-to-exe-converter.en.softonic.com/
   - Or: http://www.f2ko.de/en/b2e.php
   - Install the free version

2. **Convert the batch file:**
   - Open Bat to Exe Converter
   - Click "Open" and select `start-project.bat`
   - Set options:
     - ✅ Include icon (optional)
     - ✅ Invisible application: NO
     - ✅ Administrator rights: NO
   - Click "Compile"
   - Save as `Start_Project.exe`

### Option B: Using PS2EXE (PowerShell to EXE)

1. **Install PS2EXE:**
   ```powershell
   Install-Module -Name ps2exe -Scope CurrentUser
   ```

2. **Convert PowerShell script to EXE:**
   ```powershell
   Invoke-PS2EXE -inputFile "Start-Project.ps1" -outputFile "Start_Project.exe" -noConsole:$false -title "SJT Coaches Launcher" -version "1.0.0.0"
   ```

3. **With custom icon (optional):**
   ```powershell
   Invoke-PS2EXE -inputFile "Start-Project.ps1" -outputFile "Start_Project.exe" -iconFile "icon.ico" -noConsole:$false
   ```

### Option C: Using IExpress (Built into Windows)

1. **Open IExpress:**
   - Press `Win + R`
   - Type `iexpress` and press Enter

2. **Follow the wizard:**
   - Select "Create new Self Extraction Directive file"
   - Choose "Extract files and run an installation command"
   - Package title: "SJT Coaches Launcher"
   - No prompt
   - Do not display license
   - Add files: `start-project.bat`
   - Install program: `start-project.bat`
   - Show window: Default
   - Finished message: "Starting SJT Coaches..."
   - Browse and save as `Start_Project.exe`
   - Save SED file for future use

### Option D: Using Advanced Installer (Professional)

1. **Download Advanced Installer:**
   - Visit: https://www.advancedinstaller.com/
   - Free version available

2. **Create a new project:**
   - Select "Simple" project
   - Add `start-project.bat` as the main executable
   - Build the project

---

## Creating a Desktop Shortcut

After creating the executable (or to use the VBS/PS1 files):

1. **Right-click** on `Start_Project.exe` (or `.vbs` or `.ps1`)
2. Select **"Create shortcut"**
3. **Drag the shortcut** to your Desktop
4. **Rename** it to "Start SJT Coaches"
5. (Optional) **Right-click** the shortcut → Properties → Change Icon

---

## Custom Icon (Optional)

To add a custom icon to your executable:

1. **Create or download an icon file** (`.ico` format)
2. Save it as `sjt-icon.ico` in the project folder
3. When creating the EXE, specify the icon file path

**Free icon resources:**
- https://icons8.com/
- https://www.flaticon.com/
- https://iconarchive.com/

---

## Troubleshooting

### "Windows protected your PC" message

This is normal for unsigned executables. Click "More info" → "Run anyway"

To avoid this:
- Use the VBS script instead (no warning)
- Or sign your executable with a code signing certificate

### Script doesn't find npm

Make sure Node.js is installed and in your PATH:
```powershell
node --version
npm --version
```

If not found, install Node.js from: https://nodejs.org/

### Port 8080 already in use

Another application is using port 8080. Either:
- Stop the other application
- Or modify `vite.config.ts` to use a different port

### Dependencies not installing

Run manually:
```bash
npm install
```

---

## What Each File Does

| File | Purpose |
|------|---------|
| `Start_Project.vbs` | VBScript launcher - easiest to use, no setup needed |
| `Start-Project.ps1` | PowerShell launcher - colorful terminal, auto-opens browser |
| `start-project.bat` | Batch file - simple command prompt launcher |
| `Start_Project.exe` | Compiled executable (you create this) |

---

## Recommended Approach

**For daily use:** Just double-click `Start_Project.vbs` - it's the simplest!

**For a professional setup:** Create `Start_Project.exe` using Bat to Exe Converter and add a custom icon.

**For developers:** Use `Start-Project.ps1` for the best terminal experience.

---

## Security Note

When creating executables from scripts, some antivirus software may flag them as suspicious. This is a false positive. To avoid this:

1. Use the VBS script (rarely flagged)
2. Add an exception in your antivirus
3. Use a code signing certificate (for professional distribution)

---

## Need Help?

If you encounter issues:
1. Check that Node.js is installed: `node --version`
2. Verify you're in the correct directory
3. Try running `npm run dev` manually first
4. Check the console for error messages
