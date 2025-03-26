import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/custom-animations.css";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/leaflet-custom.css"; // Add Leaflet custom styles

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nepal Earthquake Survival Simulation",
  description: "Interactive AI-based earthquake survival simulation game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased ${inter.className}`}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
