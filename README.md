# 🎬 MoodieMovie — AI-Powered Movie Discovery

> Discover the perfect film for your exact mood, powered by Claude AI & TMDb.

**Live Demo → [moodiemoviepro.vercel.app](https://moodiemoviepro.vercel.app)**


---

## What It Does

Most movie apps recommend based on genre or ratings. **MoodieMovie recommends based on how you feel right now.**

You pick a mood — cozy, thrilling, mind-bending, feel-good — and Claude AI analyzes your emotional state to surface films that genuinely fit that moment, with a personalised explanation for *why* each pick works for you.

---

## Key Features

- **Mood-Based AI Recommendations** — Claude interprets 8 mood categories and returns curated picks with reasoning, not just a list
- **Moodie AI Chat** — Conversational assistant that refines recommendations through natural dialogue
- **Real-Time Movie Data** — Live trending, now playing, and coming soon via TMDb API
- **Watchlist & Friends Activity** — Save films, track what friends are watching
- **Voice Search** — Search by speaking, not typing
- **PWA Ready** — Installable on mobile home screen for native app feel

---

## How It Works

```
User selects mood
       ↓
Mood + context sent to Claude API (claude-sonnet model)
       ↓
Claude returns: film recommendations + personalised reason per film
       ↓
Film IDs passed to TMDb API → fetch posters, ratings, trailers
       ↓
Results rendered with full metadata to user
```

Claude doesn't just pick movies — it explains *why* a specific film fits your current emotional state. That explanation is generated fresh for every mood selection, making each session feel personal.

---

## Tech Stack

| Layer | Technology |
|---|---|
| AI / LLM | Claude AI (Anthropic) |
| Movie Data | TMDb API |
| Frontend | HTML, CSS, JavaScript |
| Deployment | Vercel |

---

## What I Learned Building This

- **Prompt engineering for structured output** — Getting Claude to return consistent JSON (film title, reason, tone) required careful output scaffolding with explicit format instructions
- **Chaining two APIs** — Claude generates film suggestions; TMDb fetches the actual metadata. Coordinating async calls and handling mismatches between Claude's suggestions and TMDb's database was the core engineering challenge
- **Mood-to-prompt translation** — Mapping vague human emotions ("I feel cozy") into precise Claude prompts that produce relevant, non-generic recommendations took significant iteration
- **PWA architecture** — Service workers, manifest files, and offline caching for mobile installation

---

## Local Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/moodiemovie.git
cd moodiemovie

# Add your API keys
# Create a .env file:
CLAUDE_API_KEY=your_anthropic_key_here
TMDB_API_KEY=your_tmdb_key_here

# Open index.html or run with a local server
npx serve .
```

Get your keys:
- Claude API → [console.anthropic.com](https://console.anthropic.com)
- TMDb API → [developer.themoviedb.org](https://developer.themoviedb.org)

---

## Roadmap

- [ ] User accounts with persistent watchlist (Supabase)
- [ ] Mood history — track what you watched in each mood over time
- [ ] Social recommendations — "Friends who felt like you watched..."
- [ ] Multi-language support

---

## About the Builder

Built by **Pranay** — B.Tech student at Gurunanak Institutions, Hyderabad.
Focused on AI product development, prompt engineering, and automation systems.

- 🔗 [Fit Tracker Project](https://v0-fit-tracker-app-gamma.vercel.app)
- 📧 your@email.com

---

*This product uses the TMDb API but is not endorsed or certified by TMDb.*
*Powered by Anthropic's Claude AI.*
