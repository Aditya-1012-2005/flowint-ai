import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/utils/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: string; priority: number }[] = [
    { path: '', priority: 1 },
    { path: '/solutions', priority: 0.9 },
    { path: '/contact', priority: 0.8 },
    { path: '/about', priority: 0.6 },
  ];

  return pages.map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
