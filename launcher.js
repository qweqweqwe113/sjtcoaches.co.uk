#!/usr/bin/env node

/**
 * Albion Coach Project Launcher
 * Simple Node.js launcher that starts the development server
 */

const { spawn } = require('child_process');
const { existsSync } = require('fs');
const { join } = require('path');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

// Clear console
console.clear();

// Banner
console.log('');
console.log(colors.cyan + '========================================' + colors.reset);
console.log(colors.yellow + colors.bright + '   ALBION COACH - PROJECT LAUNCHER' + colors.reset);
console.log(colors.cyan + '========================================' + colors.reset);
console.log('');

// Check if node_modules exists
const nodeModulesPath = join(__dirname, 'node_modules');
if (!existsSync(nodeModulesPath)) {
  console.log(colors.yellow + '[SETUP] Installing dependencies...' + colors.reset);
  console.log(colors.gray + 'This may take a few minutes on first run...' + colors.reset);
  console.log('');
  
  const install = spawn('npm', ['install'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });
  
  install.on('close', (code) => {
    if (code !== 0) {
      console.log('');
      console.log(colors.red + '[ERROR] Failed to install dependencies' + colors.reset);
      process.exit(1);
    }
    
    console.log('');
    console.log(colors.green + '[SUCCESS] Dependencies installed!' + colors.reset);
    console.log('');
    startServer();
  });
} else {
  startServer();
}

function startServer() {
  // Display server information
  console.log(colors.cyan + '========================================' + colors.reset);
  console.log(colors.yellow + '  SERVER INFORMATION' + colors.reset);
  console.log(colors.cyan + '========================================' + colors.reset);
  console.log('');
  console.log('  Frontend:  ' + colors.green + 'http://localhost:8080' + colors.reset);
  console.log('  Admin:     ' + colors.green + 'http://localhost:8080/admin' + colors.reset);
  console.log('');
  console.log(colors.yellow + '  Default Admin Credentials:' + colors.reset);
  console.log(colors.gray + '    Email:    admin@albioncoach.co.uk' + colors.reset);
  console.log(colors.gray + '    Password: ChangeMe123!' + colors.reset);
  console.log('');
  console.log(colors.cyan + '========================================' + colors.reset);
  console.log('');
  console.log(colors.yellow + '[INFO] Starting development server...' + colors.reset);
  console.log(colors.gray + '[INFO] Press Ctrl+C to stop the server' + colors.reset);
  console.log('');
  
  // Open browser after 5 seconds
  setTimeout(() => {
    const open = require('child_process').exec;
    const url = 'http://localhost:8080';
    
    // Cross-platform browser opening
    const command = process.platform === 'win32' 
      ? `start ${url}` 
      : process.platform === 'darwin' 
        ? `open ${url}` 
        : `xdg-open ${url}`;
    
    open(command, (error) => {
      if (error) {
        console.log(colors.gray + '[INFO] Please open your browser to: ' + colors.green + url + colors.reset);
      }
    });
  }, 5000);
  
  // Start the dev server
  const dev = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true,
    cwd: __dirname
  });
  
  dev.on('close', (code) => {
    console.log('');
    console.log(colors.yellow + '[INFO] Server stopped.' + colors.reset);
    console.log('');
    process.exit(code);
  });
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('');
    console.log(colors.yellow + '[INFO] Shutting down server...' + colors.reset);
    dev.kill('SIGINT');
  });
}
