import Link from 'next/link';

// 改为正确的函数组件，返回 JSX
function FaviconIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img 
      src="https://wangjb.appinn.me/favicon.ico" 
      alt="favicon" 
      width={32} 
      height={32}
      {...props}
    />
  );
}

export const Footer = () => {
  return (
    <footer className='mt-auto border-t border-fd-border/50 bg-fd-card py-12'>
      <div className='flex items-center justify-center gap-2'>
        <p className='text-sm text-fd-muted-foreground'>
          &copy; {new Date().getFullYear()} wangjb.appinn.me
        </p>
        <Link
          href='https://wangjb.appinn.me'
          target='_blank'
          rel='noreferrer'
          className='text-fd-muted-foreground transition-colors hover:text-fd-primary'
          aria-label='View Website'
        >
          <FaviconIcon className='size-5'/>
        </Link>
      </div>
    </footer>
  );
};
