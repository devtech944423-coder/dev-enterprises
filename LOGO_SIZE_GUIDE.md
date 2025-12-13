# Logo Size Guide for Dev Tech Enterprises

## 📏 Recommended Logo Sizes

### For Navbar/Header (Primary Logo)
The navbar height is currently **64px (h-16)**, so your logo should fit comfortably within this space.

**Recommended Dimensions:**
- **Width**: 150px - 200px (ideal: 180px)
- **Height**: 40px - 56px (ideal: 48px) - leaves 8px padding top/bottom
- **Aspect Ratio**: 3:1 to 4:1 (landscape/wide format works best)
- **File Format**: PNG (with transparency) or SVG (best for scalability)

**Why these dimensions?**
- Navbar height: 64px
- Logo height: 48px = leaves 8px padding on top and bottom
- Logo width: 180px = proportional and readable

### For Mobile Devices
- **Width**: 120px - 150px (smaller for mobile screens)
- **Height**: 36px - 44px
- Use responsive sizing (logo shrinks on mobile)

### For Favicon (Browser Tab)
- **Size**: 32px × 32px (standard) or 64px × 64px (high DPI)
- **File Format**: ICO, PNG, or SVG
- **Location**: `/public/favicon.ico`

### For Footer (Optional Smaller Logo)
- **Width**: 100px - 120px
- **Height**: 30px - 36px

### For Social Media & Branding
- **Square Logo**: 512px × 512px (for social profiles)
- **Wide Logo**: 1200px × 400px (for Facebook cover, LinkedIn banner)
- **Email Signature**: 150px - 200px wide

## 🎨 Design Best Practices

1. **Format Recommendations:**
   - **SVG** (Scalable Vector Graphics) - BEST CHOICE
     - Scales perfectly at any size
     - Small file size
     - Crisp on all screens (retina, 4K, etc.)
   - **PNG** - Good alternative
     - Use PNG-24 with transparency
     - Higher quality than JPG for logos
   - **Avoid JPG** - Not ideal for logos (can have artifacts)

2. **File Size:**
   - SVG: Should be under 50KB
   - PNG: Should be under 100KB for web use
   - Optimize your images before uploading

3. **Colors:**
   - Provide logo in both light and dark versions if needed
   - Ensure good contrast on white/light backgrounds
   - Consider monochrome version for different contexts

## 📱 Responsive Logo Sizing

The navbar will automatically adjust logo size for different screen sizes:

- **Desktop** (1024px+): Full size (180px × 48px)
- **Tablet** (768px - 1023px): Medium size (150px × 40px)
- **Mobile** (< 768px): Smaller size (120px × 36px)

## 🔧 How to Add Your Logo

1. **Place your logo file:**
   - Recommended location: `/public/images/logo.svg` or `/public/images/logo.png`
   - Or simply: `/public/logo.svg` or `/public/logo.png`

2. **Update Navbar Component:**
   - The navbar is already set up to support logo images
   - Just replace the text with your logo image

3. **File Naming Convention:**
   - `logo.svg` - Main logo (SVG format)
   - `logo.png` - Fallback PNG version
   - `logo-dark.svg` - Dark version (if needed)
   - `logo-mobile.svg` - Mobile-optimized version (optional)

## 📐 Current Navbar Specifications

- **Navbar Height**: 64px (h-16 in Tailwind)
- **Logo Container**: Flexbox with spacing
- **Padding**: Standard horizontal padding (px-4, sm:px-6, lg:px-8)

## ✅ Quick Checklist

- [ ] Logo designed at recommended size (180px × 48px)
- [ ] Logo exported as SVG or PNG with transparency
- [ ] Logo optimized for web (file size < 100KB)
- [ ] Logo tested on white background
- [ ] Logo tested on mobile view
- [ ] Favicon created (32px × 32px)

## 🎯 Summary

**For your navbar, use:**
- **Optimal Size**: 180px × 48px
- **Format**: SVG (preferred) or PNG with transparency
- **Max Height**: 56px (to maintain navbar aesthetics)
- **Max Width**: 200px (to leave room for navigation)

Your logo will look professional and scale perfectly across all devices! 🚀


