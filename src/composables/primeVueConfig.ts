import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import type { App } from 'vue'

import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'

import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import {
  updatePrimaryPalette,
  updateSurfacePalette,
  updatePreset,
  palette,
  type ColorScale,
} from '@primeuix/themes'

export const primeVueConfig = (app: App) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })

  const dndRedPalette = palette('#e04b53') as ColorScale
  const lightSurfacePalette = palette('#a7a0a3') as ColorScale
  const darkSurfacePalette = palette('#47354b') as ColorScale
  updatePrimaryPalette(dndRedPalette)
  updateSurfacePalette(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkSurfacePalette
      : lightSurfacePalette,
  )
  updatePreset({
    semantic: {
      colorScheme: {
        dark: {
          primary: '{primary.color}',
        },
      },
    },
  })

  // Servicios
  app.use(ToastService)
  app.use(ConfirmationService)

  // Directivas
  app.directive('tooltip', Tooltip)
  app.directive('ripple', Ripple)

}
