import { PDFDocument, PDFCheckBox, PDFDropdown, PDFTextField, PDFRadioGroup } from 'pdf-lib';

export class PdfService {
  private toPdfBlobPart(pdfBytes: Uint8Array): ArrayBuffer {
    return new Uint8Array(pdfBytes).buffer;
  }

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

      // Log específico para dropdowns importantes
      console.log('\n🔍 VALORES DE DROPDOWNS A ENVIAR:');
      console.log('  Race:', data.Race);
      console.log('  Background:', data.Background);
      console.log('  Alignment:', data.Alignment);

      // Log de todos los campos disponibles (útil para debugging)
      console.log('\n📋 TODOS LOS CAMPOS DISPONIBLES EN EL PDF:');
      fields.forEach((field, index) => {
        console.log(`  ${index + 1}. "${field.getName()}"`);
      });

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
            const options = field.getOptions();
            console.log(`🔍 Dropdown "${pdfFieldId}":`, {
              valorEnviado: String(value),
              opcionesDisponibles: options,
            });

            // Verificar si el valor existe en las opciones
            if (!options.includes(String(value))) {
              console.warn(
                `⚠️ Valor "${value}" no coincide con ninguna opción del dropdown "${pdfFieldId}"`
              );
            }

            field.select(String(value));

            // Ajustar tamaño de fuente solo para dropdowns
            try {
              // Usar un tamaño de fuente más pequeño para dropdowns (10pt)
              field.setFontSize(10);
            } catch {
              // Si falla, ignorar
            }

            console.log(`✅ Dropdown "${pdfFieldId}" = "${value}"`);
          } else if (field instanceof PDFRadioGroup) {
            field.select(String(value));
            console.log(`✅ RadioGroup "${pdfFieldId}" = "${value}"`);
          }

          successCount++;
        } catch (_err) {
          errorCount++;
          console.warn(
            `⚠️ Campo "${pdfFieldId}" no encontrado o error al rellenar.`,
            _err
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
      const blob = new Blob([this.toPdfBlobPart(pdfBytes)], { type: 'application/pdf' });
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

  /**
   * Genera y descarga el PDF directamente
   */
  async generateAndDownloadPdf(
    templateUrl: string,
    data: Record<string, string | number | boolean>,
    fileName: string = 'personaje_dnd.pdf'
  ): Promise<void> {
    console.group('📥 Descarga de PDF');
    console.log('Datos a rellenar:', data);

    try {
      // Usar el mismo proceso de generación
      const existingPdfBytes = await fetch(templateUrl).then((res) => {
        if (!res.ok) throw new Error(`No se pudo cargar el PDF: ${res.statusText}`);
        return res.arrayBuffer();
      });

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // Rellenar campos (mismo proceso que generateAndOpenPdf)
      for (const [pdfFieldId, value] of Object.entries(data)) {
        if (value === undefined || value === null) continue;

        try {
          const field = form.getField(pdfFieldId);

          if (field instanceof PDFTextField) {
            field.setText(String(value));
          } else if (field instanceof PDFCheckBox) {
            if (value === true) field.check();
            else if (value === false) field.uncheck();
          } else if (field instanceof PDFDropdown) {
            field.select(String(value));

            // Ajustar tamaño de fuente solo para dropdowns
            try {
              field.setFontSize(10);
            } catch {
              // Si falla, ignorar
            }
          } else if (field instanceof PDFRadioGroup) {
            field.select(String(value));
          }
        } catch {
          // Ignorar campos que no existen
        }
      }

      // Generar PDF y descargar
      console.log('🔄 Generando PDF para descarga...');
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([this.toPdfBlobPart(pdfBytes)], { type: 'application/pdf' });

      // Crear link de descarga y hacer click automáticamente
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Limpiar objeto URL
      setTimeout(() => URL.revokeObjectURL(link.href), 100);

      console.log(`✅ PDF descargado exitosamente como "${fileName}"`);
      console.groupEnd();
    } catch (error) {
      console.error('❌ Error crítico descargando el PDF:', error);
      console.groupEnd();
      throw error;
    }
  }
}

export const pdfService = new PdfService();
