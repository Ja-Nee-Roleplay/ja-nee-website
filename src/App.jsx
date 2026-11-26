import { useCallback, useEffect, useState } from 'react'
import siteConfig from './config/siteConfig.js'
import themeStyle from './config/siteTheme.js'
import CustomCursor from './components/CustomCursor.jsx'
import SiteNav from './components/SiteNav.jsx'
import Hero from './sections/Hero.jsx'
import ServerStatusSection from './sections/ServerStatus.jsx'
import About from './sections/About.jsx'
import Features from './sections/Features.jsx'
import Rules from './sections/Rules.jsx'
import FAQs from './sections/FAQs.jsx'
import Socials from './sections/Socials.jsx'
import SiteFooter from './sections/SiteFooter.jsx'
import { useActiveSection } from './utils/useActiveSection.js'
import LaunchScreen from './components/LaunchScreen.jsx'
import InteractionSounds from './components/InteractionSounds.jsx'
import RoamingMascot from './components/RoamingMascot.jsx'
import { useServerStatus } from './utils/useServerStatus.js'

const sectionIds = [
  'home',
  ...(siteConfig.sections.status ? ['status'] : []),
  ...(siteConfig.sections.about ? ['about'] : []),
  ...(siteConfig.sections.features ? ['features'] : []),
  ...(siteConfig.sections.rules ? ['rules'] : []),
  ...(siteConfig.sections.faqs ? ['faqs'] : []),
  ...(siteConfig.sections.socials ? ['socials'] : []),
]



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

function SectionNavigation() {
  const activeSection = useActiveSection(sectionIds)
  return (
    <>
      <SiteNav activeSection={activeSection} />
      <ChapterRail activeSection={activeSection} />
    </>
  )
}

function shouldShowLaunchScreen() {
  const launch = siteConfig.launch
  if (!launch.enabled) return false

  const countdownMode = ['timer', 'both'].includes(launch.mode)
  const launchAt = Date.parse(launch.launchAt)
  const countdownHasExpired = countdownMode
    && launch.launchAt
    && Number.isFinite(launchAt)
    && launchAt <= Date.now()

  return !countdownHasExpired
}

function UpdateNotice() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  useEffect(() => {
    if (import.meta.env.DEV || !siteConfig.updates.enabled) return undefined

    let stopped = false
    let checking = false
    async function checkForUpdate() {
      if (stopped || checking) return
      checking = true
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
      } finally {
        checking = false
      }
    }

    function checkWhenVisible() {
      if (document.visibilityState === 'visible') checkForUpdate()
    }

    checkForUpdate()
    const timer = window.setInterval(
      checkForUpdate,
      Math.max(15000, Number(siteConfig.updates.checkIntervalMs) || 15000),
    )
    document.addEventListener('visibilitychange', checkWhenVisible)
    return () => {
      stopped = true
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', checkWhenVisible)
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

function MainSite() {
  const serverStatus = useServerStatus()

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
      <SectionNavigation />
      <main id="main-content">
        <Hero status={serverStatus} />
        {siteConfig.sections.status && <ServerStatusSection status={serverStatus} />}
        {siteConfig.sections.about && <About />}
        {siteConfig.sections.features && <Features />}
        {siteConfig.sections.rules && <Rules />}
        {siteConfig.sections.faqs && <FAQs />}
        {siteConfig.sections.socials && <Socials />}
      </main>
      {siteConfig.sections.footer && <SiteFooter />}
    </div>
  )
}

export default function App() {
  const [launchActive, setLaunchActive] = useState(shouldShowLaunchScreen)
  const completeLaunch = useCallback(() => {
    setLaunchActive(false)
    window.location.reload()
  }, [])

  return (
    <>
      <InteractionSounds />
      <CustomCursor />
      {launchActive
        ? <>
          {/* The mascot belongs to both launch modes, never the normal website. */}
          <RoamingMascot />
          <LaunchScreen onComplete={completeLaunch} />
        </>
        : <MainSite />}
    </>
  )
}
