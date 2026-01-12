# Obscene Maids - IONOS Deployment Guide
## Complete Setup for www.obscenemaids.com

You have:
- ✅ Domain: www.obscenemaids.com (IONOS)
- ✅ Hosting: IONOS (6 months prepaid)
- ✅ Database: IONOS MySQL/PostgreSQL (6 months prepaid)

---

## 🚀 DEPLOYMENT STRATEGY

### Option 1: IONOS Hosting (Static HTML)
**Best for**: Quick launch, lower complexity
**Cost**: $0 (already paid)
**Setup Time**: 30 minutes

### Option 2: Vercel + IONOS Database (Recommended)
**Best for**: Better performance, easier scaling
**Cost**: Free (Vercel free tier)
**Setup Time**: 1 hour

### Option 3: IONOS Hosting + Next.js
**Best for**: Everything in one place
**Cost**: $0 (already paid)
**Setup Time**: 2 hours
**Complexity**: Medium

---

## 🎯 RECOMMENDED: Option 2 (Vercel + IONOS Database)

### Why This Approach:
- ✅ Vercel optimized for Next.js (fast, automatic SSL)
- ✅ Use your IONOS database (already paid)
- ✅ Domain stays with IONOS
- ✅ Best performance for conversion
- ✅ Easy updates and rollbacks
- ✅ Free hosting forever

---

## 📋 STEP-BY-STEP SETUP

### Step 1: Get Your IONOS Database Credentials

1. Log in to IONOS Control Panel
2. Navigate to **Databases** or **MySQL Databases**
3. Create a new database if you haven't already:
   - Database name: `obscene_maids`
   - Username: (create one)
   - Password: (save securely)

4. Get these details:
   ```
   Host: [usually db12345.hosting-data.io or similar]
   Port: 3306 (MySQL) or 5432 (PostgreSQL)
   Database: obscene_maids
   Username: [your username]
   Password: [your password]
   ```

5. Enable **Remote MySQL Access** in IONOS if needed

### Step 2: Set Up GitHub Repository

```bash
# On your local machine, create project
npx create-next-app@latest obscene-maids
cd obscene-maids

# Install dependencies
npm install @prisma/client lucide-react mysql2
npm install -D prisma

# Initialize Prisma with MySQL
npx prisma init --datasource-provider mysql

# Create Git repository
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
# (Create repo on github.com first)
git remote add origin https://github.com/YOUR_USERNAME/obscene-maids.git
git branch -M main
git push -u origin main
```

### Step 3: Add Your Landing Page Files

```bash
# Create component
mkdir -p components
# Copy ObsceneMaidsLanding.jsx to components/

# Create API endpoint
mkdir -p pages/api
# Copy api-subscribe.js to pages/api/subscribe.js

# Update pages/index.js
```

**pages/index.js**:
```javascript
import ObsceneMaidsLanding from '../components/ObsceneMaidsLanding';

export default function Home() {
  return <ObsceneMaidsLanding />;
}
```

### Step 4: Configure Database

**prisma/schema.prisma**:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model EmailSubscriber {
  id                String   @id @default(uuid())
  email             String   @unique
  subscriberType    String   // 'customer' or 'contractor'
  firstName         String?
  city              String   @db.VarChar(100)
  incomeRange       String?  @db.VarChar(50)
  frequencyInterest String?  @db.VarChar(50)
  signupSource      String?  @db.VarChar(100)
  utmCampaign       String?  @db.VarChar(100)
  utmSource         String?  @db.VarChar(100)
  utmMedium         String?  @db.VarChar(100)
  leadScore         Int      @default(0)
  status            String   @default("subscribed") @db.VarChar(50)
  subscribedAt      DateTime @default(now())
  lastEmailOpenedAt DateTime?
  totalEmailsOpened Int      @default(0)
  totalEmailsClicked Int     @default(0)
  converted         Boolean  @default(false)
  convertedAt       DateTime?

  @@index([city, subscriberType])
  @@index([leadScore])
  @@index([email])
}
```

**Local .env** (for testing):
```env
# IONOS Database Connection
DATABASE_URL="mysql://USERNAME:PASSWORD@HOST:3306/obscene_maids?sslmode=require"

