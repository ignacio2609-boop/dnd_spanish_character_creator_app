import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import type { App } from 'vue'
import Button from 'primevue/button'

export const primeVueConfig = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
  });
  app.component('Button', Button);
};
