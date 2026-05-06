const ALL_LOCATION_SLUGS = [
  // Kolkata Metro
  'interior-designer-kolkata',
  'interior-designer-howrah',
  'interior-designer-salt-lake',
  'interior-designer-new-town',
  // North Bengal
  'interior-designer-siliguri',
  'interior-designer-darjeeling',
  'interior-designer-jalpaiguri',
  'interior-designer-alipurduar',
  'interior-designer-cooch-behar',
  // Industrial Belt
  'interior-designer-durgapur',
  'interior-designer-asansol',
  'interior-designer-bardhaman',
  'interior-designer-west-burdwan',
  'interior-designer-east-burdwan',
  // South Bengal
  'interior-designer-kharagpur',
  'interior-designer-haldia',
  'interior-designer-west-midnapore',
  'interior-designer-east-midnapore',
  // Central Bengal
  'interior-designer-hooghly',
  'interior-designer-nadia',
  'interior-designer-krishnanagar',
  'interior-designer-ranaghat',
  'interior-designer-bolpur',
  'interior-designer-murshidabad',
  // 24 Parganas
  'interior-designer-north-24-parganas',
  'interior-designer-south-24-parganas',
  'interior-designer-barasat',
  'interior-designer-basirhat',
  // Jungle Mahal
  'interior-designer-purulia',
  'interior-designer-bankura',
];

const STATIC_PAGES = [
  { url: '/',           priority: '1.0', changefreq: 'weekly'  },
  { url: '/about',      priority: '0.8', changefreq: 'monthly' },
  { url: '/services',   priority: '0.9', changefreq: 'weekly'  },
  { url: '/projects',   priority: '0.8', changefreq: 'weekly'  },
  { url: '/pricing',    priority: '0.9', changefreq: 'weekly'  },
  { url: '/contact',    priority: '0.9', changefreq: 'monthly' },
  { url: '/blog',       priority: '0.8', changefreq: 'daily'   },
  { url: '/locations',  priority: '0.95', changefreq: 'monthly'},
];

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');

  const base = 'https://www.sankalpinterior.com';
  const now  = new Date().toISOString().slice(0, 10);

  const staticUrls = STATIC_PAGES.map(p => `
  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('');

  const locationUrls = ALL_LOCATION_SLUGS.map(slug => `
  <url>
    <loc>${base}/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${staticUrls}
${locationUrls}
</urlset>`;

  res.status(200).send(xml);
}
