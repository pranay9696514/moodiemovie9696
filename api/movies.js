// api/movies.js — Secure TMDb proxy
// Your TMDB_API_KEY never reaches the browser

const TMDB_BASE = 'https://api.themoviedb.org/3';

const ALLOWED_PATHS = [
  /^trending\/movie\/(day|week)$/,
  /^movie\/(popular|top_rated|upcoming|now_playing)$/,
  /^movie\/\d+$/,
  /^movie\/\d+\/credits$/,
  /^movie\/\d+\/videos$/,
  /^movie\/\d+\/similar$/,
  /^search\/movie$/,
  /^discover\/movie$/,
  /^genre\/movie\/list$/,
];

function isAllowed(path) {
  return ALLOWED_PATHS.some(r => r.test(path));
}

module.exports = async (req, res) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  const key = process.env.TMDB_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'TMDB_API_KEY not configured. Add it to Vercel Environment Variables.' });
  }

  // Extract TMDb path from query
  const { path, ...rest } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path parameter' });

  const tmdbPath = Array.isArray(path) ? path.join('/') : path;

  if (!isAllowed(tmdbPath)) {
    return res.status(403).json({ error: 'Path not allowed' });
  }

  // Build query string
  const params = new URLSearchParams({ api_key: key, language: 'en-US', ...rest });
  const url = `${TMDB_BASE}/${tmdbPath}?${params}`;

  try {
    const r = await fetch(url);
    const data = await r.json();
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch from TMDb', detail: err.message });
  }
};
