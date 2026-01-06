import type { Metadata } from "next";
// Temporarily disabled Google Fonts due to network restrictions
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

// Fallback to system fonts
const geistSans = {
  variable: "--font-geist-sans",
};

const geistMono = {
  variable: "--font-geist-mono",
};

export const metadata: Metadata = {
  title: "SUPERPROF - Trouvez le professeur idéal",
  description: "Plus de 2,800 professeurs experts dans toutes les matières. Cours à domicile, en ligne ou chez le professeur.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
