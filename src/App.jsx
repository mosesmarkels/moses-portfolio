import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import About from './pages/About.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import GalaxyPage from './pages/GalaxyPage.jsx';

// HashRouter doesn't reset the window scroll position between routes, so
// e.g. clicking "Next Project" at the bottom of a case study would land you
// at the bottom of the next one. Hash links (like /about#contact) are left
// alone so their own scroll-into-view behavior wins.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:galaxy" element={<GalaxyPage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  );
}
