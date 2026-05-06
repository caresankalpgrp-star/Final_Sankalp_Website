import { createReadStream, statSync, existsSync } from 'fs';
import { join, resolve } from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { file } = req.query;

  // Allowed files only — security whitelist
  const ALLOWED = {
    'source': 'sankalp-source-noimg.tar.gz',
    'deploy': 'sankalp-deploy.tar.gz',
  };

  if (!file || !ALLOWED[file]) {
    return res.status(400).json({ error: 'Invalid file. Use ?file=source or ?file=deploy' });
  }

  const filename = ALLOWED[file];
  // In Vercel, dist is served as static — files are in /var/task/dist or process.cwd()/dist
  const filePath = join(process.cwd(), 'dist', filename);

  if (!existsSync(filePath)) {
    return res.status(404).json({
      error: 'File not found. Please redeploy to regenerate.',
      tried: filePath
    });
  }

  const stat = statSync(filePath);
  res.setHeader('Content-Type', 'application/gzip');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Cache-Control', 'no-cache');

  const stream = createReadStream(filePath);
  stream.pipe(res);
  stream.on('error', (err) => {
    console.error('Stream error:', err);
    if (!res.headersSent) res.status(500).json({ error: 'Stream failed' });
  });
}
