import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/nav";
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleAdSense } from "@/components/adsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '랜덤 메뉴 돌림판 Lunch Menu Generator',
  keywords: ['랜덤, 점심, 메뉴, 돌림판, Lunch, Menu, Generator, 저녁, 추천, 가성비'],
  description: '랜덤 점심 메뉴 돌림판 Lunch Menu Generator',
  authors: [{ name: 'Sean C' }, { name: 'Josh', url: 'https://menu.ahoxy.com' }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon-precomposed.png',
      },
    ],
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
      follow: true,
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
      <body className={inter.className}><Nav />{children}
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
      </body>
      <GoogleAnalytics gaId="G-49WKX1K760" />
      <GoogleAdSense />
    </html>
  );
}
