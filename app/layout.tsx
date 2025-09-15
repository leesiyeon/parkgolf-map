import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

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
  keywords: "파크골프장, 파크골프, 골프장, 지도, 전국, 현황, 위치",
  authors: [{ name: "파크골프맵" }],
  creator: "파크골프맵",
  publisher: "파크골프맵",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-icon',
    },
  },
  manifest: '/manifest',
  verification: {
    google: 'xoHssXt3pbecMM_vnU50q5z6hlRJ6Vq8oSO0_P4oQ-Q',
    other: {
      'naver-site-verification': '708f4e693ae9ffdc8b8690e7da1fd003da637eb4',
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
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
