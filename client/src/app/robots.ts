import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/order-confirmation', '/private/', '/api/'],
    },
    sitemap: 'https://goldenmoment.au/sitemap.xml',
  };
}
