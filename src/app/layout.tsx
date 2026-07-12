import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dessie City Administration | Official Government Portal",
  description:
    "Official digital portal of Dessie City Administration, Amhara Region, Ethiopia. Citizen services, news, events, tourism, investment opportunities, smart city initiatives, and more from the Office of the Mayor.",
  keywords: [
    "Dessie", "Dessie City", "Dessie City Administration", "Mayor of Dessie",
    "Amhara Region", "Ethiopia", "city government", "smart city",
    "citizen services", "tourism", "investment", "municipality",
  ],
  authors: [{ name: "Dessie City Administration — Communication Office" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Dessie City Administration | Official Government Portal",
    description: "Smart City Portal — Office of the Mayor, Dessie, Amhara, Ethiopia",
    siteName: "Dessie City Administration",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dessie City Administration",
    description: "Official Smart City Government Portal — Dessie, Ethiopia",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}