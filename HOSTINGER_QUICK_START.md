# 🚀 Hostinger Quick Start Guide

Quick reference for deploying to Hostinger. For detailed instructions, see `HOSTINGER_DEPLOYMENT_GUIDE.md`.

## ⚡ Quick Deployment Steps

### 1. Prepare Locally
```bash
# Test build
npm run build

# If successful, you're ready!
```

### 2. Hostinger Control Panel

1. **Create Node.js App**
   - App Name: `dev-enterprises`
   - Node.js Version: `18.x` or `20.x`
   - Build Command: `npm run build`
   - Start Command: `npm run start`

2. **Upload Files**
   - Upload all files EXCEPT: `node_modules`, `.next`, `.env*`, `.git`
   - Or use Git if available

3. **Set Environment Variables**
   - Copy from `ENVIRONMENT_VARIABLES_TEMPLATE.md`
   - Add in Hostinger → Environment Variables section

### 3. Build & Start

```bash
# On Hostinger (via SSH or Control Panel)
npm install
npm run build
npm run start
```

### 4. Configure Domain
- Point domain to Hostinger
- Wait for SSL (10-30 minutes)
- Add domain to Firebase Authorized Domains

## 📋 Required Environment Variables

**Firebase (Required):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

**Email (Optional):**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
CONTACT_EMAIL=...
```

## ✅ Quick Test Checklist

- [ ] Website loads
- [ ] HTTPS works
- [ ] Products load from Firebase
- [ ] Contact form works
- [ ] All pages accessible

## 🆘 Common Issues

**Build fails?**
- Check Node.js version
- Verify environment variables
- Check build logs

**App won't start?**
- Check application logs
- Verify port configuration
- Ensure all env vars are set

**Products not loading?**
- Verify Firebase env vars
- Check Firebase authorized domains
- Review Firestore security rules

## 📞 Need Help?

- See `HOSTINGER_DEPLOYMENT_GUIDE.md` for detailed steps
- Check `DEPLOYMENT_CHECKLIST.md` for complete checklist
- Contact Hostinger support for server issues

---

**Ready? Let's deploy! 🚀**

