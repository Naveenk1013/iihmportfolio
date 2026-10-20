# IIHM Hyderabad — Interactive Faculty Portfolio Platform
## Project Progress, Architecture & Technical Changelog

---

### 1. Executive Summary

The **IIHM Hyderabad Interactive Faculty Portfolio Platform** is a high-performance web experience created for the International Institute of Hotel Management (IIHM) Hyderabad. The platform combines:
1. **A Cinematic 3D Geospatial Globe** built with CesiumJS and Esri Photorealistic Satellite Earth, mapping IIHM's global campuses across India, Southeast Asia, and the United Kingdom.
2. **A Dynamic Multi-Faculty Architecture** providing unique, permanent URLs for each faculty member (ideal for physical QR code generation on business cards and conference badges).
3. **An Interactive 3D Physics Lanyard Card** rendered in Three.js WebGL, featuring procedural dual-sided identification textures with holographic effects.
4. **Curated Academic Dossiers & Simulation Labs** showcasing specialized hospitality training facilities (Rooms Division, Front Office, Mixology, and Sommelier Cellars).

---

### 2. Major Milestones & Changelog

#### Phase 1: 3D Geospatial Globe Intro & Campus Network (`globe.js`)
- **Photorealistic Satellite Earth**: Integrated Esri World Imagery with CartoDB Dark Matter basemap support in CesiumJS.
- **Global Campus Mapping**: Plotted 11 worldwide IIHM campuses:
  - *India*: Hyderabad (Global Epicenter), Kolkata, Delhi, Bangalore, Pune, Goa, Jaipur, Ahmedabad.
  - *International*: Bangkok (Thailand), Singapore (2 College Rd), London (UK).
- **Geodesic Flight Arcs**: Rendered glowing 3D ballistic parabolic arcs linking all international and national campuses to the Hyderabad epicenter.
- **Interactive Spotlight Cards**: Created floating glassmorphic campus cards showing city coordinates, campus overview, and direct camera fly-to buttons.
- **Automatic Entrance Transition**: Seamless sequence: 3.2s global rotation $\rightarrow$ 1.8s camera fly-in into Hyderabad $\rightarrow$ IIHM Gold Medallion crest reveal with audio chimes $\rightarrow$ automatic cross-dissolve into the faculty portfolio (with instant "Enter Portfolio" skip bypass).
- **Two-Way Homepage Navigation**: Clicking the **"3D Globe"** button in the top navbar smoothly returns to the 3D globe homepage, resets the orbital camera, cleans the browser URL, and enables unrestricted globe exploration without unwanted timeouts.

#### Phase 2: Multi-Faculty Routing Engine (`public/js/faculty-data.js` & `app.js`)
- **Centralized Faculty Database (`FacultyDB`)**: Modular database containing verified academic credentials, roles, biographies, facility photos, and contact channels.
- **Individual Profile Slugs & Routing**:
  - `?faculty=naveen-kumar` or `/faculty/naveen-kumar` $\rightarrow$ **Mr. Naveen Kumar** (Faculty of Rooms Division & Front Office Specialist).
  - `?faculty=earnest-immanuel` or `/faculty/earnest-immanuel` or `/director` $\rightarrow$ **Mr. Earnest Immanuel Johnpaul** (Director, IIHM Hyderabad & Master Beverage Trainer).
- **Dynamic Profile Hydration**: On load or upon switching, the page instantly updates page meta, hero bio, phone numbers, email hotlines, social handles, philosophy items, lab showcases, academic quotes, and official dossier content.
- **Top Navbar Faculty Switcher**: Dropdown switcher in the navigation bar with active avatars, leadership badges, and checkmarks, updating browser history via `history.pushState()`.
- **Browser History Integration**: Full `popstate` support for browser Back and Forward navigation between faculty profiles and the 3D globe homepage.

#### Phase 3: Interactive 3D Physics Lanyard Badge (`public/js/lanyard.js`, `card-textures.js`, `three.min.js`)
- **Three.js WebGL Simulation**: Interactive, physically simulated VIP lanyard badge.
- **Verlet Integration Physics**: Rope simulation with mass nodes, gravity, spring damping, and realistic wind breeze.
- **Procedural Canvas Textures**: Dynamically generated high-resolution (1024x1024) dual-sided badge textures matching the active faculty member:
  - *Front*: Official IIHM crest, gold foil stamp, faculty photograph, designation, verified barcode, and security strip.
  - *Back*: Institutional mission, emergency hotline, campus address, and security watermarks.
- **Interactive Controls**: Full mouse/touch physics dragging, spring release, and a 3D badge flip button.

#### Phase 4: Facility Lab Showcases & Official Academic Dossier
- **High-Definition Facility Visuals**:
  - *Rooms Division & Housekeeping*: `rooms_division_lab.jpg`, `housekeeping_suite_lab.jpg`.
  - *Beverage & Sommelier Leadership*: `beverage_training_lab.jpg`, `sommelier_wine_cellar.jpg`.
- **SpotlightCard Glow Engine (`public/js/spotlight-card.js`, `SpotlightCard.css`)**: Hardware-accelerated radial spotlight and ambient border flare on card hover/touch.
- **Official Academic Dossier Modal**: Comprehensive popup dialog displaying academic pedigree, international hotel brand competencies, student placement records, direct telephone hotlines, and inquiry buttons.
- **Footer Streamlining**: Removed redundant floating bottom dock navigation to ensure a clean, uncluttered presentation.

