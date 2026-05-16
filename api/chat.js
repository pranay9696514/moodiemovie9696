// api/chat.js — Secure Claude AI proxy
// Your ANTHROPIC_API_KEY never reaches the browser

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured. Add it to Vercel Environment Variables.' });
  }

  const { messages, mood, context } = req.body || {};
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const systemPrompt = `You are Moodie, an expert AI movie recommendation assistant for MoodieMovie — a premium streaming discovery platform.

Your personality: warm, cinematic, knowledgeable, like a film-lover friend who happens to know everything about movies.

Your job:
- Recommend movies based on mood, feelings, genres, directors, actors, or themes
- Keep responses concise: 2-5 sentences max
- Always bold movie titles with **Title (Year)**
- Suggest 1-3 specific movies per response
- Include a one-line reason why each film fits
- If the user mentions a movie they liked, find similar ones
- Occasionally mention a hidden gem or underrated pick

${mood ? `The user's current mood filter is set to: ${mood}` : ''}
${context ? `Recently viewed context: ${context}` : ''}

Never discuss anything outside movies and cinema. Be enthusiastic but not overwhelming. Quality over quantity.`;

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
        max_tokens: 400,
        system: systemPrompt,
        messages: messages.slice(-6), // last 6 messages for context
      }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data.error?.message || 'Claude API error' });

    const text = data.content?.[0]?.text || 'I couldn\'t think of a recommendation right now. Try again!';
    return res.status(200).json({ reply: text });
  } catch (err) {
    return res.status(500).json({ error: 'AI service unavailable', detail: err.message });
  }
};
