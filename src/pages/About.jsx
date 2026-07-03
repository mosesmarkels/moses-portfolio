import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import BackButton from '../components/BackButton.jsx';
import Noise from '../components/Noise.jsx';
import Cursor from '../components/Cursor.jsx';
import portrait from '../assets/moses-portrait.jpg';
import '../styles/project.css';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'About — Moses Markels';
  }, []);

  // Support deep-linking straight to the contact section (e.g. the header's
  // "Contact" link, or any /about#contact link elsewhere on the site) —
  // React Router doesn't auto-scroll to hash targets on its own.
  useEffect(() => {
    if (location.hash === '#contact') {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [location.hash]);

  return (
    <div className="about-page">
      <Noise />
      <Cursor />

      <Header />
      <BackButton />

      <main>
      <section className="about-hero">
        <div>
          <p className="about-eyebrow">About · Boulder, Colorado</p>
          <h1 className="about-name">Moses<br />Markels</h1>
          <p className="about-roles">Storyteller · Creative Strategist</p>
          <p className="about-lead">
            I&apos;m not just here to sell you soda water disguised as personality. I&apos;m here to build brands people actually trust.
          </p>
        </div>
        <div className="about-portrait">
          <img src={portrait} alt="Moses Markels" />
        </div>
      </section>

      <div className="about-body">
        <div className="about-split">
          <h2>Strategy meets <span className="accent">story.</span></h2>
          <div>
            <p>I live at the intersection of strategy and creativity. Whether it&apos;s crafting campaigns that change perception or creating short documentaries that tug on your heartstrings, storytelling is at the core of everything I do.</p>
            <p>My work&apos;s been shown at festivals, in classrooms, and once, on my grandma&apos;s Facebook feed with <strong>47 likes</strong>.</p>
            <p>I&apos;ve made multiple short documentaries — because while I love a smart tagline, I also believe some stories need more than <em>30 seconds</em>.</p>
          </div>
        </div>

        <div className="about-split">
          <div className="fact-list">
            <div>
              <p className="fact-label">Based in</p>
              <p className="fact-value">Boulder, Colorado</p>
            </div>
            <div>
              <p className="fact-label">Disciplines</p>
              <p className="fact-value">Brand Strategy · Advertising · Documentary · Short Film</p>
            </div>
            <div>
              <p className="fact-label">Believes in</p>
              <p className="fact-value">Brands people actually trust</p>
            </div>
            <div>
              <p className="fact-label">Currently</p>
              <p className="fact-value">Open to new projects</p>
            </div>
          </div>
          <div>
            <p>Some of it lives in 30-second cuts. Some of it lives in ten-minute films. All of it starts the same way — with a person, a truth, and a reason to care.</p>
            <p>Two bodies of work, one throughline:</p>
          </div>
        </div>

        <div className="work-cta">
          <Link to="/work/ads" className="cta-card" style={{ '--glow': 'rgba(91,140,255,.35)' }}>
            <p className="cta-kind">Advertising &amp; Strategy</p>
            <p className="cta-title">The campaign<br />work</p>
            <p className="cta-arrow">Explore →</p>
          </Link>
          <Link to="/work/film" className="cta-card" style={{ '--glow': 'rgba(255,95,168,.35)' }}>
            <p className="cta-kind">Documentary &amp; Short Film</p>
            <p className="cta-title">The film<br />work</p>
            <p className="cta-arrow">Explore →</p>
          </Link>
        </div>
      </div>

      <section className="about-contact" id="contact">
        <p className="eyebrow">Get in touch</p>
        <h2>Let&apos;s work<br />together</h2>
        <a className="email-btn" href="mailto:mosesm2022@gmail.com">Drop me an email ↗</a>
        <div className="social-row">
          <a href="https://www.instagram.com/momoses15" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/moses-markels/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </section>
      </main>
    </div>
  );
}
