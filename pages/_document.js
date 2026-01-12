import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Primary Meta Tags */}
        <meta name="title" content="Premium Cleaning Service Las Vegas | Licensed & Insured | Obscene Maids" />
        <meta name="description" content="Professional cleaning service in Las Vegas. Licensed, insured, background-checked contractors. Unique approach to luxury home services. Book online. Adults 18+." />
        <meta name="keywords" content="cleaning service las vegas, premium cleaning vegas, professional cleaning, luxury home services, topless cleaning service, licensed cleaning vegas" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="Obscene Maids" />
        <meta name="rating" content="adult" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://obscenemaids.com/" />
        <meta property="og:title" content="Premium Cleaning Service Las Vegas | Obscene Maids" />
        <meta property="og:description" content="Professional cleaning service in Las Vegas. Licensed, insured, background-checked contractors. Unique approach to luxury home services." />
        <meta property="og:image" content="https://obscenemaids.com/og-image.jpg" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Obscene Maids" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://obscenemaids.com/" />
        <meta property="twitter:title" content="Premium Cleaning Service Las Vegas | Obscene Maids" />
        <meta property="twitter:description" content="Professional cleaning service in Las Vegas. Licensed, insured, background-checked contractors." />
        <meta property="twitter:image" content="https://obscenemaids.com/twitter-image.jpg" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="US-NV" />
        <meta name="geo.placename" content="Las Vegas" />
        <meta name="geo.position" content="36.1699;-115.1398" />
        <meta name="ICBM" content="36.1699, -115.1398" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://obscenemaids.com/" />
        
        {/* Schema.org Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Obscene Maids Las Vegas',
              image: 'https://obscenemaids.com/logo.png',
              '@id': 'https://obscenemaids.com',
              url: 'https://obscenemaids.com',
              telephone: '+1-702-555-0100',
              priceRange: '$130-$300',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Las Vegas',
                addressRegion: 'NV',
                postalCode: '89101',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 36.1699,
                longitude: -115.1398,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '08:00',
                closes: '22:00',
              },
              sameAs: [
                'https://facebook.com/obscenemaids',
                'https://instagram.com/obscenemaids',
              ],
            }),
          }}
        />
        
        {/* Schema.org Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Is this service legal?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Obscene Maids is a fully licensed cleaning service operating legally in Nevada. Our contractors provide professional cleaning services. We comply with all state and local regulations.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What services do you provide?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We provide professional cleaning services for homes and apartments. Our contractors are background-checked and insured. Services include vacuuming, dusting, bathroom cleaning, kitchen cleaning, and general home maintenance.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How much does it cost?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Standard service is $130/hour. We also offer weekly packages ($260/week) and monthly packages ($208/month). All pricing is transparent with no hidden fees.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are contractors background checked?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Every contractor undergoes comprehensive background checks including criminal history and sex offender registry verification. We also carry $2M liability insurance.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Can I book online?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Our platform allows you to book services online in under 60 seconds. Choose your preferred time, pay securely, and receive instant confirmation.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What areas do you serve?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'We currently serve Las Vegas and surrounding areas including Henderson, Summerlin, North Las Vegas, and the greater Las Vegas valley.',
                  },
                },
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
