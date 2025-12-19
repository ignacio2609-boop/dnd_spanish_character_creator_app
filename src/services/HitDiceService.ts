export type HitDieType = 'd6' | 'd8' | 'd10' | 'd12';

export interface ClassInfo {
  name: string;
  hitDie: HitDieType;
  maxHitDie: number; // Valor máximo del dado
}

// Mapeo de clases con sus dados de golpe
export const CLASS_HIT_DICE: Record<string, ClassInfo> = {
  barbaro: {
    name: 'Bárbaro',
    hitDie: 'd12',
    maxHitDie: 12,
  },
  bardo: {
    name: 'Bardo',
    hitDie: 'd8',
    maxHitDie: 8,
  },
  brujo: {
    name: 'Brujo',
    hitDie: 'd8',
    maxHitDie: 8,
  },
  clerigo: {
    name: 'Clérigo',
    hitDie: 'd8',
    maxHitDie: 8,
  },
  druida: {
    name: 'Druida',
    hitDie: 'd8',
    maxHitDie: 8,
  },
  explorador: {
    name: 'Explorador',
    hitDie: 'd10',
    maxHitDie: 10,
  },
  guerrero: {
    name: 'Guerrero',
    hitDie: 'd10',
    maxHitDie: 10,
  },
  mago: {
    name: 'Mago',
    hitDie: 'd6',
    maxHitDie: 6,
  },
  monje: {
    name: 'Monje',
    hitDie: 'd8',
    maxHitDie: 8,
  },
  paladin: {
    name: 'Paladín',
    hitDie: 'd10',
    maxHitDie: 10,
  },
  picaro: {
    name: 'Pícaro',
    hitDie: 'd8',
    maxHitDie: 8,
  },
};

// Lista de clases para usar en select
export const CHARACTER_CLASSES = Object.entries(CLASS_HIT_DICE).map(([key, info]) => ({
  value: key,
  label: info.name,
  hitDie: info.hitDie,
  maxHitDie: info.maxHitDie,
}));

/**
 * Obtiene la información del dado de golpe para una clase
 */
export function getHitDieForClass(characterClass: string): ClassInfo | null {
  const normalizedClass = characterClass.toLowerCase().trim();
  return CLASS_HIT_DICE[normalizedClass] || null;
}

/**
 * Calcula los puntos de golpe iniciales (nivel 1)
 * En nivel 1, el personaje obtiene el máximo del dado + modificador de Constitución
 */
export function calculateInitialHitPoints(
  characterClass: string,
  constitutionModifier: number
): number {
  const classInfo = getHitDieForClass(characterClass);
  if (!classInfo) return 0;

  return classInfo.maxHitDie + constitutionModifier;
}

/**
 * Calcula el modificador de habilidad según la puntuación
 */
export function calculateAbilityModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

/**
 * Obtiene el dado de golpe como string formateado
 */
export function getHitDieDisplay(characterClass: string): string {
  const classInfo = getHitDieForClass(characterClass);
  return classInfo ? `1${classInfo.hitDie}` : '';
}

/**
 * Obtiene el nombre legible (label) de una clase desde su valor
 */
export function getClassLabel(characterClass: string): string {
  const classInfo = getHitDieForClass(characterClass);
  return classInfo ? classInfo.name : characterClass;
}

