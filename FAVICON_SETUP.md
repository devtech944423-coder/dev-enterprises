# Favicon Setup Guide

## Current Setup

I've configured the website to use your logo as the favicon. The favicon is now set to use `/images/logo.png`.

## To Create Proper Favicon Files

For best results across all browsers and devices, you should create multiple favicon sizes:

### Required Sizes:
- **favicon.ico** - 16x16, 32x32, 48x48 (multi-size ICO file)
- **icon-16x16.png** - 16x16 pixels
- **icon-32x32.png** - 32x32 pixels
- **icon-192x192.png** - 192x192 pixels (Android)
- **icon-512x512.png** - 512x512 pixels (Android)
- **apple-touch-icon.png** - 180x180 pixels (iOS)

### How to Create Favicons:

1. **Online Tools** (Easiest):
   - Visit https://realfavicongenerator.net/
   - Upload your logo (`public/images/logo.png`)
   - Download the generated favicon package
   - Extract and place files in the `public` directory

2. **Using Image Editor**:
   - Open your logo in an image editor (Photoshop, GIMP, etc.)
   - Resize to each required size
   - Save as PNG files
   - For favicon.ico, use an online converter

3. **Command Line** (if you have ImageMagick):
   ```bash
   # Convert logo to different sizes
   magick public/images/logo.png -resize 16x16 public/icon-16x16.png
   magick public/images/logo.png -resize 32x32 public/icon-32x32.png
   magick public/images/logo.png -resize 192x192 public/icon-192x192.png
   magick public/images/logo.png -resize 512x512 public/icon-512x512.png
   magick public/images/logo.png -resize 180x180 public/apple-touch-icon.png
   ```

### File Structure After Setup:

```
public/
  ├── favicon.ico
  ├── icon-16x16.png
  ├── icon-32x32.png
  ├── icon-192x192.png
  ├── icon-512x512.png
  ├── apple-touch-icon.png
  └── images/
      └── logo.png
```

## Current Configuration

The website is currently configured to:
- Use `/favicon.ico` as the main favicon
- Use `/images/logo.png` as a fallback icon
- Use `/images/logo.png` as the Apple touch icon

## Testing

After adding favicon files:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser tab to see favicon
4. Test on mobile devices

## Note

The favicon metadata is already configured in `app/layout.tsx`. Once you add the favicon files to the `public` directory, they will automatically be used.


