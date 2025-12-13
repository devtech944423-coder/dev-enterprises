# Hostinger Deployment Guide for Next.js

## 📋 Step-by-Step Deployment to Hostinger

This guide walks you through deploying your Next.js application to Hostinger.

---

## Prerequisites

- [ ] Hostinger hosting account (with Node.js support)
- [ ] Domain name configured
- [ ] Access to Hostinger control panel
- [ ] Firebase project configured
- [ ] All environment variables prepared

---

## Step 1: Prepare Your Project

### 1.1 Test Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build
npm run start
```

**Verify:**
- ✅ Build completes without errors
- ✅ All pages load correctly
- ✅ No console errors

### 1.2 Prepare Environment Variables

Create a list of all environment variables you need (see `ENVIRONMENT_VARIABLES.md`).

---

## Step 2: Hostinger Control Panel Setup

### 2.1 Access Hostinger Control Panel

1. Log in to your Hostinger account
2. Go to **hPanel** or **Control Panel**
3. Find **Node.js** or **Applications** section

### 2.2 Create Node.js Application

1. Click **"Create Node.js App"** or **"Add Application"**
2. Configure the application:
   - **App Name**: `dev-enterprises` (or your preferred name)
   - **Node.js Version**: Select latest LTS version (e.g., 18.x or 20.x)
   - **Domain**: Select or enter your domain name
   - **Port**: Hostinger usually auto-assigns (check their docs)

### 2.3 Configure Build Settings

In the Node.js app settings, configure:

- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Working Directory**: `/` (or your project root)
- **Install Command**: `npm install`

---

## Step 3: Upload Files to Hostinger

### Option A: Using File Manager (Recommended for First Deployment)

1. **Access File Manager**:
   - Go to Hostinger File Manager
   - Navigate to your domain's root directory (usually `public_html` or your Node.js app directory)

2. **Upload Project Files**:
   - Upload all files EXCEPT:
     - ❌ `node_modules/` folder (install on server)
     - ❌ `.env` files (configure via control panel)
     - ❌ `.git/` folder (optional)
     - ❌ `.next/` folder (will be generated)

3. **Files to Upload**:
   - ✅ `app/` folder
   - ✅ `components/` folder
   - ✅ `lib/` folder
   - ✅ `public/` folder
   - ✅ `package.json`
   - ✅ `package-lock.json` or `yarn.lock`
   - ✅ `next.config.ts`
   - ✅ `tsconfig.json`
   - ✅ `tailwind.config.js`
   - ✅ `postcss.config.js`
   - ✅ All other config files

### Option B: Using Git (If Available)

If Hostinger supports Git deployment:

1. **Push to Git Repository**:
   ```bash
   git add .
   git commit -m "Ready for production"
   git push origin main
   ```

2. **Connect Git in Hostinger**:
   - Go to Node.js app settings
   - Find Git integration option
   - Connect your repository
   - Set up auto-deployment

---

## Step 4: Configure Environment Variables

### 4.1 In Hostinger Control Panel

1. Go to your Node.js application settings
2. Find **"Environment Variables"** or **"App Settings"** section
3. Add each environment variable:

**Firebase Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Email Variables (Optional):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

**Formspree (Alternative):**
```
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-id
```

### 4.2 Save Environment Variables

- Click **"Save"** or **"Apply"**
- Restart your application after adding variables

---

## Step 5: Install Dependencies and Build

### 5.1 Install Dependencies

In Hostinger, you can usually:

1. **Via SSH** (if you have SSH access):
   ```bash
   cd /path/to/your/app
   npm install --production
   ```

2. **Via Control Panel**:
   - Use the "Install Dependencies" button or command runner
   - Run: `npm install`

### 5.2 Build Application

1. **Via SSH**:
   ```bash
   npm run build
   ```

2. **Via Control Panel**:
   - Run: `npm run build`
   - Or use the "Build" button if available

### 5.3 Verify Build

- Check for build errors
- Verify `.next` folder was created
- Check build logs for warnings

---

## Step 6: Start Application

### 6.1 Start Production Server

1. **Via Control Panel**:
   - Use "Start" or "Restart" button
   - Or run: `npm run start`

2. **Verify Server is Running**:
   - Check application status in control panel
   - Look for "Running" status
   - Check logs for any errors

---

## Step 7: Configure Domain and SSL

### 7.1 Domain Configuration

1. **Point Domain to Hostinger**:
   - If using Hostinger nameservers: Already configured
   - If using external DNS: Point A record or CNAME to Hostinger IP

2. **Verify Domain**:
   - Wait for DNS propagation (can take up to 48 hours)
   - Check DNS using: https://www.whatsmydns.net/

### 7.2 SSL Certificate

1. **Auto SSL**:
   - Hostinger usually provides free SSL certificate
   - Auto-configured via Let's Encrypt
   - Wait 10-30 minutes for activation

2. **Manual SSL** (if needed):
   - Go to SSL section in control panel
   - Install SSL certificate
   - Force HTTPS redirect

---

## Step 8: Firebase Configuration Updates

### 8.1 Add Domain to Firebase

1. **Firebase Console** → Your Project
2. **Authentication** → **Settings** → **Authorized domains**
3. **Add Domain**: `yourdomain.com`
4. **Add Domain**: `www.yourdomain.com` (if using www)

### 8.2 Update Firebase Storage Rules (If Using)

If you're using Firebase Storage for images:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## Step 9: Testing After Deployment

### 9.1 Basic Checks

- [ ] Website loads at your domain
- [ ] HTTPS is working (green padlock)
- [ ] All pages load correctly
- [ ] Navigation works

### 9.2 Functionality Checks

- [ ] Products load from Firebase
- [ ] Categories display correctly
- [ ] Product filtering works
- [ ] Contact form works (if configured)
- [ ] Images load correctly
- [ ] Real-time updates work (if enabled)

### 9.3 Performance Checks

- [ ] Page load speed is acceptable
- [ ] Images load quickly
- [ ] No console errors
- [ ] Mobile responsive works

---

## Step 10: Post-Deployment Maintenance

### 10.1 Monitor Logs

- Check application logs regularly
- Monitor for errors
- Watch for performance issues

### 10.2 Update Process

For future updates:

1. Upload new files
2. Run `npm install` (if new dependencies)
3. Run `npm run build`
4. Restart application

### 10.3 Backup

- Regular backups of:
  - Database (Firebase)
  - Application files
  - Environment variables

---

## Troubleshooting

### Build Fails

**Problem**: `npm run build` fails

**Solutions**:
- Check Node.js version matches requirements
- Verify all environment variables are set
- Check for TypeScript errors
- Review build logs for specific errors

### Application Won't Start

**Problem**: Application shows error or won't start

**Solutions**:
- Check application logs
- Verify environment variables are correct
- Ensure port is configured correctly
- Check Node.js version compatibility

### Firebase Connection Issues

**Problem**: Products/categories not loading

**Solutions**:
- Verify Firebase environment variables
- Check Firestore security rules
- Verify domain is in Firebase authorized domains
- Check browser console for errors

### SSL Certificate Issues

**Problem**: HTTPS not working

**Solutions**:
- Wait for SSL certificate activation (can take 30 min)
- Force HTTPS redirect in control panel
- Clear browser cache
- Check DNS propagation

### Contact Form Not Working

**Problem**: Contact form submissions fail

**Solutions**:
- Verify SMTP credentials or Formspree ID
- Check API route is accessible
- Review server logs
- Test email configuration

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm run start

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

---

## Support Resources

- **Hostinger Documentation**: https://www.hostinger.com/tutorials
- **Hostinger Support**: Contact via live chat or ticket
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Firebase Documentation**: https://firebase.google.com/docs

---

## Important Notes

1. **Node.js Version**: Ensure Hostinger supports your required Node.js version
2. **Port Configuration**: Hostinger usually auto-configures ports - check their documentation
3. **File Upload**: Don't upload `node_modules` - install on server
4. **Environment Variables**: Never commit `.env` files to Git
5. **Build Time**: First build may take several minutes
6. **DNS Propagation**: Can take up to 48 hours for DNS changes

---

**Good luck with your deployment! 🚀**

If you encounter issues, check the troubleshooting section or contact Hostinger support.

