import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Brand from './Brand.jsx'
import Icon from './Icon.jsx'
import StatusPill from './StatusPill.jsx'
import { useServerStatus } from '../utils/useServerStatus.js'
import { isSafeExternalUrl } from '../utils/siteHelpers.js'

function formatUpdated(date) {
  if (!date) return siteConfig.copy.status.noUpdate
  return siteConfig.copy.status.updatedPrefix + ' ' + new Intl.DateTimeFormat(siteConfig.general.locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function ServerStatusCard() {
  const status = useServerStatus()
  const count = status.players !== null && siteConfig.fivem.showPlayerCount
    ? status.maxPlayers !== null
      ? status.players + ' / ' + status.maxPlayers + ' ' + siteConfig.copy.status.playersSuffix
      : status.players + ' ' + siteConfig.copy.status.playersSuffix
    : null

  return (
    <div className="server-status-card" aria-live="polite">
      <div className="server-status-top">
        <span className="status-label">{siteConfig.copy.status.heading}</span>
        <StatusPill state={status.state} />
      </div>
      <div className="server-status-bottom">
        <span className="server-status-name">{siteConfig.copy.status.serverName}</span>
        {count && <span className="server-player-count">{count}</span>}
      </div>
      <div className="server-status-foot">
        <span>{status.message || siteConfig.copy.status.waiting}</span>
        <span className="status-last-updated">{formatUpdated(status.lastUpdated)}</span>
      </div>
    </div>
  )
}

export default function SiteNav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)
  const links = siteConfig.navigation.filter((item) => item.id === 'home' || siteConfig.sections[item.id])

  useEffect(() => {
    let frame = 0
    function onScroll() {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const nextScrolled = window.scrollY > 32
        if (scrolledRef.current === nextScrolled) return
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className={'site-nav' + (scrolled ? ' site-nav--scrolled' : '')}>
      <div className="nav-inner">
        <Brand onClick={closeMenu} />
        <button
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? siteConfig.copy.navigation.closeMenu : siteConfig.copy.navigation.openMenu}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
        <nav id="site-navigation" className={'site-navigation' + (menuOpen ? ' is-open' : '')} aria-label={siteConfig.copy.navigation.mainLabel}>
          <ul>
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={'#' + link.id}
                  className={activeSection === link.id ? 'is-active' : ''}
                  aria-current={activeSection === link.id ? 'location' : undefined}
                  onClick={closeMenu}
                >
                  {link.label}
                  <span className="nav-link-indicator" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <DiscordAction className="nav-cta" onClick={closeMenu}>
          <span>{siteConfig.discord.inviteUrl ? siteConfig.copy.navigation.joinLabel : siteConfig.copy.navigation.detailsLabel}</span><Icon name="arrow" size={15} />
        </DiscordAction>
      </div>
    </header>
  )
}

export function DiscordAction({ className = '', children, onClick }) {
  const invite = siteConfig.discord.inviteUrl
  const validInvite = isSafeExternalUrl(invite)
  const label = children || siteConfig.hero.primaryLabel

  return validInvite ? (
    <a
      className={className}
      href={invite}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {label}
    </a>
  ) : (
    <a className={className + ' button--needs-config'} href={siteConfig.sections.socials ? '#socials' : '#home'} aria-label={siteConfig.copy.navigation.inviteUnavailable} onClick={onClick}>
      {label}
    </a>
  )
}
