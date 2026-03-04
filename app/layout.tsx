import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx

export const metadata: Metadata = {
  title: "SQLD DRILL",
  description: "가장 빠르고 확실한 SQLD 기출 반복 숙달 도구",
  openGraph: {
    title: "SQLD DRILL",
    description: "가장 빠르고 확실한 SQLD 기출 반복 숙달 도구",
    url: "https://your-project-name.vercel.app",
    siteName: "SQLD DRILL",
    locale: "ko_KR",
    type: "website",
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
