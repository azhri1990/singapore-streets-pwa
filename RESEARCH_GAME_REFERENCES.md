# Game Reference Structure & Build Analysis — 2026
Deep research into Android game architecture, build systems, and reusable patterns from 2026 repos.

## Executive Summary
Three reference projects were studied in detail:
1. **FrostFrontend** (Frostie77) — Reusable Android gaming settings UI library (MIT)
2. **Skull-Kid** (Frostie77) — Native Android port of brutal Flash action game (Ruffle)
3. **libfdx** (libfdx) — Modular Java game framework with Vulkan/WebGPU/Metal backends (Apache 2.0)

Each represents a different layer of the Android game stack: **frontend/settings UI**, **native port/emulation**, and **full engine framework**.

---

## 1. FrostFrontend — Reusable Android Gaming Settings Frontend
**Repo:** https://github.com/Frostie77/FrostFrontend
**Language:** Java | **License:** MIT | **Size:** 230 KB | **Updated:** 2026-11-06

### Purpose
A drop-in Android library for game ports that need a consistent settings menu without building one from scratch. Designed to work **independent of game engine** — the host game provides gameplay, FrostFrontend provides the settings UI and utilities.

### Architecture (Java classes)
```
io.github.frostfrontend/
├── FrostFrontendView.java    (39,671 bytes) — Main settings view with 5 tabs
├── FrostControlProfile.java  (2,918 bytes)  — Game-defined action→button mappings
├── FrostButtonMapper.java    (6,280 bytes)  — Button reassignment + persistence
├── FrostTouchControls.java   (8,074 bytes)  — Touch layout editing/persistence
├── FrostSpeakerTest.java     (5,110 bytes)  — Native stereo speaker test
└── (test) FrostTouchLayoutTest.java (7,524 bytes) — Layout regression tests
```

### Five Settings Sections (FrostFrontendView)
1. **Graphics** — Host game supplies its own graphics options
2. **Sound** — Includes native left→right→both speaker test
3. **Controls** — Controller mapping via FrostControlProfile/FrostButtonMapper
4. **Touch Settings** — Drag-and-drop touch layout editor with persistence
5. **Updates** — Check for updates (host provides update-checking logic)

### Key Design Patterns
- **Controller + Touchscreen navigation** — Full D-pad/stick navigation of all menus
- **Persistent touch layouts** — Saved to SharedPreferences, positions scale with viewport, mirror support
- **Editor isolation** — Editor gestures never reach gameplay input handler; preserves gameplay pause state
- **Restore-on-close** — Restores original parent, order, layout parameters, and visibility when editing ends
- **Host integration** — `frontend.setTouchControls(touchControls)`, `frontend.handleKeyEvent()`, `frontend.back()`

### Touch Layout System (FrostTouchControls)
- Subclass with stable profile ID + control IDs
- `computeLayout()` — position each control via `positionControl(index, defaultX, defaultY, visibleRadius, hitRadius)`
- `setLayoutMirrored(...)` — for side-swap
- `drawControls()`, `onGameplayTouch()`, `releaseGameKeys()`
- Base class handles: editing, persistence, bounds checking, pointer ownership, releasing inputs when editing starts
- **Save/Cancel/Reset** — Reset is preview until saved; Back/B cancels, Start saves

### Build
- Gradle 8.11.1, Java 17, Android SDK 35
- `gradle :frostfrontend:testDebugUnitTest :demo:assembleDebug :demo:assembleRelease`
- Standalone demo (DemoActivity + DemoTouchControls) validates integration
- CI: `.github/workflows/android.yml`

### Validated Integrations
- Arcane: The Armor Collector Android (original)
- Dad 'n Me Android (v0.1.1, tested on AYN Odin 2 Portal)

---

## 2. Skull-Kid — Native Android Port of Brutal Flash Action Game
**Repo:** https://github.com/Frostie77/Skull-Kid
**Language:** Java | **License:** Other | **Size:** 480 KB | **Updated:** 2026-11-05

### Purpose
Unofficial Android port of the 2002 Flash game "the skullkid" by korded (Chance Banning). Demonstrates how to wrap a Flash game in a native Android app with controller/touch support and FrostFrontend settings.

### Architecture
```
app/src/main/
├── AndroidManifest.xml
├── assets/www/
│   ├── index.html        — Hosts Ruffle Flash emulator + SWF
│   └── ruffle/           — Ruffle web bundle (gitkeep placeholder)
└── java/io/github/frostie77/skullkid/
    ├── MainActivity.java              (34,863 bytes) — Main activity, Ruffle integration
    ├── SkullKidTouchControls.java     (11,154 bytes) — Touch joystick/D-pad
    ├── SkullKidBossDiagnostics.java   (6,010 bytes)  — Boss fight diagnostics
    └── SkullKidUpdates.java           (10,755 bytes) — Update checker
```

