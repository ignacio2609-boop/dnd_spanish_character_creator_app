<script setup lang="ts">
import CharacterCreatorForm from '@/components/creator-view-components/CharacterCreatorForm.vue';
import DiceContainer from '@/components/creator-view-components/DiceContainer.vue';
import {
  destroyDiceBox,
  rollDiceWithExpression,
} from '@/composables/fantasticDiceConfig.ts';
import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
  try {
    await destroyDiceBox();
  } catch (error) {
    globalThis.console.error('Error al inicializar DiceBox:', error);
  }
});

const initAndRollDice = async () => {
  try {
    await rollDiceWithExpression(['1d20', '2d6']);
  } catch (error) {
    globalThis.console.error('Error al inicializar DiceBox:', error);
  }
};
</script>

<template>
  <div id="creator-view" class="flex flex-1 py-8 px-4">
    <div class="flex w-full gap-4">
      <div class="flex flex-col min-w-2/3">
        <h1>Creador de personajes D&D</h1>
        <p class="text-lg text-gray-600">
          Bienvenido al creador de personajes para Dungeons & Dragons. Aquí podrás crear y
          personalizar tus propios personajes para tus aventuras.
        </p>
        <CharacterCreatorForm @use-roll-dice="initAndRollDice" />
      </div>
      <div class="flex flex-col w-full gap-1">
        <div class="flex h-full w-full rounded-4xl p-2 inspira-theme">
          <DiceContainer />
        </div>
        <div class="flex h-full w-full rounded-4xl p-2"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
