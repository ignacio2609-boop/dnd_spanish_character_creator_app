<script setup lang="ts">
import { Drawer } from 'primevue';

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

// Definimos el evento estándar para v-model
const emit = defineEmits(['update:visible']);
</script>

<template>
  <Drawer :visible="visible" header="Drawer" @update:visible="emit('update:visible', $event)">
    <p>Lorem ipsum dolor sit amet...</p>
  </Drawer>
</template>

<style scoped></style>
