import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { TRACK, BELL, ZOOM_END, CONTACT_AT } from '../../data/projects.js';
import { clamp, bell, cardPosition } from './useScrollProgress.js';

// Drives the camera from scroll progress, and writes all HTML-overlay
// styles (hero zoom, cards, hotspot dots, contact, scroll rail) directly
// onto their DOM nodes each frame via refs — avoiding a React re-render on
// every scroll tick, the same imperative approach the design reference used
// (see updateOverlay() in support.js).
//
// Generic over `hotspots` (`{ anchor: Vector3, center: number }[]`) so the
// same camera/overlay logic drives either the 2-galaxy select view or a
// 2- or 4-planet gallery view. `bellWidth` defaults to the original 6-planet
// track's spacing, but galleries with fewer, more widely-spaced hotspots
// should pass a wider value (see bellWidthFor()) so there's no dead stretch
// of scroll between one card fading out and the next fading in.
export default function Director({ scrollState, bellsRef, refs, hotspots, transitionRef, bellWidth = BELL }) {
  const { camera, size } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothTarget = useRef({ x: 0, y: 0 });
  const v = useRef(new Vector3());

  useFrame(() => {
    if (transitionRef && transitionRef.current) return; // ZoomTransition owns the camera right now

    const p = scrollState.current.p;
    const sm = smoothMouse.current;
    sm.x += (scrollState.current.mouseX - sm.x) * 0.06;
    sm.y += (scrollState.current.mouseY - sm.y) * 0.06;

    // camera: flies down -z, drifts toward whichever hotspots are nearest
    const camZ = 8 - p * TRACK;
    let tx = 0, ty = 0, w = 0;
    hotspots.forEach(({ anchor }) => {
      const d = Math.abs(camZ - (anchor.z + 7));
      const wi = Math.max(0, 1 - d / 11);
      tx += anchor.x * wi;
      ty += anchor.y * wi;
      w += wi;
    });
    if (w > 0) { tx /= w; ty /= w; }
    const st = smoothTarget.current;
    st.x += (tx - st.x) * 0.05;
    st.y += (ty - st.y) * 0.05;
    camera.position.set(st.x * 0.55 + sm.x * 1.0, st.y * 0.45 - sm.y * 0.8, camZ);
    camera.lookAt(st.x * 0.9, st.y * 0.7, camZ - 7);

    // per-hotspot bell curves — drive both mesh glow (via bellsRef) and the
    // overlay cards below
    const bells = bellsRef.current;
    hotspots.forEach((h, i) => { bells[i] = bell(p, h.center, bellWidth); });

    const W = size.width, H = size.height;
    hotspots.forEach((h, i) => {
      const card = refs.cardRefs.current[i];
      const dot = refs.dotRefs.current[i];
      if (!card && !dot) return;
      v.current.copy(h.anchor).project(camera);
      const behind = v.current.z > 1;
      const sx = (v.current.x * 0.5 + 0.5) * W;
      const sy = (-v.current.y * 0.5 + 0.5) * H;
      const op = behind ? 0 : bells[i];
      const side = i % 2 === 0 ? 'left' : 'right';

      if (card) {
        const { cx, cy } = cardPosition(sx, sy, side, W, H);
        card.style.opacity = op;
        card.style.pointerEvents = op > 0.2 ? 'auto' : 'none';
        // fully hide when faded out so the card's link leaves the tab order
        card.style.visibility = op > 0.02 ? 'visible' : 'hidden';
        card.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${0.92 + op * 0.08})`;
      }
      if (dot) {
        const dx = clamp(sx, 6, W - 6);
        const dy = clamp(sy, 6, H - 6);
        dot.style.opacity = op > 0.05 ? Math.min(1, op * 0.6 + 0.35) : 0;
        dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`;
      }
    });

    // intro zoom-through (only present on pages that render a hero/scrim)
    const hero = refs.heroRef && refs.heroRef.current;
    if (hero) {
      const zt = clamp(p / ZOOM_END, 0, 1);
      const zEase = zt * zt;
      const heroOp = clamp(1 - zt * 1.35, 0, 1);
      hero.style.opacity = heroOp;
      hero.style.pointerEvents = heroOp > 0.15 ? 'auto' : 'none';
      hero.style.visibility = heroOp > 0.02 ? 'visible' : 'hidden';
      hero.style.transform = `translate(-50%,-50%) scale(${1 + zEase * 2.2})`;
      hero.style.filter = zt > 0.2 ? `blur(${(zt - 0.2) * 6}px)` : 'none';
      const scrim = refs.scrimRef && refs.scrimRef.current;
      if (scrim) scrim.style.opacity = clamp(1 - zt * 1.2, 0, 1);
    }

    // gallery title intro (only present on pages that render one, e.g. GalaxyPage)
    const title = refs.titleRef && refs.titleRef.current;
    if (title) {
      const tt = clamp(p / ZOOM_END, 0, 1);
      const titleOp = clamp(1 - tt * 1.3, 0, 1);
      title.style.opacity = titleOp;
      title.style.transform = `translate(-50%, calc(-50% - ${tt * 24}px))`;
    }

    // contact
    const contact = refs.contactRef.current;
    if (contact) {
      const cop = bell(p, CONTACT_AT, 0.06);
      contact.style.opacity = cop;
      contact.style.pointerEvents = cop > 0.1 ? 'auto' : 'none';
      contact.style.visibility = cop > 0.02 ? 'visible' : 'hidden';
      contact.style.transform = `translate(-50%, calc(-50% + ${(1 - cop) * 34}px))`;
    }

    // scroll progress rail
    const fill = refs.fillRef.current;
    if (fill) fill.style.height = p * 100 + '%';
  });

  return null;
}
