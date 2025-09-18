import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "AR | Web Developer",
  description: "Personal expertise website of ABDUL REHMAN, showcasing skills, services, and portfolio with a smooth, animated, and responsive design.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>AR | Web Developer</title>
        <link rel="preload" href="/PM.png" as="image" fetchPriority="high" />
        <style>{`
          .hero-text { font-display: swap; }
          .critical-above-fold { contain: layout style paint; }
        `}</style>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${comfortaa.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
