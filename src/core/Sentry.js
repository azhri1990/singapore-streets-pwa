/**
 * src/core/Sentry.js — Sentry integration for crash reporting
 * 
 * Initializes Sentry with performance monitoring and error tracking.
 * Only enabled in production builds.
 */

import * as Sentry from '@sentry/vue'

let _sentryInitialized = false

export function initSentry() {
  if (_sentryInitialized) return

  // Only initialize in production
  if (import.meta.env.DEV) {
    console.log('[Sentry] Skipping init in development mode')
    return
  }

  // Check for Sentry DSN in environment or config
  const dsn = import.meta.env.VITE_SENTRY_DSN || null
  if (!dsn) {
    console.warn('[Sentry] No VITE_SENTRY_DSN set — error tracking disabled')
    return
  }

  try {
    Sentry.init({
      dsn,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
        new Sentry.BrowserProfilingIntegration(),
        new Sentry.ReplayCanvasIntegration(),
      ],
      tracesSampleRate: 0.1, // 10% of transactions
      replaysSessionSampleRate: 0.1, // 10% of sessions
      replaysOnErrorSampleRate: 1.0, // 100% of error sessions
      profilesSampleRate: 0.1, // 10% of profiles
      environment: 'production',
      release: `singapore-streets@${import.meta.env.VITE_APP_VERSION || '1.0.0'}`,
      maxBreadcrumbs: 50,
      attachStacktrace: true,
      defaultIntegrations: [
        new Sentry.GlobalHandlers({
          onerror: true,
          onunhandledrejection: true,
        }),
        new Sentry.Breadcrumbs({
          console: true,
          dom: true,
          fetch: true,
          history: true,
          xhr: true,
        }),
        new Sentry.BrowserApiErrors(),
        new Sentry.BrowserSession(),
        new Sentry.InboundFilters(),
        new Sentry.ModuleInstrumentation(),
      ],
    })

    _sentryInitialized = true
    console.log('[Sentry] Initialized successfully')
  } catch (err) {
    console.error('[Sentry] Failed to initialize:', err)
  }
}

/**
 * Capture an exception with optional context
 */
export function captureException(error, context = {}) {
  if (!_sentryInitialized) {
    console.warn('[Sentry] Not initialized — logging to console:', error)
    console.error(error)
    return
  }
  Sentry.captureException(error, {
    extra: context,
  })
}

/**
 * Capture a message with level and tags
 */
export function captureMessage(message, level = 'info', tags = {}) {
  if (!_sentryInitialized) {
    console.log(`[Sentry] ${level.toUpperCase()}:`, message)
    return
  }
  Sentry.captureMessage(message, {
    level,
    tags,
  })
}

/**
 * Set user context for error tracking
 */
export function setUser(user) {
  if (!_sentryInitialized) return
  Sentry.setUser(user)
}

/**
 * Set a custom tag
 */
export function setTag(key, value) {
  if (!_sentryInitialized) return
  Sentry.setTag(key, value)
}

/**
 * Add a breadcrumb for debugging
 */
export function addBreadcrumb(breadcrumb) {
  if (!_sentryInitialized) return
  Sentry.addBreadcrumb(breadcrumb)
}

/**
 * Start a performance transaction
 */
export function startTransaction(name, op = 'navigation') {
  if (!_sentryInitialized) return null
  return Sentry.startTransaction({ name, op })
}

export default {
  initSentry,
  captureException,
  captureMessage,
  setUser,
  setTag,
  addBreadcrumb,
  startTransaction,
}