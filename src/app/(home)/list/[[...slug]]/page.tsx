import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { title as homeTitle, postsPerPage } from '@/app/layout.config';
import { Pagination } from '@/components/pagination';
import { PostCard } from '@/components/post-card';
import { getPostsSortedByDate } from '@/lib/source';

export const dynamicParams = false;

const totalPosts = getPostsSortedByDate().length;
const postCount = Math.ceil(totalPosts / postsPerPage);

const Page = async (props: PageProps<'/list/[[...slug]]'>) => {
  const params = await props.params;
  const pageIndex = params.slug ? Number.parseInt(params.slug[0], 10) - 1 : 0;
  if (pageIndex < 0 || pageIndex >= postCount) notFound();

  const startIndex = pageIndex * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const posts = getPostsSortedByDate().slice(startIndex, endIndex);

  return (
    <>
      <h1 className='text-3xl font-bold mb-4'>
        文章列表
      </h1>
      <div className='flex flex-col gap-4 text-left'>
        {posts.map((post) => {
          const date = new Date(post.data.date).toLocaleDateString('zh-CN', {
            timeZone: 'Asia/Shanghai',
          });
          return (
            <PostCard
              title={post.data.title}
              description={post.data.description ?? ''}
              url={post.url}
              date={date}
              key={post.url}
            />
          );
        })}
      </div>
      <div className='mt-6'>
        <Pagination current={pageIndex + 1} end={postCount} path='/list' />
      </div>
    </>
  );
};

export default Page;

export const generateStaticParams = () => {
  const slugs = Array.from({ length: postCount }, (_, index) => ({
    slug: [(index + 1).toString()],
  }));

  return [{ slug: [] }, ...slugs];
};

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> => {
  const params = await props.params;
  const slug = params.slug;

  const index = slug ? ` - 第${slug[0]}页` : '';
  const title = `${homeTitle} | 文章列表${index}`;

  return {
    title,
    openGraph: {
      title,
      images: '/api/og',
      url: `/list/${slug ? slug[0] : ''}`,
      siteName: homeTitle,
    },
    twitter: {
      title,
      images: '/api/og',
    },
    alternates: {
      canonical: '/list',
      types: {
        'application/rss+xml': '/api/rss.xml',
      },
    },
  };
};
