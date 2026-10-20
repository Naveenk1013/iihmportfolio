/**
 * Dynamic High-Resolution IIHM Faculty ID Card & Lanyard Strap Canvas Generator
 * Produces crisp 1024x1440 textures for the 3D Lanyard Component
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.generateFacultyBadgeTextures = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function drawRoundRect(ctx, x, y, width, height, radius) {
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(x, y, width, height, radius);
      return;
    }
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function loadImage(src) {
    if (!src) return Promise.resolve(null);
    return new Promise((resolve) => {
      const img = new Image();
      if (typeof src === 'string' && !src.startsWith('data:') && !src.startsWith('blob:')) {
        img.crossOrigin = 'anonymous';
      }
      img.onload = () => resolve(img);
      img.onerror = (e) => {
        console.warn('card-textures: Image failed to load, using procedural fallback:', src);
        resolve(null);
      };
      img.src = src;
    });
  }

  async function generateFacultyBadgeTextures(faculty) {
    if (!faculty && typeof window !== 'undefined' && window.FacultyDB) {
      faculty = window.FacultyDB.getCurrentFaculty();
    }
    const isDirector = faculty && faculty.id === 'earnest-immanuel';
    const avatarSrc = (faculty && faculty.avatar) ? faculty.avatar : 'public/images/naveen_kumar.jpg';
    const [portraitImg, logoImg] = await Promise.all([
      loadImage(avatarSrc),
      loadImage('public/images/iihm_official_logo.png')
    ]);

    const W = 1024;
    const H = 1440;

    // --- 1. FRONT CARD TEXTURE ---
    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = W;
    frontCanvas.height = H;
    const fctx = frontCanvas.getContext('2d');

    // Background gradient: Imperial Midnight Navy
    const bgGrad = fctx.createLinearGradient(0, 0, W, H);
    bgGrad.addColorStop(0, '#060d1e');
    bgGrad.addColorStop(0.5, '#0c1a38');
    bgGrad.addColorStop(1, '#050b18');
    fctx.fillStyle = bgGrad;
    fctx.fillRect(0, 0, W, H);

    // Subtle luxury background pattern
    fctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
    fctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      fctx.beginPath();
      fctx.moveTo(x, 0);
      fctx.lineTo(x + H, H);
      fctx.stroke();
    }

    // Outer Gold Inset Border
    fctx.strokeStyle = '#d4af37';
    fctx.lineWidth = 4;
    fctx.strokeRect(36, 36, W - 72, H - 72);
    fctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    fctx.lineWidth = 1.5;
    fctx.strokeRect(48, 48, W - 96, H - 96);

    // Top Header Banner
    const headGrad = fctx.createLinearGradient(0, 50, 0, 190);
    headGrad.addColorStop(0, '#0d2047');
    headGrad.addColorStop(1, '#07122a');
    fctx.fillStyle = headGrad;
    fctx.fillRect(48, 48, W - 96, 170);

    // Header gold divider line
    fctx.strokeStyle = '#d4af37';
    fctx.lineWidth = 3;
    fctx.beginPath();
    fctx.moveTo(48, 218);
    fctx.lineTo(W - 48, 218);
    fctx.stroke();

    // Top Header Logo & Text
    if (logoImg) {
      fctx.save();
      fctx.beginPath();
      fctx.arc(120, 133, 44, 0, Math.PI * 2);
      fctx.fillStyle = '#ffffff';
      fctx.fill();
      fctx.clip();
      fctx.drawImage(logoImg, 76, 89, 88, 88);
      fctx.restore();
      fctx.strokeStyle = '#d4af37';
      fctx.lineWidth = 2.5;
      fctx.beginPath();
      fctx.arc(120, 133, 44, 0, Math.PI * 2);
      fctx.stroke();
    }

    fctx.fillStyle = '#f5df88';
    fctx.font = 'bold 36px "Cinzel", "Playfair Display", Georgia, serif';
    fctx.fillText('IIHM HYDERABAD', 185, 125);

    fctx.fillStyle = '#a6b4cc';
    fctx.font = '500 22px "Outfit", sans-serif';
    fctx.letterSpacing = '2px';
    fctx.fillText('INTERNATIONAL INSTITUTE OF HOTEL MANAGEMENT', 185, 160);

    // Slot punch cut-out indicator at the top
    fctx.fillStyle = '#050b18';
    fctx.beginPath();
    drawRoundRect(fctx, (W - 220) / 2, 60, 220, 36, 18);
    fctx.fill();
    fctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    fctx.lineWidth = 2;
    fctx.stroke();

    // Portrait Photo in Gold Luxury Frame
    const photoW = 460;
    const photoH = 540;
    const photoX = (W - photoW) / 2;
    const photoY = 270;

    // Portrait glow / shadow
    fctx.shadowColor = 'rgba(212, 175, 55, 0.35)';
    fctx.shadowBlur = 24;
    fctx.strokeStyle = '#d4af37';
    fctx.lineWidth = 5;
    fctx.strokeRect(photoX - 4, photoY - 4, photoW + 8, photoH + 8);
    fctx.shadowBlur = 0; // reset

    if (portraitImg) {
      fctx.drawImage(portraitImg, photoX, photoY, photoW, photoH);
    } else {
      fctx.fillStyle = '#102244';
      fctx.fillRect(photoX, photoY, photoW, photoH);
    }

    // Verified Ribbon Overlay on photo bottom
    fctx.fillStyle = 'rgba(5, 11, 24, 0.88)';
    fctx.fillRect(photoX, photoY + photoH - 52, photoW, 52);
    fctx.fillStyle = '#00ffaa';
    fctx.font = 'bold 20px "Outfit", sans-serif';
    fctx.textAlign = 'center';
    const ribbonText = isDirector ? '✔ CAMPUS DIRECTOR & LEADERSHIP' : '✔ VERIFIED ACADEMIC FACULTY';
    fctx.fillText(ribbonText, photoX + photoW / 2, photoY + photoH - 20);
    fctx.textAlign = 'left';

    // Faculty Name & Credentials
    fctx.fillStyle = '#ffffff';
    fctx.font = 'bold 46px "Cinzel", "Playfair Display", Georgia, serif';
    fctx.textAlign = 'center';
    const facultyName = (faculty && faculty.fullName) ? faculty.fullName : 'Mr. Naveen Kumar';
    fctx.fillText(facultyName, W / 2, 880);

    fctx.fillStyle = '#e8c869';
    fctx.font = '600 26px "Outfit", sans-serif';
    const facultySubtitle = isDirector
      ? 'Director, IIHM Hyderabad • Skal International Secretary'
      : 'Senior Faculty • Department of Rooms Division';
    fctx.fillText(facultySubtitle, W / 2, 925);

    // Decorative Gold divider
    const divGrad = fctx.createLinearGradient(W / 2 - 200, 0, W / 2 + 200, 0);
    divGrad.addColorStop(0, 'transparent');
    divGrad.addColorStop(0.5, '#d4af37');
    divGrad.addColorStop(1, 'transparent');
    fctx.strokeStyle = divGrad;
    fctx.lineWidth = 3;
    fctx.beginPath();
    fctx.moveTo(W / 2 - 200, 955);
    fctx.lineTo(W / 2 + 200, 955);
    fctx.stroke();

    // Faculty Meta Details Grid
    fctx.textAlign = 'left';
    const gridY = 990;

    fctx.fillStyle = '#8e9fb8';
    fctx.font = '500 20px "Outfit", sans-serif';
    fctx.fillText('FACULTY ID', 120, gridY);
    fctx.fillText('CAMPUS', 420, gridY);
    fctx.fillText('STATUS', 720, gridY);

    fctx.fillStyle = '#f5f7fc';
    fctx.font = 'bold 24px "Outfit", sans-serif';
    fctx.fillText(isDirector ? 'IIHM-HYD-DIR-01' : 'IIHM-HYD-042', 120, gridY + 32);
    fctx.fillText('Hyderabad, IN', 420, gridY + 32);
    fctx.fillStyle = '#00ffaa';
    fctx.fillText(isDirector ? 'DIRECTOR' : 'ACTIVE', 720, gridY + 32);

    // Second row
    fctx.fillStyle = '#8e9fb8';
    fctx.font = '500 20px "Outfit", sans-serif';
    fctx.fillText('DISCIPLINE', 120, gridY + 95);
    fctx.fillText('ACCREDITATION', 420, gridY + 95);
    fctx.fillText('VALIDITY', 720, gridY + 95);

    fctx.fillStyle = '#f5f7fc';
    fctx.font = 'bold 24px "Outfit", sans-serif';
    fctx.fillText(isDirector ? 'Executive Admin' : 'Rooms Division', 120, gridY + 127);
    fctx.fillText(isDirector ? 'Skal / UWL London' : 'UWL London', 420, gridY + 127);
    fctx.fillText('2026 - 2030', 720, gridY + 127);

    // Gold Hologram Emblem Seal (Bottom Center)
    const holoX = W / 2;
    const holoY = 1260;
    const holoGrad = fctx.createRadialGradient(holoX, holoY, 0, holoX, holoY, 65);
    holoGrad.addColorStop(0, '#fff4cc');
    holoGrad.addColorStop(0.3, '#d4af37');
    holoGrad.addColorStop(0.7, '#8a6e1d');
    holoGrad.addColorStop(1, '#57420b');
    fctx.fillStyle = holoGrad;
    fctx.beginPath();
    fctx.arc(holoX, holoY, 60, 0, Math.PI * 2);
    fctx.fill();
    fctx.strokeStyle = '#ffffff';
    fctx.lineWidth = 2;
    fctx.stroke();

    fctx.fillStyle = '#061024';
    fctx.font = 'bold 15px "Cinzel", serif';
    fctx.textAlign = 'center';
    fctx.fillText('OFFICIAL', holoX, holoY - 14);
    fctx.fillText('CREDENTIAL', holoX, holoY + 6);
    fctx.fillText('★ IIHM ★', holoX, holoY + 26);

    // Barcode at bottom right
    fctx.fillStyle = '#ffffff';
    fctx.fillRect(W - 280, 1220, 200, 48);
    fctx.fillStyle = '#000000';
    for (let bx = W - 275; bx < W - 85; bx += 7) {
      const barW = (bx % 3 === 0) ? 4 : 2;
      fctx.fillRect(bx, 1224, barW, 40);
    }

    // Microchip at bottom left
    const chipX = 90;
    const chipY = 1215;
    const chipGrad = fctx.createLinearGradient(chipX, chipY, chipX + 80, chipY + 60);
    chipGrad.addColorStop(0, '#f9e8a2');
    chipGrad.addColorStop(0.5, '#c59b27');
    chipGrad.addColorStop(1, '#8c6d1a');
    fctx.fillStyle = chipGrad;
    drawRoundRect(fctx, chipX, chipY, 84, 64, 8);
    fctx.fill();
    fctx.strokeStyle = '#5c4309';
    fctx.lineWidth = 1.5;
    fctx.stroke();
    // Chip contact lines
    fctx.beginPath();
    fctx.moveTo(chipX + 28, chipY);
    fctx.lineTo(chipX + 28, chipY + 64);
    fctx.moveTo(chipX + 56, chipY);
    fctx.lineTo(chipX + 56, chipY + 64);
    fctx.moveTo(chipX, chipY + 32);
    fctx.lineTo(chipX + 84, chipY + 32);
    fctx.stroke();

    // Footer copyright line
    fctx.fillStyle = '#657896';
    fctx.font = '16px "Outfit", sans-serif';
    fctx.textAlign = 'center';
    fctx.fillText('INTERNATIONAL INSTITUTE OF HOTEL MANAGEMENT • HYDERABAD CAMPUS', W / 2, 1375);


    // --- 2. BACK CARD TEXTURE ---
    const backCanvas = document.createElement('canvas');
    backCanvas.width = W;
    backCanvas.height = H;
    const bctx = backCanvas.getContext('2d');

    // Deep midnight navy base
    bctx.fillStyle = '#060e22';
    bctx.fillRect(0, 0, W, H);

    // Magnetic Stripe across top
    bctx.fillStyle = '#14171f';
    bctx.fillRect(0, 110, W, 140);
    bctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    bctx.fillRect(0, 175, W, 10);

    // Gold borders
    bctx.strokeStyle = '#d4af37';
    bctx.lineWidth = 4;
    bctx.strokeRect(36, 36, W - 72, H - 72);
    bctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
    bctx.lineWidth = 1.5;
    bctx.strokeRect(48, 48, W - 96, H - 96);

    // Large Center Emblem
    if (logoImg) {
      bctx.save();
      bctx.beginPath();
      bctx.arc(W / 2, 530, 180, 0, Math.PI * 2);
      bctx.fillStyle = '#ffffff';
      bctx.fill();
      bctx.clip();
      bctx.drawImage(logoImg, W / 2 - 180, 350, 360, 360);
      bctx.restore();
      bctx.strokeStyle = '#d4af37';
      bctx.lineWidth = 6;
      bctx.beginPath();
      bctx.arc(W / 2, 530, 180, 0, Math.PI * 2);
      bctx.stroke();
    }

    // Institutional Header
    bctx.fillStyle = '#f5df88';
    bctx.font = 'bold 36px "Cinzel", Georgia, serif';
    bctx.textAlign = 'center';
    bctx.fillText('INTERNATIONAL INSTITUTE', W / 2, 790);
    bctx.fillText('OF HOTEL MANAGEMENT', W / 2, 835);

    bctx.fillStyle = '#ffffff';
    bctx.font = '600 26px "Outfit", sans-serif';
    bctx.fillText('HYDERABAD CAMPUS', W / 2, 880);

    // Terms & Return Info Box
    bctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    drawRoundRect(bctx, 100, 930, W - 200, 290, 16);
    bctx.fill();
    bctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    bctx.lineWidth = 1.5;
    bctx.stroke();

    bctx.fillStyle = '#e8c869';
    bctx.font = 'bold 20px "Outfit", sans-serif';
    bctx.fillText(isDirector ? 'EXECUTIVE DIRECTOR IDENTIFICATION CARD' : 'ACADEMIC FACULTY IDENTIFICATION CARD', W / 2, 970);

    bctx.fillStyle = '#a6b4cc';
    bctx.font = '19px "Outfit", sans-serif';
    bctx.fillText('This credential is the property of IIHM Hyderabad.', W / 2, 1015);
    bctx.fillText(isDirector ? 'Authorized bearer is the accredited Campus Director.' : 'Authorized bearer is an accredited Senior Faculty Member.', W / 2, 1045);
    bctx.fillText(isDirector ? 'If found, please return to Director\'s Office, IIHM Hyderabad.' : 'If found, please return to Faculty Office, IIHM Hyderabad.', W / 2, 1075);

    bctx.fillStyle = '#ffffff';
    bctx.font = 'bold 21px "Outfit", sans-serif';
    const emailStr = (faculty && faculty.email) ? faculty.email : 'naveen.kumar@iihmhyderabad.com';
    bctx.fillText('Office Email: ' + emailStr, W / 2, 1130);
    bctx.fillText(isDirector ? 'Affiliations: Skal International • HRATS • UWL UK' : 'Global Partner: University of West London, UK', W / 2, 1165);

    // QR Code simulation placeholder (Bottom Center)
    const qrX = W / 2 - 50;
    const qrY = 1250;
    bctx.fillStyle = '#ffffff';
    bctx.fillRect(qrX, qrY, 100, 100);
    bctx.fillStyle = '#050b18';
    bctx.fillRect(qrX + 8, qrY + 8, 28, 28);
    bctx.fillRect(qrX + 64, qrY + 8, 28, 28);
    bctx.fillRect(qrX + 8, qrY + 64, 28, 28);
    bctx.fillStyle = '#ffffff';
    bctx.fillRect(qrX + 16, qrY + 16, 12, 12);
    bctx.fillRect(qrX + 72, qrY + 16, 12, 12);
    bctx.fillRect(qrX + 16, qrY + 72, 12, 12);
    bctx.fillStyle = '#050b18';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if ((r + c) % 2 === 0) bctx.fillRect(qrX + 42 + (c * 6), qrY + 42 + (r * 6), 5, 5);
      }
    }

    // --- 3. LANYARD STRAP TEXTURE (Horizontal format: 768px along, 192px across) ---
    const strapCanvas = document.createElement('canvas');
    strapCanvas.width = 768;
    strapCanvas.height = 192;
    const sctx = strapCanvas.getContext('2d');

    // Deep Navy Strap base
    sctx.fillStyle = '#061026';
    sctx.fillRect(0, 0, 768, 192);

    // Gold woven outer borders
    sctx.fillStyle = '#d4af37';
    sctx.fillRect(0, 0, 768, 10);
    sctx.fillRect(0, 182, 768, 10);

    sctx.fillStyle = 'rgba(212, 175, 55, 0.4)';
    sctx.fillRect(0, 16, 768, 3);
    sctx.fillRect(0, 173, 768, 3);

    // Centered gold typography along strap
    sctx.fillStyle = '#f5df88';
    sctx.font = 'bold 30px "Cinzel", "Outfit", sans-serif';
    sctx.textAlign = 'center';
    sctx.textBaseline = 'middle';
    sctx.fillText('★  IIHM HYDERABAD  ★  HOTEL MANAGEMENT  ★', 384, 96);

    let frontUrl = null;
    let backUrl = null;
    let strapUrl = null;
    try { frontUrl = frontCanvas.toDataURL('image/png'); } catch (e) { console.warn('front toDataURL fallback:', e); }
    try { backUrl = backCanvas.toDataURL('image/png'); } catch (e) { console.warn('back toDataURL fallback:', e); }
    try { strapUrl = strapCanvas.toDataURL('image/png'); } catch (e) { console.warn('strap toDataURL fallback:', e); }

    return {
      front: frontCanvas,
      back: backCanvas,
      strap: strapCanvas,
      frontUrl: frontUrl || frontCanvas,
      backUrl: backUrl || backCanvas,
      strapUrl: strapUrl || strapCanvas
    };
  }

  return generateFacultyBadgeTextures;
});
