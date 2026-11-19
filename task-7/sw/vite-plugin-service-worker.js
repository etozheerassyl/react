/**
 * Build-time generator for the hand-written service worker (sw/service-worker.js).
 *
 * After Vite writes the production bundle, this plugin:
 *   1. walks dist/ and collects the application shell (index.html, offline.html,
 *      manifest, icons and every hashed JS/CSS chunk),
 *   2. derives a content hash -> BUILD_VERSION (changes whenever any shell file changes),
 *   3. injects both into the service worker template and writes dist/sw.js,
 *   4. writes dist/version.json (used by the app for connectivity probes / version display).
 *
 * In `vite dev`, it serves `version.json` for live connectivity probes and a
 * minimal pass-through `sw.js` so HMR is never cached.
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const TEMPLATE_PATH = fileURLToPath(new URL('./service-worker.js', import.meta.url))

// Files that must never be precached
const EXCLUDE = [
  /^sw\.js$/,
  /^version\.json$/,
  /^404\.html$/, // GitHub Pages redirect helper, only used for deep links online
  /^_redirects$/,
  /^vercel\.json$/,
  /^api\//, // API data is runtime-cached (network-first), never precached
  /\.map$/,
]

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

export function aegisServiceWorker() {
  let outDir = 'dist'
  let isBuild = false

  return {
    name: 'aegis-service-worker',

    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
      isBuild = config.command === 'build'
    },

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '').split('?')[0].replace(/^\/+/, '')
        if (pathname === 'version.json') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify({ version: 'dev', builtAt: new Date().toISOString() }))
          return
        }
        if (pathname === 'sw.js') {
          res.statusCode = 200
          res.setHeader('Content-Type', 'application/javascript')
          res.setHeader('Cache-Control', 'no-store')
          res.end(
            'self.addEventListener("install",()=>self.skipWaiting());' +
              'self.addEventListener("activate",(e)=>e.waitUntil(self.clients.claim()));'
          )
          return
        }
        next()
      })
    },

    closeBundle() {
      if (!isBuild) return

      const template = readFileSync(TEMPLATE_PATH, 'utf8')

      const files = walk(outDir)
        .map((full) => relative(outDir, full).split(sep).join('/'))
        .filter((file) => !EXCLUDE.some((pattern) => pattern.test(file)))
        .sort()

      const hash = createHash('sha256')
      hash.update(template)
      for (const file of files) {
        hash.update(file)
        hash.update(readFileSync(join(outDir, file)))
      }
      const version = hash.digest('hex').slice(0, 10)
      const builtAt = new Date().toISOString()

      const sw = template
        .replace('__BUILD_VERSION__', version)
        .replace('__BUILD_TIME__', builtAt)
        .replace('self.__PRECACHE_MANIFEST__', JSON.stringify(files, null, 2))

      writeFileSync(join(outDir, 'sw.js'), sw)
      writeFileSync(join(outDir, 'version.json'), JSON.stringify({ version, builtAt }))

      console.log(`\n[aegis-sw] sw.js generated — version ${version}, ${files.length} precached files`)
    },
  }
}
