import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/nav";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '랜덤 메뉴 돌림판 Lunch Menu Generator',
  keywords: ['랜덤, 점심, 메뉴, 돌림판, Lunch, Menu, Generator, 저녁, 추천, 가성비'],
  description: '랜덤 점심 메뉴 돌림판 Lunch Menu Generator',
  authors: [{ name: 'Sean C' }, { name: 'Josh', url: 'https://menu.ahoxy.com' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: '랜덤 메뉴 돌림판 Lunch Menu Generator',
    description: '랜덤 점심 메뉴 돌림판 Lunch Menu Generator',
    siteName: '랜덤 메뉴 돌림판 Lunch Menu Generator',
    url: 'https://menu.ahoxy.com',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '랜덤 메뉴 돌림판 Lunch Menu Generator',
    description: '랜덤 점심 메뉴 돌림판 Lunch Menu Generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: {
    canonical: 'https://menu.ahoxy.com',
  },
  other: {
    'X-UA-Compatible': 'IE=edge',
    'language': 'en',
    'yeti' : 'index, follow',
    'bingbot':  'index, follow',
    'yandexbot':  'index, follow',
    'pinterest': 'index, follow',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}><Nav />{children}</body>
      {/* Kofi Donations */}
      <Script 
        src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js' 
        strategy='beforeInteractive' />
      <Script id="kofi-donations" strategy='beforeInteractive'>
        {`kofiWidgetOverlay.draw('tqqq3', {
            'type': 'floating-chat',
            'floating-chat.donateButton.text': 'Tip Me',
            'floating-chat.donateButton.background-color': '#5cb85c',
            'floating-chat.donateButton.text-color': '#fff'
          });`}
      </Script>
      <GoogleAnalytics gaId="G-49WKX1K760" />
    </html>
  );
}
