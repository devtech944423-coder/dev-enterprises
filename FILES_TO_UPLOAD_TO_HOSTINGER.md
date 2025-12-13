# 📤 Files to Upload to Hostinger

Complete list of files and folders you need to upload for deployment.

---

## ✅ **FILES TO UPLOAD** (Required)

### 📁 **Core Application Folders**
```
✅ app/                    (All pages and routes)
✅ components/              (React components)
✅ lib/                    (Firebase and utility functions)
✅ public/                 (Images, static assets)
```

### 📄 **Configuration Files** (Required)
```
✅ package.json            (Dependencies list)
✅ package-lock.json       (Lock file for exact versions)
✅ next.config.ts          (Next.js configuration)
✅ tsconfig.json           (TypeScript configuration)
✅ tailwind.config.js      (Tailwind CSS configuration)
✅ postcss.config.mjs      (PostCSS configuration)
✅ eslint.config.mjs       (ESLint configuration)
✅ middleware.ts           (Rate limiting & security)
```

### 🔒 **Security Files** (Optional but recommended)
```
✅ firestore.rules         (Firebase security rules - deploy separately to Firebase)
```

---

## ❌ **FILES TO EXCLUDE** (Do NOT Upload)

### 🚫 **Never Upload These:**
```
❌ node_modules/          (Will be installed on server with npm install)
❌ .next/                 (Will be generated during npm run build)
❌ .env*                  (All .env files - configure in Hostinger instead)
❌ .git/                  (Git repository - optional)
❌ *.tsbuildinfo         (TypeScript build cache)
❌ tsconfig.tsbuildinfo   (TypeScript build info)
```

### 📝 **Documentation Files** (Optional - Not needed for deployment)
```
❌ *.md                   (All markdown documentation files)
❌ scripts/               (Build scripts - optional, not needed)
❌ security/              (Security templates - optional)
```

---

## 📦 **Quick Upload Checklist**

### **Method 1: Create ZIP File (Recommended)**

1. **Select these folders:**
   - ✅ `app/`
   - ✅ `components/`
   - ✅ `lib/`
   - ✅ `public/`

2. **Select these files:**
   - ✅ `package.json`
   - ✅ `package-lock.json`
   - ✅ `next.config.ts`
   - ✅ `tsconfig.json`
   - ✅ `tailwind.config.js`
   - ✅ `postcss.config.mjs`
   - ✅ `eslint.config.mjs`
   - ✅ `middleware.ts`

3. **Create ZIP file** with all selected items

4. **Upload ZIP to Hostinger** and extract it

---

## 🎯 **Step-by-Step Upload Process**

### **Step 1: Prepare Files Locally**

**Option A - Manual Selection:**
1. Create a new folder called `upload-to-hostinger`
2. Copy these folders:
   - `app/`
   - `components/`
   - `lib/`
   - `public/`
3. Copy these files:
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `tsconfig.json`
   - `tailwind.config.js`
   - `postcss.config.mjs`
   - `eslint.config.mjs`
   - `middleware.ts`
4. Create a ZIP file of the `upload-to-hostinger` folder

**Option B - Use PowerShell (Windows):**
```powershell
# Create upload folder
New-Item -ItemType Directory -Path "upload-to-hostinger" -Force

# Copy required folders
Copy-Item -Path "app" -Destination "upload-to-hostinger\app" -Recurse
Copy-Item -Path "components" -Destination "upload-to-hostinger\components" -Recurse
Copy-Item -Path "lib" -Destination "upload-to-hostinger\lib" -Recurse
Copy-Item -Path "public" -Destination "upload-to-hostinger\public" -Recurse

# Copy required files
Copy-Item -Path "package.json" -Destination "upload-to-hostinger\"
Copy-Item -Path "package-lock.json" -Destination "upload-to-hostinger\"
Copy-Item -Path "next.config.ts" -Destination "upload-to-hostinger\"
Copy-Item -Path "tsconfig.json" -Destination "upload-to-hostinger\"
Copy-Item -Path "tailwind.config.js" -Destination "upload-to-hostinger\"
Copy-Item -Path "postcss.config.mjs" -Destination "upload-to-hostinger\"
Copy-Item -Path "eslint.config.mjs" -Destination "upload-to-hostinger\"
Copy-Item -Path "middleware.ts" -Destination "upload-to-hostinger\"

# Create ZIP file
Compress-Archive -Path "upload-to-hostinger\*" -DestinationPath "hostinger-upload.zip" -Force
```

### **Step 2: Upload to Hostinger**

1. **Log in to Hostinger Control Panel**
2. **Go to File Manager**
3. **Navigate to your Node.js app directory**
4. **Upload the ZIP file**
5. **Extract the ZIP file** (right-click → Extract)
6. **Delete the ZIP file** after extraction

### **Step 3: Verify Upload**

Check that these exist in your Hostinger directory:
- ✅ `app/` folder
- ✅ `components/` folder
- ✅ `lib/` folder
- ✅ `public/` folder
- ✅ `package.json` file
- ✅ `package-lock.json` file
- ✅ `next.config.ts` file

---

## 🔧 **After Upload - Next Steps**

### **1. Set Environment Variables in Hostinger**

Go to Node.js App Settings → Environment Variables and add:

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

### **2. Install Dependencies**

Via SSH or Terminal in Hostinger:
```bash
npm install
```

### **3. Build the Application**

```bash
npm run build
```

### **4. Start the Application**

In Hostinger Node.js App settings, click **"Start"** or run:
```bash
npm start
```

---

## 📊 **File Size Estimates**

- **app/**: ~50-100 KB (source code)
- **components/**: ~30-50 KB
- **lib/**: ~20-30 KB
- **public/**: ~5-10 MB (images)
- **Config files**: ~10-20 KB
- **Total**: ~5-10 MB (excluding images)

**Note:** `node_modules` will be installed on server (~200-300 MB), so don't upload it!

---

## ✅ **Final Checklist**

Before uploading, verify:

- [ ] All required folders are included
- [ ] All required config files are included
- [ ] `node_modules` is NOT included
- [ ] `.next` folder is NOT included
- [ ] `.env` files are NOT included
- [ ] ZIP file created successfully
- [ ] Environment variables prepared
- [ ] Firebase credentials ready

---

## 🚨 **Common Mistakes to Avoid**

1. ❌ **Don't upload `node_modules`** - It's huge and will be installed on server
2. ❌ **Don't upload `.next` folder** - It will be generated during build
3. ❌ **Don't upload `.env` files** - Set environment variables in Hostinger instead
4. ❌ **Don't forget `package-lock.json`** - Needed for exact dependency versions
5. ❌ **Don't upload documentation files** - They're not needed for deployment

---

## 📞 **Need Help?**

- Check `HOW_TO_UPLOAD_TO_HOSTINGER.md` for detailed steps
- See `HOSTINGER_QUICK_START.md` for quick reference
- Contact Hostinger support for server issues

---

**Ready to upload?** Follow the steps above and you'll be live in no time! 🚀


