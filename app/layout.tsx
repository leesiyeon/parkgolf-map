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
  verification: {
    google: 'xoHssXt3pbecMM_vnU50q5z6hlRJ6Vq8oSO0_P4oQ-Q',
    other: {
      'naver-site-verification': '0e79735c0e5697d2a90c1eac0c084c7c9e58c108',
    },
  },
  other: {
    'google-adsense-account': 'ca-pub-1014042036964348',
  },
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
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1014042036964348"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8Q9BL927B7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8Q9BL927B7');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
