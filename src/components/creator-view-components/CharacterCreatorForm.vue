<script setup lang="ts">
import Stepper from 'primevue/stepper';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button from 'primevue/button';

// Suppress specific console warnings about ptParam, do not delete it is a bug workaround
const originalWarn = globalThis.console.warn;
globalThis.console.warn = (...args: any[]) => {
  if (args[0]?.includes('ptParams')) {
    return;
  }
  originalWarn(...args);
};

defineEmits(['useRollDice']);
</script>

<template>
  <div class="flex w-full">
    <Stepper :value="1" class="w-full" :pt="{ root: { 'data-pt-params': undefined } }">
      <StepItem :value="1">
        <Step> Section 1 </Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full p-4">Content for Section 1
            <Button label="roll dice" @click="$emit('useRollDice')" />
          </div>
          <div class="py-6">
            <Button label="Next" @click="activateCallback(2)" />
          </div>
        </StepPanel>
      </StepItem>
      <StepItem :value="2">
        <Step> Section 2 </Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full p-4">Content for Section 2</div>
          <div class="flex py-6 gap-2">
            <Button label="Back" severity="secondary" @click="activateCallback(1)" />
            <Button label="Next" @click="activateCallback(3)" />
          </div>
        </StepPanel>
      </StepItem>
      <StepItem :value="3">
        <Step> Section 3 </Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full p-4">Content for Section 3</div>
          <div class="flex py-6 gap-2">
            <Button label="Back" severity="secondary" @click="activateCallback(2)" />
            <Button label="Next" @click="activateCallback(4)" />
          </div>
        </StepPanel>
      </StepItem>
      <StepItem :value="4">
        <Step> Section 4 </Step>
        <StepPanel v-slot="{ activateCallback }" class="rounded-2xl">
          <div class="flex flex-col w-full p-4">Content for Section 4</div>
          <div class="py-6">
            <Button label="Back" severity="secondary" @click="activateCallback(3)" />
          </div>
        </StepPanel>
      </StepItem>
    </Stepper>
  </div>
</template>
