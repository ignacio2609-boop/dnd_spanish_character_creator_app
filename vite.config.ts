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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
