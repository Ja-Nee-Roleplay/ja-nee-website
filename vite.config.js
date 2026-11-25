import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import siteConfig from './src/config/siteConfig.js'

const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY?.split('/') || []
const isAccountSite = repositoryOwner && repositoryName?.toLowerCase() === (repositoryOwner + '.github.io').toLowerCase()
const githubPagesBase = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? (isAccountSite ? '/' : '/' + repositoryName + '/')
  : '/'
// Set VITE_BASE_PATH=/ for cPanel's custom-domain root; GitHub Pages keeps its repository path.
const base = process.env.VITE_BASE_PATH || githubPagesBase
const buildId = process.env.GITHUB_SHA || new Date().toISOString()

function escapeAttribute(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function publicPath(path) {
  if (/^https?:\/\//i.test(path)) return path
  return base + String(path || '').replace(/^\//, '')
}

function siteMetadataPlugin() {
  const replacements = {
    __THEME_COLOR__: siteConfig.general.themeColor,
    __META_DESCRIPTION__: siteConfig.general.description,
    __OG_TITLE__: siteConfig.general.openGraph.title,
    __OG_DESCRIPTION__: siteConfig.general.openGraph.description,
    __OG_IMAGE__: publicPath(siteConfig.general.openGraph.image),
    __OG_TYPE__: siteConfig.general.openGraph.type,
    __FAVICON__: publicPath(siteConfig.general.favicon),
    __SITE_TITLE__: siteConfig.general.title,
  }

  return {
    name: 'ja-nee-site-metadata',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [key, value]) => result.replaceAll(key, escapeAttribute(value)),
        html,
      )
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify({ version: buildId }, null, 2),
      })
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), siteMetadataPlugin()],
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
})
