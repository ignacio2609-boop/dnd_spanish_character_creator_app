import { defineStore } from 'pinia';
import {
  calculateInitialHitPoints,
  getHitDieDisplay,
  getClassLabel,
} from '@/services/HitDiceService';

// 1. DEFINICIONES DE TIPO Y CONSTANTES
export type StatKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export type SkillKey =
  | 'acrobatics' | 'animalHandling' | 'arcana' | 'athletics' | 'deception'
  | 'history' | 'insight' | 'intimidation' | 'investigation' | 'medicine'
  | 'nature' | 'perception' | 'performance' | 'persuasion' | 'religion'
  | 'sleightOfHand' | 'stealth' | 'survival';

// Array constante para iterar sin miedo a undefined
export const ALL_SKILLS: SkillKey[] = [
  'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception',
  'history', 'insight', 'intimidation', 'investigation', 'medicine',
  'nature', 'perception', 'performance', 'persuasion', 'religion',
  'sleightOfHand', 'stealth', 'survival'
];

const SKILL_ABILITY_MAP: Record<SkillKey, StatKey> = {
  acrobatics: 'dex', animalHandling: 'wis', arcana: 'int', athletics: 'str',
  deception: 'cha', history: 'int', insight: 'wis', intimidation: 'cha',
  investigation: 'int', medicine: 'wis', nature: 'int', perception: 'wis',
  performance: 'cha', persuasion: 'cha', religion: 'int', sleightOfHand: 'dex',
  stealth: 'dex', survival: 'wis',
};

