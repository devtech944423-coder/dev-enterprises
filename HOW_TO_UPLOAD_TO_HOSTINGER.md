# 📤 How to Upload Your Website to Hostinger

Complete step-by-step guide for uploading your Next.js website to Hostinger.

---

## 🎯 Method 1: Using Hostinger File Manager (Easiest for First Time)

### Step 1: Access Hostinger Control Panel

1. Go to [Hostinger.com](https://www.hostinger.com) and log in
2. Click on **"hPanel"** or **"Control Panel"**
3. Find your domain and click **"Manage"**

### Step 2: Create Node.js Application

1. In the control panel, look for **"Node.js"** or **"Applications"** section
2. Click **"Create Node.js App"** or **"Add Application"**
3. Fill in the details:
   - **App Name**: `dev-enterprises` (or your preferred name)
   - **Node.js Version**: Select **18.x** or **20.x** (LTS version)
   - **Domain**: Select your domain name
   - **Port**: Usually auto-assigned by Hostinger
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Working Directory**: `/` (root directory)

4. Click **"Create"** or **"Save"**

### Step 3: Access File Manager

1. In Hostinger control panel, find **"File Manager"**
2. Navigate to your Node.js app directory (usually named after your app or in `domains/yourdomain.com/`)
3. **Important**: Make sure you're in the correct directory where your Node.js app is configured

### Step 4: Prepare Files for Upload

**Before uploading, create a ZIP file of your project:**

1. **On your computer**, select these files and folders:
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
   - ✅ `.htaccess` (if using)

2. **Do NOT include:**
   - ❌ `node_modules/` folder
   - ❌ `.next/` folder
   - ❌ `.env*` files
   - ❌ `.git/` folder (optional)
   - ❌ `*.tsbuildinfo` files

3. **Create a ZIP file** with all the selected files

### Step 5: Upload Files via File Manager

1. In Hostinger File Manager, navigate to your Node.js app directory
2. Click **"Upload"** button (usually at the top)
3. **Option A - Single ZIP Upload:**
   - Click **"Select Files"** or drag and drop your ZIP file
   - Wait for upload to complete
   - Right-click the ZIP file and select **"Extract"** or **"Unzip"**
   - Delete the ZIP file after extraction

4. **Option B - Individual Files:**
   - Click **"Upload"**
   - Select multiple files/folders
   - Wait for upload to complete

5. **Verify upload:**
   - Check that all folders (`app`, `components`, `lib`, `public`) are present
   - Verify `package.json` is in the root directory

### Step 6: Set Environment Variables

1. Go back to your **Node.js Application** settings in Hostinger
2. Find **"Environment Variables"** or **"App Settings"** section
3. Click **"Add Variable"** for each environment variable:

**Add these Firebase variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCWHhCAiLXes2hdhDlHRiZR_UX3oLu7MT0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-tech-enterprise.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-tech-enterprise
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dev-tech-enterprise.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=494367292674
NEXT_PUBLIC_FIREBASE_APP_ID=1:494367292674:web:4188fa9e9eca01b080161b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LDKNR9EG9F
```

**Add these if using email (optional):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

4. Click **"Save"** after adding all variables

### Step 7: Install Dependencies

**Option A - Via SSH (if you have SSH access):**
1. Connect to your server via SSH
2. Navigate to your app directory:
   ```bash
   cd /path/to/your/app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

**Option B - Via Hostinger Control Panel:**
1. In your Node.js app settings, look for **"Terminal"** or **"Command Runner"**
2. Run: `npm install`
3. Wait for installation to complete

### Step 8: Build the Application

**Via SSH:**
```bash
npm run build
```

**Via Control Panel:**
1. In Terminal/Command Runner, run: `npm run build`
2. Wait for build to complete (may take 2-5 minutes)
3. Check for any errors in the output

### Step 9: Start the Application

1. In your Node.js app settings, click **"Start"** or **"Restart"**
2. Or run via Terminal: `npm run start`
3. Check application status - it should show **"Running"**

### Step 10: Verify Deployment

1. Visit your domain: `https://yourdomain.com`
2. Check that:
   - ✅ Website loads correctly
   - ✅ All pages work (Home, Products, About, Contact)
   - ✅ Products load from Firebase
   - ✅ Images display correctly
   - ✅ HTTPS is working (green padlock)

---

## 🚀 Method 2: Using Git (If Available)

If Hostinger supports Git deployment:

### Step 1: Push to Git Repository

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Ready for production"
   ```

2. **Push to GitHub/GitLab/Bitbucket:**
   ```bash
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

### Step 2: Connect Git in Hostinger

1. In Hostinger Node.js app settings, find **"Git"** or **"Repository"** section
2. Click **"Connect Repository"**
3. Enter your repository URL
4. Select branch (usually `main` or `master`)
5. Enable **"Auto Deploy"** (optional - automatically deploys on push)
6. Click **"Save"**

### Step 3: Deploy

1. Hostinger will automatically:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build the app (`npm run build`)
   - Start the app (`npm run start`)

2. Check deployment status in the logs

---

## 🛠️ Method 3: Using FTP/SFTP Client

### Step 1: Get FTP Credentials

1. In Hostinger control panel, go to **"FTP Accounts"**
2. Create a new FTP account or use existing one
3. Note down:
   - **FTP Host**: Usually `ftp.yourdomain.com` or server IP
   - **FTP Username**: Your FTP username
   - **FTP Password**: Your FTP password
   - **Port**: Usually `21` for FTP or `22` for SFTP

### Step 2: Connect with FTP Client

**Recommended FTP Clients:**
- **FileZilla** (Free) - https://filezilla-project.org/
- **WinSCP** (Windows) - https://winscp.net/
- **Cyberduck** (Mac/Windows) - https://cyberduck.io/

### Step 3: Upload Files

1. Connect to your server using FTP credentials
2. Navigate to your Node.js app directory
3. Upload all project files (same files as Method 1, Step 4)
4. **Do NOT upload** `node_modules`, `.next`, or `.env` files

### Step 4: Continue with Steps 6-10 from Method 1

---

## 📋 Quick Upload Checklist

Before uploading, make sure you have:

- [ ] All source files ready
- [ ] `package.json` included
- [ ] `package-lock.json` included
- [ ] All configuration files ready
- [ ] Environment variables prepared
- [ ] Firebase credentials ready
- [ ] Email credentials ready (if using)

**Files to Upload:**
- [ ] `app/` folder
- [ ] `components/` folder
- [ ] `lib/` folder
- [ ] `public/` folder
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.ts`
- [ ] `tsconfig.json`
- [ ] `tailwind.config.js`
- [ ] `postcss.config.mjs`
- [ ] `eslint.config.mjs`

**Files to EXCLUDE:**
- [ ] `node_modules/` (install on server)
- [ ] `.next/` (generated during build)
- [ ] `.env*` files (configure in Hostinger)
- [ ] `.git/` (optional)

---

## ⚠️ Common Upload Issues & Solutions

### Issue: Upload Fails or Times Out

**Solution:**
- Upload files in smaller batches
- Use ZIP file and extract on server
- Check file size limits
- Use FTP/SFTP instead of web upload

### Issue: Files Not Appearing

**Solution:**
- Check you're in the correct directory
- Refresh File Manager
- Verify file permissions
- Check for hidden files

### Issue: Build Fails After Upload

**Solution:**
- Verify all files uploaded correctly
- Check Node.js version matches
- Verify environment variables are set
- Check build logs for specific errors

### Issue: Application Won't Start

**Solution:**
- Verify `package.json` is in root directory
- Check all dependencies installed
- Verify environment variables
- Check application logs

---

## 🎯 Recommended Upload Method

**For First-Time Deployment:**
👉 Use **Method 1 (File Manager)** - It's the easiest and most straightforward

**For Regular Updates:**
👉 Use **Method 2 (Git)** - If available, it's faster and allows auto-deployment

**For Large Files:**
👉 Use **Method 3 (FTP/SFTP)** - More reliable for large uploads

---

## 📞 Need Help?

- **Hostinger Support**: Contact via live chat or ticket
- **Hostinger Docs**: https://www.hostinger.com/tutorials
- **Check Logs**: Always check application logs for errors

---

## ✅ After Upload

Once files are uploaded:

1. ✅ Set environment variables
2. ✅ Run `npm install`
3. ✅ Run `npm run build`
4. ✅ Start application
5. ✅ Test website
6. ✅ Add domain to Firebase Authorized Domains

---

**Ready to upload?** Start with Method 1 for the easiest experience! 🚀

