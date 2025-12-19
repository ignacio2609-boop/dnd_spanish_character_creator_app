// src/services/PdfService.ts
import { PDFDocument, PDFCheckBox, PDFDropdown, PDFTextField } from 'pdf-lib';

// Definimos una interfaz para los datos que llegan de tu formulario Vue
export interface FormData {
  [key: string]: string | boolean | number;
}

// Mapa de configuración: Clave del Formulario Vue -> ID del Campo en el PDF
// Esto es CRUCIAL para no ensuciar tu vista con IDs raros como 'Text_Field_01'
export const PDF_FIELD_MAP: Record<string, string> = {
  // Tu dato en Vue: ID en el PDF
  nombrePersonaje: 'CharacterName',
  clase: 'ClassLevel',
  fuerza: 'STR',
  esInspirado: 'Inspiration', // Ejemplo para checkbox
  raza: 'Race',
  alineamiento: 'Alignment',
};

export class PdfService {
  /**
   * Carga un PDF, lo rellena con datos y lo abre en una nueva pestaña
   * @param templateUrl URL local del archivo PDF (ej: /assets/hoja.pdf)
   * @param data Objeto con los datos del formulario
   */
  async generateAndOpenPdf(templateUrl: string, data: FormData): Promise<void> {
    try {
      // 1. Cargar el PDF (puede estar en public/ o assets/)
      const existingPdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());

      // 2. Cargar el documento con pdf-lib
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // 3. Recorrer nuestro mapa de campos y rellenar
      for (const [vueKey, pdfId] of Object.entries(PDF_FIELD_MAP)) {
        // Verificamos si tenemos dato para este campo
        if (data[vueKey] === undefined) continue;

        const value = data[vueKey];

        try {
          // Intentamos obtener el campo por su ID
          const field = form.getField(pdfId);

          if (field instanceof PDFTextField) {
            // Manejo de Texto: Convertimos todo a string
            field.setText(String(value));
          } else if (field instanceof PDFCheckBox && typeof value === 'boolean') {
            // Manejo de Checkbox
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            value ? field.check() : field.uncheck();
          } else if (field instanceof PDFDropdown) {
            // Manejo de Select: El valor debe coincidir EXACTAMENTE con una opción del PDF
            field.select(String(value));
          }
        } catch (err) {
          console.warn(`Campo PDF no encontrado o error al escribir: ${pdfId}`, err);
        }
      }

      // 4. (Opcional) Aplanar el formulario para que ya no sea editable
      // form.flatten();

      // 5. Generar el Blob y la URL
      const pdfBytes = await pdfDoc.save();
      // @ts-expect-error pdf-lib tiene un error de tipos con Blob
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const docUrl = URL.createObjectURL(blob);

      // 6. Abrir en nueva pestaña
      window.open(docUrl, '_blank');
    } catch (error) {
      console.error('Error generando el PDF:', error);
      throw new Error('No se pudo generar el documento');
    }
  }
}

// Exportamos una instancia única (Singleton) o la clase según prefieras
export const pdfService = new PdfService();
