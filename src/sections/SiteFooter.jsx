import siteConfig from '../config/siteConfig.js'
import Brand from '../components/Brand.jsx'
import Icon from '../components/Icon.jsx'
import { getVisibleSocials, imageBackgroundStyle } from '../utils/siteHelpers.js'

const currentYear = new Date().getFullYear()

export default function SiteFooter() {
  const socials = getVisibleSocials()
  const copy = siteConfig.copy.footer
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
            {siteConfig.footer.statusLinkEnabled && (
              <a className="footer-status-link" href="#home">
                <span className="footer-status-dot" /> {siteConfig.copy.status.checkLink} <Icon name="arrow" size={15} />
              </a>
            )}
          </div>

          <div className="footer-links-column">
            <span className="footer-column-label">{copy.exploreLabel}</span>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.id}><a href={'#' + link.id}>{link.label}</a></li>
              ))}
              {siteConfig.sections.join && <li><a href="#join">{copy.joinLink}</a></li>}
            </ul>
          </div>

          {(socials.length > 0 || (siteConfig.sections.join && siteConfig.discord.inviteUrl)) && (
            <div className="footer-links-column">
              <span className="footer-column-label">{copy.connectLabel}</span>
              <ul>
                {socials.map((social) => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">{social.name}<Icon name="external" size={13} /></a>
                  </li>
                ))}
                {siteConfig.sections.join && siteConfig.discord.inviteUrl && (
                  <li><a href={siteConfig.discord.inviteUrl} target="_blank" rel="noopener noreferrer">{copy.discordLink}<Icon name="external" size={13} /></a></li>
                )}
              </ul>
            </div>
          )}

          <button className="back-to-top" type="button" onClick={scrollToTop} aria-label={siteConfig.footer.backToTopLabel}>
            <Icon name="up" size={18} /><span>{siteConfig.footer.backToTopLabel}</span>
          </button>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} {siteConfig.footer.copyrightName}. {copy.copyrightSuffix}</span>
          <span className="footer-edition">{copy.editionName} <i /> {copy.editionLabel}</span>
          <a href="#home" aria-label={copy.backToTopAria}>{copy.backToTopLink}</a>
        </div>
      </div>
    </footer>
  )
}
