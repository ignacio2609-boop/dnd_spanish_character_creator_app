import '@/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
import router from '@/router'

app.use(router)
app.use(createPinia())

app.mount('#app')
