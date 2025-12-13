/**
 * Image Compression Script
 * Compresses images in public/images/ directory
 * 
 * Usage: node scripts/compress-images.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Create backup directory
const backupDir = path.join(imagesDir, 'backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function compressImage(inputPath, outputPath, isJpeg = true) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    
    if (isJpeg) {
      // More aggressive compression for large background images
      // Check if file is a background image (contains 'bg' in name)
      const isBackground = path.basename(inputPath).toLowerCase().includes('bg');
      const quality = isBackground ? 75 : 85; // Lower quality for backgrounds
      
      await sharp(inputPath)
        .jpeg({ 
          quality: quality,
          mozjpeg: true,
          progressive: true
        })
        .resize(1920, null, { // Resize to max width 1920px (carousel width)
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath);
    } else {
      await sharp(inputPath)
        .png({ 
          quality: 90,
          compressionLevel: 9
        })
        .toFile(outputPath);
    }
    
    const newStats = fs.statSync(outputPath);
    const newSize = newStats.size;
    const reduction = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      originalSize: (originalSize / 1024).toFixed(2),
      newSize: (newSize / 1024).toFixed(2),
      reduction: `${reduction}%`
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

async function main() {
  console.log('📸 Image Compression Tool');
  console.log('========================\n');
  
  const files = fs.readdirSync(imagesDir).filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('backup')
  );
  
  if (files.length === 0) {
    console.log('❌ No images found in public/images/');
    return;
  }
  
  console.log(`Found ${files.length} image(s) to compress:\n`);
  
  for (const file of files) {
    const inputPath = path.join(imagesDir, file);
    const isJpeg = /\.(jpg|jpeg)$/i.test(file);
    const tempPath = path.join(imagesDir, `temp_${file}`);
    
    console.log(`Processing: ${file}`);
    
    // Create backup
    const backupPath = path.join(backupDir, file);
    fs.copyFileSync(inputPath, backupPath);
    console.log(`  ✅ Backup created: backup/${file}`);
    
    // Compress
    const result = await compressImage(inputPath, tempPath, isJpeg);
    
    if (result.success) {
      // Replace original with compressed version
      fs.renameSync(tempPath, inputPath);
      console.log(`  ✅ Compressed: ${result.originalSize} KB → ${result.newSize} KB (${result.reduction} reduction)`);
    } else {
      console.log(`  ❌ Error: ${result.error}`);
      // Remove temp file if it exists
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
      }
    }
    console.log('');
  }
  
  console.log('✅ Compression complete!');
  console.log(`📁 Backups saved in: public/images/backup/`);
  console.log('\n💡 Tip: Test your website to ensure images look good!');
}

main().catch(console.error);

