<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue';
import mainIcon from '@/assets/main_icon.svg';

const emit = defineEmits(['show-drawer']);

const showDrawer = () => {
  emit('show-drawer');
};
</script>

<template>
  <header>
    <nav class="relative w-full flex items-center justify-between p-4 lg:px-8 h-16">
      <PrimeButton
        label="☰"
        text
        rounded
        class="z-10 text-gray-700 !p-0 !w-10 !h-10"
        @click="showDrawer()"
      />

      <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <a href="/home" class="block">
          <span class="sr-only">Your Company</span>
          <img class="h-12 w-auto" :src="mainIcon" alt="Imagen header" />
        </a>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
