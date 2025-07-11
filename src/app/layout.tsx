import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import { ApolloProviderWrapper } from '@/components/apollo-provider';
import { Footer } from '@/components/footer';
import { Navigation } from '@/components/navigation';
import { FilterProvider } from '@/contexts/filter-context';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hub Community - Conecte-se com a Comunidade Tech',
  description:
    'Descubra comunidades de tecnologia incríveis e participe dos melhores eventos da sua região',
  keywords: 'tecnologia, comunidades, eventos, programação, desenvolvimento',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ApolloProviderWrapper>
          <FilterProvider>
            <Navigation />
            {children}
            <Footer />
          </FilterProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
