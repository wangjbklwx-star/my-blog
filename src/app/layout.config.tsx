import type { LinkItemType } from 'fumadocs-ui/layouts/links';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Newspaper, Rss, Tags } from 'lucide-react';

export const title = '不求谌解';
export const description = "💻 Web Dev / Creative 💗 ⚽ 🎧 🏓";

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
    type: 'icon',
    label: 'rss',
    icon: <Rss />,
    text: 'RSS',
    url: '/api/rss.xml',
  },
];

export const postsPerPage = 5;
