# 🏗️ Build Frontend for Hostinger

## Quick Build Instructions

### Step 1: Update Backend URL
Before building, you MUST update the backend URL to point to your Railway deployment.

Edit this file: `/app/frontend/.env`

Replace the current `REACT_APP_BACKEND_URL` with your Railway URL:

```
REACT_APP_BACKEND_URL=https://your-railway-app.up.railway.app
```

**Example:**
```
REACT_APP_BACKEND_URL=https://author-backend-production.up.railway.app
```

### Step 2: Build Production Files

Run these commands in your terminal:

```bash
cd /app/frontend
yarn install
yarn build
```

This will create a `build` folder at `/app/frontend/build/`

### Step 3: What Gets Created

After running `yarn build`, you'll have:

```
/app/frontend/build/
├── index.html (main HTML file)
├── static/
│   ├── css/ (all CSS files)
│   ├── js/ (all JavaScript files)
│   └── media/ (images, fonts, etc.)
├── asset-manifest.json
├── favicon.ico
├── logo192.png
├── logo512.png
├── manifest.json
└── robots.txt
```

### Step 4: Upload to Hostinger

**ALL files and folders from the `build` directory** should be uploaded to your Hostinger `public_html` folder.

### Step 5: Create .htaccess

Create this file in your `public_html` folder on Hostinger:

**File: `.htaccess`**
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

### Important Notes

⚠️ **BEFORE Building:**
- Make sure Railway backend is deployed and you have the URL
- Update `.env` with the correct Railway URL
- Don't skip this step or your frontend won't connect to backend!

⚠️ **When Uploading:**
- Upload CONTENTS of build folder, not the build folder itself
- Make sure `.htaccess` is created
- Clear browser cache after uploading

### Testing Your Build Locally (Optional)

Before uploading, you can test the build locally:

```bash
cd /app/frontend/build
python3 -m http.server 8000
```

Then open: http://localhost:8000

---

## Checklist Before Building

- [ ] Railway backend is deployed
- [ ] Railway backend URL is copied
- [ ] `.env` file updated with Railway URL
- [ ] Ran `yarn build` successfully
- [ ] `build` folder created
- [ ] Ready to upload to Hostinger

---

## If You Need to Rebuild

If you make changes to your site or need to update the backend URL:

1. Update `/app/frontend/.env` with new Railway URL
2. Delete the old `build` folder
3. Run `yarn build` again
4. Re-upload to Hostinger

The entire process takes ~2-3 minutes.
