<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue';
import InteractiveGridPattern from '@/components/inspira_ui/InteractiveGridPattern.vue';
import StarsBackground from '@/components/inspira_ui/StarsBackground.vue';
import { initDiceBox, rollDice } from '@/composables/fantasticDiceConfig.ts';
import { onMounted, ref } from 'vue';
import Header from '@/components/layout/Header.vue';
import SideMenu from '@/components/layout/SideMenu.vue';

onMounted(() => {
  initDiceBox();
});

const useRollDice = () => {
  rollDice();
};

const isDrawerVisible = ref(false);

const toggleDrawer = () => {
  isDrawerVisible.value = !isDrawerVisible.value;
};
</script>

<template>
  <Header @show-drawer="toggleDrawer()" />
  <SideMenu :visible="isDrawerVisible" />
  <div class="flex flex-col p-4 gap-2">
    <p class="text-6xl font-bold text-gray-700 place-self-center m-8">
      Bienveniedo al campo de pruebas
    </p>
    <p class="text-2xl font-bold text-gray-700 place-self-center mb-4">
      Este sitio está reservado para probar componentes y funcionalidades
    </p>
    <PrimeButton @click="useRollDice" />
    <div class="inspira-theme relative grid h-[500px] place-content-center">
      <InteractiveGridPattern
        :class="'[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]'"
        :width="20"
        :height="20"
        :squares="[80, 80]"
        squares-class-name="hover:fill-blue-500"
      />
    </div>
    <div id="dice-box-container" />
    <div
      class="inspira-theme relative h-96 w-full border border-zinc-800 rounded-xl overflow-clip flex flex-col items-center justify-center gap-4"
    >
      <StarsBackground :factor="0.05" :speed="50" star-color="#fff" />
    </div>
  </div>
</template>

<style scoped></style>
