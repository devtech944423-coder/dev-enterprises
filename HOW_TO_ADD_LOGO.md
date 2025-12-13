# How to Add Your Logo to the Website

## ✅ Navbar is Ready!

The navbar has been updated to display your logo image. Now you just need to add your logo file.

## 📁 Step 1: Add Your Logo File

1. **Save your logo file** in one of these locations:
   - `/public/images/logo.png` (recommended)
   - `/public/images/logo.svg` (best for quality)
   - `/public/images/logo.jpg` (also works)

2. **Supported formats:**
   - **PNG** - Best for logos with transparency
   - **SVG** - Best for scalability (recommended if available)
   - **JPG** - Works but less ideal for logos

## 📐 Logo Size Requirements

Your logo should be:
- **Height**: 48px (will display at 40-48px depending on screen size)
- **Width**: 180px - 200px (or maintain your logo's aspect ratio)
- **Format**: PNG with transparency, SVG, or high-quality JPG

## 🎨 Current Navbar Configuration

The navbar is configured to:
- Display logo at **48px height** on desktop
- Scale down to **40px** on tablets
- Scale down to **36px** on mobile
- Maintain aspect ratio automatically
- Include hover effect (slight opacity change)

## 🔧 Step 2: Update File Path (if needed)

If your logo file has a different name or format, update the path in `components/Navbar.tsx`:

**Current configuration:**
```tsx
<Image
  src="/images/logo.png"
  alt="Dev Tech Enterprises"
  width={180}
  height={48}
  className="h-10 sm:h-11 md:h-12 w-auto object-contain"
  priority
/>
```

**If your file is SVG:**
Change `src="/images/logo.png"` to `src="/images/logo.svg"`

**If your file is JPG:**
Change `src="/images/logo.png"` to `src="/images/logo.jpg"`

**If your file is in a different location:**
Update the path accordingly (e.g., `/logo.png` if directly in public folder)

## 📱 Responsive Sizing

The logo will automatically resize:
- **Mobile (< 640px)**: Height 40px (h-10)
- **Tablet (640px - 768px)**: Height 44px (h-11)
- **Desktop (768px+)**: Height 48px (h-12)

Width adjusts automatically to maintain aspect ratio.

## ✨ Features

- ✅ Responsive sizing for all devices
- ✅ Maintains aspect ratio
- ✅ Hover effect (opacity change)
- ✅ Optimized loading (priority loading for faster display)
- ✅ Proper alt text for accessibility

## 🚀 After Adding Your Logo

1. Save your logo file in `/public/images/logo.png` (or your preferred format)
2. Refresh your browser
3. Your logo should now appear in the navbar!

## 💡 Tips

- **For best quality**: Use SVG format if available
- **For transparency**: Use PNG format
- **File size**: Keep under 100KB for fast loading
- **Aspect ratio**: Your logo's aspect ratio will be preserved

---

**That's it!** Once you add your logo file to `/public/images/logo.png`, it will automatically appear in the navigation bar.


