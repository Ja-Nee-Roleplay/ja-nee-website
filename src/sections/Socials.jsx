import siteConfig from '../config/siteConfig.js'
import { SectionHeading } from '../components/ContentBlocks.jsx'
import Icon from '../components/Icon.jsx'
import { assetUrl, imageBackgroundStyle, isSafeExternalUrl } from '../utils/siteHelpers.js'

export default function Socials() {
  const socials = siteConfig.socials.filter(
    (social) => social.enabled && isSafeExternalUrl(social.url),
  )

  return (
    <section
      id="socials"
      className="section socials-section image-wash"
      style={imageBackgroundStyle(siteConfig.images.socials)}
      aria-labelledby="socials-title"
    >
      <div className="page-shell">
        <div className="socials-heading-row">
          <SectionHeading
            id="socials-title"
            eyebrow="05 / FOLLOW THE STORY"
            title="Find Ja-Nee out there."
            description="Official social channels will appear here when their links are added to the central site settings."
            index="05"
          />
          <div className="social-orbit" aria-hidden="true"><Icon name="spark" size={30} /></div>
        </div>

        {socials.length ? (
          <div className="social-list">
            {socials.map((social) => (
              <a
                className={'social-link' + (social.image ? ' has-image' : '')}
                href={social.url}
                key={social.name}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  '--social-accent': social.color || siteConfig.theme.forest,
                  '--social-image': social.image ? 'url("' + assetUrl(social.image) + '")' : 'none',
                }}
                data-cursor="interactive"
              >
                <span className="social-icon"><Icon name={social.icon} size={21} /></span>
                <span className="social-copy"><strong>{social.name}</strong><small>{social.description}</small></span>
                <Icon name="external" size={18} className="social-external" />
              </a>
            ))}
          </div>
        ) : (
          <div className="social-empty" data-reveal>
            <span className="social-empty-mark"><Icon name="spark" size={20} /></span>
            <div>
              <strong>No social links configured yet.</strong>
              <p>Add only Ja-Nee RP’s official, verified profiles in <code>siteConfig.js</code>.</p>
            </div>
            <span className="social-empty-meta">SOCIALS / 00</span>
          </div>
        )}
      </div>
    </section>
  )
}