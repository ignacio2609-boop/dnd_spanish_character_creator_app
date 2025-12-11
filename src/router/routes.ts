
import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'Home', component: Home },
  // Añade más rutas aquí
  { path: '/test-field', name: 'TestField', component: () => import('@/views/TestField.vue') },
  // ==================================
  // NOT FOUND - Siempre al final
  // ==================================
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'NotFound',
  //   component: () => import('@/views/NotFound.vue'),
  // },
]

export default routes
