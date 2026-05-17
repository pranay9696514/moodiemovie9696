// api/movies.js — Secure TMDb proxy
const TMDB_BASE = 'https://api.themoviedb.org/3';
const ALLOWED = [
  /^trending\/movie\/(day|week)$/,
  /^movie\/(popular|top_rated|upcoming|now_playing)$/,
  /^movie\/\d+$/,
  /^movie\/\d+\/credits$/,
  /^movie\/\d+\/videos$/,
  /^movie\/\d+\/similar$/,
  /^movie\/\d+\/watch\/providers$/,
  /^search\/movie$/,
  /^discover\/movie$/,
  /^genre\/movie\/list$/,
];
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const key = process.env.TMDB_API_KEY;
  if (!key) return res.status(500).json({ error: 'TMDB_API_KEY not set in Vercel Environment Variables' });
  const { path, ...rest } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path' });
  const tmdbPath = Array.isArray(path) ? path.join('/') : path;
  if (!ALLOWED.some(r => r.test(tmdbPath))) return res.status(403).json({ error: 'Path not allowed' });
  const params = new URLSearchParams({ api_key: key, language: 'en-US', ...rest });
  try {
    const r = await fetch(`${TMDB_BASE}/${tmdbPath}?${params}`);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=300,stale-while-revalidate=600');
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
