import siteConfig from '../config/siteConfig.js'
import Icon from '../components/Icon.jsx'
import { ServerStatusCard, DiscordAction } from '../components/SiteNav.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Hero() {
  const exploreId = ['about', 'features', 'rules', 'faqs', 'socials', 'join']
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
              {siteConfig.discord.inviteUrl ? siteConfig.hero.primaryLabel : 'Add your Discord invite'}
              <Icon name="arrow" size={17} />
            </DiscordAction>
            <a className="button button--outline-light" href={'#' + exploreId}>
              {siteConfig.hero.secondaryLabel}
              <Icon name="arrow" size={17} />
            </a>
          </div>
          <p className="hero-config-note">Connect the official invite in <code>siteConfig.js</code> when ready.</p>
        </div>

        <div className="hero-visual" aria-label={siteConfig.hero.imageAlt} data-reveal>
          <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
          <div className="hero-coordinate hero-coordinate--top">CITY / 01<br />STORIES IN MOTION</div>
          <div className="hero-coordinate hero-coordinate--bottom">JA-NEE RP<br />OPEN YOUR NEXT CHAPTER</div>
          <div className="hero-signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div className="hero-status-wrap" data-reveal>
          <ServerStatusCard />
        </div>
      </div>

      {siteConfig.hero.showScrollCue && (
        <a className="scroll-cue" href={'#' + exploreId} aria-label="Scroll to explore Ja-Nee RP">
          <span>SCROLL TO EXPLORE</span><span className="scroll-cue-line" aria-hidden="true" />
        </a>
      )}
    </section>
  )
}
