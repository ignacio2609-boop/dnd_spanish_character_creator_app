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
      // Mapa final para el PDF
      return {
        // --- TEXTOS BÁSICOS ---
        CharacterName: this.concept.name || '',
        PlayerName: this.concept.playerName || '',
        ClassLevel: this.concept.class
          ? `${getClassLabel(this.concept.class)} ${this.concept.level}`
          : '',
        RaceSelect: this.background.race || '',
        BackgroundSelect: this.background.backgroundName || '',
        AlignmentSelect: this.background.alignment || '',
        XP: this.concept.xp || 0,

        // --- ESTADÍSTICAS (Scores y Modificadores) ---
        STRscore: this.stats.str,
        STRmod: this.modifiers.str,
        STRsave: this.savingThrowBonuses.str,
        STRsavePROF: this.savingThrows.str,

        DEXscore: this.stats.dex,
        DEXmod: this.modifiers.dex,
        DEXsave: this.savingThrowBonuses.dex,
        DEXsavePROF: this.savingThrows.dex,

        CONscore: this.stats.con,
        CONmod: this.modifiers.con,
        CONsave: this.savingThrowBonuses.con,
        CONsavePROF: this.savingThrows.con,

        INTscore: this.stats.int,
        INTmod: this.modifiers.int,
        INTsave: this.savingThrowBonuses.int,
        INTsavePROF: this.savingThrows.int,

        WISscore: this.stats.wis,
        WISmod: this.modifiers.wis,
        WISsave: this.savingThrowBonuses.wis,
        WISsavePROF: this.savingThrows.wis,

        CHAscore: this.stats.cha,
        CHAmod: this.modifiers.cha,
        CHAsave: this.savingThrowBonuses.cha,
        CHAsavePROF: this.savingThrows.cha,

        // --- EXTRAS DE COMBATE Y HABILIDAD ---
        ProfBonus: this.proficiencyBonus,
        HPMax: this.combat.hpMax,
        HPCurrent: this.combat.hpCurrent,
        HitDiceTotal: this.combat.hitDiceTotal || '',
        AC: this.combat.ac,
        Initiative: this.combat.initiativeOverride ?? this.modifiers.dex,
        Speed: this.combat.speed,
        PWP: this.passivePerception, // Passive Wisdom (Perception)

        // --- SKILLS (Competencias y Bonos Totales) ---
        acroPROF: this.skills.acrobatics,
        Acrobatics: this.skillBonuses.acrobatics,

        anhanPROF: this.skills.animalHandling,
        AnHan: this.skillBonuses.animalHandling,

        arcanaPROF: this.skills.arcana,
        Arcana: this.skillBonuses.arcana,

        athPROF: this.skills.athletics,
        Athletics: this.skillBonuses.athletics,

        decepPROF: this.skills.deception,
        Deception: this.skillBonuses.deception,

        histPROF: this.skills.history,
        History: this.skillBonuses.history,

        insightPROF: this.skills.insight,
        Insight: this.skillBonuses.insight,

        intimPROF: this.skills.intimidation,
        Intimidation: this.skillBonuses.intimidation,

        investPROF: this.skills.investigation,
        Investigation: this.skillBonuses.investigation,

        medPROF: this.skills.medicine,
        Medicine: this.skillBonuses.medicine,

        naturePROF: this.skills.nature,
        Nature: this.skillBonuses.nature,

        perPROF: this.skills.perception,
        Perception: this.skillBonuses.perception,

        perfPROF: this.skills.performance,
        Performance: this.skillBonuses.performance,

        persPROF: this.skills.persuasion,
        Persuasion: this.skillBonuses.persuasion,

        religPROF: this.skills.religion,
        Religion: this.skillBonuses.religion,

        sohPROF: this.skills.sleightOfHand,
        SleightofHand: this.skillBonuses.sleightOfHand,

        stealthPROF: this.skills.stealth,
        Stealth: this.skillBonuses.stealth,

        survPROF: this.skills.survival,
        Survival: this.skillBonuses.survival,

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
