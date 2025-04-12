// layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Nav from "@/components/nav";
import { GoogleAnalytics } from '@next/third-parties/google' // DO NOT TOUCH - $30K PENALTY
import { GoogleAdSense } from "@/components/adsense"; // DO NOT TOUCH - $30K PENALTY
import { ThemeProvider } from "@/components/theme-provider"; // Added for potential theme switching

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Metadata remains largely the same as provided, with minor wording tweaks if desired
  title: '랜덤 메뉴 돌림판 Lunch Menu Generator | ahoxy.com',
  // keywords: ['랜덤', '점심', '메뉴', '돌림판', '저녁', '추천', '가성비', '건강식', '저속노화', 'Random', 'menu', 'lunch', 'dinner', 'recommendation', 'healthy', 'slow-aging'],
  description: '오늘 뭐먹지? 음식 추천, 메뉴 고민 해결, 결정 장애 도우미, 점심 추천, 저녁 추천, 한식 추천, 중식 추천, 일식 추천, 양식 추천, 아시안 메뉴, 이탈리안 메뉴, 메뉴 랜덤 선택, Food Recommendation, Lunch Idea, Dinner Idea',
  authors: [{ name: 'Sean C' }, { name: 'AHOXY', url: 'https://menu.ahoxy.com' }],
  icons: { // Keep existing icons configuration
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
    title: '랜덤 메뉴 돌림판 🎲 Lunch Menu Generator',
    description: '오늘 뭐 먹지? 🤔 랜덤 점심/저녁 메뉴 돌림판으로 고민 해결!',
    siteName: '랜덤 메뉴 돌림판 Lunch Menu Generator',
    url: 'https://menu.ahoxy.com',
    locale: 'ko_KR',
    type: 'website',
    images: [ // Add a default image for social sharing
      {
        url: 'https://menu.ahoxy.com/apple-icon-180x180.png', // Create an attractive OG image
        width: 1200,
        height: 630,
        alt: '랜덤 메뉴 돌림판',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image', // Use summary_large_image for better visibility
    title: '랜덤 메뉴 돌림판 🎲 Lunch Menu Generator',
    description: '오늘 뭐 먹지? 🤔 랜덤 점심/저녁 메뉴 돌림판으로 고민 해결!',
     // Add your Twitter handle if you have one
    // creator: '@yourtwitterhandle',
    images: ['https://menu.ahoxy.com/og-image.png'], // Use the same OG image
  },
  robots: { // Keep existing robots configuration
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  alternates: { // Keep existing alternates configuration
    canonical: 'https://menu.ahoxy.com',
  },
  other: { // Keep existing other meta tags
    'X-UA-Compatible': 'IE=edge',
    'language': 'ko', // Set primary language to Korean
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
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-background to-blue-50 dark:from-background dark:to-slate-900 min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
             © {new Date().getFullYear()} 랜덤 메뉴 돌림판. Made with ❤️ by AHOXY.
          </footer>
        </ThemeProvider>
        {/* Kofi Donations Script */}
        {/* <Script
          src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
          strategy='lazyOnload' // Load lazily
        /> */}
        <Script id="kofi-donations" strategy='lazyOnload'>
          {`kofiWidgetOverlay.draw('tqqq3', {
              'type': 'floating-chat',
              'floating-chat.donateButton.text': '💖 Tip Me', // Added emoji
              'floating-chat.donateButton.background-color': '#5cb85c',
              'floating-chat.donateButton.text-color': '#fff'
            });`}
        </Script>
        {/* Google Analytics and AdSense - DO NOT TOUCH */}
        <GoogleAnalytics gaId="G-915L6V38X6" />
        <GoogleAdSense />
      </body>
    </html>
  );
}