import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

const SITE_TITLE = 'Kz Creation Notes';
const SITE_DESCRIPTION = 'Kz Creation blog';

export async function GET(ctx: any) {
  const posts = await getCollection('blog');
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: ctx.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
  });
}
