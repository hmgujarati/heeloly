# 🚀 Deployment Guide - Hostinger + Railway + MongoDB Atlas

## Overview
This guide will help you deploy your Gothic author website across three platforms:
- **Frontend (React)** → Hostinger Shared Hosting
- **Backend (FastAPI)** → Railway.app (FREE)
- **Database (MongoDB)** → MongoDB Atlas (FREE)

**Total Monthly Cost:** $0 (using free tiers) + Your existing Hostinger plan

---

## 📋 Prerequisites

Before starting, you'll need:
- ✅ Your Hostinger shared hosting account
- ✅ Access to Hostinger cPanel/File Manager
- ✅ Email account for Railway signup
- ✅ Email account for MongoDB Atlas signup

---

## Part 1: Setup MongoDB Atlas (Database) - 10 minutes

### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email
3. Choose **FREE** tier (M0 Sandbox)
4. Select a cloud provider (AWS recommended)
5. Choose region closest to your users (e.g., US East, Europe, Asia)
6. Click "Create Cluster" (takes 3-5 minutes)

### Step 2: Create Database User
1. In Atlas Dashboard, click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `heeloly_user` (or your choice)
5. Click **"Autogenerate Secure Password"** - **SAVE THIS PASSWORD!**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 3: Whitelist IP Addresses
1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Railway to connect)
4. Click **"Confirm"**

