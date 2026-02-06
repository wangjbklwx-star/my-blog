import { Feed } from 'feed';
import { getPosts } from '@/lib/source';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export const dynamic = 'force-static';

const escapeForXML = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// 获取文章全文
const getPostContent = (slug: string): string => {
  try {
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return content.replace(/^---[\s\S]*?---\n*/, '').trim();
    }
    return '';
  } catch (error) {
    console.error(`Failed to read ${slug}:`, error);
    return '';
  }
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
    const slug = post.url.replace(/^\/|\/$/g, '').split('/').pop() || '';
    const markdownContent = getPostContent(slug);
    const htmlContent = await marked(markdownContent);
    
    // 修复：正确构建 OG 图片 URL，避免空格
    const imageUrl = new URL('/api/og', baseUrl);
    imageUrl.searchParams.set('title', post.data.title);
    if (post.data.description) {
      imageUrl.searchParams.set('description', post.data.description);
    }
    
    feed.addItem({
      title: post.data.title,
      description: post.data.description || markdownContent.slice(0, 200).replace(/\n/g, ' '),
      content: htmlContent,
      link: new URL(post.url, baseUrl).href,
      // 修复：使用正确的 enclosure 格式
      enclosure: {
        url: imageUrl.href,
        type: 'image/png',
        title: post.data.title,
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
