# PowerShell Script to Package Files for Hostinger Upload
# Run this script to create a ZIP file with all required files

Write-Host "Packaging files for Hostinger deployment..." -ForegroundColor Cyan

# Create temporary directory
$uploadDir = "hostinger-upload"
if (Test-Path $uploadDir) {
    Remove-Item $uploadDir -Recurse -Force
}
New-Item -ItemType Directory -Path $uploadDir -Force | Out-Null

Write-Host ""
Write-Host "Copying folders..." -ForegroundColor Green

# Copy required folders
$folders = @("app", "components", "lib", "public")
foreach ($folder in $folders) {
    if (Test-Path $folder) {
        Copy-Item -Path $folder -Destination "$uploadDir\$folder" -Recurse -Force
        Write-Host "  [OK] $folder/" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $folder/ (NOT FOUND)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Copying configuration files..." -ForegroundColor Green

# Copy required files
$files = @(
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "tsconfig.json",
    "tailwind.config.js",
    "postcss.config.mjs",
    "eslint.config.mjs",
    "middleware.ts"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination "$uploadDir\$file" -Force
        Write-Host "  [OK] $file" -ForegroundColor Green
    } else {
        Write-Host "  [MISSING] $file (NOT FOUND)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Creating ZIP file..." -ForegroundColor Cyan

# Create ZIP file
$zipFile = "hostinger-upload.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

Compress-Archive -Path "$uploadDir\*" -DestinationPath $zipFile -Force

# Get file size
$zipSize = (Get-Item $zipFile).Length / 1MB

Write-Host ""
Write-Host "Package created successfully!" -ForegroundColor Green
Write-Host "  ZIP file: $zipFile" -ForegroundColor Yellow
Write-Host "  Size: $([math]::Round($zipSize, 2)) MB" -ForegroundColor Yellow
Write-Host ""
Write-Host "Ready to upload to Hostinger!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Upload $zipFile to Hostinger File Manager" -ForegroundColor White
Write-Host "  2. Extract the ZIP file on the server" -ForegroundColor White
Write-Host "  3. Set environment variables in Hostinger" -ForegroundColor White
Write-Host "  4. Run: npm install" -ForegroundColor White
Write-Host "  5. Run: npm run build" -ForegroundColor White
Write-Host "  6. Start the application" -ForegroundColor White

# Cleanup
Remove-Item $uploadDir -Recurse -Force

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
