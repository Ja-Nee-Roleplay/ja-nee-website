import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function Features() {
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
            eyebrow="02 / THE JA-NEE EXPERIENCE"
            title="What could your story hold?"
            description="A few small things that make a shared story feel worth coming back to."
            dark
            index="02"
          />
          <span className="features-side-label">YOUR STORY<br />SETS THE PACE</span>
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
                {feature.isExample && <span className="example-chip">EXAMPLE COPY</span>}
              </div>
              <span className="feature-orbit" aria-hidden="true" />
            </article>
          ))}
        </div>
        <p className="features-footnote"><Icon name="spark" size={15} /> Every good story is better when it’s made together.</p>
      </div>
    </section>
  )
}
