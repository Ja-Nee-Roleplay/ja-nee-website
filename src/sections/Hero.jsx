import siteConfig from '../config/siteConfig.js'
import Icon from '../components/Icon.jsx'
import { DiscordAction } from '../components/SiteNav.jsx'
import Brand from '../components/Brand.jsx'
import StatusPill from '../components/StatusPill.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Hero({ status }) {
  const copy = siteConfig.copy.hero
  const statusGlow = siteConfig.statusSection.glow[status?.state]
    || siteConfig.statusSection.glow.unknown
  const exploreId = ['about', 'features', 'rules', 'faqs', 'socials']
    .find((id) => siteConfig.sections[id]) || 'home'

  return (
    <section
      id="home"
      className="hero hero--home-centered image-wash"
      style={imageBackgroundStyle(siteConfig.images.hero)}
      aria-labelledby="hero-title"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-state-glow" style={{ '--server-status-glow': statusGlow }} aria-hidden="true" />
      <div className="hero-shell page-shell">
        <div className="hero-copy">
          {siteConfig.sections.status && (
            <a
              className={'hero-status-link hero-status-link--' + (status?.state || 'unknown')}
              href="#status"
              aria-label={siteConfig.copy.status.heading + ': ' + siteConfig.copy.status[(status?.state || 'unknown')] + '. ' + siteConfig.statusSection.linkLabel}
            >
              <span className="hero-status-label">{siteConfig.copy.status.buttonLabel}</span>
              <StatusPill state={status?.state} compact />
              <Icon name="arrow" size={15} />
            </a>
          )}
          {siteConfig.branding.logo ? (
            <div className="hero-logo-wrap" data-reveal>
              <img className="hero-logo" src={assetUrl(siteConfig.branding.logo)} alt={siteConfig.branding.logoAlt} />
            </div>
          ) : (
            <Brand className="brand--hero" />
          )}
          <p className="hero-eyebrow"><span className="eyebrow-line" />{siteConfig.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            {siteConfig.hero.titleLines.map((line, index) => (
              <span className={index === siteConfig.hero.titleLines.length - 1 ? 'hero-title-accent' : ''} key={line}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-tagline">{siteConfig.hero.tagline}</p>
          <p className="hero-description">{siteConfig.hero.description}</p>
          <div className="hero-actions">
            <DiscordAction className="button button--gold">
              {siteConfig.hero.primaryLabel}
              <Icon name="arrow" size={17} />
            </DiscordAction>
            <a className="button button--outline-light" href={'#' + exploreId}>
              {siteConfig.hero.secondaryLabel}
              <Icon name="arrow" size={17} />
            </a>
          </div>
          {!siteConfig.discord.inviteUrl && <p className="hero-config-note">{copy.inviteUnavailable}</p>}
        </div>

      </div>

      {siteConfig.hero.showScrollCue && (
        <a className="scroll-cue" href={'#' + exploreId} aria-label={copy.scrollCueAria}>
          <span>{copy.scrollCue}</span><span className="scroll-cue-line" aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
