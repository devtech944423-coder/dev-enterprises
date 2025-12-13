# VPS Deployment Quick Start Checklist

## Before You Start

- [ ] You have SSH access to your Hostinger VPS
- [ ] You have your VPS IP address and root password
- [ ] Your domain is pointing to your VPS IP (optional for testing)

---

## Step-by-Step Quick Deploy

### 1. Connect to VPS
```bash
ssh root@YOUR_VPS_IP
```

### 2. Install Required Software
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt install -y nginx

# Install Git
apt install -y git
```

### 3. Upload Your Code

**Option A: Using Git (Recommended)**
```bash
mkdir -p /var/www/dev-enterprises
cd /var/www/dev-enterprises
git clone YOUR_REPO_URL .
```

**Option B: Using SCP from Windows**
```powershell
# From your local machine
scp -r app components lib public *.json *.ts *.js *.mjs root@YOUR_VPS_IP:/var/www/dev-enterprises/
```

### 4. Build and Start
```bash
cd /var/www/dev-enterprises
npm install
npm run build

# Create .env.production
nano .env.production
# Add your environment variables

# Start with PM2
pm2 start npm --name "dev-enterprises" -- start
pm2 save
pm2 startup
```

### 5. Configure Nginx
```bash
nano /etc/nginx/sites-available/dev-enterprises
# Paste the Nginx config from VPS_DEPLOYMENT_GUIDE.md

ln -s /etc/nginx/sites-available/dev-enterprises /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

### 6. Setup SSL (Optional but Recommended)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Environment Variables Needed

Create `/var/www/dev-enterprises/.env.production`:

```env
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id
# Add Firebase variables if using Firebase
```

---

## Common Commands

| Task | Command |
|------|---------|
| View logs | `pm2 logs dev-enterprises` |
| Restart app | `pm2 restart dev-enterprises` |
| Stop app | `pm2 stop dev-enterprises` |
| Update app | `cd /var/www/dev-enterprises && git pull && npm install && npm run build && pm2 restart dev-enterprises` |
| Check status | `pm2 status` |
| Reload Nginx | `systemctl reload nginx` |

---

## Troubleshooting

**App not working?**
```bash
pm2 logs dev-enterprises
```

**Nginx not working?**
```bash
nginx -t
tail -f /var/log/nginx/error.log
```

**Port already in use?**
```bash
netstat -tulpn | grep 3000
```

---

**Full detailed guide: See `VPS_DEPLOYMENT_GUIDE.md`**

