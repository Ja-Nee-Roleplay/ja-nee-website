import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { DiscordAction } from '../components/SiteNav.jsx'
import { imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Join() {
  const copy = siteConfig.copy.join

  return (
    <section
      id="join"
      className="section join-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.join)}
      aria-labelledby="join-title"
    >
      <div className="page-shell join-layout">
        <div className="join-copy" data-reveal>
          <span className="join-mark"><Icon name="discord" size={29} /></span>
          <SectionHeading
            id="join-title"
            eyebrow={copy.eyebrow}
            title={siteConfig.discord.heading}
            description={siteConfig.discord.message}
            dark
            index={copy.index}
          />
          <div className="join-actions">
            {siteConfig.discord.inviteUrl ? (
              <DiscordAction className="button button--gold button--large">
                {copy.inviteLabel}
                <Icon name="arrow" size={18} />
              </DiscordAction>
            ) : (
              <p className="join-config-note"><span className="community-link-dot" /> {copy.inviteUnavailable}</p>
            )}
          </div>
          <div className="join-promise">
            <span className="join-promise-line" aria-hidden="true" />
            <p>{copy.promise}</p>
          </div>
        </div>

        <div className="join-path-card" data-reveal>
          <div className="join-path-head">
            <span>{copy.pathEyebrow}</span>
            <span>{copy.pathMark}</span>
          </div>
          <span className="join-path-symbol" aria-hidden="true"><Icon name="spark" size={23} /></span>
          <h3>{copy.pathTitle}</h3>
          <p className="join-path-description">{copy.pathDescription}</p>
          <ol className="join-path-steps">
            {copy.pathSteps.map((step) => (
              <li key={step.number}>
                <span className="join-path-number">{step.number}</span>
                <span className="join-path-step-copy"><strong>{step.title}</strong><small>{step.description}</small></span>
                <Icon name="arrow" size={15} />
              </li>
            ))}
          </ol>
          <div className="join-path-footer"><span />{copy.pathFooter}</div>
        </div>
      </div>
      <div className="join-decoration" aria-hidden="true">{copy.decoration.map((line) => <span key={line}>{line}</span>)}</div>
    </section>
  )
}
