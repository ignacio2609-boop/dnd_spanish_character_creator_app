import { defineStore } from 'pinia';

// Tipos definidos anteriormente...
export type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type SkillKey =
  | 'acrobatics'
  | 'animalHandling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleightOfHand'
  | 'stealth'
  | 'survival';

// Mapa Habilidad -> Atributo
const SKILL_ABILITY_MAP: Record<SkillKey, StatKey> = {
  acrobatics: 'dex',
  animalHandling: 'wis',
  arcana: 'int',
  athletics: 'str',
  deception: 'cha',
  history: 'int',
  insight: 'wis',
  intimidation: 'cha',
  investigation: 'int',
  medicine: 'wis',
  nature: 'int',
  perception: 'wis',
  performance: 'cha',
  persuasion: 'cha',
  religion: 'int',
  sleightOfHand: 'dex',
  stealth: 'dex',
  survival: 'wis',
};

export const useCharacterStore = defineStore('character', {
  state: () => ({
    // 1. CONCEPT (Nombre y Nivel)
    concept: {
      name: '',
      playerName: '',
      class: '',
      level: 1,
      xp: 0,
    },
    // 2. BACKGROUND (Raza, Trasfondo, Alineamiento - SEPARADO como pediste)
    background: {
      race: '',
      backgroundName: '',
      alignment: '',
    },
    // 3. STATS (Atributos base)
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    } as Record<StatKey, number>,
    // 4. SKILLS (Competencias)
    skills: {
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false,
    } as Record<SkillKey, boolean>,
    // 5. MAGIC (Lista de nombres de conjuros)
    spells: [] as string[], // Guardaremos nombres: ["Bola de Fuego", "Escudo"]
  }),

  getters: {
    proficiencyBonus(state): number {
      return Math.ceil(state.concept.level / 4) + 1;
    },
    modifiers(state): Record<StatKey, number> {
      const mods = {} as Record<StatKey, number>;
      (Object.keys(state.stats) as StatKey[]).forEach((key) => {
        mods[key] = Math.floor((state.stats[key] - 10) / 2);
      });
      return mods;
    },
    skillBonuses(): Record<SkillKey, number> {
      const totals = {} as Record<SkillKey, number>;
      (Object.keys(this.skills) as SkillKey[]).forEach((key) => {
        const ability = SKILL_ABILITY_MAP[key];
        const abilityMod = this.modifiers[ability] || 0;
        const profBonus = this.skills[key] ? this.proficiencyBonus : 0;
        totals[key] = abilityMod + profBonus;
      });
      return totals;
    },
  },

  actions: {
    // Aquí ocurre la magia del mapeo con tus IDs específicos
    getFormattedDataForPdf() {
      // 1. Datos Base
      const data: Record<string, string | number | boolean> = {
        // IDs estándar (asumidos, corrige si tu inspector dice otro)
        CharacterName: this.concept.name,
        PlayerName: this.concept.playerName,
        ClassLevel: `${this.concept.class} ${this.concept.level}`,
        Race: this.background.race,
        Background: this.background.backgroundName, // Ojo, a veces el ID es 'Background'
        Alignment: this.background.alignment,

        // Atributos y Modificadores
        STR: this.stats.str,
        STRmod: this.modifiers.str,
        DEX: this.stats.dex,
        DEXmod: this.modifiers.dex,
        CON: this.stats.con,
        CONmod: this.modifiers.con,
        INT: this.stats.int,
        INTmod: this.modifiers.int,
        WIS: this.stats.wis,
        WISmod: this.modifiers.wis,
        CHA: this.stats.cha,
        CHAmid: this.modifiers.cha, // A veces es CHAmid por error en el PDF original

        // HABILIDADES (Usando los IDs que viste en el inspector: AnHan, Athletics)
        // Como son ReadOnly, pasamos el VALOR NUMÉRICO calculado
        Athletics: this.skillBonuses.athletics,
        AnHan: this.skillBonuses.animalHandling,
        // ... Tendrás que buscar los IDs cortos para el resto (ej: 'Arcana', 'Hist', etc.)
        // Si no tienes el ID corto, prueba el nombre completo en inglés.
        // Acrobatics: this.skillBonuses.acrobatics,
        //   AnimalHandling: this.skillBonuses.animalHandling,
        //   Arcana: this.skillBonuses.arcana,
        //   Athletics: this.skillBonuses.athletics,
        //   Deception: this.skillBonuses.deception,
        //   History: this.skillBonuses.history,
        //   Insight: this.skillBonuses.insight,
        //   Intimidation: this.skillBonuses.intimidation,
        //   Investigation: this.skillBonuses.investigation,
        //   Medicine: this.skillBonuses.medicine,
        //   Nature: this.skillBonuses.nature,
        //   Perception: this.skillBonuses.perception,
        //   Performance: this.skillBonuses.performance,
        //   Persuasion: this.skillBonuses.persuasion,
        //   Religion: this.skillBonuses.religion,
        //   SleightOfHand: this.skillBonuses.sleightOfHand,
        //   Stealth: this.skillBonuses.stealth,
        //   Survival: this.skillBonuses.survival,
      };

      // 2. Mapeo de Conjuros (Llenar Spells92, Spells93, etc.)
      // Empezamos en el ID 92 según tu log
      let currentSpellId = 92;

      this.spells.forEach((spellName) => {
        // Creamos la clave dinámica: "Spells92", "Spells93"...
        const pdfKey = `Spells${currentSpellId}`;
        data[pdfKey] = spellName;
        currentSpellId++;
      });

      return data;
    },
  },
});
