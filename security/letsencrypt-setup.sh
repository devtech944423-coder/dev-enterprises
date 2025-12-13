#!/bin/bash
# Let's Encrypt SSL Certificate Setup Script
# Purpose: Request and configure auto-renewal for SSL certificates
# Usage: sudo bash security/letsencrypt-setup.sh

DOMAIN="devtechenterprises.in"
EMAIL="your-email@example.com"  # Change this to your email

echo "🔒 Setting up Let's Encrypt SSL Certificate for $DOMAIN"

# Update system
sudo apt-get update

# Install certbot
echo "📦 Installing certbot..."
sudo apt-get install -y certbot python3-certbot-nginx  # For nginx
# sudo apt-get install -y certbot python3-certbot-apache  # For Apache (uncomment if using Apache)

# Stop web server temporarily (if needed)
# sudo systemctl stop nginx
# sudo systemctl stop apache2

# Request certificate
echo "🔐 Requesting SSL certificate..."
sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

# For nginx: Auto-configure
# sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

# For Apache: Auto-configure
# sudo certbot --apache -d $DOMAIN -d www.$DOMAIN --email $EMAIL --agree-tos --non-interactive

# Test auto-renewal
echo "🧪 Testing certificate renewal..."
sudo certbot renew --dry-run

# Setup auto-renewal cron job (if not already set)
echo "⏰ Setting up auto-renewal..."
(crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
# For Apache: echo "0 0 * * * certbot renew --quiet --post-hook 'systemctl reload apache2'" | crontab -

echo "✅ SSL certificate setup complete!"
echo "📝 Certificate location: /etc/letsencrypt/live/$DOMAIN/"
echo "🔄 Auto-renewal is configured"

