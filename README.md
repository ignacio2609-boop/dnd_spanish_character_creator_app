# dnd_spanish_character_creator_app

Una app web dedicada a la creación de personajes jugables de D&D. Es una herramienta pensada para nuevos jugadores o principiantes que quieran adentrarse al mundo de Dungeons & Dragons.

A web app dedicated to the creation of D&D playable characters. Targeted to new players or beginners and the Spanish community.

---

## Tabla de Contenidos
- [Descripción](#descripción)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Comandos Útiles](#comandos-útiles)
- [Dependencias Principales](#dependencias-principales)
- [Licencia](#licencia)

---

## Descripción
Esta aplicación permite crear personajes de Dungeons & Dragons de forma sencilla, guiando al usuario paso a paso. Está orientada a la comunidad hispanohablante y a quienes se inician en el juego.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd dnd_spanish_character_creator_app
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

- Para desarrollo:
  ```bash
  npm run dev
  ```
- Para construir la versión de producción:
  ```bash
  npm run build
  ```
- Para previsualizar la build:
  ```bash
  npm run preview
  ```

## Estructura del Proyecto

```
src/
  assets/           # Recursos estáticos
  components/       # Componentes Vue reutilizables
  composables/      # Funciones reutilizables (composables)
  router/           # Configuración de rutas (vue-router)
  stores/           # Pinia stores (estado global)
  styles/           # Hojas de estilo (CSS, Tailwind)
  utils/            # Utilidades varias
  views/            # Vistas principales de la app
  App.vue           # Componente raíz
  main.ts           # Punto de entrada principal
```

## Comandos Útiles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Genera la build de producción
- `npm run preview` — Previsualiza la build
- `npm run lint` — Linting y corrección automática
- `npm run format` — Formatea el código con Prettier

## Dependencias Principales
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/)
- [PrimeVue](https://www.primefaces.org/primevue/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vue Router](https://router.vuejs.org/)
- [@3d-dice/dice-box](https://github.com/3d-dice/dice-box)

## Licencia

MIT
