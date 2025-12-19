<script setup lang="ts">
interface Credit {
  title: string;
  description: string;
  link: string;
  linkText: string;
  icon?: string;
}

const resourceCredits: Credit[] = [
  {
    title: 'Icons8',
    description: 'Icono de Rompecabezas utilizado en la aplicación',
    link: 'https://icons8.com/icon/RnjhYDd5afIN/puzzle',
    linkText: 'Rompecabezas por Icons8',
    icon: 'pi-image',
  },
  {
    title: 'Game-Icons.net',
    description: 'Icono "Gift of Knowledge" por Lorc',
    link: 'https://game-icons.net/1x1/lorc/gift-of-knowledge.html',
    linkText: 'Gift of Knowledge por Lorc',
    icon: 'pi-gift',
  },
];

const techStack = [
  { name: 'Vue.js 3', description: 'Framework JavaScript progresivo', icon: 'pi-code' },
  { name: 'TypeScript', description: 'Tipado estático para JavaScript', icon: 'pi-file-edit' },
  { name: 'Tailwind CSS', description: 'Framework CSS utility-first', icon: 'pi-palette' },
  { name: 'PrimeVue', description: 'Biblioteca de componentes UI', icon: 'pi-sparkles' },
  { name: 'Pinia', description: 'Gestión de estado para Vue', icon: 'pi-database' },
  { name: 'Vite', description: 'Build tool rápido y moderno', icon: 'pi-bolt' },
  { name: 'pdf-lib', description: 'Generación y edición de PDFs', icon: 'pi-file-pdf' },
  { name: '@3d-dice/dice-box', description: 'Motor de física 3D para dados', icon: 'pi-sync' },
];
</script>

<template>
  <div class="flex flex-col gap-8 max-w-6xl mx-auto">
    <!-- Hero Section -->
    <div class="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900 rounded-2xl border-2 border-primary-200 dark:border-primary-800">
      <div class="flex items-center justify-center w-20 h-20 bg-primary-500 rounded-full">
        <i class="pi pi-heart-fill text-4xl text-white"></i>
      </div>

      <h1 class="text-4xl font-extrabold text-center text-primary-900 dark:text-primary-50">
        Créditos y Agradecimientos
      </h1>

      <p class="text-lg text-center text-primary-800 dark:text-primary-200 max-w-2xl">
        Esta aplicación ha sido posible gracias al trabajo de increíbles desarrolladores, diseñadores
        y comunidades de código abierto.
      </p>
    </div>

    <!-- Recursos y Atribuciones -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <i class="pi pi-image text-2xl text-primary-500"></i>
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
          Recursos y Atribuciones
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="credit in resourceCredits"
          :key="credit.title"
          class="flex flex-col gap-3 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 hover:border-primary-500 dark:hover:border-primary-400 transition-all"
        >
          <div class="flex items-center gap-3">
            <i :class="['pi', credit.icon, 'text-xl text-primary-500']"></i>
            <h3 class="text-xl font-bold text-surface-900 dark:text-surface-50">
              {{ credit.title }}
            </h3>
          </div>

          <p class="text-surface-700 dark:text-surface-300">
            {{ credit.description }}
          </p>

          <a
            :href="credit.link"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
          >
            <span>{{ credit.linkText }}</span>
            <i class="pi pi-external-link text-sm"></i>
          </a>
        </div>
      </div>
    </section>

    <!-- Stack Tecnológico -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <i class="pi pi-code text-2xl text-primary-500"></i>
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
          Stack Tecnológico
        </h2>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="tech in techStack"
          :key="tech.name"
          class="flex flex-col gap-2 p-4 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800 hover:scale-105 transition-transform"
        >
          <div class="flex items-center gap-2">
            <i :class="['pi', tech.icon, 'text-lg text-primary-500']"></i>
            <h4 class="font-bold text-surface-900 dark:text-surface-50">
              {{ tech.name }}
            </h4>
          </div>
          <p class="text-sm text-surface-600 dark:text-surface-400">
            {{ tech.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Agradecimientos Especiales -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <i class="pi pi-users text-2xl text-primary-500"></i>
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
          Agradecimientos Especiales
        </h2>
      </div>

      <div class="flex flex-col gap-3 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl border border-surface-200 dark:border-surface-800">
        <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
          Gracias a toda la comunidad de código abierto y a los desarrolladores que comparten su
          trabajo de forma gratuita. Esta aplicación es posible gracias a su generosidad.
        </p>
        <p class="text-surface-700 dark:text-surface-300 leading-relaxed">
          Un agradecimiento especial a Wizards of the Coast por crear Dungeons & Dragons, el juego
          que inspira esta herramienta.
        </p>
      </div>
    </section>

    <!-- Autor -->
    <section class="flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <i class="pi pi-user text-2xl text-primary-500"></i>
        <h2 class="text-2xl font-bold text-surface-900 dark:text-surface-50">Autor</h2>
      </div>

      <div class="flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl text-white shadow-lg">
        <div class="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full border-4 border-white/30">
          <i class="pi pi-user text-5xl"></i>
        </div>

        <h3 class="text-3xl font-extrabold">Ignacio Raúl Bonilla Jiménez</h3>

        <div class="flex flex-col items-center gap-2">
          <p class="text-lg font-semibold text-white/90">Desarrollador Full Stack</p>
          <p class="text-center text-white/80 max-w-2xl">
            Creador y desarrollador principal de esta aplicación. Apasionado por crear herramientas
            útiles para la comunidad de jugadores de rol.
          </p>
        </div>

        <div class="flex gap-4 mt-2">
          <div class="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <i class="pi pi-calendar text-lg"></i>
            <span class="font-semibold">2024 - 2025</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <i class="pi pi-code text-lg"></i>
            <span class="font-semibold">Made with ❤️</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer de Licencia -->
    <section class="flex flex-col gap-3 p-6 bg-surface-100 dark:bg-surface-800 rounded-xl border border-surface-300 dark:border-surface-700">
      <div class="flex items-center gap-2">
        <i class="pi pi-info-circle text-primary-500"></i>
        <h3 class="font-bold text-surface-900 dark:text-surface-50">Información Legal</h3>
      </div>
      <p class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
        Esta aplicación es una herramienta no oficial para jugadores de Dungeons & Dragons.
        D&D y todos los derechos relacionados son propiedad de Wizards of the Coast LLC.
        Esta herramienta se proporciona de forma gratuita y sin ánimo de lucro.
      </p>
      <p class="text-sm text-surface-600 dark:text-surface-400">
        © 2024 - {{ new Date().getFullYear() }} Ignacio Raúl Bonilla Jiménez. Todos los derechos reservados.
      </p>
    </section>
  </div>
</template>

<style scoped>
/* Animaciones suaves para hover */
a {
  transition: all 0.2s ease;
}

a:hover {
  transform: translateX(4px);
}
</style>
