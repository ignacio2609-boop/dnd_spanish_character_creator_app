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
    console.group('📄 Generación de PDF');
    console.log('Datos a rellenar:', data);

    try {
      // 1. Cargar el PDF original
      console.log('Cargando PDF desde:', templateUrl);
      const existingPdfBytes = await fetch(templateUrl).then((res) => {
        if (!res.ok) throw new Error(`No se pudo cargar el PDF: ${res.statusText}`);
        return res.arrayBuffer();
      });

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      console.log(`PDF cargado. Total de campos en el formulario: ${fields.length}`);

      // Log de todos los campos disponibles (útil para debugging)
      console.log('Campos disponibles en el PDF:', fields.map(f => f.getName()));

      let successCount = 0;
      let skipCount = 0;
      let errorCount = 0;

      // 2. Iterar sobre los datos que nos envía la Store
      for (const [pdfFieldId, value] of Object.entries(data)) {
        // Si el valor es null o undefined, saltamos
        if (value === undefined || value === null) {
          skipCount++;
          continue;
        }

        try {
          // Intentamos obtener el campo por su nombre exacto (ej: 'AnHan', 'Spells92')
          const field = form.getField(pdfFieldId);

          // Lógica según el TIPO de campo en el PDF
          if (field instanceof PDFTextField) {
            // Convertimos números a string (ej: Fuerza 18 -> "18")
            field.setText(String(value));
            console.log(`✅ TextField "${pdfFieldId}" = "${value}"`);
          } else if (field instanceof PDFCheckBox) {
            // Si es booleano true -> check, false -> uncheck
            if (value === true) {
              field.check();
              console.log(`✅ CheckBox "${pdfFieldId}" = checked`);
            } else if (value === false) {
              field.uncheck();
              console.log(`✅ CheckBox "${pdfFieldId}" = unchecked`);
            }
          } else if (field instanceof PDFDropdown) {
            // Seleccionamos la opción (debe coincidir con las opciones del PDF)
            field.select(String(value));
            console.log(`✅ Dropdown "${pdfFieldId}" = "${value}"`);
          } else if (field instanceof PDFRadioGroup) {
            field.select(String(value));
            console.log(`✅ RadioGroup "${pdfFieldId}" = "${value}"`);
          }

          successCount++;
        } catch (err) {
          errorCount++;
          console.warn(
            `⚠️ Campo "${pdfFieldId}" no encontrado o error al rellenar.`,
            err
          );
        }
      }

      console.log('\n📊 Resumen:');
      console.log(`  ✅ Campos rellenados correctamente: ${successCount}`);
      console.log(`  ⚠️ Campos no encontrados o con errores: ${errorCount}`);
      console.log(`  ⏭️ Campos omitidos (null/undefined): ${skipCount}`);

      // 3. Generar y abrir
      console.log('\n🔄 Generando PDF final...');
      const pdfBytes = await pdfDoc.save();
      // @ts-expect-error blob
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const docUrl = URL.createObjectURL(blob);

      console.log('✅ PDF generado exitosamente. Abriendo en nueva pestaña...');
      window.open(docUrl, '_blank');

      console.groupEnd();
    } catch (error) {
      console.error('❌ Error crítico generando el PDF:', error);
      console.groupEnd();
      throw error;
    }
  }
}

export const pdfService = new PdfService();
