import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bitcoin, Ethereum and other cryptocurrencies | Velo',
  description:
    'Buy and sell bitcoin, ethereum and other cryptoactives with credibility. Open your account.',
};

import Header from '@/components/header';
import AcceptCookies from '@/components/acceptCookies';
import RealTimePriceCryptoContext from '@/utils/context/realTimePriceCryptoContext';

const inter = Poppins({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  style: 'normal',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesAccepted = cookies().has('cookiesAccepted');

  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/assets/imgs/velo-logo.png" sizes="64x64" />
      </head>
      <body>
        <NextTopLoader showSpinner={false} color="#549cffff" shadow={false} />
        <Header />
        {!cookiesAccepted && <AcceptCookies />}
        <RealTimePriceCryptoContext>{children}</RealTimePriceCryptoContext>
      </body>
    </html>
  );
}
