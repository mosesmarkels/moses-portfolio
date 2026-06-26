import { useEffect, useRef } from 'react'
import { shared } from './state'

const PROJECTS = [
  {
    title: 'Unique Communications Ireland',
    tags: ['Advertising', 'Script Writing'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/33856e49-859b-4d6c-9844-508c6593e0ca_rwc_30x0x1343x1050x1343.png?h=37540086319c153b056fae852e667901',
    href: 'unique-communications-ireland.html',
    color: '#a1c4fd',
    side: 'left',
  },
  {
    title: 'Spirit Airlines',
    tags: ['Advertising', 'Brand Strategy'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/9170a7e4-481d-409e-a08e-2d4e7df83df2_car_202x158.jpg?h=22463b824e8e1fa021267df9cc6a4e08',
    href: 'spirit-airlines.html',
    color: '#ffecd2',
    side: 'right',
  },
  {
    title: 'Betting the Future',
    tags: ['Documentary', 'Short Film'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/b04d0381-5731-4927-b41b-7bbe76577faa_rwc_295x0x1550x1212x1550.png?h=6653bde4443ad7c263b5a1656210049b',
    href: 'betting-the-future.html',
    color: '#c2e9fb',
    side: 'left',
  },
  {
    title: 'Advice from Strangers',
    tags: ['Short Film', 'Documentary'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/a1a124ca-b84e-40a9-87fc-db7ebd1bcb85_rwc_158x0x2182x1706x2182.png?h=c204b1d662ee9ebe74f1e67d5877a2ff',
    href: 'advice-from-strangers.html',
    color: '#fcb69f',
    side: 'right',
  },
  {
    title: 'Success.',
    tags: ['Personal Documentary'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/4a16ab0f-6a4f-4ee7-a9f5-e565bcc8f9af_rwc_59x0x2176x1702x2176.png?h=2f391a050df0cdd41247f5895df8a759',
    href: 'success.html',
    color: '#ffecd2',
    side: 'left',
  },
  {
    title: 'How She Hurt Me',
    tags: ['Short Film', 'Documentary'],
    img: 'https://cdn.myportfolio.com/b52faa1c-a2f9-40b2-b93b-004d5037c659/fa286626-04f0-48d2-b520-eab4fb9a6240_rwc_220x82x1518x1187x1518.png?h=74389eb4fdbabb02884e7a388746865c',
    href: 'how-she-hurt-me.html',
    color: '#a1c4fd',
    side: 'right',
  },
]

// Hero fades out between 0 → 0.10
// Projects centered at 0.17, 0.30, 0.43, 0.56, 0.67, 0.78
// Contact at 0.92
const HERO_FADE_OUT   = 0.10
const CENTERS         = [0.17, 0.30, 0.43, 0.56, 0.67, 0.78]
const BELL_WIDTH      = 0.09   // how wide the card visibility window is
const CONTACT_CENTER  = 0.92

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }
function bell(t, center, w) { return clamp(1 - Math.abs(t - center) / w, 0, 1) }

export default function Overlay() {
  const overlayRef = useRef()

  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return
    const hero    = overlay.querySelector('.o-hero')
    const cards   = [...overlay.querySelectorAll('.o-card')]
    const contact = overlay.querySelector('.o-contact')

    let raf
    function loop() {
      const t = shared.scroll

      // Hero — fades up and out
      const heroOp = clamp(1 - t / HERO_FADE_OUT, 0, 1)
      hero.style.opacity   = heroOp
      hero.style.transform = `translate(-50%, calc(-50% + ${(1 - heroOp) * -24}px))`

      // Project cards — slide in from the side, hold, fade out
      cards.forEach((card, i) => {
        const op   = bell(t, CENTERS[i], BELL_WIDTH)
        const side = PROJECTS[i].side
        // slide from 80px off-side when approaching, settle to 0
        const approach = clamp((t - (CENTERS[i] - BELL_WIDTH)) / BELL_WIDTH, 0, 1)
        const tx = side === 'left'
          ? (1 - approach) * -80
          : (1 - approach) *  80
        card.style.opacity       = op
        card.style.pointerEvents = op > 0.15 ? 'all' : 'none'
        card.style.transform     = `translate(-50%, -50%) translateX(${tx}px) scale(${0.92 + op * 0.08})`
      })

      // Contact — rises up into view
      const contOp = bell(t, CONTACT_CENTER, 0.10)
      contact.style.opacity       = contOp
      contact.style.pointerEvents = contOp > 0.1 ? 'all' : 'none'
      contact.style.transform     = `translate(-50%, calc(-50% + ${(1 - contOp) * 32}px))`

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={overlayRef} className="overlay">

      {/* Hero */}
      <div className="o-hero">
        <h1>Moses Markels</h1>
        <p className="tagline">Storyteller · Creative Strategist · Boulder, CO</p>
        <p className="scroll-hint">↓ Scroll to explore</p>
      </div>

      {/* Project cards */}
      {PROJECTS.map((p, i) => (
        <div
          key={i}
          className="o-card"
          style={{
            '--accent': p.color,
            left: p.side === 'left' ? '32%' : '68%',
          }}
        >
          <a href={p.href}>
            <div className="card-num">0{i + 1}</div>
            <div className="card-img">
              <img src={p.img} alt={p.title} loading="lazy" />
            </div>
            <div className="card-body">
              <h2>{p.title}</h2>
              <div className="tags">
                {p.tags.map(t => <span key={t}>{t}</span>)}
              </div>
              <span className="view-link">View Project →</span>
            </div>
          </a>
        </div>
      ))}

      {/* Contact */}
      <div className="o-contact">
        <p className="contact-label">Get in touch</p>
        <h2>Let's work<br />together</h2>
        <a href="mailto:mosesm2022@gmail.com" className="cta-btn">Drop me an email ↗</a>
        <div className="footer-links">
          <a href="https://www.instagram.com/momoses15" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/in/moses-markels/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

    </div>
  )
}
