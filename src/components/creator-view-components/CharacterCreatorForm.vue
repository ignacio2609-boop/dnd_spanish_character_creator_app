<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import { useCharacterStore, ALL_SKILLS, type SkillKey } from '@/stores/characterStore.ts';
import { ref } from 'vue';
import { pdfService } from '@/services/PdfService.ts';

const characterStore = useCharacterStore();
const isLoading = ref(false);

// Opciones EXACTAS del PDF para PrimeVue

const alignmentOptions = [
  { label: 'Legal Bueno', value: 'Legal Bueno' },
  { label: 'Neutral Bueno', value: 'Neutral Bueno' },
  { label: 'Caótico Bueno', value: 'Caótico Bueno' },
  { label: 'Legal Neutral', value: 'Legal Neutral' },
  { label: 'Neutral', value: 'Neutral' },
  { label: 'Caótico Neutral', value: 'Caótico Neutral' },
  { label: 'Legal Maligno', value: 'Legal Maligno' },
  { label: 'Neutral Maligno', value: 'Neutral Maligno' },
  { label: 'Caótico Maligno', value: 'Caótigo Maligno' }, // ⚠️ ¡OJO A LA 'G'! Mantenemos la errata del PDF en el value
];

const raceOptions = [
  { label: 'Enano de las Colinas', value: 'Enano de las Colinas' },
  { label: 'Enano de las Montañas', value: 'Enano de las Montañas' },
  { label: 'Alto Elfo', value: 'Alto Elfo' },
  { label: 'Elfo de los Bosques', value: 'Elfo de los Bosques' },
  { label: 'Elfo Oscuro (Drow)', value: 'Elfo Oscuro (Drow)' },
  { label: 'Mediano Piesligeros', value: 'Mediano Piesligeros' },
  { label: 'Mediano Fornido', value: 'Mediano Fornido' },
  { label: 'Humano', value: 'Humano' },
  { label: 'Dracónido', value: 'Dracónido' },
  { label: 'Gnomo del Bosque', value: 'Gnomo del Bosque' },
  { label: 'Gnomo de la Roca', value: 'Gnomo de la Roca' },
  { label: 'Semielfo', value: 'Semielfo' },
  { label: 'Semiorco', value: 'Semiorco' },
  { label: 'Tiefling (Tiflin)', value: 'Tiflin' }, // En UI ponemos Tiefling que suena mejor, enviamos Tiflin
];

const backgroundOptions = [
  { label: 'Acólito', value: 'Acólito' },
  { label: 'Charlatán', value: 'Charlatán' },
  { label: 'Criminal', value: 'Criminal' },
  { label: 'Artista', value: 'Artista' },
  { label: 'Héroe del Pueblo', value: 'Héroe del Pueblo' },
  { label: 'Artesano Gremial', value: 'Artesano Gremial' },
  { label: 'Ermitaño', value: 'Ermitaño' },
  { label: 'Noble', value: 'Noble' },
  { label: 'Forastero', value: 'Forastero' },
  { label: 'Sabio', value: 'Sabio' },
  { label: 'Marinero', value: 'Marinero' },
  { label: 'Soldado', value: 'Soldado' },
  { label: 'Huérfano', value: 'Huérfano' },
];

const skillLabels: Record<SkillKey, string> = {
  acrobatics: 'Acrobacias (Des)',
  animalHandling: 'Trato con Animales (Sab)',
  arcana: 'Arcanos (Int)',
  athletics: 'Atletismo (Fue)',
  deception: 'Engaño (Car)',
  history: 'Historia (Int)',
  insight: 'Perspicacia (Sab)',
  intimidation: 'Intimidación (Car)',
  investigation: 'Investigación (Int)',
  medicine: 'Medicina (Sab)',
  nature: 'Naturaleza (Int)',
  perception: 'Percepción (Sab)',
  performance: 'Interpretación (Car)',
  persuasion: 'Persuasión (Car)',
  religion: 'Religión (Int)',
  sleightOfHand: 'Juego de Manos (Des)',
  stealth: 'Sigilo (Des)',
  survival: 'Supervivencia (Sab)',
};

