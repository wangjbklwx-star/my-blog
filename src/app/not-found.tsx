import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { getLinks } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';
import { Header } from '@/components/header';
import { InlineLink } from '@/components/inline-link';
import { baseOptions, linkItems } from './layout.config';

const NotFound = () => {
  return (
    <HomeLayout
      {...baseOptions}
      links={linkItems}
      nav={{
        component: (
          <Header
            finalLinks={getLinks(linkItems, baseOptions.githubUrl)}
            {...baseOptions}
          />
        ),
      }}
    >
      <div className='my-12 space-y-4 text-center'>
        <p className='text-4xl font-bold'>404 Not Found</p>
        <p className='text-lg'>
          <span className='block md:inline'>
            找不到该文章，文章地址可能已经改变。
          </span>
          <span className='block md:inline'>
            返回<InlineLink href='/list'>文章列表</InlineLink>
          </span>
        </p>
      </div>
    </HomeLayout>
  );
};

export default NotFound;
