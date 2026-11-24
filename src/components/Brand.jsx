import siteConfig from '../config/siteConfig.js'
import { assetUrl } from '../utils/siteHelpers.js'

export default function Brand({ className = '', onClick, alternate = false }) {
  const copy = siteConfig.copy.brand
  const logo = alternate && siteConfig.branding.alternativeLogo
    ? siteConfig.branding.alternativeLogo
    : siteConfig.branding.logo
  return (
    <a className={'brand ' + className} href="#home" onClick={onClick} aria-label={copy.homeLabel}>
      {logo ? (
        <img
          src={assetUrl(logo)}
          alt={siteConfig.branding.logoAlt}
          style={{ width: siteConfig.branding.logoMaxWidth, height: siteConfig.branding.logoHeight, maxWidth: siteConfig.branding.logoMaxWidth, objectFit: 'contain', objectPosition: siteConfig.branding.logoPosition }}
        />
      ) : (
        <span className="brand-lockup" aria-hidden="true">
          <span className="brand-mark">{copy.initials}</span>
          <span className="brand-name">
            <strong>{copy.name}</strong>
            <small>{copy.descriptor}</small>
          </span>
        </span>
      )}
    </a>
  )
}
