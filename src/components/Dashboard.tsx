import type { MasteryState } from '@/types';
import { VERBS, CORE_VERBS, FAMILY_INFO } from '@/data/verbs';
import { ProgressRing, ProgressBar, Badge } from '@/components/ui';
import { getWeakAreas, getDueCardCount } from '@/lib/storage';
import { getVerb } from '@/data/verbs';
import { Zap, Layers, BookOpen, Dice5, Brain, Target, TrendingUp } from 'lucide-react';
import { TENSE_LABELS } from '@/types';

interface DashboardProps {
  mastery: MasteryState;
  onNavigate: (section: string) => void;
  onQuickPractice: () => void;
  onFlashcards: () => void;
  onRandomVerb: () => void;
}

export function Dashboard({ mastery, onNavigate, onQuickPractice, onFlashcards, onRandomVerb }: DashboardProps) {
  const weakAreas = getWeakAreas(mastery, 3);
  const dueCount = getDueCardCount(mastery);
  const coreCount = CORE_VERBS.length;
  const familyCount = FAMILY_INFO.length;
  const continueLearning = weakAreas[0];
  const continueVerb = continueLearning ? getVerb(continueLearning.verbId) : null;
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card p-6 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 border-0 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        <div className="relative">
          <h1 className="text-2xl font-bold mb-1">French Être Verbs</h1>
          <p className="text-blue-100 text-sm mb-6">Your personal French conjugation trainer</p>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <ProgressRing value={mastery.overall} size={72} color="#ffffff" label={`${mastery.overall}%`} sublabel="mastery" />
              <div className="space-y-1">
                <div className="flex items-center gap-2"><Brain className="w-4 h-4 text-blue-200" /><span className="text-sm">{coreCount} core verbs</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-200" /><span className="text-sm">{familyCount} grammar families</span></div>
                <div className="flex items-center gap-2"><Target className="w-4 h-4 text-blue-200" /><span className="text-sm">{mastery.streak} day streak</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button onClick={onQuickPractice} className="card p-4 text-left hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group"><Zap className="w-6 h-6 text-amber-500 mb-2 group-hover:scale-110 transition" /><p className="font-bold text-sm text-slate-800 dark:text-slate-100">5-Min Practice</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Mixed quiz on weak areas</p></button>
        <button onClick={onFlashcards} className="card p-4 text-left hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group"><Layers className="w-6 h-6 text-blue-500 mb-2 group-hover:scale-110 transition" /><p className="font-bold text-sm text-slate-800 dark:text-slate-100">Flashcards</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{dueCount} cards due</p></button>
        <button onClick={() => onNavigate('explore')} className="card p-4 text-left hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group"><BookOpen className="w-6 h-6 text-emerald-500 mb-2 group-hover:scale-110 transition" /><p className="font-bold text-sm text-slate-800 dark:text-slate-100">All Verbs</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{VERBS.length} verbs to explore</p></button>
        <button onClick={onRandomVerb} className="card p-4 text-left hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group"><Dice5 className="w-6 h-6 text-rose-500 mb-2 group-hover:scale-110 transition" /><p className="font-bold text-sm text-slate-800 dark:text-slate-100">Random Verb</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Surprise me</p></button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Continue Learning</h3>
          {continueVerb && continueLearning ? (
            <button onClick={() => onNavigate('learn')} className="w-full text-left group">
              <div className="flex items-center justify-between mb-2">
                <div><p className="text-lg font-bold text-slate-800 dark:text-slate-100">{continueVerb.infinitive}</p><p className="text-sm text-slate-500 dark:text-slate-400">{TENSE_LABELS[continueLearning.tense as keyof typeof TENSE_LABELS]}</p></div>
                <ProgressRing value={continueLearning.score} size={56} strokeWidth={5} label={`${continueLearning.score}%`} />
              </div>
              <ProgressBar value={continueLearning.score} />
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 group-hover:underline">Continue →</p>
            </button>
          ) : (
            <div className="text-center py-6"><TrendingUp className="w-8 h-8 text-emerald-400 mx-auto mb-2" /><p className="text-sm text-slate-500 dark:text-slate-400">You're all caught up! Try a practice session.</p></div>
          )}
        </div>
        <div className="card p-5">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">Today's Review</h3>
          <div className="flex items-center justify-between">
            <div><p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{dueCount}</p><p className="text-sm text-slate-500 dark:text-slate-400 mt-1">cards due for review</p></div>
            <div className="flex flex-col items-end gap-2">
              <Badge color={dueCount > 20 ? 'rose' : dueCount > 10 ? 'amber' : 'emerald'}>{dueCount > 20 ? 'Lots to review' : dueCount > 10 ? 'Good session' : 'Nearly done'}</Badge>
              <button onClick={onQuickPractice} className="btn-primary text-xs px-3 py-2"><Zap className="w-3.5 h-3.5" /> Start</button>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-5">
        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">Weakest Areas</h3>
        <div className="space-y-3">
          {weakAreas.length > 0 ? weakAreas.map((area, i) => {
            const verb = getVerb(area.verbId);
            if (!verb) return null;
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-300 dark:text-slate-600 w-5">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{verb.infinitive} — <span className="text-slate-500 dark:text-slate-400 font-normal">{TENSE_LABELS[area.tense as keyof typeof TENSE_LABELS]}</span></span>
                    <span className="text-xs font-bold text-slate-400">{area.score}%</span>
                  </div>
                  <ProgressBar value={area.score} />
                </div>
              </div>
            );
          }) : (<p className="text-sm text-slate-400 dark:text-slate-500 text-center py-4">No data yet — start practising to see your weak areas.</p>)}
        </div>
      </div>
    </div>
  );
}
