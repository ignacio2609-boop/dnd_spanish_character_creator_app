# Creador de Personajes D&D 🎲

![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-42b883.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg)

Una aplicación web moderna para crear personajes de Dungeons & Dragons 5ª Edición. Diseñada especialmente para la comunidad hispanohablante y jugadores principiantes.

*A modern web application to create Dungeons & Dragons 5th Edition characters. Designed especially for the Spanish-speaking community and beginner players.*

---

## Tabla de Contenidos

- [Características](#caracteristicas)
- [Descripción](#descripcion)
- [Instalación](#instalacion)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Comandos útiles](#comandos-utiles)
- [Dependencias principales](#dependencias-principales)
- [Créditos](#creditos)
- [Licencia](#licencia)

---

## Caracteristicas

### 🎮 Creación de Personajes Paso a Paso
- **Formulario intuitivo** con sistema de pestañas (Stepper)
- **6 secciones organizadas**: Información Básica, Trasfondo, Estadísticas, Habilidades, Conjuros y Finalización
- **Validación de datos** antes de generar el PDF
- **Cálculos automáticos** de modificadores, bonos y competencias

### 🎲 Sistema de Dados 3D
- **Motor de física 3D** con [@3d-dice/dice-box](https://github.com/3d-dice/dice-box)
- **Tiradas de 4d6** para generación de estadísticas
- **Animaciones realistas** y colores aleatorios
- **Renderizado optimizado** con canvas HTML5

### 📄 Generación de PDF
- **Exportación automática** a hoja de personaje oficial editable
- **Dos opciones de salida**: Ver en nueva pestaña o descargar directamente
- **Relleno inteligente** de 70+ campos del formulario
- **Cálculos automáticos incluidos**: modificadores, salvaciones, bonos de habilidades, puntos de golpe
- **Nombre de archivo personalizado** basado en el nombre del personaje

### 🎨 Diseño Moderno
- **Interfaz responsive** - Funciona en móvil, tablet y desktop
- **Dark Mode** completo con soporte para tema oscuro
- **Componentes de PrimeVue** con personalización
- **Animaciones suaves** con Tailwind CSS
- **Botón Rainbow** mágico para tirar dados

### ♿ Accesibilidad
- **Formularios accesibles** con labels y aria-labels
- **Navegación por teclado** completa
- **Contraste mejorado** en todos los elementos
- **Focus visible** en componentes interactivos

---

## Descripcion

Esta aplicación web permite crear personajes de Dungeons & Dragons 5ª Edición de forma **rápida, sencilla e intuitiva**. 

**Público objetivo:**
- 🎭 Nuevos jugadores que se inician en D&D
- 🌍 Comunidad hispanohablante
- ⚡ Jugadores que buscan agilizar el proceso de creación

**Características principales:**
1. **Formulario guiado** que explica cada paso
2. **Sistema de dados 3D** para tiradas de estadísticas
3. **Cálculo automático de HP** según clase y constitución (11 clases de D&D 5e)
4. **Generación automática de PDF** con hoja de personaje oficial (ver o descargar)
5. **Cálculos automáticos** de todas las mecánicas del juego
6. **Interfaz moderna** y fácil de usar

---

## Instalacion

### Prerrequisitos
- Node.js 20.19.0 o >= 22.12.0
- npm 10+ recomendado

### Pasos de instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/dnd_spanish_character_creator_app.git
   cd dnd_spanish_character_creator_app
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Verifica que el PDF esté en la carpeta public:**
   ```
   public/Hoja_de_personaje_Editable.pdf
   ```

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador en:**
   ```
   http://localhost:5173
   ```

---

## Uso

### Modo Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo con hot-reload en `http://localhost:5173`

### Build de Producción
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `dist/`

### Vista Previa de Producción
```bash
npm run preview
```
Previsualiza la build de producción localmente

### Linting y Formato
```bash
# Verificar errores de ESLint
npm run lint

# Formatear código con Prettier
npm run format
```

---

## Estructura del proyecto

```
dnd_spanish_character_creator_app/
├── public/                              # Archivos estáticos
│   ├── Hoja_de_personaje_Editable.pdf  # PDF plantilla para generación
│   └── assets/                          # Assets de dice-box
│
├── src/
│   ├── assets/                          # Recursos (imágenes, iconos)
│   │   └── main_icon.svg               # Logo principal
│   │
│   ├── components/                      # Componentes Vue
│   │   ├── creator-view-components/    # Componentes del creador
│   │   │   ├── CharacterCreatorForm.vue
│   │   │   └── DiceContainer.vue
│   │   ├── inspira_ui/                 # Componentes UI personalizados
│   │   │   ├── RainbowButton.vue
│   │   │   ├── InteractiveGridPattern.vue
│   │   │   └── index.ts
│   │   ├── layout/                     # Componentes de layout
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   ├── MainLayout.vue
│   │   │   └── SideMenu.vue (deshabilitado)
│   │   ├── prime_vue/                  # Wrappers de PrimeVue
│   │   └── UI/                         # Componentes UI genéricos
│   │
│   ├── composables/                    # Composables de Vue
│   │   ├── fantasticDiceConfig.ts     # Configuración de DiceBox
│   │   └── primeVueConfig.ts          # Configuración de PrimeVue
│   │
│   ├── router/                         # Vue Router
│   │   ├── router.ts                  # Configuración del router
│   │   └── routes.ts                  # Definición de rutas
│   │
│   ├── services/                       # Servicios
│   │   ├── PdfService.ts              # Servicio de generación de PDF
│   │   └── HitDiceService.ts          # Lógica de dados de golpe por clase
│   │
│   ├── stores/                         # Pinia Stores
│   │   └── characterStore.ts          # Store del personaje
│   │
│   ├── styles/                         # Estilos globales
│   │   ├── main.css                   # Estilos principales
│   │   └── vendors/                   # Estilos de terceros
│   │
│   ├── utils/                          # Utilidades
│   │   └── cn.ts                      # Utility para clases CSS
│   │
│   ├── views/                          # Vistas principales
│   │   ├── HomeView.vue               # Página de inicio
│   │   ├── CreatorView.vue            # Vista del creador
│   │   ├── CreditsView.vue            # Página de créditos
│   │   ├── InformationView.vue        # Información sobre D&D
│   │   └── NotFound.vue               # Página 404
│   │
│   ├── App.vue                         # Componente raíz
│   └── main.ts                         # Punto de entrada
│
├── eslint.config.ts                    # Configuración ESLint (flat config)
├── tsconfig.json                       # Configuración TypeScript
├── vite.config.ts                      # Configuración Vite
└── package.json                        # Dependencias del proyecto
```

---

## Comandos utiles

- `npm run dev`: Inicia servidor de desarrollo
- `npm run build`: Compila para producción
- `npm run preview`: Previsualiza build de producción
- `npm run lint`: Ejecuta ESLint
- `npm run format`: Formatea código con Prettier
- `npm run type-check`: Verifica tipos de TypeScript
- `npm ci`: Instalación limpia de dependencias

---

## Dependencias principales

### Core
- **[Vue 3.5](https://vuejs.org/)** - Framework JavaScript progresivo
- **[TypeScript 6.0](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Vite 8.0](https://vitejs.dev/)** - Build tool ultrarrápido

### UI & Estilo
- **[PrimeVue 4.5](https://www.primefaces.org/primevue/)** - Biblioteca de componentes UI
- **[Tailwind CSS 4.2](https://tailwindcss.com/)** - Framework CSS utility-first
- **[PrimeIcons](https://primevue.org/icons/)** - Biblioteca de iconos

### Estado y Routing
- **[Pinia](https://pinia.vuejs.org/)** - Store oficial de Vue
- **[Vue Router 5](https://router.vuejs.org/)** - Router oficial de Vue

### Funcionalidades Especiales
- **[@3d-dice/dice-box](https://github.com/3d-dice/dice-box)** - Motor de física 3D para dados
- **[pdf-lib](https://pdf-lib.js.org/)** - Creación y edición de PDFs
- **[class-variance-authority](https://cva.style/docs)** - Gestión de variantes de clases

### Desarrollo
- **[ESLint](https://eslint.org/)** - Linter para JavaScript/TypeScript
- **[Prettier](https://prettier.io/)** - Formateador de código
- **[unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)** - Auto-import de componentes

---

## Creditos

### 👨‍💻 Desarrollo
**Ignacio Raúl Bonilla Jiménez**  
*Desarrollador Full Stack*  
Creador y desarrollador principal de la aplicación.

### 🎨 Diseño
**Sara Armengol Abad**  
*Dirección de Arte · Sistema de Color*  
Responsable del diseño del sistema cromático y la identidad visual de la aplicación.

### 📦 Recursos
- **[Icons8](https://icons8.com/icon/RnjhYDd5afIN/puzzle)** - Icono de Rompecabezas
- **[Game-Icons.net](https://game-icons.net/1x1/lorc/gift-of-knowledge.html)** - Gift of Knowledge por Lorc

### 🙏 Agradecimientos Especiales
- Comunidad de **código abierto** por compartir su trabajo
- **Wizards of the Coast** por crear Dungeons & Dragons
- Todos los **contribuidores** y testers del proyecto

---

## Licencia

Este proyecto está bajo la licencia **MIT**.

```
MIT License

Copyright (c) 2024-2025 Ignacio Raúl Bonilla Jiménez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contacto y Soporte

¿Tienes preguntas, sugerencias o encontraste un bug?

- 🐛 **Issues:** [GitHub Issues](https://github.com/tu-usuario/repo/issues)
- 💬 **Discusiones:** [GitHub Discussions](https://github.com/tu-usuario/repo/discussions)

---

**¡Gracias por usar el Creador de Personajes D&D!** 🎲

Hecho con ❤️ para la comunidad de D&D

[⬆ Volver arriba](#tabla-de-contenidos)
