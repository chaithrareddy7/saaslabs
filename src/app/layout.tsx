import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getGlobalContent } from '@/lib/api/wordpress';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'JustCall - Help Your Team Sell Better, Every Day',
  description:
    'JustCall gives sales managers a system that protects speed, enforces follow-ups, and surfaces problems early.',
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const page = await getGlobalContent();
  const acf = page?.acf ?? null;

  return (
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased font-sans">
        <Header acf={acf} />
        {children}
        <Footer acf={acf} />
      </body>
    </html>
  );
}