#### Phase 6: Mobile-Friendly Responsive Architecture & Touch Ergonomics
- **Responsive Mobile Navigation Drawer**: Added luxury glassmorphic slide-out navigation drawer (`#mobile-nav-drawer`) with animated hamburger toggle button (`#mobile-menu-toggle`), smooth backdrop overlay blur, active faculty summary card, and instant section links (`Overview`, `Executive Labs`, `Office Connect`, `Dossier`).
- **In-Drawer Faculty Switcher**: Integrated seamless 1-tap faculty profile switching between Mr. Naveen Kumar and Director Earnest Immanuel Johnpaul right inside the mobile drawer.
- **Touch-Optimized 3D Lanyard Stage**: Adapted the Three.js Verlet physics canvas with `touch-action: pan-y;` and responsive dynamic height (`clamp(320px, 46dvh, 390px)`), allowing natural page scroll gestures while maintaining interactive card toss and flip actions.
- **Dynamic Viewport (`dvh`) & Safe-Area Insets**: Replaced rigid `vh` units with `100dvh` across the 3D globe intro, campus cards, emblem reveal, and mobile drawer, with full support for iPhone Home Indicator and notch safe-areas (`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)`).
- **Responsive Grid Stacking & Overflow Elimination**: Configured single-column fluid stacking for Overview cards, Simulation Labs, Contact channels, and Social cards below 768px with `overflow-wrap: anywhere` and `word-break: break-word` preventing text spillover.
- **Native Bottom-Sheet Dossier Modal**: Upgraded the academic dossier modal for mobile devices with an interactive drag handle, `90dvh` auto-scrolling container, and full-width touch-friendly contact buttons.

---

### 3. Current Project Directory Structure

```
motion-graphics/
├── index.html                   # Core application HTML & semantics
├── style.css                    # Luxury Hospitality design system & layout
├── SpotlightCard.css            # Hardware-accelerated card spotlight effects
├── globe.js                     # CesiumJS 3D Earth, camera paths & transitions
├── app.js                       # Profile hydration, switcher, modal & nav logic
├── server.js                    # Lightweight native Node.js HTTP server
├── package.json                 # Web scripts (npm start / npm run dev)
├── package-lock.json            # Lockfile
├── .gitignore                   # Clean ignore patterns
├── README.md                    # Project documentation
├── progress.md                  # Comprehensive progress & architecture log
└── public/
    ├── audio/
    │   └── whoosh.wav           # Transition sound effects
    ├── images/
    │   ├── iihm_official_logo.png     # Official IIHM crest emblem
    │   ├── iihm_logo.png              # Secondary IIHM brand mark
    │   ├── naveen_kumar.jpg           # Faculty portrait (Mr. Naveen Kumar)
    │   ├── earnest_immanuel.jpg       # Director portrait (Mr. Earnest Immanuel)
    │   ├── rooms_division_lab.jpg     # Opera PMS Front Office simulation lab
    │   ├── housekeeping_suite_lab.jpg # 5-Star guest room training suite
    │   ├── beverage_training_lab.jpg  # Mixology & barcraft training suite
    │   └── sommelier_wine_cellar.jpg  # Sommelier wine tasting amphitheatre
    └── js/
        ├── faculty-data.js      # Faculty profiles database & route resolver
        ├── card-textures.js     # Procedural dual-sided badge texture generator
        ├── lanyard.js           # Three.js 3D physics lanyard simulation
        ├── spotlight-card.js    # Vanilla JS spotlight card cursor tracking
        └── three.min.js         # Three.js WebGL engine library
```

---

### 4. Verified Faculty Profiles & Routes

| Faculty Member | Title & Focus | Query Parameter | Canonical Slug |
| :--- | :--- | :--- | :--- |
| **Mr. Naveen Kumar** | Faculty — Department of Rooms Division & Front Office Specialist | `?faculty=naveen-kumar` | `/naveen-kumar` |
| **Mr. Earnest Immanuel Johnpaul** | Director, IIHM Hyderabad & Master Beverage Trainer | `?faculty=earnest-immanuel` | `/director` or `/earnest-immanuel` |

---

### 5. How to Run Locally

#### Method 1: Native Node.js Server (Recommended)
```bash
node server.js
# Or: npm start
```
Open: `http://localhost:8080/`

#### Method 2: VS Code Live Server
Right-click `index.html` $\rightarrow$ **Open with Live Server**  
Open: `http://127.0.0.1:5500/?faculty=naveen-kumar`

---

### 6. Guide: Adding a New Faculty Profile

To add an additional faculty member in the future:
1. **Place Profile & Lab Images**: Add their photo and lab images into `public/images/`.
2. **Add Entry in `public/js/faculty-data.js`**:
   Add a new key under `FACULTIES` with their `id`, `name`, `roleTitle`, `bio`, `email`, `phone`, `linkedin`, `philosophy`, `labs`, `dossierSections`, and `lanyardBadge` parameters.
3. **Add Button in `index.html` Switcher Menu**:
   Under `<div id="faculty-switcher-menu">`, add a `<button class="switcher-item" data-faculty-id="new-faculty-id">` block with their photo and title.
4. **Deploy / Print QR Codes**:
   Point physical QR codes to `https://<your-domain>/?faculty=new-faculty-id`. The platform automatically handles globe entrance and direct hydration.

---
*Log generated on 2026-10-15.*
