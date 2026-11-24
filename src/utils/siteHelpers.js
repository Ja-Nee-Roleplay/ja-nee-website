import siteConfig from '../config/siteConfig.js'

const bundledAssets = import.meta.glob('../assets/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})

const bundledAssetsByPath = new Map()
const bundledAssetsByName = new Map()
const duplicatedAssetNames = new Set()

Object.entries(bundledAssets).forEach(([modulePath, url]) => {
  const relativePath = modulePath.replace(/^\.\.\/assets\//, '')
  const pathKey = relativePath.toLowerCase()
  const nameKey = relativePath.split('/').pop().toLowerCase()

  bundledAssetsByPath.set(pathKey, url)
  if (bundledAssetsByName.has(nameKey)) duplicatedAssetNames.add(nameKey)
  else bundledAssetsByName.set(nameKey, url)
})

duplicatedAssetNames.forEach((name) => bundledAssetsByName.delete(name))

function sourceAssetUrl(path) {
  const normalizedPath = path
    .replace(/\\/g, '/')
    .replace(/^(?:\.\.\/|\.\/)+/, '')
    .replace(/^\/+/, '')
    .replace(/^(?:src\/)?assets\//i, '')
    .toLowerCase()

  return bundledAssetsByPath.get(normalizedPath)
    || (!normalizedPath.includes('/') ? bundledAssetsByName.get(normalizedPath) : '')
}

export function assetUrl(path) {
  if (!path) return ''
  if (/^(https?:|data:|blob:)/i.test(path)) return path

  const bundledAsset = sourceAssetUrl(path)
  if (bundledAsset) return bundledAsset

  const publicPath = path.replace(/\\/g, '/').replace(/^\/+/, '')
  return import.meta.env.BASE_URL + publicPath
}

export function staffAvatarUrl(path) {
  return assetUrl(path)
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
