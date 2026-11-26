import { useEffect, useRef, useState } from 'react'
import siteConfig from '../config/siteConfig.js'
import Brand from './Brand.jsx'
import Icon from './Icon.jsx'
import StatusPill from './StatusPill.jsx'
import { isSafeExternalUrl } from '../utils/siteHelpers.js'

function formatUpdated(date) {
  if (!date) return siteConfig.copy.status.noUpdate
  return siteConfig.copy.status.updatedPrefix + ' ' + new Intl.DateTimeFormat(siteConfig.general.locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function ServerStatusCard({ status }) {
  const currentStatus = status || {
    state: 'unknown',
    players: null,
    maxPlayers: null,
    lastUpdated: null,
    message: siteConfig.copy.status.waiting,
  }
  const copy = siteConfig.copy.status
  const hasPlayerCount = siteConfig.fivem.showPlayerCount && currentStatus.players !== null
  const statusMessage = currentStatus.message
    || copy.stateMessages?.[currentStatus.state]
    || copy.stateMessages?.unknown
    || copy.waiting
  const playerCountLabel = hasPlayerCount
    ? currentStatus.players + ' ' + copy.playersSuffix
      + (currentStatus.maxPlayers !== null ? ', ' + currentStatus.maxPlayers + ' ' + copy.playerCapacitySuffix : '')
    : ''
  const [connectionFeedback, setConnectionFeedback] = useState('')
  const joinCode = String(siteConfig.fivem.cfxJoinCode || '').trim()
  const hasValidJoinCode = /^[a-z0-9]{5,12}$/i.test(joinCode)
  const joinUrl = hasValidJoinCode ? 'https://cfx.re/join/' + joinCode : ''
  const joinCommand = hasValidJoinCode ? 'connect cfx.re/join/' + joinCode : ''

  async function copyJoinCommand() {
    if (!navigator.clipboard?.writeText) {
      setConnectionFeedback(copy.connectionCopyUnavailable)
      return
    }

    try {
      await navigator.clipboard.writeText(joinCommand)
      setConnectionFeedback(copy.connectionCopiedLabel)
    } catch {
      setConnectionFeedback(copy.connectionCopyUnavailable)
    }
  }

  return (
    <div className="server-status-card" data-state={currentStatus.state} aria-live="polite">
      <div className="server-status-top">
        <span className="status-label">{copy.heading}</span>
        <StatusPill state={currentStatus.state} />
      </div>
      <div className="server-status-bottom">
        <div className="server-status-overview">
          <span className="server-status-name">{copy.serverName}</span>
          <p className="server-status-message">{statusMessage}</p>
        </div>
        {hasPlayerCount && (
          <div className="server-player-count" role="group" aria-label={playerCountLabel}>
            <span className="server-player-count-value" aria-hidden="true">{currentStatus.players}</span>
            <span className="server-player-count-copy" aria-hidden="true">
              <span>{copy.playersSuffix}</span>
              {currentStatus.maxPlayers !== null && (
                <span>{currentStatus.maxPlayers} {copy.playerCapacitySuffix}</span>
              )}
            </span>
          </div>
        )}
      </div>
      <div className="server-status-foot">
        <span className="status-last-updated">{formatUpdated(currentStatus.lastUpdated)}</span>
      </div>
      {hasValidJoinCode && (
        <div className="server-connect">
          <div className="server-connect-instructions">
            <p>{copy.connectionInstruction}</p>
            <code data-cursor="text">{joinCommand}</code>
          </div>
          <div className="server-connect-actions">
            <button className="server-connect-copy" type="button" onClick={copyJoinCommand}>
              {copy.connectionCopyLabel}
            </button>
            <a className="server-connect-link" href={joinUrl} target="_blank" rel="noopener noreferrer">
              {copy.connectionLinkLabel} <Icon name="external" size={14} />
            </a>
          </div>
          <span className="server-connect-feedback" role="status" aria-live="polite">{connectionFeedback}</span>
        </div>
      )}
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
