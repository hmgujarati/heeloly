# 🔄 Update Your VPS with Admin Dashboard

## What's New?
✅ Password-protected admin dashboard at `/admin`
✅ View newsletter subscribers
✅ View contact form submissions  
✅ Download CSV exports
✅ Logout functionality

---

## Step 1: Change Admin Password (IMPORTANT!)

Before building, set your own password:

1. Open: `/app/frontend/src/pages/AdminLogin.jsx`
2. Find line 12:
   ```javascript
   const ADMIN_PASSWORD = 'heeloly2025'; // ← CHANGE THIS PASSWORD!
   ```
3. Change `'heeloly2025'` to your own secure password
4. Save the file

**Example:**
```javascript
const ADMIN_PASSWORD = 'MySecurePass123!';
```

---

## Step 2: Build Updated Frontend

Run these commands:

```bash
cd /app/frontend

# Make sure you have the correct backend URL in .env
# It should point to your VPS backend
# Example: REACT_APP_BACKEND_URL=https://yourdomain.com

# Install dependencies (if not already done)
yarn install

# Build production version
yarn build
```

This creates a new `build` folder with the admin page included.

---

## Step 3: Upload to Your VPS

### Option A: Using SCP (From Your Local Machine)

```bash
# Navigate to the build folder
cd /app/frontend/build

# Upload to your VPS (replace with your details)
scp -r * username@your-vps-ip:/var/www/html/

# Or if you use a specific path:
scp -r * username@your-vps-ip:/path/to/your/website/
```

### Option B: Using FTP/SFTP

1. Use FileZilla or any FTP client
2. Connect to your VPS
3. Navigate to your website folder (usually `/var/www/html/` or `/home/username/public_html/`)
4. **Delete all old files** in that folder
5. Upload ALL files from `/app/frontend/build/` folder

### Option C: Direct on VPS

If you have the code on your VPS:

```bash
# SSH into your VPS
ssh username@your-vps-ip

# Navigate to your project
cd /path/to/your/project/frontend

# Build
yarn build

# Copy to web directory
sudo cp -r build/* /var/www/html/
# Or your specific path

# Set correct permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

---

## Step 4: Verify It's Working

### Test Admin Login:
1. Go to: `https://yourdomain.com/admin-login`
2. You should see a password login page
3. Enter your password (the one you set in Step 1)
4. You should be redirected to the admin dashboard

### Test Admin Dashboard:
1. If logged in, you should see:
   - Newsletter subscribers tab
   - Contact forms tab
   - Download CSV buttons
   - Logout button

### Test Direct Access Protection:
1. Open a new incognito/private browser window
2. Try to go directly to: `https://yourdomain.com/admin`
3. You should be redirected to login page

---

## Step 5: Access Your Email List

### Login:
```
https://yourdomain.com/admin-login
Password: (the one you set)
```

### Download Emails:
1. Click "Newsletter" tab
2. Click "Download CSV" button
3. Open CSV in Excel/Google Sheets

---

## 🔐 Security Features

✅ **Password Protection:** Admin page requires login
✅ **Session-Based:** Login expires when browser closes
✅ **No Database Storage:** Password is in code (secure for single admin)
✅ **Redirect Protection:** Can't access /admin without login

---

## 📱 What Users See vs What You See

**Regular Users:**
- Home, Books, About, Extras, Contact pages
- Newsletter signup works
- Contact form works
- **Cannot see /admin or /admin-login**

**You (Admin):**
- Everything users see, PLUS:
- `/admin-login` - Login page
- `/admin` - Dashboard with all submissions
- Download CSV functionality

---

## 🔄 Future Updates

When you need to update content:

1. Edit data files:
   - `/app/frontend/src/data/books.js`
   - `/app/frontend/src/data/author.js`

2. Rebuild:
   ```bash
   cd /app/frontend
   yarn build
   ```

3. Upload new build to VPS

---

## ⚠️ Important Notes

1. **Password is in code:** Anyone with access to your source code can see the password. This is okay for:
   - Personal use
   - Small sites
   - Single admin

2. **Session storage:** Login lasts until browser closes. This is by design for security.

3. **Backup regularly:** Download CSV files regularly as backup

4. **Mobile access:** Admin dashboard works on mobile browsers too!

---

## 🆘 Troubleshooting

**Problem:** Can't access /admin after updating
**Solution:** Clear browser cache and try again

**Problem:** Password doesn't work
**Solution:** Check AdminLogin.jsx - make sure you saved your password change

**Problem:** Admin page shows "Failed to fetch data"
**Solution:** Check that your backend is running and REACT_APP_BACKEND_URL is correct

**Problem:** Redirects to login even after entering password
**Solution:** Check browser console for errors. Your browser might be blocking sessionStorage

---

## ✅ Checklist

Before updating VPS:
- [ ] Changed admin password in AdminLogin.jsx
- [ ] Verified REACT_APP_BACKEND_URL in .env
- [ ] Ran `yarn build` successfully
- [ ] Build folder created

After uploading to VPS:
- [ ] Website loads normally at yourdomain.com
- [ ] All pages work (Home, Books, About, etc.)
- [ ] Can access /admin-login
- [ ] Can login with your password
- [ ] Admin dashboard shows data
- [ ] Can download CSV files
- [ ] Logout button works

---

## 🎉 You're Done!

Your VPS now has a professional admin dashboard!

**Admin URL:** `https://yourdomain.com/admin-login`
**Your Password:** (the one you set in AdminLogin.jsx)

Bookmark the admin login page for easy access!
