import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// ─── DATA ───────────────────────────────────────────────────────────────────
const SHOWREEL_POSTER = "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023863/goku_rage_zw9qbu.jpg"
const SHOWREEL_URL = "https://res.cloudinary.com/dzy5g3e5v/video/upload/q_auto/f_auto/v1776025862/National_Disaster_Management_Authority_Animated_Cartoon_1080p_25fps_H264-128kbit_AAC_gwoxyp.mp4" // for later when you add the actual video

const CATEGORIES = [
  {
    id: 'concept-art',
    num: '01',
    name: 'Concept Art',
    slug: 'concept-art',
    year: '2020–2024',
    role: 'Lead Artist',
    tools: 'Photoshop, Blender, ZBrush',
    description:
      'World-building through visual language — environments, characters, and the spaces between. I build the worlds that stories inhabit before a single frame is animated.',
    color: '#2a1f10',
    heroGradient: 'linear-gradient(135deg, #1a0d00 0%, #0d1a2e 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #3d2100 0%, #1a0d3d 100%)',
    heroImage: '/images/concept-art-hero.jpg',
    cardImage: '/images/concept-art-hero.jpg',
    images: [
      { id: 1, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021554/Yeaah_cwvbmh.jpg", alt: 'Dark fantasy environment concept', aspect: '3/2' },
      { id: 2, tier: 'C', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021553/Woman_ycwx1a.jpg", alt: 'Character silhouette study', aspect: '4/3' },
      { id: 3, tier: 'B', col: 'span 4', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021552/Speed_usz9h2.jpg", alt: 'Ruins under storm light', aspect: '1/1' },
      { id: 4, tier: 'A', col: 'span 8', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Flowers_ihn3g4.jpg", alt: 'Sprawling cityscape overview', aspect: '16/9' },
      { id: 5, tier: 'C', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Eye_bh0vqr.jpg", alt: 'Creature anatomy sketch', aspect: '4/3' },
      { id: 6, tier: 'B', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Gaijin_xcnleu.jpg", alt: 'Underground cavern scene', aspect: '3/2' },
      { id: 7, tier: 'A', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Eye_2_qkjw8r.jpg", alt: 'Portal arch environment', aspect: '1/1' },
      { id: 8, tier: 'C', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Cool_shit_ehcqha.jpg", alt: 'Distant mountain fortress', aspect: '4/3' },
    ],
  },
  {
    id: 'animation',
    num: '02',
    name: 'Animation',
    slug: 'animation',
    year: '2019–2024',
    role: 'Animator & Director',
    tools: 'After Effects, TVPaint, Blender',
    description:
      'Motion as meaning. Characters that breathe, cycles that loop with intention, sequences that carry emotional weight. Every frame is a decision.',
    color: '#0d1a10',
    heroGradient: 'linear-gradient(135deg, #001a0d 0%, #0a1a00 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #001a10 0%, #0a1a00 100%)',
    images: [
      { id: 1, tier: 'B', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/chapri_g1qaiz.jpg", alt: 'Character walk cycle frame', aspect: '1/1' },
      { id: 2, tier: 'A', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021551/Kiss_qvk0rz.jpg", alt: 'Animated short still', aspect: '16/9' },
      { id: 3, tier: 'C', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021551/Glasses_ympn3o.jpg", alt: 'Motion study — cloth simulation', aspect: '4/3' },
      { id: 4, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Eye_2_qkjw8r.jpg", alt: 'Looping creature animation', aspect: '3/2' },
      { id: 5, tier: 'B', col: 'span 8', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021552/Luffy_z61xgr.jpg", alt: 'Scene from animated short', aspect: '4/3' },
      { id: 6, tier: 'C', col: 'span 4', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021551/Gojo_niijwe.jpg", alt: 'Facial animation test', aspect: '1/1' },
      { id: 7, tier: 'A', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021553/Stare_gbhvu3.jpg", alt: 'Environmental animation — wind', aspect: '2/3' },
      { id: 8, tier: 'B', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021552/ROronoa_xfhgjf.jpg", alt: 'Title sequence frame', aspect: '2/3' },
    ],
    heroImage: '/images/animation-hero.jpg',
    cardImage: '/images/animation-hero.jpg',
  },
  {
    id: 'ad-directing',
    num: '03',
    name: 'Commercial Direction',
    slug: 'ad-directing',
    year: '2021–2024',
    role: 'Creative Director',
    tools: 'Cinema 4D, DaVinci Resolve, Premiere',
    description:
      'Where brand vision meets cinematic execution. I direct commercial campaigns that feel like art — because the best ads always do.',
    color: '#1a0d1a',
    heroGradient: 'linear-gradient(135deg, #1a001a 0%, #0d001a 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #1a001a 0%, #0d001a 100%)',
    images: [
      { id: 1, tier: 'A', col: 'span 8', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023935/copy_of_jin_h5v6pg_c805db.jpg", alt: 'Commercial direction still — product', aspect: '16/9' },
      { id: 2, tier: 'C', col: 'span 4', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023868/lying_woman_ovuval.jpg", alt: 'Brand campaign keyframe', aspect: '1/1' },
      { id: 3, tier: 'B', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Gaijin_xcnleu.jpg", alt: 'Product visualization', aspect: '4/3' },
      { id: 4, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023863/earing_f2igdv.jpg", alt: 'Campaign visual — dramatic lighting', aspect: '3/2' },
      { id: 5, tier: 'C', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Flowers_ihn3g4.jpg", alt: 'Motion graphics frame', aspect: '16/9' },
      { id: 6, tier: 'B', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021550/Eye_bh0vqr.jpg", alt: 'Commercial storyboard realized', aspect: '4/3' },
      { id: 7, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023870/rain_r9v3cw.jpg", alt: 'Brand identity in motion', aspect: '3/2' },
      { id: 8, tier: 'C', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021552/Luffy_z61xgr.jpg", alt: 'Campaign finale frame', aspect: '1/1' },
    ],
    heroImage: '/images/ad-directing-hero.jpg',
    cardImage: '/images/ad-directing-hero.jpg',
  },
  {
    id: 'illustration',
    num: '04',
    name: 'Illustration',
    slug: 'illustration',
    year: '2018–2024',
    role: 'Illustrator',
    tools: 'Procreate, Photoshop, Clip Studio',
    description:
      'Editorial, narrative, and character illustration. Each image is a self-contained story — a moment extended, a world implied.',
    color: '#0d1520',
    heroGradient: 'linear-gradient(135deg, #000d1a 0%, #001520 50%, #0a0a0a 100%)',
    cardGradient: 'linear-gradient(135deg, #001020 0%, #001a15 100%)',
    images: [
      { id: 1, tier: 'B', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023868/nice_n9owws.jpg", alt: 'Editorial illustration', aspect: '3/4' },
      { id: 2, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776024078/copy_of_mountain_zpnlag_647d4a.jpg", alt: 'Narrative character piece', aspect: '3/2' },
      { id: 3, tier: 'C', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023865/hot_art_sotgpi.jpg", alt: 'Portrait illustration', aspect: '4/6' },
      { id: 4, tier: 'A', col: 'span 6', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023863/gggoood_emxuar.jpg", alt: 'Story cover illustration', aspect: '4/5' },
      { id: 5, tier: 'B', col: 'span 8', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023982/sky_wlewmo_f7ec0b.jpg", alt: 'Editorial spread illustration', aspect: '16/9' },
      { id: 6, tier: 'C', col: 'span 4', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023868/lying_woman_ovuval.jpg", alt: 'Character design illustration', aspect: '1/1' },
      { id: 7, tier: 'A', col: 'span 7', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776023865/hot_2_ir8pq4.jpg", alt: 'Landscape narrative', aspect: '2/3' },
      { id: 8, tier: 'B', col: 'span 5', src: "https://res.cloudinary.com/dzy5g3e5v/image/upload/q_auto/f_auto/v1776021549/Boobs_ojj434.jpg", alt: 'Book cover illustration', aspect: '3/5' },
    ],
    heroImage: '/images/illustration-hero.jpg',
    cardImage: '/images/illustration-hero.jpg',
  },
]

// Gallery placeholder colors per category
const PLACEHOLDER_PALETTES = {
  'concept-art':    ['#1a0d00','#0d1a2e','#2d1a00','#1a2d1a','#00152d','#2d2d00','#1a001a','#0a1a0a'],
  'animation':      ['#001a0d','#0a1a00','#001510','#0d1a05','#051a0d','#0a1505','#001a0a','#0a0a1a'],
  'ad-directing':   ['#1a001a','#0d001a','#1a0010','#10001a','#1a0005','#05001a','#0f0010','#1a000a'],
  'illustration':   ['#000d1a','#001520','#001018','#00101a','#000a15','#00151a','#001015','#001218'],
}

// Generate placeholder SVG image
function placeholderSrc(color, w = 800, h = 600) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${color}'/><line x1='0' y1='0' x2='${w}' y2='${h}' stroke='rgba(255,255,255,0.05)' stroke-width='1'/><line x1='${w}' y1='0' x2='0' y2='${h}' stroke='rgba(255,255,255,0.05)' stroke-width='1'/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────

function Cursor() {
  const dotRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const LERP = 0.12

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }

    const loop = () => {
      const { x: cx, y: cy } = posRef.current
      const { x: tx, y: ty } = targetRef.current
      posRef.current = {
        x: cx + (tx - cx) * LERP,
        y: cy + (ty - cy) * LERP,
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    const onEnter = () => setExpanded(true)
    const onLeave = () => setExpanded(false)

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="cursor">
      <div ref={dotRef} className={`cursor-dot${expanded ? ' expanded' : ''}`} />
    </div>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ currentPage, navigate, navVisible }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [currentPage])

  const goTo = (page) => { setMobileOpen(false); navigate(page) }

  return (
    <>
      <nav className={`nav${navVisible ? ' visible' : ''}${scrolled ? ' scrolled' : ''}`}>
        <button className="nav-logo" onClick={() => goTo('home')}>Koroded</button>
        <ul className="nav-links">
          <li><button style={{background:'none',color:'inherit',font:'inherit',cursor:'none'}} onClick={() => goTo('home')}>Work</button></li>
          <li><button style={{background:'none',color:'inherit',font:'inherit',cursor:'none'}} onClick={() => goTo('contact')}>Contact</button></li>
        </ul>
        <button
          className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav-mobile-overlay${mobileOpen ? ' open' : ''}`}>
        {CATEGORIES.map(c => (
          <button key={c.id} style={{background:'none',font:'inherit',cursor:'none'}} onClick={() => goTo(c.slug)}>{c.name}</button>
        ))}
        <button style={{background:'none',font:'inherit',cursor:'none'}} onClick={() => goTo('contact')}>Contact</button>
      </div>
    </>
  )
}

// ─── PAGE WIPE ────────────────────────────────────────────────────────────────

function PageWipe({ phase }) {
  if (!phase) return null
  return <div className={`page-wipe ${phase}`} />
}

// ─── HOMEPAGE ─────────────────────────────────────────────────────────────────

function HomePage({ navigate }) {
  const [titleRevealed, setTitleRevealed] = useState(false)
  const [desigRevealed, setDesigRevealed] = useState(false)
  const [navVisible, setNavVisible] = useState(false)
  const [scrollVisible, setScrollVisible] = useState(false)
  const [scrollHidden, setScrollHidden] = useState(false)
  const showreelRef = useRef(null)
  const [showreelIn, setShowreelIn] = useState(false)
  const catSectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const t1 = setTimeout(() => setTitleRevealed(true), 200)
    const t2 = setTimeout(() => setDesigRevealed(true), 1100)
    const t3 = setTimeout(() => setNavVisible(true), 1200)
    const t4 = setTimeout(() => setScrollVisible(true), 1400)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) setScrollHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // IntersectionObserver for showreel
  useEffect(() => {
    const el = showreelRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShowreelIn(true) }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Stagger cards
  useEffect(() => {
    const els = cardRefs.current.filter(Boolean)
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        els.forEach((el, i) => {
          setTimeout(() => el.classList.add('in-view'), i * 120)
        })
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    if (catSectionRef.current) obs.observe(catSectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="hero-title-wrap">
          <div className={`hero-title${titleRevealed ? ' revealed' : ''}`}>
            KORODED
          </div>
        </div>
        <div className={`hero-designation${desigRevealed ? ' revealed' : ''}`}>
          Animator · Illustrator · Concept Artist
        </div>
        <div className={`hero-scroll${scrollVisible && !scrollHidden ? ' visible' : ' hidden'}`}>
          <div className="scroll-line" />
          <span className="scroll-label">Scroll</span>
        </div>
      </section>

      {/* ── Showreel ── */}
      <section className="showreel-section">
        <div className="showreel-label">Showreel — Selected Works</div>
        <div ref={showreelRef} className={`showreel-container${showreelIn ? ' in-view' : ''}`}>
          <div className="showreel-inner">
            {SHOWREEL_URL ? (
              <video className="showreel-poster" src={SHOWREEL_URL} autoPlay muted loop />
            ) : (
              <img className="showreel-poster" src={SHOWREEL_POSTER} alt="Showreel poster" />
            )}
            <div className="showreel-vignette" />
            <button className="play-btn" data-hover aria-label="Play showreel">
              <div className="play-triangle" />
            </button>
            <div className="showreel-meta">2024 — 3:24</div>
          </div>
        </div>
      </section>

      {/* ── Category Cards ── */}
      <section className="category-section" ref={catSectionRef}>
        <div className="category-section-label">Selected Categories</div>
        <div className="category-grid">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.id}
              className="category-card"
              ref={el => cardRefs.current[i] = el}
              onClick={() => navigate(cat.slug)}
              data-hover
              aria-label={`View ${cat.name}`}
            >
          <div
            className="category-card-bg"
            style={{
              backgroundImage: cat.cardImage
                ? `url(${cat.cardImage})`
                : cat.cardGradient,          // gradient is a valid backgroundImage value too
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          /> 
              <div className="category-card-overlay" />
              <span className="category-card-num">{cat.num}</span>
              <span className="category-card-name">{cat.name}</span>
              <span className="category-card-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter navigate={navigate} />
    </div>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function SiteFooter({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-cta-text">Let's work together</div>
      <p className="footer-cta-sub">Available for commissions &amp; collaborations</p>
      <button
        className="footer-cta-btn"
        onClick={() => navigate('contact')}
        data-hover
      >
        Start a Project →
      </button>
      <a href="mailto:korodedw@gmail.com" className="footer-email">korodedw@gmail.com</a>
      <div className="footer-socials">
        {['Instagram', 'Behance', 'ArtStation', 'LinkedIn'].map(s => (
          <a key={s} href="#" data-hover>{s}</a>
        ))}
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Koroded. All rights reserved.
      </div>
    </footer>
  )
}

// ─── GALLERY ITEM ─────────────────────────────────────────────────────────────

function GalleryItem({ item, index, catId, onClick }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const palettes = PLACEHOLDER_PALETTES[catId] || []
  const color = palettes[index % palettes.length] || '#1a1a1a'

  // Parallax multipliers
  const multipliers = { A: 0.08, B: 0.05, C: 0.025 }
  const mult = multipliers[item.tier] || 0.05
  const scrollRef = useRef(0)
  const elRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let raf
    const onScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      const offset = center * mult
      if (ref.current) {
        ref.current.querySelector('img').style.transform = `translateY(${offset}px)`
      }
    }
    const loop = () => { onScroll(); raf = requestAnimationFrame(loop) }
    // Only run on desktop (reduced-motion handled in CSS)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 768) {
      raf = requestAnimationFrame(loop)
    }
    return () => cancelAnimationFrame(raf)
  }, [mult])

  // Build grid column
  const colSpanNum = parseInt(item.col.replace('span ', ''))
  const gridColumn = `span ${colSpanNum}`
  // Vary margins for organic rhythm
  const marginTops = ['0px', '40px', '100px', '20px', '60px', '0px', '80px', '30px']
  const marginTop = marginTops[index % marginTops.length]

  return (
    <div
      ref={ref}
      className={`gallery-item${inView ? ' in-view' : ''}`}
      style={{
        gridColumn,
        marginTop,
        aspectRatio: item.aspect,
        transitionDelay: `${(index % 4) * 80}ms`,
      }}
      onClick={() => onClick(index)}
      data-hover
    >
      <img
        src={item.src || placeholderSrc(color, 800, 600)}
        alt={item.alt}
        loading={index < 2 ? 'eager' : 'lazy'}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  )
}

// ─── CATEGORY PAGE ────────────────────────────────────────────────────────────

function CategoryPage({ catId, navigate }) {
  const cat = CATEGORIES.find(c => c.slug === catId)
  const catIndex = CATEGORIES.findIndex(c => c.slug === catId)
  const prevCat = CATEGORIES[(catIndex - 1 + CATEGORIES.length) % CATEGORIES.length]
  const nextCat = CATEGORIES[(catIndex + 1) % CATEGORIES.length]

  const [bgLoaded, setBgLoaded] = useState(false)
  const [panelRevealed, setPanelRevealed] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const t1 = setTimeout(() => setBgLoaded(true), 100)
    const t2 = setTimeout(() => setPanelRevealed(true), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [catId])

  // ESC to close lightbox
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowRight') setLightboxIndex(i => (i + 1) % cat.images.length)
      if (e.key === 'ArrowLeft') setLightboxIndex(i => (i - 1 + cat.images.length) % cat.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [cat])

  const openLightbox = (idx) => { setLightboxIndex(idx); setLightboxOpen(true) }
  const closeLightbox = () => setLightboxOpen(false)

  if (!cat) return null

  return (
    <div style={{ paddingBottom: '56px' }}>
      {/* ── Hero ── */}
      <section className="cat-hero">
      <div
        className={`cat-hero-bg${bgLoaded ? ' loaded' : ''}`}
        style={{
          backgroundImage: cat.heroImage
            ? `url(${cat.heroImage})`
            : cat.heroGradient,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
        <div className="cat-hero-gradient" />
        <div className="cat-info-panel">
          <div className={`cat-info-title${panelRevealed ? ' revealed' : ''}`}>
            {cat.name}C
          </div>
          <div className={`cat-info-meta${panelRevealed ? ' revealed' : ''}`}>
            {cat.year} · {cat.role} · {cat.tools}
          </div>
          <div className={`cat-info-desc${panelRevealed ? ' revealed' : ''}`}>
            {cat.description}
          </div>
          <div className={`cat-scroll-signal${panelRevealed ? ' revealed' : ''}`}>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M5 0v12M1 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            Explore work below
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="gallery-section">
        <div className="gallery-grid">
          {cat.images.map((item, i) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={i}
              catId={catId}
              onClick={openLightbox}
            />
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <SiteFooter navigate={navigate} />

      {/* ── Bottom Category Nav ── */}
      <nav className="cat-nav">
        <div className="cat-nav-indicators">
          {CATEGORIES.map((c, i) => (
            <div key={c.id} className={`cat-nav-dot${i === catIndex ? ' active' : ''}`} />
          ))}
        </div>
        <button
          className="cat-nav-link"
          onClick={() => navigate(prevCat.slug)}
          data-hover
        >
          ← {prevCat.name}
        </button>
        <button
          className="cat-nav-home"
          onClick={() => navigate('home')}
          data-hover
        >
          Koroded
        </button>
        <button
          className="cat-nav-link"
          onClick={() => navigate(nextCat.slug)}
          data-hover
          style={{ flexDirection: 'row-reverse' }}
        >
          {nextCat.name} →
        </button>
      </nav>

      {/* ── Lightbox ── */}
      <div
        className={`lightbox-overlay${lightboxOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeLightbox() }}
        role="dialog"
        aria-modal="true"
        aria-label="Image viewer"
      >
        <button className="lightbox-close" onClick={closeLightbox} data-hover aria-label="Close">×</button>
        <button
          className="lightbox-nav prev"
          onClick={() => setLightboxIndex(i => (i - 1 + cat.images.length) % cat.images.length)}
          data-hover
          aria-label="Previous image"
        >←</button>
        <img
          className="lightbox-img"
          src={placeholderSrc(
            (PLACEHOLDER_PALETTES[catId] || [])[lightboxIndex % 8] || '#1a1a1a',
            1200, 800
          )}
          alt={cat.images[lightboxIndex]?.alt || ''}
        />
        <button
          className="lightbox-nav next"
          onClick={() => setLightboxIndex(i => (i + 1) % cat.images.length)}
          data-hover
          aria-label="Next image"
        >→</button>
        <div className="lightbox-counter">
          {lightboxIndex + 1} / {cat.images.length}
        </div>
      </div>
    </div>
  )
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="contact-page">
        <div className="contact-inner">
          <div className="contact-eyebrow">Get in Touch</div>
          <h1 className="contact-title">
            {submitted ? 'Message\nSent.' : "Let's make\nsomething\nremarkable."}
          </h1>
          {submitted ? (
            <p className="contact-desc">
              Thank you for reaching out. I'll be in touch shortly.
            </p>
          ) : (
            <>
              <p className="contact-desc">
                Available for concept art, animation, illustration commissions, and commercial directing.
                Tell me about your project.
              </p>
              <div className="contact-form">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="form-input"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="project">Project Type</label>
                  <input
                    id="project"
                    name="project"
                    className="form-input"
                    value={form.project}
                    onChange={handleChange}
                    placeholder="e.g. Concept Art, Animation, Commercial"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget."
                  />
                </div>
                <button
                  type="button"
                  className="form-submit"
                  onClick={handleSubmit}
                  data-hover
                >
                  Send Message →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
      <SiteFooter navigate={navigate} />
    </div>
  )
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

// Inner app that has access to router hooks
function AppInner() {
  const routerNavigate = useNavigate()
  const location = useLocation()
  const [wipePhase, setWipePhase] = useState(null)
  const [navVisible, setNavVisible] = useState(false)

  const navigate = useCallback((target) => {
    const path = target === 'home' ? '/' : `/${target}`
    if (location.pathname === path) return
    setWipePhase('entering')
    setTimeout(() => {
      routerNavigate(path)
      window.scrollTo(0, 0)
      setWipePhase('exiting')
    }, 500)
    setTimeout(() => setWipePhase(null), 1200)
  }, [location.pathname, routerNavigate])

  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setNavVisible(true)
    } else {
      setNavVisible(false)
      const t = setTimeout(() => setNavVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [isHome])

  return (
    <>
      <Cursor />
      <PageWipe phase={wipePhase} />
      <Nav currentPage={location.pathname} navigate={navigate} navVisible={navVisible} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/contact" element={<ContactPage navigate={navigate} />} />
          {CATEGORIES.map(cat => (
            <Route
              key={cat.id}
              path={`/${cat.slug}`}
              element={<CategoryPage catId={cat.slug} navigate={navigate} />}
            />
          ))}
        </Routes>
      </main>
    </>
  )
}


export default function App() {
  return <AppInner />
}