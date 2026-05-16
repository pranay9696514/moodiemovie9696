# 🎬 MoodieMovie

AI-powered movie discovery platform built with Claude AI + TMDb API, deployable on Vercel in 5 minutes.

## Features
- 🎥 Real movie posters, backdrops, trailers (YouTube embed)
- 🤖 Claude AI chatbot for personalized recommendations
- 🎭 Mood-based movie filtering (8 moods)
- 🔍 Live search with voice input
- 📋 Watchlist (persists in localStorage)
- 🎬 Full detail modal with cast, similar movies, trailers
- 📱 Fully responsive mobile design
- 🔒 API keys stored securely server-side (never exposed to browser)

---

## Deploy to Vercel (5 minutes)

### Step 1 — Get the code on GitHub
1. Go to [github.com](https://github.com) → New repository → name it `moodiemovie`
2. Upload all these files (drag & drop the folder)
3. Click **Commit changes**

### Step 2 — Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your `moodiemovie` GitHub repo
3. Click **Deploy** (don't change any settings)

### Step 3 — Add your API keys (IMPORTANT)
1. In Vercel → your project → **Settings** → **Environment Variables**
2. Add these two variables:

| Name | Value |
|------|-------|
| `TMDB_API_KEY` | your TMDb API key from themoviedb.org |
| `ANTHROPIC_API_KEY` | your Anthropic API key from console.anthropic.com |

3. Click **Save** → Go to **Deployments** → **Redeploy**

Your site is live! 🎉

---

## Local Development

```bash
npm i -g vercel
vercel dev
```

Create a `.env.local` file (copy from `.env.example`) with your keys.

---

## Project Structure

```
moodiemovie/
├── public/
│   └── index.html      ← Full frontend (HTML + CSS + JS)
├── api/
│   ├── movies.js       ← TMDb proxy (keeps your key secret)
│   └── chat.js         ← Claude AI proxy (keeps your key secret)
├── vercel.json         ← Routing config
├── .env.example        ← Key template
└── README.md
```

## Keyboard Shortcuts
- `/` → Open search
- `Escape` → Close any modal

## API Keys
- TMDb: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
- Anthropic: [console.anthropic.com](https://console.anthropic.com)
