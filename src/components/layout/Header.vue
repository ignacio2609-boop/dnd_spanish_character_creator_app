<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue'

const emit = defineEmits(['show-drawer'])

const showDrawer = () => {
  emit('show-drawer')
}
</script>

<template>
  <header>
    <nav class="w-full flex flex-col items-center p-6 lg:px-8">
      <div class="place-self-center">
        <a href="#">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Imagen header"
          />
        </a>
      </div>
      <PrimeButton @click="showDrawer()" label="☰" class="place-self-start" />
    </nav>
  </header>
</template>

<style scoped></style>
