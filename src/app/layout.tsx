import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import { LangProvider } from "@/lib/LangContext";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/layout/Chatbot";
import VisitorCounter from "@/components/VisitorCounter";
import { db } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://dessiecity.gov.et";
const siteName = "Dessie City Administration";
const siteDescription =
  "Official digital portal of Dessie City Administration — the capital of South Wollo Zone, Amhara Region, Ethiopia. Access citizen services, government news, investment opportunities, tourism, vacancies, and smart city initiatives from the Office of the Mayor.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dessie City Administration | Official Government Portal",
    template: "%s | Dessie City Administration",
  },
  description: siteDescription,
  keywords: [
    // Core city terms
    "Dessie", "Dessie City", "Dessie City Administration", "Dessie Municipality",
    "Mayor of Dessie", "Dessie Mayor Office", "Dessie Government",
    // Regional terms
    "South Wollo", "South Wollo Zone", "Wollo", "Wollo Ethiopia",
    "Kombolcha", "Kombolcha City", "Kombolcha Industrial Park",
    "Bete Hor", "Hayk", "Wegel Tena", "Kalu", "Ambassel",
    "Bambwah", "Bambuwah", "Tita", "Kutaber",
    "North Wollo", "North Wollo Zone",
    // Amhara region
    "Amhara Region", "Amhara Regional State", "Ethiopia",
    "Amhara Government", "Ethiopia Government Portal",
    // City services
    "Dessie citizen services", "Dessie online services",
    "Dessie birth registration", "Dessie business license",
    "Dessie building permit", "Dessie land services",
    "Dessie tax payment", "Dessie ID card",
    // Tourism
    "Dessie tourism", "Wollo tourism", "South Wollo tourism",
    "Hayk Lake", "Hayk Monastery", "Tossa Waterfall",
    "Wollo culture", "Ethiopian highlands tourism",
    "Dessie market", "Dessie cultural heritage",
    // Investment
    "Dessie investment", "South Wollo investment",
    "Kombolcha industrial zone", "Ethiopia investment",
    "Amhara investment opportunities", "Dessie economy",
    // Smart city
    "Dessie smart city", "digital government Ethiopia",
    "e-government Ethiopia", "Dessie digital services",
    // Education & health
    "Wollo University", "Dessie Referral Hospital",
    "Dessie schools", "Dessie health services",
    // Keywords in Amharic romanization
    "Dese", "Desse", "Wello", "Amhara", "ደሴ", "ወሎ",
    // General government
    "Ethiopian city portal", "municipality Ethiopia",
    "city administration Ethiopia", "urban development Ethiopia",
  ],
  authors: [{ name: "Dessie City Administration — Communication Office" }],
  creator: "Dessie City Administration",
  publisher: "Dessie City Administration",
  category: "Government",
  classification: "Government / Public Administration",
  generator: "Next.js",
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/dessie-logo.png", type: "image/png" },
    ],
    apple: "/dessie-logo.png",
    shortcut: "/dessie-logo.png",
  },
  manifest: "/manifest.json",

  openGraph: {
    title: "Dessie City Administration | Official Government Portal",
    description: siteDescription,
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_US",
    alternateLocale: ["am_ET"],
    images: [
      {
        url: `${siteUrl}/dessie-city-hall.png`,
        width: 1200,
        height: 630,
        alt: "Dessie City Hall — South Wollo, Amhara Region, Ethiopia",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Dessie City Administration | Official Portal",
    description: "Official smart city government portal — Dessie, South Wollo, Amhara, Ethiopia",
    images: [`${siteUrl}/dessie-city-hall.png`],
    site: "@DessieCity",
    creator: "@DessieCity",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add your actual codes when available)
  verification: {
    google: "add-your-google-search-console-code-here",
    // bing: "add-bing-verification-code",
  },

  // Alternate languages
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}/en`,
      "am-ET": `${siteUrl}/am`,
    },
  },

  // Other
  other: {
    "geo.region": "ET-AM",
    "geo.placename": "Dessie, South Wollo, Amhara Region, Ethiopia",
    "geo.position": "11.1333;39.6333",
    "ICBM": "11.1333, 39.6333",
    "DC.title": "Dessie City Administration Official Portal",
    "DC.creator": "Dessie City Administration",
    "DC.subject": "Government, City Administration, Ethiopia, South Wollo",
    "DC.description": siteDescription,
    "DC.publisher": "Dessie City Administration",
    "DC.language": "en",
    "DC.coverage": "Dessie, South Wollo, Amhara Region, Ethiopia",
    "og:country-name": "Ethiopia",
    "og:region": "Amhara",
    "og:locality": "Dessie",
    "og:postal-code": "1250",
    "og:street-address": "Dessie City Hall, Main Street",
    "og:latitude": "11.1333",
    "og:longitude": "39.6333",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a6b3c" },
    { media: "(prefers-color-scheme: dark)", color: "#0d4a28" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  let navItems = [];
  try {
    const all = await db.menuItem.findMany({ orderBy: { order: 'asc' } });
    const parents = all.filter((i: any) => !i.parentId && i.isVisible);
    navItems = parents.map((parent: any) => ({
      id: parent.pageId || 'home',
      label: parent.label,
      children: all
        .filter((c: any) => c.parentId === parent.id && c.isVisible)
        .map((child: any) => ({
          id: child.pageId || 'home',
          label: child.label,
          items: all
            .filter((sub: any) => sub.parentId === child.id && sub.isVisible)
            .map((sub: any) => ({ id: sub.pageId || 'home', label: sub.label }))
        }))
    }));
  } catch (error) {
    console.error("Failed to fetch nav items for layout:", error);
  }
  
  // Fallback to defaults if DB fails or is empty
  if (navItems.length === 0) {
    navItems = [
      { id: 'home', label: 'HOME' },
      { id: 'about', label: 'ABOUT' },
      { id: 'services', label: 'SERVICES' },
      { id: 'news', label: 'News & Media' },
      { id: 'contact', label: 'CONTACT' }
    ];
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Noto Sans Ethiopic — preloaded for reliable Amharic text rendering in nav and all pages */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              "name": "Dessie City Administration",
              "alternateName": ["Dessie Municipality", "ደሴ ከተማ አስተዳደር", "Desse City Administration"],
              "url": siteUrl,
              "logo": `${siteUrl}/official-logo.png`,
              "image": `${siteUrl}/dessie-city-hall.png`,
              "description": siteDescription,
              "foundingDate": "1945",
              "areaServed": [
                "Dessie", "South Wollo", "Wollo", "Kombolcha", "Amhara Region", "Ethiopia"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "City Hall, Main Street",
                "addressLocality": "Dessie",
                "addressRegion": "Amhara",
                "addressCountry": "ET",
                "postalCode": "1250"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.1333,
                "longitude": 39.6333
              },
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+251-33-111-0000",
                  "contactType": "customer service",
                  "email": "info@dessiecity.gov.et",
                  "availableLanguage": ["English", "Amharic"]
                }
              ],
              "sameAs": [
                "https://www.facebook.com/DessieCity",
                "https://www.twitter.com/DessieCity",
                "https://www.youtube.com/@DessieCity"
              ],
              "parentOrganization": {
                "@type": "GovernmentOrganization",
                "name": "Amhara Regional State Government",
                "url": "https://www.amhararegion.gov.et"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Citizen Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Birth Registration" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Business License" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Building Permit" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Land Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tax Payment" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ID Card Services" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marriage Certificate" } }
                ]
              }
            })
          }}
        />
        {/* BreadcrumbList Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteName,
              "url": siteUrl,
              "description": siteDescription,
              "inLanguage": ["en-US", "am-ET"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${siteUrl}/?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        {/* City/Place Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "City",
              "name": "Dessie",
              "alternateName": ["Desse", "ደሴ"],
              "description": "Dessie is the capital city of South Wollo Zone in the Amhara Region of Ethiopia, located in the highlands of the country.",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 11.1333,
                "longitude": 39.6333,
                "elevation": "2470 meters"
              },
              "containedInPlace": [
                {
                  "@type": "AdministrativeArea",
                  "name": "South Wollo Zone",
                  "containedInPlace": {
                    "@type": "State",
                    "name": "Amhara Regional State",
                    "containedInPlace": {
                      "@type": "Country",
                      "name": "Ethiopia",
                      "identifier": "ET"
                    }
                  }
                }
              ],
              "nearbyLocation": [
                { "@type": "City", "name": "Kombolcha" },
                { "@type": "City", "name": "Hayk" },
                { "@type": "City", "name": "Wegel Tena" },
                { "@type": "Place", "name": "Hayk Lake" },
                { "@type": "Place", "name": "Wollo University" }
              ]
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LangProvider>
            <div className="min-h-screen flex flex-col">
              <Header navItems={navItems} />
              <main className="flex-1">
                {children}
              </main>
              <VisitorCounter />
              <Footer />
            </div>
            <Chatbot />
          </LangProvider>
          <Toaster />
          <CookieConsent />
        </ThemeProvider>
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
        >
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: 'am,en' },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script
          id="google-translate-script"
          strategy="afterInteractive"
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />
      </body>
    </html>
  );
}
