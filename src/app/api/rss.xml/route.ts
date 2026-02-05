import { Feed } from 'feed';
import { getPosts } from '@/lib/source';

export const dynamic = 'force-static';

const escapeForXML = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// 获取文章全文的函数
const getPostContent = async (slug: string): Promise<string> => {
  try {
    // 尝试从 source 获取正文内容
    const { getPost } = await import('@/lib/source');
    const post = await getPost(slug);
    
    if (post?.content) {
      // 如果有 content，返回 HTML 或纯文本
      return post.content;
    }
    
    // 备选方案：直接读取 MDX 文件
    const fs = await import('fs');
    const path = await import('path');
    
    const contentDir = path.join(process.cwd(), 'content');
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      // 移除 frontmatter，返回正文
      return content.replace(/^---[\s\S]*?---\n*/, '').trim();
    }
    
    return '';
  } catch (error) {
    console.error(`Failed to get content for ${slug}:`, error);
    return '';
  }
};

// 将 Markdown/MDX 转为纯文本（用于 RSS description）
const markdownToText = (markdown: string): string => {
  return markdown
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/`([^`]+)`/g, '$1') // 移除行内代码标记
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接转为文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/#{1,6}\s/g, '') // 移除标题标记
    .replace(/\*\*|__/g, '') // 移除粗体
    .replace(/\*|_/g, '') // 移除斜体
    .replace(/>/g, '') // 移除引用
    .replace(/-\s/g, '') // 移除列表标记
    .replace(/\n\s*\n/g, '\n') // 合并空行
    .trim();
};

export const GET = async () => {
  // 修复：正确的 URL 格式（双斜杠）
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
    // 获取文章全文
    const fullContent = await getPostContent(post.data.slug || post.url.split('/').pop() || '');
    const textContent = markdownToText(fullContent);
    
    const imageParams = new URLSearchParams();
    imageParams.set('title', post.data.title);
    imageParams.set('description', post.data.description ?? '');

    feed.addItem({
      title: post.data.title,
      // 使用全文作为 content，纯文本作为 description
      description: post.data.description || textContent.slice(0, 200) + (textContent.length > 200 ? '...' : ''),
      content: escapeForXML(fullContent), // 全文内容（HTML 格式）
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
