import { useRef, useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Vector3 } from 'three';
import CosmosCanvas from '../components/cosmos/CosmosCanvas.jsx';
import GalaxyCluster from '../components/cosmos/GalaxyCluster.jsx';
import GalaxySelectDirector, { REVEAL_END } from '../components/cosmos/GalaxySelectDirector.jsx';
import ZoomTransition, { ZOOM_DURATION_MS } from '../components/cosmos/ZoomTransition.jsx';
import HotspotOverlay from '../components/cosmos/HotspotOverlay.jsx';
import ZoomFlash from '../components/cosmos/ZoomFlash.jsx';
import { useScrollProgress, useOverlayRefs } from '../components/cosmos/useScrollProgress.js';
import { galaxies } from '../data/projects.js';
import '../styles/cosmos.css';

// Both galaxies sit side by side at a single fixed depth — no flythrough,
// they're revealed together as soon as the About intro finishes.
const GALAXY_X = 6.5;
const GALAXY_Z = -13;
const anchors = [
  new Vector3(-GALAXY_X, -0.6, GALAXY_Z),
  new Vector3(GALAXY_X, 0.6, GALAXY_Z),
];

const SCROLL_LENGTH_VH = 260;

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { containerRef, state: scrollState } = useScrollProgress();
  const hoverIndexRef = useRef(-1);
  const transitionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [zoomingKey, setZoomingKey] = useState(null);

  useEffect(() => {
    document.title = 'Moses Markels — Storyteller / Creative Strategist';
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // Arriving via the "← Galaxies" back-link from inside a galaxy: skip the
  // About-intro scroll-through and land straight on the galaxy picker,
  // matching where that link's label says it's taking you.
  useEffect(() => {
    if (location.state?.scrollTo === 'galaxies' && containerRef.current) {
      const el = containerRef.current;
      const max = el.scrollHeight - el.clientHeight;
      el.scrollTop = max * (REVEAL_END + 0.04);
      // A programmatic scrollTop jump doesn't reliably fire a native
      // 'scroll' event in every browser — dispatch one explicitly so the
      // camera/overlay driver (which listens for 'scroll') picks it up
      // immediately instead of staying stuck on the frame-zero pose.
      el.dispatchEvent(new Event('scroll'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const overlayRefs = useOverlayRefs(galaxies.length, { hero: true });
  const bellsRef = useRef(new Array(galaxies.length).fill(0));
  const hotspots = useMemo(() => anchors.map((anchor) => ({ anchor })), []);

  const handleSelectGalaxy = (key, index) => {
    if (transitionRef.current) return; // already zooming
    transitionRef.current = { key, index, startTime: performance.now() };
    setZoomingKey(key);
    timeoutRef.current = setTimeout(() => navigate(`/work/${key}`), ZOOM_DURATION_MS);
  };

  const cards = galaxies.map((g, i) => ({
    key: g.key,
    title: g.title,
    tagline: g.tagline,
    tags: g.tags,
    accent: g.accent,
    cta: 'Enter Galaxy →',
    onClick: () => handleSelectGalaxy(g.key, i),
  }));

  const flashAccent = galaxies.find((g) => g.key === zoomingKey)?.accent || '#5b8cff';

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        background: '#08060f',
      }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }}>
        <CosmosCanvas>
          {galaxies.map((g, i) => (
            <GalaxyCluster
              key={g.key}
              index={i}
              galaxy={g}
              anchor={anchors[i]}
              bellsRef={bellsRef}
              hoverIndexRef={hoverIndexRef}
              onSelect={handleSelectGalaxy}
            />
          ))}
          <GalaxySelectDirector
            scrollState={scrollState}
            bellsRef={bellsRef}
            refs={overlayRefs}
            anchors={anchors}
            transitionRef={transitionRef}
          />
          <ZoomTransition transitionRef={transitionRef} hotspots={hotspots} />
        </CosmosCanvas>
        <HotspotOverlay refs={overlayRefs} hoverIndexRef={hoverIndexRef} showHero cards={cards} />
        <ZoomFlash accent={flashAccent} active={!!zoomingKey} mode="in" durationMs={ZOOM_DURATION_MS} />
      </div>
      <div style={{ height: `${SCROLL_LENGTH_VH}vh`, width: '1px', pointerEvents: 'none' }} />
    </div>
  );
}
