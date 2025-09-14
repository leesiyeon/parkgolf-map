import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "전국 파크골프장 현황",
  description: "전국 파크골프장 위치를 지도에서 확인하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=0e0864229b42ff2775b3a82802207f66&autoload=false&libraries=services,clusterer"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
