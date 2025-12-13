# Next.js Build Output Location

## 📁 Build Folder Location

After running `npm run build`, your build output is located in:

```
.next/
```

**Full Path:** `C:\Users\Nikhil\dev-enterprises\.next`

---

## 🔍 Why Can't I See It?

The `.next` folder might be **hidden** in Windows Explorer because it starts with a dot (`.`).

### How to View Hidden Files in Windows:

1. **Windows Explorer:**
   - Open File Explorer
   - Go to the `View` tab
   - Check the box "Hidden items"
   - The `.next` folder should now be visible

2. **Command Line:**
   ```powershell
   # View folder contents
   dir .next
   
   # Or with hidden files
   dir .next -Force
   ```

3. **VS Code / Cursor:**
   - The folder should be visible in the file explorer
   - If not, check your `.gitignore` settings

---

## 📦 What's Inside `.next`?

The `.next` folder contains:

- **`server/`** - Server-side rendered pages
- **`static/`** - Static assets (CSS, JS, images)
- **`cache/`** - Build cache
- **`BUILD_ID`** - Build identifier
- **Other build artifacts**

---

## 🚀 Running the Production Build

After building, you can run the production server:

```bash
npm start
```

This will start the Next.js production server on `http://localhost:3000`

---

## 📤 For Deployment

### Option 1: Deploy `.next` folder (Node.js hosting)
- Deploy the entire project including `.next` folder
- Run `npm start` on the server

### Option 2: Static Export (if configured)
If you have `output: 'export'` in `next.config.ts`, the build will be in:
```
out/
```

**Note:** Your current config doesn't have static export enabled, so use `.next` folder.

---

## ✅ Quick Check

To verify your build exists:

```powershell
# Check if .next exists
Test-Path .next

# List build contents
Get-ChildItem .next -Force
```

---

## 📝 Important Notes

1. **Don't commit `.next` folder** - It's in `.gitignore`
2. **Regenerate on server** - Run `npm run build` on your hosting server
3. **Environment variables** - Make sure to set them on your hosting platform

---

**Build Location:** `.next/` folder in your project root


