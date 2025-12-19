# 📋 Guía de Prueba de Generación de PDF

## ✅ Checklist de Pruebas

### 1. **Verificar que el archivo PDF existe**
- [ ] Confirma que existe el archivo `/public/Hoja_de_personaje_Editable.pdf`
- [ ] El archivo debe ser un PDF editable con campos de formulario

### 2. **Prueba básica - Formulario mínimo**

Completa SOLO estos campos obligatorios:
- [ ] **Nombre del Personaje**: "Gandalf"
- [ ] **Clase**: "Mago"
- [ ] Deja todo lo demás por defecto

**Resultado esperado:**
- El PDF debe generarse sin errores
- Debe abrirse en una nueva pestaña
- Debe mostrar "Gandalf" y "Mago Nivel 1"

### 3. **Prueba completa - Todos los campos**

Completa todos los campos del formulario:

#### Sección 1: Información Básica
- [ ] Nombre del Personaje: "Elara Moonwhisper"
- [ ] Nombre del Jugador: "Tu Nombre"
- [ ] Clase: "Clérigo"
- [ ] Nivel: 3

#### Sección 2: Trasfondo
- [ ] Raza: "Alto Elfo"
- [ ] Trasfondo: "Acólito"
- [ ] Alineamiento: "Legal Bueno"

#### Sección 3: Estadísticas
Configura estas estadísticas:
- [ ] Fuerza (STR): 10
- [ ] Destreza (DEX): 14
- [ ] Constitución (CON): 12
- [ ] Inteligencia (INT): 13
- [ ] Sabiduría (WIS): 18
- [ ] Carisma (CHA): 16

Marca competencias en salvación:
- [ ] WIS (Sabiduría)
- [ ] CHA (Carisma)

Puntos de Vida:
- [ ] HP Máx: 20
- [ ] Dados de Golpe: "3d8"

#### Sección 4: Habilidades
Marca estas habilidades como competentes:
- [ ] Perspicacia (Insight)
- [ ] Medicina (Medicine)
- [ ] Religión (Religion)
- [ ] Persuasión (Persuasion)

#### Sección 5: Conjuros
Añade estos conjuros:
- [ ] Conjuro 1: "Curar Heridas"
- [ ] Conjuro 2: "Luz Sagrada"
- [ ] Conjuro 3: "Escudo de Fe"

### 4. **Verificación en el PDF generado**

Abre el PDF y verifica que se hayan rellenado correctamente:

#### ✅ Campos de texto que deben aparecer:
- [ ] CharacterName: "Elara Moonwhisper"
- [ ] PlayerName: "Tu Nombre"
- [ ] ClassLevel: "Clérigo 3"
- [ ] RaceSelect: "Alto Elfo"
- [ ] BackgroundSelect: "Acólito"
- [ ] AlignmentSelect: "Legal Bueno"

#### ✅ Estadísticas:
- [ ] STRscore: 10, STRmod: +0
- [ ] DEXscore: 14, DEXmod: +2
- [ ] CONscore: 12, CONmod: +1
- [ ] INTscore: 13, INTmod: +1
- [ ] WISscore: 18, WISmod: +4
- [ ] CHAscore: 16, CHAmod: +3

#### ✅ Salvaciones (con Bono de Competencia +2):
- [ ] WISsave: +6 (4 mod + 2 comp) ✓ Marcada
- [ ] CHAsave: +5 (3 mod + 2 comp) ✓ Marcada
- [ ] DEXsave: +2 (solo mod) ✗ No marcada

#### ✅ Habilidades (verificar los bonos):
- [ ] Insight (Perspicacia): +6 ✓ Marcada
- [ ] Medicine (Medicina): +6 ✓ Marcada
- [ ] Religion (Religión): +3 ✓ Marcada
- [ ] Persuasion (Persuasión): +5 ✓ Marcada