const downloadPdf = async () => {
  isLoading.value = true;
  try {
    const data = characterStore.getFormattedDataForPdf();
    // Recuerda poner tu archivo en la carpeta public
    await pdfService.generateAndOpenPdf('/Hoja_de_personaje_Editable.pdf', data);
  } catch (e) {
    globalThis.console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const statLabels: Record<string, string> = {
  str: 'Fuerza',
  dex: 'Destreza',
  con: 'Constitución',
  int: 'Inteligencia',
  wis: 'Sabiduría',
  cha: 'Carisma',
};

// Suppress specific console warnings about ptParam, do not delete it is a bug workaround
const originalWarn = globalThis.console.warn;
globalThis.console.warn = (...args: unknown[]) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('ptParams')) {
    return;
  }
  originalWarn(...args);
};

defineEmits(['useRollDice']);
</script>

<template>
  <div class="flex w-full justify-center">
    <Stepper :value="1" class="w-full max-w-5xl" :pt="{ root: { 'data-pt-params': undefined } }">
      <!-- Sección 1: Información Básica -->
      <StepItem :value="1">
        <Step>Información Básica</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
              Datos del Personaje
            </h3>

            <div class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label
                  for="character-name"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Nombre del Personaje
                </label>
                <InputText
                  id="character-name"
                  v-model="characterStore.concept.name"
                  placeholder="Ej: Gandalf el Gris"
                  class="w-full"
                />
              </div>
              <div class="field">
                <label>Nombre del Jugador</label>
                <input
                  v-model="characterStore.concept.playerName"
                  type="text"
                  placeholder="Tu nombre real"
                  class="p-inputtext p-component"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-2">
                  <label
                    for="character-class"
                    class="font-semibold text-surface-700 dark:text-surface-200"
                  >
                    Clase
                  </label>
                  <InputText
                    id="character-class"
                    v-model="characterStore.concept.class"
                    placeholder="Ej: Mago"
                    class="w-full"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label
                    for="character-level"
                    class="font-semibold text-surface-700 dark:text-surface-200"
                  >
                    Nivel
                  </label>
                  <InputNumber
                    id="character-level"
                    v-model="characterStore.concept.level"
                    :min="1"
                    :max="20"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-start p-6">
            <Button
              label="Siguiente"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="activateCallback(2)"
            />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 2: Trasfondo -->
      <StepItem :value="2">
        <Step>Trasfondo</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
              Historia del Personaje
            </h3>

            <div class="flex flex-col gap-4">
              <div class="field">
                <label>Raza</label>
                <Dropdown
                  v-model="characterStore.background.race"
                  :options="raceOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Selecciona tu Raza"
                  class="w-full"
                  filter
                />
              </div>

              <div class="field">
                <label>Trasfondo</label>
                <Dropdown
                  v-model="characterStore.background.backgroundName"
                  :options="backgroundOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Selecciona tu Origen"
                  class="w-full"
                  filter
                />
              </div>

              <div class="field">
                <label>Alineamiento</label>
                <Dropdown
                  v-model="characterStore.background.alignment"
                  :options="alignmentOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Tu brújula moral"
                  class="w-full"
                />
              </div>
            </div>

            <div class="flex justify-start gap-4 p-6">
              <Button
                label="Atrás"
                icon="pi pi-arrow-left"
                severity="secondary"
                outlined
                @click="activateCallback(1)"
              />
              <Button
                label="Siguiente"
                icon="pi pi-arrow-right"
                icon-pos="right"
                @click="activateCallback(3)"
              />
            </div>
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 3: Estadísticas -->
      <StepItem :value="3">
        <Step>Estadísticas</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
              Atributos del Personaje
            </h3>

            <div class="grid-container">
              <div v-for="(label, key) in statLabels" :key="key" class="stat-card">
                <h4 class="stat-title">{{ label.toUpperCase() }}</h4>

                <div class="stat-body">
                  <div class="input-wrapper">
                    <InputNumber
                      v-model="characterStore.stats[key]"
                      show-buttons
                      button-layout="vertical"
                      :min="1"
                      :max="30"
                      class="stat-input"
                    />
                    <div class="mod-display">
                      {{ characterStore.modifiers[key] >= 0 ? '+' : ''
                      }}{{ characterStore.modifiers[key] }}
                    </div>
                  </div>

                  <div class="save-check">
                    <Checkbox
                      v-model="characterStore.savingThrows[key]"
                      :binary="true"
                      :input-id="key + '-save'"
                    />
                    <label :for="key + '-save'">Salvación</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="vitality-row">
              <div class="field">
                <label>Puntos de Golpe Máx. (HP)</label>
                <InputNumber v-model="characterStore.combat.hpMax" />
              </div>
              <div class="field">
                <label>Dados de Golpe (Total)</label>
                <input
                  v-model="characterStore.combat.hitDiceTotal"
                  type="text"
                  class="p-inputtext p-component"
                  placeholder="Ej: 1d8"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-start gap-4 p-6">
            <Button
              label="Atrás"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              @click="activateCallback(2)"
            />
            <Button
              label="Siguiente"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="activateCallback(4)"
            />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 4: Habilidades -->
      <StepItem :value="4">
        <Step>Habilidades</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
              Competencias en Habilidades
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Marca las habilidades en las que tu personaje es competente
            </p>

            <div
              v-for="key in ALL_SKILLS"
              :key="key"
              class="skill-item"
              :class="{ 'is-active': characterStore.skills[key] }"
            >
              <div class="skill-check">
                <Checkbox v-model="characterStore.skills[key]" :binary="true" :inputId="key" />
                <label :for="key" class="skill-label">{{ skillLabels[key] }}</label>
              </div>

              <div class="skill-value">
                <span
                  class="p-tag"
                  :class="characterStore.skills[key] ? 'p-tag-success' : 'p-tag-secondary'"
                >
                  {{ characterStore.skillBonuses[key] >= 0 ? '+' : ''
                  }}{{ characterStore.skillBonuses[key] }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex justify-start gap-4 p-6">
            <Button
              label="Atrás"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              @click="activateCallback(3)"
            />
            <Button
              label="Siguiente"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="activateCallback(5)"
            />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 5: Conjuros -->
      <StepItem :value="5">
        <Step>Conjuros</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
              Conjuros Conocidos
            </h3>
            <p class="text-surface-600 dark:text-surface-400">
              Añade los conjuros que tu personaje conoce (se llenarán en las casillas Spells92+)
            </p>

            <div class="flex flex-col gap-3">
              <div v-for="index in 5" :key="index" class="flex flex-col gap-2">
                <label
                  :for="'spell-' + (index - 1)"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Conjuro {{ index }}
                </label>
                <InputText
                  :id="'spell-' + (index - 1)"
                  v-model="characterStore.spells[index - 1]"
                  :placeholder="'Ej: Bola de Fuego, Rayo, Escudo...'"
                  class="w-full"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-start gap-4 p-6">
            <Button
              label="Atrás"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              @click="activateCallback(4)"
            />
            <Button
              label="Siguiente"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="activateCallback(6)"
            />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 6: Finalizar -->
      <StepItem :value="6">
        <Step>Finalizar</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <div class="flex flex-col items-center justify-center gap-6 py-8">
              <div class="success-icon">
                <i class="pi pi-file-pdf" style="font-size: 3rem; color: var(--primary-color)"></i>
              </div>
              <h3>¡Personaje Listo!</h3>
              <p>Hemos calculado tus modificadores, competencias y organizado tu magia.</p>

              <div class="summary">
                <p><strong>Nombre:</strong> {{ characterStore.concept.name || 'Sin nombre' }}</p>
                <p><strong>Clase:</strong> {{ characterStore.concept.class || 'Aventurero' }}</p>
              </div>

              <Button
                label="Generar PDF"
                icon="pi pi-file-pdf"
                severity="success"
                size="large"
                :loading="isLoading"
                class="mt-4"
                @click="downloadPdf"
              />
            </div>
          </div>

          <div class="flex justify-start p-6">
            <Button
              label="Atrás"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              @click="activateCallback(5)"
            />
          </div>
        </StepPanel>
      </StepItem>
    </Stepper>
  </div>
</template>
