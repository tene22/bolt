import type { Verb } from '@/types';

// ============================================================
// VERB DATABASE — French verbs that use ÊTRE as auxiliary
// ============================================================
// Each verb has full conjugations across 8 tenses.
// Conjugations use (e) notation for agreement where appropriate.

export const VERBS: Verb[] = [
  // ============================================================
  // ALLER
  // ============================================================
  {
    id: 'aller',
    infinitive: 'aller',
    english: 'to go',
    pastParticiple: 'allé',
    family: 'aller',
    core: true,
    mentalModel: 'vais → allais → irai → allé → aille',
    patternAnchors: ['vais', 'allais', 'irai', 'allé', 'aille'],
    note: 'Aller is highly irregular — its présent forms come from Latin "ambulare" while its futur comes from "ir". Despite being an -er verb, it does not follow the regular pattern.',
    conjugations: {
      présent: {
        je: 'vais', tu: 'vas', il: 'va',
        nous: 'allons', vous: 'allez', ils: 'vont',
      },
      imparfait: {
        je: 'allais', tu: 'allais', il: 'allait',
        nous: 'allions', vous: 'alliez', ils: 'allaient',
      },
      futur: {
        je: 'irai', tu: 'iras', il: 'ira',
        nous: 'irons', vous: 'irez', ils: 'iront',
      },
      'passé composé': {
        je: 'je suis allé(e)', tu: 'tu es allé(e)', il: 'il est allé',
        nous: 'nous sommes allé(e)s', vous: 'vous êtes allé(e)(s)', ils: 'ils sont allés',
      },
      'passé simple': {
        je: 'allai', tu: 'allas', il: 'alla',
        nous: 'allâmes', vous: 'allâtes', ils: 'allèrent',
      },
      conditionnel: {
        je: 'irais', tu: 'irais', il: 'irait',
        nous: 'irions', vous: 'iriez', ils: 'iraient',
      },
      subjonctif: {
        je: 'aille', tu: 'ailles', il: 'aille',
        nous: 'allions', vous: 'alliez', ils: 'aillent',
      },
      impératif: {
        tu: 'va', nous: 'allons', vous: 'allez',
      },
    },
    examples: [
      { fr: 'Je vais à Paris.', en: 'I am going to Paris.' },
      { fr: 'Je suis allé au cinéma hier.', en: 'I went to the cinema yesterday.' },
      { fr: 'J\'irai demain.', en: 'I will go tomorrow.' },
      { fr: 'J\'allais souvent là-bas.', en: 'I used to go there often.' },
    ],
  },

  // ============================================================
  // VENIR family
  // ============================================================
  {
    id: 'venir',
    infinitive: 'venir',
    english: 'to come',
    pastParticiple: 'venu',
    family: 'venir',
    core: true,
    mentalModel: 'viens → venais → viendrai → venu → vienne',
    patternAnchors: ['viens', 'venais', 'viendrai', 'venu', 'vienne'],
    note: 'The stem pattern: "vienn-" in présent (singular), "ven-" in imparfait, "viendr-" in futur, "venu" as participle, "vienn-" in subjonctif.',
    conjugations: {
      présent: {
        je: 'viens', tu: 'viens', il: 'vient',
        nous: 'venons', vous: 'venez', ils: 'viennent',
      },
      imparfait: {
        je: 'venais', tu: 'venais', il: 'venait',
        nous: 'venions', vous: 'veniez', ils: 'venaient',
      },
      futur: {
        je: 'viendrai', tu: 'viendras', il: 'viendra',
        nous: 'viendrons', vous: 'viendrez', ils: 'viendront',
      },
      'passé composé': {
        je: 'je suis venu(e)', tu: 'tu es venu(e)', il: 'il est venu',
        nous: 'nous sommes venu(e)s', vous: 'vous êtes venu(e)(s)', ils: 'ils sont venus',
      },
      'passé simple': {
        je: 'vins', tu: 'vins', il: 'vint',
        nous: 'vînmes', vous: 'vîntes', ils: 'vinrent',
      },
      conditionnel: {
        je: 'viendrais', tu: 'viendrais', il: 'viendrait',
        nous: 'viendrions', vous: 'viendriez', ils: 'viendraient',
      },
      subjonctif: {
        je: 'vienne', tu: 'viennes', il: 'vienne',
        nous: 'venions', vous: 'veniez', ils: 'viennent',
      },
      impératif: {
        tu: 'viens', nous: 'venons', vous: 'venez',
      },
    },
    examples: [
      { fr: 'Je viens demain.', en: 'I am coming tomorrow.' },
      { fr: 'Je suis venu hier.', en: 'I came yesterday.' },
      { fr: 'Je viendrai la semaine prochaine.', en: 'I will come next week.' },
      { fr: 'Je venais souvent ici.', en: 'I used to come here often.' },
    ],
  },
  {
    id: 'revenir',
    infinitive: 'revenir',
    english: 'to come back / to return',
    pastParticiple: 'revenu',
    family: 'venir',
    core: true,
    mentalModel: 'reviens → revenais → reviendrai → revenu → revienne',
    patternAnchors: ['reviens', 'revenais', 'reviendrai', 'revenu', 'revienne'],
    note: 'Just venir with "re-" (again). Same stem pattern throughout.',
    conjugations: {
      présent: {
        je: 'reviens', tu: 'reviens', il: 'revient',
        nous: 'revenons', vous: 'revenez', ils: 'reviennent',
      },
      imparfait: {
        je: 'revenais', tu: 'revenais', il: 'revenait',
        nous: 'revenions', vous: 'reveniez', ils: 'revenaient',
      },
      futur: {
        je: 'reviendrai', tu: 'reviendras', il: 'reviendra',
        nous: 'reviendrons', vous: 'reviendrez', ils: 'reviendront',
      },
      'passé composé': {
        je: 'je suis revenu(e)', tu: 'tu es revenu(e)', il: 'il est revenu',
        nous: 'nous sommes revenu(e)s', vous: 'vous êtes revenu(e)(s)', ils: 'ils sont revenus',
      },
      'passé simple': {
        je: 'revins', tu: 'revins', il: 'revint',
        nous: 'revînmes', vous: 'revîntes', ils: 'revinrent',
      },
      conditionnel: {
        je: 'reviendrais', tu: 'reviendrais', il: 'reviendrait',
        nous: 'reviendrions', vous: 'reviendriez', ils: 'reviendraient',
      },
      subjonctif: {
        je: 'revienne', tu: 'reviennes', il: 'revienne',
        nous: 'revenions', vous: 'reveniez', ils: 'reviennent',
      },
      impératif: {
        tu: 'reviens', nous: 'revenons', vous: 'revenez',
      },
    },
    examples: [
      { fr: 'Je reviens bientôt.', en: 'I will be back soon.' },
      { fr: 'Je suis revenu de Paris.', en: 'I came back from Paris.' },
      { fr: 'Il reviendra demain.', en: 'He will return tomorrow.' },
      { fr: 'Je revenais chaque été.', en: 'I used to come back every summer.' },
    ],
  },
  {
    id: 'devenir',
    infinitive: 'devenir',
    english: 'to become',
    pastParticiple: 'devenu',
    family: 'venir',
    core: true,
    mentalModel: 'deviens → devenais → deviendrai → devenu → devienne',
    patternAnchors: ['deviens', 'devenais', 'deviendrai', 'devenu', 'devienne'],
    note: 'Just venir with "de-" (from). Same stem pattern throughout.',
    conjugations: {
      présent: {
        je: 'deviens', tu: 'deviens', il: 'devient',
        nous: 'devenons', vous: 'devenez', ils: 'deviennent',
      },
      imparfait: {
        je: 'devenais', tu: 'devenais', il: 'devenait',
        nous: 'devenions', vous: 'deveniez', ils: 'devenaient',
      },
      futur: {
        je: 'deviendrai', tu: 'deviendras', il: 'deviendra',
        nous: 'deviendrons', vous: 'deviendrez', ils: 'deviendront',
      },
      'passé composé': {
        je: 'je suis devenu(e)', tu: 'tu es devenu(e)', il: 'il est devenu',
        nous: 'nous sommes devenu(e)s', vous: 'vous êtes devenu(e)(s)', ils: 'ils sont devenus',
      },
      'passé simple': {
        je: 'devins', tu: 'devins', il: 'devint',
        nous: 'devînmes', vous: 'devîntes', ils: 'devinrent',
      },
      conditionnel: {
        je: 'deviendrais', tu: 'deviendrais', il: 'deviendrait',
        nous: 'deviendrions', vous: 'deviendriez', ils: 'deviendraient',
      },
      subjonctif: {
        je: 'devienne', tu: 'deviennes', il: 'devienne',
        nous: 'devenions', vous: 'deveniez', ils: 'deviennent',
      },
      impératif: {
        tu: 'deviens', nous: 'devenons', vous: 'devenez',
      },
    },
    examples: [
      { fr: 'Il est devenu médecin.', en: 'He became a doctor.' },
      { fr: 'Je deviens impatient.', en: 'I am becoming impatient.' },
      { fr: 'Elle deviendra célèbre.', en: 'She will become famous.' },
      { fr: 'Je devenais nerveux.', en: 'I was getting nervous.' },
    ],
  },
  {
    id: 'parvenir',
    infinitive: 'parvenir',
    english: 'to achieve / to manage (to)',
    pastParticiple: 'parvenu',
    family: 'venir',
    mentalModel: 'parviens → parvenais → parviendrai → parvenu → parvienne',
    patternAnchors: ['parviens', 'parvenais', 'parviendrai', 'parvenu', 'parvienne'],
    note: 'venir with "par-" (through). Same stem pattern throughout.',
    conjugations: {
      présent: {
        je: 'parviens', tu: 'parviens', il: 'parvient',
        nous: 'parvenons', vous: 'parvenez', ils: 'parviennent',
      },
      imparfait: {
        je: 'parvenais', tu: 'parvenais', il: 'parvenait',
        nous: 'parvenions', vous: 'parveniez', ils: 'parvenaient',
      },
      futur: {
        je: 'parviendrai', tu: 'parviendras', il: 'parviendra',
        nous: 'parviendrons', vous: 'parviendrez', ils: 'parviendront',
      },
      'passé composé': {
        je: 'je suis parvenu(e)', tu: 'tu es parvenu(e)', il: 'il est parvenu',
        nous: 'nous sommes parvenu(e)s', vous: 'vous êtes parvenu(e)(s)', ils: 'ils sont parvenus',
      },
      'passé simple': {
        je: 'parvins', tu: 'parvins', il: 'parvint',
        nous: 'parvînmes', vous: 'parvîntes', ils: 'parvinrent',
      },
      conditionnel: {
        je: 'parviendrais', tu: 'parviendrais', il: 'parviendrait',
        nous: 'parviendrions', vous: 'parviendriez', ils: 'parviendraient',
      },
      subjonctif: {
        je: 'parvienne', tu: 'parviennes', il: 'parvienne',
        nous: 'parvenions', vous: 'parveniez', ils: 'parviennent',
      },
      impératif: {
        tu: 'parviens', nous: 'parvenons', vous: 'parvenez',
      },
    },
    examples: [
      { fr: 'Je suis parvenu à le faire.', en: 'I managed to do it.' },
      { fr: 'Il parvient à ses fins.', en: 'He achieves his goals.' },
      { fr: 'Elle parviendra au sommet.', en: 'She will reach the top.' },
      { fr: 'Je parvenais à comprendre.', en: 'I was managing to understand.' },
    ],
  },
  {
    id: 'intervenir',
    infinitive: 'intervenir',
    english: 'to intervene',
    pastParticiple: 'intervenu',
    family: 'venir',
    mentalModel: 'interviens → intervenais → interviendrai → intervenu → intervienne',
    patternAnchors: ['interviens', 'intervenais', 'interviendrai', 'intervenu', 'intervienne'],
    note: 'venir with "inter-" (between). Same stem pattern throughout.',
    conjugations: {
      présent: {
        je: 'interviens', tu: 'interviens', il: 'intervient',
        nous: 'intervenons', vous: 'intervenez', ils: 'interviennent',
      },
      imparfait: {
        je: 'intervenais', tu: 'intervenais', il: 'intervenait',
        nous: 'intervenions', vous: 'interveniez', ils: 'intervenaient',
      },
      futur: {
        je: 'interviendrai', tu: 'interviendras', il: 'interviendra',
        nous: 'interviendrons', vous: 'interviendrez', ils: 'interviendront',
      },
      'passé composé': {
        je: 'je suis intervenu(e)', tu: 'tu es intervenu(e)', il: 'il est intervenu',
        nous: 'nous sommes intervenu(e)s', vous: 'vous êtes intervenu(e)(s)', ils: 'ils sont intervenus',
      },
      'passé simple': {
        je: 'intervins', tu: 'intervins', il: 'intervint',
        nous: 'intervînmes', vous: 'intervîntes', ils: 'intervinrent',
      },
      conditionnel: {
        je: 'interviendrais', tu: 'interviendrais', il: 'interviendrait',
        nous: 'interviendrions', vous: 'interviendriez', ils: 'interviendraient',
      },
      subjonctif: {
        je: 'intervienne', tu: 'interviennes', il: 'intervienne',
        nous: 'intervenions', vous: 'interveniez', ils: 'interviennent',
      },
      impératif: {
        tu: 'interviens', nous: 'intervenons', vous: 'intervenez',
      },
    },
    examples: [
      { fr: 'Il est intervenu dans le débat.', en: 'He intervened in the debate.' },
      { fr: 'J\'interviendrai si nécessaire.', en: 'I will intervene if necessary.' },
      { fr: 'La police est intervenue.', en: 'The police intervened.' },
      { fr: 'J\'intervenais souvent.', en: 'I used to intervene often.' },
    ],
  },
  {
    id: 'survenir',
    infinitive: 'survenir',
    english: 'to happen unexpectedly / to arise',
    pastParticiple: 'survenu',
    family: 'venir',
    mentalModel: 'surviens → survenais → surviendrai → survenu → survienne',
    patternAnchors: ['surviens', 'survenais', 'surviendrai', 'survenu', 'survienne'],
    note: 'venir with "sur-" (upon). Typically used in the third person.',
    conjugations: {
      présent: {
        je: 'surviens', tu: 'surviens', il: 'survient',
        nous: 'survenons', vous: 'survenez', ils: 'surviennent',
      },
      imparfait: {
        je: 'survenais', tu: 'survenais', il: 'survenait',
        nous: 'survenions', vous: 'surveniez', ils: 'survenaient',
      },
      futur: {
        je: 'surviendrai', tu: 'surviendras', il: 'surviendra',
        nous: 'surviendrons', vous: 'surviendrez', ils: 'surviendront',
      },
      'passé composé': {
        je: 'je suis survenu(e)', tu: 'tu es survenu(e)', il: 'il est survenu',
        nous: 'nous sommes survenu(e)s', vous: 'vous êtes survenu(e)(s)', ils: 'ils sont survenus',
      },
      'passé simple': {
        je: 'survins', tu: 'survins', il: 'survint',
        nous: 'survînmes', vous: 'survîntes', ils: 'survinrent',
      },
      conditionnel: {
        je: 'surviendrais', tu: 'surviendrais', il: 'surviendrait',
        nous: 'surviendrions', vous: 'surviendriez', ils: 'surviendraient',
      },
      subjonctif: {
        je: 'survienne', tu: 'surviennes', il: 'survienne',
        nous: 'survenions', vous: 'surveniez', ils: 'surviennent',
      },
      impératif: {
        tu: 'surviens', nous: 'survenons', vous: 'survenez',
      },
    },
    examples: [
      { fr: 'Un accident est survenu.', en: 'An accident occurred.' },
      { fr: 'Il survient souvent des problèmes.', en: 'Problems often arise.' },
      { fr: 'Rien n\'est survenu.', en: 'Nothing happened.' },
      { fr: 'Il survenait toujours quelque chose.', en: 'Something always came up.' },
    ],
  },
  {
    id: 'redevenir',
    infinitive: 'redevenir',
    english: 'to become again',
    pastParticiple: 'redevenu',
    family: 'venir',
    mentalModel: 'redeviens → redevenais → redeviendrai → redevenu → redevienne',
    patternAnchors: ['redeviens', 'redevenais', 'redeviendrai', 'redevenu', 'redevienne'],
    note: 'venir with "re-" + "de-". Same stem pattern throughout.',
    conjugations: {
      présent: {
        je: 'redeviens', tu: 'redeviens', il: 'redevient',
        nous: 'redevenons', vous: 'redevenez', ils: 'redeviennent',
      },
      imparfait: {
        je: 'redevenais', tu: 'redevenais', il: 'redevenait',
        nous: 'redevenions', vous: 'redeveniez', ils: 'redevenaient',
      },
      futur: {
        je: 'redeviendrai', tu: 'redeviendras', il: 'redeviendra',
        nous: 'redeviendrons', vous: 'redeviendrez', ils: 'redeviendront',
      },
      'passé composé': {
        je: 'je suis redevenu(e)', tu: 'tu es redevenu(e)', il: 'il est redevenu',
        nous: 'nous sommes redevenu(e)s', vous: 'vous êtes redevenu(e)(s)', ils: 'ils sont redevenus',
      },
      'passé simple': {
        je: 'redevins', tu: 'redevins', il: 'redevint',
        nous: 'redevînmes', vous: 'redevîntes', ils: 'redevinrent',
      },
      conditionnel: {
        je: 'redeviendrais', tu: 'redeviendrais', il: 'redeviendrait',
        nous: 'redeviendrions', vous: 'redeviendriez', ils: 'redeviendraient',
      },
      subjonctif: {
        je: 'redevienne', tu: 'redeviennes', il: 'redevienne',
        nous: 'redevenions', vous: 'redeveniez', ils: 'redeviennent',
      },
      impératif: {
        tu: 'redeviens', nous: 'redevenons', vous: 'redevenez',
      },
    },
    examples: [
      { fr: 'Il est redevenu calme.', en: 'He became calm again.' },
      { fr: 'Je redeviens moi-même.', en: 'I am becoming myself again.' },
      { fr: 'Elle redeviendra célèbre.', en: 'She will become famous again.' },
      { fr: 'Je redevenais prudent.', en: 'I was becoming cautious again.' },
    ],
  },

  // ============================================================
  // PARTIR / SORTIR family
  // ============================================================
  {
    id: 'partir',
    infinitive: 'partir',
    english: 'to leave',
    pastParticiple: 'parti',
    family: 'partir-sortir',
    core: true,
    mentalModel: 'pars → partais → partirai → parti → parte',
    patternAnchors: ['pars', 'partais', 'partirai', 'parti', 'parte'],
    note: '-tir verbs: stem loses the "t" in singular présent forms (je pars, tu pars, il part) but keeps it elsewhere.',
    conjugations: {
      présent: {
        je: 'pars', tu: 'pars', il: 'part',
        nous: 'partons', vous: 'partez', ils: 'partent',
      },
      imparfait: {
        je: 'partais', tu: 'partais', il: 'partait',
        nous: 'partions', vous: 'partiez', ils: 'partaient',
      },
      futur: {
        je: 'partirai', tu: 'partiras', il: 'partira',
        nous: 'partirons', vous: 'partirez', ils: 'partiront',
      },
      'passé composé': {
        je: 'je suis parti(e)', tu: 'tu es parti(e)', il: 'il est parti',
        nous: 'nous sommes parti(e)s', vous: 'vous êtes parti(e)(s)', ils: 'ils sont partis',
      },
      'passé simple': {
        je: 'partis', tu: 'partis', il: 'partit',
        nous: 'partîmes', vous: 'partîtes', ils: 'partirent',
      },
      conditionnel: {
        je: 'partirais', tu: 'partirais', il: 'partirait',
        nous: 'partirions', vous: 'partiriez', ils: 'partiraient',
      },
      subjonctif: {
        je: 'parte', tu: 'partes', il: 'parte',
        nous: 'partions', vous: 'partiez', ils: 'partent',
      },
      impératif: {
        tu: 'pars', nous: 'partons', vous: 'partez',
      },
    },
    examples: [
      { fr: 'Je pars demain.', en: 'I am leaving tomorrow.' },
      { fr: 'Je suis parti de bonne heure.', en: 'I left early.' },
      { fr: 'Je partirai à 8h.', en: 'I will leave at 8 o\'clock.' },
      { fr: 'Je partais souvent le vendredi.', en: 'I used to leave often on Fridays.' },
    ],
  },
  {
    id: 'sortir',
    infinitive: 'sortir',
    english: 'to go out / to take out',
    pastParticiple: 'sorti',
    family: 'partir-sortir',
    core: true,
    mentalModel: 'sors → sortais → sortirai → sorti → sorte',
    patternAnchors: ['sors', 'sortais', 'sortirai', 'sorti', 'sorte'],
    note: 'Same pattern as partir. Can use avoir when it has a direct object (see Être vs Avoir section).',
    dualAuxiliary: {
      meaning: 'sortir can use être (to go out) or avoir (to take something out), depending on whether it has a direct object.',
      êtreExample: 'Je suis sorti.',
      êtreTranslation: 'I went out.',
      avoirExample: 'J\'ai sorti la voiture.',
      avoirTranslation: 'I took the car out.',
    },
    conjugations: {
      présent: {
        je: 'sors', tu: 'sors', il: 'sort',
        nous: 'sortons', vous: 'sortez', ils: 'sortent',
      },
      imparfait: {
        je: 'sortais', tu: 'sortais', il: 'sortait',
        nous: 'sortions', vous: 'sortiez', ils: 'sortaient',
      },
      futur: {
        je: 'sortirai', tu: 'sortiras', il: 'sortira',
        nous: 'sortirons', vous: 'sortirez', ils: 'sortiront',
      },
      'passé composé': {
        je: 'je suis sorti(e)', tu: 'tu es sorti(e)', il: 'il est sorti',
        nous: 'nous sommes sorti(e)s', vous: 'vous êtes sorti(e)(s)', ils: 'ils sont sortis',
      },
      'passé simple': {
        je: 'sortis', tu: 'sortis', il: 'sortit',
        nous: 'sortîmes', vous: 'sortîtes', ils: 'sortirent',
      },
      conditionnel: {
        je: 'sortirais', tu: 'sortirais', il: 'sortirait',
        nous: 'sortirions', vous: 'sortiriez', ils: 'sortiraient',
      },
      subjonctif: {
        je: 'sorte', tu: 'sortes', il: 'sorte',
        nous: 'sortions', vous: 'sortiez', ils: 'sortent',
      },
      impératif: {
        tu: 'sors', nous: 'sortons', vous: 'sortez',
      },
    },
    examples: [
      { fr: 'Je sors ce soir.', en: 'I am going out tonight.' },
      { fr: 'Je suis sorti avec mes amis.', en: 'I went out with my friends.' },
      { fr: 'Je sortirai plus tard.', en: 'I will go out later.' },
      { fr: 'Je sortais souvent le soir.', en: 'I used to go out often in the evening.' },
    ],
  },
  {
    id: 'repartir',
    infinitive: 'repartir',
    english: 'to leave again / to set off again',
    pastParticiple: 'reparti',
    family: 'partir-sortir',
    mentalModel: 'repars → repartais → repartirai → reparti → reparte',
    patternAnchors: ['repars', 'repartais', 'repartirai', 'reparti', 'reparte'],
    note: 'partir with "re-" (again). Same stem pattern. Not to be confused with repartir (to reply), which uses avoir.',
    conjugations: {
      présent: {
        je: 'repars', tu: 'repars', il: 'repart',
        nous: 'repartons', vous: 'repartez', ils: 'repartent',
      },
      imparfait: {
        je: 'repartais', tu: 'repartais', il: 'repartait',
        nous: 'repartions', vous: 'repartiez', ils: 'repartaient',
      },
      futur: {
        je: 'repartirai', tu: 'repartiras', il: 'repartira',
        nous: 'repartirons', vous: 'repartirez', ils: 'repartiront',
      },
      'passé composé': {
        je: 'je suis reparti(e)', tu: 'tu es reparti(e)', il: 'il est reparti',
        nous: 'nous sommes reparti(e)s', vous: 'vous êtes reparti(e)(s)', ils: 'ils sont repartis',
      },
      'passé simple': {
        je: 'repartis', tu: 'repartis', il: 'repartit',
        nous: 'repartîmes', vous: 'repartîtes', ils: 'repartirent',
      },
      conditionnel: {
        je: 'repartirais', tu: 'repartirais', il: 'repartirait',
        nous: 'repartirions', vous: 'repartiriez', ils: 'repartiraient',
      },
      subjonctif: {
        je: 'reparte', tu: 'repartes', il: 'reparte',
        nous: 'repartions', vous: 'repartiez', ils: 'repartent',
      },
      impératif: {
        tu: 'repars', nous: 'repartons', vous: 'repartez',
      },
    },
    examples: [
      { fr: 'Je suis reparti de suite.', en: 'I left again immediately.' },
      { fr: 'Je repars demain.', en: 'I am leaving again tomorrow.' },
      { fr: 'Il repartira bientôt.', en: 'He will set off again soon.' },
      { fr: 'Je repartais chaque fois.', en: 'I would leave again each time.' },
    ],
  },
  {
    id: 'ressortir',
    infinitive: 'ressortir',
    english: 'to go out again / to leave again',
    pastParticiple: 'ressorti',
    family: 'partir-sortir',
    mentalModel: 'ressors → ressortais → ressortirai → ressorti → ressorte',
    patternAnchors: ['ressors', 'ressortais', 'ressortirai', 'ressorti', 'ressorte'],
    note: 'sortir with "re-" (again). Same stem pattern. Note: when ressortir means "to be relevant to", it uses avoir.',
    conjugations: {
      présent: {
        je: 'ressors', tu: 'ressors', il: 'ressort',
        nous: 'ressortons', vous: 'ressortez', ils: 'ressortent',
      },
      imparfait: {
        je: 'ressortais', tu: 'ressortais', il: 'ressortait',
        nous: 'ressortions', vous: 'ressortiez', ils: 'ressortaient',
      },
      futur: {
        je: 'ressortirai', tu: 'ressortiras', il: 'ressortira',
        nous: 'ressortirons', vous: 'ressortirez', ils: 'ressortiront',
      },
      'passé composé': {
        je: 'je suis ressorti(e)', tu: 'tu es ressorti(e)', il: 'il est ressorti',
        nous: 'nous sommes ressorti(e)s', vous: 'vous êtes ressorti(e)(s)', ils: 'ils sont ressortis',
      },
      'passé simple': {
        je: 'ressortis', tu: 'ressortis', il: 'ressortit',
        nous: 'ressortîmes', vous: 'ressortîtes', ils: 'ressortirent',
      },
      conditionnel: {
        je: 'ressortirais', tu: 'ressortirais', il: 'ressortirait',
        nous: 'ressortirions', vous: 'ressortiriez', ils: 'ressortiraient',
      },
      subjonctif: {
        je: 'ressorte', tu: 'ressortes', il: 'ressorte',
        nous: 'ressortions', vous: 'ressortiez', ils: 'ressortent',
      },
      impératif: {
        tu: 'ressors', nous: 'ressortons', vous: 'ressortez',
      },
    },
    examples: [
      { fr: 'Il est ressorti cinq minutes après.', en: 'He went out again five minutes later.' },
      { fr: 'Je ressors ce soir.', en: 'I am going out again tonight.' },
      { fr: 'Elle ressortira après manger.', en: 'She will go out again after eating.' },
      { fr: 'Je ressortais souvent.', en: 'I used to go out again often.' },
    ],
  },

  // ============================================================
  // Life / Death
  // ============================================================
  {
    id: 'naitre',
    infinitive: 'naître',
    english: 'to be born',
    pastParticiple: 'né',
    family: 'life-death',
    core: true,
    mentalModel: 'nais → naissais → naîtrai → né → naisse',
    patternAnchors: ['nais', 'naissais', 'naîtrai', 'né', 'naisse'],
    note: 'Note the circumflex in futur/simple (naîtr-) and double "s" in imparfait/subjonctif (naiss-).',
    conjugations: {
      présent: {
        je: 'nais', tu: 'nais', il: 'naît',
        nous: 'naissons', vous: 'naissez', ils: 'naissent',
      },
      imparfait: {
        je: 'naissais', tu: 'naissais', il: 'naissait',
        nous: 'naissions', vous: 'naissiez', ils: 'naissaient',
      },
      futur: {
        je: 'naîtrai', tu: 'naîtras', il: 'naîtra',
        nous: 'naîtrons', vous: 'naîtrez', ils: 'naîtront',
      },
      'passé composé': {
        je: 'je suis né(e)', tu: 'tu es né(e)', il: 'il est né',
        nous: 'nous sommes né(e)s', vous: 'vous êtes né(e)(s)', ils: 'ils sont nés',
      },
      'passé simple': {
        je: 'naquis', tu: 'naquis', il: 'naquit',
        nous: 'naquîmes', vous: 'naquîtes', ils: 'naquirent',
      },
      conditionnel: {
        je: 'naîtrais', tu: 'naîtrais', il: 'naîtrait',
        nous: 'naîtrions', vous: 'naîtriez', ils: 'naîtraient',
      },
      subjonctif: {
        je: 'naisse', tu: 'naisses', il: 'naisse',
        nous: 'naissions', vous: 'naissiez', ils: 'naissent',
      },
      impératif: {
        tu: 'nais', nous: 'naissons', vous: 'naissez',
      },
    },
    examples: [
      { fr: 'Je suis né en 1990.', en: 'I was born in 1990.' },
      { fr: 'Elle naît demain.', en: 'She is being born tomorrow.' },
      { fr: 'Il naîtra au printemps.', en: 'He will be born in the spring.' },
      { fr: 'Je naissais dans une petite ville.', en: 'I was born in a small town.' },
    ],
  },
  {
    id: 'mourir',
    infinitive: 'mourir',
    english: 'to die',
    pastParticiple: 'mort',
    family: 'life-death',
    core: true,
    mentalModel: 'meurs → mourais → mourrai → mort → meure',
    patternAnchors: ['meurs', 'mourais', 'mourrai', 'mort', 'meure'],
    note: 'Highly irregular: "meur-" in présent singular, "mour-" elsewhere, participle is "mort" (not *mouru). Futur has double "r": mourrai.',
    conjugations: {
      présent: {
        je: 'meurs', tu: 'meurs', il: 'meurt',
        nous: 'mourons', vous: 'mourez', ils: 'meurent',
      },
      imparfait: {
        je: 'mourais', tu: 'mourais', il: 'mourait',
        nous: 'mourions', vous: 'mouriez', ils: 'mouraient',
      },
      futur: {
        je: 'mourrai', tu: 'mourras', il: 'mourra',
        nous: 'mourrons', vous: 'mourrez', ils: 'mourront',
      },
      'passé composé': {
        je: 'je suis mort(e)', tu: 'tu es mort(e)', il: 'il est mort',
        nous: 'nous sommes mort(e)s', vous: 'vous êtes mort(e)(s)', ils: 'ils sont morts',
      },
      'passé simple': {
        je: 'mourus', tu: 'mourus', il: 'mourut',
        nous: 'mourûmes', vous: 'mourûtes', ils: 'moururent',
      },
      conditionnel: {
        je: 'mourrais', tu: 'mourrais', il: 'mourrait',
        nous: 'mourrions', vous: 'mourriez', ils: 'mourraient',
      },
      subjonctif: {
        je: 'meure', tu: 'meures', il: 'meure',
        nous: 'mourions', vous: 'mouriez', ils: 'meurent',
      },
      impératif: {
        tu: 'meurs', nous: 'mourons', vous: 'mourez',
      },
    },
    examples: [
      { fr: 'Il est mort en 1990.', en: 'He died in 1990.' },
      { fr: 'Le feu meurt lentement.', en: 'The fire is dying slowly.' },
      { fr: 'Il mourra un jour.', en: 'He will die one day.' },
      { fr: 'Les fleurs mouraient faute d\'eau.', en: 'The flowers were dying for lack of water.' },
    ],
  },

  // ============================================================
  // Regular -ER verbs (Family 1)
  // ============================================================
  {
    id: 'arriver',
    infinitive: 'arriver',
    english: 'to arrive',
    pastParticiple: 'arrivé',
    family: 'er-regular',
    core: true,
    mentalModel: 'arrive → arrivais → arriverai → arrivé → arrive',
    patternAnchors: ['arrive', 'arrivais', 'arriverai', 'arrivé', 'arrive'],
    conjugations: {
      présent: {
        je: 'arrive', tu: 'arrives', il: 'arrive',
        nous: 'arrivons', vous: 'arrivez', ils: 'arrivent',
      },
      imparfait: {
        je: 'arrivais', tu: 'arrivais', il: 'arrivait',
        nous: 'arrivions', vous: 'arriviez', ils: 'arrivaient',
      },
      futur: {
        je: 'arriverai', tu: 'arriveras', il: 'arrivera',
        nous: 'arriverons', vous: 'arriverez', ils: 'arriveront',
      },
      'passé composé': {
        je: 'je suis arrivé(e)', tu: 'tu es arrivé(e)', il: 'il est arrivé',
        nous: 'nous sommes arrivé(e)s', vous: 'vous êtes arrivé(e)(s)', ils: 'ils sont arrivés',
      },
      'passé simple': {
        je: 'arrivai', tu: 'arrivas', il: 'arriva',
        nous: 'arrivâmes', vous: 'arrivâtes', ils: 'arrivèrent',
      },
      conditionnel: {
        je: 'arriverais', tu: 'arriverais', il: 'arriverait',
        nous: 'arriverions', vous: 'arriveriez', ils: 'arriveraient',
      },
      subjonctif: {
        je: 'arrive', tu: 'arrives', il: 'arrive',
        nous: 'arrivions', vous: 'arriviez', ils: 'arrivent',
      },
      impératif: {
        tu: 'arrive', nous: 'arrivons', vous: 'arrivez',
      },
    },
    examples: [
      { fr: 'J\'arrive à 8h.', en: 'I arrive at 8 o\'clock.' },
      { fr: 'Je suis arrivé hier soir.', en: 'I arrived last night.' },
      { fr: 'J\'arriverai demain.', en: 'I will arrive tomorrow.' },
      { fr: 'J\'arrivais toujours en retard.', en: 'I used to always arrive late.' },
    ],
  },
  {
    id: 'entrer',
    infinitive: 'entrer',
    english: 'to enter / to go in',
    pastParticiple: 'entré',
    family: 'er-regular',
    core: true,
    mentalModel: 'entre → entrais → entrerai → entré → entre',
    patternAnchors: ['entre', 'entrais', 'entrerai', 'entré', 'entre'],
    conjugations: {
      présent: {
        je: 'entre', tu: 'entres', il: 'entre',
        nous: 'entrons', vous: 'entrez', ils: 'entrent',
      },
      imparfait: {
        je: 'entrais', tu: 'entrais', il: 'entrait',
        nous: 'entrions', vous: 'entriez', ils: 'entraient',
      },
      futur: {
        je: 'entrerai', tu: 'entreras', il: 'entrera',
        nous: 'entrerons', vous: 'entrerez', ils: 'entreront',
      },
      'passé composé': {
        je: 'je suis entré(e)', tu: 'tu es entré(e)', il: 'il est entré',
        nous: 'nous sommes entré(e)s', vous: 'vous êtes entré(e)(s)', ils: 'ils sont entrés',
      },
      'passé simple': {
        je: 'entrai', tu: 'entras', il: 'entra',
        nous: 'entrâmes', vous: 'entrâtes', ils: 'entrèrent',
      },
      conditionnel: {
        je: 'entrerais', tu: 'entrerais', il: 'entrerait',
        nous: 'entrerions', vous: 'entreriez', ils: 'entreraient',
      },
      subjonctif: {
        je: 'entre', tu: 'entres', il: 'entre',
        nous: 'entrions', vous: 'entriez', ils: 'entrent',
      },
      impératif: {
        tu: 'entre', nous: 'entrons', vous: 'entrez',
      },
    },
    examples: [
      { fr: 'J\'entre dans la pièce.', en: 'I enter the room.' },
      { fr: 'Je suis entré sans bruit.', en: 'I entered quietly.' },
      { fr: 'J\'entrerai par la porte.', en: 'I will enter through the door.' },
      { fr: 'J\'entrais souvent ici.', en: 'I used to often go in here.' },
    ],
  },
  {
    id: 'monter',
    infinitive: 'monter',
    english: 'to go up / to climb',
    pastParticiple: 'monté',
    family: 'er-regular',
    core: true,
    mentalModel: 'monte → montais → monterai → monté → monte',
    patternAnchors: ['monte', 'montais', 'monterai', 'monté', 'monte'],
    note: 'Can use avoir when it has a direct object (see Être vs Avoir section).',
    dualAuxiliary: {
      meaning: 'monter can use être (to go up) or avoir (to take something up), depending on whether it has a direct object.',
      êtreExample: 'Je suis monté.',
      êtreTranslation: 'I went up.',
      avoirExample: 'J\'ai monté les escaliers.',
      avoirTranslation: 'I went up the stairs.',
    },
    conjugations: {
      présent: {
        je: 'monte', tu: 'montes', il: 'monte',
        nous: 'montons', vous: 'montez', ils: 'montent',
      },
      imparfait: {
        je: 'montais', tu: 'montais', il: 'montait',
        nous: 'montions', vous: 'montiez', ils: 'montaient',
      },
      futur: {
        je: 'monterai', tu: 'monteras', il: 'montera',
        nous: 'monterons', vous: 'monterez', ils: 'monteront',
      },
      'passé composé': {
        je: 'je suis monté(e)', tu: 'tu es monté(e)', il: 'il est monté',
        nous: 'nous sommes monté(e)s', vous: 'vous êtes monté(e)(s)', ils: 'ils sont montés',
      },
      'passé simple': {
        je: 'montai', tu: 'montas', il: 'monta',
        nous: 'montâmes', vous: 'montâtes', ils: 'montèrent',
      },
      conditionnel: {
        je: 'monterais', tu: 'monterais', il: 'monterait',
        nous: 'monterions', vous: 'monteriez', ils: 'monteraient',
      },
      subjonctif: {
        je: 'monte', tu: 'montes', il: 'monte',
        nous: 'montions', vous: 'montiez', ils: 'montent',
      },
      impératif: {
        tu: 'monte', nous: 'montons', vous: 'montez',
      },
    },
    examples: [
      { fr: 'Je monte au premier étage.', en: 'I am going up to the first floor.' },
      { fr: 'Je suis monté tout en haut.', en: 'I went right to the top.' },
      { fr: 'Je monterai te voir.', en: 'I will come up to see you.' },
      { fr: 'Je montais souvent.', en: 'I used to go up often.' },
    ],
  },
  {
    id: 'descendre',
    infinitive: 'descendre',
    english: 'to go down / to descend',
    pastParticiple: 'descendu',
    family: 'er-regular',
    core: true,
    mentalModel: 'descends → descendais → descendrai → descendu → descende',
    patternAnchors: ['descends', 'descendais', 'descendrai', 'descendu', 'descende'],
    note: '-re verb with regular -er-like endings in présent. Can use avoir when it has a direct object.',
    dualAuxiliary: {
      meaning: 'descendre can use être (to go down) or avoir (to take something down), depending on whether it has a direct object.',
      êtreExample: 'Je suis descendu.',
      êtreTranslation: 'I went down.',
      avoirExample: 'J\'ai descendu les valises.',
      avoirTranslation: 'I brought the suitcases down.',
    },
    conjugations: {
      présent: {
        je: 'descends', tu: 'descends', il: 'descend',
        nous: 'descendons', vous: 'descendez', ils: 'descendent',
      },
      imparfait: {
        je: 'descendais', tu: 'descendais', il: 'descendait',
        nous: 'descendions', vous: 'descendiez', ils: 'descendaient',
      },
      futur: {
        je: 'descendrai', tu: 'descendras', il: 'descendra',
        nous: 'descendrons', vous: 'descendrez', ils: 'descendront',
      },
      'passé composé': {
        je: 'je suis descendu(e)', tu: 'tu es descendu(e)', il: 'il est descendu',
        nous: 'nous sommes descendu(e)s', vous: 'vous êtes descendu(e)(s)', ils: 'ils sont descendus',
      },
      'passé simple': {
        je: 'descendis', tu: 'descendis', il: 'descendit',
        nous: 'descendîmes', vous: 'descendîtes', ils: 'descendirent',
      },
      conditionnel: {
        je: 'descendrais', tu: 'descendrais', il: 'descendrait',
        nous: 'descendrions', vous: 'descendriez', ils: 'descendraient',
      },
      subjonctif: {
        je: 'descende', tu: 'descendes', il: 'descende',
        nous: 'descendions', vous: 'descendiez', ils: 'descendent',
      },
      impératif: {
        tu: 'descends', nous: 'descendons', vous: 'descendez',
      },
    },
    examples: [
      { fr: 'Je descends au rez-de-chaussée.', en: 'I am going down to the ground floor.' },
      { fr: 'Je suis descendu vite.', en: 'I went down quickly.' },
      { fr: 'Je descendrai dans cinq minutes.', en: 'I will come down in five minutes.' },
      { fr: 'Je descendais souvent.', en: 'I used to go down often.' },
    ],
  },
  {
    id: 'tomber',
    infinitive: 'tomber',
    english: 'to fall',
    pastParticiple: 'tombé',
    family: 'er-regular',
    core: true,
    mentalModel: 'tombe → tombais → tomberai → tombé → tombe',
    patternAnchors: ['tombe', 'tombais', 'tomberai', 'tombé', 'tombe'],
    conjugations: {
      présent: {
        je: 'tombe', tu: 'tombes', il: 'tombe',
        nous: 'tompons', vous: 'tombez', ils: 'tombent',
      },
      imparfait: {
        je: 'tombais', tu: 'tombais', il: 'tombait',
        nous: 'tombions', vous: 'tombiez', ils: 'tombaient',
      },
      futur: {
        je: 'tomberai', tu: 'tomberas', il: 'tombera',
        nous: 'tomberons', vous: 'tomberez', ils: 'tomberont',
      },
      'passé composé': {
        je: 'je suis tombé(e)', tu: 'tu es tombé(e)', il: 'il est tombé',
        nous: 'nous sommes tombé(e)s', vous: 'vous êtes tombé(e)(s)', ils: 'ils sont tombés',
      },
      'passé simple': {
        je: 'tombai', tu: 'tombas', il: 'tomba',
        nous: 'tombâmes', vous: 'tombâtes', ils: 'tombèrent',
      },
      conditionnel: {
        je: 'tomberais', tu: 'tomberais', il: 'tomberait',
        nous: 'tomberions', vous: 'tomberiez', ils: 'tomberaient',
      },
      subjonctif: {
        je: 'tombe', tu: 'tombes', il: 'tombe',
        nous: 'tombions', vous: 'tombiez', ils: 'tombent',
      },
      impératif: {
        tu: 'tombe', nous: 'tompons', vous: 'tombez',
      },
    },
    examples: [
      { fr: 'Je tombe de fatigue.', en: 'I am falling with exhaustion.' },
      { fr: 'Je suis tombé par terre.', en: 'I fell on the ground.' },
      { fr: 'Je tomberai peut-être.', en: 'I might fall.' },
      { fr: 'Je tombais souvent quand j\'étais petit.', en: 'I used to fall often when I was little.' },
    ],
  },
  {
    id: 'rester',
    infinitive: 'rester',
    english: 'to stay',
    pastParticiple: 'resté',
    family: 'er-regular',
    core: true,
    mentalModel: 'reste → restais → resterai → resté → reste',
    patternAnchors: ['reste', 'restais', 'resterai', 'resté', 'reste'],
    conjugations: {
      présent: {
        je: 'reste', tu: 'restes', il: 'reste',
        nous: 'restons', vous: 'restez', ils: 'restent',
      },
      imparfait: {
        je: 'restais', tu: 'restais', il: 'restait',
        nous: 'restions', vous: 'restiez', ils: 'restaient',
      },
      futur: {
        je: 'resterai', tu: 'resteras', il: 'restera',
        nous: 'resterons', vous: 'resterez', ils: 'resteront',
      },
      'passé composé': {
        je: 'je suis resté(e)', tu: 'tu es resté(e)', il: 'il est resté',
        nous: 'nous sommes resté(e)s', vous: 'vous êtes resté(e)(s)', ils: 'ils sont restés',
      },
      'passé simple': {
        je: 'restai', tu: 'restas', il: 'resta',
        nous: 'restâmes', vous: 'restâtes', ils: 'restèrent',
      },
      conditionnel: {
        je: 'resterais', tu: 'resterais', il: 'resterait',
        nous: 'resterions', vous: 'resteriez', ils: 'resteraient',
      },
      subjonctif: {
        je: 'reste', tu: 'restes', il: 'reste',
        nous: 'restions', vous: 'restiez', ils: 'restent',
      },
      impératif: {
        tu: 'reste', nous: 'restons', vous: 'restez',
      },
    },
    examples: [
      { fr: 'Je reste ici.', en: 'I am staying here.' },
      { fr: 'Je suis resté tard.', en: 'I stayed late.' },
      { fr: 'Je resterai jusqu\'à demain.', en: 'I will stay until tomorrow.' },
      { fr: 'Je restais souvent seul.', en: 'I used to often stay alone.' },
    ],
  },
  {
    id: 'retourner',
    infinitive: 'retourner',
    english: 'to return / to go back',
    pastParticiple: 'retourné',
    family: 'er-regular',
    core: true,
    mentalModel: 'retourne → retournais → retournerai → retourné → retourne',
    patternAnchors: ['retourne', 'retournais', 'retournerai', 'retourné', 'retourne'],
    note: 'retourner means "to go back" (physical movement). Not to be confused with rentrer (to go home) or revenir (to come back).',
    conjugations: {
      présent: {
        je: 'retourne', tu: 'retournes', il: 'retourne',
        nous: 'retournons', vous: 'retournez', ils: 'retournent',
      },
      imparfait: {
        je: 'retournais', tu: 'retournais', il: 'retournait',
        nous: 'retournions', vous: 'retourniez', ils: 'retournaient',
      },
      futur: {
        je: 'retournerai', tu: 'retourneras', il: 'retournera',
        nous: 'retournerons', vous: 'retournerez', ils: 'retourneront',
      },
      'passé composé': {
        je: 'je suis retourné(e)', tu: 'tu es retourné(e)', il: 'il est retourné',
        nous: 'nous sommes retourné(e)s', vous: 'vous êtes retourné(e)(s)', ils: 'ils sont retournés',
      },
      'passé simple': {
        je: 'retournai', tu: 'retournas', il: 'retourna',
        nous: 'retournâmes', vous: 'retournâtes', ils: 'retournèrent',
      },
      conditionnel: {
        je: 'retournerais', tu: 'retournerais', il: 'retournerait',
        nous: 'retournerions', vous: 'retourneriez', ils: 'retourneraient',
      },
      subjonctif: {
        je: 'retourne', tu: 'retournes', il: 'retourne',
        nous: 'retournions', vous: 'retourniez', ils: 'retournent',
      },
      impératif: {
        tu: 'retourne', nous: 'retournons', vous: 'retournez',
      },
    },
    examples: [
      { fr: 'Je retourne à Paris.', en: 'I am going back to Paris.' },
      { fr: 'Je suis retourné le voir.', en: 'I went back to see him.' },
      { fr: 'Je retournerai bientôt.', en: 'I will go back soon.' },
      { fr: 'Je retournais souvent.', en: 'I used to go back often.' },
    ],
  },
  {
    id: 'rentrer',
    infinitive: 'rentrer',
    english: 'to return home / to come home',
    pastParticiple: 'rentré',
    family: 'er-regular',
    core: true,
    mentalModel: 'rentre → rentrais → rentrerai → rentré → rentre',
    patternAnchors: ['rentre', 'rentrais', 'rentrerai', 'rentré', 'rentre'],
    note: 'rentrer specifically means "to return home" or "to come back inside". More specific than retourner.',
    conjugations: {
      présent: {
        je: 'rentre', tu: 'rentres', il: 'rentre',
        nous: 'rentrons', vous: 'rentrez', ils: 'rentrent',
      },
      imparfait: {
        je: 'rentrais', tu: 'rentrais', il: 'rentrait',
        nous: 'rentrions', vous: 'rentriez', ils: 'rentraient',
      },
      futur: {
        je: 'rentrerai', tu: 'rentreras', il: 'rentrera',
        nous: 'rentrerons', vous: 'rentrerez', ils: 'rentreront',
      },
      'passé composé': {
        je: 'je suis rentré(e)', tu: 'tu es rentré(e)', il: 'il est rentré',
        nous: 'nous sommes rentré(e)s', vous: 'vous êtes rentré(e)(s)', ils: 'ils sont rentrés',
      },
      'passé simple': {
        je: 'rentrai', tu: 'rentras', il: 'rentra',
        nous: 'rentrâmes', vous: 'rentrâtes', ils: 'rentrèrent',
      },
      conditionnel: {
        je: 'rentrerais', tu: 'rentrerais', il: 'rentrerait',
        nous: 'rentrerions', vous: 'rentreriez', ils: 'rentreraient',
      },
      subjonctif: {
        je: 'rentre', tu: 'rentres', il: 'rentre',
        nous: 'rentrions', vous: 'rentriez', ils: 'rentrent',
      },
      impératif: {
        tu: 'rentre', nous: 'rentrons', vous: 'rentrez',
      },
    },
    examples: [
      { fr: 'Je rentre chez moi.', en: 'I am going home.' },
      { fr: 'Je suis rentré tard hier.', en: 'I got home late yesterday.' },
      { fr: 'Je rentrerai vers 18h.', en: 'I will be home around 6pm.' },
      { fr: 'Je rentrais toujours avant minuit.', en: 'I always used to come home before midnight.' },
    ],
  },
  {
    id: 'passer',
    infinitive: 'passer',
    english: 'to pass / to go by / to drop by',
    pastParticiple: 'passé',
    family: 'er-regular',
    core: true,
    mentalModel: 'passe → passais → passerai → passé → passe',
    patternAnchors: ['passe', 'passais', 'passerai', 'passé', 'passe'],
    note: 'Can use avoir when it has a direct object (see Être vs Avoir section).',
    dualAuxiliary: {
      meaning: 'passer can use être (to drop by / to go past) or avoir (to spend time), depending on whether it has a direct object.',
      êtreExample: 'Je suis passé chez Paul.',
      êtreTranslation: 'I dropped by Paul\'s place.',
      avoirExample: 'J\'ai passé trois heures chez Paul.',
      avoirTranslation: 'I spent three hours at Paul\'s place.',
    },
    conjugations: {
      présent: {
        je: 'passe', tu: 'passes', il: 'passe',
        nous: 'passons', vous: 'passez', ils: 'passent',
      },
      imparfait: {
        je: 'passais', tu: 'passais', il: 'passait',
        nous: 'passions', vous: 'passiez', ils: 'passaient',
      },
      futur: {
        je: 'passerai', tu: 'passeras', il: 'passera',
        nous: 'passerons', vous: 'passerez', ils: 'passeront',
      },
      'passé composé': {
        je: 'je suis passé(e)', tu: 'tu es passé(e)', il: 'il est passé',
        nous: 'nous sommes passé(e)s', vous: 'vous êtes passé(e)(s)', ils: 'ils sont passés',
      },
      'passé simple': {
        je: 'passai', tu: 'passas', il: 'passa',
        nous: 'passâmes', vous: 'passâtes', ils: 'passèrent',
      },
      conditionnel: {
        je: 'passerais', tu: 'passerais', il: 'passerait',
        nous: 'passerions', vous: 'passeriez', ils: 'passeraient',
      },
      subjonctif: {
        je: 'passe', tu: 'passes', il: 'passe',
        nous: 'passions', vous: 'passiez', ils: 'passent',
      },
      impératif: {
        tu: 'passe', nous: 'passons', vous: 'passez',
      },
    },
    examples: [
      { fr: 'Je passe chez toi.', en: 'I am dropping by your place.' },
      { fr: 'Je suis passé te voir.', en: 'I dropped by to see you.' },
      { fr: 'Je passerai demain.', en: 'I will drop by tomorrow.' },
      { fr: 'Je passais souvent dans ce café.', en: 'I used to often go to this café.' },
    ],
  },
  {
    id: 'remonter',
    infinitive: 'remonter',
    english: 'to go up again',
    pastParticiple: 'remonté',
    family: 'er-regular',
    mentalModel: 'remonte → remontais → remonterai → remonté → remonte',
    patternAnchors: ['remonte', 'remontais', 'remonterai', 'remonté', 'remonte'],
    note: 'monter with "re-" (again). Same regular pattern.',
    conjugations: {
      présent: {
        je: 'remonte', tu: 'remontes', il: 'remonte',
        nous: 'remontons', vous: 'remontez', ils: 'remontent',
      },
      imparfait: {
        je: 'remontais', tu: 'remontais', il: 'remontait',
        nous: 'remontions', vous: 'remontiez', ils: 'remontaient',
      },
      futur: {
        je: 'remonterai', tu: 'remonteras', il: 'remontera',
        nous: 'remonterons', vous: 'remonterez', ils: 'remonteront',
      },
      'passé composé': {
        je: 'je suis remonté(e)', tu: 'tu es remonté(e)', il: 'il est remonté',
        nous: 'nous sommes remonté(e)s', vous: 'vous êtes remonté(e)(s)', ils: 'ils sont remontés',
      },
      'passé simple': {
        je: 'remontai', tu: 'remontas', il: 'remonta',
        nous: 'remontâmes', vous: 'remontâtes', ils: 'remontèrent',
      },
      conditionnel: {
        je: 'remonterais', tu: 'remonterais', il: 'remonterait',
        nous: 'remonterions', vous: 'remonteriez', ils: 'remonteraient',
      },
      subjonctif: {
        je: 'remonte', tu: 'remontes', il: 'remonte',
        nous: 'remontions', vous: 'remontiez', ils: 'remontent',
      },
      impératif: {
        tu: 'remonte', nous: 'remontons', vous: 'remontez',
      },
    },
    examples: [
      { fr: 'Je suis remonté chercher mes clés.', en: 'I went back up to get my keys.' },
      { fr: 'Je remonte dans cinq minutes.', en: 'I am going back up in five minutes.' },
      { fr: 'Il remontera bientôt.', en: 'He will go up again soon.' },
      { fr: 'Je remontais souvent.', en: 'I used to go up again often.' },
    ],
  },
  {
    id: 'redescendre',
    infinitive: 'redescendre',
    english: 'to go down again',
    pastParticiple: 'redescendu',
    family: 'er-regular',
    mentalModel: 'redescends → redescendais → redescendrai → redescendu → redescende',
    patternAnchors: ['redescends', 'redescendais', 'redescendrai', 'redescendu', 'redescende'],
    note: 'descendre with "re-" (again). Same pattern.',
    conjugations: {
      présent: {
        je: 'redescends', tu: 'redescends', il: 'redescend',
        nous: 'redescendons', vous: 'redescendez', ils: 'redescendent',
      },
      imparfait: {
        je: 'redescendais', tu: 'redescendais', il: 'redescendait',
        nous: 'redescendions', vous: 'redescendiez', ils: 'redescendaient',
      },
      futur: {
        je: 'redescendrai', tu: 'redescendras', il: 'redescendra',
        nous: 'redescendrons', vous: 'redescendrez', ils: 'redescendront',
      },
      'passé composé': {
        je: 'je suis redescendu(e)', tu: 'tu es redescendu(e)', il: 'il est redescendu',
        nous: 'nous sommes redescendu(e)s', vous: 'vous êtes redescendu(e)(s)', ils: 'ils sont redescendus',
      },
      'passé simple': {
        je: 'redescendis', tu: 'redescendis', il: 'redescendit',
        nous: 'redescendîmes', vous: 'redescendîtes', ils: 'redescendirent',
      },
      conditionnel: {
        je: 'redescendrais', tu: 'redescendrais', il: 'redescendrait',
        nous: 'redescendrions', vous: 'redescendriez', ils: 'redescendraient',
      },
      subjonctif: {
        je: 'redescende', tu: 'redescendes', il: 'redescende',
        nous: 'redescendions', vous: 'redescendiez', ils: 'redescendent',
      },
      impératif: {
        tu: 'redescends', nous: 'redescendons', vous: 'redescendez',
      },
    },
    examples: [
      { fr: 'Je suis redescendu cinq minutes après.', en: 'I went back down five minutes later.' },
      { fr: 'Je redescends tout de suite.', en: 'I am going back down right away.' },
      { fr: 'Elle redescendra bientôt.', en: 'She will go down again soon.' },
      { fr: 'Je redescendais souvent.', en: 'I used to go down again often.' },
    ],
  },

  // ============================================================
  // S'EN ALLER (pronominal)
  // ============================================================
  {
    id: 'sen-aller',
    infinitive: 's\'en aller',
    english: 'to leave / to go away',
    pastParticiple: 'allé',
    family: 'aller',
    reflexive: true,
    mentalModel: 'm\'en vais → m\'en allais → m\'en irai → m\'en allé → m\'en aille',
    patternAnchors: ['m\'en vais', 'm\'en allais', 'm\'en irai', 'allé', 'm\'en aille'],
    note: 'Pronominal form of aller. Always uses être (as all pronominal verbs do). The "s\'en" part changes with the subject.',
    conjugations: {
      présent: {
        je: 'je m\'en vais', tu: 'tu t\'en vas', il: 'il s\'en va',
        nous: 'nous nous en allons', vous: 'vous vous en allez', ils: 'ils s\'en vont',
      },
      imparfait: {
        je: 'je m\'en allais', tu: 'tu t\'en allais', il: 'il s\'en allait',
        nous: 'nous nous en allions', vous: 'vous vous en alliez', ils: 'ils s\'en allaient',
      },
      futur: {
        je: 'je m\'en irai', tu: 'tu t\'en iras', il: 'il s\'en ira',
        nous: 'nous nous en irons', vous: 'vous vous en irez', ils: 'ils s\'en iront',
      },
      'passé composé': {
        je: 'je m\'en suis allé(e)', tu: 'tu t\'en es allé(e)', il: 'il s\'en est allé',
        nous: 'nous nous en sommes allé(e)s', vous: 'vous vous en êtes allé(e)(s)', ils: 'ils s\'en sont allés',
      },
      'passé simple': {
        je: 'je m\'en allai', tu: 'tu t\'en allas', il: 'il s\'en alla',
        nous: 'nous nous en allâmes', vous: 'vous vous en allâtes', ils: 'ils s\'en allèrent',
      },
      conditionnel: {
        je: 'je m\'en irais', tu: 'tu t\'en irais', il: 'il s\'en irait',
        nous: 'nous nous en irions', vous: 'vous vous en iriez', ils: 'ils s\'en iraient',
      },
      subjonctif: {
        je: 'je m\'en aille', tu: 'tu t\'en ailles', il: 'il s\'en aille',
        nous: 'nous nous en allions', vous: 'vous vous en alliez', ils: 'ils s\'en aillent',
      },
      impératif: {
        tu: 't\'en va', nous: 'nous en allons', vous: 'vous en allez',
      },
    },
    examples: [
      { fr: 'Je m\'en vais.', en: 'I am leaving.' },
      { fr: 'Il s\'en est allé sans dire au revoir.', en: 'He left without saying goodbye.' },
      { fr: 'Je m\'en irai bientôt.', en: 'I will leave soon.' },
      { fr: 'Je m\'en allais souvent tôt.', en: 'I used to often leave early.' },
    ],
  },
];

