# Obscene Maids Landing Page

Premium cleaning service landing page for obscenemaids.com

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option 1: Deploy via GitHub

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Click Deploy
5. Done!

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Project Structure

```
obscene-maids-landing/
├── components/
│   └── ObsceneMaidsLanding.jsx   # Main landing page component
├── pages/
│   ├── api/
│   │   └── subscribe.js          # Email signup API endpoint
│   ├── _app.js                   # App wrapper
│   ├── _document.js              # HTML document structure
│   └── index.js                  # Home page
├── public/                       # Static files (images, favicon)
├── styles/
│   └── globals.css               # Global styles
├── .gitignore
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## Environment Variables (Optional)

Create `.env.local` for environment variables:

```env
NEXT_PUBLIC_SITE_URL=https://obscenemaids.com
```

## Features

- ✅ High-converting landing page design
- ✅ Email capture with lead scoring
- ✅ Mobile-responsive
- ✅ Vegas luxury aesthetic (gold/crimson/black)
- ✅ Animated interactions
- ✅ FAQ section
- ✅ Pricing transparency
- ✅ Social proof elements

## What's Next

### Add Database (Choose One):

1. **Google Sheets** (Free, Easy) - See `/docs/google-sheets-setup.md`
2. **Vercel KV** (Free tier) - See Vercel dashboard
3. **Supabase** (Free tier) - See supabase.com

### Add Analytics:

1. Google Analytics 4
2. Facebook Pixel
3. Vercel Analytics (built-in)

### Point Domain:

1. Go to your domain registrar (IONOS)
2. Update DNS records to point to Vercel
3. Wait 15-30 minutes for propagation

## Support

Questions? Check the docs in `/docs/` folder.

## License

Private - All rights reserved by RealE Technology Solutions LLC
