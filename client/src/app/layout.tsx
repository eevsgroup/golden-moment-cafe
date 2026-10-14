import type { Metadata } from "next";
import { Instrument_Serif, Manrope, Sacramento } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/lib/context/CartContext";
import CartShell from "@/components/cart/CartShell";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CONTACT } from "@/lib/data/contact";
import { getJsonLdHours } from "@/lib/data/hours";
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
  metadataBase: new URL(CONTACT.website),
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: CONTACT.website,
    title: "Golden Moment Café & Restaurant",
    description: "Breakfast, burgers, curries and great coffee — served daily from 7 AM in the heart of Canberra.",
    siteName: "Golden Moment",
    images: [
      {
        url: "/images/heroimg.png",
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
              "image": `${CONTACT.website}/images/heroimg.png`,
              "@id": CONTACT.website,
              "url": CONTACT.website,
              "telephone": `+${CONTACT.phone}`,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": CONTACT.address.street,
                "addressLocality": CONTACT.address.locality,
                "addressRegion": CONTACT.address.region,
                "postalCode": CONTACT.address.postalCode,
                "addressCountry": CONTACT.address.country
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": CONTACT.geo.latitude,
                "longitude": CONTACT.geo.longitude
              },
              "openingHoursSpecification": getJsonLdHours(),
              "servesCuisine": ["Modern Australian", "Breakfast", "Burgers", "Coffee", "Curry"],
              "priceRange": "$$"
            })
          }}
        />
        <CartProvider>
          <Navbar />
          <CartShell />
          {children}
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}