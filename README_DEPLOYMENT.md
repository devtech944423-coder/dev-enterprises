# 📦 Deployment Documentation

Complete deployment guides for deploying your Next.js website to Hostinger.

## 📚 Documentation Files

### 1. **DEPLOYMENT_CHECKLIST.md** ⭐ Start Here
   - Complete pre-deployment checklist
   - All items to verify before deploying
   - Security, functionality, and testing checks

### 2. **HOSTINGER_DEPLOYMENT_GUIDE.md** 📖 Step-by-Step
   - Detailed step-by-step deployment instructions
   - Hostinger-specific setup
   - Troubleshooting guide

### 3. **ENVIRONMENT_VARIABLES_TEMPLATE.md** 🔐 Configuration
   - All required environment variables
   - Where to find Firebase credentials
   - Email configuration options

### 4. **DEPLOYMENT_QUICK_START.md** ⚡ Quick Reference
   - Essential steps summary
   - Quick commands
   - Critical reminders

---

## 🚀 Quick Start

1. **Read the Checklist**: Open `DEPLOYMENT_CHECKLIST.md`
2. **Prepare Variables**: Use `ENVIRONMENT_VARIABLES_TEMPLATE.md`
3. **Follow Guide**: Use `HOSTINGER_DEPLOYMENT_GUIDE.md`
4. **Quick Reference**: Use `DEPLOYMENT_QUICK_START.md` for commands

---

## 📋 Pre-Deployment Checklist (Summary)

### Must Do Before Deploying:

- [ ] Test build locally (`npm run build`)
- [ ] Prepare all environment variables
- [ ] Add domain to Firebase authorized domains
- [ ] Verify Firestore security rules
- [ ] Test all functionality locally
- [ ] Backup your codebase

### During Deployment:

- [ ] Create Node.js app in Hostinger
- [ ] Upload project files
- [ ] Set environment variables
- [ ] Install dependencies
- [ ] Build application
- [ ] Start server
- [ ] Configure domain & SSL

### After Deployment:

- [ ] Test all pages load
- [ ] Verify Firebase connection
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Monitor for errors

---

## 🔐 Environment Variables Required

### Firebase (Required):
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Email (Optional):
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- OR `NEXT_PUBLIC_FORMSPREE_ID`

See `ENVIRONMENT_VARIABLES_TEMPLATE.md` for details.

---

## 📝 Quick Commands

```bash
# Test build locally
npm install
npm run build
npm run start

# Check for issues
npm audit
npm run lint
```

---

## 🆘 Need Help?

1. **Full Checklist**: `DEPLOYMENT_CHECKLIST.md`
2. **Step-by-Step**: `HOSTINGER_DEPLOYMENT_GUIDE.md`
3. **Variables**: `ENVIRONMENT_VARIABLES_TEMPLATE.md`
4. **Quick Reference**: `DEPLOYMENT_QUICK_START.md`

---

## ✅ Ready to Deploy?

1. ✅ Read `DEPLOYMENT_CHECKLIST.md`
2. ✅ Prepare environment variables
3. ✅ Follow `HOSTINGER_DEPLOYMENT_GUIDE.md`
4. ✅ Test everything after deployment

**Good luck! 🚀**

