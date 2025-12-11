<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import SideMenu from '@/components/layout/SideMenu.vue'
import Footer from '@/components/layout/Footer.vue'
import { ref } from 'vue'

const isDrawerVisible = ref(false);

const toggleDrawer = () => {
  isDrawerVisible.value = !isDrawerVisible.value;
};

</script>

<template>
  <div class="min-h-full">
    <Header @show-drawer="toggleDrawer()" />
    <SideMenu :visible="isDrawerVisible" />
    <Footer />
  </div>
</template>

<style scoped></style>
