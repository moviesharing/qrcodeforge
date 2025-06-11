// app/sitemap.xml/route.ts

const BASE_URL = 'https://qrcodeforge.pages.dev'; // Update this if your domain changes

export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const pages = [
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/generator', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
    { url: '/terms-and-conditions', changeFrequency: 'monthly', priority: 0.5 },
    // Add any new static pages here
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${BASE_URL}${page.url}</loc>
      <lastmod>${today}</lastmod>
      <changefreq>${page.changeFrequency}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
