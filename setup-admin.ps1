# Albion Coach Admin Setup Script (PowerShell)
# This script sets up the D1 database and admin credentials

Write-Host "🚀 Setting up Albion Coach Admin..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Create D1 database
Write-Host "📦 Creating D1 database..." -ForegroundColor Yellow
$dbOutput = wrangler d1 create albion-coach-db 2>&1 | Out-String
Write-Host $dbOutput

# Extract database_id from output
if ($dbOutput -match 'database_id = "([^"]+)"') {
    $dbId = $matches[1]
    Write-Host "✅ Database ID: $dbId" -ForegroundColor Green
    
    # Update wrangler.toml
    Write-Host "📝 Updating wrangler.toml..." -ForegroundColor Yellow
    $content = Get-Content wrangler.toml -Raw
    $content = $content -replace 'database_id = "replace-with-your-d1-database-id"', "database_id = `"$dbId`""
    Set-Content wrangler.toml $content
} else {
    Write-Host "⚠️  Could not extract database_id. It may already exist." -ForegroundColor Yellow
    Write-Host "Please check wrangler.toml and update database_id manually if needed."
}

# Step 2: Generate session secret
Write-Host ""
Write-Host "🔐 Generating session secret..." -ForegroundColor Yellow
$sessionSecret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
$content = Get-Content wrangler.toml -Raw
$content = $content -replace 'SESSION_SECRET = "replace-with-a-long-random-secret"', "SESSION_SECRET = `"$sessionSecret`""
Set-Content wrangler.toml $content
Write-Host "✅ Session secret generated" -ForegroundColor Green

# Step 3: Initialize database schema
Write-Host ""
Write-Host "🗄️  Initializing database schema..." -ForegroundColor Yellow
wrangler d1 execute albion-coach-db --file=server/schema.sql
Write-Host "✅ Schema created" -ForegroundColor Green

# Step 4: Generate admin credentials
Write-Host ""
Write-Host "👤 Generating admin credentials..." -ForegroundColor Yellow
$seedOutput = npx tsx server/seed.ts | Out-String
Write-Host $seedOutput

# Extract the SQL command
if ($seedOutput -match "(INSERT OR REPLACE[^;]+;)") {
    $sqlCommand = $matches[1]
    
    # Step 5: Insert admin credentials
    Write-Host ""
    Write-Host "💾 Inserting admin credentials..." -ForegroundColor Yellow
    wrangler d1 execute albion-coach-db --command="$sqlCommand"
    Write-Host "✅ Admin credentials created" -ForegroundColor Green
}

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Default credentials:" -ForegroundColor Cyan
Write-Host "   Email:    admin@albioncoach.co.uk"
Write-Host "   Password: ChangeMe123!"
Write-Host ""
Write-Host "🌐 Start the dev server with: npm run dev" -ForegroundColor Yellow
Write-Host "🔗 Access admin at: http://localhost:8080/admin" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  Remember to change your password after first login!" -ForegroundColor Red