// ============================================================
// VERB FAMILY DEFINITIONS
// ============================================================

export const FAMILY_INFO = [
  {
    id: 'er-regular' as const,
    label: 'Regular -ER Verbs',
    description: 'These verbs share the same endings. Learn the pattern once and apply it to all of them.',
    pattern: '-e / -es / -e / -ons / -ez / -ent',
    accent: 'blue',
    verbs: ['arriver', 'entrer', 'monter', 'descendre', 'tomber', 'rester', 'retourner', 'rentrer', 'passer', 'remonter', 'redescendre'],
  },
  {
    id: 'partir-sortir' as const,
    label: 'Partir / Sortir',
    description: 'These -tir verbs share a stem pattern: the "t" drops in singular présent forms.',
    pattern: 'pars / pars / part / partons / partez / partent',
    accent: 'emerald',
    verbs: ['partir', 'sortir', 'repartir', 'ressortir'],
  },
  {
    id: 'venir' as const,
    label: 'The Venir Family',
    description: 'A major memory family. Once you know venir, prefixes give you six more verbs for free.',
    pattern: 'viens / venais / viendrai / venu / vienne',
    accent: 'amber',
    verbs: ['venir', 'revenir', 'devenir', 'parvenir', 'intervenir', 'survenir', 'redevenir'],
  },
  {
    id: 'life-death' as const,
    label: 'Life & Death',
    description: 'naître and mourir are irregular and deserve their own card.',
    pattern: 'nais → naissais → naîtrai → né   |   meurs → mourais → mourrai → mort',
    accent: 'rose',
    verbs: ['naitre', 'mourir'],
  },
  {
    id: 'aller' as const,
    label: 'Aller',
    description: 'Aller is highly irregular — its présent and futur come from different Latin roots.',
    pattern: 'vais / allais / irai / allé / aille',
    accent: 'slate',
    verbs: ['aller', 'sen-aller'],
  },
];

// ============================================================
// Helper functions
// ============================================================

export function getVerb(id: string): Verb | undefined {
  return VERBS.find((v) => v.id === id);
}

export function getVerbByInfinitive(inf: string): Verb | undefined {
  return VERBS.find((v) => v.infinitive === inf || v.infinitive.toLowerCase() === inf.toLowerCase());
}

export const CORE_VERBS = VERBS.filter((v) => v.core);

export const TOTAL_VERBS = VERBS.length;
