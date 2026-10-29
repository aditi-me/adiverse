# Creative Developer Portfolio — Inspired by [sebg.ch](https://www.sebg.ch/)

A recreation of the award-winning (Awwwards Honorable Mention) personal portfolio of **Sébastien Graf** ([sebg.ch](https://www.sebg.ch/)). Built with a Swiss minimalist aesthetic, interactive Three.js 3D mascot, procedural Web Audio API sound effects, component-driven architecture, and zero-database static performance.

---

## 🚀 Key Features

* **Interactive Three.js 3D Mascot:**
  * Real-time cursor / pointer tracking with smooth head rotation.
  * Idle breathing and floating physics.
  * Click-to-spin physics animation with reactive speech bubble dialogue.
  * Multiple outfits / colorways (Standard Dev, Swiss Luxury, Retro Cyber, Stealth).
* **Audio Feedback Synthesizer:**
  * Procedurally generated sound effects via Web Audio API (hover, click, pop, success chords) with zero external MP3 assets.
  * Includes a mute/unmute control in the navbar.
* **Selected Works Showcase:**
  * Rich case studies for high-profile luxury houses (Jaeger-LeCoultre, Piaget) and open-source projects (StableBar, Respawwwn).
  * Category filtering (Luxury, Open Source, Creative, Tourism).
  * Full detail modal with project background, challenge, impact, and technology tags.
* **Live Swiss Time Clock:**
  * Real-time CET clock for Lausanne, Switzerland.
* **One-Click Copy Email:**
  * Fast clipboard copy with instant toast confirmation.
* **Zero Database Needed:**
  * All portfolio data (projects, bio, experience, skills, social links) lives in `src/data/portfolioData.js`.

---

## 📁 Project Structure

```text
├── src/
│   ├── components/
│   │   ├── About.jsx           # Philosophy, craft, principles & colophon
│   │   ├── Contact.jsx         # Contact section, live Swiss clock & social links
│   │   ├── Experience.jsx      # Career timeline & awards list
│   │   ├── Footer.jsx          # Copyright, back-to-top button & attribution
│   │   ├── Hero.jsx            # Headline, stats, CTA & 3D mascot wrapper
│   │   ├── Mascot3D.jsx        # Three.js WebGL interactive 3D mascot
│   │   ├── Navbar.jsx          # Header, live status pill, sound & theme toggles
│   │   ├── ProjectModal.jsx    # Slide-over case study detail modal
│   │   ├── Projects.jsx        # Selected works grid & category filter
│   │   └── Skills.jsx          # Tech stack & category filter
│   ├── data/
│   │   └── portfolioData.js    # Single source of truth for all content
│   ├── utils/
│   │   └── sound.js            # Web Audio API sound generator
│   ├── App.jsx                 # Root layout & section observer
│   ├── index.css               # Tailwind & custom scrollbar
│   └── main.jsx                # React root mount
├── index.html                  # Main HTML entry point
├── preview.html                # Standalone preview (zero install needed)
├── package.json                # Project dependencies & scripts
├── tailwind.config.js          # Tailwind styling configuration
├── vite.config.js              # Vite bundler configuration
├── vercel.json                 # Zero-config deployment for Vercel
└── netlify.toml                # Zero-config deployment for Netlify
```

---

## 🎨 How to Customize Your Portfolio

Open [`src/data/portfolioData.js`](src/data/portfolioData.js) and update the fields:

```javascript
export const portfolioData = {
  profile: {
    name: "Your Name",
    tagline: "Your Role / Tagline",
    location: "City, Country",
    email: "your.email@domain.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://x.com/yourusername",
  },
  // Add your own projects, experience, and skills!
};
```

---

## 🌐 Free Deployment (Vercel & Netlify)

### Option 1: Deploy to Vercel (1-Minute Setup)
1. Push this repository to your **GitHub** account:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** (via `vercel.json`). Click **"Deploy"**.
5. Your portfolio is live with free SSL and edge CDN!

---

### Option 2: Deploy to Netlify (1-Minute Setup)
1. Push your repository to GitHub.
2. Go to [netlify.com](https://app.netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
3. Connect your repository. Netlify reads [`netlify.toml`](netlify.toml) automatically:
   * Build command: `npm run build`
   * Publish directory: `dist`
4. Click **"Deploy site"**.

---

### Option 3: Instant Local Preview
You can also open [`preview.html`](preview.html) directly in any web browser without needing any npm installation!
