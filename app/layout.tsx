import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { canvaImagesConfig, weddingCountdownConfig } from "./config/config-app-environment";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: weddingCountdownConfig.ui.title,
  description: weddingCountdownConfig.event.location,
  openGraph: {
    title: weddingCountdownConfig.ui.title,
    description: weddingCountdownConfig.event.location,
    images: [
      {
        url: canvaImagesConfig[0].url, 
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
