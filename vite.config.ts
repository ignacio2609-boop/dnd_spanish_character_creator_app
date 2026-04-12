import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import MotionResolver from 'motion-v/resolver';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(), // Desactivado para no mostrar las DevTools
    tailwindcss(),
    viteStaticCopy({
      // DiceBox resuelve archivos relativos a `assetPath: '/assets/dice-box/'`.
      // Por eso necesitamos publicar exactamente:
      // - /assets/dice-box/ammo/ammo.wasm.wasm
      // - /assets/dice-box/themes/default/*
      targets: [
        {
          // Mantiene la ruta final esperada por Ammo.js
          src: 'node_modules/@3d-dice/dice-box/dist/assets/ammo/**/*',
          dest: 'assets/dice-box/ammo',
          // Evita anidar `node_modules/...` en la salida
          rename: { stripBase: true },
        },
        {
          // El tema por defecto debe vivir bajo `themes/default`
          src: 'node_modules/@3d-dice/dice-box/dist/assets/themes/default/**/*',
          dest: 'assets/dice-box/themes/default',
          rename: { stripBase: true },
        },
      ],
    }),
    Components({
      resolvers: [PrimeVueResolver(), MotionResolver()],
    }),
  ],
  build: {
    // DiceBox incluye binarios JS muy pesados (world.offscreen/Dice).
    // Los separamos en chunk propio y elevamos el warning para evitar ruido.
    chunkSizeWarningLimit: 1600,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@3d-dice/dice-box/dist/world.offscreen')) {
            return 'dice-world-offscreen';
          }
          if (id.includes('@3d-dice/dice-box/dist/world.onscreen')) {
            return 'dice-world-onscreen';
          }
          if (id.includes('@3d-dice/dice-box/dist/Dice')) {
            return 'dice-engine';
          }
          if (id.includes('@3d-dice/dice-box') || id.includes('@3d-dice/dice-ui')) {
            return 'dice-core';
          }
          if (id.includes('primevue') || id.includes('@primeuix')) {
            return 'primevue';
          }
          if (id.includes('vue-router')) {
            return 'router';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
