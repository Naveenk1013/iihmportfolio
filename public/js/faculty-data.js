/**
 * ============================================================================
 * IIHM HYDERABAD - FACULTY DIRECTORY & MULTI-PORTFOLIO DATABASE
 * Enables unique URLs, dynamic QR landing pages & instant profile hydration
 * ============================================================================
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FacultyDB = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const FACULTIES = {
    'earnest-immanuel': {
      id: 'earnest-immanuel',
      aliases: [
        'director', 'earnest', 'earnest-johnpaul', 'director-iihm', 'earnest-immanuel-johnpaul',
        'earnest-emanuel', 'earnestemanuel', 'earnest-emanual', 'earnestemanual',
        'earnest-emmanuel', 'earnestemmanuel', 'earnest-immanuel', 'earnestimmanuel',
        'earnest-immanuel-john-paul', 'earnest-john-paul'
      ],
      name: 'Earnest Immanuel Johnpaul',
      honorific: 'Mr.',
      fullName: 'Mr. Earnest Immanuel Johnpaul',
      pronouns: 'He/Him',
      department: 'Campus Administration & Executive Leadership',
      departmentFocus: 'Hospitality Administration & Beverage Training',
      badgeTag: 'CAMPUS DIRECTOR • EXECUTIVE LEADERSHIP',
      roleTitle: 'Director, International Institute of Hotel Management (IIHM) Hyderabad',
      subTitle: 'Hospitality Professional | Secretary, Skal International Hyderabad | HRATS EC Member | Master Beverage Trainer',
      shortRole: 'Director, IIHM Hyderabad',
      bio: 'Having 15 years experience in the hospitality industry, Master Beverage Trainer, and passionate about creating successful hoteliers. Administrating and leading the IIHM Hyderabad campus as Director since September 2018.',
      avatar: 'public/images/earnest_immanuel.jpg',
      email: 'earnestimmanuel@gmail.com',
      phone: '07995581756',
      linkedin: 'https://www.linkedin.com/in/earnest-immanuel-johnpaul-b0312077/',
      experienceYears: '15+',
      experienceDesc: 'Years Hospitality & Beverage Leadership',
      tenure: 'Director since Sep 2018 (8 yrs)',
      mentoredCount: '3,500+',
      campusLocation: 'IIHM Hyderabad Campus, Telangana, India',
      officeHours: 'Mon - Fri: 09:00 AM - 05:00 PM IST',
      officeChannelDesc: 'Executive administration, corporate hotelier recruitment, and Skal International advisement.',
      philosophy: [
        {
          icon: 'fa-solid fa-crown',
          title: 'Campus Leadership & Vision',
          desc: 'Stewarding world-class academic standards, global UK degree accreditations, and institutional excellence across IIHM Hyderabad since 2018.'
        },
        {
          icon: 'fa-solid fa-wine-glass-empty',
          title: 'Master Beverage Training',
          desc: 'Comprehensive mixology science, sommelier cellar curation, sensory tasting pedagogy, and international beverage service protocols.'
        },
        {
          icon: 'fa-solid fa-handshake',
          title: 'Skal & HRATS Industry Governance',
          desc: 'Secretary of Skal International Hyderabad and Executive Committee Member of Hotels & Restaurants Association of Telangana State (HRATS).'
        }
      ],
      labs: [
        {
          badge: 'FACILITY 01 • MASTER CLASS',
          title: 'Beverage Training Suite & Artisanal Mixology Lab',
          desc: 'Advanced mixology workstations, professional cocktail craft stations, comprehensive international spirits inventory, and artisanal barcraft training suites.',
          image: 'public/images/beverage_training_lab.jpg',
          highlights: ['Artisanal Mixology Stations', 'WSET Benchmark Standards', 'Spirits & Bitters Library']
        },
        {
          badge: 'FACILITY 02 • SOMMELIER CELLAR',
          title: 'Sommelier Wine Tasting Amphitheatre & Executive Cellar',
          desc: 'Sensory wine evaluation amphitheatre, temperature-controlled vintage cellar simulations, Riedel varietal stemware suites, and master sommelier tasting protocols.',
          image: 'public/images/sommelier_wine_cellar.jpg',
          highlights: ['Sensory Wine Evaluation', 'Vintage Cellar Controls', 'Sommelier Varietal Tasting']
        }
      ],
      dossierSections: [
        {
          icon: 'fa-solid fa-crown',
          title: 'Institutional Stewardship',
          desc: 'Leading the International Institute of Hotel Management (IIHM) Hyderabad as Director since September 2018 with full administrative and academic oversight.'
        },
        {
          icon: 'fa-solid fa-shield-halved',
          title: 'Industry Association Governance',
          desc: 'Serving as the Secretary of Skal International Hyderabad and Executive Committee (EC) Member of Hotels & Restaurants Association of Telangana State (HRATS).'
        },
        {
          icon: 'fa-solid fa-wine-glass',
          title: 'Beverage Specialist Pedagogy',
          desc: 'Over 15 years as an elite hospitality practitioner and Beverage Trainer, conducting global masterclasses for high-end hospitality brands.'
        },
        {
          icon: 'fa-solid fa-globe',
          title: 'Global Career Placements Mentored',
          desc: 'Facilitated thousands of managerial placements into premier hotel brands including Marriott, Taj, Oberoi, Accor, Hyatt, and luxury cruise liners.'
        }
      ],
      lanyardBadge: {
        title: 'DIRECTOR • EXECUTIVE LEADERSHIP',
        ribbon: '✔ CAMPUS DIRECTOR',
        cardColor: '#07162e',
        accentColor: '#00ffaa'
      }
    },
    'naveen-kumar': {
      id: 'naveen-kumar',
      aliases: ['naveen', 'rooms-division', 'faculty-rooms-division'],
      name: 'Mr. Naveen Kumar',
      honorific: 'Mr.',
      fullName: 'Mr. Naveen Kumar',
      pronouns: 'He/Him',
      department: 'Department of Rooms Division',
      departmentFocus: 'Front Office & Luxury Accommodation Management',
      badgeTag: 'SENIOR FACULTY • DEPARTMENT OF ROOMS DIVISION',
      roleTitle: 'Lecturer & Subject Matter Specialist in Rooms Division',
      subTitle: 'Specialist in Rooms Division, Front Office Dynamics, PMS Workstations & Luxury Accommodation Management',
      shortRole: 'Faculty — Rooms Division',
      bio: 'Guiding next-generation global hoteliers at IIHM Hyderabad. Dedicated to blending operational rigour, Property Management Systems mastery, luxury guest etiquette, and revenue-driven room inventory strategies.',
      avatar: 'public/images/naveen_kumar.jpg',
      email: 'naveen.kumar@iihmhyderabad.com',
      phone: '07995581756',
      linkedin: 'https://www.linkedin.com/in/naveen-kumar-8a40bb170',
      experienceYears: '14+',
      experienceDesc: 'Years Luxury Hospitality Experience',
      tenure: 'Senior Faculty',
      mentoredCount: '1,200+',
      campusLocation: 'IIHM Hyderabad Campus, Telangana, India',
      officeHours: 'Mon - Fri: 09:00 AM - 05:00 PM IST',
      officeChannelDesc: 'Direct communication routes for students, parents, and hospitality corporate recruiters.',
      philosophy: [
        {
          icon: 'fa-solid fa-bell-concierge',
          title: 'Front Office Operational Precision',
          desc: 'Instilling impeccable concierge etiquette, global reservation protocols, VIP staging, and high-pressure guest situation handling.'
        },
        {
          icon: 'fa-solid fa-bed',
          title: 'Luxury Accommodation Mastery',
          desc: '5-star housekeeping protocols, linen inventory science, turndown quality control, and environmental sanitation standards.'
        },
        {
          icon: 'fa-solid fa-laptop-code',
          title: 'PMS Enterprise Workstations',
          desc: 'Hands-on operational training with Oracle Hospitality Opera and IDS Next PMS for dynamic room yield and revenue maximization.'
        }
      ],
      labs: [
        {
          badge: 'LABORATORY 01 • PMS WORKSTATIONS',
          title: 'Executive Front Office Simulation Suite',
          desc: 'Authentic 5-star hotel lobby replica equipped with dual-screen PMS terminals running Oracle Opera & IDS Next hotel ERP platforms.',
          image: 'public/images/rooms_division_lab.jpg',
          highlights: ['Live PMS Workstations', 'Concierge & VIP Staging', 'Dynamic Room Yield Analytics']
        },
        {
          badge: 'LABORATORY 02 • MOCK PRESIDENTIAL LAB',
          title: 'Luxury Presidential Suite & Housekeeping Lab',
          desc: 'Comprehensive presidential suite simulation with master bedroom, marble ensuite, and luxury turn-down service staging.',
          image: 'public/images/housekeeping_suite_lab.jpg',
          highlights: ['5-Star Turndown Rigour', 'Linen Inventory Management', 'Environmental Sanitation Benchmarks']
        }
      ],
      dossierSections: [
        {
          icon: 'fa-solid fa-graduation-cap',
          title: 'Academic Pedagogy',
          desc: 'Over a decade of academic instruction preparing students for UK Bachelor\'s Degrees in Hospitality Management accredited in partnership with University of West London.'
        },
        {
          icon: 'fa-solid fa-hotel',
          title: 'Industry Competency',
          desc: 'Proven track record across international luxury hotel brands, PMS enterprise systems (Oracle Hospitality Opera, IDS Next), room inventory auditing, and housekeeping quality assurance.'
        },
        {
          icon: 'fa-solid fa-globe',
          title: 'Global Placements Mentored',
          desc: 'Mentored numerous students who have secured management trainee roles in Marriott International, The Oberoi Group, Taj Hotels, Accor, and Hyatt across Dubai, London, and Singapore.'
        }
      ],
      lanyardBadge: {
        title: 'FACULTY • ROOMS DIVISION',
        ribbon: '✔ VERIFIED ACADEMIC FACULTY',
        cardColor: '#0c1b38',
        accentColor: '#d4af37'
      }
    }
  };

  /**
   * Resolve faculty by id or alias
   */
  function getFacultyById(query) {
    if (!query) return null;
    const raw = String(query).trim().toLowerCase().replace(/^\//, '');
    const clean = raw.replace(/[\s_+]+/g, '-');
    if (FACULTIES[clean]) return FACULTIES[clean];
    if (FACULTIES[raw]) return FACULTIES[raw];
    for (const key in FACULTIES) {
      const f = FACULTIES[key];
      if (f.id === clean || f.id === raw || (f.aliases && (f.aliases.includes(clean) || f.aliases.includes(raw)))) {
        return f;
      }
    }
    return null;
  }

  /**
   * Determine active faculty from URL query param (?faculty=... or ?id=...)
   * or pathname (/earnest-immanuel, /director, /naveen-kumar)
   */
  function getCurrentFaculty() {
    // 1. Check URL query parameters
    const params = new URLSearchParams(window.location.search);
    const facultyParam = params.get('faculty') || params.get('id') || params.get('profile');
    if (facultyParam) {
      const match = getFacultyById(facultyParam);
      if (match) return match;
    }

    // 2. Check pathname slug
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (path) {
      const slug = path.split('/')[path.startsWith('faculty/') ? 1 : 0];
      const match = getFacultyById(slug);
      if (match) return match;
    }

    // 3. Fallback default: naveen-kumar
    return FACULTIES['naveen-kumar'];
  }

  /**
   * Generate canonical shareable URL for a faculty (for QR codes and sharing)
   */
  function getShareableUrl(facultyId) {
    const faculty = getFacultyById(facultyId) || FACULTIES['naveen-kumar'];
    const origin = window.location.origin || (window.location.protocol + '//' + window.location.host);
    return `${origin}/?faculty=${faculty.id}`;
  }

  return {
    FACULTIES,
    getFacultyById,
    getCurrentFaculty,
    getShareableUrl
  };
});
