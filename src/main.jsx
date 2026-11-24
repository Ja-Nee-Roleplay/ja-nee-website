import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import siteConfig from './config/siteConfig.js'
import { assetUrl } from './utils/siteHelpers.js'
import './styles/global.css'
import './styles/brand-overrides.css'
import App from './App.jsx'

document.documentElement.classList.add('js-enabled')
document.title = siteConfig.general.title

const description = document.querySelector('meta[name="description"]')
if (description) description.content = siteConfig.general.description

const setMetaContent = (property, content) => {
  const node = document.querySelector('meta[property="' + property + '"], meta[name="' + property + '"]')
  if (node && content) node.content = content
}

setMetaContent('og:title', siteConfig.general.openGraph.title)
setMetaContent('og:description', siteConfig.general.openGraph.description)
setMetaContent('og:image', assetUrl(siteConfig.general.openGraph.image))
setMetaContent('og:type', siteConfig.general.openGraph.type)
setMetaContent('twitter:title', siteConfig.general.openGraph.title)
setMetaContent('twitter:description', siteConfig.general.openGraph.description)
setMetaContent('twitter:image', assetUrl(siteConfig.general.openGraph.image))

const themeColor = document.querySelector('meta[name="theme-color"]')
if (themeColor) themeColor.content = siteConfig.general.themeColor
const favicon = document.querySelector('link[rel="icon"]')
if (favicon) favicon.href = assetUrl(siteConfig.general.favicon)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