### Step 4: Get Connection String
1. Click **"Database"** (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string - looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` with your username
6. Replace `<password>` with the password you saved
7. **SAVE THIS - You'll need it for Railway!**

Example:
```
mongodb+srv://heeloly_user:YourPassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

---

## Part 2: Deploy Backend to Railway - 15 minutes

### Step 1: Create Railway Account
1. Go to: https://railway.app/
2. Click **"Login"** → **"Login with GitHub"** (or email)
3. Verify your email

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. **WAIT!** First, you need to push your code to GitHub

### Step 2.5: Push Backend to GitHub
**You'll need to do this from your local machine:**

```bash
# Navigate to backend folder
cd /app/backend

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial backend deployment"

# Create a new GitHub repository:
# 1. Go to github.com
# 2. Click "+" → "New repository"
# 3. Name it: "author-website-backend"
# 4. Make it Private
# 5. Don't initialize with README
# 6. Copy the repository URL

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/author-website-backend.git

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy on Railway
1. Back in Railway, click **"Deploy from GitHub repo"**
2. Select your `author-website-backend` repository
3. Railway will detect it's a Python app
4. Click **"Deploy Now"**

### Step 4: Add Environment Variables
1. In Railway dashboard, click your project
2. Click **"Variables"** tab
3. Add these variables:

```
MONGO_URL=mongodb+srv://heeloly_user:YourPassword123@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
DB_NAME=heeloly_website
```

(Use your actual MongoDB connection string from Part 1!)

### Step 5: Get Your Backend URL
1. Click **"Settings"** tab
2. Scroll to **"Domains"**
3. Click **"Generate Domain"**
4. You'll get a URL like: `your-app-name.up.railway.app`
5. **SAVE THIS URL!** - You'll need it for frontend

Example: `https://author-backend-production.up.railway.app`

### Step 6: Verify Backend is Running
1. Open your Railway URL in browser: `https://your-app-name.up.railway.app/api/`
2. You should see: `{"message": "Hello World"}`
3. ✅ Backend is live!

---

## Part 3: Deploy Frontend to Hostinger - 20 minutes

### Step 1: Update Frontend Configuration
Before building, you need to update the backend URL:

1. On your development machine, open: `/app/frontend/.env`
2. Replace the `REACT_APP_BACKEND_URL` with your Railway URL:

```
REACT_APP_BACKEND_URL=https://your-app-name.up.railway.app
```

### Step 2: Build Production Frontend
Run these commands:

```bash
cd /app/frontend
yarn install
yarn build
```

This creates a `build` folder with your production-ready website.

### Step 3: Upload to Hostinger
**Option A: Using File Manager (Easiest)**

1. Login to your Hostinger account
2. Go to **Hostinger Panel** → **File Manager**
3. Navigate to `public_html` folder (or your domain folder)
4. **Delete all existing files** in this folder (if any)
5. **Upload all files from** `/app/frontend/build` folder
6. Make sure these files are in `public_html`:
   - `index.html`
   - `static` folder
   - `asset-manifest.json`
   - etc.

**Option B: Using FTP (Alternative)**

1. Get FTP credentials from Hostinger (Panel → FTP Accounts)
2. Use FileZilla or any FTP client
3. Connect to your Hostinger
4. Upload all files from `/app/frontend/build` to `public_html`

### Step 4: Configure .htaccess for React Router
Create a file named `.htaccess` in your `public_html` folder with this content:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures React Router works properly on shared hosting.

### Step 5: Test Your Website
1. Open your Hostinger domain in browser (e.g., `yourdomain.com`)
2. You should see your Gothic author website!
3. Test navigation - all pages should work
4. Test contact form - it should submit successfully
5. Test newsletter signup - it should work

---

## 🎉 Success Checklist

Before you're fully live, verify:

- [ ] **MongoDB Atlas**
  - [ ] Cluster is running
  - [ ] Database user created
  - [ ] IP whitelist configured
  - [ ] Connection string saved

- [ ] **Railway Backend**
  - [ ] Code deployed from GitHub
  - [ ] Environment variables set (MONGO_URL, DB_NAME)
  - [ ] Domain generated
  - [ ] `/api/` endpoint returns "Hello World"

- [ ] **Hostinger Frontend**
  - [ ] All files uploaded to public_html
  - [ ] .htaccess file created
  - [ ] Website loads on your domain
  - [ ] All pages accessible
  - [ ] Contact form works
  - [ ] Newsletter signup works

---

## 🔧 Troubleshooting

### Frontend Issues

**Problem:** Website shows blank page
**Solution:** 
- Check browser console (F12) for errors
- Verify .htaccess file is uploaded
- Check that REACT_APP_BACKEND_URL is correct in .env before build

**Problem:** "Failed to fetch" errors
**Solution:**
- Check Railway backend is running
- Verify backend URL is correct
- Check CORS settings in backend

### Backend Issues

**Problem:** Railway deployment failed
**Solution:**
- Check Railway logs for errors
- Verify all dependencies in requirements.txt
- Make sure Python version is specified

**Problem:** Database connection errors
**Solution:**
- Verify MongoDB connection string is correct
- Check MongoDB Atlas IP whitelist includes "0.0.0.0/0"
- Ensure database user has correct permissions

### Database Issues

**Problem:** Can't connect to MongoDB
**Solution:**
- Verify connection string has correct password
- Check network access allows all IPs
- Try creating a new database user

---

## 📊 Monitoring Your Services

### Check Backend Health
Visit: `https://your-railway-app.up.railway.app/api/`
Should return: `{"message": "Hello World"}`

### Check Database
1. MongoDB Atlas Dashboard → Collections
2. You should see `newsletters` and `contacts` collections after first submission

### Check Frontend
Your Hostinger domain should load the website normally

---

## 💰 Cost Breakdown

**MongoDB Atlas FREE Tier:**
- 512 MB storage
- Shared RAM
- ~Unlimited reads/writes for small sites
- **Cost:** $0/month

**Railway FREE Tier:**
- 500 hours/month runtime (~20 days continuous)
- 1 GB RAM
- 1 GB storage
- **Cost:** $0/month initially (may need $5/month after trial)

**Hostinger:**
- Your existing plan
- **Cost:** Whatever you're already paying

**Total Extra Cost:** $0-5/month

---

## 🔄 Making Updates

### Update Frontend (Content/Design)
1. Make changes in `/app/frontend/src/`
2. Update backend URL in `.env` if needed
3. Run `yarn build`
4. Upload new files from `build` folder to Hostinger

### Update Backend (API/Features)
1. Make changes in `/app/backend/`
2. Commit and push to GitHub
3. Railway auto-deploys (or click "Deploy" in Railway dashboard)

### Update Database
No updates needed - MongoDB Atlas handles everything

---

## 📞 Need Help?

**MongoDB Atlas Support:** https://www.mongodb.com/docs/atlas/
**Railway Documentation:** https://docs.railway.app/
**Hostinger Support:** Available in your Hostinger panel

---

## 🎯 Next Steps After Deployment

1. **Set up custom domain** on Railway (optional, for cleaner backend URL)
2. **Configure SSL** (Both Hostinger and Railway provide free SSL)
3. **Set up email notifications** for contact form submissions
4. **Monitor usage** to ensure you stay within free tiers
5. **Set up backups** for MongoDB (Atlas provides automated backups)

---

**Congratulations! Your Gothic author website is now live! 🎉**
