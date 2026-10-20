/**
 * ============================================================================
 * SPOTLIGHT CARD - REACT BITS ADAPTATION (Vanilla JS Engine)
 * Dynamic pointer-following spotlight, ambient motion & luxury border glow
 * Mobile-first touch & ambient drift support
 * ============================================================================
 */

(function () {
  'use strict';

  const THEMES = {
    dark: {
      surface: '#09142c',
      border: 'rgba(212, 175, 55, 0.22)',
      shadow: '0 24px 48px -24px rgba(0, 0, 0, 0.75)',
      light: '#d4af37',
      fill: 1,
      edge: 1
    },
    emerald: {
      surface: '#071b26',
      border: 'rgba(0, 255, 170, 0.3)',
      shadow: '0 24px 48px -24px rgba(0, 0, 0, 0.75)',
      light: '#00ffaa',
      fill: 1,
      edge: 1
    },
    light: {
      surface: '#ffffff',
      border: 'rgba(24, 24, 27, 0.1)',
      shadow: '0 1px 2px rgba(24, 24, 27, 0.04), 0 18px 40px -20px rgba(24, 24, 27, 0.16)',
      light: '#18181b',
      fill: 0.28,
      edge: 0.7
    }
  };

  const NOISE =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const falloff = (color, softness) => {
    const soft = clamp(softness, 0, 1);
    const core = Math.pow(1 - soft, 1.5) * 0.85;
    const stop = (alpha, at) =>
      `color-mix(in srgb, ${color} ${(alpha * 100).toFixed(2)}%, transparent) ${(at * 100).toFixed(2)}%`;
    const list = [stop(1, 0)];
    for (let i = 0; i <= 14; i++) {
      const t = core + ((1 - core) * i) / 14;
      const g = (t - core) / (1 - core);
      const smooth = 1 - g * g * (3 - 2 * g);
      const glow = Math.exp(-4.6 * g * g) * (1 - Math.pow(g, 6));
      list.push(stop(smooth + (glow - smooth) * soft, t));
    }
    return list.join(', ');
  };

  function attachSpotlightCard(root, options = {}) {
    if (!root) return null;
    if (root.__spotlightInstance) {
      root.__spotlightInstance.update(options);
      return root.__spotlightInstance;
    }

    // Ensure structural layers exist
    let light = root.querySelector('.spotlight-card__light');
    if (!light) {
      light = document.createElement('span');
      light.className = 'spotlight-card__light';
      light.setAttribute('aria-hidden', 'true');
      root.insertBefore(light, root.firstChild);
    }

    let noise = root.querySelector('.spotlight-card__grain');
    if (!noise) {
      noise = document.createElement('span');
      noise.className = 'spotlight-card__grain';
      noise.setAttribute('aria-hidden', 'true');
      noise.style.backgroundImage = NOISE;
      root.insertBefore(noise, light.nextSibling);
    }

    let border = root.querySelector('.spotlight-card__border');
    if (!border) {
      border = document.createElement('span');
      border.className = 'spotlight-card__border';
      border.setAttribute('aria-hidden', 'true');
      root.appendChild(border);
    }

    let edge = root.querySelector('.spotlight-card__edge');
    if (!edge) {
      edge = document.createElement('span');
      edge.className = 'spotlight-card__edge';
      edge.setAttribute('aria-hidden', 'true');
      root.appendChild(edge);
    }

    const themeKey = options.theme || (root.dataset.spotlight === 'emerald' ? 'emerald' : 'dark');
    const palette = THEMES[themeKey] || THEMES.dark;
    const color = options.spotlightColor || palette.light;
    const shape = options.shape || 'circle';

    let settings = {
      shape,
      fill: falloff(color, options.softness ?? 0.7),
      edge: falloff(color, 1),
      size: Math.max(20, options.spotlightSize ?? 260),
      intensity: clamp(options.intensity ?? 0.35, 0, 1) * palette.fill,
      borderGlow: clamp(options.borderGlow ?? 0.8, 0, 1) * palette.edge,
      proximity: Math.max(0, options.proximity ?? 80),
      smoothing: clamp(options.smoothing ?? 0.25, 0, 1),
      ambient: options.ambient !== undefined ? options.ambient : true, // Ambient drift on by default for mobile
      flare: options.flare !== undefined ? options.flare : true,
      grain: clamp(options.grain ?? 0.05, 0, 1)
    };

    root.style.setProperty('--spotlight-card-surface', palette.surface);
    root.style.setProperty('--spotlight-card-border', palette.border);
    root.style.setProperty('--spotlight-card-shadow', palette.shadow);

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = {
      x: 0,
      y: 0,
      presence: 0,
      flare: 0,
      time: Math.random() * 60,
      pressed: false,
      visible: true
    };
    const pointer = { x: 0, y: 0, active: false };
    const drawn = { light: '', edge: '', noise: '' };
    let focus = null;
    let raf = 0;
    let last = 0;
    let alive = true;

    const gradient = (s, size, x, y, stops) => {
      if (s.shape === 'beam') {
        const reach = Math.max(size * 0.6, y + size * 0.55);
        return `radial-gradient(${(size * 0.55).toFixed(1)}px ${reach.toFixed(1)}px at ${x.toFixed(1)}px 0px, ${stops})`;
      }
      return `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, ${stops})`;
    };

    const paint = s => {
      const size = s.size * (1 + 0.25 * state.flare);
      const boost = 1 + 0.75 * state.flare;
      const fill = gradient(s, size, state.x, state.y, s.fill);
      const rim = gradient(s, size * 0.65, state.x, s.shape === 'beam' ? 0 : state.y, s.edge);
      if (fill !== drawn.light) {
        drawn.light = fill;
        light.style.background = fill;
      }
      if (rim !== drawn.edge) {
        drawn.edge = rim;
        edge.style.background = rim;
      }
      light.style.opacity = String(Math.min(1, state.presence * s.intensity * boost));
      edge.style.opacity = String(Math.min(1, state.presence * s.borderGlow * boost));
      const grainy = s.grain > 0 ? gradient(s, size, state.x, state.y, '#000 0%, transparent 100%') : 'none';
      if (grainy !== drawn.noise) {
        drawn.noise = grainy;
        noise.style.webkitMaskImage = grainy;
        noise.style.maskImage = grainy;
      }
      noise.style.opacity = String(state.presence * s.grain);
    };

    const tick = now => {
      raf = 0;
      if (!alive) return;
      const s = settings;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const rect = root.getBoundingClientRect();
      let tx = state.x;
      let ty = state.y;
      let target = 0;

      if (focus && root.contains(focus)) {
        const box = focus.getBoundingClientRect();
        tx = box.left + box.width / 2 - rect.left;
        ty = box.top + box.height / 2 - rect.top;
        target = 1;
      } else if (pointer.active) {
        tx = pointer.x - rect.left;
        ty = pointer.y - rect.top;
        const gap = Math.hypot(Math.max(0, -tx, tx - rect.width), Math.max(0, -ty, ty - rect.height));
        if (gap === 0) target = 1;
        else if (s.proximity > 0) target = Math.pow(Math.max(0, 1 - gap / s.proximity), 2);
      }

      // Ambient drift keeps card alive on mobile touchscreens without a mouse
      if (target < 0.6 && s.ambient && state.visible) {
        if (!reduce) state.time += dt;
        const drift = 0.6 - target;
        tx += (rect.width * (0.5 + 0.35 * Math.sin(state.time * 0.45)) - tx) * (drift / 0.6);
        ty += (rect.height * (0.5 + 0.32 * Math.sin(state.time * 0.65 + 1.2)) - ty) * (drift / 0.6);
        target = 0.65;
      }

      if (state.presence < 0.02 && target > 0 && !s.ambient) {
        state.x = tx;
        state.y = ty;
      }

      const follow = reduce || s.smoothing === 0 ? 1 : 1 - Math.exp(-dt / (0.015 + s.smoothing * 0.22));
      state.x += (tx - state.x) * follow;
      state.y += (ty - state.y) * follow;
      const fade = reduce ? 1 : 1 - Math.exp(-dt / (target > state.presence ? 0.1 : 0.32));
      state.presence += (target - state.presence) * fade;
      if (Math.abs(target - state.presence) < 0.002) state.presence = target;
      const press = state.pressed && s.flare && !reduce ? 1 : 0;
      state.flare += (press - state.flare) * (1 - Math.exp(-dt / (press ? 0.05 : 0.28)));
      if (Math.abs(press - state.flare) < 0.002) state.flare = press;

      paint(s);

      const moving = Math.abs(tx - state.x) > 0.1 || Math.abs(ty - state.y) > 0.1;
      const settled = !moving && state.presence === target && state.flare === press;
      if (!settled || (s.ambient && state.visible && !reduce)) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const onMove = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      if (state.presence > 0 || settings.proximity > 0 || root.contains(event.target)) wake();
    };

    const onOut = event => {
      if (event.relatedTarget) return;
      pointer.active = false;
      wake();
    };

    const onDown = event => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      state.pressed = true;
      wake();
    };

    const onUp = event => {
      if (event.pointerType !== 'mouse') pointer.active = false;
      if (!state.pressed && event.pointerType === 'mouse') return;
      state.pressed = false;
      wake();
    };

    const onFocusIn = event => {
      if (!(event.target instanceof Element) || !event.target.matches(':focus-visible')) return;
      focus = event.target;
      wake();
    };

    const onFocusOut = event => {
      if (root.contains(event.relatedTarget)) return;
      focus = null;
      wake();
    };

    const onScroll = () => {
      if (pointer.active || state.presence > 0) wake();
    };

    const observer = new IntersectionObserver(entries => {
      state.visible = entries.some(entry => entry.isIntersecting);
      if (state.visible) wake();
    });
    observer.observe(root);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('focusin', onFocusIn);
    root.addEventListener('focusout', onFocusOut);
    wake();

    const instance = {
      update(newOpts = {}) {
        const newTheme = newOpts.theme || (root.dataset.spotlight === 'emerald' ? 'emerald' : 'dark');
        const newPalette = THEMES[newTheme] || THEMES.dark;
        const newColor = newOpts.spotlightColor || newPalette.light;
        settings = {
          ...settings,
          shape: newOpts.shape || settings.shape,
          fill: falloff(newColor, newOpts.softness ?? 0.7),
          edge: falloff(newColor, 1),
          size: Math.max(20, newOpts.spotlightSize ?? settings.size),
          intensity: clamp(newOpts.intensity ?? 0.35, 0, 1) * newPalette.fill,
          borderGlow: clamp(newOpts.borderGlow ?? 0.8, 0, 1) * newPalette.edge,
          proximity: Math.max(0, newOpts.proximity ?? settings.proximity),
          smoothing: clamp(newOpts.smoothing ?? 0.25, 0, 1),
          ambient: newOpts.ambient !== undefined ? newOpts.ambient : true,
          flare: newOpts.flare !== undefined ? newOpts.flare : true,
          grain: clamp(newOpts.grain ?? 0.05, 0, 1)
        };
        root.style.setProperty('--spotlight-card-surface', newPalette.surface);
        root.style.setProperty('--spotlight-card-border', newPalette.border);
        root.style.setProperty('--spotlight-card-shadow', newPalette.shadow);
        wake();
      },
      setColor(newColor) {
        this.update({ spotlightColor: newColor });
      },
      destroy() {
        alive = false;
        cancelAnimationFrame(raf);
        observer.disconnect();
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerup', onUp);
        window.removeEventListener('pointercancel', onUp);
        window.removeEventListener('scroll', onScroll, { capture: true });
        document.removeEventListener('pointerout', onOut);
        root.removeEventListener('pointerdown', onDown);
        root.removeEventListener('focusin', onFocusIn);
        root.removeEventListener('focusout', onFocusOut);
        root.__spotlightInstance = null;
      }
    };

    root.__spotlightInstance = instance;
    return instance;
  }

  function initAll() {
    document.querySelectorAll('.spotlight-card').forEach(card => {
      attachSpotlightCard(card);
    });
  }

  // Expose global API
  window.SpotlightCard = {
    attach: attachSpotlightCard,
    initAll: initAll
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
