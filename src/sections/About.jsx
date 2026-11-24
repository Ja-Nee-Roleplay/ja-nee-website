import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function About() {
  return (
    <section
      id="about"
      className="section about-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.about)}
      aria-labelledby="about-title"
    >
      <div className="page-shell about-layout">
        <div className="about-art" data-reveal>
          <div className="art-frame">
            <img src={assetUrl(siteConfig.about.image)} alt={siteConfig.about.imageAlt} loading="lazy" />
            <span className="art-stamp"><Icon name="spark" size={17} /> STORY / PLACE / PEOPLE</span>
            <span className="art-coordinate">JA-NEE RP · 01</span>
          </div>
          <div className="about-note">
            <span className="note-number">01</span>
            <p>Every story starts somewhere.</p>
          </div>
        </div>

        <div className="about-copy">
          <SectionHeading
            id="about-title"
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.title}
            index="01"
          />
          {siteConfig.about.starterCopy && (
            <p className="starter-copy-note"><span /> STARTER COPY — PERSONALISE BEFORE LAUNCH</p>
          )}
          <p className="about-lead">{siteConfig.about.introduction}</p>
          <div className="about-details">
            <article data-reveal>
              <span className="detail-symbol"><Icon name="pin" size={19} /></span>
              <div>
                <h3>The community</h3>
                <p>{siteConfig.about.community}</p>
              </div>
            </article>
            <article data-reveal>
              <span className="detail-symbol"><Icon name="spark" size={19} /></span>
              <div>
                <h3>Our philosophy</h3>
                <p>{siteConfig.about.philosophy}</p>
              </div>
            </article>
            <article data-reveal>
              <span className="detail-symbol"><Icon name="arrow" size={19} /></span>
              <div>
                <h3>What to expect</h3>
                <p>{siteConfig.about.expectations}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}