# How to Add Your Image as Favicon

## Quick Method (Using Your Logo)

If you want to use `public/images/logo.png` as your favicon:

### Option 1: Use Online Tool (Recommended - Easiest)

1. **Go to:** https://realfavicongenerator.net/
2. **Upload:** Your logo image (`public/images/logo.png`)
3. **Configure:**
   - Choose your settings (or use defaults)
   - Click "Generate your Favicons and HTML code"
4. **Download** the generated package
5. **Extract** the files
6. **Copy files to `app` directory:**
   - `favicon.ico` → `app/favicon.ico`
   - `apple-touch-icon.png` → `app/apple-icon.png`
   - `icon-32x32.png` → `app/icon.png` (or keep as is)

### Option 2: Manual Method

If you have a specific image file you want to use:

1. **Prepare your image:**
   - Recommended size: 512x512 pixels (square)
   - Format: PNG with transparent background (best)

2. **Convert to favicon.ico:**
   - Use: https://convertio.co/png-ico/ or https://favicon.io/favicon-converter/
   - Upload your image
   - Download `favicon.ico`

3. **Create icon sizes:**
   - 32x32 PNG → `app/icon.png`
   - 180x180 PNG → `app/apple-icon.png`

4. **Replace files:**
   - Copy `favicon.ico` to `app/favicon.ico`
   - Copy your 32x32 image to `app/icon.png`
   - Copy your 180x180 image to `app/apple-icon.png`

## Current Setup

Your favicon is already configured in `app/layout.tsx`:
- Main favicon: `/favicon.ico`
- Icon: `/icon.png`
- Apple icon: `/apple-icon.png`

## After Adding Files

1. **Restart dev server** (if running):
   ```bash
   npm run dev
   ```

2. **Clear browser cache:**
   - Chrome/Edge: Ctrl+Shift+Delete → Clear cached images
   - Or hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

3. **Test:**
   - Check browser tab for favicon
   - Test on mobile device

## File Locations

Next.js 13+ automatically detects favicons in the `app` directory:
- `app/favicon.ico` - Main favicon
- `app/icon.png` - Standard icon
- `app/apple-icon.png` - Apple touch icon

No code changes needed! Just replace the files.

