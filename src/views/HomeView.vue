<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue'
import router from '@/router'

const goToTestField = () => {
  router.push('/test-field')
}
</script>

<template>
  <div>
    <h1>You did it!</h1>
    <p class="text-2xl font-bold text-gray-700">
      Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
      documentation
    </p>
    <PrimeButton @click="goToTestField()" label="Go to Test Field" />
  </div>
</template>

<style scoped></style>
