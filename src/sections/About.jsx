import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { assetUrl, imageBackgroundStyle } from '../utils/siteHelpers.js'

export default function About() {
  const copy = siteConfig.copy.about
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
            <span className="art-stamp"><Icon name="spark" size={17} /> {copy.artStamp}</span>
            <span className="art-coordinate">{copy.artCoordinate}</span>
          </div>
          <div className="about-note">
            <span className="note-number">{siteConfig.about.index}</span>
            <p>{copy.storyNote}</p>
          </div>
        </div>

        <div className="about-copy">
          <SectionHeading
            id="about-title"
            eyebrow={siteConfig.about.eyebrow}
            title={siteConfig.about.title}
            index={siteConfig.about.index}
          />
          <p className="about-lead">{siteConfig.about.introduction}</p>
          <div className="about-details">
            <article data-reveal>
              <span className="detail-symbol"><Icon name="pin" size={19} /></span>
              <div>
                <h3>{copy.communityHeading}</h3>
                <p>{siteConfig.about.community}</p>
              </div>
            </article>
            <article data-reveal>
              <span className="detail-symbol"><Icon name="spark" size={19} /></span>
              <div>
                <h3>{copy.philosophyHeading}</h3>
                <p>{siteConfig.about.philosophy}</p>
              </div>
            </article>
            <article data-reveal>
              <span className="detail-symbol"><Icon name="arrow" size={19} /></span>
              <div>
                <h3>{copy.expectationsHeading}</h3>
                <p>{siteConfig.about.expectations}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
