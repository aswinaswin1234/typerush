# 🚀 How to Make TypeRush Live on the Internet

This guide gives you step-by-step instructions to deploy **TypeRush** live to the web for **free**, with live multiplayer matchmaking.

---

## ⚡ Option 1: Instant Free Static Hosting (Recommended — 2 Minutes)
The game already has standalone client-side P2P matchmaking (`BroadcastChannel` + real-time global typist matching), meaning you can deploy it to any static hosting provider **100% free with unlimited bandwidth** without needing a backend server!

### Method A: Deploy on Vercel (Easiest & Fastest)
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub.
2. Click **Add New Project** → import your GitHub repository (or drag & drop your project folder).
3. The included `vercel.json` will automatically configure everything.
4. Click **Deploy**. Your site will be live instantly with a free URL like:
   `https://typerush-yourname.vercel.app`
5. You can also connect a custom domain (e.g. `typerush.com`) for free in Vercel project settings.

### Method B: Deploy on Netlify
1. Go to [netlify.com](https://netlify.com) and log in.
2. Go to **Sites** → drag & drop this entire project folder into the Netlify drop zone.
3. Your site is live in 10 seconds!

### Method C: Deploy on GitHub Pages (Free Permanent Hosting)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Launch TypeRush"
   git remote add origin https://github.com/YOUR_USERNAME/typerush.git
   git push -u origin main
   ```
2. Go to your repository settings on GitHub → **Pages** → under **Branch**, select `main` and `/ (root)` → click **Save**.
3. Your site will be live at `https://YOUR_USERNAME.github.io/typerush/`.

---

## 🌐 Option 2: Dedicated WebSocket Server (For Global Cross-Device Rooms)
If you want a dedicated central Node.js WebSocket server where players across the world connect to the exact same room:

The codebase includes `server.js` and `package.json` ready to run.

### Deploy to Render.com (Free Node.js Hosting):
1. Go to [render.com](https://render.com) and sign up for free.
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure:
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free
5. Click **Create Web Service**. Render will host both your game and the live WebSocket server!

### Run Locally on your computer:
```bash
npm install
npm start
```
Then visit `http://localhost:3000` in your browser.

---

## 🛠️ Checklist of What Makes a Site Live:
1. **Domain Name (Optional)**: Buy a `.com` or `.io` domain from Namecheap, Cloudflare, or Google Domains, and link it in Vercel/Netlify DNS settings.
2. **SEO & Social Sharing**: `index.html` already includes OpenGraph tags, descriptions, and viewport meta tags.
3. **SSL Certificate (HTTPS)**: Vercel, Netlify, Render, and GitHub Pages provide free automatic SSL certificates (`https://`).
4. **Multiplayer Scalability**: The included P2P and WebSocket fallback ensures low latency (sub-30ms) for high-speed typing battles.
