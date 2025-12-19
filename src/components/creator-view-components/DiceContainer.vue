<script setup lang="ts">
import InteractiveGridPattern from '@/components/inspira_ui/InteractiveGridPattern.vue';
</script>

<template>
  <div class="flex relative w-full h-full rounded-4xl">
    <InteractiveGridPattern
      :class="'[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]'"
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
    />
    <div id="dice-box-container" class="flex h-70 z-10" />
  </div>
</template>

<style scoped></style>
