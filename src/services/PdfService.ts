import { PDFDocument, PDFCheckBox, PDFDropdown, PDFTextField, PDFRadioGroup } from 'pdf-lib';

export class PdfService {
  /**
   * Recibe un objeto plano { "ID_PDF": "Valor" } y rellena el PDF.
   * Ya no hace mapeos, confía en que la Store le envía los IDs correctos.
   */
  async generateAndOpenPdf(
    templateUrl: string,
    data: Record<string, string | number | boolean>
  ): Promise<void> {
    try {
      // 1. Cargar el PDF original
      const existingPdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // 2. Iterar sobre los datos que nos envía la Store
      for (const [pdfFieldId, value] of Object.entries(data)) {
        // Si el valor es null o undefined, saltamos
        if (value === undefined || value === null) continue;

        try {
          // Intentamos obtener el campo por su nombre exacto (ej: 'AnHan', 'Spells92')
          const field = form.getField(pdfFieldId);

          // Lógica según el TIPO de campo en el PDF
          if (field instanceof PDFTextField) {
            // Convertimos números a string (ej: Fuerza 18 -> "18")
            field.setText(String(value));
          } else if (field instanceof PDFCheckBox) {
            // Si es booleano true -> check, false -> uncheck
            if (value === true) field.check();
            else if (value === false) field.uncheck();
          } else if (field instanceof PDFDropdown) {
            // Seleccionamos la opción (debe coincidir con las opciones del PDF)
            // Ej: Alignment -> "Legal Bueno"
            field.select(String(value));
          } else if (field instanceof PDFRadioGroup) {
            field.select(String(value));
          }
        } catch (err) {
          // Este catch es vital: Si la Store envía un campo que no existe en el PDF,
          // lo ignoramos silenciosamente en lugar de romper todo el proceso.
          console.warn(
            `Campo omitido: No se encontró el campo con ID "${pdfFieldId}" en el PDF.`,
            err
          );
        }
      }

      // 3. Generar y abrir
      const pdfBytes = await pdfDoc.save();
      // @ts-expect-error blob type
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const docUrl = URL.createObjectURL(blob);
      window.open(docUrl, '_blank');
    } catch (error) {
      console.error('Error crítico generando el PDF:', error);
      throw error;
    }
  }
}

export const pdfService = new PdfService();
