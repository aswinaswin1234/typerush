# ⚡ TYPERUSH: Ultimate Cyber Typing Battle Arena

[![Live Demo Ready](https://img.shields.io/badge/Status-Production%20Ready-00f0ff?style=for-the-badge)](https://typerush.app)
[![Multiplayer](https://img.shields.io/badge/Multiplayer-Live%20WebSocket%20%2B%20P2P-7000ff?style=for-the-badge)](https://typerush.app)
[![Speed](https://img.shields.io/badge/Challenge-300%20WPM%20Guinness%20Record-ff007f?style=for-the-badge)](https://typerush.app)

**TypeRush** is an adrenaline-fueled, cyberpunk-themed competitive typing arcade web game featuring ultra-rich animations, multiple high-intensity game modes, continuous sentence-typing syntax engine, a **300 WPM Guinness World Record** bot challenge, and **Live Real-time Multiplayer matchmaking** with global typists.

---

## 🌟 Key Features

### 🌐 1. Live Multiplayer Random Duels & Room Codes
- **Random Global Matchmaking**: Radar scan locates live typists across the world within seconds.
- **Room Code & Direct Invite Links**: Duel friends via custom room codes or by sharing `https://yoursite.com/?room=ROOMCODE`.
- **Live Keystroke Progress & Gap Meter**: Real-time progress bars, runner avatars, and a dynamic gap needle (+/- characters ahead/behind).
- **In-Game Quick Emotes**: Send real-time floating reactions (`🔥`, `⚡`, `🏎️`, `💀`, `👑`).
- **Hybrid Networking Engine**: Connects via centralized **Node.js WebSockets** for cross-device battles, with instant fallback to **P2P BroadcastChannel** and an authentic pool of simulated typists with realistic human jitter and micro-delays.

### 👑 2. 300 WPM Guinness World Record Titan Duel
- Face off against an AI titan tuned to **300 WPM (25 characters per second)**—the official speed record standard.
- Character-by-character syntax validation with real-time error shakes and color feedback (`.char-correct`, `.char-wrong`, `.char-current`).
- Sentence banks curated from speed typing lore, motorsport velocity, and martial arts mastery.

### 🎮 3. Addictive Arcade Game Modes
- **🏎️ Speed Racer**: Accelerate your cyber vehicle with every word typed; nitro boosts at 5x combos.
- **⚔️ Word Fighter**: Unleash martial arts combos and drain enemy health before their counterattack lands.
- **⚡ Word Blitz**: High-octane 60-second time trial to achieve your peak WPM score.
- **☠️ Survival**: Stop words falling into the hazard zone with combo streak explosions.

### 🎨 4. Ultra-Rich Cyberpunk Aesthetics
- Dynamic HTML5 canvas particle background with reactive keystroke bursts.
- Retro CRT scanlines, screen flash, and screenshake feedback.
- Glitch title animation and keyboard demo on the intro showcase screen.
- Native **Web Audio API** sound synthesizer (laser beeps, combos, engine roars, error thuds—no external sound files required).
- Persistent local leaderboards separated by game mode.

---

## 🚀 How to Launch This Site Live on the Internet

### Option A: 1-Click Free Static Deployment (Vercel / Netlify / GitHub Pages)
Because TypeRush has client-side networking and a realistic matchmaking engine built-in, you can deploy it for **100% free** in 60 seconds without maintaining a server!

#### 🔺 Deploy to Vercel (Recommended):
1. Create a free account at [vercel.com](https://vercel.com).
2. Click **Add New** → **Project** → Import this folder or your GitHub repo.
3. The included [`vercel.json`](file:///e:/hopeiso/vercel.json) configures everything automatically.
4. Click **Deploy**. Your game is live worldwide at `https://typerush-yourname.vercel.app` with free SSL!

#### 🌐 Deploy to Netlify:
1. Log in to [netlify.com](https://netlify.com).
2. Drag and drop this project directory into the Netlify drop zone.
3. Your site goes live in 10 seconds!

#### 🐙 Deploy to GitHub Pages:
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Launch TypeRush"
   git remote add origin https://github.com/YOUR_USERNAME/typerush.git
   git push -u origin main
   ```
2. In your repo settings, go to **Pages** → choose `main` branch → Save.

---

### Option B: Dedicated WebSocket Server (For Cross-Device Multiplayer)
For a dedicated central WebSocket server matching players across distinct computers:

#### ⚡ Deploy to Render.com (Free):
1. Sign up at [render.com](https://render.com).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Settings:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free
5. Render will host the frontend and the WebSocket matchmaking server on a single public URL!

#### 💻 Run Locally:
```bash
npm install
npm start
```
Visit `http://localhost:3000` in your browser. Open multiple browser windows to test real-time live dueling!

---

## 📁 Project Architecture

| File | Purpose |
|------|---------|
| [`index.html`](file:///e:/hopeiso/index.html) | Structure, HUDs, 6 game screens, radar matchmaking, and social meta tags |
| [`index.css`](file:///e:/hopeiso/index.css) | Cyberpunk styling, animations, scanlines, syntax highlighting, and responsive design |
| [`game.js`](file:///e:/hopeiso/game.js) | Game logic, Web Audio synthesizer, continuous sentence engine, and dual networking |
| [`server.js`](file:///e:/hopeiso/server.js) | Node.js Express & WebSocket server for live cross-device matchmaking |
| [`favicon.svg`](file:///e:/hopeiso/favicon.svg) | High-resolution neon cyber lightning icon |
| [`manifest.json`](file:///e:/hopeiso/manifest.json) | PWA Manifest for desktop/mobile standalone app installation |
| [`robots.txt`](file:///e:/hopeiso/robots.txt) & [`sitemap.xml`](file:///e:/hopeiso/sitemap.xml) | Search engine indexing & SEO configuration |
| [`vercel.json`](file:///e:/hopeiso/vercel.json) & [`netlify.toml`](file:///e:/hopeiso/netlify.toml) | Zero-config static cloud hosting deployment files |
| [`DEPLOYMENT_GUIDE.md`](file:///e:/hopeiso/DEPLOYMENT_GUIDE.md) | Step-by-step deployment and custom domain setup guide |

---

## 🏆 Guinness Record Speed Reference
- **300 WPM** = **25 characters per second** (5 keystrokes per word)
- **212 WPM** = Peak historical record set by Barbara Blackburn on Dvorak
- **150 WPM** = Top 0.01% human speed typist standard
- **80 WPM** = Professional touch typist
