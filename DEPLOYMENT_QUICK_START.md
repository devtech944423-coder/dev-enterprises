# 🚀 Quick Start Deployment Guide

## Pre-Deployment Checklist Summary

### ✅ Essential Steps (Must Do)

1. **Test Build Locally**
   ```bash
   npm run build
   npm run start
   ```
   - [ ] Build succeeds
   - [ ] All pages load

2. **Prepare Environment Variables**
   - [ ] Get all Firebase config from Firebase Console
   - [ ] Prepare email/SMTP settings (if using contact form)
   - [ ] See `ENVIRONMENT_VARIABLES_TEMPLATE.md`

3. **Firebase Setup**
   - [ ] Add your domain to Firebase Authorized Domains
   - [ ] Verify Firestore security rules allow public read
   - [ ] Test Firebase connection

4. **Hostinger Setup**
   - [ ] Create Node.js application
   - [ ] Upload files (except `node_modules`)
   - [ ] Set environment variables
   - [ ] Run `npm install`
   - [ ] Run `npm run build`
   - [ ] Start application

5. **Domain & SSL**
   - [ ] Configure DNS (A record or CNAME)
   - [ ] Wait for SSL certificate (auto-configured by Hostinger)

6. **Final Testing**
   - [ ] Website loads at your domain
   - [ ] HTTPS works
   - [ ] Products load from Firebase
   - [ ] All pages work
   - [ ] Contact form works (if configured)

---

## 📋 Detailed Documentation

- **Full Checklist**: See `DEPLOYMENT_CHECKLIST.md`
- **Hostinger Guide**: See `HOSTINGER_DEPLOYMENT_GUIDE.md`
- **Environment Variables**: See `ENVIRONMENT_VARIABLES_TEMPLATE.md`

---

## ⚡ Quick Commands

```bash
# 1. Test build locally
npm install
npm run build
npm run start

# 2. Check for issues
npm audit          # Security vulnerabilities
npm run lint       # Code quality

# 3. Prepare for upload
# Upload everything EXCEPT:
# - node_modules/
# - .env files
# - .next/ (will be generated)
```

---

## 🔥 Critical Reminders

1. **Environment Variables**: Set in Hostinger control panel, NOT in code
2. **Firebase Domain**: Add your domain to Firebase authorized domains
3. **Security Rules**: Ensure Firestore allows public read access
4. **Build First**: Always test build locally before deploying
5. **No Hardcoded Secrets**: Remove hardcoded API keys from code

---

## 🆘 Need Help?

- **Full Checklist**: `DEPLOYMENT_CHECKLIST.md`
- **Step-by-Step Guide**: `HOSTINGER_DEPLOYMENT_GUIDE.md`
- **Environment Variables**: `ENVIRONMENT_VARIABLES_TEMPLATE.md`

---

**Ready? Start with the full checklist!** 📋

