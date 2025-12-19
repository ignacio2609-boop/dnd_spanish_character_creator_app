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
      targets: [{ src: 'node_modules/@3d-dice/dice-box/dist/assets/*', dest: 'assets/dice-box' }],
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
