import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Features() {
  const copy = siteConfig.copy.features
  const section = siteConfig.featureSection
  return (
    <section
      id="features"
      className="section features-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.features)}
      aria-labelledby="features-title"
    >
      <div className="page-shell">
        <div className="features-heading-row">
          <SectionHeading
            id="features-title"
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            dark
            index={section.index}
          />
          <span className="features-side-label">{copy.sideLabel.map((line) => <span key={line}>{line}</span>)}</span>
        </div>
        <div className="features-list">
          {siteConfig.features.map((feature) => (
            <article
              className={'feature-row feature-row--' + feature.accent}
              key={feature.number + feature.title}
              data-reveal
              style={feature.accentColor ? { '--feature-accent': feature.accentColor } : undefined}
            >
              <span className="feature-number">{feature.number}</span>
              <div className="feature-main">
                <span className="feature-category">{feature.category}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              <div className="feature-action">
                {feature.image ? (
                  <img className="feature-image" src={assetUrl(feature.image)} alt="" loading="lazy" />
                ) : feature.icon ? (
                  <span className="feature-image feature-icon"><Icon name={feature.icon} size={20} /></span>
                ) : null}
                {feature.isExample && <span className="example-chip">{copy.exampleLabel}</span>}
              </div>
              <span className="feature-orbit" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="features-footnote"><Icon name="spark" size={15} /> {copy.footnote}</p>
      </div>
    </section>
  )
}
