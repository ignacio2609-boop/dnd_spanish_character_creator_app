<script setup lang="ts">
import PrimeButton from '@/components/prime_vue/PrimeButton.vue';
import router from '@/router/router.ts';

const goToTestField = () => {
  router.push('/test-field');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <h1>You did it!</h1>
    <p class="text-2xl font-bold text-gray-700">Estás en Home</p>
    <PrimeButton label="Go to Test Field" @click="goToTestField()" />
  </div>
</template>

<style scoped></style>
