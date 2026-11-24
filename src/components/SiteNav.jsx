import { useEffect, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Brand from './Brand.jsx'
import Icon from './Icon.jsx'
import StatusPill from './StatusPill.jsx'
import { useServerStatus } from '../utils/useServerStatus.js'
import { isSafeExternalUrl } from '../utils/siteHelpers.js'

function formatUpdated(date) {
  if (!date) return 'Awaiting first successful check'
  return 'Last successful update: ' + new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function ServerStatusCard() {
  const status = useServerStatus()
  const count = status.players !== null && siteConfig.fivem.showPlayerCount
    ? status.maxPlayers !== null
      ? status.players + ' / ' + status.maxPlayers + ' PLAYERS'
      : status.players + ' PLAYERS'
    : null

  return (
    <div className="server-status-card" aria-live="polite">
      <div className="server-status-top">
        <span className="status-label">FIVEM SERVER STATUS</span>
        <StatusPill state={status.state} />
      </div>
      <div className="server-status-bottom">
        <span className="server-status-name">JA-NEE RP</span>
        {count && <span className="server-player-count">{count}</span>}
      </div>
      <div className="server-status-foot">
        <span>{status.message || 'Status source responded.'}</span>
        <span className="status-last-updated">{formatUpdated(status.lastUpdated)}</span>
      </div>
    </div>
  )
}

export default function SiteNav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const links = siteConfig.navigation.filter((item) => item.id === 'home' || siteConfig.sections[item.id])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 32)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
        </button>
        <nav id="site-navigation" className={'site-navigation' + (menuOpen ? ' is-open' : '')} aria-label="Main navigation">
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
        {siteConfig.sections.join && (
          <a className="nav-cta" href="#join" onClick={closeMenu}>
            <span>Join the community</span><Icon name="external" size={15} />
          </a>
        )}
      </div>
    </header>
  )
}

export function DiscordAction({ className = '', children }) {
  const invite = siteConfig.discord.inviteUrl
  const validInvite = isSafeExternalUrl(invite)
  const label = children || (validInvite ? siteConfig.hero.primaryLabel : 'Discord invite needed')

  return validInvite ? (
    <a
      className={className}
      href={invite}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  ) : (
    <a className={className + ' button--needs-config'} href={siteConfig.sections.join ? '#join' : '#home'} aria-label="Discord invite is not configured. See the join section for setup details.">
      {label}
    </a>
  )
}