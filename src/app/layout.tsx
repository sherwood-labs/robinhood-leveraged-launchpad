import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header, WalletModal } from "@/components/Header";
import { AppState } from "@/components/state";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

const DESCRIPTION =
  "Sherwood Labs. Launch a coin on Robinhood Chain that funds its own leveraged portfolio and burns itself with the profit.";

export const metadata: Metadata = {
  title: { default: "Sherwood Labs", template: "%s · Sherwood" },
  description: DESCRIPTION,
  icons: { icon: "/emblem.png" },
  openGraph: {
    title: "Sherwood Labs",
    description: DESCRIPTION,
    siteName: "Sherwood",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} ${plex.variable} h-full antialiased`}>
      <body className="min-h-full bg-pine font-sans text-paper">
        <AppState>
          <Header />
          <WalletModal />
          {children}
          <Footer />
        </AppState>
      </body>
    </html>
  );
}
