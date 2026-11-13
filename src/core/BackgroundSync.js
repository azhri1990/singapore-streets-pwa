/**
 * src/core/BackgroundSync.js — Periodic Background Sync + Share Target API
 * 
 * Handles:
 * - Periodic Background Sync for asset pre-fetching
 * - Share Target API for receiving shared files/URLs
 * - Workbox background sync integration
 */

let _syncRegistered = false
let _shareHandler = null

/**
 * Register for periodic background sync
 */
export async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator)) {
    console.log('[BackgroundSync] Service Worker not available')
    return false
  }

  if (!('periodicSync' in navigator.serviceWorker)) {
    console.log('[BackgroundSync] Periodic Sync not supported')
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const status = await navigator.serviceWorker.periodicSync.getStatus()

    if (status.status === 'denied') {
      console.warn('[BackgroundSync] Permission denied')
      return false
    }

    if (status.status === 'granted') {
      console.log('[BackgroundSync] Already granted')
    } else {
      // Request permission
      await navigator.serviceWorker.periodicSync.requestPermission()
    }

    // Register for asset pre-fetching
    await navigator.serviceWorker.periodicSync.register('sg-streets-asset-sync', {
      minInterval: 24 * 60 * 60 * 1000, // 24 hours
    })

    _syncRegistered = true
    console.log('[BackgroundSync] Periodic sync registered')
    return true
  } catch (err) {
    console.error('[BackgroundSync] Failed to register:', err)
    return false
  }
}

/**
 * Handle share target API — process shared files/URLs
 */
export function setupShareTarget(handler) {
  _shareHandler = handler

  if (!('serviceWorker' in navigator)) return

  // Check if the app was launched via share target
  const url = new URL(window.location.href)
  const shareData = url.searchParams.get('share')

  if (shareData) {
    try {
      const parsed = JSON.parse(decodeURIComponent(shareData))
      if (_shareHandler) {
        _shareHandler(parsed)
      }
    } catch (err) {
      console.warn('[ShareTarget] Failed to parse share data:', err)
    }
  }
}

/**
 * Share game data via Web Share API
 */
export async function shareGame(data) {
  if (!navigator.share) {
    console.log('[Share] Web Share API not available')
    return false
  }

  try {
    await navigator.share({
      title: data.title || 'Singapore Streets',
      text: data.text || 'Check out my score in Singapore Streets!',
      url: data.url || window.location.href,
      files: data.files || [],
    })
    console.log('[Share] Shared successfully')
    return true
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('[Share] Failed to share:', err)
    }
    return false
  }
}

/**
 * Request background sync for a specific tag
 */
export async function requestBackgroundSync(tag) {
  if (!('serviceWorker' in navigator)) return false

  try {
    const registration = await navigator.serviceWorker.ready
    if ('sync' in registration) {
      await registration.sync.register(tag)
      console.log(`[BackgroundSync] Registered sync tag: ${tag}`)
      return true
    }
  } catch (err) {
    console.error('[BackgroundSync] Failed to request sync:', err)
  }
  return false
}

/**
 * Check if the app is running as a TWA/PWA (standalone mode)
 */
export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    navigator.standalone === true
  )
}

export default {
  registerPeriodicSync,
  setupShareTarget,
  shareGame,
  requestBackgroundSync,
  isStandalone,
}