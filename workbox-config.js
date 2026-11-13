// workbox-config.js — Workbox configuration for Singapore Streets PWA
// Usage: npx workbox-webpack-plugin generateSW --config workbox-config.js

module.exports = {
  globDirectory: 'dist',
  globPatterns: {
    patterns: [
      {
        glob: '**/*.{js,css,png,jpg,jpeg,webp,svg,ico,glb,gltf,wasm}',
        revision: '[hash]',
      },
      {
        glob: 'index.html',
        revision: '[hash]',
      },
    ],
  },
  swDest: 'dist/sw.js',
  swSrc: 'public/sw.js',
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB
  navigateFallback: '/index.html',
  navigateFallbackAllowlist: [
    /^\/(?!api|assets|icon|manifest|sw\.js|\.well-known)/,
  ],
  runtimeCaching: [
    {
      handler: 'CacheFirst',
      urlPattern: /\.(?:png|jpg|jpeg|webp|gif|svg|ico|glb|gltf|woff2|wasm)$/,
      options: {
        cacheName: 'sg-streets-assets',
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      handler: 'NetworkFirst',
      urlPattern: /\/api\//,
      options: {
        cacheName: 'sg-streets-api',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 5, // 5 minutes
        },
        networkTimeoutSeconds: 10,
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      handler: 'StaleWhileRevalidate',
      urlPattern: /^https:\/\/api\.openstreetmap\.org\//,
      options: {
        cacheName: 'sg-streets-osm',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 60 * 60 * 24, // 24 hours
        },
      },
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
  cleanupOutdatedCaches: true,
  mode: 'production',
  sourcemap: false,
  // Don't cache the manifest itself — it changes with each build
  ignoreURLParamMatching: [/^v$/],
}