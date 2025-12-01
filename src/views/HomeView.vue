<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue'
import InteractiveGridPattern from '@/components/inspira_ui/InteractiveGridPattern.vue'
import StarsBackground from '@/components/inspira_ui/StarsBackground.vue'
import { initDiceBox, rollDice } from '@/composables/fantasticDiceConfig.ts'
import { onMounted } from 'vue'

onMounted(() => {
  initDiceBox()
})

const useRollDice = () => {
  rollDice()
};
</script>

<template>
  <div>
    <h1>You did it!</h1>
    <p class="text-2xl font-bold text-gray-700">
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
    <PrimeButton @click=useRollDice />
    <div class="inspira-theme relative grid h-[500px] place-content-center">
      <InteractiveGridPattern
        :class="'[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]'"
        :width="20"
        :height="20"
        :squares="[80, 80]"
        squares-class-name="hover:fill-blue-500"
      />
    </div>
    <!--    <div-->
    <!--      class="inspira-theme relative h-96 w-full border border-zinc-800 rounded-xl overflow-clip flex flex-col items-center justify-center gap-4"-->
    <!--    >-->
    <!--      <StarsBackground-->
    <!--        :factor="0.05"-->
    <!--        :speed="50"-->
    <!--        star-color="#fff"-->
    <!--      />-->
    <!--    </div>-->
    <div id="dice-box-container" />
  </div>
</template>

<style scoped></style>
