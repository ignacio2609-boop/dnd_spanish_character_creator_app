<script setup lang="ts">
/* eslint-disable no-undef */
import InteractiveGridPattern from '@/components/inspira_ui/InteractiveGridPattern.vue';
import { onMounted, onBeforeUnmount } from 'vue';

// Función para ajustar el canvas al contenedor
const adjustCanvas = () => {
  const container = document.getElementById('dice-box-container');
  const canvas = container?.querySelector('canvas');

  if (container && canvas) {
    // Forzar el tamaño del canvas al tamaño del contenedor
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.maxWidth = '100%';
    canvas.style.maxHeight = '100%';
    canvas.style.objectFit = 'contain';
    canvas.style.display = 'block';
  }
};

// Observer para detectar cuando se crea el canvas
let observer: MutationObserver | null = null;

onMounted(() => {
  const container = document.getElementById('dice-box-container');

  if (container) {
    // Observer para detectar cuando DiceBox añade el canvas
    observer = new MutationObserver(() => {
      adjustCanvas();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
    });

    // Ajustar al cambiar el tamaño de la ventana
    window.addEventListener('resize', adjustCanvas);

    // Ajuste inicial con delay por si el canvas ya existe
    setTimeout(adjustCanvas, 500);
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
  }
  window.removeEventListener('resize', adjustCanvas);
});
</script>

<template>
  <div class="dice-container-wrapper">
    <InteractiveGridPattern
      class="pattern-background"
      :width="20"
      :height="20"
      :squares="[80, 80]"
      squares-class-name="hover:fill-blue-500"
    />
    <div id="dice-box-container" class="dice-box-wrapper" />
  </div>
</template>

<style scoped>
.dice-container-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 0.75rem;
}

.pattern-background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  mask-image: radial-gradient(350px circle at center, white, transparent);
  -webkit-mask-image: radial-gradient(350px circle at center, white, transparent);
  pointer-events: none;
  z-index: 0;
}

.dice-box-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Estilos forzados para el canvas que DiceBox genera */
.dice-box-wrapper :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
  object-fit: contain !important;
  display: block !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
}

/* Asegurar que el contenedor del canvas también se ajuste */
.dice-box-wrapper :deep(.dice-box-canvas) {
  width: 100% !important;
  height: 100% !important;
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>
