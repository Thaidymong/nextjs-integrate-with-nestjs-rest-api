import { siteConfig } from '@/common/config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: 'moc-attendance',
    short_name: 'Attendance',
    description: siteConfig.description,
    start_url: '/',
    background_color: '#2980B9',
    theme_color: '#2980B9',
    display: 'standalone',
    orientation: 'portrait',
    display_override: ['standalone'],
    scope: '/',
    prefer_related_applications: false,
    icons: [
      {
        src: '/favicon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
