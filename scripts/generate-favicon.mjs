/**
 * Generate Favicon from Source Image
 * Converts favicon-source.png to all required favicon formats
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

async function generateFavicons() {
  try {
    // Check if source image exists
    if (!fs.existsSync(sourceImage)) {
      console.error('❌ Source image not found:', sourceImage);
      console.log('Please save your image as: public/images/favicon-source.png');
      process.exit(1);
    }

    console.log('📸 Generating favicons from:', sourceImage);
    console.log('');

    // Read source image
    const imageBuffer = await sharp(sourceImage).toBuffer();

    // Generate favicon.ico (multi-size ICO)
    // Note: Sharp doesn't support ICO directly, so we'll create PNG and suggest conversion
    console.log('🔄 Generating favicon.ico...');
    const favicon32 = await sharp(imageBuffer)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    
    // For now, save as PNG (we'll convert to ICO separately)
    const faviconPngPath = path.join(appDir, 'favicon-temp.png');
    fs.writeFileSync(faviconPngPath, favicon32);
    console.log('  ✅ Created 32x32 PNG (will convert to ICO)');

    // Generate icon.png (32x32)
    console.log('🔄 Generating icon.png (32x32)...');
    const icon32 = await sharp(imageBuffer)
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(appDir, 'icon.png'), icon32);
    console.log('  ✅ Created icon.png (32x32)');

    // Generate apple-icon.png (180x180)
    console.log('🔄 Generating apple-icon.png (180x180)...');
    const appleIcon = await sharp(imageBuffer)
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon);
    console.log('  ✅ Created apple-icon.png (180x180)');

    // Generate additional sizes for better compatibility
    console.log('🔄 Generating additional sizes...');
    
    // 16x16
    const icon16 = await sharp(imageBuffer)
      .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(appDir, 'icon-16.png'), icon16);
    console.log('  ✅ Created icon-16.png (16x16)');

    // 192x192 (Android)
    const icon192 = await sharp(imageBuffer)
      .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(appDir, 'icon-192.png'), icon192);
    console.log('  ✅ Created icon-192.png (192x192)');

    // 512x512 (Android)
    const icon512 = await sharp(imageBuffer)
      .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    fs.writeFileSync(path.join(appDir, 'icon-512.png'), icon512);
    console.log('  ✅ Created icon-512.png (512x512)');

    console.log('');
    console.log('✅ Favicon generation complete!');
    console.log('');
    console.log('📝 Note: favicon.ico needs to be created manually:');
    console.log('   1. Go to: https://convertio.co/png-ico/');
    console.log('   2. Upload: app/favicon-temp.png');
    console.log('   3. Download and save as: app/favicon.ico');
    console.log('   4. Delete: app/favicon-temp.png');
    console.log('');
    console.log('   OR use: https://realfavicongenerator.net/ for complete favicon package');
    console.log('');
    console.log('📁 Files created in app/ directory:');
    console.log('   - icon.png (32x32) ✅');
    console.log('   - apple-icon.png (180x180) ✅');
    console.log('   - favicon-temp.png (32x32) - convert to .ico');
    console.log('');
    console.log('🔄 Restart your dev server to see the new favicon!');

  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

