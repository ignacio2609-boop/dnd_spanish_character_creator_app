<script setup lang="ts">

defineProps({
  label: {
    type: String,
    default: 'Click Me'
  }});
</script>

<template>
  <div class="card flex justify-center">
    <Button :label="label" />
  </div>
</template>

<style scoped></style>
