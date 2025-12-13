/**
 * Convert PNG to ICO format
 * Note: Sharp doesn't support ICO directly, so this creates a multi-size ICO using a workaround
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const appDir = path.join(projectRoot, 'app');
const tempPng = path.join(appDir, 'favicon-temp.png');
const outputIco = path.join(appDir, 'favicon.ico');

async function convertToICO() {
  try {
    if (!fs.existsSync(tempPng)) {
      console.error('❌ favicon-temp.png not found. Run generate-favicon.mjs first.');
      process.exit(1);
    }

    console.log('🔄 Converting PNG to ICO...');
    
    // Create multiple sizes for ICO (16, 32, 48)
    const sizes = [16, 32, 48];
    const buffers = [];
    
    for (const size of sizes) {
      const buffer = await sharp(tempPng)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .ensureAlpha() // Ensure RGBA format
        .png()
        .toBuffer();
      buffers.push({ size, buffer });
    }

    // Create a simple ICO file structure
    // ICO format: Header + Directory + Image Data
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved (must be 0)
    icoHeader.writeUInt16LE(1, 2); // Type (1 = ICO)
    icoHeader.writeUInt16LE(buffers.length, 4); // Number of images

    let offset = 6 + (buffers.length * 16); // Header + directory entries
    const directory = [];
    const imageData = [];

    for (const { size, buffer } of buffers) {
      // ICO Directory Entry (16 bytes)
      const entry = Buffer.alloc(16);
      entry.writeUInt8(size === 256 ? 0 : size, 0); // Width (0 = 256)
      entry.writeUInt8(size === 256 ? 0 : size, 1); // Height (0 = 256)
      entry.writeUInt8(0, 2); // Color palette (0 = no palette)
      entry.writeUInt8(0, 3); // Reserved
      entry.writeUInt16LE(1, 4); // Color planes (1 for PNG)
      entry.writeUInt16LE(32, 6); // Bits per pixel
      entry.writeUInt32LE(buffer.length, 8); // Image data size
      entry.writeUInt32LE(offset, 12); // Offset to image data
      
      directory.push(entry);
      imageData.push(buffer);
      offset += buffer.length;
    }

    // Combine all parts
    const icoFile = Buffer.concat([
      icoHeader,
      ...directory,
      ...imageData
    ]);

    fs.writeFileSync(outputIco, icoFile);
    
    // Clean up temp file
    fs.unlinkSync(tempPng);
    
    console.log('✅ Created favicon.ico with multiple sizes (16x16, 32x32, 48x48)');
    console.log('✅ Deleted favicon-temp.png');
    console.log('');
    console.log('🎉 Favicon setup complete!');
    console.log('🔄 Restart your dev server to see the new favicon!');

  } catch (error) {
    console.error('❌ Error converting to ICO:', error.message);
    console.log('');
    console.log('💡 Alternative: Use online converter:');
    console.log('   1. Go to: https://convertio.co/png-ico/');
    console.log('   2. Upload: app/favicon-temp.png');
    console.log('   3. Download and save as: app/favicon.ico');
    process.exit(1);
  }
}

convertToICO();

