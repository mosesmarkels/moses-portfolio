import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export const ZOOM_DURATION_MS = 1300;

const smoothstep = (t) => t * t * (3 - 2 * t);

// Takes over the camera from Director for ZOOM_DURATION_MS once a galaxy is
// selected: a fast dolly through the target plus a rising FOV for a
// warp-speed "woosh" feel. The DOM flash + the actual route navigate() are
// handled by Landing.jsx, timed to the same ZOOM_DURATION_MS.
export default function ZoomTransition({ transitionRef, hotspots }) {
  const { camera } = useThree();
  const baseFov = useRef(camera.fov);

  useFrame(() => {
    const tr = transitionRef.current;
    if (!tr) return;
    const hotspot = hotspots[tr.index];
    if (!hotspot) return;

    if (!tr.startCameraPos) tr.startCameraPos = camera.position.clone();
    const t = Math.min(1, (performance.now() - tr.startTime) / ZOOM_DURATION_MS);
    const ease = smoothstep(t);

    const target = hotspot.anchor;
    const endZ = target.z - 14; // fly past the galaxy, not just up to it
    const start = tr.startCameraPos;

    camera.position.set(
      start.x + (target.x - start.x) * ease,
      start.y + (target.y - start.y) * ease,
      start.z + (endZ - start.z) * ease
    );
    camera.lookAt(target.x, target.y, endZ - 10);
    camera.fov = baseFov.current + (104 - baseFov.current) * ease;
    camera.updateProjectionMatrix();
  });

  return null;
}
