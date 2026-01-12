# FREE Subscription System - Obscene Maids Landing Page
## Zero Cost Solution Using Google Sheets as Database

**GOAL**: Handle email signups with ZERO monthly costs

---

## 🎯 FREE TIER OPTIONS

### Option 1: Google Sheets as Database (RECOMMENDED)
**Cost**: $0/month forever
**Handles**: Unlimited signups
**Setup Time**: 30 minutes
**Best For**: Launch now, scale later

### Option 2: Vercel KV (Redis) Free Tier
**Cost**: $0/month (30K requests/month free)
**Handles**: ~10,000 signups in free tier
**Setup Time**: 20 minutes
**Best For**: If you want real database feel

### Option 3: Supabase Free Tier
**Cost**: $0/month (500MB database, 50K requests/month)
**Handles**: ~50,000 signups
**Setup Time**: 45 minutes
**Best For**: Most scalable free option

---

## 🚀 OPTION 1: GOOGLE SHEETS (EASIEST & FREE FOREVER)

### Why Google Sheets:
✅ 100% FREE forever
✅ Unlimited rows (millions of signups)
✅ Easy to view/export data
✅ Built-in analytics (filter, sort, pivot)
✅ No database knowledge needed
✅ Works with Vercel
✅ Can export to real database later

---

## 📋 STEP-BY-STEP SETUP (GOOGLE SHEETS)

### Step 1: Create Google Sheet

1. **Go to**: sheets.google.com
2. **Create new sheet** named "Obscene Maids Waitlist"
3. **Add column headers** (Row 1):
   ```
   A: timestamp
   B: email
   C: city
   D: income
   E: frequency
   F: leadScore
   G: utmSource
   H: utmMedium
   I: utmCampaign
   J: waitlistPosition
   ```
4. **Get Sheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```
   Copy the SHEET_ID_HERE part

5. **Share sheet**: Click Share → Anyone with link can VIEW

---

### Step 2: Set Up Google Sheets API

1. **Go to**: console.cloud.google.com
2. **Create new project**: "Obscene Maids"
3. **Enable Google Sheets API**:
   - Search for "Google Sheets API"
   - Click Enable
4. **Create Service Account**:
   - Go to "Credentials"
   - Create Credentials → Service Account
   - Name: "obscene-maids-api"
   - Click Create
5. **Create Key**:
   - Click on service account email
   - Keys tab → Add Key → Create New Key
   - Choose JSON
   - Download file (keep it safe!)
6. **Share Sheet with Service Account**:
   - Copy service account email (looks like: ...@...iam.gserviceaccount.com)
   - Open your Google Sheet
   - Share → Paste email → Give Editor access

---

### Step 3: Updated API Code (Google Sheets)

Create `pages/api/subscribe.js`:

```javascript
// pages/api/subscribe.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, city, income, frequency, utmSource, utmMedium, utmCampaign } = req.body;

  // Validate
  if (!email || !city) {
    return res.status(400).json({ error: 'Email and city required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  try {
    // Set up Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Check if email already exists
    const checkResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!B:B', // Email column
    });

    const existingEmails = checkResponse.data.values || [];
    if (existingEmails.flat().includes(email.toLowerCase())) {
      return res.status(400).json({ error: 'Email already on waitlist' });
    }

    // Calculate lead score
    const leadScore = calculateLeadScore(income, frequency);

    // Get current row count for waitlist position
    const currentRows = existingEmails.length;
    const waitlistPosition = currentRows; // Header is row 1, so this is correct

    // Prepare data
    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      email.toLowerCase(),
      city,
      income || '',
      frequency || '',
      leadScore,
      utmSource || 'direct',
      utmMedium || '',
      utmCampaign || '',
      waitlistPosition,
    ];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:J',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [row],
      },
    });

    // Success
    return res.status(200).json({
      success: true,
      waitlistPosition,
      message: 'Successfully joined waitlist!',
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Failed to join waitlist' });
  }
}

function calculateLeadScore(income, frequency) {
  let score = 0;
  
  if (income === '1m+') score += 30;
  else if (income === '500k-1m') score += 20;
  else if (income === '250k-500k') score += 10;
  
  if (frequency === 'weekly') score += 25;
  else if (frequency === 'biweekly') score += 15;
  else if (frequency === 'monthly') score += 5;
  
  return score;
}
```

---

### Step 4: Environment Variables

Create `.env.local`:

```env
# Google Sheets
GOOGLE_SHEET_ID=your_sheet_id_here
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourKeyHere\n-----END PRIVATE KEY-----\n"

# Site URL
NEXT_PUBLIC_SITE_URL=https://obscenemaids.com
```

**Getting the values**:
- `GOOGLE_SHEET_ID`: From your sheet URL
- `GOOGLE_CLIENT_EMAIL`: From downloaded JSON file (`client_email`)
- `GOOGLE_PRIVATE_KEY`: From downloaded JSON file (`private_key`)

---

### Step 5: Install Dependencies

```bash
npm install googleapis
```

---

### Step 6: Deploy to Vercel

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Add Environment Variables** in Vercel dashboard:
   - GOOGLE_SHEET_ID
   - GOOGLE_CLIENT_EMAIL
   - GOOGLE_PRIVATE_KEY (paste entire key including `-----BEGIN...`)
4. **Deploy**

---

## 💰 COST COMPARISON

| Solution | Cost | Capacity | Best For |
|----------|------|----------|----------|
| Google Sheets | $0 forever | Unlimited | Launch now |
| Vercel KV | $0 (30K/mo) | ~10K signups/mo | Simple & fast |
| Supabase | $0 (50K/mo) | ~50K signups/mo | Scale potential |
| PostgreSQL (IONOS) | Already paid | Unlimited | Professional |

---

## ✅ RECOMMENDATION

**For immediate launch**: Use **Google Sheets**
- Zero setup complexity
- Works immediately
- View data in spreadsheet
- Export to anything later
- Literally cannot break

---

## 🚀 QUICK START (30 MINUTES)

### Do This Right Now:

1. **Create Google Sheet** (5 min)
   - Add columns
   - Get sheet ID
   - Share publicly

2. **Set up Google API** (15 min)
   - Create service account
   - Download credentials
   - Share sheet with service account

3. **Update your code** (5 min)
   - Replace api-subscribe.js with Google Sheets version above
   - Add environment variables
   - Install googleapis

4. **Deploy to Vercel** (5 min)
   - Push to GitHub
   - Connect Vercel
   - Add env vars
   - Deploy

5. **LIVE** ✅
   - obscenemaids.com accepting signups
   - Data flowing to Google Sheets
   - $0/month cost

---

## 📊 ACCESSING YOUR DATA

### Google Sheets:
- Open sheet anytime
- See live signups
- Sort/filter/analyze
- Download CSV

### Create Simple Dashboard:

In Google Sheets, add these formulas:

```
Total Signups: =COUNTA(B2:B)
Today's Signups: =COUNTIF(A2:A,">"&TODAY())
High Value Leads: =COUNTIF(F2:F,">50")
Vegas Signups: =COUNTIF(C2:C,"Las Vegas")
Average Lead Score: =AVERAGE(F2:F)
```

---

Want me to help you set up the Google Sheets version right now? It's the fastest path to getting live!
