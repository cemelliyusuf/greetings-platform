#!/bin/bash
set -e

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 + Nginx
sudo npm install -g pm2
sudo apt-get install -y nginx postgresql postgresql-contrib

# PostgreSQL: create DB + user
sudo -u postgres psql <<SQL
CREATE USER greetings WITH PASSWORD 'VERANDER_DIT_WACHTWOORD';
CREATE DATABASE greetings OWNER greetings;
GRANT ALL PRIVILEGES ON DATABASE greetings TO greetings;
SQL

# Run schema
sudo -u postgres psql -d greetings -f /var/www/greetings-platform/supabase/schema.sql

# App setup
cd /var/www/greetings-platform
cp .env.example .env.local
echo "DATABASE_URL=postgresql://greetings:VERANDER_DIT_WACHTWOORD@localhost:5432/greetings" > .env.local

npm ci
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/greetings-platform
sudo ln -sf /etc/nginx/sites-available/greetings-platform /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# SSL (vervang JOUW_DOMEIN.nl)
sudo apt-get install -y certbot python3-certbot-nginx
# sudo certbot --nginx -d JOUW_DOMEIN.nl

echo "Done. Verander JOUW_DOMEIN.nl in deploy/nginx.conf en draai daarna:"
echo "  sudo certbot --nginx -d JOUW_DOMEIN.nl"
