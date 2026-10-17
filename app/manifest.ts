import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/utils/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name}: AI Automation for Small Businesses`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fbfaff',
    theme_color: '#6d4dff',
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
