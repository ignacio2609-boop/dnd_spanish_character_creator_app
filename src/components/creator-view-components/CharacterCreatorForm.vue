<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import { RainbowButton } from '@/components/inspira_ui';
import { useCharacterStore, ALL_SKILLS, type SkillKey, type StatKey } from '@/stores/characterStore.ts';
import { CHARACTER_CLASSES } from '@/services/HitDiceService';
import { ref, watch, computed } from 'vue';
import { pdfService } from '@/services/PdfService.ts';

const characterStore = useCharacterStore();
const isLoading = ref(false);
const isDownloading = ref(false);

// Computed para obtener el label de la clase
const classLabel = computed(() => {
  if (!characterStore.concept.class) return 'Aventurero';
  const classInfo = CHARACTER_CLASSES.find((c) => c.value === characterStore.concept.class);
  return classInfo?.label || characterStore.concept.class;
});

// Watch para actualizar HP cuando cambie la clase o CON
watch(
  () => [characterStore.concept.class, characterStore.stats.con],
  () => {
    characterStore.updateHitPoints();
  }
);

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

const openPdfInNewTab = async () => {
  // Validación básica
  if (!characterStore.concept.name) {
    globalThis.alert('⚠️ Por favor, introduce el nombre del personaje antes de generar el PDF.');
    return;
  }

  if (!characterStore.concept.class) {
    globalThis.alert('⚠️ Por favor, introduce la clase del personaje antes de generar el PDF.');
    return;
  }

  isLoading.value = true;
  try {
    globalThis.console.log('📋 Estado actual del personaje:');
    globalThis.console.log('Concepto:', characterStore.concept);
    globalThis.console.log('Background:', characterStore.background);
    globalThis.console.log('Stats:', characterStore.stats);
    globalThis.console.log('Modifiers:', characterStore.modifiers);
    globalThis.console.log('Skills:', characterStore.skills);
    globalThis.console.log('Skill Bonuses:', characterStore.skillBonuses);
    globalThis.console.log('Saving Throws:', characterStore.savingThrows);
    globalThis.console.log('Saving Throw Bonuses:', characterStore.savingThrowBonuses);
    globalThis.console.log('Combat:', characterStore.combat);
    globalThis.console.log('Spells:', characterStore.spells);

    const data = characterStore.getFormattedDataForPdf();
    globalThis.console.log('\n📤 Datos formateados para PDF:', data);

    await pdfService.generateAndOpenPdf('/Hoja_de_personaje_Editable.pdf', data);
  } catch (e) {
    globalThis.console.error('❌ Error al generar el PDF:', e);
    globalThis.alert('❌ Error al generar el PDF. Revisa la consola para más detalles.');
  } finally {
    isLoading.value = false;
  }
};

