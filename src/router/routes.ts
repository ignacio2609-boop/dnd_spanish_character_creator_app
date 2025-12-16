import type { RouteRecordRaw } from 'vue-router';
import MainLayout from '@/components/layout/MainLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/home', // Ruta vacía dentro del layout redirige a /home
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/HomeView.vue'),
      },
      { path: 'test-field', name: 'TestField', component: () => import('@/views/TestField.vue') },
    ],
  },
  // Añade más rutas aquí
  { path: '/test-field', name: 'TestField', component: () => import('@/views/TestField.vue') },
  // ==================================
  // NOT FOUND - Siempre al final
  // ==================================
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
];

export default routes;
