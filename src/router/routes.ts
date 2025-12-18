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
      {
        path: 'explicamelus',
        name: 'Explicamelus',
        component: () => import('@/views/InformationView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/CreditsView.vue'),
      },
      {
        path: 'character-creator',
        name: 'CharacterCreator',
        component: () => import('@/views/CreatorView.vue'),
      },
    ],
  },
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
