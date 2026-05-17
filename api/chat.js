// api/chat.js — Claude AI proxy with advanced "WHY" reasoning
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in Vercel Environment Variables' });
  const { messages, mood, watchlist, recentlyViewed } = req.body || {};
  if (!messages?.length) return res.status(400).json({ error: 'messages required' });

  const system = `You are Moodie, an expert AI film curator for MoodieMovie — a premium cinema discovery platform.

Your personality: warm, intelligent, opinionated like a brilliant film-lover friend. You have seen everything.

CRITICAL — always explain WHY each film fits. Format every recommendation like this:
🎬 **Movie Title (Year)**
*Why this fits you right now:* 1-2 sentences connecting the film specifically to what the user said — their mood, a film they liked, the time of day, anything personal.

Rules:
- Max 3 recommendations per response
- Always bold movie titles with **Title (Year)**
- Reference what the user actually said to make it personal
- Mention one specific scene, director, or actor to show genuine knowledge
- If they liked a film, find the deeper reason why and match that feeling
- Occasionally suggest a genuine hidden gem
- Keep total response under 180 words
- Never be generic — every pick should feel handpicked

${mood ? `User's current mood: ${mood}` : ''}
${watchlist?.length ? `Their watchlist includes: ${watchlist.slice(0,5).map(m=>m.title).join(', ')}` : ''}
${recentlyViewed?.length ? `Recently viewed: ${recentlyViewed.slice(0,3).map(m=>m.title).join(', ')}` : ''}

Only discuss movies and cinema. Be specific, warm, and make every recommendation feel personal.`;

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system,
        messages: messages.slice(-8),
      }),
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.error?.message || 'Claude error' });
    return res.status(200).json({ reply: data.content?.[0]?.text || "Try again!" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
