import type { MasteryState, AppSettings, SessionResult } from '@/types';
import { VERBS } from '@/data/verbs';
import { ALL_TENSES } from '@/types';

const MASTERY_KEY = 'etre-verbs-mastery-v1';
const SETTINGS_KEY = 'etre-verbs-settings-v1';

export function defaultMastery(): MasteryState {
  const scores: Record<string, number> = {};
  for (const verb of VERBS) {
    for (const tense of ALL_TENSES) {
      scores[`${verb.id}::${tense}`] = 0;
    }
  }
  return {
    scores,
    verbScores: {},
    tenseScores: {},
    overall: 0,
    streak: 0,
    lastReviewed: null,
    totalAnswered: 0,
    totalCorrect: 0,
    sessions: [],
    typeStats: {},
  };
}

export function defaultSettings(): AppSettings {
  return {
    theme: 'light',
    showTranslations: true,
  };
}

export function loadMastery(): MasteryState {
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    if (!raw) return defaultMastery();
    const parsed = JSON.parse(raw) as MasteryState;
    const base = defaultMastery();
    for (const v of VERBS) {
      for (const t of ALL_TENSES) {
        const key = `${v.id}::${t}`;
        if (parsed.scores[key] === undefined) parsed.scores[key] = 0;
      }
    }
    return { ...base, ...parsed, scores: { ...base.scores, ...parsed.scores } };
  } catch {
    return defaultMastery();
  }
}

export function saveMastery(state: MasteryState) {
  try {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(state));
  } catch {
  }
}

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings();
    return { ...defaultSettings(), ...JSON.parse(raw) };
  } catch {
    return defaultSettings();
  }
}

export function saveSettings(settings: AppSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
  }
}

export function recomputeMastery(state: MasteryState): MasteryState {
  const verbScores: Record<string, number> = {};
  const tenseScores: Record<string, number> = {};

  for (const verb of VERBS) {
    let sum = 0;
    let count = 0;
    for (const tense of ALL_TENSES) {
      const score = state.scores[`${verb.id}::${tense}`] ?? 0;
      sum += score;
      count++;
    }
    verbScores[verb.id] = count > 0 ? Math.round(sum / count) : 0;
  }

  for (const tense of ALL_TENSES) {
    let sum = 0;
    let count = 0;
    for (const verb of VERBS) {
      const score = state.scores[`${verb.id}::${tense}`] ?? 0;
      sum += score;
      count++;
    }
    tenseScores[tense] = count > 0 ? Math.round(sum / count) : 0;
  }

  const allScores = Object.values(state.scores);
  const overall = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;

  return { ...state, verbScores, tenseScores, overall };
}

export function updateScore(
  state: MasteryState,
  verbId: string,
  tense: string,
  correct: boolean,
): MasteryState {
  const key = `${verbId}::${tense}`;
  const current = state.scores[key] ?? 0;
  let next: number;

  if (correct) {
    if (current < 50) next = current + 20;
    else if (current < 80) next = current + 10;
    else next = Math.min(100, current + 5);
  } else {
    next = Math.max(0, current - 15);
  }

  const scores = { ...state.scores, [key]: next };
  const totalAnswered = state.totalAnswered + 1;
  const totalCorrect = state.totalCorrect + (correct ? 1 : 0);

  return recomputeMastery({
    ...state,
    scores,
    totalAnswered,
    totalCorrect,
    lastReviewed: new Date().toISOString(),
  });
}

export function recordSession(
  state: MasteryState,
  result: SessionResult,
): MasteryState {
  const sessions = [result, ...state.sessions].slice(0, 30);
  const streak = result.score > 0 ? state.streak + 1 : state.streak;
  return { ...state, sessions, streak };
}

export interface WeakArea {
  verbId: string;
  tense: string;
  score: number;
}

export function getWeakAreas(state: MasteryState, limit = 5): WeakArea[] {
  const areas: WeakArea[] = [];
  for (const verb of VERBS) {
    for (const tense of ALL_TENSES) {
      const key = `${verb.id}::${tense}`;
      const score = state.scores[key] ?? 0;
      areas.push({ verbId: verb.id, tense, score });
    }
  }
  areas.sort((a, b) => a.score - b.score);
  return areas.slice(0, limit);
}

export function getDueCardCount(state: MasteryState): number {
  let count = 0;
  for (const key in state.scores) {
    if (state.scores[key] < 80) count++;
  }
  return count;
}

export function getMasteryColor(score: number): string {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 50) return 'text-amber-600 dark:text-amber-400';
  if (score >= 25) return 'text-orange-600 dark:text-orange-400';
  return 'text-rose-600 dark:text-rose-400';
}

export function getMasteryBg(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  if (score >= 25) return 'bg-orange-500';
  return 'bg-rose-500';
}

export function getMasteryLabel(score: number): string {
  if (score >= 80) return 'Mastered';
  if (score >= 50) return 'Learning';
  if (score >= 25) return 'Beginner';
  return 'New';
}
