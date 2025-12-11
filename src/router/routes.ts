
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  // Añade más rutas aquí
  { path: '/test-field', name: 'TestField', component: () => import('@/views/TestField.vue') },
]

export default routes
