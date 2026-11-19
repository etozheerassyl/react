/**
 * Aegis Core public REST API (read-only).
 *
 * The registry catalog is published as static JSON endpoints next to the app,
 * so it is a real HTTP API that works on any static host (GitHub Pages):
 *
 *   GET api/index.json          -> endpoint directory
 *   GET api/assets.json         -> list endpoint   { data: Asset[], total, generatedAt }
 *   GET api/assets/:id.json     -> details endpoint { data: Asset, generatedAt }
 *
 * - `vite dev`   : served by a dev-server middleware
 * - `vite build` : emitted into dist/api/**
 *
 * The browser only ever reads these endpoints over the network. Local
 * create / update / delete operations are applied on top of the fetched data
 * (see src/services/service.js), and the service worker caches these GET
 * responses with a network-first strategy so they stay available offline.
 */
import { initialDataSample } from './assets.seed.js'

const API_VERSION = 1

function buildEndpoints() {
  const generatedAt = new Date().toISOString()
  const endpoints = new Map()

  endpoints.set('api/assets.json', {
    version: API_VERSION,
    generatedAt,
    total: initialDataSample.length,
    data: initialDataSample,
  })

  for (const asset of initialDataSample) {
    endpoints.set(`api/assets/${asset.id}.json`, {
      version: API_VERSION,
      generatedAt,
      data: asset,
    })
  }

  endpoints.set('api/index.json', {
    name: 'Aegis Core Public Registry API',
    version: API_VERSION,
    generatedAt,
    endpoints: {
      list: 'api/assets.json',
      details: 'api/assets/{id}.json',
    },
  })

  return endpoints
}

export function aegisPublicApi() {
  return {
    name: 'aegis-public-api',

    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '').split('?')[0].replace(/^\/+/, '')
        if (!pathname.startsWith('api/')) return next()

        const payload = buildEndpoints().get(pathname)
        if (!payload) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'not_found', message: `No endpoint ${pathname}` }))
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-cache')
        res.end(JSON.stringify(payload))
      })
    },

    generateBundle() {
      for (const [fileName, payload] of buildEndpoints()) {
        this.emitFile({ type: 'asset', fileName, source: JSON.stringify(payload) })
      }
    },
  }
}

