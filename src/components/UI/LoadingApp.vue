<script setup lang="ts">
// Definimos props para hacer el componente reutilizable
interface Props {
  text?: string;
  color?: string;
}

// Valores por defecto
withDefaults(defineProps<Props>(), {
  text: 'Cargando aplicación...',
  color: 'text-white', // Color base para texto y spinner
});
</script>

<template>
  <div
    id="loading-component"
    class="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/50 backdrop-blur-sm transition-opacity"
  >
    <div
      class="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mb-4"
      :class="[color, `border-${color}`]"
      style="border-right-color: currentColor; border-top-color: transparent"
    ></div>

    <p :class="['font-medium text-lg animate-pulse', color]">
      {{ text }}
    </p>
  </div>
</template>

<style scoped></style>
