import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import 'the-new-css-reset/css/reset.css';
import '../styles/globals.scss';
import { ReactNode } from 'react';
import Providers from '@/scripts/Providers';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

const lato = Lato({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const metadata: Metadata = {
  title: 'ProjBoost | Generate Coding Tasks & Projects for All Skill Levels',
  description: 'Elevate your coding journey with ProjBoost - a versatile task generator for programmers of all levels. From practice exercises to complex projects, boost your skills and creativity.'
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
    <Providers>
      <body className={lato.className}>
      <Header />
      {children}
      <Footer />
      </body>
    </Providers>
    </html>
  );
}
