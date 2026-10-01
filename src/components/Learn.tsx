import { useState } from 'react';
import { FAMILY_INFO, getVerb } from '@/data/verbs';
import { Badge, SectionTitle } from '@/components/ui';
import { ConjugationTable } from '@/components/ConjugationTable';
import type { VerbFamily } from '@/types';
import { PERSON_LABELS, TENSE_LABELS } from '@/types';
import { Brain, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface LearnProps {
  onPractiseVerb: (verbId: string) => void;
}

const ACCENT_COLORS: Record<string, { bg: string; text: string; border: string; chip: string }> = {
  blue: { bg: 'from-blue-50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900/50', chip: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
  emerald: { bg: 'from-emerald-50 to-emerald-100/30 dark:from-emerald-950/30 dark:to-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-300', border: 'border-emerald-200 dark:border-emerald-900/50', chip: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' },
  amber: { bg: 'from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20', text: 'text-amber-700 dark:text-amber-300', border: 'border-amber-200 dark:border-amber-900/50', chip: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
  rose: { bg: 'from-rose-50 to-rose-100/30 dark:from-rose-950/30 dark:to-rose-900/20', text: 'text-rose-700 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900/50', chip: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' },
  slate: { bg: 'from-slate-50 to-slate-100/30 dark:from-slate-900/30 dark:to-slate-800/20', text: 'text-slate-700 dark:text-slate-300', border: 'border-slate-200 dark:border-slate-700', chip: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300' },
};

export function Learn({ onPractiseVerb }: LearnProps) {
  const [selectedFamily, setSelectedFamily] = useState<VerbFamily | null>(null);
  if (selectedFamily) {
    const family = FAMILY_INFO.find((f) => f.id === selectedFamily)!;
    const accent = ACCENT_COLORS[family.accent] || ACCENT_COLORS.slate;
    const firstVerb = getVerb(family.verbs[0])!;
    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={() => setSelectedFamily(null)} className="btn-ghost text-sm"><ChevronRight className="w-4 h-4 rotate-180" /> Back to families</button>
        <div className={`card p-6 bg-gradient-to-br ${accent.bg} ${accent.border} relative overflow-hidden`}>
          <div className="relative">
            <h2 className={`text-2xl font-bold ${accent.text} mb-2`}>{family.label}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{family.description}</p>
            <div className="flex items-center gap-2"><Sparkles className={`w-4 h-4 ${accent.text}`} /><code className={`text-sm font-serif ${accent.text} bg-white/60 dark:bg-black/20 px-3 py-1 rounded-lg`}>{family.pattern}</code></div>
          </div>
        </div>
        <div className="card p-5 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
          <div className="flex items-start gap-3"><Brain className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /><div><h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">The key principle</h3><p className="text-sm text-amber-900 dark:text-amber-200">Don't memorise eight separate conjugation tables. Learn the <strong>stem + pattern + endings</strong> once. Then apply the same pattern to every verb in this family.</p></div></div>
        </div>
        <div className="card p-5"><h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Pattern demonstrated with <span className="text-blue-600 dark:text-blue-400">{firstVerb.infinitive}</span></h3><ConjugationTable verb={firstVerb} /></div>
        <div>
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">All verbs in this family</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {family.verbs.map((vid) => {
              const verb = getVerb(vid);
              if (!verb) return null;
              return (
                <div key={vid} className="card p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-2"><div><p className="font-bold text-slate-800 dark:text-slate-100">{verb.infinitive}</p><p className="text-xs text-slate-500 dark:text-slate-400">{verb.english}</p></div><Badge color="amber" size="sm">pp: {verb.pastParticiple}</Badge></div>
                  <p className="text-xs font-serif text-slate-500 dark:text-slate-400 mb-3">{verb.mentalModel}</p>
                  <div className="flex gap-2"><button onClick={() => onPractiseVerb(vid)} className="btn-secondary text-xs px-3 py-1.5">Practise <ArrowRight className="w-3 h-3" /></button></div>
                </div>
              );
            })}
          </div>
        </div>
        {family.id === 'er-regular' && (
          <div className="card p-5">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">How the passé composé works</h3>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-200 dark:border-blue-900/50">
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3"><strong>être + past participle</strong> — the participle agrees with the subject.</p>
              <div className="space-y-1.5 font-serif text-sm">
                <p className="text-slate-700 dark:text-slate-200"><span className="text-blue-600 dark:text-blue-400">Je suis</span> allé</p>
                <p className="text-slate-700 dark:text-slate-200"><span className="text-blue-600 dark:text-blue-400">Elle est</span> allé<span className="text-emerald-600 dark:text-emerald-400 font-semibold">e</span></p>
                <p className="text-slate-700 dark:text-slate-200"><span className="text-blue-600 dark:text-blue-400">Nous sommes</span> allé<span className="text-emerald-600 dark:text-emerald-400 font-semibold">s</span></p>
                <p className="text-slate-700 dark:text-slate-200"><span className="text-blue-600 dark:text-blue-400">Elles sont</span> allé<span className="text-emerald-600 dark:text-emerald-400 font-semibold">es</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle icon={<Brain className="w-6 h-6 text-blue-500" />} title="Learn" subtitle="Master the verb families and their patterns. One pattern unlocks every verb in the family." />
      <div className="card p-5 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
        <div className="flex items-start gap-3"><Brain className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" /><div><h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Don't memorise eight tables — learn the pattern</h3><p className="text-sm text-amber-900 dark:text-amber-200">Each family shares a conjugation pattern. Learn <strong>one verb's pattern</strong> and you can derive every other verb in that family. For example, once you know <strong>venir</strong>, you automatically know <strong> devenir, revenir, parvenir, intervenir, survenir</strong> — they all follow the same stem pattern.</p></div></div>
      </div>
      <div className="grid gap-4">
        {FAMILY_INFO.map((family, i) => {
          const accent = ACCENT_COLORS[family.accent] || ACCENT_COLORS.slate;
          const firstVerb = getVerb(family.verbs[0]);
          return (
            <button key={family.id} onClick={() => setSelectedFamily(family.id)} className={`card p-5 text-left bg-gradient-to-br ${accent.bg} ${accent.border} hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 group`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1"><span className={`text-xs font-bold ${accent.text} bg-white/60 dark:bg-black/20 px-2 py-0.5 rounded`}>Family {i + 1}</span><span className={`text-xs ${accent.text} font-medium`}>{family.verbs.length} verbs</span></div>
                  <h3 className={`text-lg font-bold ${accent.text} mb-1`}>{family.label}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{family.description}</p>
                  <div className="flex items-center gap-2"><code className={`text-xs font-serif ${accent.text} bg-white/60 dark:bg-black/20 px-2.5 py-1 rounded-lg`}>{firstVerb?.mentalModel}</code></div>
                </div>
                <ChevronRight className={`w-5 h-5 ${accent.text} shrink-0 mt-1 group-hover:translate-x-1 transition`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
