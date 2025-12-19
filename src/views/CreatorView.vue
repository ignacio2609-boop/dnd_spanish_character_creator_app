<script setup lang="ts">
import CharacterCreatorForm from '@/components/creator-view-components/CharacterCreatorForm.vue';
import DiceContainer from '@/components/creator-view-components/DiceContainer.vue';
import {
  destroyDiceBox,
  rollDiceWithExpression,
} from '@/composables/fantasticDiceConfig.ts';
import { onBeforeMount } from 'vue';

onBeforeMount(async () => {
  try {
    await destroyDiceBox();
  } catch (error) {
    globalThis.console.error('Error al inicializar DiceBox:', error);
  }
});

const initAndRollDice = async () => {
  try {
    await rollDiceWithExpression(['4d6']);
  } catch (error) {
    globalThis.console.error('Error al inicializar DiceBox:', error);
  }
};
</script>

<template>
  <div id="creator-view" class="flex flex-1 w-full bg-gradient-to-br from-surface-50/50 via-surface-0/30 to-surface-100/40 dark:from-surface-950/50 dark:via-surface-900/30 dark:to-surface-950/40 rounded-4xl">
    <div class="flex flex-col lg:flex-row w-full gap-6 p-4 lg:p-8">
      <!-- Sección principal del formulario -->
      <div class="flex flex-col flex-1 gap-4">
        <!-- Header con diseño mejorado y más compacto -->
        <div class="flex flex-col gap-3 p-4 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-xl border border-primary-200 dark:border-primary-800">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-lg shadow-md">
                <i class="pi pi-users text-2xl text-white"></i>
              </div>
              <div class="flex flex-col">
                <h1 class="text-2xl lg:text-3xl font-bold text-primary-900 dark:text-primary-50">
                  Creador de Personajes D&D
                </h1>
                <p class="text-xs text-primary-700 dark:text-primary-300 font-medium">
                  Dungeons & Dragons 5ª Edición
                </p>
              </div>
            </div>

            <!-- Características destacadas - Solo íconos en desktop -->
            <div class="hidden lg:flex items-center gap-2">
              <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm">
                <i class="pi pi-check-circle text-green-600 dark:text-green-400 text-xs"></i>
                <span class="text-xs font-semibold text-primary-900 dark:text-primary-50">PDF</span>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm">
                <i class="pi pi-sync text-blue-600 dark:text-blue-400 text-xs"></i>
                <span class="text-xs font-semibold text-primary-900 dark:text-primary-50">Dados 3D</span>
              </div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white/50 dark:bg-black/20 rounded-full backdrop-blur-sm">
                <i class="pi pi-calculator text-purple-600 dark:text-purple-400 text-xs"></i>
                <span class="text-xs font-semibold text-primary-900 dark:text-primary-50">Auto</span>
              </div>
            </div>
          </div>

          <!-- Descripción más breve -->
          <p class="text-sm text-primary-800 dark:text-primary-200 leading-snug">
            Crea y personaliza tu personaje paso a paso. ¡Tu aventura comienza aquí!
          </p>
        </div>

        <!-- Formulario -->
        <CharacterCreatorForm @use-roll-dice="initAndRollDice" />
      </div>

      <!-- Sección del DiceBox - Sidebar -->
      <div class="flex flex-col gap-4 w-full lg:w-96 lg:sticky lg:top-4 lg:self-start">
        <!-- Título del DiceBox -->
        <div class="flex items-center gap-3 px-4 py-3 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800">
          <div class="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-lg">
            <i class="pi pi-circle text-xl text-white"></i>
          </div>
          <div class="flex flex-col">
            <h3 class="text-lg font-bold text-surface-900 dark:text-surface-50">
              Mesa de Dados
            </h3>
            <p class="text-xs text-surface-600 dark:text-surface-400">
              Física 3D en tiempo real
            </p>
          </div>
        </div>

        <!-- Contenedor del DiceBox con diseño mejorado -->
        <div class="relative flex flex-col gap-3 p-4 bg-surface-50 dark:bg-surface-900 rounded-2xl border-2 border-surface-200 dark:border-surface-800 shadow-xl">
          <!-- Indicador de interactividad -->
          <div class="flex items-center justify-between px-3 py-2 bg-primary-100 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm font-semibold text-primary-900 dark:text-primary-50">
                Sistema activo
              </span>
            </div>
            <span class="text-xs text-primary-700 dark:text-primary-300">
              Listo para tirar
            </span>
          </div>

          <!-- DiceBox Container -->
          <div class="relative aspect-video w-full min-h-[300px] lg:min-h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-950 dark:to-surface-900 shadow-inner">
            <div class="absolute inset-0 inspira-theme">
              <DiceContainer />
            </div>
          </div>

          <!-- Info adicional -->
          <div class="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
            <i class="pi pi-info-circle text-blue-600 dark:text-blue-400 text-sm mt-0.5"></i>
            <p class="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
              Usa el botón <strong>"Tirar 4d6"</strong> en la sección de estadísticas para ver los dados en acción.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animación para el pulso del indicador */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Asegurar que el sticky funcione correctamente */
#creator-view {
  min-height: 100vh;
}

/* Scroll suave en el sidebar */
@media (min-width: 1024px) {
  .lg\:sticky {
    position: sticky;
    max-height: calc(100vh - 2rem);
  }
}
</style>
