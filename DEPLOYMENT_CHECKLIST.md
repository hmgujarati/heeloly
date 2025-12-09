# ✅ Deployment Checklist - Option 2

## Phase 1: MongoDB Atlas Setup (10 min)
- [ ] Created MongoDB Atlas account
- [ ] Created free cluster (M0 Sandbox)
- [ ] Created database user
- [ ] Saved username and password
- [ ] Whitelisted all IPs (0.0.0.0/0)
- [ ] Got connection string
- [ ] Replaced `<username>` and `<password>` in connection string
- [ ] Connection string saved securely

**Your MongoDB Connection String:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## Phase 2: Railway Backend Setup (15 min)
- [ ] Created Railway account
- [ ] Created GitHub account (if needed)
- [ ] Pushed backend code to GitHub repository
- [ ] Connected GitHub repo to Railway
- [ ] Railway detected Python app
- [ ] Added MONGO_URL environment variable
- [ ] Added DB_NAME environment variable (heeloly_website)
- [ ] Generated Railway domain
- [ ] Tested backend: `https://your-app.railway.app/api/` shows "Hello World"
- [ ] Backend URL saved

**Your Railway Backend URL:**
```
https://your-app-name.up.railway.app
```

---

## Phase 3: Frontend Build (5 min)
- [ ] Updated `/app/frontend/.env` with Railway backend URL
- [ ] Ran `cd /app/frontend`
- [ ] Ran `yarn install`
- [ ] Ran `yarn build`
- [ ] Build completed successfully
- [ ] `build` folder created in `/app/frontend/build/`

---

## Phase 4: Hostinger Upload (10 min)
- [ ] Logged into Hostinger panel
- [ ] Opened File Manager
- [ ] Navigated to `public_html` folder
- [ ] Deleted old files (if any)
- [ ] Uploaded ALL contents from `/app/frontend/build/` folder
- [ ] Verified these files exist in public_html:
  - [ ] index.html
  - [ ] static/ folder
  - [ ] asset-manifest.json
- [ ] Created `.htaccess` file with React Router config
- [ ] Uploaded `.htaccess` to public_html

---

## Phase 5: Testing (5 min)
- [ ] Opened website on Hostinger domain
- [ ] Website loads correctly
- [ ] Tested all page navigation (Home, Books, About, Extras, Contact)
- [ ] Tested contact form submission
- [ ] Tested newsletter signup
- [ ] No console errors (Press F12 to check)
- [ ] Hero image loads
- [ ] Logo displays in header
- [ ] Silver and gold accents visible
- [ ] Lightning effects work

---

## Final Verification
- [ ] MongoDB Atlas: Collections appear after form submission
- [ ] Railway: Backend responds at `/api/`
- [ ] Hostinger: Website fully functional
- [ ] All forms working
- [ ] No broken images or links

---

## 🎉 You're Live When All Boxes Are Checked!

**Total Time:** ~45 minutes
**Total Cost:** $0/month (free tiers)

---

## Important URLs to Save

**MongoDB Atlas Dashboard:**
https://cloud.mongodb.com/

**Railway Dashboard:**
https://railway.app/dashboard

**Hostinger Panel:**
https://hpanel.hostinger.com/

**Your Live Website:**
https://yourdomain.com

---

## If Something Doesn't Work

1. Check DEPLOYMENT_GUIDE.md troubleshooting section
2. Verify all environment variables are correct
3. Check Railway logs for backend errors
4. Check browser console for frontend errors
5. Ensure MongoDB connection string is correct

---

## Making Future Updates

**Frontend Changes:**
1. Edit code in `/app/frontend/src/`
2. Run `yarn build`
3. Upload new build to Hostinger

**Backend Changes:**
1. Edit code in `/app/backend/`
2. Push to GitHub
3. Railway auto-deploys

**Content Updates:**
- Edit `/app/frontend/src/data/books.js`
- Edit `/app/frontend/src/data/author.js`
- Rebuild and upload

---

Good luck with your deployment! 🚀
