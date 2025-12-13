# Deploy Next.js App to Hostinger VPS

Complete guide for deploying your Next.js application on Hostinger VPS.

## Prerequisites

- Hostinger VPS with root/SSH access
- Domain name pointing to your VPS IP
- Basic knowledge of Linux commands

---

## Step 1: Connect to Your VPS

### Get SSH Access
1. Log in to Hostinger Control Panel
2. Go to **VPS** → **Your VPS** → **SSH Access**
3. Note your:
   - **IP Address**
   - **SSH Port** (usually 22)
   - **Root Password** or **SSH Key**

### Connect via SSH

**Windows (PowerShell/CMD):**
```bash
ssh root@YOUR_VPS_IP -p SSH_PORT
```

**Or use PuTTY/WinSCP for Windows**

---

## Step 2: Initial Server Setup

### Update System
```bash
apt update && apt upgrade -y
```

### Install Node.js (v20 LTS)
```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version
```

### Install Nginx
```bash
apt install -y nginx
systemctl start nginx
systemctl enable nginx
```

### Install PM2 (Process Manager)
```bash
npm install -g pm2
```

### Install Git
```bash
apt install -y git
```

### Install UFW (Firewall)
```bash
apt install -y ufw
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## Step 3: Deploy Your Application

### Option A: Deploy via Git (Recommended)

1. **Create App Directory**
```bash
mkdir -p /var/www/dev-enterprises
cd /var/www/dev-enterprises
```

2. **Clone Your Repository**
```bash
# If using GitHub/GitLab
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Or initialize and pull
git init
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git pull origin main
```

### Option B: Upload Files via SCP/SFTP

**From your local machine (Windows PowerShell):**
```powershell
# Navigate to your project directory
cd C:\Users\Nikhil\dev-enterprises

# Upload files (excluding node_modules, .next, etc.)
scp -r -P SSH_PORT app components lib public *.json *.ts *.js *.mjs root@YOUR_VPS_IP:/var/www/dev-enterprises/
```

**Then on VPS:**
```bash
mkdir -p /var/www/dev-enterprises
cd /var/www/dev-enterprises
```

---

## Step 4: Install Dependencies and Build

```bash
cd /var/www/dev-enterprises

# Install dependencies
npm install --production=false

# Build the application
npm run build
```

---

## Step 5: Configure Environment Variables

```bash
# Create .env.production file
nano /var/www/dev-enterprises/.env.production
```

**Add your environment variables:**
```env
# Formspree (for contact form)
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here

# Firebase (if using)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Node Environment
NODE_ENV=production
PORT=3000
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

---

## Step 6: Start Application with PM2

```bash
cd /var/www/dev-enterprises

# Start with PM2
pm2 start npm --name "dev-enterprises" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown (usually run a sudo command)
```

**PM2 Commands:**
```bash
pm2 list              # View running apps
pm2 logs dev-enterprises  # View logs
pm2 restart dev-enterprises  # Restart app
pm2 stop dev-enterprises     # Stop app
pm2 delete dev-enterprises   # Remove app
```

---

## Step 7: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/dev-enterprises
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase body size limit for file uploads
    client_max_body_size 10M;

    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static files
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

**Enable the site:**
```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/dev-enterprises /etc/nginx/sites-enabled/

# Remove default site (optional)
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## Step 8: Setup SSL with Let's Encrypt (HTTPS)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose whether to redirect HTTP to HTTPS (recommended: Yes)

# Test auto-renewal
certbot renew --dry-run
```

**Certbot will automatically update your Nginx config with SSL settings.**

---

## Step 9: Verify Deployment

1. **Check PM2 Status:**
```bash
pm2 status
pm2 logs dev-enterprises --lines 50
```

2. **Check Nginx Status:**
```bash
systemctl status nginx
```

3. **Test Application:**
- Visit `http://yourdomain.com` or `https://yourdomain.com`
- Check all pages load correctly
- Test contact form functionality

---

## Step 10: Setup Auto-Deployment (Optional)

### Create Deployment Script

```bash
nano /var/www/dev-enterprises/deploy.sh
```

**Add this script:**
```bash
#!/bin/bash
cd /var/www/dev-enterprises
git pull origin main
npm install --production=false
npm run build
pm2 restart dev-enterprises
echo "Deployment completed!"
```

**Make it executable:**
```bash
chmod +x /var/www/dev-enterprises/deploy.sh
```

**Run deployment:**
```bash
/var/www/dev-enterprises/deploy.sh
```

---

## Troubleshooting

### Application Not Starting

1. **Check PM2 logs:**
```bash
pm2 logs dev-enterprises
```

2. **Check if port 3000 is in use:**
```bash
netstat -tulpn | grep 3000
```

3. **Check Node.js version:**
```bash
node --version  # Should be 18.x or 20.x
```

### Nginx Errors

1. **Test Nginx config:**
```bash
nginx -t
```

2. **Check Nginx logs:**
```bash
tail -f /var/log/nginx/error.log
```

3. **Check if Nginx is running:**
```bash
systemctl status nginx
```

### Build Errors

1. **Clear Next.js cache:**
```bash
cd /var/www/dev-enterprises
rm -rf .next
npm run build
```

2. **Check Node.js and npm versions:**
```bash
node --version
npm --version
```

### Permission Issues

```bash
# Fix ownership
chown -R $USER:$USER /var/www/dev-enterprises
chmod -R 755 /var/www/dev-enterprises
```

---

## Maintenance Commands

### Update Application
```bash
cd /var/www/dev-enterprises
git pull origin main
npm install
npm run build
pm2 restart dev-enterprises
```

### View Logs
```bash
# PM2 logs
pm2 logs dev-enterprises

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Restart Services
```bash
# Restart app
pm2 restart dev-enterprises

# Restart Nginx
systemctl restart nginx
```

### Monitor Resources
```bash
# PM2 monitoring
pm2 monit

# System resources
htop
# or
top
```

---

## Security Best Practices

1. **Keep system updated:**
```bash
apt update && apt upgrade -y
```

2. **Use SSH keys instead of passwords:**
```bash
# On your local machine, generate key
ssh-keygen -t rsa -b 4096

# Copy to server
ssh-copy-id root@YOUR_VPS_IP
```

3. **Configure firewall properly:**
```bash
ufw status
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
```

4. **Regular backups:**
```bash
# Backup your app directory
tar -czf backup-$(date +%Y%m%d).tar.gz /var/www/dev-enterprises
```

---

## Quick Reference

| Task | Command |
|------|---------|
| View app logs | `pm2 logs dev-enterprises` |
| Restart app | `pm2 restart dev-enterprises` |
| Stop app | `pm2 stop dev-enterprises` |
| View PM2 status | `pm2 status` |
| Reload Nginx | `systemctl reload nginx` |
| Test Nginx config | `nginx -t` |
| View Nginx logs | `tail -f /var/log/nginx/error.log` |
| Update app | `cd /var/www/dev-enterprises && git pull && npm install && npm run build && pm2 restart dev-enterprises` |

---

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs dev-enterprises`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Verify environment variables are set correctly
4. Ensure all dependencies are installed
5. Check firewall rules: `ufw status`

---

**Your app should now be live at: https://yourdomain.com** 🚀

