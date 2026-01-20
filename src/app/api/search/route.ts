import { createSearchAPI } from 'fumadocs-core/search/server';
import { getPosts } from '@/lib/source';
import { createTokenizer } from "@orama/tokenizers/mandarin";

export const { GET } = createSearchAPI('advanced', {
  indexes: getPosts().map((post) => ({
    title: post.data.title,
    structuredData: post.data.structuredData,
    id: post.url,
    url: post.url,
  })),
  tokenizer: createTokenizer()
});
