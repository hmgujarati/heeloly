# Author Website - Content Update Guide

## Overview
This guide will help you easily update your website content without touching any code. All content is stored in simple JavaScript files that you can edit.

---

## 📚 How to Update Book Information

**File Location:** `/app/frontend/src/data/books.js`

### Adding a New Book

1. Open `/app/frontend/src/data/books.js`
2. Add a new book object to the `books` array:

```javascript
{
  id: 'unique-book-id',
  title: 'Your Book Title',
  author: 'Heeloly Upasani',
  series: 'Standalone',  // Or series name
  bookNumber: null,      // Or book number in series
  coverImage: 'https://your-image-url.com/cover.jpg',
  blurb: 'Your book description here...',
  amazonLink: 'https://amazon.com/your-book',
  goodreadsLink: 'https://goodreads.com/your-book',
  status: 'available',
  releaseDate: '2025',
  genres: ['Genre1', 'Genre2']
}
```

### Updating Coming Soon Books

Edit the `comingSoonBooks` array in the same file:

```javascript
export const comingSoonBooks = [
  {
    id: 'coming-soon-1',
    title: 'Your Next Book Title',
    author: 'Heeloly Upasani',
    coverImage: 'https://placeholder-image.com',
    blurb: 'A teaser about your upcoming book...',
    status: 'coming-soon',
    releaseDate: 'TBA'
  }
];
```

---

## 👤 How to Update Author Information

**File Location:** `/app/frontend/src/data/author.js`

### Update Biography

Edit the `bio` field:

```javascript
bio: `Your updated biography text here...`
```

### Update Author Photo

Replace the `photo` URL:

```javascript
photo: 'https://your-new-photo-url.com/image.jpg'
```

### Update Social Media Links

```javascript
socialMedia: {
  instagram: 'https://www.instagram.com/yourhandle',
  goodreads: 'https://www.goodreads.com/author/...',
  twitter: 'https://x.com/yourhandle',
  facebook: 'https://facebook.com/yourpage',
  pinterest: 'https://pinterest.com/yourboard',
  spotify: 'https://open.spotify.com/playlist/...'
}
```

### Update Email Address

```javascript
email: 'your@email.com'
```

### Update Newsletter Link

When you have your newsletter service set up:

```javascript
newsletterLink: 'https://your-newsletter-signup-url.com'
```

---

## ❓ How to Update FAQ

**File Location:** `/app/frontend/src/data/author.js`

Find the `faqData` array and edit questions/answers:

```javascript
{
  category: 'About My Writing',
  questions: [
    {
      question: 'Your question here?',
      answer: 'Your answer here...'
    }
  ]
}
```

### Adding a Link in FAQ

For questions that need a link (like "Join Reader Group"):

```javascript
{
  question: 'Do you have a reader group?',
  answer: 'Yes, join our community!',
  hasLink: true,
  linkText: 'Join Reader Group',
  linkUrl: 'https://facebook.com/groups/your-group'
}
```

---

## 🎨 Understanding the Website Structure

### Pages

1. **Home (/)** - Hero section, book showcase, newsletter signup
2. **Books (/books)** - All books with details
3. **About (/about)** - Author bio, FAQ, social links
4. **Extras (/extras)** - Playlists, Pinterest, bonus content
5. **Contact (/contact)** - Contact form for inquiries

### Data Files

- `/app/frontend/src/data/books.js` - All book information
- `/app/frontend/src/data/author.js` - Author bio, FAQ, social links

---

## 📧 Newsletter & Contact Form

### How It Works

- **Newsletter Popup:** Appears 3 seconds after page load (only once per visitor)
- **Newsletter Emails:** Stored in MongoDB database
- **Contact Form:** All inquiries saved to MongoDB database

### Accessing Form Submissions

Contact your developer to set up an admin panel or email notifications for form submissions.

---

## 🚀 Making Changes Live

After editing any data files:

1. Save the file
2. The website automatically reloads with your changes
3. If changes don't appear, refresh your browser

---

## 🎯 Quick Reference

### File Paths
- Books: `/app/frontend/src/data/books.js`
- Author Info: `/app/frontend/src/data/author.js`

### Common Updates
1. **New Book Release:**
   - Move from `comingSoonBooks` to `books` array
   - Update `status: 'available'`
   - Add Amazon/Goodreads links

2. **Update Book Cover:**
   - Replace `coverImage` URL

3. **Change Social Links:**
   - Edit `socialMedia` object in author.js

4. **Add New FAQ:**
   - Add new question object to appropriate category

---

## 🛠️ Need Help?

If you need to make changes beyond content updates (design, new features, etc.), contact your developer.

### Developer Files
- Components: `/app/frontend/src/components/`
- Pages: `/app/frontend/src/pages/`
- Styles: `/app/frontend/src/App.css`
- Backend: `/app/backend/server.py`

---

## 📝 Tips

1. **Always backup** before making changes
2. **Use valid URLs** for images and links
3. **Keep blurbs concise** - 150-300 words work best
4. **Image sizes:** Book covers should be at least 400x600px
5. **Test links** before publishing

---

## 🎨 Design Theme

Your website uses a **Gothic Dark Fantasy** theme with:
- Black backgrounds
- Silver and blood-red accents
- Serif fonts (Cinzel) for headings
- Sans-serif (Inter) for body text
- Custom sword & wings logo

All design elements follow this aesthetic automatically.

---

**Last Updated:** December 2024  
**Website Version:** 1.0
