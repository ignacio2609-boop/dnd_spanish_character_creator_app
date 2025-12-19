<script setup lang="ts">
import InteractiveGridPattern from '@/components/inspira_ui/InteractiveGridPattern.vue';
</script>

<template>
  <div
    class="inspira-theme w-full h-full relative grid place-content-center rounded-4xl overflow-clip"
  >
    <div id="dice-box-container" class="flex z-10 w-full" />
    <InteractiveGridPattern
      :class="'[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]'"
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
    />
  </div>
</template>

<style scoped></style>
