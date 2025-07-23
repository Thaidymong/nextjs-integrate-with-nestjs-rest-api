import { Viewport } from 'next';
import { Koh_Santepheap } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import { siteConfig } from '@/common/config';

const kohSantepheap = Koh_Santepheap({
  subsets: ['khmer', 'latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  authors: [{ name: 'Nextjs App', url: 'https://www.nextjsapp.com' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: '#2980B9',
  },
  icons: '/favicon.ico',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name='apple-mobile-web-app-title' content='Attendance' />
      </head>
      <body className={`${kohSantepheap.className}`}>
        <Toaster
          richColors
          style={{
            fontFamily: kohSantepheap.style.fontFamily,
            fontSize: '11pt',
          }}
        />
        {children}
      </body>
    </html>
  );
}
