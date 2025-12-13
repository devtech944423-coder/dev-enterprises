# 🚀 Hostinger Deployment Checklist

Use this checklist to ensure a smooth deployment to Hostinger.

## ✅ Pre-Deployment Checklist

### 1. Code Preparation
- [x] Build completes successfully (`npm run build`)
- [x] No TypeScript errors
- [x] No ESLint errors
- [x] All pages load correctly in development
- [x] All images and assets are in place
- [x] Favicon and icons are configured
- [x] No console errors in browser

### 2. Environment Variables
- [ ] Firebase API Key prepared
- [ ] Firebase Auth Domain prepared
- [ ] Firebase Project ID prepared
- [ ] Firebase Storage Bucket prepared
- [ ] Firebase Messaging Sender ID prepared
- [ ] Firebase App ID prepared
- [ ] Firebase Measurement ID prepared
- [ ] SMTP credentials (if using email) OR Formspree ID prepared
- [ ] All environment variables documented in secure location

### 3. Firebase Configuration
- [ ] Production domain added to Firebase Authorized Domains
- [ ] Firestore security rules reviewed and tested
- [ ] Firebase Storage rules configured (if using)
- [ ] Firebase Analytics enabled (optional)

### 4. Domain & SSL
- [ ] Domain name registered and configured
- [ ] DNS records pointing to Hostinger
- [ ] SSL certificate will be auto-configured by Hostinger

### 5. Files Ready for Upload
- [ ] All source files ready (excluding node_modules, .next, .env files)
- [ ] package.json and package-lock.json ready
- [ ] All configuration files ready

## 📋 Deployment Steps

### Step 1: Hostinger Setup
- [ ] Logged into Hostinger control panel
- [ ] Created Node.js application
- [ ] Selected correct Node.js version (18.x or 20.x)
- [ ] Configured domain name
- [ ] Set build command: `npm run build`
- [ ] Set start command: `npm run start`

### Step 2: Upload Files
- [ ] Uploaded all project files via File Manager or Git
- [ ] Excluded node_modules folder
- [ ] Excluded .env files
- [ ] Excluded .next folder (will be generated)

### Step 3: Environment Variables
- [ ] Added all Firebase environment variables in Hostinger control panel
- [ ] Added email/SMTP variables (if using)
- [ ] Verified all variables are saved correctly
- [ ] No typos in variable names or values

### Step 4: Install & Build
- [ ] Ran `npm install` on server
- [ ] Ran `npm run build` successfully
- [ ] Verified .next folder was created
- [ ] No build errors or warnings

### Step 5: Start Application
- [ ] Started Node.js application
- [ ] Application status shows "Running"
- [ ] Checked application logs for errors

### Step 6: Domain Configuration
- [ ] Domain points to Hostinger
- [ ] SSL certificate activated (wait 10-30 minutes)
- [ ] HTTPS redirect configured
- [ ] DNS propagation completed (can take up to 48 hours)

### Step 7: Firebase Updates
- [ ] Added production domain to Firebase Authorized Domains
- [ ] Added www subdomain (if using)
- [ ] Updated Firestore rules if needed

## 🧪 Post-Deployment Testing

### Basic Functionality
- [ ] Website loads at production domain
- [ ] HTTPS is working (green padlock)
- [ ] All pages accessible (Home, Products, About, Contact)
- [ ] Navigation works correctly
- [ ] Mobile responsive design works

### Features Testing
- [ ] Products load from Firebase
  - [ ] Categories display correctly
- [ ] Product filtering works
- [ ] Product search works (if implemented)
- [ ] Images load correctly
- [ ] Carousel works on homepage
- [ ] Contact form submits successfully
- [ ] Email notifications work (if configured)

### Performance
- [ ] Page load speed is acceptable
- [ ] Images load quickly
- [ ] No console errors
- [ ] No 404 errors
- [ ] SEO meta tags working

### Security
- [ ] HTTPS enforced
- [ ] Security headers working
- [ ] No sensitive data exposed
- [ ] Contact form rate limiting works

## 📝 Post-Deployment Tasks

### Monitoring
- [ ] Set up error monitoring (optional)
- [ ] Set up analytics tracking
- [ ] Monitor application logs regularly

### Maintenance
- [ ] Document deployment process
- [ ] Create backup strategy
- [ ] Set up update process for future changes

## 🔧 Troubleshooting

If something doesn't work:

1. **Check Application Logs** in Hostinger control panel
2. **Verify Environment Variables** are correct
3. **Check Firebase Configuration** - domain authorized, rules correct
4. **Test Locally** - ensure it works in development
5. **Clear Browser Cache** - hard refresh (Ctrl+Shift+R)
6. **Check DNS Propagation** - use https://www.whatsmydns.net/
7. **Contact Hostinger Support** if server issues

## 📞 Support Resources

- **Hostinger Support**: Live chat or ticket system
- **Hostinger Docs**: https://www.hostinger.com/tutorials
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Firebase Support**: https://firebase.google.com/support

---

**Ready to deploy?** Follow the steps in `HOSTINGER_DEPLOYMENT_GUIDE.md` for detailed instructions.

**Good luck! 🚀**