const downloadPdf = async () => {
  // Validación básica
  if (!characterStore.concept.name) {
    globalThis.alert('⚠️ Por favor, introduce el nombre del personaje antes de descargar el PDF.');
    return;
  }

  if (!characterStore.concept.class) {
    globalThis.alert('⚠️ Por favor, introduce la clase del personaje antes de descargar el PDF.');
    return;
  }

  isDownloading.value = true;
  try {
    const data = characterStore.getFormattedDataForPdf();
    const fileName = `${characterStore.concept.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_dnd.pdf`;

    await pdfService.generateAndDownloadPdf('/Hoja_de_personaje_Editable.pdf', data, fileName);
  } catch (e) {
    globalThis.console.error('❌ Error al descargar el PDF:', e);
    globalThis.alert('❌ Error al descargar el PDF. Revisa la consola para más detalles.');
  } finally {
    isDownloading.value = false;
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

              <div class="flex flex-col gap-2">
                <label
                  for="player-name"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Nombre del Jugador
                </label>
                <InputText
                  id="player-name"
                  v-model="characterStore.concept.playerName"
                  placeholder="Tu nombre real"
                  class="w-full"
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
                  <Dropdown
                    id="character-class"
                    v-model="characterStore.concept.class"
                    :options="CHARACTER_CLASSES"
                    option-label="label"
                    option-value="value"
                    placeholder="Selecciona una clase"
                    class="w-full"
                    filter
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center gap-2">
                        <i class="pi pi-shield text-primary-500"></i>
                        <span>{{
                          CHARACTER_CLASSES.find((c) => c.value === slotProps.value)?.label
                        }}</span>
                      </div>
                      <span v-else>{{ slotProps.placeholder }}</span>
                    </template>

                    <template #option="slotProps">
                      <div class="flex items-center justify-between gap-3 w-full">
                        <div class="flex items-center gap-2">
                          <i class="pi pi-shield text-primary-500"></i>
                          <span>{{ slotProps.option.label }}</span>
                        </div>
                        <span
                          class="text-xs font-mono text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-800 px-2 py-1 rounded"
                        >
                          {{ slotProps.option.hitDie }}
                        </span>
                      </div>
                    </template>
                  </Dropdown>
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
                    :max="1"
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
              <div class="flex flex-col gap-2">
                <label
                  for="character-race"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Raza
                </label>
                <Dropdown
                  id="character-race"
                  v-model="characterStore.background.race"
                  :options="raceOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Selecciona tu Raza"
                  class="w-full"
                  filter
                />
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="character-background"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Trasfondo (Background)
                </label>
                <Dropdown
                  id="character-background"
                  v-model="characterStore.background.backgroundName"
                  :options="backgroundOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Selecciona tu Origen"
                  class="w-full"
                  filter
                />
              </div>

              <div class="flex flex-col gap-2">
                <label
                  for="character-alignment"
                  class="font-semibold text-surface-700 dark:text-surface-200"
                >
                  Alineamiento
                </label>
                <Dropdown
                  id="character-alignment"
                  v-model="characterStore.background.alignment"
                  :options="alignmentOptions"
                  option-label="label"
                  option-value="value"
                  placeholder="Tu brújula moral"
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
              @click="activateCallback(1)"
            />
            <Button
              label="Siguiente"
              icon="pi pi-arrow-right"
              icon-pos="right"
              @click="activateCallback(3)"
            />
          </div>
        </StepPanel>
      </StepItem>

      <!-- Sección 3: Estadísticas -->
      <StepItem :value="3">
        <Step>Estadísticas</Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full gap-6 p-6 bg-surface-50 dark:bg-surface-900 rounded-xl">
            <div class="flex flex-col gap-4">
              <h3 class="text-2xl font-bold text-surface-900 dark:text-surface-50">
                Atributos del Personaje
              </h3>

              <div class="flex flex-col gap-3 p-4 bg-primary-50 dark:bg-primary-950 border-l-4 border-primary-500 rounded-lg">
                <h4 class="font-bold text-primary-900 dark:text-primary-100 mb-2">
                  ¿Cómo generar tus estadísticas?
                </h4>
                <div class="text-sm text-primary-800 dark:text-primary-200 space-y-2">
                  <p>
                    <strong>Opción 1 - Tirada de dados (4d6):</strong> Haz clic en el botón para tirar 4 dados de 6 caras por cada atributo.
                    Tradicionalmente se descartan los valores más bajos y se suman los 3 más altos.
                  </p>
                  <p>
                    <strong>Opción 2 - Valores estándar:</strong> Distribuye estos valores como prefieras: 15, 14, 13, 12, 10, 8.
                  </p>
                </div>
              </div>

              <div class="flex justify-center">
                <RainbowButton
                  class="!h-auto !px-8 !py-4"
                  :speed="3"
                  @click="$emit('useRollDice')"
                >
                  <span class="flex items-center gap-3 text-lg font-bold text-white dark:text-black">
                    <i class="pi pi-sync text-xl"></i>
                    Tirar 4d6
                  </span>
                </RainbowButton>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(label, key) in statLabels"
                :key="key"
                class="flex flex-col gap-3 p-4 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700"
              >
                <h4
                  class="text-sm font-bold text-center text-surface-600 dark:text-surface-300 uppercase"
                >
                  {{ label }}
                </h4>

                <div class="flex items-center gap-3">
                  <div class="flex-1">
                    <InputNumber
                      v-model="characterStore.stats[key as StatKey]"
                      show-buttons
                      button-layout="vertical"
                      :min="1"
                      :max="30"
                      class="w-full"
                    />
                  </div>
                  <div
                    class="flex flex-col items-center justify-center min-w-[60px] h-[60px] bg-primary-100 dark:bg-primary-900 rounded-lg"
                  >
                    <span class="text-xs text-primary-600 dark:text-primary-400">Mod</span>
                    <span class="text-xl font-bold text-primary-700 dark:text-primary-300">
                      {{ characterStore.modifiers[key as StatKey] >= 0 ? '+' : ''
                      }}{{ characterStore.modifiers[key as StatKey] }}
                    </span>
                  </div>
                </div>

                <div
                  class="flex items-center gap-2 pt-2 border-t border-surface-200 dark:border-surface-700"
                >
                  <Checkbox
                    v-model="characterStore.savingThrows[key as StatKey]"
                    :binary="true"
                    :input-id="key + '-save'"
                  />
                  <label
                    :for="key + '-save'"
                    class="text-sm text-surface-700 dark:text-surface-300 cursor-pointer"
                  >
                    Salvación
                  </label>
                </div>
              </div>
            </div>

            <!-- Información de Puntos de Golpe -->
            <div
              v-if="characterStore.concept.class"
              class="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800"
            >
              <i class="pi pi-heart-fill text-2xl text-red-500 mt-0.5"></i>
              <div class="flex flex-col gap-1 flex-1">
                <span
                  class="text-xs font-semibold text-surface-600 dark:text-surface-400 uppercase tracking-wide"
                >
                  Puntos de Golpe Calculados Automáticamente
                </span>
                <span class="text-lg font-bold text-surface-900 dark:text-surface-50">
                  {{ characterStore.combat.hpMax }} PG ({{ characterStore.combat.hitDiceTotal }} +
                  {{ characterStore.modifiers.con >= 0 ? '+' : ''
                  }}{{ characterStore.modifiers.con }} CON)
                </span>
                <p class="text-xs text-surface-600 dark:text-surface-400 mt-1">
                  En nivel 1 obtienes el máximo del dado de golpe más tu modificador de
                  Constitución. Los valores se actualizan automáticamente al cambiar tu clase o CON.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div class="flex flex-col gap-2">
                <label for="hp-max" class="font-semibold text-surface-700 dark:text-surface-200">
                  Puntos de Golpe Máx. (HP)
                </label>
                <InputNumber
                  id="hp-max"
                  v-model="characterStore.combat.hpMax"
                  class="w-full"
                  readonly
                  disabled
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="hit-dice" class="font-semibold text-surface-700 dark:text-surface-200">
                  Dados de Golpe (Total)
                </label>
                <InputText
                  id="hit-dice"
                  v-model="characterStore.combat.hitDiceTotal"
                  placeholder="Ej: 1d8"
                  class="w-full"
                  readonly
                  disabled
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

            <!-- Descripción informativa -->
            <div class="flex flex-col gap-3 p-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 rounded-lg">
              <div class="flex items-start gap-3">
                <i class="pi pi-info-circle text-blue-600 dark:text-blue-400 text-xl mt-0.5"></i>
                <div class="flex flex-col gap-2">
                  <h4 class="font-bold text-blue-900 dark:text-blue-100">
                    ¿Cuántas habilidades debo marcar?
                  </h4>
                  <div class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                    <p>
                      El número de competencias depende de tu <strong>clase</strong> y <strong>trasfondo</strong>:
                    </p>
                    <ul class="list-disc list-inside space-y-1 ml-2">
                      <li><strong>Clase:</strong> Normalmente 2-4 habilidades (consulta tu manual de clase)</li>
                      <li><strong>Trasfondo:</strong> Generalmente 2 habilidades adicionales</li>
                      <li><strong>Raza:</strong> Algunas razas otorgan competencias extras</li>
                    </ul>
                    <p class="mt-2 italic">
                      💡 Consejo: La mayoría de personajes tienen entre 4-6 habilidades marcadas en total.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p class="text-surface-600 dark:text-surface-400">
              Marca las habilidades en las que tu personaje es competente. Los bonos se calculan automáticamente.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="key in ALL_SKILLS"
                :key="key"
                class="flex items-center justify-between gap-3 p-3 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 transition-all"
                :class="{
                  'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-950':
                    characterStore.skills[key],
                }"
              >
                <div class="flex items-center gap-3 flex-1">
                  <Checkbox
                    v-model="characterStore.skills[key]"
                    :binary="true"
                    :input-id="key"
                  />
                  <label
                    :for="key"
                    class="font-semibold text-surface-700 dark:text-surface-200 cursor-pointer"
                  >
                    {{ skillLabels[key] }}
                  </label>
                </div>

                <span
                  class="inline-flex items-center justify-center min-w-[48px] px-2 py-1 text-sm font-bold rounded-md"
                  :class="
                    characterStore.skills[key]
                      ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                      : 'bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400'
                  "
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
              <div
                class="flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full"
              >
                <i class="pi pi-check text-4xl text-green-600 dark:text-green-400"></i>
              </div>

              <h3 class="text-3xl font-bold text-surface-900 dark:text-surface-50 text-center">
                ¡Personaje Listo!
              </h3>

              <p class="text-lg text-surface-600 dark:text-surface-400 text-center max-w-md">
                Hemos calculado tus modificadores, competencias y organizado tu magia.
              </p>

              <div
                class="flex flex-col gap-3 p-6 bg-white dark:bg-surface-800 rounded-lg border border-surface-200 dark:border-surface-700 w-full max-w-md"
              >
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-surface-700 dark:text-surface-300">Nombre:</span>
                  <span class="text-surface-900 dark:text-surface-50">
                    {{ characterStore.concept.name || 'Sin nombre' }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-surface-700 dark:text-surface-300">Clase:</span>
                  <span class="text-surface-900 dark:text-surface-50">
                    {{ classLabel }}
                  </span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="font-semibold text-surface-700 dark:text-surface-300">Nivel:</span>
                  <span class="text-surface-900 dark:text-surface-50">
                    {{ characterStore.concept.level }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  label="Ver en Nueva Pestaña"
                  icon="pi pi-external-link"
                  severity="success"
                  size="large"
                  :loading="isLoading"
                  class="flex-1"
                  @click="openPdfInNewTab"
                />
                <Button
                  label="Descargar PDF"
                  icon="pi pi-download"
                  severity="info"
                  size="large"
                  :loading="isDownloading"
                  class="flex-1"
                  @click="downloadPdf"
                />
              </div>
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
