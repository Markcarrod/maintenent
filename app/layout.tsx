import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BuyerRadar | High-Converting Websites for Local Businesses',
  description: 'BuyerRadar is a digital growth agency building fast, conversion-engineered websites for restaurants, contractors, and cleaning services.',
  metadataBase: new URL('https://buyerradar.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
