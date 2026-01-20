import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import { getPostsSortedByDate } from '@/lib/source';

const Page = () => {
  const posts = getPostsSortedByDate().slice(0, 3);

  return (
    <section className="py-12 space-y-8">
      <div className="flex items-end justify-between border-b border-fd-border/50 pb-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
            不求谌解
          </h2>
          <p className="text-sm text-fd-muted-foreground">
            有关技术思考与生活笔记
          </p>
        </div>

        <Link
          href="/list"
          className="group flex items-center gap-1 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-primary"
        >
          文章列表
          <svg
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => {
          const date = new Date(post.data.date).toLocaleDateString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
          
          return (
            <PostCard
              key={post.url}
              title={post.data.title}
              description={post.data.description ?? ''}
              url={post.url}
              date={date}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Page;