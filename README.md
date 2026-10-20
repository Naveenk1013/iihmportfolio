# IIHM Hyderabad — Faculty Academic Portfolio & Interactive 3D Showcase

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNaveenk1013%2Fiihmportfolio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Naveenk1013/iihmportfolio)

An institutional-grade, cinematic digital experience designed for the **International Institute of Hotel Management (IIHM) Hyderabad**. Built with **CesiumJS 3D Geospatial Engine**, **Three.js Verlet Physics**, and an **Imperial Hospitality Design System**, this platform showcases faculty pedagogy, leadership credentials, UK degree accreditations, executive simulation labs, and interactive institutional credentials.

---

## 🌟 Key Highlights & Features

### 1. Interactive 3D Physics Faculty ID Badge (`Three.js`)
* **Cloth & Lanyard Simulation**: Verlet constraint physics with real-time elasticity, gravitational tension, damping, and breeze perturbation.
* **Interactive Gestures**: Drag, toss, swing, and flip card with smooth inertial momentum and touch gesture handling (`touch-action: pan-y`).
* **Dynamic Institutional Textures**: High-resolution procedural canvas badges generated at 1024×1440 resolution, featuring:
  * Official IIHM crest and gold leaf perimeter borders.
  * Faculty portrait photography with luxury gold bevel frame.
  * Holographic shader glint with specular highlights.
  * Microchip contact pads, QR verification codes, and magnetic barcode strips.
* **Dual-Face Flip Engine**: One-click or drag-to-flip animation revealing institutional terms, return instructions, and University of West London accreditation notes.

### 2. Global 3D Geospatial Campus Exploration (`CesiumJS`)
* **3D Photorealistic Globe**: Interactive geospatial digital twin with continuous rotation and real atmospheric scattering.
* **Global Network Mapping**: Custom pin markers for all 10+ IIHM international and domestic hubs (London, Bangkok, Singapore, Hyderabad, Kolkata, Delhi, Bangalore, Pune, Jaipur, Goa, Ahmedabad).
* **Cinematic Epicenter Fly-To**: Smooth camera interpolation zooming directly into the Hyderabad campus epicenter with interactive leadership spotlights.

### 3. Multi-Faculty Profile Engine & Dynamic Hydration
* **Instant Profile Switching**: One-tap switcher between:
  * **Mr. Naveen Kumar** — Senior Faculty, Department of Rooms Division & Accommodation Operations.
  * **Mr. Earnest Immanuel Johnpaul** — Campus Director & Secretary, Skal International Hyderabad.
* **Client-Side URL Routing**: Supports clean shareable URLs (`/director`, `/naveen-kumar`, `?faculty=earnest-immanuel`) with instant profile rehydration and zero page reloads.

### 4. Executive Simulation Labs & Academic Pedagogy
* **Immersive Lab Showcase**: Interactive spotlight cards for world-class practical facilities:
  * Rooms Division Executive Suite & Opera PMS Terminal.
  * Master Beverage Training & Sommelier Wine Cellar.
  * Housekeeping Linen & Microbiology Quality Lab.
  * Culinary Training Kitchens & Banquet Service Theatres.
* **UK Degree Curriculum**: Highlighted University of West London (UWL) UK academic pathways, placement statistics, and global mentorship track records.

### 5. Luxury Mobile-First Experience
* **Accessible Mobile Drawer**: Smooth slide-out navigation with quick faculty switcher, instant phone connect, and tactile touch targets.
* **Dynamic Viewport Ergonomics**: Native safe-area adaptation using modern `100dvh` units, bottom-sheet academic dossier dialogs, and fluid typography.
* **Imperial Hospitality Palette**: Imperial Midnight Navy (`#050b18`), Champagne Gold Leaf (`#d4af37`), Emerald Beacon Accents (`#00ffaa`), and Google Fonts (`Cinzel` & `Outfit`).

---

## 📂 Project Architecture

