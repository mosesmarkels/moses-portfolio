import { TRACK } from '../../data/projects.js';

// World-space anchor for hotspot `i` (of `centers.length` total) — alternates
// left/right down the track. Mirrors the original support.js placement math,
// generalized to work for any number/spacing of hotspots (planets or galaxies).
export function getAnchor(i, centers) {
  const side = i % 2 === 0 ? -1 : 1;
  const z = (8 - centers[i] * TRACK) - 7;
  const y = i % 2 ? 0.8 : -0.8;
  return [side * 3.4, y, z];
}