#### ✅ Combate:
- [ ] HPMax: 20
- [ ] HitDiceTotal: "3d8"
- [ ] ProfBonus: +2
- [ ] PWP (Percepción Pasiva): 14 (10 + 4 mod WIS)

#### ✅ Conjuros:
- [ ] Spells92: "Curar Heridas"
- [ ] Spells93: "Luz Sagrada"
- [ ] Spells94: "Escudo de Fe"

### 5. **Prueba de consola**

Abre las herramientas de desarrollo (F12) y revisa:

1. **Antes de generar el PDF**, la consola debe mostrar:
```
📋 Estado actual del personaje:
Concepto: {...}
Background: {...}
Stats: {...}
...
```

2. **Durante la generación**, debe aparecer:
```
📄 Generación de PDF
Datos a rellenar: {...}
Cargando PDF desde: /Hoja_de_personaje_Editable.pdf
PDF cargado. Total de campos: [número]
...
✅ TextField "CharacterName" = "Elara Moonwhisper"
✅ TextField "STRscore" = "10"
...
📊 Resumen:
  ✅ Campos rellenados correctamente: [número]
  ⚠️ Campos no encontrados: [número]
```

3. **Si hay errores**, la consola mostrará:
```
⚠️ Campo "[nombre]" no encontrado o error al rellenar.
```

### 6. **Pruebas de validación**

Intenta generar el PDF sin completar campos obligatorios:

- [ ] Sin nombre → Debe mostrar alerta: "⚠️ Por favor, introduce el nombre del personaje..."
- [ ] Sin clase → Debe mostrar alerta: "⚠️ Por favor, introduce la clase del personaje..."

## 🐛 Problemas comunes y soluciones

### Problema: "No se pudo cargar el PDF"
**Solución:** Verifica que el archivo `Hoja_de_personaje_Editable.pdf` está en la carpeta `/public/`

### Problema: Muchos campos con "⚠️ no encontrado"
**Solución:** Los nombres de los campos en el código deben coincidir EXACTAMENTE con los del PDF. Usa las herramientas de desarrollo para ver los nombres correctos.

### Problema: El PDF se abre vacío
**Solución:** 
1. Verifica que el PDF original tiene campos editables
2. Revisa la consola para ver qué campos se rellenaron correctamente

### Problema: Los números aparecen como "NaN"
**Solución:** Asegúrate de que las estadísticas tienen valores numéricos válidos (no strings vacíos)

## 📊 Cálculos importantes a verificar

### Bono de Competencia
- Nivel 1-4: +2
- Nivel 5-8: +3
- Nivel 9-12: +4
- Nivel 13-16: +5
- Nivel 17-20: +6

### Modificador de Estadística
```
Modificador = floor((Estadística - 10) / 2)

Ejemplos:
10 → +0
12 → +1
14 → +2
16 → +3
18 → +4
```

### Bono de Habilidad
```
Bono = Modificador de Estadística + (Competente ? Bono de Competencia : 0)

Ejemplo con Perspicacia (WIS):
- WIS = 18 → Modificador +4
- Competente en Insight
- Nivel 3 → Bono +2
- Total: 4 + 2 = +6
```

### Percepción Pasiva
```
PWP = 10 + Bono de Percepción

Ejemplo:
- Percepción: +4 (solo modificador WIS)
- PWP = 10 + 4 = 14
```

## ✅ Resultado final esperado

Si todo funciona correctamente:
1. ✅ El formulario se completa sin errores
2. ✅ El botón "Generar PDF" funciona
3. ✅ El PDF se abre en una nueva pestaña
4. ✅ Todos los campos están correctamente rellenados
5. ✅ Los cálculos son correctos (modificadores, bonos, etc.)
6. ✅ La consola muestra logs informativos sin errores críticos

---

**Fecha de prueba:** _________
**Resultado:** ☐ APROBADO  ☐ REQUIERE AJUSTES
**Notas adicionales:**

