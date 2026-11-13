import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { compression } from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 8192,
      verbose: true,
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 8192,
      verbose: true,
    }),
    visualizer({
      filename: './dist/visualizer.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  build: {
    target: 'es2022',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      output: {
        manualChunks: {
          // Split Three.js from game logic for better caching
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
            './src/combat/CombatStylesSystem.js',
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
    chunkSizeWarningLimit: 1000, // 1000 KB per chunk
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
  resolve: {
    alias: {
      // Ensure consistent module resolution
      'three/': 'node_modules/three/',
    },
  },
})