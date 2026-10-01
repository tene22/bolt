import { VERBS } from '@/data/verbs';
import { ALL_TENSES, TENSE_LABELS } from '@/types';
import type { Tense } from '@/types';

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export interface SearchResult {
  type: 'verb' | 'tense' | 'family';
  verbId?: string;
  tense?: Tense;
  label: string;
  subtitle: string;
}

export function search(query: string): SearchResult[] {
  const q = stripAccents(query.trim());
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const verb of VERBS) {
    const inf = stripAccents(verb.infinitive);
    const eng = stripAccents(verb.english);
    const pp = stripAccents(verb.pastParticiple);

    if (inf.includes(q) || eng.includes(q) || pp.includes(q)) {
      results.push({
        type: 'verb',
        verbId: verb.id,
        label: verb.infinitive,
        subtitle: `${verb.english} — pp: ${verb.pastParticiple}`,
      });
    }
  }

  for (const tense of ALL_TENSES) {
    const label = TENSE_LABELS[tense];
    const labelNoAccent = stripAccents(label);
    const tenseNoAccent = stripAccents(tense);
    if (labelNoAccent.includes(q) || tenseNoAccent.includes(q)) {
      results.push({
        type: 'tense',
        tense,
        label: TENSE_LABELS[tense],
        subtitle: 'Tense / mood',
      });
    }
  }

  if (q.length >= 3) {
    for (const verb of VERBS) {
      for (const tense of ALL_TENSES) {
        const conj = verb.conjugations[tense];
        if (!conj) continue;
        for (const person in conj) {
          const form = conj[person as keyof typeof conj];
          if (form && stripAccents(form).includes(q)) {
            if (!results.find((r) => r.verbId === verb.id)) {
              results.push({
                type: 'verb',
                verbId: verb.id,
                label: verb.infinitive,
                subtitle: `${verb.english} — found in ${TENSE_LABELS[tense]}`,
              });
            }
            break;
          }
        }
      }
    }
  }

  return results.slice(0, 12);
}
