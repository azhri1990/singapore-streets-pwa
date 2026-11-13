/**
 * src/core/InstallPrompt.js — Custom install prompt for PWA
 * 
 * Captures the `beforeinstallprompt` event and shows a custom UI
 * instead of the browser's default install banner.
 */

let _deferredPrompt = null
let _isInstalled = false

/**
 * Initialize install prompt handler
 * @param {Object} options - { onPrompt: Function, onInstall: Function, onDismiss: Function }
 */
export function initInstallPrompt(options = {}) {
  const { onPrompt, onInstall, onDismiss } = options

  // Check if already installed
  _isInstalled = isStandalone()
  if (_isInstalled) {
    console.log('[InstallPrompt] Already installed as PWA')
    return
  }

  // Listen for beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    _deferredPrompt = event
    console.log('[InstallPrompt] beforeinstallprompt captured')

    if (onPrompt) {
      onPrompt({
        prompt: () => showInstallPrompt(),
        userChoice: event.userChoice,
      })
    }
  })

  // Listen for app installed event
  window.addEventListener('appinstalled', () => {
    console.log('[InstallPrompt] App installed')
    _isInstalled = true
    _deferredPrompt = null
    if (onInstall) onInstall()
  })
}

/**
 * Show the custom install prompt
 */
export async function showInstallPrompt() {
  if (!_deferredPrompt) {
    console.warn('[InstallPrompt] No deferred prompt available')
    return { outcome: 'dismissed' }
  }

  try {
    // Show custom UI here — this is where you'd trigger your modal
    // For now, we just trigger the native prompt
    _deferredPrompt.prompt()
    const { outcome } = await _deferredPrompt.userChoice
    console.log('[InstallPrompt] User choice:', outcome)
    _deferredPrompt = null

    if (outcome === 'accepted') {
      _isInstalled = true
    }

    return { outcome }
  } catch (err) {
    console.error('[InstallPrompt] Failed to show prompt:', err)
    return { outcome: 'dismissed', error: err }
  }
}

/**
 * Check if install prompt is available
 */
export function canPrompt() {
  return _deferredPrompt !== null && !_isInstalled
}

/**
 * Check if running in standalone mode (installed PWA)
 */
export function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: minimal-ui)').matches ||
    navigator.standalone === true
  )
}

/**
 * Check if running in a TWA (Trusted Web Activity)
 */
export function isTWA() {
  return window.location.search.includes('utm_source=play_store') ||
         window.location.search.includes('twa=') ||
         document.referrer.includes('com.singapurasia.streets')
}

export default {
  initInstallPrompt,
  showInstallPrompt,
  canPrompt,
  isStandalone,
  isTWA,
}