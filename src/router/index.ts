import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  // Añade más rutas aquí
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
