<script setup lang="ts">
// Importamos los componentes de PrimeVue necesarios
import Button from 'primevue/button';
import { onMounted } from 'vue';
import { initDiceBox, rollDice } from '@/composables/fantasticDiceConfig.ts';
import router from '@/router/router.ts';

const initAndRollDice = async () => {
  try {
    const diceBox = await initDiceBox();
    if (diceBox) {
      await rollDice();
    }
  } catch (error) {
    globalThis.console.error('Error al inicializar DiceBox:', error);
  }
};

onMounted(async () => {
  await initAndRollDice();
});

const goToCreateCharacter = () => {
  router.push('/character-creator');
};
const goToAbout = () => {
  router.push('/about');
};
</script>

<template>
  <section id="home-view" class="flex flex-1 items-center justify-center overflow-hidden">
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <div id="dice-box-container" class="flex h-full place-content-center" />
      <div class="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
    </div>

    <div
      class="flex flex-col z-10 justify-center items-center max-w-4xl px-6 text-center gap-6 lg:px-8"
    >
      <h1 class="text-4xl font-extrabold text-white1 sm:text-6xl lg:text-7xl">
        Creador de <span class="text-primary-400 block sm:inline">personajes D&D.</span>
      </h1>

      <p class="flex text-lg text-white2 p-8">
        Una forma sencilla de crear tu personaje para tus partidas de Dungeons & Dragons. Diseñado
        para agilizar el proceso y permitirte concentrarte en la aventura.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
        <Button
          label="Empezar a crear"
          size="large"
          rounded
          class="font-bold w-full sm:w-auto px-8 py-4"
          @click="goToCreateCharacter()"
        />

        <Button
          label="Saber más"
          icon="pi pi-arrow-right"
          icon-pos="right"
          severity="secondary"
          variant="text"
          size="large"
          rounded
          class="text-white hover:text-primary-300 w-full sm:w-auto"
          @click="goToAbout()"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
