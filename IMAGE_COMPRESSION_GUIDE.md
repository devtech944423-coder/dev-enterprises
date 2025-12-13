# Image Compression Guide

## 📸 Current Images to Optimize

Images located in `public/images/`:
- `semiconductor-bg.jpg` - Carousel background
- `sensor-bg.jpg` - Carousel background  
- `cables-bg.jpg` - Carousel background
- `logo.png` - Site logo

## 🎯 Target Sizes

- **Background images** (JPG): < 200KB each
- **Logo** (PNG): < 50KB

## 🛠️ Compression Methods

### Method 1: Online Tools (Recommended - Easiest)

#### Option A: Squoosh (Google)
1. Visit: https://squoosh.app/
2. Click "Select an image"
3. Upload your image from `public/images/`
4. **For JPG backgrounds:**
   - Format: MozJPEG
   - Quality: 80-85
   - Click "Download"
5. **For PNG logo:**
   - Format: OxiPNG or WebP
   - Quality: 90-95
   - Click "Download"
6. Replace original file in `public/images/`

#### Option B: TinyPNG (Also handles JPG)
1. Visit: https://tinypng.com/
2. Drag and drop images
3. Download compressed versions
4. Replace original files

**Advantages:**
- ✅ No installation needed
- ✅ Easy to use
- ✅ Good compression ratios
- ✅ Free

---

### Method 2: Using Sharp (Node.js - Recommended for Developers)

#### Step 1: Install Sharp
```bash
npm install --save-dev sharp
```

#### Step 2: Compress Images
```bash
# Compress JPG files
npx sharp-cli -i public/images/*.jpg -o public/images/ -q 85

# Compress PNG files
npx sharp-cli -i public/images/*.png -o public/images/ -q 90
```

**Or create a script:**

Create `scripts/compress-images.mjs`:
```javascript
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const imagesDir = './public/images';
const files = fs.readdirSync(imagesDir);

for (const file of files) {
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(/\.(jpg|jpeg)$/i, '_compressed.jpg'));
    
    await sharp(inputPath)
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outputPath);
    
    console.log(`✅ Compressed: ${file}`);
  } else if (file.endsWith('.png')) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(/\.png$/i, '_compressed.png'));
    
    await sharp(inputPath)
      .png({ quality: 90, compressionLevel: 9 })
      .toFile(outputPath);
    
    console.log(`✅ Compressed: ${file}`);
  }
}
```

Run:
```bash
node scripts/compress-images.mjs
```

---

### Method 3: Using ImageMagick (CLI Tool)

#### Step 1: Install ImageMagick
- Windows: Download from https://imagemagick.org/script/download.php
- Mac: `brew install imagemagick`
- Linux: `sudo apt-get install imagemagick`

#### Step 2: Compress Images
```bash
# Compress JPG
magick convert public/images/semiconductor-bg.jpg -quality 85 -strip public/images/semiconductor-bg.jpg
magick convert public/images/sensor-bg.jpg -quality 85 -strip public/images/sensor-bg.jpg
magick convert public/images/cables-bg.jpg -quality 85 -strip public/images/cables-bg.jpg

# Compress PNG
magick convert public/images/logo.png -quality 90 -strip public/images/logo.png
```

---

### Method 4: Using VS Code Extension

1. Install "Image Optimizer" extension in VS Code
2. Right-click on image file
3. Select "Image Optimizer: Compress Images"
4. Choose compression level (80-85% for JPG, 90% for PNG)

---

## 📊 Quality Guidelines

### JPEG (Background Images)
- **Quality:** 80-85
- **Why:** Good balance between file size and visual quality
- **Result:** 50-70% size reduction

### PNG (Logo)
- **Quality:** 90-95
- **Why:** Preserves transparency and sharp edges
- **Result:** 30-50% size reduction

### WebP (Optional - Advanced)
- **Quality:** 80-85
- **Why:** 25-35% smaller than JPEG
- **Note:** Next.js automatically serves WebP when browser supports it

---

## ✅ Verification Steps

After compression:

1. **Check file sizes:**
   ```bash
   # Windows PowerShell
   Get-ChildItem public\images\*.jpg | Select-Object Name, @{Name="Size(KB)";Expression={[math]::Round($_.Length/1KB,2)}}
   ```

2. **Verify images still look good:**
   - Open in browser
   - Check carousel displays correctly
   - Verify logo is sharp

3. **Test performance:**
   - Run Lighthouse audit
   - Check image load times
   - Verify no visual quality loss

---

## 🚀 Quick Start (Easiest Method)

1. **Go to:** https://squoosh.app/
2. **Upload:** `public/images/semiconductor-bg.jpg`
3. **Settings:**
   - Format: MozJPEG
   - Quality: 85
4. **Download** and replace original
5. **Repeat** for other images

**Time required:** ~5 minutes for all images

---

## 📝 Notes

- Always keep backups of original images
- Test images in browser after compression
- Next.js Image component will further optimize on-the-fly
- WebP conversion happens automatically (no need to convert manually)

---

**Status:** Ready to compress! Choose the method that works best for you.

