# PowerShell Script to Upload Files to Hostinger VPS
# Run this from your local Windows machine

param(
    [Parameter(Mandatory=$true)]
    [string]$VpsIp,
    
    [Parameter(Mandatory=$false)]
    [int]$SshPort = 22,
    
    [Parameter(Mandatory=$false)]
    [string]$RemotePath = "/var/www/dev-enterprises"
)

Write-Host "🚀 Uploading files to VPS..." -ForegroundColor Cyan
Write-Host "VPS IP: $VpsIp" -ForegroundColor Yellow
Write-Host "SSH Port: $SshPort" -ForegroundColor Yellow
Write-Host "Remote Path: $RemotePath" -ForegroundColor Yellow
Write-Host ""

# Check if SCP is available (Windows 10+ has OpenSSH)
if (-not (Get-Command scp -ErrorAction SilentlyContinue)) {
    Write-Host "❌ SCP not found. Please install OpenSSH client:" -ForegroundColor Red
    Write-Host "   Settings > Apps > Optional Features > Add OpenSSH Client" -ForegroundColor Yellow
    exit 1
}

# Files and folders to upload
$itemsToUpload = @(
    "app",
    "components",
    "lib",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.mjs",
    "eslint.config.mjs",
    "middleware.ts"
)

Write-Host "Checking files..." -ForegroundColor Green
$missingItems = @()
foreach ($item in $itemsToUpload) {
    if (Test-Path $item) {
        Write-Host "  [OK] $item" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $item" -ForegroundColor Yellow
        $missingItems += $item
    }
}

if ($missingItems.Count -gt 0) {
    Write-Host "`n⚠️  Warning: Some items are missing. Continue anyway? (Y/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "Y" -and $response -ne "y") {
        Write-Host "Upload cancelled." -ForegroundColor Red
        exit 1
    }
}

Write-Host "`n📤 Uploading files..." -ForegroundColor Cyan
Write-Host "You will be prompted for your root password." -ForegroundColor Yellow
Write-Host ""

# Create remote directory first
Write-Host "Creating remote directory..." -ForegroundColor Green
$sshCommand = "mkdir -p $RemotePath"
ssh root@${VpsIp} -p $SshPort $sshCommand

# Upload files
$uploadItems = $itemsToUpload | Where-Object { Test-Path $_ }

foreach ($item in $uploadItems) {
    Write-Host "Uploading: $item" -ForegroundColor Yellow
    
    if (Test-Path $item -PathType Container) {
        # It's a directory
        scp -r -P $SshPort $item root@${VpsIp}:${RemotePath}/
    } else {
        # It's a file
        scp -P $SshPort $item root@${VpsIp}:${RemotePath}/
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ $item uploaded successfully" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Failed to upload $item" -ForegroundColor Red
    }
}

Write-Host "`n✅ Upload completed!" -ForegroundColor Green
Write-Host "`nNext steps on your VPS:" -ForegroundColor Cyan
Write-Host "1. SSH into your VPS: ssh root@$VpsIp -p $SshPort" -ForegroundColor White
Write-Host "2. Navigate to: cd $RemotePath" -ForegroundColor White
Write-Host "3. Install dependencies: npm install" -ForegroundColor White
Write-Host "4. Build: npm run build" -ForegroundColor White
Write-Host "5. Create .env.production with your environment variables" -ForegroundColor White
Write-Host "6. Start with PM2: pm2 start npm --name 'dev-enterprises' -- start" -ForegroundColor White
Write-Host "`nOr run the deploy script: bash deploy-to-vps.sh" -ForegroundColor Yellow

