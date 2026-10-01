export type Person = 'je' | 'tu' | 'il' | 'nous' | 'vous' | 'ils';

export type Tense =
  | 'présent'
  | 'imparfait'
  | 'futur'
  | 'passé composé'
  | 'passé simple'
  | 'conditionnel'
  | 'subjonctif'
  | 'impératif';

export const ALL_TENSES: Tense[] = [
  'présent',
  'imparfait',
  'futur',
  'passé composé',
  'passé simple',
  'conditionnel',
  'subjonctif',
  'impératif',
];

export const TENSE_LABELS: Record<Tense, string> = {
  'présent': 'Présent',
  'imparfait': 'Imparfait',
  'futur': 'Futur simple',
  'passé composé': 'Passé composé',
  'passé simple': 'Passé simple',
  'conditionnel': 'Conditionnel présent',
  'subjonctif': 'Subjonctif présent',
  'impératif': 'Impératif',
};

export const TENSE_GROUPS: { label: string; tenses: Tense[] }[] = [
  { label: 'Indicatif', tenses: ['présent', 'imparfait', 'futur', 'passé composé', 'passé simple'] },
  { label: 'Autres modes', tenses: ['conditionnel', 'subjonctif', 'impératif'] },
];

export type Conjugation = Partial<Record<Person, string>>;
export type Conjugations = Partial<Record<Tense, Conjugation>>;

export type VerbFamily =
  | 'er-regular'
  | 'partir-sortir'
  | 'venir'
  | 'life-death'
  | 'aller';

export interface FamilyInfo {
  id: VerbFamily;
  label: string;
  description: string;
  pattern: string;
  verbs: string[];
}

export interface Verb {
  id: string;
  infinitive: string;
  english: string;
  pastParticiple: string;
  family: VerbFamily;
  mentalModel: string;
  patternAnchors: [string, string, string, string, string];
  conjugations: Conjugations;
  examples: { fr: string; en: string }[];
  dualAuxiliary?: {
    meaning: string;
    êtreExample: string;
    avoirExample: string;
    avoirTranslation: string;
    êtreTranslation: string;
  };
  reflexive?: boolean;
  note?: string;
  core?: boolean;
}

export type QuestionType =
  | 'mcq-meaning'
  | 'mcq-auxiliary'
  | 'mcq-participle'
  | 'mcq-agreement'
  | 'fill-conjugation'
  | 'recall-participle'
  | 'recall-auxiliary'
  | 'translate-en-fr'
  | 'translate-fr-en';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  verbId: string;
  tense?: Tense;
  question: string;
  prompt?: string;
  options?: string[];
  answer: string;
  acceptableAnswers?: string[];
  explanation?: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface VerbTenseKey {
  verbId: string;
  tense: Tense;
}

export interface MasteryState {
  scores: Record<string, number>;
  verbScores: Record<string, number>;
  tenseScores: Record<string, number>;
  overall: number;
  streak: number;
  lastReviewed: string | null;
  totalAnswered: number;
  totalCorrect: number;
  sessions: SessionResult[];
  typeStats: Record<string, { answered: number; correct: number }>;
}

export interface SessionResult {
  date: string;
  score: number;
  total: number;
  mode: string;
  weakAreas: string[];
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  showTranslations: boolean;
}

export const PERSON_LABELS: { person: Person; label: string }[] = [
  { person: 'je', label: 'je' },
  { person: 'tu', label: 'tu' },
  { person: 'il', label: 'il/elle/on' },
  { person: 'nous', label: 'nous' },
  { person: 'vous', label: 'vous' },
  { person: 'ils', label: 'ils/elles' },
];

export const IMPERATIVE_LABELS: { person: Person; label: string }[] = [
  { person: 'tu', label: 'tu' },
  { person: 'nous', label: 'nous' },
  { person: 'vous', label: 'vous' },
];
