// 301 permanent redirects from old domains to new domain
// Add this to vercel.json redirects for sankalpdesign.com and sankalps.com

export default function handler(req, res) {
  const host = req.headers.host || '';
  const url = req.url || '/';

  // Redirect old domains to new domain with 301
  if (host.includes('sankalpdesign.com') || host.includes('sankalps.com')) {
    const newUrl = `https://www.sankalpinterior.com${url}`;
    res.setHeader('Location', newUrl);
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    return res.status(301).end();
  }

  // Default — not a redirect target
  res.status(200).json({ ok: true, host, url });
}
