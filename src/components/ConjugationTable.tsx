import { useState } from 'react';
import type { Verb, Tense, Person } from '@/types';
import { TENSE_GROUPS, TENSE_LABELS, PERSON_LABELS, IMPERATIVE_LABELS } from '@/types';
import { Badge, Collapsible } from '@/components/ui';
import { Lightbulb } from 'lucide-react';

interface ConjugationTableProps {
  verb: Verb;
}

function highlightAgreement(form: string) {
  return form.split(' ').map((word, i) => {
    const agreementMatch = word.match(/\((e|s|es)\)/g);
    if (agreementMatch) {
      const base = word.replace(/\((e|s|es)\)/g, '');
      const agreement = word.match(/\((e|s|es)\)/)?.[1];
      return (<span key={i}>{base}<span className="text-emerald-600 dark:text-emerald-400 font-semibold">({agreement})</span></span>);
    }
    if (['suis', 'es', 'est', 'sommes', 'êtes', 'sont'].includes(word)) {
      return (<span key={i} className="text-blue-600 dark:text-blue-400 font-medium">{word}</span>);
    }
    if (word.endsWith('ée') || word.endsWith('és') || word.endsWith('ées')) {
      return (<span key={i}><span>{word.slice(0, -2)}</span><span className="text-emerald-600 dark:text-emerald-400 font-semibold">{word.slice(-2)}</span></span>);
    }
    if (word.endsWith('e') && word.length > 2 && word !== 'je' && word !== 'tu' && word !== 'il' && word !== 'ne' && word !== 'se' && word !== 'me' && word !== 'te' && word !== 'le' && word !== 'de') {
      return <span key={i}>{word}</span>;
    }
    return <span key={i}>{word}</span>;
  }).reduce((acc: React.ReactNode[], el, i) => { if (i > 0) acc.push(' '); acc.push(el); return acc; }, []);
}

function TenseBlock({ verb, tense }: { verb: Verb; tense: Tense }) {
  const conj = verb.conjugations[tense];
  if (!conj) return null;
  const labels = tense === 'impératif' ? IMPERATIVE_LABELS : PERSON_LABELS;
  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
      <div className="bg-slate-50 dark:bg-slate-800/50 px-3 py-2 border-b border-slate-200 dark:border-slate-800">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{TENSE_LABELS[tense]}</h4>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {labels.map(({ person, label }) => {
          const form = conj[person as Person];
          if (!form) return null;
          return (
            <div key={person} className="flex items-baseline gap-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
              <span className="text-xs text-slate-400 dark:text-slate-500 w-20 shrink-0">{label}</span>
              <span className="text-sm font-serif text-slate-800 dark:text-slate-100 flex-1">{highlightAgreement(form)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConjugationTable({ verb }: ConjugationTableProps) {
  const [activeGroup, setActiveGroup] = useState(0);
  const group = TENSE_GROUPS[activeGroup];
  return (
    <div className="space-y-4">
      <div className="card p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">Remember This</h3>
        </div>
        <p className="text-base font-serif text-amber-900 dark:text-amber-200 font-medium">{verb.mentalModel}</p>
        <p className="text-xs text-amber-700 dark:text-amber-400 mt-1.5">présent → imparfait → futur → past participle → subjonctif</p>
      </div>
      <div className="flex gap-2">
        {TENSE_GROUPS.map((g, i) => (
          <button key={g.label} onClick={() => setActiveGroup(i)} className={`px-3 py-1.5 text-sm font-medium rounded-lg transition ${activeGroup === i ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{g.label}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {group.tenses.map((tense) => (<TenseBlock key={tense} verb={verb} tense={tense} />))}
      </div>
      <Collapsible title={`Also: ${TENSE_GROUPS[1 - activeGroup].label}`}>
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          {TENSE_GROUPS[1 - activeGroup].tenses.map((tense) => (<TenseBlock key={tense} verb={verb} tense={tense} />))}
        </div>
      </Collapsible>
    </div>
  );
}
