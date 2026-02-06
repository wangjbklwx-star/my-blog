import { Feed } from 'feed';
import { getPosts } from '@/lib/source';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

export const dynamic = 'force-static';

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
    
    // 构建 OG 图片 URL
    const imageUrl = new URL('/api/og', baseUrl);
    imageUrl.searchParams.set('title', post.data.title);
    if (post.data.description) {
      imageUrl.searchParams.set('description', post.data.description);
    }

    feed.addItem({
      title: post.data.title,
      description: post.data.description || markdownContent.slice(0, 200).replace(/\n/g, ' '),
      // 在 content 里加上图片
      content: `<p><img src="${imageUrl.href}" alt="${post.data.title}"></p>` + htmlContent,
      link: new URL(post.url, baseUrl).href,
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
