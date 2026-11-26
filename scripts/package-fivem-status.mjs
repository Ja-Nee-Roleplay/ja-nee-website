import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import siteConfig from '../src/config/siteConfig.js'

const projectRoot = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const templatePath = path.join(projectRoot, 'server', 'fivem-status.php')
const outputPath = path.join(projectRoot, 'dist', 'api', 'fivem-status.php')
const rawHost = String(siteConfig.fivem.serverIp || '').trim().replace(/^https?:\/\//i, '').replace(/\/$/, '')
const port = Number(siteConfig.fivem.serverPort)

if (!/^[a-z0-9.-]+$/i.test(rawHost)) {
  throw new Error('siteConfig.fivem.serverIp must be a hostname or IPv4 address without a path.')
}
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('siteConfig.fivem.serverPort must be an integer between 1 and 65535.')
}

const phpString = (value) => "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"
const template = await readFile(templatePath, 'utf8')
const endpoint = template
  .replaceAll('__FIVEM_SERVER_HOST__', phpString(rawHost))
  .replaceAll('__FIVEM_SERVER_PORT__', String(port))

if (endpoint.includes('__FIVEM_SERVER_')) {
  throw new Error('A FiveM status endpoint setting was not replaced while packaging.')
}

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, endpoint, 'utf8')
console.log('Packaged cPanel FiveM status endpoint using src/config/siteConfig.js.')
