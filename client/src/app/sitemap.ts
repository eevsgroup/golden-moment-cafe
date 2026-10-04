import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace this with your actual production domain when you deploy
  const baseUrl = 'https://goldenmoment.com.au';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Once you add more routes like /menu, /about, /reservation, they go here:
    // {
    //   url: `${baseUrl}/menu`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
