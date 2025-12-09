# 📧 How to Access Email List & Contact Forms

## 🎯 3 Easy Ways to Get Your Email List

---

## Method 1: Admin Dashboard (EASIEST - NEW!)

I've created a beautiful admin page for you!

### Access the Admin Page:
```
https://your-vps-domain.com/admin
```

**Features:**
- ✅ View all newsletter subscribers in a table
- ✅ View all contact form submissions with details
- ✅ Download CSV files with one click
- ✅ See subscription dates and status
- ✅ Beautiful Gothic-themed interface

**To Use:**
1. Open `https://your-vps-domain.com/admin` in your browser
2. Click "Newsletter" tab to see all subscribers
3. Click "Contact Forms" tab to see all inquiries
4. Click "Download CSV" button to export data to Excel

**CSV files include:**
- Newsletter: Email, Subscribed Date, Status
- Contacts: Name, Email, Subject, Message, Date, Status

---

## Method 2: Direct API Access

Your backend already has API endpoints to fetch data.

### Get Newsletter Subscribers:
Open this URL in your browser:
```
https://your-vps-domain.com/api/newsletter/subscribers
```

You'll see JSON data like:
```json
[
  {
    "id": "abc123",
    "email": "user@example.com",
    "subscribed_at": "2025-12-09T10:30:00Z",
    "active": true
  }
]
```

### Get Contact Form Submissions:
```
https://your-vps-domain.com/api/contact/inquiries
```

You'll see JSON data like:
```json
[
  {
    "id": "xyz789",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Book Inquiry",
    "message": "I love your book!",
    "submitted_at": "2025-12-09T10:35:00Z",
    "status": "new"
  }
]
```

**To Save This Data:**
1. Copy the JSON
2. Paste into https://www.convertcsv.com/json-to-csv.htm
3. Convert to CSV
4. Download and open in Excel

---

## Method 3: Direct MongoDB Access

If you have access to your VPS terminal:

### Connect to MongoDB:
```bash
# SSH into your VPS
ssh your-username@your-vps-ip

# Connect to MongoDB
mongosh

# Switch to your database
use heeloly_website

# Get all newsletter subscribers
db.newsletters.find().pretty()

# Get all contact inquiries
db.contacts.find().pretty()

# Export to CSV
mongoexport --db=heeloly_website --collection=newsletters --type=csv --fields=email,subscribed_at,active --out=newsletters.csv

mongoexport --db=heeloly_website --collection=contacts --type=csv --fields=name,email,subject,message,submitted_at --out=contacts.csv
```

The CSV files will be saved in your current directory.

---

## 📊 What Data is Collected?

### Newsletter Subscribers:
- ✉️ Email address
- 📅 Subscription date & time
- ✅ Active/Inactive status
- 🆔 Unique ID

### Contact Form Submissions:
- 👤 Full name
- ✉️ Email address
- 📝 Subject (optional)
- 💬 Message text
- 📅 Submission date & time
- 🏷️ Status (new/read/responded)
- 🆔 Unique ID

---

## 💡 Pro Tips

### Regular Export Schedule
Set a reminder to export your email list regularly:
- **Weekly:** For active campaigns
- **Monthly:** For general maintenance
- **Before campaigns:** Before sending newsletters

### Backup Your Data
1. Go to Admin page: `/admin`
2. Click "Download CSV" for both tabs
3. Save to your computer
4. Store in Google Drive/Dropbox as backup

### Import to Email Services
You can import the CSV files to:
- **Mailchimp** - Go to Audience → Import contacts
- **ConvertKit** - Go to Subscribers → Import
- **Sendinblue** - Go to Contacts → Import contacts
- **Gmail/Outlook** - Import as contact list

### Search & Filter
In the Admin page, you can:
- See newest subscribers first (automatically sorted)
- Count total subscribers at a glance
- View detailed messages from contact forms
- Export specific date ranges

---

## 🔐 Security Note

**Important:** The `/admin` page is currently public. Anyone with the URL can access it.

### To Secure It (Recommended):

**Option 1: Simple Password Protection**
Use `.htaccess` on your VPS to password-protect the admin page.

**Option 2: Remove from Production**
Only access the admin page from your local development environment.

**Option 3: Add Authentication**
I can add a simple login system if needed.

Would you like me to add password protection to the admin page?

---

## 📞 Quick Reference

| Method | URL/Command | Best For |
|--------|-------------|----------|
| Admin Page | `https://yourdomain.com/admin` | Quick view & CSV export |
| API Endpoint | `https://yourdomain.com/api/newsletter/subscribers` | Integration with tools |
| MongoDB Direct | `mongosh` commands | Advanced users |

---

## 🎉 You're All Set!

The easiest way is to simply visit:
```
https://your-vps-domain.com/admin
```

And click the "Download CSV" button whenever you need the email list!

---

**Need help?** Let me know if you want to:
1. Add password protection to /admin
2. Set up automatic email exports
3. Integrate with Mailchimp/ConvertKit
4. Add more admin features
