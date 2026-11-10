# Singapore Streets — Studio Session State

## Current Status
- **Game**: Singapore Streets — Open-world Three.js game set in Singapore 2026
- **Phase**: Mobile Optimization Complete → Production Deployment → APK Pipeline Setup
- **Build**: Vite production build at `/tmp/sg-build/dist/` (262 modules, 0 errors)
- **Dev Server**: `vite preview` at `http://127.0.0.1:8080/` — all endpoints HTTP 200
- **PWA**: manifest.json, sw.js, icon-192.png, icon-512.png — all serving 200
- **Age Gate**: User-click required (18+), game does not auto-start

## Mobile Optimization Systems (all implemented)
1. MobileOptimization — orchestrator (`getMobileOptimization`)
2. MobilePerformanceMonitor — performance monitor + throttling (`getPerformanceMonitor`)
3. MobileBatteryManager — battery thresholds 15%/30%/50%/80% (`initBatteryManager`)
4. MobileTouchSystem — 48px touch targets (`MOBILE_TUNING`)
5. MobileAssetStreamer — adaptive asset loading
6. MobileUISystem — mobile-first UI

## Battery Scaling Flow
BatteryManager → PerformanceMonitor.applyThrottleSettings → pixel ratio + shadows

## Production State
- Entry bundle: ~1,245 KB / ~350 KB gzip
- Hashed chunks: index-pd4Ch7Ec.js, three.webgpu-BVZoFFun.js, webgpu-CCuw_oKS.js
- Stale modulepreloads removed ✓
- Manifest/SW/icons fixed ✓

## APK Pipeline
- **Primary target**: InteeBuild (GitHub Actions → APK/AAB)
- **Fallback**: Bubblewrap (CLI → TWA → APK)
- **No store publishing** — distribution via direct APK

## Blocked / Next
- [ ] Install Android SDK for local Capacitor APK build
- [ ] Device testing (iOS Safari, Android Chrome) — real devices required
- [ ] Generate APK via InteeBuild GitHub Action or local tooling
