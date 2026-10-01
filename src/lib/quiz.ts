import type { QuizQuestion, Tense, QuestionType } from '@/types';
import { VERBS, getVerb } from '@/data/verbs';
import { ALL_TENSES, PERSON_LABELS, TENSE_LABELS } from '@/types';
import type { WeakArea } from '@/lib/storage';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalize(s: string): string {
  return stripAccents(s.trim().toLowerCase()).replace(/[']/g, ' ').replace(/\s+/g, ' ');
}

const NON_REFLEXIVE_VERBS = VERBS.filter((v) => !v.reflexive);

function genMCQMeaning(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  const others = shuffle(VERBS.filter((v) => v.id !== verbId)).slice(0, 3);
  const options = shuffle([verb.english, ...others.map((v) => v.english)]);
  return {
    id: `${verbId}-mcq-meaning-${Date.now()}`,
    type: 'mcq-meaning',
    verbId,
    question: `What does "${verb.infinitive}" mean?`,
    options,
    answer: verb.english,
    difficulty: 1,
  };
}

function genMCQAuxiliary(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  const options = shuffle(['être', 'avoir']);
  return {
    id: `${verbId}-mcq-aux-${Date.now()}`,
    type: 'mcq-auxiliary',
    verbId,
    tense: 'passé composé',
    question: `Which auxiliary does "${verb.infinitive}" use in the passé composé?`,
    options,
    answer: 'être',
    explanation: `All verbs in this app use être as their auxiliary in the passé composé. "${verb.infinitive}" is one of them.`,
    difficulty: 1,
  };
}

function genMCQParticiple(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  const others = shuffle(VERBS.filter((v) => v.id !== verbId && v.pastParticiple !== verb.pastParticiple)).slice(0, 3);
  const options = shuffle([verb.pastParticiple, ...others.map((v) => v.pastParticiple)]);
  return {
    id: `${verbId}-mcq-part-${Date.now()}`,
    type: 'mcq-participle',
    verbId,
    question: `What is the past participle of "${verb.infinitive}"?`,
    options,
    answer: verb.pastParticiple,
    difficulty: 1,
  };
}

function genMCQAgreement(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  const participle = verb.pastParticiple;
  const masc = participle;
  const fem = participle + 'e';
  const mascPl = participle + 's';
  const femPl = participle + 'es';

  const scenarios = [
    { subject: 'Marie (feminine singular)', correct: fem, options: [masc, fem, mascPl, femPl] },
    { subject: 'Paul (masculine singular)', correct: masc, options: [masc, fem, mascPl, femPl] },
    { subject: 'Marie et Sophie (feminine plural)', correct: femPl, options: [masc, fem, mascPl, femPl] },
    { subject: 'Paul et Marc (masculine plural)', correct: mascPl, options: [masc, fem, mascPl, femPl] },
  ];
  const scenario = pick(scenarios);
  const options = shuffle(scenario.options);
  const genderLabel = scenario.correct === fem ? 'feminine singular (+e)' :
    scenario.correct === femPl ? 'feminine plural (+es)' :
    scenario.correct === mascPl ? 'masculine plural (+s)' : 'masculine singular (base form)';

  return {
    id: `${verbId}-mcq-agree-${Date.now()}`,
    type: 'mcq-agreement',
    verbId,
    tense: 'passé composé',
    question: `Complete: "${scenario.subject} est ______."`,
    options,
    answer: scenario.correct,
    explanation: `The past participle agrees with the subject in gender and number. ${scenario.subject} requires ${genderLabel}.`,
    difficulty: 2,
  };
}

function genFillConjugation(verbId: string, tense: Tense): QuizQuestion {
  const verb = getVerb(verbId)!;
  const conj = verb.conjugations[tense];
  if (!conj) return genMCQParticiple(verbId);

  const persons = tense === 'impératif'
    ? ['tu', 'nous', 'vous'] as const
    : ['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const;
  const person = pick([...persons] as string[]);
  const fullForm = conj[person as keyof typeof conj];
  if (!fullForm) return genMCQParticiple(verbId);

  let answer: string;
  let prompt: string;
  let question: string;

  if (tense === 'passé composé') {
    const parts = fullForm.split(' ');
    if (parts.length >= 2) {
      answer = parts[1];
      const rest = parts.slice(2).join(' ');
      const personLabel = PERSON_LABELS.find((p) => p.person === person)?.label ?? person;
      question = `Complete the passé composé:\n${personLabel} ___ ${rest}`;
      prompt = `${personLabel} ___ ${rest}`;
    } else {
      answer = parts[0];
      question = `Complete: ${fullForm}`;
      prompt = fullForm;
    }
  } else {
    answer = fullForm;
    const personLabel = PERSON_LABELS.find((p) => p.person === person)?.label ?? person;
    question = `Conjugate "${verb.infinitive}" in the ${TENSE_LABELS[tense]}:\n${personLabel} ___`;
    prompt = `${personLabel} ___`;
  }

  return {
    id: `${verbId}-fill-${tense}-${Date.now()}`,
    type: 'fill-conjugation',
    verbId,
    tense,
    question,
    prompt,
    answer,
    acceptableAnswers: [answer, stripAccents(answer)],
    difficulty: 2,
  };
}

function genRecallParticiple(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  return {
    id: `${verbId}-recall-part-${Date.now()}`,
    type: 'recall-participle',
    verbId,
    question: `What is the past participle of "${verb.infinitive}"? (no choices — type your answer)`,
    answer: verb.pastParticiple,
    acceptableAnswers: [verb.pastParticiple, stripAccents(verb.pastParticiple)],
    difficulty: 3,
  };
}

function genRecallAuxiliary(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  return {
    id: `${verbId}-recall-aux-${Date.now()}`,
    type: 'recall-auxiliary',
    verbId,
    tense: 'passé composé',
    question: `Which auxiliary does "${verb.infinitive}" use in the passé composé? (type être or avoir)`,
    answer: 'être',
    acceptableAnswers: ['être', 'etre'],
    difficulty: 3,
  };
}

function genTranslateEnFr(verbId: string, tense: Tense): QuizQuestion {
  const verb = getVerb(verbId)!;
  const conj = verb.conjugations[tense];
  if (!conj || !verb.examples.length) return genMCQMeaning(verbId);

  const example = pick(verb.examples);
  const person = pick(['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const);
  const form = conj[person as keyof typeof conj];
  if (!form) return genMCQMeaning(verbId);

  const personLabel = PERSON_LABELS.find((p) => p.person === person)?.label ?? person;

  if (tense === 'passé composé') {
    const pcForm = conj['je'] || conj['il'];
    if (!pcForm) return genMCQMeaning(verbId);
    const cleanForm = pcForm.replace(/^(je|tu|il|nous|vous|ils)\s+/, '');
    return {
      id: `${verbId}-trans-enfr-${tense}-${Date.now()}`,
      type: 'translate-en-fr',
      verbId,
      tense,
      question: `Translate to French:\n"${example.en}"`,
      answer: example.fr,
      acceptableAnswers: [example.fr, stripAccents(example.fr)],
      explanation: `Using ${verb.infinitive} (${verb.english}): ${example.fr}`,
      difficulty: 4,
    };
  }

  const cleanForm = form.replace(/^(je|tu|il|nous|vous|ils)\s+/, '');
  return {
    id: `${verbId}-trans-enfr-${tense}-${Date.now()}`,
    type: 'translate-en-fr',
    verbId,
    tense,
    question: `How do you say "${verb.english}" in the ${TENSE_LABELS[tense]} with "${personLabel}"?`,
    answer: form,
    acceptableAnswers: [form, stripAccents(form), cleanForm, stripAccents(cleanForm)],
    difficulty: 4,
  };
}

function genTranslateFrEn(verbId: string): QuizQuestion {
  const verb = getVerb(verbId)!;
  if (!verb.examples.length) return genMCQMeaning(verbId);
  const example = pick(verb.examples);
  return {
    id: `${verbId}-trans-fren-${Date.now()}`,
    type: 'translate-fr-en',
    verbId,
    question: `What does this mean in English?\n"${example.fr}"`,
    answer: example.en,
    acceptableAnswers: [example.en.toLowerCase(), example.en],
    difficulty: 3,
  };
}

export function generateQuiz(opts: {
  count: number;
  weakAreas?: WeakArea[];
  difficulty?: 1 | 2 | 3 | 4 | 5;
  types?: QuestionType[];
}): QuizQuestion[] {
  const { count, weakAreas = [], difficulty, types } = opts;
  const questions: QuizQuestion[] = [];
  const usedIds = new Set<string>();

  const pool: { verbId: string; tense: Tense; weight: number }[] = [];
  for (const verb of VERBS) {
    for (const tense of ALL_TENSES) {
      const weak = weakAreas.find((w) => w.verbId === verb.id && w.tense === tense);
      const weight = weak ? 10 - weak.score / 12 : 1;
      pool.push({ verbId: verb.id, tense, weight });
    }
  }

  const selectFromPool = () => {
    const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * totalWeight;
    for (const item of pool) {
      r -= item.weight;
      if (r <= 0) return item;
    }
    return pool[0];
  };

  const allTypes: QuestionType[] = types || [
    'mcq-meaning', 'mcq-auxiliary', 'mcq-participle', 'mcq-agreement',
    'fill-conjugation', 'recall-participle', 'recall-auxiliary',
    'translate-en-fr', 'translate-fr-en',
  ];

  let attempts = 0;
  while (questions.length < count && attempts < count * 10) {
    attempts++;
    const item = selectFromPool();
    const verb = getVerb(item.verbId);
    if (!verb || verb.reflexive) continue;

    let q: QuizQuestion | null = null;
    const type = pick([...allTypes] as string[]);

    switch (type) {
      case 'mcq-meaning':
        q = genMCQMeaning(item.verbId);
        break;
      case 'mcq-auxiliary':
        q = genMCQAuxiliary(item.verbId);
        break;
      case 'mcq-participle':
        q = genMCQParticiple(item.verbId);
        break;
      case 'mcq-agreement':
        q = genMCQAgreement(item.verbId);
        break;
      case 'fill-conjugation':
        q = genFillConjugation(item.verbId, item.tense);
        break;
      case 'recall-participle':
        q = genRecallParticiple(item.verbId);
        break;
      case 'recall-auxiliary':
        q = genRecallAuxiliary(item.verbId);
        break;
      case 'translate-en-fr':
        q = genTranslateEnFr(item.verbId, item.tense);
        break;
      case 'translate-fr-en':
        q = genTranslateFrEn(item.verbId);
        break;
    }

    if (q && !usedIds.has(q.id)) {
      if (difficulty) q.difficulty = difficulty;
      usedIds.add(q.id);
      questions.push(q);
    }
  }

  while (questions.length < count) {
    const verb = pick(NON_REFLEXIVE_VERBS);
    const q = genMCQParticiple(verb.id);
    if (!usedIds.has(q.id)) {
      usedIds.add(q.id);
      questions.push(q);
    } else break;
  }

  return questions;
}

export function generateFlashcards(opts: {
  count: number;
  weakAreas?: WeakArea[];
}): { verbId: string; tense: Tense; question: string; answer: string; pattern: string }[] {
  const { count, weakAreas = [] } = opts;
  const cards: { verbId: string; tense: Tense; question: string; answer: string; pattern: string }[] = [];
  const usedKeys = new Set<string>();

  const pool: { verbId: string; tense: Tense; weight: number }[] = [];
  for (const verb of VERBS) {
    for (const tense of ALL_TENSES) {
      const weak = weakAreas.find((w) => w.verbId === verb.id && w.tense === tense);
      const weight = weak ? 10 - weak.score / 12 : 1;
      pool.push({ verbId: verb.id, tense, weight });
    }
  }

  const selectFromPool = () => {
    const totalWeight = pool.reduce((s, p) => s + p.weight, 0);
    let r = Math.random() * totalWeight;
    for (const item of pool) {
      r -= item.weight;
      if (r <= 0) return item;
    }
    return pool[0];
  };

  let attempts = 0;
  while (cards.length < count && attempts < count * 10) {
    attempts++;
    const item = selectFromPool();
    const key = `${item.verbId}::${item.tense}`;
    if (usedKeys.has(key)) continue;
    usedKeys.add(key);

    const verb = getVerb(item.verbId);
    if (!verb) continue;

    const conj = verb.conjugations[item.tense];
    if (!conj) continue;

    const person = item.tense === 'impératif'
      ? pick(['tu', 'nous', 'vous'] as const)
      : pick(['je', 'tu', 'il', 'nous', 'vous', 'ils'] as const);
    const form = conj[person as keyof typeof conj];
    if (!form) continue;

    const personLabel = PERSON_LABELS.find((p) => p.person === person)?.label ?? person;
    const question = `${verb.infinitive.toUpperCase()} — ${TENSE_LABELS[item.tense]}\n${personLabel} ?`;
    const answer = form;
    const pattern = verb.mentalModel;

    cards.push({ verbId: item.verbId, tense: item.tense, question, answer, pattern });
  }

  return cards;
}

export function checkAnswer(question: QuizQuestion, userAnswer: string): boolean {
  const normalized = normalize(userAnswer);
  const acceptable = question.acceptableAnswers || [question.answer];
  return acceptable.some((a) => normalize(a) === normalized);
}
