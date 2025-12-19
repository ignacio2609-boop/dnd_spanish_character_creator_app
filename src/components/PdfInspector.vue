<script setup lang="ts">
import { ref } from 'vue';
import {
  PDFDocument,
  PDFTextField,
  PDFCheckBox,
  PDFDropdown,
  PDFRadioGroup,
  PDFButton,
} from 'pdf-lib';

// Interfaz para tipar nuestros resultados
interface FieldInfo {
  name: string;
  type: string;
  value: string;
  options?: string[]; // Para Selects y RadioButtons
  maxLength?: number; // Para TextFields
  isReadOnly: boolean;
  isRequired: boolean;
}

const loading = ref(false);
const fieldList = ref<FieldInfo[]>([]);

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  loading.value = true;
  fieldList.value = [];

  try {
    const file = input.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const form = pdfDoc.getForm();
    const fields = form.getFields();

    fieldList.value = fields.map((field) => {
      // 1. Datos comunes a todos los campos
      const info: FieldInfo = {
        name: field.getName(),
        type: 'Otro',
        value: '',
        isReadOnly: field.isReadOnly(),
        isRequired: field.isRequired(),
        options: undefined,
        maxLength: undefined,
      };

      // 2. Extracción específica según el tipo
      if (field instanceof PDFTextField) {
        info.type = 'Texto (Input)';
        info.value = field.getText() || '';
        info.maxLength = field.getMaxLength(); // Útil para saber si cabe tu texto
      } else if (field instanceof PDFDropdown) {
        info.type = 'Select (Dropdown)';
        info.value = field.getSelected().join(', '); // Lo que está seleccionado actualmente
        info.options = field.getOptions(); // <--- AQUÍ ESTÁ LO QUE BUSCAS
      } else if (field instanceof PDFCheckBox) {
        info.type = 'Checkbox';
        info.value = field.isChecked() ? '✅ Marcado' : '⬜ Desmarcado';
      } else if (field instanceof PDFRadioGroup) {
        info.type = 'Radio Group';
        info.value = field.getSelected() || '';
        info.options = field.getOptions(); // Las opciones de los radio buttons
      } else if (field instanceof PDFButton) {
        info.type = 'Botón';
        info.value = 'N/A';
      }

      return info;
    });
  } catch (error) {
    console.error('Error analizando PDF:', error);
    alert('Error al leer el archivo.');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="inspector-wrapper">
    <h2>🕵️ Inspector PDF Detallado</h2>

    <input type="file" accept=".pdf" class="file-input" @change="handleFileUpload" />

    <div v-if="loading">Leyendo estructura del PDF...</div>

    <div v-if="fieldList.length > 0" class="table-container">
      <table>
        <thead>
          <tr class="text-black">
            <th>Nombre Interno (ID)</th>
            <th>Tipo</th>
            <th>Valor Actual</th>
            <th style="width: 40%">Detalles / Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fieldList" :key="field.name">
            <td>
              <code
                class="field-name"
                title="Click para copiar"
                @click="navigator.clipboard.writeText(field.name)"
              >
                {{ field.name }}
              </code>
              <div class="flags">
                <span v-if="field.isReadOnly" class="tag ro">Read Only</span>
                <span v-if="field.isRequired" class="tag req">Required</span>
              </div>
            </td>

            <td>{{ field.type }}</td>

            <td class="value-cell">{{ field.value }}</td>

            <td class="details-cell">
              <div v-if="field.options && field.options.length > 0">
                <strong>Opciones disponibles:</strong>
                <div class="options-list">
                  <span v-for="opt in field.options" :key="opt" class="option-pill">
                    "{{ opt }}"
                  </span>
                </div>
              </div>

              <div v-if="field.maxLength !== undefined">
                Max Caracteres: <strong>{{ field.maxLength }}</strong>
              </div>

              <div v-if="!field.options && field.maxLength === undefined" class="text-muted">-</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.inspector-wrapper {
  font-family: sans-serif;
  padding: 20px;
}
.file-input {
  margin-bottom: 20px;
  padding: 10px;
  border: 2px dashed #ccc;
  width: 100%;
  box-sizing: border-box;
}
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th,
td {
  border: 1px solid #e0e0e0;
  padding: 10px;
  text-align: left;
  vertical-align: top;
}
th {
  background: #f8f9fa;
  font-weight: bold;
}

.field-name {
  background: #eef2ff;
  color: #4338ca;
  padding: 4px 6px;
  border-radius: 4px;
  font-family: monospace;
  font-weight: bold;
  display: inline-block;
  cursor: pointer;
}
.flags {
  margin-top: 5px;
  display: flex;
  gap: 5px;
  font-size: 10px;
}
.tag {
  padding: 2px 5px;
  border-radius: 3px;
  color: white;
}
.tag.ro {
  background: #9ca3af;
}
.tag.req {
  background: #ef4444;
}

.options-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
}
.option-pill {
  background: #d1fae5;
  color: #065f46;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
  border: 1px solid #a7f3d0;
}
.text-muted {
  color: #ccc;
}
</style>
