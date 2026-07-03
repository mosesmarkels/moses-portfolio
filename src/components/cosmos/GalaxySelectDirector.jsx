import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { ZOOM_END, CONTACT_AT } from '../../data/projects.js';
import { clamp, bell, cardPosition } from './useScrollProgress.js';

// How far into the scroll the camera finishes easing from the About-intro
// shot into the "both galaxies side by side" reveal shot. Exported so a
// direct "jump straight to the galaxy picker" link (the GalaxyPage back-link)
// can land the scroll container past this point instead of at the very top.
export const REVEAL_END = 0.28;
const INTRO_POS = new Vector3(0, 0, 8);
const INTRO_LOOK = new Vector3(0, 0, 0);
const REVEAL_POS = new Vector3(0, 0.3, 1.5);
const REVEAL_LOOK = new Vector3(0, 0, -13);

const smoothstep = (t) => t * t * (3 - 2 * t);

// Camera/overlay driver for the galaxy-select scene: unlike Director.jsx
// (which flies down a track visiting hotspots one at a time), this holds a
// single fixed shot that reveals both galaxies together, side by side, once
// the About intro finishes — no further "flythrough" scrolling needed.
export default function GalaxySelectDirector({ scrollState, bellsRef, refs, anchors, transitionRef }) {
  const { camera, size } = useThree();
  const smoothMouse = useRef({ x: 0, y: 0 });
  const v = useRef(new Vector3());
  const pos = useRef(new Vector3());
  const look = useRef(new Vector3());

  useFrame(() => {
    if (transitionRef && transitionRef.current) return; // ZoomTransition owns the camera right now

    const p = scrollState.current.p;
    const sm = smoothMouse.current;
    sm.x += (scrollState.current.mouseX - sm.x) * 0.06;
    sm.y += (scrollState.current.mouseY - sm.y) * 0.06;

    if (p <= ZOOM_END) {
      camera.position.copy(INTRO_POS);
      camera.lookAt(INTRO_LOOK);
    } else {
      const t = smoothstep(clamp((p - ZOOM_END) / (REVEAL_END - ZOOM_END), 0, 1));
      pos.current.copy(INTRO_POS).lerp(REVEAL_POS, t);
      look.current.copy(INTRO_LOOK).lerp(REVEAL_LOOK, t);
      camera.position.set(pos.current.x + sm.x * 0.6 * t, pos.current.y - sm.y * 0.4 * t, pos.current.z);
      camera.lookAt(look.current);
    }

    // both galaxies fade in together (not one-at-a-time) once past the intro
    const revealT = smoothstep(clamp((p - ZOOM_END) / 0.08, 0, 1));
    const contactT = bell(p, CONTACT_AT, 0.06);
    const glow = revealT * clamp(1 - contactT * 0.5, 0.4, 1);
    anchors.forEach((_, i) => { bellsRef.current[i] = glow; });

    const W = size.width, H = size.height;
    anchors.forEach((anchor, i) => {
      const card = refs.cardRefs.current[i];
      const dot = refs.dotRefs.current[i];
      if (!card && !dot) return;
      v.current.copy(anchor).project(camera);
      const behind = v.current.z > 1;
      const sx = (v.current.x * 0.5 + 0.5) * W;
      const sy = (-v.current.y * 0.5 + 0.5) * H;
      const op = behind ? 0 : glow;
      const side = i === 0 ? 'left' : 'right';

      if (card) {
        const { cx, cy } = cardPosition(sx, sy, side, W, H);
        card.style.opacity = op;
        card.style.pointerEvents = op > 0.2 ? 'auto' : 'none';
        // fully hide when faded out so the card leaves the tab order
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

    // intro zoom-through (hero)
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

    // scroll cue: visible at rest, fades fast the instant scrolling starts
    // (its job is just to get the first scroll going, not linger through it)
    const cue = refs.scrollCueRef && refs.scrollCueRef.current;
    if (cue) {
      const cueOp = clamp(1 - p / 0.04, 0, 1);
      cue.style.opacity = cueOp;
      cue.style.visibility = cueOp > 0.02 ? 'visible' : 'hidden';
    }

    const contact = refs.contactRef.current;
    if (contact) {
      contact.style.opacity = contactT;
      contact.style.pointerEvents = contactT > 0.1 ? 'auto' : 'none';
      contact.style.visibility = contactT > 0.02 ? 'visible' : 'hidden';
      contact.style.transform = `translate(-50%, calc(-50% + ${(1 - contactT) * 34}px))`;
    }

    const fill = refs.fillRef.current;
    if (fill) fill.style.height = p * 100 + '%';
  });

  return null;
}
