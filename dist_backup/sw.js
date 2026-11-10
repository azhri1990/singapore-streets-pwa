// Service Worker for Singapore Streets PWA - Offline First
// Handles Vite-hashed asset URLs dynamically
const CACHE_NAME = 'singapore-streets-v3-offline';
const CORE_ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all([
        cache.addAll(CORE_ASSETS),
        // Cache core JS entries
        cache.addAll(['./assets/index-*.js']).catch(() => {}),
        cache.addAll(['./assets/three-*.js']).catch(() => {}),
        cache.addAll(['./assets/world-*.js']).catch(() => {}),
        cache.addAll(['./assets/core-*.js']).catch(() => {}),
        cache.addAll(['./assets/ui-*.js']).catch(() => {}),
        cache.addAll(['./assets/systems-*.js']).catch(() => {}),
        cache.addAll(['./assets/entities-*.js']).catch(() => {}),
        cache.addAll(['./assets/combat-*.js']).catch(() => {}),
        cache.addAll(['./assets/gangs-*.js']).catch(() => {}),
        cache.addAll(['./assets/comms-*.js']).catch(() => {}),
        cache.addAll(['./assets/jobs-*.js']).catch(() => {}),
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first for navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Cache-first strategy for static assets (JS/CSS/images)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback for unknown assets
        return new Response('', { status: 404 });
      });
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
});