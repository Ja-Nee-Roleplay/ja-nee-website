import siteConfig from '../config/siteConfig.js'
import Icon from '../components/Icon.jsx'
import { ServerStatusCard, DiscordAction } from '../components/SiteNav.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Hero() {
  const copy = siteConfig.copy.hero
  const exploreId = ['about', 'features', 'rules', 'faqs', 'socials']
    .find((id) => siteConfig.sections[id]) || 'home'

  return (
    <section
      id="home"
      className="hero image-wash"
      style={imageBackgroundStyle(siteConfig.images.hero)}
      aria-labelledby="hero-title"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-shell page-shell">
        <div className="hero-copy">
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

        <div className="hero-visual" role="img" aria-label={siteConfig.hero.imageAlt} data-reveal>
          <img className="hero-scene" src={assetUrl(siteConfig.images.hero.src)} alt="" />
          <div className="hero-scene-overlay" aria-hidden="true" />
          <div className="hero-scene-topline"><span>{copy.sceneBrand}</span><span>{copy.sceneTagline}</span></div>
          <div className="hero-scene-caption">
            <span className="hero-scene-kicker">{copy.sceneKicker}</span>
            <strong>{copy.sceneTitle.map((line) => <span key={line}>{line}</span>)}</strong>
          </div>
          <span className="hero-scene-sun" aria-hidden="true" />
        </div>

        <div className="hero-status-wrap" data-reveal>
          <ServerStatusCard />
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
