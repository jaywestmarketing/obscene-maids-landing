# Quick Deployment Guide

## Get This Live in 30 Minutes

### Step 1: Install Dependencies (2 min)

```bash
cd obscene-maids-landing
npm install
```

### Step 2: Test Locally (2 min)

```bash
npm run dev
```

Visit: http://localhost:3000

**Does it load?** ✅ Continue

### Step 3: Push to GitHub (5 min)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub.com
# Name: obscene-maids-landing
# Don't initialize with README

# Connect (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/obscene-maids-landing.git

# Push
git branch -M main
git push -u origin main
```

### Step 4: Deploy to Vercel (5 min)

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Add New Project"
4. Import "obscene-maids-landing"
5. Click "Deploy"

**Wait 2-3 minutes...**

Your site is live at: `obscene-maids-landing.vercel.app`

### Step 5: Point Your Domain (15 min)

**In Vercel:**
- Project Settings → Domains
- Add: `obscenemaids.com`
- Add: `www.obscenemaids.com`

**In IONOS:**
- Domains & SSL → obscenemaids.com
- DNS Settings

Add these records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Wait 15-30 minutes for DNS propagation**

### Step 6: YOU'RE LIVE! 🚀

Visit: https://obscenemaids.com

## What You Have Now

✅ Landing page live
✅ Form accepts emails (logs to console)
✅ Mobile-responsive
✅ SSL enabled (HTTPS)
✅ Free hosting

## Next Steps

### Add Database (Choose One):

**Option 1: Google Sheets** (Easiest, Free)
- See: `docs/free-subscription-system.md`
- Setup time: 20 minutes

**Option 2: Vercel KV** (Free tier)
- See: Vercel dashboard → Storage
- Setup time: 10 minutes

**Option 3: Your IONOS Database**
- See: `docs/IONOS-DEPLOYMENT-GUIDE.md`
- Setup time: 30 minutes

### Add Analytics:

**Google Analytics:**
```javascript
// Add to pages/_app.js
import Script from 'next/script';

// Inside MyApp function:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## Troubleshooting

**npm not found:**
- Install Node.js from nodejs.org

**Port 3000 in use:**
- Run: `npm run dev -- -p 3001`

**GitHub push rejected:**
- Make sure repo is created on GitHub first
- Check repository URL

**Domain not working:**
- Wait 30 minutes for DNS
- Check propagation: dnschecker.org
- Verify DNS records in IONOS

**Need help?**
- Check full docs in `docs/` folder
- Or reach out for support

## You're Ready!

Start driving traffic with:
- Google Ads
- Facebook Ads  
- Organic social media

Your landing page is ready to convert! 🎯
