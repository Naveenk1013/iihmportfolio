/**
 * ============================================================================
 * IIHM HYDERABAD - MULTI-FACULTY PORTFOLIO & QR ROUTING ENGINE
 * Dynamic Hydration, QR Code Generation, 3D Lanyard & Smooth Navigation
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // State
  let activeFaculty = null;
  let lanyardInstance = null;
  const lanyardContainer = document.getElementById('lanyard-container');
  const flipBtn = document.getElementById('lanyard-flip-btn');

  // ==========================================================================
  // 1. DYNAMIC FACULTY PROFILE HYDRATION
  // ==========================================================================
  async function hydrateFacultyProfile(faculty) {
    if (!faculty) return;
    activeFaculty = faculty;

    // 1.1 Document Meta & Title
    document.title = `${faculty.fullName} | ${faculty.shortRole} | IIHM Hyderabad`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `Official academic portfolio of ${faculty.fullName}, ${faculty.roleTitle} at IIHM Hyderabad.`);
    }

    // 1.2 Intro Screen & Morph Stage Button
    const emblemBadge = document.getElementById('emblem-faculty-badge');
    if (emblemBadge) emblemBadge.textContent = faculty.badgeTag;

    const proceedBtnLabel = document.getElementById('proceed-btn-label');
    if (proceedBtnLabel) proceedBtnLabel.textContent = `Explore ${faculty.honorific ? faculty.honorific + ' ' : ''}${faculty.name}'s Profile`;

    // 1.3 Navbar Active Faculty Switcher Pill
    const navActiveAvatar = document.getElementById('nav-active-avatar');
    if (navActiveAvatar) {
      navActiveAvatar.src = faculty.avatar;
      navActiveAvatar.alt = faculty.name;
    }
    const navActiveName = document.getElementById('nav-active-name');
    if (navActiveName) navActiveName.textContent = faculty.name;

    // Mobile Drawer Active Faculty details
    const drawerActiveAvatar = document.getElementById('drawer-active-avatar');
    if (drawerActiveAvatar) {
      drawerActiveAvatar.src = faculty.avatar;
      drawerActiveAvatar.alt = faculty.name;
    }
    const drawerActiveName = document.getElementById('drawer-active-name');
    if (drawerActiveName) drawerActiveName.textContent = faculty.name;
    const drawerActiveRole = document.getElementById('drawer-active-role');
    if (drawerActiveRole) drawerActiveRole.textContent = `${faculty.shortRole} • IIHM`;

    // Highlight active item in switcher menu
    document.querySelectorAll('.switcher-item').forEach(item => {
      if (item.dataset.facultyId === faculty.id) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // 1.4 Hero Section Details
    const facultyTagText = document.getElementById('faculty-tag-text');
    if (facultyTagText) facultyTagText.textContent = faculty.badgeTag;

    const facultyNameEl = document.getElementById('faculty-name');
    if (facultyNameEl) facultyNameEl.textContent = faculty.name;

    const facultyRoleTitleEl = document.getElementById('faculty-role-title');
    if (facultyRoleTitleEl) facultyRoleTitleEl.textContent = faculty.roleTitle;

    const heroBioEl = document.getElementById('hero-bio');
    if (heroBioEl) {
      heroBioEl.innerHTML = faculty.bio.replace('IIHM Hyderabad', '<strong>IIHM Hyderabad</strong>');
    }

    // Hero Contact Ribbon
    const heroEmailVal = document.getElementById('hero-email-val');
    if (heroEmailVal) {
      heroEmailVal.href = `mailto:${faculty.email}`;
      heroEmailVal.textContent = faculty.email;
    }

    const heroCampusVal = document.getElementById('hero-campus-val');
    if (heroCampusVal) heroCampusVal.textContent = faculty.campusLocation;

    const heroDeptVal = document.getElementById('hero-dept-val');
    if (heroDeptVal) heroDeptVal.textContent = faculty.departmentFocus;

    const heroPhoneVal = document.getElementById('hero-phone-val');
    if (heroPhoneVal) {
      heroPhoneVal.href = `tel:${faculty.phone}`;
      heroPhoneVal.textContent = faculty.phone;
    }

    // Hero Social Strip - Active LinkedIn
    const heroLinkedinChip = document.getElementById('hero-linkedin-chip');
    if (heroLinkedinChip) {
      heroLinkedinChip.href = faculty.linkedin;
      heroLinkedinChip.title = `Connect with ${faculty.name} on LinkedIn`;
    }

    // 1.5 3D Lanyard Card Stamp Bar
    const lanyardMetaName = document.getElementById('lanyard-meta-name');
    if (lanyardMetaName) lanyardMetaName.textContent = faculty.name;

    const lanyardMetaRole = document.getElementById('lanyard-meta-role');
    if (lanyardMetaRole) lanyardMetaRole.textContent = `${faculty.shortRole} • IIHM`;

    // 1.6 Overview & Philosophy Section
    const overviewKicker = document.getElementById('overview-kicker');
    if (overviewKicker) {
      overviewKicker.textContent = faculty.id === 'earnest-immanuel' ? 'DIRECTORATE LEADERSHIP' : 'ACADEMIC FOUNDATION';
    }

    const overviewTitle = document.getElementById('overview-title');
    if (overviewTitle) {
      overviewTitle.textContent = faculty.id === 'earnest-immanuel'
        ? 'Hospitality Leadership & Beverage Pedagogy'
        : 'The Rooms Division Discipline';
    }

    const overviewSubtitle = document.getElementById('overview-subtitle');
    if (overviewSubtitle) {
      overviewSubtitle.textContent = faculty.id === 'earnest-immanuel'
        ? 'Directing campus excellence, global UK university accreditations, and high-profile beverage training simulations at IIHM Hyderabad.'
        : 'The Rooms Division is the financial engine and heartbeat of any luxury hotel property, encompassing Front Desk leadership, Concierge, Guest Relations, and Executive Housekeeping.';
    }

    const philosophyGrid = document.getElementById('philosophy-grid');
    if (philosophyGrid && faculty.philosophy) {
      philosophyGrid.innerHTML = faculty.philosophy.map(item => `
        <div class="philosophy-card glass-panel">
          <div class="card-icon gold-badge"><i class="${item.icon}"></i></div>
          <h3>${item.title}</h3>
          <p>${item.desc}</p>
        </div>
      `).join('');
    }

    // 1.7 Executive Labs Showcase
    const labsTitle = document.getElementById('labs-title');
    if (labsTitle) {
      labsTitle.textContent = faculty.id === 'earnest-immanuel'
        ? 'IIHM Hyderabad Executive & Training Facilities'
        : 'IIHM Hyderabad Simulation Labs';
    }

    const labsSubtitle = document.getElementById('labs-subtitle');
    if (labsSubtitle) {
      labsSubtitle.textContent = `Where ${faculty.name} mentors students in authentic 5-star hotel operational spaces right on the Hyderabad campus.`;
    }

    const labsGrid = document.getElementById('labs-showcase-grid');
    if (labsGrid && faculty.labs) {
      labsGrid.innerHTML = faculty.labs.map(lab => `
        <div class="lab-card glass-panel">
          <div class="lab-image-container">
            <img src="${lab.image}" alt="${lab.title}" class="lab-img">
            <div class="lab-overlay">
              <span class="lab-badge">${lab.badge}</span>
            </div>
          </div>
          <div class="lab-info">
            <div class="lab-title-row">
              <h3>${lab.title}</h3>
            </div>
            <p>${lab.desc}</p>
            <div class="lab-features">
              ${lab.highlights.map(h => `<span>${h}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('');
    }

    // 1.8 Academic Quote Banner
    const quoteText = document.getElementById('faculty-quote-text');
    if (quoteText) {
      quoteText.textContent = faculty.id === 'earnest-immanuel'
        ? '"Hospitality leadership is about cultivating vision, mastering the science of beverage service, and creating successful hoteliers who represent India with distinction across global luxury stages."'
        : '"In luxury hospitality, a hotel room is not merely an accommodation; it is a sanctum of well-being and privacy. Our duty at IIHM Hyderabad is to teach students that true excellence lies in noticing the unspoken preferences of every guest."';
    }

    const quoteAuthor = document.getElementById('quote-author-name');
    if (quoteAuthor) quoteAuthor.textContent = faculty.name;

    const quoteAuthorTitle = document.getElementById('quote-author-title');
    if (quoteAuthorTitle) quoteAuthorTitle.textContent = `${faculty.shortRole} | IIHM Hyderabad`;

    // 1.9 Contact Section
    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = `Connect with ${faculty.name}`;

    const contactSubtitle = document.getElementById('contact-subtitle');
    if (contactSubtitle) {
      contactSubtitle.textContent = faculty.id === 'earnest-immanuel'
        ? 'Reach out for campus administration, corporate hotelier partnerships, Skal International inquiries, or student academic mentoring.'
        : 'Reach out for student academic advisement, guest lectures, curriculum research, or hospitality industry collaboration.';
    }

    const contactEmailLink = document.getElementById('contact-email-link');
    if (contactEmailLink) {
      contactEmailLink.href = `mailto:${faculty.email}`;
      contactEmailLink.textContent = faculty.email;
    }

    // Contact LinkedIn Card
    const contactLinkedinCard = document.getElementById('contact-linkedin-card');
    if (contactLinkedinCard) {
      contactLinkedinCard.href = faculty.linkedin;
      contactLinkedinCard.setAttribute('aria-label', `Connect with ${faculty.name} on LinkedIn`);
    }
    const contactLinkedinHandle = document.getElementById('contact-linkedin-handle');
    if (contactLinkedinHandle) contactLinkedinHandle.textContent = faculty.name;

    // Contact Engagement Channel Cards
    const channelsColDesc = document.getElementById('channels-col-desc');
    if (channelsColDesc) channelsColDesc.textContent = faculty.officeChannelDesc;

    const channelEmailCard = document.getElementById('channel-email-card');
    if (channelEmailCard) channelEmailCard.href = `mailto:${faculty.email}?subject=Official%20Inquiry%20-%20IIHM%20Hyderabad`;

    const channelEmailDesc = document.getElementById('channel-email-desc');
    if (channelEmailDesc) channelEmailDesc.textContent = `Direct correspondence to ${faculty.name}'s official inbox`;

    const channelEmailAction = document.getElementById('channel-email-action');
    if (channelEmailAction) channelEmailAction.textContent = `${faculty.email} →`;

    // 1.10 Dossier Modal Details
    const dossierModalHeading = document.getElementById('dossier-modal-heading');
    if (dossierModalHeading) dossierModalHeading.textContent = `${faculty.name} — Academic Dossier`;

    const dossierAvatar = document.getElementById('dossier-avatar');
    if (dossierAvatar) {
      dossierAvatar.src = faculty.avatar;
      dossierAvatar.alt = faculty.name;
    }

    const dossierName = document.getElementById('dossier-name');
    if (dossierName) dossierName.textContent = faculty.name;

    const dossierRoleTitle = document.getElementById('dossier-role-title');
    if (dossierRoleTitle) dossierRoleTitle.textContent = faculty.roleTitle;

    const dossierLinkedinChip = document.getElementById('dossier-linkedin-chip');
    if (dossierLinkedinChip) dossierLinkedinChip.href = faculty.linkedin;

    const dossierEmailBtn = document.getElementById('dossier-email-btn');
    if (dossierEmailBtn) dossierEmailBtn.href = `mailto:${faculty.email}?subject=Inquiry%20regarding%20Academic%20Dossier`;

    const dossierEmailBtnText = document.getElementById('dossier-email-btn-text');
    if (dossierEmailBtnText) dossierEmailBtnText.textContent = `Email ${faculty.name}`;

    const dossierPhoneBtn = document.getElementById('dossier-phone-btn');
    if (dossierPhoneBtn) {
      dossierPhoneBtn.href = `tel:${faculty.phone}`;
      dossierPhoneBtn.textContent = `Call ${faculty.phone}`;
    }

    // Dossier Content Sections
    const dossierSectionsContainer = document.getElementById('dossier-content-sections');
    if (dossierSectionsContainer && faculty.dossierSections) {
      dossierSectionsContainer.innerHTML = faculty.dossierSections.map(sec => `
        <div class="dossier-item">
          <h5><i class="${sec.icon} gold-icon"></i> ${sec.title}</h5>
          <p>${sec.desc}</p>
        </div>
      `).join('');
    }

    // 1.11 Re-render 3D Lanyard Card with Faculty Textures
    await reloadLanyardTextures(faculty);
  }

  // ==========================================================================
  // 2. 3D LANYARD COMPONENT LIFECYCLE & TEXTURE REFRESH
  // ==========================================================================
  async function reloadLanyardTextures(faculty) {
    if (!lanyardContainer || !window.initLanyard || !window.generateFacultyBadgeTextures) return;

    const loadingIndicator = lanyardContainer.querySelector('.lanyard-loading-indicator');

    try {
      if (lanyardInstance) {
        lanyardInstance.destroy();
        lanyardInstance = null;
      }

      const textures = await window.generateFacultyBadgeTextures(faculty);

      lanyardInstance = window.initLanyard(lanyardContainer, {
        frontImage: textures.front || textures.frontUrl,
        backImage: textures.back || textures.backUrl,
        strapImage: textures.strap || textures.strapUrl,
        strapLength: 0.44,
        size: 0.62,
        anchor: 'center',
        finish: 'holographic',
        metal: 'gold',
        cardColor: (faculty && faculty.lanyardBadge) ? faculty.lanyardBadge.cardColor : '#0c1b38',
        strapColor: '#061026',
        strapWidth: 0.72,
        breeze: 0.35,
        damping: 0.45,
        elasticity: 0.52,
        gravity: 0.95,
        interactive: true,
        intro: true
      });

      window.lanyardBadge = lanyardInstance;

      if (loadingIndicator) {
        loadingIndicator.classList.add('loaded');
      }
    } catch (err) {
      console.error('Error loading 3D Lanyard textures:', err);
      if (loadingIndicator) {
        loadingIndicator.classList.add('loaded');
      }
    }
  }

  // Expose to window for seamless coordination across globe and navigation transitions
  window.reloadLanyardTextures = reloadLanyardTextures;

  // Flip 3D badge button handler
  if (flipBtn) {
    flipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (lanyardInstance) lanyardInstance.flip();
    });
  }

  // ==========================================================================
  // 3. FACULTY SWITCHER DROPDOWN (NAVBAR)
  // ==========================================================================
  const switcherWrapper = document.getElementById('faculty-switcher-wrapper');
  const switcherBtn = document.getElementById('faculty-switcher-btn');
  const switcherMenu = document.getElementById('faculty-switcher-menu');

  if (switcherWrapper && switcherBtn && switcherMenu) {
    switcherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = switcherMenu.classList.contains('open');
      if (isOpen) {
        switcherMenu.classList.remove('open');
        switcherWrapper.classList.remove('open');
        switcherBtn.setAttribute('aria-expanded', 'false');
      } else {
        switcherMenu.classList.add('open');
        switcherWrapper.classList.add('open');
        switcherBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close switcher on outside click
    document.addEventListener('click', (e) => {
      if (!switcherWrapper.contains(e.target)) {
        switcherMenu.classList.remove('open');
        switcherWrapper.classList.remove('open');
        switcherBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Handle selecting a faculty from dropdown (Instant & Frictionless)
    document.querySelectorAll('.switcher-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const facultyId = item.dataset.facultyId;
        if (window.FacultyDB) {
          const faculty = window.FacultyDB.getFacultyById(facultyId);
          if (faculty && faculty.id !== (activeFaculty && activeFaculty.id)) {
            hydrateFacultyProfile(faculty);
            // Update browser URL seamlessly
            const newUrl = window.FacultyDB.getShareableUrl(faculty.id);
            window.history.pushState({ facultyId: faculty.id }, '', newUrl);
          }
        }
        switcherMenu.classList.remove('open');
        switcherWrapper.classList.remove('open');
        switcherBtn.setAttribute('aria-expanded', 'false');
        if (typeof closeMobileMenu === 'function') {
          closeMobileMenu();
        }
      });
    });
  }

  // Handle browser Back / Forward history navigation
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page === 'home' && window.IIHMGlobe) {
      window.IIHMGlobe.replayIntro();
      return;
    }
    if (window.FacultyDB) {
      const currentFaculty = window.FacultyDB.getCurrentFaculty();
      if (currentFaculty && currentFaculty.id !== (activeFaculty && activeFaculty.id)) {
        hydrateFacultyProfile(currentFaculty);
      }
    }
  });

  // ==========================================================================
  // 4. NAVBAR GLASS BLUR ON SCROLL
  // ==========================================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(5, 11, 24, 0.95)';
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
    } else {
      navbar.style.background = 'rgba(5, 11, 24, 0.82)';
      navbar.style.boxShadow = 'none';
    }
  });

  // ==========================================================================
  // 5. MOBILE NAVIGATION DRAWER & TOUCH ERGONOMICS
  // ==========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const drawerViewDossierBtn = document.getElementById('drawer-view-dossier-btn');
  const drawerReplayGlobeBtn = document.getElementById('drawer-replay-globe-btn');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('open');
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.add('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
    }
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('open');
    if (mobileMenuToggle) {
      mobileMenuToggle.classList.remove('is-active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', () => {
      closeMobileMenu();
    });
  }

  // Close mobile drawer when clicking navigation links inside it
  document.querySelectorAll('.drawer-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  if (drawerViewDossierBtn && dossierModal) {
    drawerViewDossierBtn.addEventListener('click', () => {
      closeMobileMenu();
      dossierModal.showModal();
    });
  }

  if (drawerReplayGlobeBtn && window.IIHMGlobe) {
    drawerReplayGlobeBtn.addEventListener('click', () => {
      closeMobileMenu();
      window.IIHMGlobe.replayIntro();
    });
  }

  // Close drawer on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // ==========================================================================
  // 6. DOSSIER MODAL SETUP
  // ==========================================================================
  const dossierModal = document.getElementById('dossier-modal');
  const viewDossierBtn = document.getElementById('view-dossier-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const closeModalActionBtn = document.getElementById('close-modal-action-btn');
  const openConsultationBtn = document.getElementById('open-consultation-dossier');

  if (dossierModal) {
    if (viewDossierBtn) viewDossierBtn.addEventListener('click', () => dossierModal.showModal());
    if (openConsultationBtn) openConsultationBtn.addEventListener('click', () => dossierModal.showModal());
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => dossierModal.close());
    if (closeModalActionBtn) closeModalActionBtn.addEventListener('click', () => dossierModal.close());

    dossierModal.addEventListener('click', (e) => {
      const rect = dossierModal.getBoundingClientRect();
      const inDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!inDialog) dossierModal.close();
    });
  }

  // ==========================================================================
  // 7. SMOOTH ANCHOR LINK NAVIGATION
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // 9. INITIALIZE ON LOAD: HYDRATE ACTIVE FACULTY PROFILE
  // ==========================================================================
  if (window.FacultyDB) {
    const initialFaculty = window.FacultyDB.getCurrentFaculty();
    hydrateFacultyProfile(initialFaculty);
  }
});
