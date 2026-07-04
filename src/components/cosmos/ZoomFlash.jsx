import { useEffect, useRef } from 'react';

// A full-viewport radial flash used to mask the moment a route actually
// swaps during the galaxy zoom transition. mode="in": fades from clear to
// opaque (Landing, as the woosh plays). mode="out": starts opaque and fades
// to clear (GalaxyPage, on arrival) — so the cut is hidden inside the flash
// instead of visible as a hard cut.
export default function ZoomFlash({ accent, active, mode = 'in', durationMs = 1300 }) {
  const ref = useRef(null);

  // Transitions are armed with a forced synchronous reflow (reading
  // offsetHeight) rather than requestAnimationFrame: rAF is paused whenever
  // the tab/page is hidden, which would leave the flash stuck fully opaque.
  useEffect(() => {
    if (mode !== 'out') return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.opacity = '1';
    void el.offsetHeight; // flush, so the fade below starts from 1
    el.style.transition = `opacity ${Math.round(durationMs * 0.55)}ms ease-out`;
    el.style.opacity = '0';
  }, [mode, durationMs]);

  useEffect(() => {
    if (mode !== 'in') return;
    const el = ref.current;
    if (!el) return;
    if (active) {
      void el.offsetHeight;
      el.style.transition = `opacity ${durationMs}ms ease-in`;
      el.style.opacity = '1';
      return;
    }
    el.style.transition = 'none';
    el.style.opacity = '0';
  }, [active, mode, durationMs]);

  return (
    <div
      ref={ref}
      className="cosmos-flash"
      style={{ background: `radial-gradient(circle at 50% 50%, #ffffff 0%, ${accent} 35%, #05030c 100%)` }}
    />
  );
}
