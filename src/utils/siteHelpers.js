import siteConfig from '../config/siteConfig.js'

export function assetUrl(path) {
  if (!path) return ''
  if (/^(https?:|data:)/i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}

export function imageBackgroundStyle(image = {}) {
  if (!image.src && !image.gradient) return {}
  return {
    '--section-image': image.src ? 'url("' + assetUrl(image.src) + '")' : 'none',
    '--section-position': image.position || 'center',
    '--section-size': image.size || 'cover',
    '--section-repeat': image.repeat || 'no-repeat',
    '--section-overlay': image.overlayColor || 'transparent',
    '--section-overlay-opacity': String(image.overlayOpacity ?? 0),
    '--section-image-opacity': String(image.imageOpacity ?? 1),
    '--section-gradient': image.gradient || 'none',
    '--section-filter': image.blur > 0 ? 'blur(' + image.blur + 'px)' : 'none',
  }
}

export function isSafeExternalUrl(value) {
  if (!value || typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function getVisibleSocials() {
  return siteConfig.socials.filter(
    (social) => social.enabled !== false && isSafeExternalUrl(social.url),
  )
}