### Key Technical Patterns
- **WebView-based Ruffle integration** — Flash content served via `assets/www/index.html`, Ruffle JS emulator runs in WebView
- **SWF import flow** — User selects SWF file (remembered across sessions), NOT bundled in APK
- **FrostFrontend submodule** — Git submodule at `third_party/FrostFrontend`
- **Controller support** — Remappable USE action, D-pad/left stick movement
- **Touch controls** — Joystick or D-pad, adjustable, with position persistence
- **Display modes** — Original proportions or stretch-to-fill
- **Update system** — GitHub release page verification, persistent settings

### MainActivity.java Structure (34KB — the core)
- WebView setup with Ruffle loader
- SWF file import/persistence via SharedPreferences
- FrostFrontend integration (menu open, key event handling)
- Controller input mapping (gamepad API)
- Touch control overlay management
- Lifecycle handling (pause/resume preserving game state)

### Build System
- `.github/workflows/android-debug.yml` — CI for debug APK
- `build-public-release.ps1` (11,397 bytes) — Public release build script
- `build-test.ps1` (4,231 bytes) — Test build script
- `updates/android-stable.json` — Update manifest
- `tests/test_updates.py` — Update system tests

### SWF Import Flow (Critical Pattern)
1. App launches → check for stored SWF path
2. If none → "Select SWF File" button → Storage Access Framework
3. File copied to app private storage, path persisted
4. Ruffle loads SWF in WebView with game context
5. Touch controls + FrostFrontend overlay on top

---

## 3. libfdx — Modular Java Game Framework
**Repo:** https://github.com/libfdx/libfdx
**Language:** Java | **License:** Apache 2.0 | **Stars:** 15 | **Updated:** 2026-11-09

### Purpose
Modular Java game framework for Web, Mobile (Android/iOS), and Desktop. Supports Vulkan, WebGPU, Metal, DirectX, OpenGL backends. Inspired by libGDX but a new framework, not a fork.

### Architecture (4-Layer Separation)
```
1. Framework modules — portable runtime, graphics, asset, 2D, 3D, UI APIs
2. Extensions — optional providers and features (jBox2D, jImGui, etc.)
3. Backends — connect runtime to desktop/web/Android/native platforms
4. Launchers — select backend/provider stack per application
```

### Core API Pattern
```java
public final class MyGame extends ApplicationAdapter {
    private Fdx fdx;
    @Override public void create(Fdx fdx) { this.fdx = fdx; }
    @Override public void render() {
        float deltaTime = fdx.app().deltaTime();
        // Application-owned state update + render
    }
}
```

### Key Design Principles (from AGENTS.md)
- **Typed runtime root** — `Fdx` is finite, typed, backend-owned
- **Explicit ownership** — Application-owned assets, batches, UI roots, state stay explicit (not global services)
- **Provider escape hatches** — `as()` for provider-specific access
- **No steady-state allocation** — Prefer primitives and reusable storage in frame/render/input loops
- **Architecture guardrails** — Portable modules don't depend on providers/backends; backends own lifecycle; providers implement optional capabilities

### Directory Structure
```
libfdx/
├── libfdx/           — Core framework modules
├── samples/          — 2D/3D samples (sprite-movement, shader-graph, etc.)
├── benchmark/        — Performance benchmarks
├── tests/            — Executable tests
├── data/             — Shared assets
├── docs/             — ARCHITECTURE.md, COMMON_API.md, SHADERS.md, UI_KIT.md
└── build.gradle.kts  — Root Gradle config
```

### Platform Backends
- Desktop (JVM + OpenGL)
- Web (HTML5/WebGPU)
- Android
- Native (via JNI)

### Graphics Providers
- Vulkan, WebGPU, Metal, DirectX, OpenGL
- Shader authoring in WGSL, translated per-provider

---

## Comparative Analysis