# Example:
# DATABASE_URL="mysql://obscene_user:MyP@ssw0rd@db12345.hosting-data.io:3306/obscene_maids"

# Klaviyo (optional - add later)
KLAVIYO_PRIVATE_KEY=""
KLAVIYO_CUSTOMER_LIST_ID=""
KLAVIYO_CUSTOMER_WELCOME_FLOW=""

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Step 5: Test Locally

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Start development server
npm run dev

# Visit http://localhost:3000
# Test the email signup form
```

### Step 6: Deploy to Vercel

1. **Sign up for Vercel**: vercel.com (free account)

2. **Connect GitHub**:
   - Click "New Project"
   - Import your GitHub repo
   - Select `obscene-maids`

3. **Add Environment Variables** in Vercel:
   ```
   DATABASE_URL = mysql://USERNAME:PASSWORD@HOST:3306/obscene_maids
   NEXT_PUBLIC_SITE_URL = https://obscene-maids.vercel.app
   ```

4. **Deploy**: Click "Deploy" button

5. **Wait 2-3 minutes** for deployment to complete

6. **Test**: Visit your Vercel URL (e.g., `obscene-maids.vercel.app`)

### Step 7: Point Your IONOS Domain to Vercel

#### In Vercel:

1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter: `obscenemaids.com`
4. Enter: `www.obscenemaids.com`
5. Vercel will show you DNS records to add

#### In IONOS:

1. Log in to IONOS Control Panel
2. Go to **Domains & SSL** → Select `obscenemaids.com`
3. Click **DNS Settings** or **Manage DNS**

4. **Add these records**:

   ```
   Type: A
   Host: @
   Value: 76.76.21.21
   TTL: 3600

   Type: CNAME
   Host: www
   Value: cname.vercel-dns.com
   TTL: 3600
   ```

5. **Remove any conflicting records**:
   - Delete existing A records pointing elsewhere
   - Delete CNAME if pointing to IONOS

6. **Save changes**

7. **Wait 15-30 minutes** for DNS propagation

8. **Verify**: Visit `obscenemaids.com` and `www.obscenemaids.com`

### Step 8: Enable SSL (Automatic)

Vercel automatically provisions SSL certificate:
- Takes 5-10 minutes after DNS propagates
- Watch in Vercel → Domains section
- Status will change from "Invalid" → "Valid"
- Both HTTP and HTTPS will work (HTTPS auto-redirect)

---

## 🔧 ALTERNATIVE: Deploy Directly on IONOS

If you prefer to keep everything on IONOS:

### Step 1: Check IONOS Hosting Type

IONOS offers different hosting types:
- **Shared Hosting**: Basic PHP/HTML (no Node.js)
- **WordPress Hosting**: PHP-based (no Node.js)
- **VPS/Cloud**: Full control (Node.js possible)

**Check yours**: Log in → Hosting & Domains → Check package

### Step 2A: If Shared/WordPress Hosting (Static HTML Version)

Since IONOS shared hosting doesn't support Node.js, convert React to static HTML:

```bash
# Build static version
npm run build
npm run export

# This creates an 'out' folder with static HTML
```

**Upload via SFTP**:
1. Get SFTP credentials from IONOS
2. Use FileZilla or similar
3. Upload `out` folder contents to `/htdocs/` or `/public_html/`

**Configure .htaccess** for API calls:
```apache
# Redirect API calls to external service
RewriteEngine On
RewriteRule ^api/subscribe$ https://your-api-service.com/subscribe [P,L]
```

**Challenge**: Need separate backend for API endpoint

### Step 2B: If VPS/Cloud Hosting (Full Node.js)

```bash
# SSH into your IONOS server
ssh username@your-server-ip

