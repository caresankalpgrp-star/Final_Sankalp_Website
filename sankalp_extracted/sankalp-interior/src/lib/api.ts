// Smart API base URL
// - On Vercel (same domain): uses relative /api/...
// - On external hosting (Serverbyt etc.): uses VITE_API_BASE_URL env var
const VERCEL_API = import.meta.env.VITE_API_BASE_URL || '';

export const apiUrl = (path: string) => `${VERCEL_API}${path}`;
