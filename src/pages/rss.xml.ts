import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { readData } from '../lib/readData';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const site = readData('siteConfig.json') || {};
  const siteName = (site as { name?: string }).name || 'Melhores Binóculos';
  const siteDescription =
    (site as { description?: string }).description ||
    'Reviews, comparativos e guias para escolher o melhor binóculo.';

  return rss({
    title: `${siteName} — Reviews de Binóculos`,
    description: siteDescription,
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/${post.id}/`,
      })),
    customData: '<language>pt-br</language>',
  });
}