```
Portfolio/
├── index.html              # Main HTML5 entry point with semantic accessibility & base routing
├── style.css               # Core luxury design system, responsive breakpoints & fluid tokens
├── SpotlightCard.css       # Dynamic cursor spotlight effect stylesheet
├── app.js                  # Master controller: profile hydration, faculty switcher & modal logic
├── globe.js                # CesiumJS 3D Earth, camera paths, campus pins & audio engine
├── server.js               # Lightweight local Node.js development server
├── vercel.json             # Static SPA rewrite configuration for Vercel Edge CDN
├── _redirects              # SPA rewrite rule for Netlify deployments
├── .vercelignore           # Excludes local server scripts from serverless builds
├── public/
│   ├── js/
│   │   ├── faculty-data.js     # Faculty database, profiles, credentials & curriculum
│   │   ├── card-textures.js    # Canvas badge texture generator (front/back/strap)
│   │   ├── lanyard.js          # Three.js Verlet constraint physics 3D lanyard component
│   │   ├── spotlight-card.js   # Mouse/touch follower glow component
│   │   └── three.min.js        # Three.js 3D rendering library
│   └── images/
│       ├── iihm_official_logo.png   # Official IIHM crest emblem
│       ├── naveen_kumar.jpg         # Senior Faculty portrait photograph
│       ├── earnest_immanuel.jpg     # Campus Director portrait photograph
│       ├── rooms_division_lab.jpg   # Executive suite simulation lab
│       └── beverage_training_lab.jpg# Sommelier wine cellar lab
└── README.md               # Project documentation and deployment guide
```

---

## 🚀 Local Development

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.0 or higher recommended)

### Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/Naveenk1013/iihmportfolio.git
cd iihmportfolio

# 2. Start the local server
npm run dev
# or: node server.js

# 3. Open in browser
# Navigate to http://localhost:8080/
```

---

## 🌐 Production Deployment

The project is structured as a **pure static site** that can be deployed for **free** with automatic global CDN caching and HTTPS.

### Option 1: Vercel (Recommended)
1. Import **`Naveenk1013/iihmportfolio`** on [vercel.com](https://vercel.com).
2. Framework preset: **Other** (Root Directory: `./`).
3. Click **Deploy**. Vercel will serve the site via its global Edge CDN using the included [`vercel.json`](./vercel.json).

### Option 2: Netlify
1. Connect **`Naveenk1013/iihmportfolio`** on [netlify.com](https://www.netlify.com).
2. Leave Build command empty and Publish directory as `.`.
3. Click **Deploy**. Netlify automatically applies the included [`_redirects`](./_redirects) file.

### Option 3: GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Under **Branch**, select `main` and folder `/ (root)`.
3. Click **Save**.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Core Architecture** | Semantic HTML5, Vanilla JavaScript (ES2022), Vanilla CSS3 |
| **3D Geospatial Engine** | CesiumJS (1.119) with WebGL photorealistic Earth rendering |
| **3D Physics Badge** | Three.js (r150+) with custom Verlet integration constraint solver |
| **Motion & Audio** | GSAP 3.12, Web Audio API procedural sound synthesizer |
| **Typography** | Cinzel (Header Serif) & Outfit (Modern Sans) via Google Fonts |
| **Iconography** | FontAwesome 6.5.1 Pro Hospitality & Social SVGs |
| **Hosting & CI/CD** | Vercel / Netlify with automated GitHub push deployments |

---

## 🏛️ Institutional Accreditation
* **Institution**: International Institute of Hotel Management (IIHM) Hyderabad
* **Global Academic Partner**: University of West London (UWL), United Kingdom
* **Professional Affiliations**: Skal International Hyderabad, HRATS (Hotels & Restaurants Association of Telangana State)

---

## 📄 License
© 2026 International Institute of Hotel Management (IIHM) Hyderabad. All rights reserved.
Developed for academic presentation, curriculum showcase, and faculty leadership portfolios.
