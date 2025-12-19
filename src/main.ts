import '@/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from '@/router/router.ts';
import { primeVueConfig } from '@/composables/primeVueConfig.ts';

// Desactivar Vue DevTools
// @ts-expect-error - __VUE_PROD_DEVTOOLS__ es una variable global de Vue
globalThis.__VUE_PROD_DEVTOOLS__ = false;

const app = createApp(App);

app.use(router);
app.use(createPinia());
primeVueConfig(app);

app.mount('#app');
