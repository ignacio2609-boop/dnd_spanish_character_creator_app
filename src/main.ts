import '@/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura';

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(PrimeVue)
app.use(router)
app.use(createPinia())

app.mount('#app')
