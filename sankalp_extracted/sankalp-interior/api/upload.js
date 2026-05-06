import supabase from './_supabase.js';

export const config = { api: { bodyParser: { sizeLimit: '5mb' } } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { base64, fileName, folder = 'testimonials' } = req.body;
    if (!base64 || !fileName) return res.status(400).json({ error: 'base64 and fileName required' });

    // Decode base64
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Determine mime type
    const ext = fileName.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeTypes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };
    const contentType = mimeTypes[ext] || 'image/jpeg';

    // Unique filename
    const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('sankalp-media')
      .upload(uniqueName, buffer, { contentType, upsert: false });

    if (error) {
      // If bucket doesn't exist, return a placeholder URL
      console.error('Storage error:', error.message);
      // Fallback: store as data URL reference in a simple way
      return res.status(200).json({ 
        url: `https://ui-avatars.com/api/?name=${encodeURIComponent(fileName)}&background=f07c1e&color=fff&size=200`,
        fallback: true 
      });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('sankalp-media')
      .getPublicUrl(uniqueName);

    return res.status(200).json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
}
