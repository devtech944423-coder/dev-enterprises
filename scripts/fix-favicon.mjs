/**
 * Fix Favicon - Create proper ICO file
 * Uses the source image directly to create a valid ICO
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const sourceImage = path.join(projectRoot, 'public', 'images', 'favicon-source.png');
const appDir = path.join(projectRoot, 'app');
const outputIco = path.join(appDir, 'favicon.ico');

async function createProperICO() {
  try {
    console.log('🔄 Creating proper favicon.ico from source image...');
    
    // Create a 32x32 RGBA PNG first
    const png32 = await sharp(sourceImage)
      .resize(32, 32, { 
        fit: 'contain', 
        background: { r: 0, g: 0, b: 0, alpha: 0 } 
      })
      .ensureAlpha() // Ensure RGBA format
      .png()
      .toBuffer();

    // For Next.js, we can actually just use PNG as favicon.ico
    // But let's create a proper ICO structure
    // Since manual ICO creation is complex, let's copy the PNG and rename it
    // Next.js can handle PNG files with .ico extension
    
    // Actually, let's create a simple single-size ICO
    // ICO header (6 bytes)
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0); // Reserved
    header.writeUInt16LE(1, 2); // Type (1 = ICO)
    header.writeUInt16LE(1, 4); // Number of images (1)

    // ICO directory entry (16 bytes)
    const directory = Buffer.alloc(16);
    directory.writeUInt8(32, 0); // Width
    directory.writeUInt8(32, 1); // Height
    directory.writeUInt8(0, 2); // Color palette
    directory.writeUInt8(0, 3); // Reserved
    directory.writeUInt16LE(0, 4); // Color planes (0 for PNG)
    directory.writeUInt16LE(0, 6); // Bits per pixel (0 for PNG)
    directory.writeUInt32LE(png32.length, 8); // Image data size
    directory.writeUInt32LE(22, 12); // Offset (6 header + 16 directory = 22)

    // Combine: header + directory + PNG data
    const icoFile = Buffer.concat([header, directory, png32]);
    
    fs.writeFileSync(outputIco, icoFile);
    
    console.log('✅ Created favicon.ico');
    console.log('🔄 Try restarting your dev server now!');
    console.log('');
    console.log('💡 If error persists, Next.js can use PNG files:');
    console.log('   - You can rename icon.png to favicon.ico');
    console.log('   - Or use online converter: https://convertio.co/png-ico/');

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Fallback: Copy icon.png as favicon.ico (Next.js supports this)
    console.log('');
    console.log('🔄 Trying fallback: Using icon.png as favicon...');
    try {
      const iconPng = path.join(appDir, 'icon.png');
      if (fs.existsSync(iconPng)) {
        fs.copyFileSync(iconPng, outputIco);
        console.log('✅ Copied icon.png to favicon.ico (Next.js will handle it)');
      }
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError.message);
    }
  }
}

createProperICO();

