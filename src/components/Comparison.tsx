import { useState, useMemo } from 'react';
import { VERBS, getVerb } from '@/data/verbs';
import { Badge, SectionTitle } from '@/components/ui';
import { ALL_TENSES, TENSE_LABELS, PERSON_LABELS, IMPERATIVE_LABELS } from '@/types';
import type { Tense, Person } from '@/types';
import { GitCompare, X } from 'lucide-react';

interface ComparisonProps {
  initialVerbId?: string;
  onClose: () => void;
}

export function Comparison({ initialVerbId, onClose }: ComparisonProps) {
  const [verb1Id, setVerb1Id] = useState(initialVerbId || 'venir');
  const [verb2Id, setVerb2Id] = useState('devenir');
  const [activeTense, setActiveTense] = useState<Tense>('présent');
  const verb1 = getVerb(verb1Id)!;
  const verb2 = getVerb(verb2Id)!;
  const suggestions = useMemo(() => [
    { v1: 'venir', v2: 'devenir', label: 'VENIR vs DEVENIR' },
    { v1: 'partir', v2: 'sortir', label: 'PARTIR vs SORTIR' },
    { v1: 'aller', v2: 'venir', label: 'ALLER vs VENIR' },
    { v1: 'monter', v2: 'descendre', label: 'MONTER vs DESCENDRE' },
    { v1: 'naitre', v2: 'mourir', label: 'NAÎTRE vs MOURIR' },
    { v1: 'arriver', v2: 'partir', label: 'ARRIVER vs PARTIR' },
  ], []);
  const labels = activeTense === 'impératif' ? IMPERATIVE_LABELS : PERSON_LABELS;
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle icon={<GitCompare className="w-6 h-6 text-blue-500" />} title="Comparison Mode" subtitle="See two verbs side by side and spot the shared pattern." action={<button onClick={onClose} className="btn-ghost text-sm"><X className="w-4 h-4" /> Close</button>} />
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => { setVerb1Id(s.v1); setVerb2Id(s.v2); }} className={`chip text-xs transition ${verb1Id === s.v1 && verb2Id === s.v2 ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{s.label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block">Verb 1</label><select value={verb1Id} onChange={(e) => setVerb1Id(e.target.value)} className="input">{VERBS.map((v) => <option key={v.id} value={v.id}>{v.infinitive} — {v.english}</option>)}</select></div>
        <div><label className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 block">Verb 2</label><select value={verb2Id} onChange={(e) => setVerb2Id(e.target.value)} className="input">{VERBS.map((v) => <option key={v.id} value={v.id}>{v.infinitive} — {v.english}</option>)}</select></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {[{ verb: verb1, color: 'blue' as const }, { verb: verb2, color: 'emerald' as const }].map(({ verb, color }) => (
          <div key={verb.id} className="card p-4">
            <div className="flex items-center justify-between mb-2"><h3 className="font-bold text-lg font-serif text-slate-800 dark:text-slate-100">{verb.infinitive}</h3><Badge color={color}>{verb.english}</Badge></div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-2.5"><p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mb-0.5">Memory pattern</p><p className="text-sm font-serif text-amber-900 dark:text-amber-200">{verb.mentalModel}</p></div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {ALL_TENSES.map((tense) => (
          <button key={tense} onClick={() => setActiveTense(tense)} className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition ${activeTense === tense ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{TENSE_LABELS[tense]}</button>
        ))}
      </div>
      <div className="card overflow-hidden">
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800">
          {[{ verb: verb1, color: 'text-blue-600 dark:text-blue-400' }, { verb: verb2, color: 'text-emerald-600 dark:text-emerald-400' }].map(({ verb, color }) => {
            const conj = verb.conjugations[activeTense];
            return (
              <div key={verb.id} className="p-4">
                <h4 className={`font-bold font-serif text-base mb-3 ${color}`}>{verb.infinitive}</h4>
                {conj ? (<div className="space-y-1.5">{labels.map(({ person, label }) => { const form = conj[person as Person]; if (!form) return null; return (<div key={person} className="flex items-baseline gap-2"><span className="text-xs text-slate-400 dark:text-slate-500 w-16 shrink-0">{label}</span><span className="text-sm font-serif text-slate-800 dark:text-slate-100">{form}</span></div>); })}</div>) : (<p className="text-sm text-slate-400">No data for this tense</p>)}
              </div>
            );
          })}
        </div>
      </div>
      <div className="card p-4 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
        <p className="text-sm text-amber-900 dark:text-amber-200"><strong>Spot the pattern:</strong> {verb1.infinitive} and {verb2.infinitive} share the same stem pattern. Notice how the endings are identical — only the prefix (or first letter) changes. This is the core principle: learn one pattern, apply it to every verb in the family.</p>
      </div>
    </div>
  );
}
