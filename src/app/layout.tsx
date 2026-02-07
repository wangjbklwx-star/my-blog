import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/footer';
import { description, title } from './layout.config';
import './global.css';
import 'katex/dist/katex.css';
import { RootProvider } from 'fumadocs-ui/provider/next';

const geist = Geist({
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

const Layout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      className={`${geist.className} ${jetbrains.variable} antialiased`}
    >
      <head>
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/@waline/client@v3/dist/waline.css" 
        />
      </head>
      <body className='flex min-h-dvh flex-col'>
        <RootProvider
          i18n={{
              locale: "cn",
              translations: {
                toc: "目录",
                previousPage: "上一页",
                nextPage: "下一页",
              },
          }}
        >
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
};

export default Layout;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://wangjb.appinn.me',
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    images: '/api/og',
  },
  twitter: {
    title,
    description,
    images: '/api/og',
  },
};
