import { Link } from 'react-router-dom';
import portrait from '../../assets/moses-portrait.jpg';

// Generic HTML overlay for a cosmos scroll experience: optional About-intro
// hero, a set of hotspot cards + hotspot dots (positions/opacity written by
// Director.jsx via refs), and the contact section. Used for both the
// galaxy-select view and each galaxy's planet gallery — `cards` supplies
// whatever's different (project cards vs. galaxy cards).
export default function HotspotOverlay({ refs, hoverIndexRef, showHero = true, galleryTitle, backLink, cards }) {
  const setHover = (i) => () => { hoverIndexRef.current = i; };
  const clearHover = (i) => () => { if (hoverIndexRef.current === i) hoverIndexRef.current = -1; };

  return (
    <div className="cosmos-overlay">
      <Link to="/" className="cosmos-wordmark">Moses Markels</Link>
      <Link to="/about" className="cosmos-about-link">About →</Link>
      {backLink && (
        <Link to={backLink.to} state={backLink.state} className="cosmos-back-link">{backLink.label}</Link>
      )}

      <div className="cosmos-scroll-rail-wrap">
        <span className="cosmos-scroll-label">Scroll</span>
        <div className="cosmos-scroll-rail">
          <div className="cosmos-scroll-fill" ref={refs.fillRef} />
        </div>
      </div>

      {showHero && (
        <>
          <div className="cosmos-scrim" ref={refs.scrimRef} />
          <div className="cosmos-hero" ref={refs.heroRef}>
            <Link to="/about" className="cosmos-hero-portrait">
              <img src={portrait} alt="Moses Markels" />
            </Link>
            <div className="cosmos-hero-text">
              <p className="cosmos-eyebrow">About · Boulder, Colorado</p>
              <Link to="/about" className="cosmos-name-link">
                <h1 className="cosmos-name">Moses<br />Markels</h1>
                <span className="cosmos-name-underline" />
              </Link>
              <p className="cosmos-roles">Storyteller&nbsp;·&nbsp;Creative Strategist</p>
              <p className="cosmos-lead">
                I&apos;m not just here to sell you soda water disguised as personality. I&apos;m here to build brands people actually trust.
              </p>
              <Link to="/about" className="cosmos-readmore">Read the full story →</Link>
            </div>
          </div>
        </>
      )}

      {showHero && (
        <div className="cosmos-scrollcue" ref={refs.scrollCueRef}>
          <span className="cosmos-scrollcue-label">Scroll for liftoff</span>
          <span className="cosmos-scrollcue-chevrons" aria-hidden="true">
            <i /><i /><i />
          </span>
        </div>
      )}

      {galleryTitle && (
        <div className="cosmos-gallery-title" ref={refs.titleRef}>
          <p className="cosmos-gallery-eyebrow">{galleryTitle.eyebrow}</p>
          <h1 className="cosmos-gallery-heading">{galleryTitle.heading}</h1>
          <p className="cosmos-gallery-tagline">{galleryTitle.tagline}</p>
          <p className="cosmos-hint">↓ &nbsp;Scroll to explore</p>
        </div>
      )}

      {cards.map((card, i) => {
        const Wrapper = card.to ? Link : 'div';
        const wrapperExtra = card.to
          ? { to: card.to }
          : {
              role: 'button',
              tabIndex: 0,
              onClick: card.onClick,
              onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault(); // stop Space from scrolling the page
                  card.onClick?.();
                }
              },
            };
        return (
          <div
            key={card.key}
            className="cosmos-card"
            style={{ '--accent': card.accent }}
            ref={(el) => { refs.cardRefs.current[i] = el; }}
          >
            <Wrapper
              className="cosmos-card-link"
              onMouseEnter={setHover(i)}
              onMouseLeave={clearHover(i)}
              {...wrapperExtra}
            >
              <div className="cosmos-card-index">{String(i + 1).padStart(2, '0')}</div>
              {card.thumb && (
                <div className="cosmos-card-img">
                  <img src={card.thumb} alt={card.title} loading="lazy" />
                </div>
              )}
              <div className="cosmos-card-body">
                <h2 className="cosmos-card-title">{card.title}</h2>
                {card.tagline && <p className="cosmos-card-tagline">{card.tagline}</p>}
                <div className="cosmos-card-tags">
                  {card.tags.map((tag) => (
                    <span className="cosmos-card-tag" key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="cosmos-card-view">{card.cta || 'View Project →'}</span>
              </div>
            </Wrapper>
          </div>
        );
      })}

      <div className="cosmos-dots" aria-hidden="true">
        {cards.map((card, i) => (
          <span
            key={card.key}
            className="cosmos-dot"
            style={{ color: card.accent }}
            ref={(el) => { refs.dotRefs.current[i] = el; }}
          />
        ))}
      </div>

      <div className="cosmos-contact" ref={refs.contactRef}>
        <p className="cosmos-contact-eyebrow">Get in touch</p>
        <h2 className="cosmos-contact-title">Let&apos;s work<br />together</h2>
        <a className="cosmos-cta-btn" href="mailto:mosesm2022@gmail.com">Drop me an email ↗</a>
        <div className="cosmos-footer-links">
          <a href="https://www.instagram.com/momoses15" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/moses-markels/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </div>
  );
}
