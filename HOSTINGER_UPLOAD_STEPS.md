# 📤 Hostinger Upload Steps - What to Do Now

You're in the Hostinger File Manager. Follow these steps:

---

## ⚠️ **IMPORTANT: Node.js App Location**

**For Next.js apps, you typically need to upload to your Node.js app directory, NOT `public_html`.**

However, if you're using `public_html`, that's fine too. Let's proceed:

---

## 📋 **Step-by-Step Instructions**

### **Step 1: Upload the ZIP File**

1. **Click the "Upload" button** (the up arrow icon in the top right)
2. **Select `hostinger-upload.zip`** from your computer
   - Location: `C:\Users\Nikhil\dev-enterprises\hostinger-upload.zip`
3. **Wait for upload to complete**

### **Step 2: Extract the ZIP File**

1. **Right-click on `hostinger-upload.zip`** in the file list
2. **Select "Extract"** or "Unzip"
3. **Wait for extraction to complete**
4. **Delete the ZIP file** after extraction (to save space)

### **Step 3: Verify Files Are Extracted**

You should now see these folders and files in your directory:
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `lib/` folder
- ✅ `public/` folder
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.ts`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.js`
- ✅ `postcss.config.mjs`
- ✅ `eslint.config.mjs`
- ✅ `middleware.ts`

### **Step 4: Set Environment Variables**

1. **Go to Hostinger Control Panel** (not File Manager)
2. **Find "Node.js" or "Applications" section**
3. **Click on your app** (or create one if you haven't)
4. **Go to "Environment Variables" or "App Settings"**
5. **Add these variables:**

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

6. **Click "Save"**

### **Step 5: Install Dependencies**

**Option A - Via Terminal/SSH:**
1. In Hostinger Control Panel, find **"Terminal"** or **"SSH"** or **"Command Runner"**
2. Navigate to your app directory:
   ```bash
   cd public_html
   # OR if using Node.js app directory:
   # cd /path/to/your/nodejs/app
   ```
3. Run:
   ```bash
   npm install
   ```

**Option B - Via Node.js App Settings:**
1. In Node.js App settings, look for **"Install Dependencies"** button
2. Click it (this runs `npm install` automatically)

### **Step 6: Build the Application**

**Via Terminal/SSH:**
```bash
npm run build
```

**Via Node.js App Settings:**
- Some hosts have a "Build" button, or you can set it in the app configuration

### **Step 7: Start the Application**

1. **In Node.js App Settings**, click **"Start"** or **"Restart"**
2. **Or via Terminal:**
   ```bash
   npm start
   ```

### **Step 8: Configure Node.js App (If Not Done)**

If you haven't created a Node.js app yet:

1. **In Hostinger Control Panel**, go to **"Node.js"** or **"Applications"**
2. **Click "Create Node.js App"**
3. **Fill in:**
   - **App Name:** `dev-enterprises`
   - **Node.js Version:** `18.x` or `20.x` (LTS)
   - **Domain:** Your domain name
   - **Working Directory:** `/public_html` (or wherever you uploaded files)
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
4. **Click "Create"**

---

## ⚠️ **Important Notes**

### **If Using `public_html`:**
- Make sure your Node.js app is configured to use `public_html` as the working directory
- The app will run from there

### **If Using Node.js App Directory:**
- Upload files to the Node.js app directory (not `public_html`)
- Usually located at: `/home/username/nodejs/apps/your-app-name/`

---

## ✅ **After Setup - Verify**

1. **Visit your website:** `https://yourdomain.com`
2. **Check:**
   - ✅ Website loads
   - ✅ All pages work
   - ✅ Products load from Firebase
   - ✅ Contact form works
   - ✅ HTTPS is enabled (green padlock)

---

## 🆘 **Common Issues**

### **"npm: command not found"**
- Make sure Node.js is installed in Hostinger
- Check Node.js version in app settings

### **"Build fails"**
- Check environment variables are set
- Verify all files uploaded correctly
- Check build logs for errors

### **"App won't start"**
- Verify `package.json` is in root directory
- Check environment variables
- Review application logs

---

## 📞 **Need Help?**

- Check Hostinger documentation
- Contact Hostinger support
- Review application logs in control panel

---

**Current Status:** Files ready to upload → Upload ZIP → Extract → Set env vars → Install → Build → Start


