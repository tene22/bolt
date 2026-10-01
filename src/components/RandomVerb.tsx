import { useState, useCallback } from 'react';
import { VERBS, getVerb } from '@/data/verbs';
import { Badge } from '@/components/ui';
import { ALL_TENSES, TENSE_LABELS } from '@/types';
import { Dice5, RotateCcw, ArrowRight, Lightbulb } from 'lucide-react';

interface RandomVerbProps {
  onPractiseVerb: (verbId: string, tense: string) => void;
  onExplore: (verbId: string) => void;
}

export function RandomVerb({ onPractiseVerb, onExplore }: RandomVerbProps) {
  const [verbId, setVerbId] = useState<string | null>(null);
  const [selectedTense, setSelectedTense] = useState<string>('passé composé');
  const roll = useCallback(() => {
    const random = VERBS[Math.floor(Math.random() * VERBS.length)];
    setVerbId(random.id);
  }, []);
  const verb = verbId ? getVerb(verbId) : null;
  useState(() => { roll(); });
  if (!verb) {
    return (<div className="card p-8 text-center animate-fade-in"><button onClick={roll} className="btn-primary mx-auto"><Dice5 className="w-5 h-5" /> Roll a random verb</button></div>);
  }
  return (
    <div className="space-y-5 animate-fade-in max-w-2xl mx-auto">
      <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-900/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20" />
        <div className="relative">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div><h2 className="text-3xl font-bold font-serif text-slate-800 dark:text-slate-100">{verb.infinitive}</h2><p className="text-lg text-slate-500 dark:text-slate-400 mt-1">{verb.english}</p></div>
            <button onClick={roll} className="btn-secondary text-xs shrink-0"><RotateCcw className="w-3.5 h-3.5" /> Roll again</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge color="blue" size="md">auxiliary: être</Badge>
            <Badge color="emerald" size="md">past participle: {verb.pastParticiple}</Badge>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/30 rounded-xl p-3 border border-amber-200 dark:border-amber-900/50">
            <div className="flex items-center gap-2 mb-1"><Lightbulb className="w-4 h-4 text-amber-500" /><p className="text-xs font-bold text-amber-700 dark:text-amber-300">Memory pattern</p></div>
            <p className="text-base font-serif text-amber-900 dark:text-amber-200">{verb.mentalModel}</p>
          </div>
        </div>
      </div>
      <div className="card p-4">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Example sentence</h3>
        <p className="font-serif text-base text-slate-800 dark:text-slate-100">{verb.examples[0]?.fr}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{verb.examples[0]?.en}</p>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Practise this verb in a tense:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {ALL_TENSES.map((tense) => (
            <button key={tense} onClick={() => setSelectedTense(tense)} className={`px-3 py-2 text-xs font-medium rounded-lg transition ${selectedTense === tense ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{TENSE_LABELS[tense]}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onPractiseVerb(verb.id, selectedTense)} className="btn-primary flex-1">Practise {verb.infinitive} — {TENSE_LABELS[selectedTense as keyof typeof TENSE_LABELS]}<ArrowRight className="w-4 h-4" /></button>
          <button onClick={() => onExplore(verb.id)} className="btn-secondary">View full conjugation</button>
        </div>
      </div>
    </div>
  );
}
