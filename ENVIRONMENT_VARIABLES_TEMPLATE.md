# Environment Variables Template

## 📝 Copy and Fill This Template

Use this template to prepare all environment variables before deployment.

---

## 🔥 Firebase Configuration

**Location**: Hostinger Control Panel → Environment Variables

```env
# Firebase API Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCWHhCAiLXes2hdhDlHRiZR_UX3oLu7MT0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dev-tech-enterprise.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dev-tech-enterprise
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dev-tech-enterprise.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=494367292674
NEXT_PUBLIC_FIREBASE_APP_ID=1:494367292674:web:4188fa9e9eca01b080161b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-LDKNR9EG9F
```

**Where to Find:**
1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project
3. Go to Project Settings (gear icon) → General tab
4. Scroll to "Your apps" section
5. Copy values from your web app config

---

## 📧 Email Configuration (Optional - Choose One Method)

### Option 1: SMTP (Using Gmail or Other Email Service)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=contact@yourdomain.com
```

**Gmail Setup:**
1. Enable 2-Factor Authentication on your Google account
2. Go to: https://myaccount.google.com/apppasswords
3. Generate an "App Password" for "Mail"
4. Use this app password (not your regular password) in `SMTP_PASS`

### Option 2: Formspree (Alternative - No SMTP Needed)

```env
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-form-id
```

**Formspree Setup:**
1. Go to: https://formspree.io/
2. Create a free account
3. Create a new form
4. Copy the form ID (looks like: `xvgwqkzp`)
5. Use it in `NEXT_PUBLIC_FORMSPREE_ID`

---

## 🌐 Domain Configuration

**Note**: These are automatically configured by Hostinger, but good to note:

```env
# Usually not needed - Hostinger handles this
# NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## 📋 Complete Environment Variables List

### Required Variables:

1. ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
2. ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. ✅ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. ✅ `NEXT_PUBLIC_FIREBASE_APP_ID`
7. ✅ `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Optional Variables:

8. ⚙️ `SMTP_HOST` (if using email)
9. ⚙️ `SMTP_PORT` (if using email)
10. ⚙️ `SMTP_USER` (if using email)
11. ⚙️ `SMTP_PASS` (if using email)
12. ⚙️ `SMTP_FROM` (if using email)
13. ⚙️ `CONTACT_EMAIL` (if using email)
14. ⚙️ `NEXT_PUBLIC_FORMSPREE_ID` (if using Formspree)

---

## 🔐 Security Notes

- ⚠️ **Never commit** these values to Git
- ⚠️ **Keep backups** of your environment variables in a secure location
- ⚠️ **Use different values** for development and production (if applicable)
- ⚠️ **Rotate secrets** periodically for security

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] All Firebase variables copied from Firebase Console
- [ ] Email configuration ready (SMTP or Formspree)
- [ ] All variables written down securely
- [ ] Ready to paste into Hostinger control panel

---

## 📝 Quick Copy Template

Copy this and fill in your values:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
CONTACT_EMAIL=
```

---

**Ready to deploy!** 🚀

