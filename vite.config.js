import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          physics: ['cannon-es'],
          animation: ['gsap'],
          bvh: ['three-mesh-bvh'],
          pathtracer: ['three-gpu-pathtracer'],
          core: [
            './src/core/GameLoop.js',
            './src/core/Input.js',
            './src/core/AssetManager.js',
            './src/core/Fdx.js',
          ],
          combat: [
            './src/combat/CombatSystem.js',
            './src/systems/CombatStylesSystem.js',
          ],
          systems: [
            './src/systems/EnhancedWantedSystem.js',
            './src/systems/NPCLivingWorldSystem.js',
            './src/systems/DisguiseStealthSystem.js',
            './src/systems/SmartNationHackingSystem.js',
          ],
          controls: [
            './src/controls/DesktopControls.js',
            './src/improvements/ControllerSupport.js',
          ],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['three', 'cannon-es', 'gsap', 'three-mesh-bvh'],
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
})
