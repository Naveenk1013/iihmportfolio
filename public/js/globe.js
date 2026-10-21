/**
 * ============================================================================
 * IIHM HYDERABAD - CESIUMJS 3D GEOSPATIAL GLOBE & LOGO MORPH ENGINE
 * Powered by CesiumJS, GSAP, and Web Audio API
 * ============================================================================
 */

(function () {
  'use strict';

  // --- IIHM Global Campus Coordinates (Latitude, Longitude in degrees) ---
  const IIHM_CAMPUSES = [
    {
      id: 'hyderabad',
      name: 'IIHM Hyderabad',
      city: 'Hyderabad, Telangana',
      country: 'India',
      lat: 17.3850,
      lon: 78.4867,
      height: 0,
      isEpicenter: true,
      tag: 'Campus Leadership',
      desc: 'Premier international hospitality campus featuring world-class training suites, Executive Reception PMS workstations, and global university accreditations.',
      director: 'Earnest Immanuel Johnpaul',
      directorLinkedin: 'https://www.linkedin.com/in/earnest-immanuel-johnpaul-b0312077/',
      directorTitle: 'Director, International Institute of Hotel Management (IIHM) Hyderabad'
    },
    {
      id: 'kolkata',
      name: 'IIHM Kolkata',
      city: 'Kolkata, West Bengal',
      country: 'India',
      lat: 22.5726,
      lon: 88.3639,
      height: 0,
      tag: 'Headquarters',
      desc: 'Flagship campus and international founding headquarters of the International Institute of Hotel Management network.'
    },
    {
      id: 'delhi',
      name: 'IIHM Delhi NCR',
      city: 'Delhi NCR',
      country: 'India',
      lat: 28.6139,
      lon: 77.2090,
      height: 0,
      tag: 'North Hub',
      desc: 'State-of-the-art hospitality academy educating premier hotel executives in the national capital region.'
    },
    {
      id: 'bangalore',
      name: 'IIHM Bangalore',
      city: 'Bangalore, Karnataka',
      country: 'India',
      lat: 12.9716,
      lon: 77.5946,
      height: 0,
      tag: 'South Tech Hub',
      desc: 'Center for hospitality business analytics, dynamic room yield management, and tech integration.'
    },
    {
      id: 'pune',
      name: 'IIHM Pune',
      city: 'Pune, Maharashtra',
      country: 'India',
      lat: 18.5204,
      lon: 73.8567,
      height: 0,
      tag: 'Western Campus',
      desc: 'Renowned for luxury resort hospitality, food & beverage artistry, and accommodation logistics.'
    },
    {
      id: 'goa',
      name: 'IIHM Goa',
      city: 'Panaji, Goa',
      country: 'India',
      lat: 15.2993,
      lon: 74.1240,
      height: 0,
      tag: 'Resort Specialist',
      desc: 'Immersion training in 5-star beachfront luxury operations, recreational management, and leisure tourism.'
    },
    {
      id: 'ahmedabad',
      name: 'IIHM Ahmedabad',
      city: 'Ahmedabad, Gujarat',
      country: 'India',
      lat: 23.0225,
      lon: 72.5714,
      height: 0,
      tag: 'Heritage Campus',
      desc: 'Hospitality entrepreneurship, banquet operations, and luxury guest relations excellence.'
    },
    {
      id: 'jaipur',
      name: 'IIHM Jaipur',
      city: 'Jaipur, Rajasthan',
      country: 'India',
      lat: 26.9124,
      lon: 75.7873,
      height: 0,
      tag: 'Palace Hospitality',
      desc: 'Rooted in regal palace heritage, royal concierge traditions, and high-profile VIP guest staging.'
    },
    {
      id: 'bangkok',
      name: 'IIHM Bangkok',
      city: 'Bangkok',
      country: 'Thailand',
      lat: 13.7563,
      lon: 100.5018,
      height: 0,
      tag: 'International Hub',
      desc: 'Southeast Asia gateway providing international hospitality exchanges and luxury resort internships.'
    },
    {
      id: 'samarkand',
      name: 'IIHM Samarkand',
      city: 'Samarkand',
      country: 'Uzbekistan',
      lat: 39.6542,
      lon: 66.9597,
      height: 0,
      tag: 'Central Asia Hub',
      desc: 'Pioneering Silk Road global tourism education and international cultural hospitality.'
    },
    {
      id: 'singapore',
      name: 'IIHM Singapore (IIHM Education Pte Ltd)',
      city: 'Singapore',
      country: 'Singapore',
      lat: 1.2800,
      lon: 103.8378,
      height: 0,
      tag: 'Global Gateway',
      desc: '2 College Rd, Level 2, Singapore 169850. Strategic Southeast Asia campus fostering international luxury hospitality education, Asian culinary management, and premier global internships.'
    },
    {
      id: 'london',
      name: 'University of West London',
      city: 'London',
      country: 'United Kingdom',
      lat: 51.5074,
      lon: -0.1278,
      height: 0,
      tag: 'Global Academic Partner',
      desc: 'Historic international partner conferring internationally recognized British Bachelor degrees in Hospitality Management.'
    }
  ];

  // --- Sound Synthesis via Web Audio API ---
  const AudioEngine = {
    ctx: null,
    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      }
    },
    playWhoosh() {
      this.init();
      if (!this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(560, this.ctx.currentTime + 0.55);
        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.65);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.65);
      } catch (e) { /* ignore */ }
    },
    playChime() {
      this.init();
      if (!this.ctx) return;
      try {
        const chord = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C major high harmonic chord
        chord.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), this.ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + idx * 0.04);
          osc.stop(this.ctx.currentTime + 2.6);
        });
      } catch (e) { /* ignore */ }
    }
  };

  // --- Globals ---
  let viewer = null;
  let isMorphing = false;
  let hasMorphed = false;
  let isRotationPaused = false;
  let isLocationPinned = false;
  let activeCampus = null;
  let autoEntranceTimer = null;
  let autoPortfolioTimer = null;
  let rotationListener = null;
  let isSatelliteStyle = true;
  let satelliteProvider = null;
  let darkCanvasProvider = null;
  let activeImageryLayer = null;

  // Initialize CesiumJS Viewer
  function initCesiumGlobe() {
    const container = document.getElementById('globe-container');
    if (!container || typeof Cesium === 'undefined') return;

    // Avoid default Cesium Ion token requirement
    Cesium.Ion.defaultAccessToken = '';

    // Create Viewer with baseLayer: false so Cesium doesn't fail on Ion token or ignore custom layers
    viewer = new Cesium.Viewer(container, {
      baseLayer: false,
      baseLayerPicker: false,
      animation: false,
      timeline: false,
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      selectionIndicator: false,
      fullscreenButton: false,
      skyAtmosphere: new Cesium.SkyAtmosphere(),
      contextOptions: {
        webgl: {
          alpha: true,
          preserveDrawingBuffer: true
        }
      }
    });

    // 1. High-Resolution Photorealistic Satellite Earth (Esri World Imagery)
    // Displays true-color continents, oceans, coastlines, mountain ranges, and countries
    satelliteProvider = new Cesium.UrlTemplateImageryProvider({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      maximumLevel: 19,
      credit: '© Esri, Earthstar Geographics, IIHM Hyderabad'
    });

    // 2. Luxury Dark Matter Basemap (CartoDB Dark Matter)
    darkCanvasProvider = new Cesium.UrlTemplateImageryProvider({
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
      subdomains: ['a', 'b', 'c', 'd'],
      maximumLevel: 19,
      credit: '© CARTO, OpenStreetMap'
    });

    // Mount Satellite Earth as the default primary imagery layer
    activeImageryLayer = viewer.imageryLayers.addImageryProvider(satelliteProvider);

    // Style Scene Atmosphere & Lighting
    const scene = viewer.scene;
    scene.backgroundColor = Cesium.Color.fromCssColorString('#050b18');
    if (scene.globe) {
      scene.globe.baseColor = Cesium.Color.fromCssColorString('#061024');
      scene.globe.enableLighting = false; // Uniform illumination so entire world is visible
      scene.globe.showGroundAtmosphere = true;
    }

    // Set initial Camera Position focusing broadly on India / Asia & Indian Ocean
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(78.4867, 18.0, 15500000), // Height 15,500 km
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-88),
        roll: 0
      }
    });

    // Add IIHM Campus Points & Labels
    addCampusEntities();

    // Add 3D Arcs connecting all locations to Hyderabad
    addConnectionArcs();

    // Enable Smooth Globe Rotation
    enableGlobeRotation();

    // Setup Click/Hover Interaction
    setupCesiumInteraction();

    // Start Automatic Entrance Timer (3.2s of Globe Animation)
    startAutoEntranceTimer(3200);

    // Wire up Buttons
    setupUIControls();
  }

  // Add Campus Markers & Labels to Cesium
  function addCampusEntities() {
    IIHM_CAMPUSES.forEach((campus) => {
      const position = Cesium.Cartesian3.fromDegrees(campus.lon, campus.lat, 1000);

      // Distinct styling for Hyderabad epicenter vs other campuses
      const isHyd = campus.isEpicenter;
      const pointColor = isHyd
        ? Cesium.Color.fromCssColorString('#00FFAA')
        : Cesium.Color.fromCssColorString('#D4AF37');
      const pointSize = isHyd ? 14 : 9;

      viewer.entities.add({
        id: campus.id,
        name: campus.name,
        position: position,
        point: {
          pixelSize: pointSize,
          color: pointColor,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        },
        label: {
          text: campus.name,
          font: isHyd ? 'bold 15px Outfit, sans-serif' : '13px Outfit, sans-serif',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          fillColor: isHyd ? Cesium.Color.fromCssColorString('#00FFAA') : Cesium.Color.fromCssColorString('#F5DF88'),
          outlineColor: Cesium.Color.fromCssColorString('#050B18'),
          outlineWidth: 3,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -14),
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 24000000)
        },
        properties: campus
      });
    });
  }

  // Draw Geodesic Arcs from campuses to Hyderabad
  function addConnectionArcs() {
    const hydCampus = IIHM_CAMPUSES.find(c => c.isEpicenter);
    if (!hydCampus) return;

    IIHM_CAMPUSES.forEach((campus) => {
      if (campus.isEpicenter) return;

      viewer.entities.add({
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            campus.lon, campus.lat,
            hydCampus.lon, hydCampus.lat
          ]),
          width: 2.2,
          arcType: Cesium.ArcType.GEODESIC,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.25,
            taperPower: 0.6,
            color: Cesium.Color.fromCssColorString('#D4AF37')
          })
        }
      });
    });
  }

  // Gentle Globe Rotation (Pauses immediately when a location is hovered or clicked)
  function enableGlobeRotation() {
    let lastTime = Date.now();
    rotationListener = function () {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      if (isMorphing || isRotationPaused) return;
      if (viewer && viewer.scene) {
        viewer.scene.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.045 * delta);
      }
    };
    viewer.scene.postRender.addEventListener(rotationListener);
  }

  // Interaction: Clicking on or Hovering over Campuses
  function setupCesiumInteraction() {
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // Mouse Move (Hover) - Stop rotation and show location SpotlightCard
    handler.setInputAction((movement) => {
      const pickedObject = viewer.scene.pick(movement.endPosition);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        document.body.style.cursor = 'pointer';
        isRotationPaused = true; // STOP globe movement when hovered around any location!
        const campus = pickedObject.id.properties.getValue();
        showCampusCard(campus);
      } else {
        document.body.style.cursor = 'default';
        // Resume rotation only if user has not explicitly clicked/pinned a location
        if (!isLocationPinned) {
          isRotationPaused = false;
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Left Click - Pin location and lock rotation
    handler.setInputAction((click) => {
      AudioEngine.init();
      const pickedObject = viewer.scene.pick(click.position);
      if (Cesium.defined(pickedObject) && pickedObject.id && pickedObject.id.properties) {
        isRotationPaused = true; // STOP globe movement when clicked on any location!
        isLocationPinned = true;
        const campus = pickedObject.id.properties.getValue();
        showCampusCard(campus);

        // Fly smoothly towards picked campus
        viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(campus.lon, campus.lat, 2500000),
          duration: 1.8
        });
      } else {
        // Clicked outside on open space - hide card and resume gentle rotation
        const card = document.getElementById('campus-card');
        if (card && card.style.display !== 'none') {
          card.style.display = 'none';
        }
        isLocationPinned = false;
        isRotationPaused = false;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  // Update Floating Campus SpotlightCard UI (React Bits Engine)
  function showCampusCard(campus) {
    activeCampus = campus;
    const card = document.getElementById('campus-card');
    const nameEl = document.getElementById('campus-name');
    const descEl = document.getElementById('campus-desc');
    const tagEl = document.getElementById('campus-tag');
    const cityEl = document.getElementById('campus-city');
    const callBtn = document.getElementById('campus-call-action');
    const metaEl = document.getElementById('campus-meta');

    if (!card || !nameEl || !descEl) return;

    if (tagEl) tagEl.textContent = campus.tag || 'IIHM Campus';
    nameEl.textContent = campus.name;
    descEl.textContent = campus.desc;
    if (cityEl) cityEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${campus.city || 'India'}`;

    if (campus.isEpicenter) {
      if (tagEl) {
        tagEl.style.background = 'rgba(0, 255, 170, 0.25)';
        tagEl.style.color = '#00ffaa';
        tagEl.style.borderColor = 'rgba(0, 255, 170, 0.4)';
      }
      card.dataset.spotlight = 'emerald';
      if (metaEl) {
        metaEl.innerHTML = `
          <div class="campus-director-badge">
            <div class="director-header-line">
              <span class="dir-badge-pill"><i class="fa-solid fa-crown"></i> Campus Leadership</span>
            </div>
            <a href="https://www.linkedin.com/in/earnest-immanuel-johnpaul-b0312077/" target="_blank" rel="noopener noreferrer" class="director-link-box" title="View Earnest Immanuel Johnpaul on LinkedIn">
              <div class="dir-avatar-icon"><i class="fa-brands fa-linkedin"></i></div>
              <div class="dir-text-wrap">
                <span class="dir-name">Earnest Immanuel Johnpaul</span>
                <span class="dir-title">Director, International Institute of Hotel Management (IIHM) Hyderabad</span>
              </div>
              <i class="fa-solid fa-arrow-up-right-from-square dir-ext-icon"></i>
            </a>
          </div>
        `;
      }
      if (callBtn) {
        callBtn.style.display = 'inline-flex';
        callBtn.href = 'tel:07995581756';
      }
    } else {
      if (tagEl) {
        tagEl.style.background = 'rgba(212, 175, 55, 0.2)';
        tagEl.style.color = '#f5df88';
        tagEl.style.borderColor = 'rgba(212, 175, 55, 0.3)';
      }
      card.dataset.spotlight = 'gold';
      if (metaEl) {
        metaEl.innerHTML = `
          <div class="meta-item"><i class="fa-solid fa-graduation-cap"></i> <span>Global Degree</span></div>
          <div class="meta-item"><i class="fa-solid fa-earth-americas"></i> <span>Global Network</span></div>
        `;
      }
      if (callBtn) {
        callBtn.style.display = 'inline-flex';
        callBtn.href = 'tel:07995581756';
      }
    }

    card.style.display = 'block';

    // Activate/Refresh React Bits SpotlightCard with dynamic theme light
    if (window.SpotlightCard) {
      const spotlightColor = campus.isEpicenter ? '#00ffaa' : '#d4af37';
      window.SpotlightCard.attach(card, {
        spotlightColor: spotlightColor,
        intensity: campus.isEpicenter ? 0.38 : 0.32,
        borderGlow: 0.85,
        proximity: 90,
        ambient: true, // Keeps light drifting on mobile touchscreens
        flare: true,
        softness: 0.65
      });
    }

    // Synchronize active campus pill
    document.querySelectorAll('.campus-pill').forEach(pill => {
      if (pill.dataset.campus === campus.id) {
        pill.classList.add('active');
        pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        pill.classList.remove('active');
      }
    });
  }

  // --- THE CINEMATIC LOGO MORPH SEQUENCE ---
  function triggerGlobeToLogoMorph() {
    if (isMorphing || hasMorphed) return;
    isMorphing = true;
    hasMorphed = true;
    clearTimeout(autoEntranceTimer);

    AudioEngine.playWhoosh();

    // 1. Smooth Camera Fly-In towards Hyderabad epicenter in Cesium
    if (viewer) {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(78.4867, 17.3850, 4500000), // Dramatic zoom
        duration: 1.8,
        orientation: {
          heading: 0,
          pitch: Cesium.Math.toRadians(-90),
          roll: 0
        }
      });
    }

    // 2. Dissolve Cesium canvas with scaling effect
    const container = document.getElementById('globe-container');
    if (container) {
      gsap.to(container, {
        scale: 1.25,
        opacity: 0.18,
        filter: 'blur(8px)',
        duration: 2.0,
        ease: 'power2.inOut'
      });
    }

    // 3. Reveal Official Logo Medallion Stage with radiant light burst & chord chime
    setTimeout(() => {
      AudioEngine.playChime();
      const morphStage = document.getElementById('logo-morph-stage');
      if (morphStage) {
        morphStage.classList.add('active');
      }

      // 4. Automatically advance straight into the respective faculty's portfolio!
      clearTimeout(autoPortfolioTimer);
      autoPortfolioTimer = setTimeout(() => {
        transitionToPortfolio();
      }, 1900);
    }, 1600);
  }

  // Transition from Intro into the Faculty Portfolio (Lightning Fast & Ultra Smooth)
  function transitionToPortfolio() {
    clearTimeout(autoEntranceTimer);
    clearTimeout(autoPortfolioTimer);
    AudioEngine.playWhoosh();
    const introOverlay = document.getElementById('intro-overlay');
    const portfolioApp = document.getElementById('portfolio-app');

    if (portfolioApp) {
      portfolioApp.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Notify window & 3D lanyard engine that container has gained visible geometry
      requestAnimationFrame(() => {
        window.dispatchEvent(new Event('resize'));
        if (window.hydrateFacultyProfile && window.FacultyDB) {
          window.hydrateFacultyProfile(window.FacultyDB.getCurrentFaculty());
        }
        if (window.lanyardBadge && typeof window.lanyardBadge.resize === 'function') {
          window.lanyardBadge.resize();
        } else if (window.reloadLanyardTextures && window.FacultyDB) {
          window.reloadLanyardTextures(window.FacultyDB.getCurrentFaculty());
        }
      });
    }

    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 500);
    }

    // Synchronize URL to active faculty portfolio
    try {
      if (window.FacultyDB) {
        const active = window.FacultyDB.getCurrentFaculty();
        if (active && (!window.location.search || !window.location.search.includes(active.id))) {
          const facultyUrl = window.FacultyDB.getShareableUrl(active.id);
          window.history.replaceState({ facultyId: active.id, page: 'portfolio' }, '', facultyUrl);
        }
      }
    } catch (e) {
      console.warn('URL update error:', e);
    }
  }

  // Return to 3D Globe Homepage
  function replayGlobeIntro() {
    clearTimeout(autoEntranceTimer);
    clearTimeout(autoPortfolioTimer);

    // Update browser URL to clean homepage URL without query params or hashes
    try {
      const cleanUrl = window.location.pathname.replace(/\/faculty\/.*$/, '/');
      if (window.location.search || window.location.hash) {
        window.history.pushState({ page: 'home' }, '', cleanUrl || '/');
      }
    } catch (e) {
      console.warn('URL update error:', e);
    }

    const introOverlay = document.getElementById('intro-overlay');
    const morphStage = document.getElementById('logo-morph-stage');
    const portfolioApp = document.getElementById('portfolio-app');
    const container = document.getElementById('globe-container');

    if (introOverlay) {
      introOverlay.style.display = 'flex';
      void introOverlay.offsetHeight; // trigger reflow for smooth CSS opacity transition
      introOverlay.classList.remove('fade-out');
    }

    if (morphStage) {
      morphStage.classList.remove('active');
    }

    // Hide portfolio content smoothly after globe overlay begins fading in
    setTimeout(() => {
      if (portfolioApp) {
        portfolioApp.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 250);

    if (container) {
      gsap.to(container, {
        scale: 1,
        opacity: 1,
        filter: 'none',
        duration: 0.8
      });
    }

    // Reset Cesium Camera smoothly to global panoramic view
    if (viewer) {
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(78.4867, 17.3850, 16000000),
        duration: 1.6
      });
    }

    // Restore interactive state and allow user to freely explore the 3D globe homepage
    isMorphing = false;
    hasMorphed = false;
    isLocationPinned = false;
    isRotationPaused = false;

    // Display Hyderabad epicenter card by default
    const hydCampus = IIHM_CAMPUSES.find(c => c.isEpicenter);
    if (hydCampus) showCampusCard(hydCampus);
  }

  // Automatic Entrance Timer (Globe -> Logo Morph -> Portfolio)
  function startAutoEntranceTimer(delayMs = 3200) {
    clearTimeout(autoEntranceTimer);
    autoEntranceTimer = setTimeout(() => {
      if (!isLocationPinned && !isMorphing && !hasMorphed) {
        triggerGlobeToLogoMorph();
      }
    }, delayMs);
  }

  // Setup UI Click Events
  function setupUIControls() {
    const morphBtn = document.getElementById('trigger-morph-btn');
    if (morphBtn) morphBtn.addEventListener('click', triggerGlobeToLogoMorph);

    const skipBtn = document.getElementById('skip-intro-btn');
    if (skipBtn) skipBtn.addEventListener('click', transitionToPortfolio);

    const proceedBtn = document.getElementById('proceed-to-portfolio');
    if (proceedBtn) proceedBtn.addEventListener('click', transitionToPortfolio);

    const replayBtn = document.getElementById('replay-globe-btn');
    if (replayBtn) replayBtn.addEventListener('click', replayGlobeIntro);

    const closeCardBtn = document.getElementById('close-campus-card');
    if (closeCardBtn) {
      closeCardBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = document.getElementById('campus-card');
        if (card) card.style.display = 'none';
        isLocationPinned = false;
        isRotationPaused = false;
      });
    }

    const flyBtn = document.getElementById('campus-fly-btn');
    if (flyBtn) {
      flyBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeCampus && viewer) {
          isRotationPaused = true;
          isLocationPinned = true;
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(activeCampus.lon, activeCampus.lat, 2200000),
            duration: 1.6
          });
        }
      });
    }

    // Hovering directly over the SpotlightCard pauses globe movement
    const campusCard = document.getElementById('campus-card');
    if (campusCard) {
      campusCard.addEventListener('mouseenter', () => {
        isRotationPaused = true;
      });
      campusCard.addEventListener('mouseleave', () => {
        if (!isLocationPinned) {
          isRotationPaused = false;
        }
      });
    }

    // Wire up Campus Quick Selector Pills
    document.querySelectorAll('.campus-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        AudioEngine.init();
        isRotationPaused = true; // Stop movement when clicked
        isLocationPinned = true;
        const campusId = pill.dataset.campus;
        const campus = IIHM_CAMPUSES.find(c => c.id === campusId);
        if (campus && viewer) {
          showCampusCard(campus);
          viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(campus.lon, campus.lat, 2500000),
            duration: 1.8
          });
        }
      });

      pill.addEventListener('mouseenter', () => {
        isRotationPaused = true; // Stop movement when hovered
      });

      pill.addEventListener('mouseleave', () => {
        if (!isLocationPinned) {
          isRotationPaused = false;
        }
      });
    });

    // Default to show Hyderabad card first
    const hydCampus = IIHM_CAMPUSES.find(c => c.isEpicenter);
    if (hydCampus) showCampusCard(hydCampus);
  }

  // Expose to window
  window.IIHMGlobe = {
    triggerMorph: triggerGlobeToLogoMorph,
    skipToPortfolio: transitionToPortfolio,
    replayIntro: replayGlobeIntro
  };

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCesiumGlobe);
  } else {
    initCesiumGlobe();
  }
})();
