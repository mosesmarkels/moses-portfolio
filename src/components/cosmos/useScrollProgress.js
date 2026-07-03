import { useEffect, useRef } from 'react';

// Tracks scroll progress (0–1) and smoothed mouse position in a plain mutable
// ref (not React state) so the 3D render loop and the HTML overlay can read
// it every frame without triggering React re-renders.
export function useScrollProgress() {
  const containerRef = useRef(null);
  const state = useRef({ p: 0, mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      // clamp: macOS rubber-band overscroll can push scrollTop past [0, max]
      state.current.p = max > 0 ? clamp(el.scrollTop / max, 0, 1) : 0;
    };
    const onMove = (e) => {
      state.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      state.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('mousemove', onMove);
    onScroll();

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return { containerRef, state };
}

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const bell = (t, c, w) => clamp(1 - Math.abs(t - c) / w, 0, 1);

// Where to place a hotspot's card, offset to whichever side of its on-screen
// anchor point. Two ~300px-wide cards can't sit side by side on a phone
// screen, so below a width threshold this switches "side" from a
// horizontal offset to a vertical one (cards stack top/bottom, centered
// horizontally) instead — a fixed horizontal push-by would otherwise clamp
// both cards into nearly the same spot and stack them on top of each other.
export function cardPosition(sx, sy, side, W, H) {
  const off = side === 'left' ? -1 : 1;
  if (W < 640) {
    const cxMargin = Math.min(190, W / 2 - 10);
    const cyMargin = Math.min(165, Math.max(90, H / 2 - 20));
    const pushBy = Math.min(150, H * 0.16);
    return {
      cx: clamp(sx, cxMargin, W - cxMargin),
      cy: clamp(sy + off * pushBy, cyMargin, H - cyMargin),
    };
  }
  const margin = Math.min(205, Math.max(24, W / 2 - 12));
  const pushBy = Math.min(175, W * 0.2);
  return {
    cx: clamp(sx + off * pushBy, margin, W - margin),
    cy: clamp(sy, 150, H - 165),
  };
}

// Ref bundle HotspotOverlay/Director write to each frame — shared by both
// the galaxy-select page and each galaxy's planet page so the ref-setup
// boilerplate isn't duplicated.
export function useOverlayRefs(count, { hero = true, title = false } = {}) {
  const cardRefs = useRef(new Array(count).fill(null));
  const dotRefs = useRef(new Array(count).fill(null));
  const heroRef = useRef(null);
  const scrimRef = useRef(null);
  const titleRef = useRef(null);
  const contactRef = useRef(null);
  const fillRef = useRef(null);
  const scrollCueRef = useRef(null);
  return {
    cardRefs,
    dotRefs,
    heroRef: hero ? heroRef : undefined,
    scrimRef: hero ? scrimRef : undefined,
    titleRef: title ? titleRef : undefined,
    contactRef,
    fillRef,
    scrollCueRef: hero ? scrollCueRef : undefined,
  };
}
