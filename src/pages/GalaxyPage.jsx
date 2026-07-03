import { useRef, useEffect, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Vector3 } from 'three';
import CosmosCanvas from '../components/cosmos/CosmosCanvas.jsx';
import Planet from '../components/cosmos/Planet.jsx';
import Director from '../components/cosmos/Director.jsx';
import HotspotOverlay from '../components/cosmos/HotspotOverlay.jsx';
import ZoomFlash from '../components/cosmos/ZoomFlash.jsx';
import { ZOOM_DURATION_MS } from '../components/cosmos/ZoomTransition.jsx';
import { useScrollProgress, useOverlayRefs } from '../components/cosmos/useScrollProgress.js';
import { getAnchor } from '../components/cosmos/layout.js';
import { getGalaxy, getProjectsByGalaxy, centersFor, bellWidthFor } from '../data/projects.js';
import '../styles/cosmos.css';

export default function GalaxyPage() {
  const { galaxy: galaxyKey } = useParams();
  const galaxy = getGalaxy(galaxyKey);
  const subset = getProjectsByGalaxy(galaxyKey);

  const { containerRef, state: scrollState } = useScrollProgress();
  const hoverIndexRef = useRef(-1);
  const overlayRefs = useOverlayRefs(subset.length || 1, { hero: false, title: true });
  const bellsRef = useRef(new Array(subset.length || 1).fill(0));

  const centers = useMemo(() => centersFor(subset.length || 1), [subset.length]);
  const bellWidth = useMemo(() => bellWidthFor(subset.length || 1), [subset.length]);
  const hotspots = useMemo(
    () => subset.map((_, i) => ({ anchor: new Vector3(...getAnchor(i, centers)), center: centers[i] })),
    [subset, centers]
  );

  useEffect(() => {
    if (galaxy) document.title = `${galaxy.title} — Moses Markels`;
  }, [galaxy]);

  if (!galaxy || subset.length === 0) return <Navigate to="/" replace />;

  const cards = subset.map((p) => ({
    key: p.slug,
    title: p.title,
    tags: p.tags,
    accent: p.accent,
    thumb: p.thumb,
    to: `/project/${p.slug}`,
  }));

  // Scroll a bit less for smaller galleries so pacing feels consistent.
  const scrollLengthVh = 260 + subset.length * 90;

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
          {subset.map((project, i) => (
            <Planet
              key={project.slug}
              index={i}
              project={project}
              anchor={hotspots[i].anchor}
              bellsRef={bellsRef}
              hoverIndexRef={hoverIndexRef}
            />
          ))}
          <Director scrollState={scrollState} bellsRef={bellsRef} refs={overlayRefs} hotspots={hotspots} bellWidth={bellWidth} />
        </CosmosCanvas>
        <HotspotOverlay
          refs={overlayRefs}
          hoverIndexRef={hoverIndexRef}
          showHero={false}
          galleryTitle={{
            eyebrow: `Gallery · ${subset.length} project${subset.length === 1 ? '' : 's'}`,
            heading: galaxy.title,
            tagline: galaxy.tagline,
          }}
          backLink={{ to: '/', label: '← Galaxies', state: { scrollTo: 'galaxies' } }}
          cards={cards}
        />
        <ZoomFlash accent={galaxy.accent} mode="out" durationMs={ZOOM_DURATION_MS} />
      </div>
      <div style={{ height: `${scrollLengthVh}vh`, width: '1px', pointerEvents: 'none' }} />
    </div>
  );
}
