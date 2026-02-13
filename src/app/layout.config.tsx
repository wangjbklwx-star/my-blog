import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { MessageSquare, Newspaper, Rss, Tags } from 'lucide-react';

export const title = '王浚博的博客';
export const description = "有什么好玩————科技划界，拒绝平庸";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title,
  },
};

export const linkItems: LinkItemType[] = [
  {
    icon: <Newspaper />,
    text: 'Posts',
    url: '/list',
    active: 'url',
  },
  {
    icon: <Tags />,
    text: 'Tags',
    url: '/tags',
    active: 'url',
  },
  {
    icon: <MessageSquare />,
    text: '论坛',
    url: 'https://bb.wangjb.eu.cc/',
    active: 'url',
    external: true,
  },
  {
    type: 'icon',
    label: 'rss',
    icon: <Rss />,
    text: 'RSS',
    url: '/api/rss.xml',
  },
];

export const postsPerPage = 5;