| Aspect | FrostFrontend | Skull-Kid | libfdx |
|--------|--------------|-----------|--------|
| **Layer** | Settings UI library | Game port (app) | Full engine |
| **Language** | Java | Java | Java |
| **Engine dependency** | None (host-agnostic) | Ruffle (Flash) | Self-contained |
| **Target** | Any Android game port | Flash game port | New game development |
| **Reusability** | High (library) | Medium (port pattern) | High (framework) |
| **Controller support** | Built-in | Built-in | Via backends |
| **Touch settings** | Drag-drop editor | Joystick/D-pad | Via UI module |
| **Update system** | Updates tab (host impl) | Full update checker | N/A |
| **Graphics backends** | N/A | Ruffle (Flash) | Vulkan/WebGPU/Metal/DX/GL |
| **Build system** | Gradle 8.11.1 | Gradle + PowerShell | Gradle (Kotlin DSL) |
| **CI** | GitHub Actions | GitHub Actions + PS scripts | GitHub Actions |
| **License** | MIT | Other | Apache 2.0 |
| **Production ready** | Yes | Yes | Early stage |

---

## Patterns Applicable to Singapore Streets PWA

### 1. FrostFrontend Pattern (Settings UI)
- **Adopt:** 5-tab settings structure (Graphics, Sound, Controls, Touch, Updates)
- **Adopt:** Controller profile with remappable actions + persistence
- **Adopt:** Touch layout editor with drag-drop, save/cancel/reset
- **Adopt:** Speaker test pattern (left→right→both)
- **Implement:** As web-based settings overlay in PWA (HTML/CSS/JS equivalent)

### 2. Skull-Kid Pattern (Native Port + Ruffle)
- **Adopt:** WebView-based Ruffle integration for Flash content
- **Adopt:** SWF import flow (user selects file, persisted, not bundled)
- **Adopt:** Touch overlay with joystick/D-pad + adjustable position
- **Adopt:** FrostFrontend-style settings menu in WebView
- **Adopt:** Update checker with GitHub release verification
- **Consider:** For future Flash-compatible content on Android

### 3. libfdx Pattern (Modular Engine Architecture)
- **Adopt:** 4-layer separation (modules → extensions → backends → launchers)
- **Adopt:** Typed `Fdx`-style runtime root (finite, backend-owned)
- **Adopt:** Explicit ownership (no global services for assets/batches/UI)
- **Adopt:** Provider escape hatches via `as()` pattern
- **Adopt:** No steady-state allocation in frame/render/input loops
- **Adopt:** Architecture guardrails (portable modules don't depend on providers)
- **Consider:** For future native Android wrapper around PWA

### 4. Build System Patterns
- **Adopt:** GitHub Actions CI for Android APK generation
- **Adopt:** PowerShell build scripts for local release builds
- **Adopt:** Gradle with explicit Java version pinning (17)
- **Adopt:** Update manifest JSON for OTA updates
- **Adopt:** SharedPreferences-style persistence for settings/layouts

### 5. Architecture Guardrails (from libfdx AGENTS.md)
- Portable modules don't depend on providers/backends
- Backends own runtime lifecycle and platform integration
- Runtime root stays finite and typed
- Application-owned state stays explicit
- Provider-specific access via explicit identity and `as()`
- Clear ownership/disposal/nullability/callback/thread/frame-lifetime at API boundaries

---

## Implementation Roadmap for Singapore Streets

### Phase 1: Settings Frontend (FrostFrontend pattern)
- [ ] Create web-based settings overlay with 5 tabs
- [ ] Implement controller remapping with localStorage persistence
- [ ] Build touch layout editor (drag-drop, save/cancel/reset)
- [ ] Add speaker test utility
- [ ] Add update checker (PWA version check)

### Phase 2: Touch Controls (Skull-Kid pattern)
- [ ] Implement joystick/D-pad overlay for mobile
- [ ] Add position persistence across sessions
- [ ] Add adjustable opacity/size
- [ ] Add mirror mode for left-handed users

### Phase 3: Engine Architecture (libfdx pattern)
- [ ] Refactor to 4-layer separation (core → extensions → platform → entry)
- [ ] Implement typed runtime root
- [ ] Remove global services, make state explicit
- [ ] Add provider abstraction layer
- [ ] Audit frame/render/input loops for allocations

### Phase 4: Build & CI
- [ ] Add GitHub Actions workflow for APK generation
- [ ] Add PowerShell build scripts for local releases
- [ ] Add update manifest JSON
- [ ] Pin Java/Gradle versions

---

## Sources
- FrostFrontend: https://github.com/Frostie77/FrostFrontend
- Skull-Kid: https://github.com/Frostie77/Skull-Kid
- libfdx: https://github.com/libfdx/libfdx
- Ruffle: https://ruffle.rs/
- libfdx Architecture: https://github.com/libfdx/libfdx/blob/master/docs/ARCHITECTURE.md
- libfdx Common API: https://github.com/libfdx/libfdx/blob/master/docs/COMMON_API.md