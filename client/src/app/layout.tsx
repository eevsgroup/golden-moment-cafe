import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Sacramento } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-sans-family",
  subsets: ["latin"],
});

const signatureFont = Sacramento({
  variable: "--font-signature-family",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Golden Moment Café & Restaurant | Canberra",
    template: "%s | Golden Moment Café",
  },
  description: "Breakfast, burgers, curries and great coffee — served daily from 7 AM in the heart of Canberra. Come, stay awhile at Golden Moment.",
  keywords: ["Cafe in Canberra", "Canberra Restaurant", "Breakfast Canberra", "Coffee Canberra", "Golden Moment Cafe", "Best burgers Canberra", "Office Catering Canberra"],
  authors: [{ name: "Golden Moment" }],
  creator: "Golden Moment",
  metadataBase: new URL("https://goldenmoment.com.au"), // Replace with actual production URL
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://goldenmoment.com.au",
    title: "Golden Moment Café & Restaurant",
    description: "Breakfast, burgers, curries and great coffee — served daily from 7 AM in the heart of Canberra.",
    siteName: "Golden Moment",
    images: [
      {
        url: "/images/heroimg.png", // Will resolve relative to domain
        width: 1200,
        height: 630,
        alt: "Golden Moment Cafe Canberra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Golden Moment Café | Canberra",
    description: "Breakfast, burgers, curries and great coffee — served daily from 7 AM in the heart of Canberra.",
    images: ["/images/heroimg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${manrope.variable} ${signatureFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Golden Moment Café & Restaurant",
              "image": "https://goldenmoment.com.au/images/heroimg.png",
              "@id": "https://goldenmoment.com.au",
              "url": "https://goldenmoment.com.au",
              "telephone": "+61433056145",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Shop 4/14 Moore St",
                "addressLocality": "Canberra",
                "addressRegion": "ACT",
                "postalCode": "2601",
                "addressCountry": "AU"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -35.273060,
                "longitude": 149.126442
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Monday",
                  "opens": "07:00",
                  "closes": "14:30"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Tuesday", "Wednesday", "Friday"],
                  "opens": "06:00",
                  "closes": "16:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Thursday",
                  "opens": "06:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Saturday", "Sunday"],
                  "opens": "07:00",
                  "closes": "15:00"
                }
              ],
              "servesCuisine": ["Modern Australian", "Breakfast", "Burgers", "Coffee", "Curry"],
              "priceRange": "$$"
            })
          }}
        />
        <Navbar />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}