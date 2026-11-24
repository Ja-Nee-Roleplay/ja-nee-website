import { useEffect, useState } from 'react'
import siteConfig from './config/siteConfig.js'
import CustomCursor from './components/CustomCursor.jsx'
import SiteNav from './components/SiteNav.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Features from './sections/Features.jsx'
import Rules from './sections/Rules.jsx'
import FAQs from './sections/FAQs.jsx'
import Socials from './sections/Socials.jsx'
import Join from './sections/Join.jsx'
import SiteFooter from './sections/SiteFooter.jsx'
import { useActiveSection } from './utils/useActiveSection.js'

const sectionIds = [
  'home',
  ...(siteConfig.sections.about ? ['about'] : []),
  ...(siteConfig.sections.features ? ['features'] : []),
  ...(siteConfig.sections.rules ? ['rules'] : []),
  ...(siteConfig.sections.faqs ? ['faqs'] : []),
  ...(siteConfig.sections.socials ? ['socials'] : []),
  ...(siteConfig.sections.join ? ['join'] : []),
]

const themeStyle = {
  '--color-ink': siteConfig.theme.ink,
  '--color-ink-soft': siteConfig.theme.inkSoft,
  '--color-forest': siteConfig.theme.forest,
  '--color-forest-deep': siteConfig.theme.forestDeep,
  '--color-panel': siteConfig.theme.panel,
  '--color-panel-hover': siteConfig.theme.panelHover,
  '--color-nav-surface': siteConfig.theme.navSurface,
  '--color-footer-surface': siteConfig.theme.footerSurface,
  '--color-paper': siteConfig.theme.paper,
  '--color-paper-warm': siteConfig.theme.paperWarm,
  '--color-white': siteConfig.theme.white,
  '--color-muted': siteConfig.theme.muted,
  '--color-muted-light': siteConfig.theme.mutedLight,
  '--color-line': siteConfig.theme.line,
  '--color-line-dark': siteConfig.theme.lineDark,
  '--color-gold': siteConfig.theme.gold,
  '--color-coral': siteConfig.theme.coral,
  '--color-amber': siteConfig.theme.amber,
  '--color-neutral': siteConfig.theme.neutral,
  '--font-body': siteConfig.theme.bodyFont,
  '--font-display': siteConfig.theme.displayFont,
  '--font-mono': siteConfig.theme.monoFont,
  '--motion-speed': siteConfig.animations.speed + 's',
  '--reveal-distance': siteConfig.animations.revealDistance + 'px',
}

function ChapterRail({ activeSection }) {
  const links = siteConfig.navigation.filter(
    (item) => item.id === 'home' || siteConfig.sections[item.id],
  )
  const activeIndex = Math.max(0, links.findIndex((item) => item.id === activeSection))

  return (
    <nav className="chapter-rail" aria-label={siteConfig.copy.navigation.sectionLabel}>
      <span className="chapter-rail-count" aria-hidden="true">
        {String(activeIndex + 1).padStart(2, '0')} <i>/ {String(links.length).padStart(2, '0')}</i>
      </span>
      <ol>
        {links.map((link, index) => (
          <li key={link.id}>
            <a
              href={'#' + link.id}
              className={activeSection === link.id ? 'is-active' : ''}
              aria-label={siteConfig.copy.navigation.goToSection.replace('{label}', link.label)}
              aria-current={activeSection === link.id ? 'location' : undefined}
            >
              <span className="chapter-rail-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="chapter-rail-name">{link.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function UpdateNotice() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (import.meta.env.DEV) return undefined

    let stopped = false
    async function checkForUpdate() {
      try {
        const response = await fetch(
          import.meta.env.BASE_URL + 'version.json?check=' + Date.now(),
          { cache: 'no-store' },
        )
        if (!response.ok) return
        const current = await response.json()
        if (!stopped && current.version && current.version !== __BUILD_ID__) {
          setUpdateAvailable(true)
        }
      } catch {
        // A version check is optional; a network error should not affect the page.
      }
    }

    checkForUpdate()
    const timer = window.setInterval(checkForUpdate, 300000)
    return () => {
      stopped = true
      window.clearInterval(timer)
    }
  }, [])

  if (!updateAvailable) return null

  return (
    <div className="update-notice" role="status">
      <span>{siteConfig.copy.update.available}</span>
      <button type="button" onClick={() => window.location.reload()}>
        {siteConfig.copy.update.refresh} <span aria-hidden="true">↻</span>
      </button>
      <button className="update-dismiss" type="button" aria-label={siteConfig.copy.update.dismiss} onClick={() => setUpdateAvailable(false)}>×</button>
    </div>
  )
}

export default function App() {
  const activeSection = useActiveSection(sectionIds)

  useEffect(() => {
    if (!siteConfig.animations.enabled || !siteConfig.animations.scrollReveal) {
      document.querySelectorAll('[data-reveal]').forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = document.querySelectorAll('[data-reveal]')
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.12 },
    )
    targets.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!siteConfig.animations.enabled || !siteConfig.animations.parallax || reducedMotion) return undefined
    const hero = document.querySelector('.hero')
    if (!hero) return undefined
    let frame = 0
    function updateParallax() {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        hero.style.setProperty('--parallax-offset', Math.min(window.scrollY * 0.11, 85) + 'px')
      })
    }
    updateParallax()
    window.addEventListener('scroll', updateParallax, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateParallax)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className={'site-shell' + (siteConfig.animations.enabled ? ' motion-enabled' : ' motion-disabled') + (siteConfig.animations.hoverEffects ? ' hover-effects-enabled' : ' hover-effects-disabled')} style={themeStyle}>
      <a className="skip-link" href="#main-content">{siteConfig.copy.navigation.skipToContent}</a>
      <UpdateNotice />
      <SiteNav activeSection={activeSection} />
      <ChapterRail activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        {siteConfig.sections.about && <About />}
        {siteConfig.sections.features && <Features />}
        {siteConfig.sections.rules && <Rules />}
        {siteConfig.sections.faqs && <FAQs />}
        {siteConfig.sections.socials && <Socials />}
        {siteConfig.sections.join && <Join />}
      </main>
      {siteConfig.sections.footer && <SiteFooter />}
      <CustomCursor />
    </div>
  )
}
