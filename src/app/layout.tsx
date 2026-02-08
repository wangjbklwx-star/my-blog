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

const Layout = ({ children }: { children: React.ReactNode }) => {
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
          {/* 顶部导航栏 - 降低 z-index，移除 fixed/sticky 冲突 */}
          <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center">
              {/* Logo */}
              <a href="/" className="font-bold text-lg">{title}</a>
            </div>
          </header>
          
          {/* 主内容区域 */}
          <main className="flex-1">
            {children}
          </main>
          
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
