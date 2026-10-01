import { useState } from 'react';
import { VERBS, getVerb, CORE_VERBS } from '@/data/verbs';
import { Badge, SectionTitle, Collapsible } from '@/components/ui';
import { ALL_TENSES, TENSE_LABELS, PERSON_LABELS } from '@/types';
import { BookOpen, Zap } from 'lucide-react';
import type { Person } from '@/types';

interface QuickReferenceProps {
  onPractise: () => void;
}

export function QuickReference({ onPractise }: QuickReferenceProps) {
  const [showAgreement, setShowAgreement] = useState(true);
  const agreementRows = [
    { subject: 'Paul (masc. sing.)', form: 'allé', note: 'no agreement' },
    { subject: 'Marie (fem. sing.)', form: 'allée', note: '+e' },
    { subject: 'Paul et Marc (masc. pl.)', form: 'allés', note: '+s' },
    { subject: 'Marie et Sophie (fem. pl.)', form: 'allées', note: '+es' },
  ];
  const dualAuxVerbs = VERBS.filter((v) => v.dualAuxiliary);
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle icon={<BookOpen className="w-6 h-6 text-blue-500" />} title="Quick Reference" subtitle="A compact cheat sheet for rapid lookup." />
      <div className="card p-5 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-900/50">
        <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">Passé Composé with Être</h3>
        <p className="text-sm text-slate-700 dark:text-slate-200 mb-4"><strong className="font-serif">être + past participle</strong> — the past participle agrees with the subject.</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {['Je suis allé', 'Tu es venu', 'Elle est arrivée', 'Nous sommes partis', 'Vous êtes sorti', 'Ils sont venus'].map((ex, i) => (
            <div key={i} className="bg-white/60 dark:bg-black/20 rounded-lg px-3 py-2 font-serif text-sm text-slate-700 dark:text-slate-200">
              {ex.split(' ').map((word, j) => { if (['suis', 'es', 'est', 'sommes', 'êtes', 'sont'].includes(word)) { return <span key={j} className="text-blue-600 dark:text-blue-400 font-semibold">{word} </span>; } return <span key={j}>{word} </span>; })}
            </div>
          ))}
        </div>
      </div>
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Past Participle Agreement</h3>
          <button onClick={() => setShowAgreement(!showAgreement)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{showAgreement ? 'Hide' : 'Show'}</button>
        </div>
        {showAgreement && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-slate-200 dark:border-slate-800"><th className="text-left py-2 px-3 text-xs font-bold text-slate-500 dark:text-slate-400">Subject</th><th className="text-left py-2 px-3 text-xs font-bold text-slate-500 dark:text-slate-400">Participle</th><th className="text-left py-2 px-3 text-xs font-bold text-slate-500 dark:text-slate-400">Rule</th></tr></thead>
              <tbody>
                {agreementRows.map((row, i) => (<tr key={i} className="border-b border-slate-100 dark:border-slate-800/60"><td className="py-2 px-3 text-slate-600 dark:text-slate-300">{row.subject}</td><td className="py-2 px-3 font-serif font-medium text-slate-800 dark:text-slate-100">allé<span className="text-emerald-600 dark:text-emerald-400 font-semibold">{row.form.slice(4)}</span></td><td className="py-2 px-3 text-xs text-slate-500 dark:text-slate-400">{row.note}</td></tr>))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">Past Participles at a Glance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {VERBS.map((verb) => (<div key={verb.id} className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2"><span className="font-serif text-sm text-slate-700 dark:text-slate-200">{verb.infinitive}</span><span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{verb.pastParticiple}</span></div>))}
        </div>
      </div>
      <Collapsible title="Mental Models (all verbs)" defaultOpen={false} icon={<Zap className="w-4 h-4" />}>
        <div className="grid sm:grid-cols-2 gap-2 pt-2">
          {VERBS.map((verb) => (<div key={verb.id} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 px-3 py-2"><p className="text-xs font-bold text-slate-600 dark:text-slate-300">{verb.infinitive}</p><p className="text-xs font-serif text-slate-500 dark:text-slate-400 mt-0.5">{verb.mentalModel}</p></div>))}
        </div>
      </Collapsible>
      <div className="card p-5 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20">
        <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3">⚠️ Être or Avoir?</h3>
        <p className="text-sm text-amber-900 dark:text-amber-200 mb-4">These verbs can use either auxiliary depending on whether they have a direct object.</p>
        <div className="space-y-3">
          {dualAuxVerbs.map((verb) => (<div key={verb.id} className="bg-white/60 dark:bg-black/20 rounded-xl p-3"><p className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-2">{verb.infinitive} — {verb.english}</p><div className="grid sm:grid-cols-2 gap-2 text-xs"><div><Badge color="blue" size="sm">être</Badge><p className="font-serif text-slate-600 dark:text-slate-300 mt-1">{verb.dualAuxiliary!.êtreExample}</p></div><div><Badge color="emerald" size="sm">avoir</Badge><p className="font-serif text-slate-600 dark:text-slate-300 mt-1">{verb.dualAuxiliary!.avoirExample}</p></div></div></div>))}
        </div>
      </div>
      <button onClick={onPractise} className="btn-primary w-full justify-center py-3"><Zap className="w-5 h-5" /> Start 5-Minute Practice</button>
    </div>
  );
}
