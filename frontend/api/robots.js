export default function handler(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.status(200).send(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin/login
Disallow: /api/

Sitemap: https://www.sankalpinterior.com/sitemap.xml

# Sankalp Interior Solution - Interior Designer in Kolkata & West Bengal
# www.sankalpinterior.com
`);
}
