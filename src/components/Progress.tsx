import { useMemo } from 'react';
import type { MasteryState } from '@/types';
import { VERBS, getVerb } from '@/data/verbs';
import { ALL_TENSES, TENSE_LABELS } from '@/types';
import { Badge, ProgressBar, ProgressRing, SectionTitle } from '@/components/ui';
import { getMasteryColor, getMasteryBg, getMasteryLabel } from '@/lib/storage';
import { TrendingUp, Target, Flame, Calendar } from 'lucide-react';

interface ProgressProps {
  mastery: MasteryState;
}

export function Progress({ mastery }: ProgressProps) {
  const verbProgress = useMemo(() => { return VERBS.map((verb) => { const score = mastery.verbScores[verb.id] ?? 0; return { verb, score }; }).sort((a, b) => b.score - a.score); }, [mastery]);
  const tenseProgress = useMemo(() => { return ALL_TENSES.map((tense) => { const score = mastery.tenseScores[tense] ?? 0; return { tense, score }; }).sort((a, b) => a.score - b.score); }, [mastery]);
  const accuracy = mastery.totalAnswered > 0 ? Math.round((mastery.totalCorrect / mastery.totalAnswered) * 100) : 0;
  const masteredCount = Object.values(mastery.scores).filter((s) => s >= 80).length;
  const totalCombos = VERBS.length * ALL_TENSES.length;
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle icon={<TrendingUp className="w-6 h-6 text-blue-500" />} title="Progress" subtitle="Track your mastery across verbs and tenses." />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="card p-4 flex flex-col items-center"><ProgressRing value={mastery.overall} size={64} strokeWidth={5} label={`${mastery.overall}%`} /><p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Overall mastery</p></div>
        <div className="card p-4 flex flex-col items-center justify-center"><p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{accuracy}%</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Accuracy</p></div>
        <div className="card p-4 flex flex-col items-center justify-center"><p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{masteredCount}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">of {totalCombos} mastered</p></div>
        <div className="card p-4 flex flex-col items-center justify-center"><div className="flex items-center gap-1"><Flame className="w-6 h-6 text-orange-500" /><p className="text-3xl font-bold text-orange-500">{mastery.streak}</p></div><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Session streak</p></div>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Mastery by Tense</h3>
        <div className="space-y-3">
          {tenseProgress.map(({ tense, score }) => (
            <div key={tense}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{TENSE_LABELS[tense]}</span>
                <div className="flex items-center gap-2"><span className={`text-xs font-bold ${getMasteryColor(score)}`}>{getMasteryLabel(score)}</span><span className="text-xs text-slate-400 w-8 text-right">{score}%</span></div>
              </div>
              <ProgressBar value={score} />
            </div>
          ))}
        </div>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Mastery by Verb</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {verbProgress.map(({ verb, score }) => (
            <div key={verb.id} className="flex items-center gap-3">
              <span className="text-sm font-serif text-slate-700 dark:text-slate-200 w-28 shrink-0 truncate">{verb.infinitive}</span>
              <div className="flex-1"><ProgressBar value={score} /></div>
              <span className={`text-xs font-bold w-8 text-right ${getMasteryColor(score)}`}>{score}%</span>
            </div>
          ))}
        </div>
      </div>
      {mastery.sessions.length > 0 && (
        <div className="card p-5">
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4" /> Recent Sessions</h3>
          <div className="space-y-2">
            {mastery.sessions.slice(0, 10).map((session, i) => {
              const date = new Date(session.date);
              const pct = session.total > 0 ? Math.round((session.score / session.total) * 100) : 0;
              return (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800/60 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2"><span className="text-sm font-medium text-slate-700 dark:text-slate-200">{session.mode}</span><Badge color={pct >= 80 ? 'emerald' : pct >= 50 ? 'amber' : 'rose'} size="sm">{pct}%</Badge></div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{date.toLocaleDateString()} · {session.score}/{session.total} correct</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="card p-5 overflow-x-auto">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Detailed Matrix</h3>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 px-2 font-bold text-slate-400 sticky left-0 bg-white dark:bg-slate-900">Verb</th>
              {ALL_TENSES.map((tense) => (<th key={tense} className="py-2 px-1 font-bold text-slate-400 text-center min-w-[60px]">{TENSE_LABELS[tense].split(' ')[0]}</th>))}
            </tr>
          </thead>
          <tbody>
            {VERBS.map((verb) => (
              <tr key={verb.id} className="border-t border-slate-100 dark:border-slate-800/60">
                <td className="py-1.5 px-2 font-serif text-slate-700 dark:text-slate-200 sticky left-0 bg-white dark:bg-slate-900">{verb.infinitive}</td>
                {ALL_TENSES.map((tense) => {
                  const score = mastery.scores[`${verb.id}::${tense}`] ?? 0;
                  return (<td key={tense} className="py-1.5 px-1 text-center"><div className={`inline-flex items-center justify-center w-8 h-6 rounded text-[10px] font-bold ${getMasteryBg(score)} text-white`} title={`${verb.infinitive} — ${TENSE_LABELS[tense]}: ${score}%`}>{score}</div></td>);
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
