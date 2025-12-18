<script setup lang="ts">
import { ref } from 'vue';
import LoadingApp from '@/components/UI/LoadingApp.vue';

const isLoading = ref(false);
</script>

<template>
  <div id="app">
    <LoadingApp v-if="isLoading" />
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
