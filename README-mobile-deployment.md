# Singapore Streets Mobile Deployment Guide

## Overview
This guide covers mobile deployment for Singapore Streets PWA, including:
- Mobile optimization verification
- PWA installation flow
- Deployment checklist
- Monitoring and troubleshooting

## Mobile Optimization Verification

### Critical Systems Verified
1. **GPU Optimization**
   - Reduced render scale for low-end devices
   - Compressed texture formats (DXT/ASTC)
   - Disabled expensive features on mobile (post-processing, high-res shadows)

2. **Touch System Enhancements**
   - D-pad zones with 48px minimum touch targets
   - Swipe gesture detection with directional sensitivity
   - Tap zone pooling to reduce event processing overhead
   - Optimized touch event handling with passive mode where possible

3. **Performance Monitoring**
   - Frame pacing with adaptive throttling
   - FPS tracking with grade-based feedback (A-F)
   - Battery-aware performance scaling (3 levels: balanced, performance, battery-saving)
   - Adaptive asset loading based on device capability

4. **Battery Management**
   - Real-time battery level monitoring via Battery API
   - Automatic performance budget adjustment based on battery level
   - Critical battery thresholds (15%, 30%, 50%, 80%)
   - Fallback estimation for devices without Battery API

5. **Mobile-First UI**
   - Responsive breakpoints (xs, sm, md, lg, xl)
   - Touch-friendly controls with minimum 48px targets
   - Adaptive layout system with breakpoint detection
   - Mobile-specific UI elements with CSS media queries

### Testing Requirements
- **iOS**: Safari (iPhone 12+, iPad)
- **Android**: Chrome (various screen sizes, including foldables)
- **Screen Sizes**: 320px, 360px, 412px, 480px, 768px, 1024px, 1440px
- **Battery Levels**: 100%, 80%, 50%, 30%, 15% (simulated)
- **Network Conditions**: 4G, 3G, WiFi, offline

## PWA Installation Flow

### Required Files
- `manifest.json` - PWA manifest with proper icons and settings (root level)
- `sw.js` - Service worker for offline support and installation (root level)
- `index.html` - Proper viewport meta tag with `viewport-fit=cover` (root level)

### Installation Checklist
1. Verify manifest.json contains:
   - `name`: "Singapore Streets"
   - `short_name`: "SG Streets"
   - `start_url`: "/"
   - `display`: "standalone"
   - `background_color`: "#ffffff"
   - `theme_color`: "#000000"
   - Icons (192px, 512px)

2. Verify service worker (sw.js) includes:
   - Cache-first strategy for core assets
   - Network-first strategy for dynamic content
   - Offline fallback for game assets
   - Proper versioning for cache busting

3. Test installation flow:
   - Visit site on mobile device
   - Look for "Add to Home Screen" prompt
   - Complete installation
   - Verify app launches from home screen
   - Test offline functionality (turn off network, reload)

## Deployment Instructions

### Build Configuration
Use the production build configuration:

```bash
# Production build for mobile
npx vite build --mode production

# Verify build output
ls -la dist/
```

### Production Build Settings
- Enable minification and tree-shaking
- Set cache control headers for static assets
- Configure CDN for global distribution
- Enable HTTP/2 or HTTP/3 support

### Monitoring Metrics
Track these key performance indicators:
- FPS stability (target: 60fps on mid-range devices)
- Battery drain rate (target: <5% per hour during gameplay)
- Load time (target: <3s on 4G)
- Crash rate (target: <0.5%)
- PWA install conversion rate (target: >30%)

## Troubleshooting

### Common Issues
| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| App crashes on startup | WebGL not supported | Check WebGL2 support, fallback to 2D mode |
| Touch controls unresponsive | Touch event handling | Verify 48px minimum touch target, check for CSS interference |
| Battery drain excessive | High CPU/GPU usage | Check performance monitor throttling, verify asset loading |
| PWA not installing | Manifest/service worker issues | Validate manifest, check service worker registration |
| FPS drops on mid-range devices | Insufficient optimization | Verify mobile optimization modules are active |

### Debugging Tools
- Chrome DevTools: Device Mode, Network Throttling, Battery Status
- Performance Monitor: View FPS, draw calls, memory usage
- Battery API: Check battery level and charging status
- Lighthouse: Audit PWA compliance and performance

## Deployment Checklist
- [ ] All mobile optimization modules imported and initialized
- [ ] PWA manifest.json valid and complete
- [ ] Service worker (sw.js) registered and active
- [ ] Production build generated and tested
- [ ] Offline functionality verified
- [ ] Mobile device testing completed across target devices
- [ ] Monitoring metrics configured and active