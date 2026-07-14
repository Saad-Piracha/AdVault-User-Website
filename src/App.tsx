import { useEffect, useState, lazy, Suspense } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowRight, BarChart3, Camera, ChevronUp, MapPin, Menu, Play, Radio, Share2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Statically load key landing page sections to ensure immediate visual interaction
import { AnalyticsShowcase, Comparison, Coverage, FAQ, HowItWorks, Industries, TrustSection, WhyAdVault } from '@/components/home-sections'
import { DetailedFeatureGrid } from '@/components/detailed-feature-grid'

// Lazy-load route components to achieve route-level code splitting
const PlatformPage = lazy(() => import('@/components/platform-page').then(m => ({ default: m.PlatformPage })))
const AboutPage = lazy(() => import('@/components/marketing-sections').then(m => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/components/marketing-sections').then(m => ({ default: m.ContactPage })))
const BelowFoldHome = lazy(() => import('@/components/marketing-sections').then(m => ({ default: m.BelowFoldHome })))
const CookieConsent = lazy(() => import('@/components/marketing-sections').then(m => ({ default: m.CookieConsent })))

const links = ['Home', 'Features', 'Platform', 'About', 'Contact']
const fadeUp = { hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }

function Brand({ navigate }: { navigate: (to: string) => void }) {
  return (
    <a 
      href="/" 
      onClick={(e) => { e.preventDefault(); navigate('/'); }} 
      className="flex items-center gap-2.5" 
      aria-label="AdVault home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff6b35] text-lg font-black text-white shadow-lg shadow-orange-200">A</span>
      <span className="text-xl font-bold tracking-[-.04em] text-[#0a1d35]">
        Ad<span className="text-[#ff6b35]">Vault</span>
      </span>
    </a>
  )
}

function Navbar({ path, navigate }: { path: string; navigate: (to: string) => void }) {
  const [open, setOpen] = useState(false)
  
  const href = (item: string) => {
    const lowercase = item.toLowerCase()
    if (lowercase === 'home') return '/'
    if (lowercase === 'platform') return '/platform'
    if (lowercase === 'about') return '/about'
    if (lowercase === 'contact') return '/contact'
    return `/#${lowercase}`
  }
  
  const isActive = (item: string) => {
    const lowercase = item.toLowerCase()
    if (path === '/' && lowercase === 'home') return true
    if (path === '/platform' && lowercase === 'platform') return true
    if (path === '/about' && lowercase === 'about') return true
    if (path === '/contact' && lowercase === 'contact') return true
    return false
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault()
    setOpen(false)
    navigate(href(item))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_10px_40px_rgba(10,29,53,.08)] backdrop-blur-xl sm:px-6">
        <Brand navigate={navigate} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {links.map((item) => (
            <a 
              key={item} 
              href={href(item)} 
              onClick={(e) => handleLinkClick(e, item)}
              className={cn(
                "text-sm font-medium transition duration-200", 
                isActive(item) ? "text-[#ff6b35] font-bold" : "text-slate-600 hover:text-[#ff6b35]"
              )}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button onClick={() => navigate('/contact')}>Book a Demo <ArrowRight size={16} /></Button>
        </div>
        <button 
          className="grid h-10 w-10 place-items-center rounded-xl text-[#0a1d35] lg:hidden" 
          aria-label="Toggle navigation" 
          aria-expanded={open} 
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mx-4 mt-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl lg:hidden">
          <nav className="grid gap-4">
            {links.map((item) => (
              <a 
                key={item} 
                href={href(item)} 
                onClick={(e) => handleLinkClick(e, item)} 
                className={cn(
                  "font-medium transition duration-200",
                  isActive(item) ? "text-[#ff6b35] font-bold" : "text-slate-700 hover:text-[#ff6b35]"
                )}
              >
                {item}
              </a>
            ))}
            <Button onClick={() => navigate('/contact')}>Book a Demo <ArrowRight size={16} /></Button>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

function DashboardVisual() {
  return <div className="visual-stage" aria-label="AdVault advertising platform preview">
    <motion.div className="orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 32, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 27, repeat: Infinity, ease: 'linear' }} />
    <motion.div className="screen-card" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .7 }} whileHover={{ y: -6 }}><div className="screen-ad"><span>NOW PLAYING</span><strong>More eyes.<br />More impact.</strong><i /></div><div className="screen-base" /></motion.div>
    <motion.div className="taxi" animate={{ x: [0, 7, 0], y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><div className="taxi-sign">ADVAULT</div><div className="taxi-body"><div className="taxi-window one" /><div className="taxi-window two" /><div className="taxi-door" /><div className="taxi-light" /></div><div className="wheel left" /><div className="wheel right" /></motion.div>
    <motion.div className="laptop" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25, duration: .7 }}><div className="laptop-display"><div className="dash-side"><span className="tiny-logo">A</span><i /><i /><i /><i /></div><div className="dash-main"><div className="dash-top"><div><small>Welcome back,</small><b>Campaign Overview</b></div><span className="profile-dot" /></div><div className="dash-stat-row"><div><small>Total impressions</small><strong>248,942</strong><em>+18.4%</em></div><div><small>Active vehicles</small><strong>124</strong><em>Live</em></div></div><div className="dash-chart"><div className="chart-label"><span>Campaign reach</span><b>72.6k</b></div><svg viewBox="0 0 330 80" preserveAspectRatio="none"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff6b35" stopOpacity=".32" /><stop offset="1" stopColor="#ff6b35" stopOpacity="0" /></linearGradient></defs><path d="M0,68 C28,54 37,61 60,47 S98,55 120,30 S162,47 180,29 S221,34 239,16 S280,36 330,4 L330,80 L0,80Z" fill="url(#chartFill)" /><path d="M0,68 C28,54 37,61 60,47 S98,55 120,30 S162,47 180,29 S221,34 239,16 S280,36 330,4" fill="none" stroke="#ff6b35" strokeWidth="3" /></svg></div><div className="map-mini"><span>Live Zone Activity</span><div className="map-grid"><i /><i /><i /><i /></div></div></div></div><div className="laptop-keyboard" /></motion.div>
    <motion.div className="float-card impressions" animate={{ y: [0, -10, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}><span className="icon-circle orange"><BarChart3 size={16} /></span><div><small>Today’s impressions</small><strong>18,429 <em>↑ 12%</em></strong></div></motion.div>
    <motion.div className="float-card zones" animate={{ y: [0, 9, 0] }} transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: .5 }}><span className="icon-circle navy"><MapPin size={16} /></span><div><small>Live geofencing</small><strong>12 active zones</strong></div></motion.div>
  </div>
}

function Hero({ navigate }: { navigate: (to: string) => void }) {
  return (
    <main id="home">
      <section className="relative isolate overflow-hidden pt-36 sm:pt-44">
        <div className="hero-glow glow-left" />
        <div className="hero-glow glow-right" />
        <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[.94fr_1.06fr] lg:pb-28">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: .13 }} className="relative z-10 max-w-2xl">
            <motion.div variants={fadeUp} className="eyebrow">
              <span className="pulse-dot" /> Pakistan’s leading DOOH technology platform
            </motion.div>
            <motion.h1 variants={fadeUp} className="mt-6 text-balance text-[2.7rem] font-semibold leading-[1.06] tracking-[-.055em] text-[#07182d] sm:text-6xl lg:text-[4.35rem]">
              Pakistan’s First <span className="gradient-text">Smart In-Cab</span> Digital Advertising Platform
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Reach thousands of passengers every day through intelligent digital advertising inside ride-hailing vehicles.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <Button onClick={() => navigate('/contact')} className="px-6 py-3.5">
                Book a Demo <ArrowRight size={17} />
              </Button>
              <Button onClick={() => navigate('/platform')} variant="secondary" className="px-6 py-3.5">
                <Play size={15} fill="currentColor" /> View Platform
              </Button>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-11 flex items-center gap-4 text-sm text-slate-500">
              <div className="flex -space-x-2">
                <span className="avatar a1">M</span>
                <span className="avatar a2">K</span>
                <span className="avatar a3">S</span>
              </div>
              <span>Built for Lahore’s most ambitious brands</span>
            </motion.div>
          </motion.div>
          <DashboardVisual />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-100 to-transparent" />
      </section>
      <section className="border-y border-slate-100 bg-slate-50/70 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm font-semibold tracking-wide text-slate-400">
          <span>SMART SCREENS</span>
          <span className="text-orange-300">✦</span>
          <span>REAL-TIME ANALYTICS</span>
          <span className="text-orange-300">✦</span>
          <span>INTELLIGENT GEOFENCING</span>
        </div>
      </section>
    </main>
  )
}

function Footer({ navigate }: { navigate: (to: string) => void }) { 
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault()
    navigate(path)
  }
  
  return (
    <footer id="contact-footer" className="bg-[#07182d] px-5 py-14 text-white sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a 
            href="/" 
            onClick={(e) => { e.preventDefault(); navigate('/'); }} 
            className="flex items-center gap-2.5"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#ff6b35] font-black">A</span>
            <span className="text-xl font-bold tracking-tight">Ad<span className="text-[#ff6b35]">Vault</span></span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">Pakistan’s first smart in-cab digital advertising platform.</p>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Quick Links</h2>
          <nav className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-slate-400">
            <a className="hover:text-white" href="/" onClick={(e) => handleLinkClick(e, '/#features')}>Features</a>
            <a className="hover:text-white" href="/platform" onClick={(e) => handleLinkClick(e, '/platform')}>Platform</a>
            <a className="hover:text-white" href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About</a>
            <a className="hover:text-white" href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</a>
            <a className="hover:text-white" href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')}>Privacy</a>
            <a className="hover:text-white" href="/terms" onClick={(e) => handleLinkClick(e, '/terms')}>Terms</a>
          </nav>
        </div>
        <div>
          <h2 className="text-sm font-semibold">Follow our journey</h2>
          <div className="mt-4 flex gap-3">
            <a className="social" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Share2 size={17} /></a>
            <a className="social" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={17} /></a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} AdVault. All rights reserved.
      </div>
    </footer>
  ) 
}

const PrivacyPage = () => (
  <main className="pt-28 px-5 pb-20 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-[#07182d]">Privacy Policy</h1>
    <p className="text-slate-500 mb-4">Last updated: July 2026</p>
    <div className="prose prose-slate max-w-none text-slate-600 space-y-4 leading-7">
      <p>At AdVault, we take privacy seriously. We only gather campaign-level aggregated data such as ad impressions, screen status, and broad geofencing coordinates. We do not track, collect, or store any personally identifiable passenger data.</p>
      <p>Our smart in-cab advertising platform is designed with a strict focus on privacy compliance. No cameras, audio recorders, or tracking devices capture individual passenger profiles.</p>
    </div>
  </main>
)

const TermsPage = () => (
  <main className="pt-28 px-5 pb-20 max-w-4xl mx-auto min-h-screen">
    <h1 className="text-3xl font-bold mb-6 text-[#07182d]">Terms of Service</h1>
    <p className="text-slate-500 mb-4">Last updated: July 2026</p>
    <div className="prose prose-slate max-w-none text-slate-600 space-y-4 leading-7">
      <p>By using AdVault services, you agree to our campaign guidelines, including submitting brand assets at least 5 business days prior to campaign launch, and complying with creative standard reviews.</p>
      <p>AdVault reserves the right to reject advertising assets that do not meet our network's aesthetic or content requirements. Campaign schedules, geofences, and default ad settings will be detailed in individual insertion orders.</p>
    </div>
  </main>
)

export default function App() { 
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const [top, setTop] = useState(false)
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname)
    }
    window.addEventListener('popstate', handleLocationChange)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
    }
  }, [])

  const navigate = (to: string) => {
    const [pathname, hash] = to.split('#')
    
    if (pathname !== window.location.pathname) {
      window.history.pushState({}, '', to)
      setPath(pathname)
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' })
      }
    } else if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState({}, '', to)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  useEffect(() => { 
    const f = () => setTop(window.scrollY > 500); 
    window.addEventListener('scroll', f); 
    return () => window.removeEventListener('scroll', f) 
  }, [])

  useEffect(() => {
    let title = 'AdVault — Pakistan’s First Smart In-Cab DOOH Advertising Platform'
    let description = 'Reach thousands of passengers daily with AdVault, Pakistan\'s leading smart in-cab digital advertising network. Geofenced, real-time analytics, and premium high-attention screens in Lahore.'
    
    if (path === '/platform') {
      title = 'DOOH Platform & Technology — AdVault'
      description = 'Explore AdVault\'s connected digital out-of-home (DOOH) technology stack. Features geofencing, heatmaps, real-time campaign analytics, and fleet management for Lahore brands.'
    } else if (path === '/about') {
      title = 'About Us — AdVault’s Mission & Leadership'
      description = 'Learn about AdVault\'s mission to digitize outdoor advertising in Pakistan. Meet our founder and CEO Saad Piracha, and discover our vision for smart DOOH in Lahore.'
    } else if (path === '/contact') {
      title = 'Book a Demo & Contact — AdVault'
      description = 'Ready to launch your campaign? Schedule a demo with AdVault. Contact CEO Saad Piracha and the team in Lahore via email or phone.'
    } else if (path === '/privacy') {
      title = 'Privacy Policy — AdVault'
      description = 'Privacy Policy and data practices for the AdVault DOOH advertising platform.'
    } else if (path === '/terms') {
      title = 'Terms of Service — AdVault'
      description = 'Terms of Service and campaign launch terms for AdVault.'
    }
    
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    }
  }, [path])

  const loadingFallback = (
    <div className="flex h-screen items-center justify-center bg-slate-50/50">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#ff6b35] border-t-transparent" />
    </div>
  )

  const renderRoute = () => {
    switch (path) {
      case '/platform':
        return (
          <Suspense fallback={loadingFallback}>
            <PlatformPage />
          </Suspense>
        )
      case '/about':
        return (
          <Suspense fallback={loadingFallback}>
            <AboutPage />
          </Suspense>
        )
      case '/contact':
        return (
          <Suspense fallback={loadingFallback}>
            <ContactPage />
          </Suspense>
        )
      case '/privacy':
        return <PrivacyPage />
      case '/terms':
        return <TermsPage />
      default:
        return (
          <>
            <Hero navigate={navigate} />
            <TrustSection />
            <WhyAdVault />
            <DetailedFeatureGrid />
            <AnalyticsShowcase />
            <Coverage />
            <Industries />
            <Comparison />
            <HowItWorks />
            <Suspense fallback={loadingFallback}>
              <BelowFoldHome />
            </Suspense>
          </>
        )
    }
  }

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <Navbar path={path} navigate={navigate} />
      
      {renderRoute()}
      
      <Footer navigate={navigate} />
      
      <a 
        className="whatsapp text-white hover:scale-105 transition duration-200" 
        href="https://wa.me/923234734649?text=Hi%20AdVault%2C%20I%20am%20interested%20in%20a%20campaign%20demo." 
        target="_blank" 
        rel="noreferrer" 
        aria-label="Chat with AdVault on WhatsApp"
      >
        <Radio size={21} className="animate-pulse" />
      </a>
      
      {top && (
        <button 
          className="back-top hover:bg-[#ff6b35] hover:scale-105 transition duration-200" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}

      <Suspense fallback={null}>
        <CookieConsent />
      </Suspense>
    </>
  )
}
