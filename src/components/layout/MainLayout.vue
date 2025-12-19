<script setup lang="ts">
// import { ref } from 'vue';
import Header from '@/components/layout/Header.vue';
// import SideMenu from '@/components/layout/SideMenu.vue'; // Deshabilitado temporalmente
import Footer from '@/components/layout/Footer.vue';

// const isDrawerVisible = ref(false);

// const toggleDrawer = () => {
//   isDrawerVisible.value = !isDrawerVisible.value;
// };
</script>

<template>
  <div class="flex flex-col min-h-screen relative">
    <Header />

    <!-- <SideMenu v-model:visible="isDrawerVisible" /> Deshabilitado temporalmente -->

    <main class="flex flex-1 mx-4 my-8">
      <router-view v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Transición opcional para las páginas internas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
