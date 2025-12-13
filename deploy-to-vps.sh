#!/bin/bash

# Deployment script for Next.js app on Hostinger VPS
# Run this script on your VPS server after uploading your code

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Please run as root or with sudo${NC}"
    exit 1
fi

# App directory
APP_DIR="/var/www/dev-enterprises"
APP_NAME="dev-enterprises"

echo -e "${YELLOW}Step 1: Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js not found. Installing Node.js 20.x...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt install -y nodejs
else
    echo -e "${GREEN}Node.js found: $(node --version)${NC}"
fi

echo -e "${YELLOW}Step 2: Checking PM2 installation...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}PM2 not found. Installing PM2...${NC}"
    npm install -g pm2
else
    echo -e "${GREEN}PM2 found${NC}"
fi

echo -e "${YELLOW}Step 3: Navigating to app directory...${NC}"
if [ ! -d "$APP_DIR" ]; then
    echo -e "${RED}App directory not found. Creating $APP_DIR...${NC}"
    mkdir -p $APP_DIR
fi

cd $APP_DIR

echo -e "${YELLOW}Step 4: Installing dependencies...${NC}"
npm install --production=false

echo -e "${YELLOW}Step 5: Building application...${NC}"
npm run build

echo -e "${YELLOW}Step 6: Checking environment variables...${NC}"
if [ ! -f ".env.production" ]; then
    echo -e "${RED}Warning: .env.production not found!${NC}"
    echo -e "${YELLOW}Creating .env.production template...${NC}"
    cat > .env.production << EOF
# Add your environment variables here
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id_here
EOF
    echo -e "${YELLOW}Please edit .env.production with your actual values${NC}"
fi

echo -e "${YELLOW}Step 7: Starting/Restarting application with PM2...${NC}"
if pm2 list | grep -q "$APP_NAME"; then
    echo -e "${GREEN}Restarting existing PM2 process...${NC}"
    pm2 restart $APP_NAME
else
    echo -e "${GREEN}Starting new PM2 process...${NC}"
    pm2 start npm --name "$APP_NAME" -- start
    pm2 save
fi

echo -e "${YELLOW}Step 8: Checking Nginx configuration...${NC}"
if [ ! -f "/etc/nginx/sites-available/$APP_NAME" ]; then
    echo -e "${YELLOW}Nginx config not found. Creating template...${NC}"
    cat > /etc/nginx/sites-available/$APP_NAME << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    client_max_body_size 10M;

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
    }
}
EOF
    echo -e "${YELLOW}Please update /etc/nginx/sites-available/$APP_NAME with your domain${NC}"
    echo -e "${YELLOW}Then run: ln -s /etc/nginx/sites-available/$APP_NAME /etc/nginx/sites-enabled/${NC}"
else
    echo -e "${GREEN}Nginx config found${NC}"
    nginx -t && systemctl reload nginx
fi

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Check PM2 status: pm2 status"
echo "2. View logs: pm2 logs $APP_NAME"
echo "3. Update Nginx config with your domain"
echo "4. Setup SSL: certbot --nginx -d yourdomain.com"
echo ""
echo -e "${GREEN}Your app should be running on http://localhost:3000${NC}"

