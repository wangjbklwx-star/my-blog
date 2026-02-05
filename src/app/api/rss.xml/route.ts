import { Feed } from 'feed';
import { getPosts } from '@/lib/source';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-static';

const escapeForXML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// 直接从文件读取文章全文
const getPostContent = (slug: string): string => {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      // 移除 frontmatter (---...---)
      return content.replace(/^---[\s\S]*?---\n*/, '').trim();
    }
    
    return '';
  } catch (error) {
    console.error(`Failed to read ${slug}:`, error);
    return '';
  }
};

// 将 Markdown 转为纯文本
const markdownToText = (markdown: string): string => {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/>/g, '')
    .replace(/-\s/g, '')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

export const GET = async () => {
  const baseUrl = new URL('https://wangjb.appinn.me');

  const feed = new Feed({
    title: '王浚博的博客',
    description: '有什么好玩————科技划界，拒绝平庸',
    id: baseUrl.href,
    copyright: 'wangjb.appinn.me',
    link: baseUrl.href,
    feed: new URL('/api/rss.xml', baseUrl).href,
    updated: new Date(),
    favicon: new URL('/favicon.ico', baseUrl).href,
    author: {
      name: 'Silas',
      link: 'https://wangjb.appinn.me',
    },
  });

  const posts = getPosts();

  for (const post of posts) {
    // 从 URL 提取 slug
    const slug = post.url.replace(/^\/|\/$/g, '').split('/').pop() || '';
    const fullContent = getPostContent(slug);
    const textContent = markdownToText(fullContent);
    
    const imageParams = new URLSearchParams();
    imageParams.set('title', post.data.title);
    imageParams.set('description', post.data.description ?? '');

    feed.addItem({
      title: post.data.title,
      description: post.data.description || textContent.slice(0, 200) + (textContent.length > 200 ? '...' : ''),
      content: escapeForXML(fullContent),
      link: new URL(post.url, baseUrl).href,
      image: {
        title: post.data.title,
        type: 'image/png',
        url: escapeForXML(new URL(`/api/og?${imageParams}`, baseUrl).href),
      },
      date: post.data.date,
      author: [
        {
          name: 'Silas',
          link: 'https://wangjb.appinn.me',
        },
      ],
    });
  }

  return new Response(feed.atom1(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
