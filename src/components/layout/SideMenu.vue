<script setup lang="ts">
import { Drawer } from 'primevue'
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<template>

    <Drawer :visible="visible" header="Drawer">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </Drawer>
</template>

<style scoped></style>
