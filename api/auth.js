// api/auth.js — Simple profile save/load using Vercel KV (or fallback)
// Stores user profiles by a self-generated UUID (no passwords needed)
// Users sign in with just their name — profile syncs via their unique ID

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // For portfolio use, we use a simple approach:
  // Profile is stored client-side in localStorage with a UUID
  // This endpoint validates and echoes back — real persistence needs Vercel KV
  if (req.method === 'POST') {
    const { userId, name, watchlist, recentlyViewed, moods } = req.body || {};
    if (!userId) return res.status(400).json({ error: 'userId required' });
    // In a full implementation, save to Vercel KV:
    // await kv.set(`user:${userId}`, JSON.stringify({ name, watchlist, recentlyViewed, moods }))
    return res.status(200).json({ success: true, userId, name });
  }

  if (req.method === 'GET') {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId required' });
    // In full implementation: const data = await kv.get(`user:${userId}`)
    return res.status(200).json({ userId, synced: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
