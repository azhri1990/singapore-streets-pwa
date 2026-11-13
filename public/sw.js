/* eslint-disable */

// Singapore Streets Service Worker — Offline-first with runtime caching
// Generated via Workbox configuration

const CACHE_NAME = 'sg-streets-v1.0.0'
const ASSETS_CACHE = 'sg-streets-assets-v1'
const API_CACHE = 'sg-streets-api-v1'

// App shell assets — precached on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icon-192.png',
  './icon-512.png',
]

// Network-first patterns (user-generated content)
const NETWORK_FIRST = [
  /\/api\/.*/,
]

// Cache-first patterns (static game assets)
const CACHE_FIRST = [
  /\.(?:png|jpg|jpeg|webp|gif|svg|ico|glb|gltf)$/,
  /\.(?:js|css|wasm|woff2)$/,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Failed to precache some assets:', err)
      })
    }).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME && key !== ASSETS_CACHE && key !== API_CACHE)
          .map((key) => caches.delete(key))
      )
    }).then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Skip extension-protocol requests
  if (url.protocol === 'chrome-extension:' || url.protocol === 'moz-extension:') return

  // API calls — network first
  if (NETWORK_FIRST.some((p) => p.test(url.pathname))) {
    event.respondWith(
      fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone()
          caches.open(API_CACHE).then((cache) => cache.put(request, clone))
        }
        return response
      }).catch(() => caches.match(request))
    )
    return
  }

  // Static assets — cache first
  if (CACHE_FIRST.some((p) => p.test(url.pathname))) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(ASSETS_CACHE).then((cache) => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Everything else — network first with cache fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request).then((r) => r || caches.match('./index.html')))
  )
})

// Push notification handler (for future enhancements)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const options = {
    body: data.body || 'Singapore Streets update',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: data.tag || 'sg-streets',
    renotify: data.renotify || false,
    requireInteraction: data.requireInteraction || false,
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Singapore Streets', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      if (clients.length) {
        return clients[0].focus()
      }
      return self.clients.openWindow('./')
    })
  )
})

// Background sync handler
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-game-data') {
    event.waitUntil(syncGameData())
  }
})

async function syncGameData() {
  console.log('[SW] Background sync triggered')
  try {
    const db = await openDB()
    const pending = await getPendingSyncs(db)
    for (const item of pending) {
      await fetch(item.url, { method: item.method, body: JSON.stringify(item.body) })
      await deletePendingSync(db, item.id)
    }
  } catch (err) {
    console.warn('[SW] Background sync failed:', err)
  }
}

// Mock IndexedDB helpers for pending sync queue
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('sg-streets-sync', 1)
    req.onupgradeneeded = () => {
      const db = req.result
      db.createObjectStore('pending-syncs', { keyPath: 'id', autoIncrement: true })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function getPendingSyncs(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending-syncs', 'readonly')
    const store = tx.objectStore('pending-syncs')
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

function deletePendingSync(db, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction('pending-syncs', 'readwrite')
    const store = tx.objectStore('pending-syncs')
    const req = store.delete(id)
    req.onsuccess = () => resolve()
    req.onerror = () => reject(req.error)
  })
}