import { Tag } from 'lucide-react';
import Link from 'next/link';
import { getPostsByTag } from '@/lib/source';

export const TagCard = ({
  name,
  displayCount = false,
}: {
  name: string;
  displayCount?: boolean;
}) => {
  const numOfPosts = getPostsByTag(name);
  const count = numOfPosts.length;

  return (
    <Link
      href={`/tags/${name}`}
      className="
        group inline-flex items-center gap-1.5 
        px-3 py-1 
        text-sm font-medium
        rounded-md
        bg-fd-secondary text-fd-secondary-foreground
        transition-all duration-300 ease-out
        hover:bg-fd-accent hover:text-fd-accent-foreground
        dark:hover:bg-fd-primary dark:hover:text-fd-primary-foreground
        hover:scale-105
      "
    >
      <Tag 
        size={14} 
        className="opacity-60 transition-opacity group-hover:opacity-100" 
      />
      
      <span>{name}</span>
      
      {displayCount && (
        <span className="ml-0.5 text-xs opacity-60">
          {count}
        </span>
      )}
    </Link>
  );
};