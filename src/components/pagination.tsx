import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

const PaginationButton = ({
  children,
  href,
  disabled,
  label,
}: {
  children: ReactNode;
  href: string;
  disabled?: boolean;
  label: string;
}) => {
  const baseClassName = `
    flex h-9 w-9 items-center justify-center rounded-full
    transition-all duration-300 ease-out
    text-fd-secondary-foreground
  `;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        className={`${baseClassName} bg-fd-secondary/50 opacity-40 cursor-not-allowed`}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={`
        ${baseClassName}
        bg-fd-secondary
        hover:scale-110
        hover:bg-fd-accent hover:text-fd-accent-foreground
        dark:hover:bg-fd-primary dark:hover:text-fd-primary-foreground
      `}
    >
      {children}
    </Link>
  );
};

export const Pagination = ({
  current,
  end,
  path,
}: {
  current: number;
  end: number;
  path: string;
}) => {
  return (
    <nav 
      role="navigation" 
      aria-label="Pagination"
      className="flex items-center justify-center gap-3 py-8"
    >
      <PaginationButton 
        href={`${path}/${current - 1}`} 
        disabled={current === 1}
        label="Go to previous page"
      >
        <ChevronLeft size={16} />
      </PaginationButton>

      <div className="flex items-center gap-1 px-4 text-sm font-medium text-fd-muted-foreground">
        <span className="text-fd-foreground">{current}</span>
        <span className="opacity-50">/</span>
        <span>{end}</span>
      </div>

      <PaginationButton 
        href={`${path}/${current + 1}`} 
        disabled={current === end}
        label="Go to next page"
      >
        <ChevronRight size={16} />
      </PaginationButton>
    </nav>
  );
};