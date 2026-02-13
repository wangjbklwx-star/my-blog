import type { Metadata } from 'next';
import { Geist, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/footer';
import { description, title } from './layout.config';
import './global.css';
import 'katex/dist/katex.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { MessageSquare } from 'lucide-react'; // 如果没有 lucide-react，可以去掉图标

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
          {/* 顶部导航栏 */}
          <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
              {/* Logo */}
              <a href="/" className="font-bold text-lg">{title}</a>
              
              {/* 导航菜单 */}
              <nav className="flex items-center gap-6">
                <a href="/" className="text-sm hover:text-blue-500 transition-colors">首页</a>
                <a href="/docs" className="text-sm hover:text-blue-500 transition-colors">文档</a>
                <a href="/blog" className="text-sm hover:text-blue-500 transition-colors">博客</a>
                
                {/* 去论坛按钮 */}
                <a 
                  href="https://bb.wangjb.eu.cc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  去论坛
                </a>
              </nav>
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