export const useCharacterStore = defineStore('character', {
  state: () => ({
    concept: { name: '', playerName: '', class: '', level: 1, xp: 0 },
    background: { race: '', backgroundName: '', alignment: '' },

    // Inicializamos stats
    stats: {
      str: 10,
      dex: 10,
      con: 10,
      int: 10,
      wis: 10,
      cha: 10,
    } as Record<StatKey, number>,

    // Inicializamos Saving Throws
    savingThrows: {
      str: false,
      dex: false,
      con: false,
      int: false,
      wis: false,
      cha: false,
    } as Record<StatKey, boolean>,

    // Inicializamos skills (Todas a false por defecto)
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

    combat: {
      hpMax: 10,
      hpCurrent: 10,
      hitDiceTotal: '1d8',
      ac: 10,
      speed: 30,
      initiativeOverride: null as number | null,
    },

    spells: [] as string[],
  }),

  getters: {
    proficiencyBonus(state): number {
      return Math.ceil(state.concept.level / 4) + 1;
    },

    modifiers(state): Record<StatKey, number> {
      const mods = {} as Record<StatKey, number>;
      const statKeys: StatKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

      statKeys.forEach((key) => {
        mods[key] = Math.floor((state.stats[key] - 10) / 2);
      });
      return mods;
    },

    // ESTE ES EL GETTER QUE TE DABA PROBLEMAS
    // Ahora iteramos sobre la constante ALL_SKILLS y tipamos el retorno
    skillBonuses(state): Record<SkillKey, number> {
      // Accedemos a los modificadores a través de `this` (la instancia de la store)
      // Nota: En getters de Pinia, `this` refiere a la store completa
      const mods = this.modifiers;
      const prof = this.proficiencyBonus;
      const totals = {} as Record<SkillKey, number>;

      ALL_SKILLS.forEach((key) => {
        const ability = SKILL_ABILITY_MAP[key];
        const abilityMod = mods[ability];
        const isProficient = state.skills[key];

        totals[key] = abilityMod + (isProficient ? prof : 0);
      });

      return totals;
    },

    passivePerception(): number {
      // Calculamos basado en el bono de percepción que acabamos de generar
      return 10 + this.skillBonuses.perception;
    },

    savingThrowBonuses(state): Record<StatKey, number> {
      const mods = this.modifiers;
      const prof = this.proficiencyBonus;
      const totals = {} as Record<StatKey, number>;

      const statKeys: StatKey[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
      statKeys.forEach((key) => {
        const isProficient = state.savingThrows[key];
        totals[key] = mods[key] + (isProficient ? prof : 0);
      });

      return totals;
    },
  },

  actions: {
    updateCharacterClass(newClass: string) {
      this.concept.class = newClass;
      this.updateHitPoints();
    },

    updateHitPoints() {
      if (!this.concept.class || !this.stats.con) return;

      const constitutionMod = this.modifiers.con;
      this.combat.hpMax = calculateInitialHitPoints(this.concept.class, constitutionMod);
      this.combat.hpCurrent = this.combat.hpMax;
      this.combat.hitDiceTotal = getHitDieDisplay(this.concept.class);
    },

    getFormattedDataForPdf() {
      // Mapa final para el PDF basado en los campos REALES del PDF
      return {
        // --- INFORMACIÓN BÁSICA ---
        CharacterName: this.concept.name || '',
        PlayerName: this.concept.playerName || '',
        ClassLevel: this.concept.class
          ? `${getClassLabel(this.concept.class)} ${this.concept.level}`
          : '',

        // Dropdowns - Nombres exactos del PDF
        Race: this.background.race || '',
        Background: this.background.backgroundName || '',
        Alignment: this.background.alignment || '',
        ExperiencePoints: this.concept.xp || 0,

        // --- ESTADÍSTICAS (solo scores y checkboxes de salvación) ---
        STRscore: this.stats.str,
        STRsavePROF: this.savingThrows.str,

        DEXscore: this.stats.dex,
        DEXsavePROF: this.savingThrows.dex,

        CONscore: this.stats.con,
        CONsavePROF: this.savingThrows.con,

        INTscore: this.stats.int,
        INTsavePROF: this.savingThrows.int,

        WISscore: this.stats.wis,
        WISsavePROF: this.savingThrows.wis,

        CHAscore: this.stats.cha,
        CHAsavePROF: this.savingThrows.cha,

        // --- COMBATE ---
        ProfBonus: this.proficiencyBonus,
        HPMax: this.combat.hpMax,
        CurrentHP: this.combat.hpCurrent,
        TempHP: 0, // Temporal HP - inicialmente 0
        HitDiceTotal: this.combat.hitDiceTotal || '',
        AC: this.combat.ac,
        Init: this.combat.initiativeOverride ?? this.modifiers.dex, // Initiative
        Speed: this.combat.speed,
        PWP: this.passivePerception,

        // --- HABILIDADES (Skills) ---
        // Checkboxes de competencia
        acroPROF: this.skills.acrobatics,
        anhanPROF: this.skills.animalHandling,
        arcanaPROF: this.skills.arcana,
        athPROF: this.skills.athletics,
        decepPROF: this.skills.deception,
        histPROF: this.skills.history,
        insightPROF: this.skills.insight,
        intimPROF: this.skills.intimidation,
        investPROF: this.skills.investigation,
        medPROF: this.skills.medicine,
        naturePROF: this.skills.nature,
        perPROF: this.skills.perception,
        perfPROF: this.skills.performance,
        persPROF: this.skills.persuasion,
        religPROF: this.skills.religion,
        sohPROF: this.skills.sleightOfHand,
        stealthPROF: this.skills.stealth,
        survPROF: this.skills.survival,

        // Bonos totales de habilidades
        Acrobatics: this.skillBonuses.acrobatics,
        AnHan: this.skillBonuses.animalHandling,
        Arcana: this.skillBonuses.arcana,
        Athletics: this.skillBonuses.athletics,
        Deception: this.skillBonuses.deception,
        History: this.skillBonuses.history,
        Insight: this.skillBonuses.insight,
        Intimidation: this.skillBonuses.intimidation,
        Investigation: this.skillBonuses.investigation,
        Medicine: this.skillBonuses.medicine,
        Nature: this.skillBonuses.nature,
        Perception: this.skillBonuses.perception,
        Performance: this.skillBonuses.performance,
        Persuasion: this.skillBonuses.persuasion,
        Religion: this.skillBonuses.religion,
        SleightofHand: this.skillBonuses.sleightOfHand,
        Stealth: this.skillBonuses.stealth,
        Survival: this.skillBonuses.survival,

        // --- SALVACIONES (Bonos totales calculados) ---
        STRsave: this.savingThrowBonuses.str,
        DEXsave: this.savingThrowBonuses.dex,
        CONsave: this.savingThrowBonuses.con,
        INTsave: this.savingThrowBonuses.int,
        WISsave: this.savingThrowBonuses.wis,
        CHAsave: this.savingThrowBonuses.cha,

        // --- CONJUROS ---
        ...this._getSpellMap(),
      };
    },

    _getSpellMap() {
      const map: Record<string, string> = {};
      let currentSpellId = 92;
      this.spells.forEach((spellName) => {
        if (spellName) {
          map[`Spells${currentSpellId}`] = spellName;
          currentSpellId++;
        }
      });
      return map;
    },
  },
});