# Install Node.js (if not installed)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Clone your repository
git clone https://github.com/YOUR_USERNAME/obscene-maids.git
cd obscene-maids

# Install dependencies
npm install

# Set up environment variables
nano .env.local
# (paste your DATABASE_URL and other vars)

# Build production
npm run build

# Start with PM2
pm2 start npm --name "obscene-maids" -- start

# Make it run on reboot
pm2 startup
pm2 save

# Configure Nginx
sudo nano /etc/nginx/sites-available/obscenemaids.com
```

**Nginx Configuration**:
```nginx
server {
    listen 80;
    server_name obscenemaids.com www.obscenemaids.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/obscenemaids.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Install SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d obscenemaids.com -d www.obscenemaids.com
```

---

## 📊 DATABASE MANAGEMENT

### Access Your IONOS Database

**Option 1: phpMyAdmin** (if MySQL)
1. IONOS Control Panel → Databases
2. Click "phpMyAdmin" button
3. Log in with database credentials
4. View `EmailSubscriber` table

**Option 2: TablePlus/MySQL Workbench**
1. Download: tableplus.com (free)
2. Create connection:
   - Host: [your IONOS host]
   - Port: 3306
   - User: [your username]
   - Password: [your password]
   - Database: obscene_maids

**Option 3: Prisma Studio**
```bash
# On your local machine
npx prisma studio

# Opens web interface at http://localhost:5555
# View/edit data visually
```

### View Subscribers

```sql
-- All customers on waitlist
SELECT 
  email, 
  city, 
  incomeRange, 
  leadScore, 
  subscribedAt 
FROM EmailSubscriber 
WHERE subscriberType = 'customer' 
ORDER BY subscribedAt DESC;

-- Count by city
SELECT city, COUNT(*) as count 
FROM EmailSubscriber 
WHERE subscriberType = 'customer' 
GROUP BY city 
ORDER BY count DESC;

-- Hot leads (score > 50)
SELECT * FROM EmailSubscriber 
WHERE leadScore > 50 
ORDER BY leadScore DESC;
```

### Export Data

```bash
# Export to CSV
mysqldump -u USERNAME -p -h HOST obscene_maids EmailSubscriber --fields-terminated-by=',' --fields-enclosed-by='"' --lines-terminated-by='\n' > subscribers.csv
```

---

## 🎯 POST-DEPLOYMENT CHECKLIST

### Immediate (Day 1):

- [ ] Verify site loads: obscenemaids.com
- [ ] Test email signup form
- [ ] Check database receives data
- [ ] Verify SSL certificate (https://)
- [ ] Test on mobile device
- [ ] Check all links work
- [ ] Verify Google Analytics (if added)

### Week 1:

- [ ] Set up Klaviyo email automation
- [ ] Configure Google Ads tracking
- [ ] Add Facebook Pixel
- [ ] Create Google Search Console account
- [ ] Submit sitemap to Google
- [ ] Monitor error logs in Vercel
- [ ] Check database growth daily

### Ongoing:

- [ ] Monitor conversion rate (target: 30%+)
- [ ] A/B test headlines
- [ ] Review lead scores weekly
- [ ] Export subscriber list weekly (backup)
- [ ] Respond to support emails
- [ ] Update waitlist count in copy

---

## 🔧 COMMON ISSUES & FIXES

### Issue: Domain not pointing to Vercel

**Solution**:
```bash
# Check DNS propagation
nslookup obscenemaids.com

# Should show: 76.76.21.21
# If not, DNS hasn't propagated yet (wait 24 hrs)
```

### Issue: Database connection fails

**Solution**:
```env
# Verify DATABASE_URL format:
mysql://USERNAME:PASSWORD@HOST:3306/DATABASE_NAME

# Check:
- Username/password correct?
- Remote access enabled in IONOS?
- Firewall blocking connection?

# Test connection:
mysql -u USERNAME -p -h HOST obscene_maids
```

### Issue: Form submits but no data in database

**Solution**:
```bash
# Check Vercel logs
vercel logs [your-deployment-url]

# Common causes:
- DATABASE_URL not set in Vercel
- Prisma not generated (add postinstall script)
- Tables not created (run prisma db push)
```

### Issue: SSL not working

**Solution**:
- Wait 30 minutes after DNS change
- Check Vercel → Domains → SSL status
- Verify both `obscenemaids.com` and `www.obscenemaids.com` are added
- Clear browser cache

---

## 📈 ANALYTICS SETUP

### Google Analytics 4

1. Create account: analytics.google.com
2. Create property: "Obscene Maids"
3. Get Measurement ID: `G-XXXXXXXXXX`

**Add to Next.js**:

Create `pages/_app.js`:
```javascript
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  return (
    <>
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
      <Component {...pageProps} />
    </>
  );
}
```

**Track Conversions**:

In `ObsceneMaidsLanding.jsx`, add to `handleSubmit`:
```javascript
if (data.success) {
  // Track conversion
  window.gtag('event', 'conversion', {
    send_to: 'G-XXXXXXXXXX/CONVERSION_ID',
    value: 1.0,
    currency: 'USD'
  });
  
  setSubmitted(true);
}
```

### Facebook Pixel

1. Create pixel: business.facebook.com
2. Get Pixel ID

Add to `pages/_app.js`:
```javascript
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'YOUR_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
```

Track Lead:
```javascript
window.fbq('track', 'Lead', {
  content_name: 'Waitlist Signup',
  value: 1.0,
  currency: 'USD'
});
```

---

## 💰 COST BREAKDOWN

| Service | Cost | Status |
|---------|------|--------|
| Domain (IONOS) | Included | ✅ Paid (6 months) |
| Hosting (IONOS) | Included | ✅ Paid (6 months) |
| Database (IONOS) | Included | ✅ Paid (6 months) |
| Vercel Hosting | FREE | ✅ Free forever |
| SSL Certificate | FREE | ✅ Auto (Vercel) |
| GitHub | FREE | ✅ Free tier |
| Klaviyo | $0-60/mo | ⏳ Add later |
| **TOTAL** | **$0/month** | **✅ Ready** |

---

## 🚀 LAUNCH CHECKLIST

### Pre-Launch (This Week):

- [ ] Deploy to Vercel
- [ ] Point domain to Vercel
- [ ] Test email signup flow
- [ ] Verify database connection
- [ ] Add Google Analytics
- [ ] Test on mobile
- [ ] Send test email to yourself

### Launch Day:

- [ ] Announce on social media
- [ ] Post Craigslist ads (customer + contractor)
- [ ] Launch Google Ads campaign
- [ ] Launch Facebook Ads campaign
- [ ] Email personal network
- [ ] Monitor site performance
- [ ] Check error logs hourly

### Week 1:

- [ ] Monitor conversion rate daily
- [ ] Export subscriber list (backup)
- [ ] Set up Klaviyo automation
- [ ] A/B test first variant
- [ ] Respond to inquiries
- [ ] Adjust ad spend based on CPA

---

## 📞 SUPPORT

### Need Help?

**Email**: jay@realetech.com

**Common Questions**:
- "How do I check my subscriber count?" → Use Prisma Studio or phpMyAdmin
- "Domain not working?" → Check DNS propagation (24-48 hrs)
- "Form not submitting?" → Check Vercel logs
- "Need to add Klaviyo?" → See email-marketing-strategy.md

---

## 🎯 NEXT STEPS

1. **TODAY**: Deploy landing page to Vercel + IONOS database
2. **THIS WEEK**: Launch Google + Facebook ads
3. **NEXT WEEK**: Set up Klaviyo email automation
4. **MONTH 1**: Reach 1,000 subscribers
5. **MONTH 3**: Reach 10,000 subscribers
6. **FEBRUARY 2025**: LAUNCH! 🚀

---

**Your landing page is ready to convert. Let's get you those 10,000 subscribers!**

Need help with deployment? I can walk you through each step.
