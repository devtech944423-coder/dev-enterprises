/**
 * Image Compression Script
 * 
 * This script helps compress images in the public/images directory.
 * 
 * Prerequisites:
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/compress-images.js
 * 
 * Alternative: Use online tools like Squoosh.app or TinyPNG
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(process.cwd(), 'public', 'images');
const outputDir = path.join(process.cwd(), 'public', 'images', 'optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('📸 Image Compression Guide');
console.log('========================\n');

console.log('To compress images, you have several options:\n');

console.log('OPTION 1: Online Tools (Easiest)');
console.log('---------------------------------');
console.log('1. Visit: https://squoosh.app/');
console.log('2. Upload each image from public/images/');
console.log('3. Adjust quality to 80-85%');
console.log('4. Download optimized images');
console.log('5. Replace original files\n');

console.log('OPTION 2: Using Sharp (CLI)');
console.log('----------------------------');
console.log('1. Install: npm install --save-dev sharp');
console.log('2. Run: npx sharp-cli -i public/images/*.jpg -o public/images/ -q 85');
console.log('3. For PNG: npx sharp-cli -i public/images/*.png -o public/images/ -q 90\n');

console.log('OPTION 3: Using ImageMagick');
console.log('----------------------------');
console.log('1. Install ImageMagick: https://imagemagick.org/script/download.php');
console.log('2. Run: magick convert input.jpg -quality 85 -strip output.jpg\n');

console.log('Target Sizes:');
console.log('- Background images (semiconductor-bg.jpg, sensor-bg.jpg, cables-bg.jpg): < 200KB');
console.log('- Logo (logo.png): < 50KB\n');

console.log('Current images to optimize:');
const files = fs.readdirSync(imagesDir).filter(file => 
  /\.(jpg|jpeg|png|webp)$/i.test(file)
);

files.forEach(file => {
  const filePath = path.join(imagesDir, file);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  
  console.log(`  - ${file}: ${sizeKB} KB (${sizeMB} MB)`);
});

console.log('\n✅ After compression, replace the original files in public/images/');

