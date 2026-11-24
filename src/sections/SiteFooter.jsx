import siteConfig from '../config/siteConfig.js'
import Brand from '../components/Brand.jsx'
import Icon from '../components/Icon.jsx'
import { imageBackgroundStyle, isSafeExternalUrl } from '../utils/siteHelpers.js'

const currentYear = new Date().getFullYear()

export default function SiteFooter() {
  const socials = siteConfig.socials.filter(
    (social) => social.enabled && isSafeExternalUrl(social.url),
  )
  const footerLinks = siteConfig.navigation.filter(
    (item) => item.id === 'home' || siteConfig.sections[item.id],
  )

  function scrollToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  return (
    <footer className="site-footer image-wash" style={imageBackgroundStyle(siteConfig.images.footer)}>
      <div className="page-shell">
        <div className="footer-main">
          <div className="footer-brand-column">
            <Brand className="brand--footer" alternate />
            <p>{siteConfig.footer.description}</p>
            <a className="footer-status-link" href="#home">
              <span className="footer-status-dot" /> Check FiveM server status <Icon name="arrow" size={15} />
            </a>
          </div>

          <div className="footer-links-column">
            <span className="footer-column-label">EXPLORE</span>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.id}><a href={'#' + link.id}>{link.label}</a></li>
              ))}
              {siteConfig.sections.join && <li><a href="#join">Join us</a></li>}
            </ul>
          </div>

          <div className="footer-links-column">
            <span className="footer-column-label">CONNECT</span>
            <ul>
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noopener noreferrer">{social.name}<Icon name="external" size={13} /></a>
                </li>
              ))}
              {!socials.length && (
                <li><a href="#socials">Social profiles coming soon<Icon name="arrow" size={13} /></a></li>
              )}
              {siteConfig.sections.join && <li><a href="#join">Discord community<Icon name="arrow" size={13} /></a></li>}
            </ul>
          </div>

          <button className="back-to-top" type="button" onClick={scrollToTop} aria-label={siteConfig.footer.backToTopLabel}>
            <Icon name="up" size={18} /><span>{siteConfig.footer.backToTopLabel}</span>
          </button>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} {siteConfig.footer.copyrightName}. All rights reserved.</span>
          <span className="footer-edition">JA-NEE RP <i /> COMMUNITY / ROLEPLAY</span>
          <a href="#home" aria-label="Return to the top of the page">BACK TO TOP ↑</a>
        </div>
      </div>
    </footer>
  )
}