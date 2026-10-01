import { useState, useEffect, useCallback } from 'react';
import type { QuizQuestion, MasteryState, SessionResult } from '@/types';
import { generateQuiz, generateFlashcards, checkAnswer } from '@/lib/quiz';
import { updateScore, recordSession, getWeakAreas } from '@/lib/storage';
import { getVerb } from '@/data/verbs';
import { TENSE_LABELS } from '@/types';
import { Badge, ProgressRing, ProgressBar, SectionTitle } from '@/components/ui';
import { Zap, Layers, Check, X, RotateCcw, ChevronRight, Brain, Target } from 'lucide-react';

interface PractiseProps {
  mastery: MasteryState;
  onMasteryUpdate: (state: MasteryState) => void;
  initialMode?: string | null;
}

type Mode = 'menu' | 'quiz' | 'flashcards' | 'results';

export function Practise({ mastery, onMasteryUpdate, initialMode }: PractiseProps) {
  const [mode, setMode] = useState<Mode>('menu');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [flashcardIdx, setFlashcardIdx] = useState(0);
  const [flashcardRevealed, setFlashcardRevealed] = useState(false);
  const [flashcards, setFlashcards] = useState<{ verbId: string; tense: string; question: string; answer: string; pattern: string }[]>([]);
  const [flashcardResults, setFlashcardResults] = useState<{ knew: number; almost: number; didnt: number }>({ knew: 0, almost: 0, didnt: 0 });

  useEffect(() => {
    if (initialMode === 'quiz') { startQuickPractice(); }
    else if (initialMode === 'flashcards') { startFlashcards(); }
  }, []);

  const startQuickPractice = useCallback(() => {
    const weak = getWeakAreas(mastery, 20);
    const quiz = generateQuiz({ count: 10, weakAreas: weak });
    setQuestions(quiz);
    setCurrentIdx(0);
    setScore(0);
    setAnsweredCount(0);
    setUserAnswer('');
    setSelectedOption(null);
    setHasAnswered(false);
    setIsCorrect(false);
    setMode('quiz');
  }, [mastery]);

  const startFlashcards = useCallback(() => {
    const weak = getWeakAreas(mastery, 20);
    const cards = generateFlashcards({ count: 15, weakAreas: weak });
    setFlashcards(cards);
    setFlashcardIdx(0);
    setFlashcardRevealed(false);
    setFlashcardResults({ knew: 0, almost: 0, didnt: 0 });
    setMode('flashcards');
  }, [mastery]);

  const currentQuestion = questions[currentIdx];

  const handleAnswer = useCallback(() => {
    if (!currentQuestion || hasAnswered) return;
    let correct = false;
    if (currentQuestion.options) { correct = selectedOption === currentQuestion.answer; }
    else { correct = checkAnswer(currentQuestion, userAnswer); }
    setIsCorrect(correct);
    setHasAnswered(true);
    if (correct) setScore((s) => s + 1);
    setAnsweredCount((c) => c + 1);
    const tense = currentQuestion.tense || 'présent';
    const newState = updateScore(mastery, currentQuestion.verbId, tense, correct);
    onMasteryUpdate(newState);
  }, [currentQuestion, hasAnswered, selectedOption, userAnswer, mastery, onMasteryUpdate]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      const finalScore = score;
      const result: SessionResult = {
        date: new Date().toISOString(),
        score: finalScore,
        total: questions.length,
        mode: '5-min practice',
        weakAreas: getWeakAreas(mastery, 3).map((w) => `${getVerb(w.verbId)?.infinitive || w.verbId} — ${TENSE_LABELS[w.tense as keyof typeof TENSE_LABELS]}`),
      };
      const newState = recordSession(mastery, result);
      onMasteryUpdate(newState);
      setMode('results');
    } else {
      setCurrentIdx((i) => i + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setHasAnswered(false);
      setIsCorrect(false);
    }
  }, [currentIdx, questions.length, score, mastery, onMasteryUpdate]);

  const handleFlashcardResult = useCallback((result: 'knew' | 'almost' | 'didnt') => {
    const card = flashcards[flashcardIdx];
    if (!card) return;
    const correct = result === 'knew';
    const partial = result === 'almost';
    const newState = updateScore(mastery, card.verbId, card.tense, correct || partial);
    onMasteryUpdate(newState);
    setFlashcardResults((r) => ({
      knew: r.knew + (result === 'knew' ? 1 : 0),
      almost: r.almost + (result === 'almost' ? 1 : 0),
      didnt: r.didnt + (result === 'didnt' ? 1 : 0),
    }));
    if (flashcardIdx + 1 >= flashcards.length) {
      const result2: SessionResult = {
        date: new Date().toISOString(),
        score: flashcardResults.knew + (result === 'knew' ? 1 : 0),
        total: flashcards.length,
        mode: 'flashcards',
        weakAreas: getWeakAreas(mastery, 3).map((w) => `${getVerb(w.verbId)?.infinitive || w.verbId} — ${TENSE_LABELS[w.tense as keyof typeof TENSE_LABELS]}`),
      };
      const finalState = recordSession(newState, result2);
      onMasteryUpdate(finalState);
      setMode('results');
    } else {
      setFlashcardIdx((i) => i + 1);
      setFlashcardRevealed(false);
    }
  }, [flashcards, flashcardIdx, mastery, onMasteryUpdate, flashcardResults.knew]);

  if (mode === 'menu') {
    return (
      <div className="space-y-6 animate-fade-in">
        <SectionTitle icon={<Target className="w-6 h-6 text-blue-500" />} title="Practise" subtitle="Active recall is the most effective way to memorise. Start practising in one click." />
        <div className="grid sm:grid-cols-2 gap-4">
          <button onClick={startQuickPractice} className="card p-6 text-left hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 group bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20 border-amber-200 dark:border-amber-900/50">
            <Zap className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">5-Minute Practice</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">10 mixed questions targeting your weakest areas</p>
            <div className="flex items-center gap-2 mt-4"><Badge color="amber">Mixed types</Badge><Badge color="slate">~5 min</Badge></div>
          </button>
          <button onClick={startFlashcards} className="card p-6 text-left hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 group bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-900/50">
            <Layers className="w-8 h-8 text-blue-500 mb-3 group-hover:scale-110 transition" />
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">Flashcards</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">15 cards — think, reveal, then rate yourself</p>
            <div className="flex items-center gap-2 mt-4"><Badge color="blue">Spaced repetition</Badge><Badge color="slate">~5 min</Badge></div>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="card p-4 text-center"><p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{mastery.totalAnswered}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Questions answered</p></div>
          <div className="card p-4 text-center"><p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{mastery.totalCorrect}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Correct answers</p></div>
          <div className="card p-4 text-center"><p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mastery.streak}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Session streak</p></div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz' && currentQuestion) {
    const progress = ((currentIdx) / questions.length) * 100;
    const verb = getVerb(currentQuestion.verbId);
    return (
      <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3"><ProgressBar value={progress} className="flex-1" /><span className="text-xs font-bold text-slate-400 shrink-0">{currentIdx + 1}/{questions.length}</span></div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">{verb && <Badge color="blue">{verb.infinitive}</Badge>}{currentQuestion.tense && <Badge color="emerald">{TENSE_LABELS[currentQuestion.tense]}</Badge>}</div>
            <Badge color="slate">Level {currentQuestion.difficulty}</Badge>
          </div>
          <p className="text-lg font-medium text-slate-800 dark:text-slate-100 whitespace-pre-line mb-6">{currentQuestion.question}</p>
          {currentQuestion.options ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isAnswer = opt === currentQuestion.answer;
                let cls = 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30';
                if (hasAnswered) {
                  if (isAnswer) cls = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300';
                  else if (isSelected) cls = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300';
                  else cls = 'border-slate-200 dark:border-slate-700 opacity-60';
                } else if (isSelected) { cls = 'border-blue-500 bg-blue-50 dark:bg-blue-950/40'; }
                return (
                  <button key={opt} disabled={hasAnswered} onClick={() => setSelectedOption(opt)} className={`text-left px-4 py-3 rounded-xl border-2 transition-all font-serif text-sm ${cls}`}>
                    {opt}{hasAnswered && isAnswer && <Check className="inline-block w-4 h-4 ml-2" />}{hasAnswered && isSelected && !isAnswer && <X className="inline-block w-4 h-4 ml-2" />}
                  </button>
                );
              })}
            </div>
          ) : (
            <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !hasAnswered && userAnswer.trim()) handleAnswer(); }} disabled={hasAnswered} placeholder="Type your answer..." className={`input text-base font-serif ${hasAnswered ? (isCorrect ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' : 'border-rose-500 bg-rose-50 dark:bg-rose-950/40') : ''}`} autoFocus />
          )}
          {hasAnswered && (
            <div className={`mt-4 rounded-xl p-4 animate-pop-in ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'bg-rose-50 dark:bg-rose-950/40'}`}>
              <div className="flex items-center gap-2 mb-2">{isCorrect ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-rose-600" />}<p className={`font-bold text-sm ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'}`}>{isCorrect ? 'Correct!' : 'Not quite.'}</p></div>
              {!isCorrect && <p className="text-sm text-slate-700 dark:text-slate-200 mb-2">Answer: <span className="font-serif font-semibold text-slate-800 dark:text-slate-100">{currentQuestion.answer}</span></p>}
              {currentQuestion.explanation && <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{currentQuestion.explanation}</p>}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          {!hasAnswered ? (
            <button onClick={handleAnswer} disabled={currentQuestion.options ? !selectedOption : !userAnswer.trim()} className="btn-primary">Check Answer</button>
          ) : (
            <button onClick={handleNext} className="btn-primary animate-pop-in">{currentIdx + 1 >= questions.length ? 'See Results' : 'Next Question'}<ChevronRight className="w-4 h-4" /></button>
          )}
        </div>
      </div>
    );
  }

  if (mode === 'flashcards' && flashcards.length > 0) {
    const card = flashcards[flashcardIdx];
    const progress = (flashcardIdx / flashcards.length) * 100;
    return (
      <div className="space-y-4 animate-fade-in max-w-2xl mx-auto">
        <div className="flex items-center gap-3"><ProgressBar value={progress} className="flex-1" /><span className="text-xs font-bold text-slate-400 shrink-0">{flashcardIdx + 1}/{flashcards.length}</span></div>
        <div className="flashcard-flip cursor-pointer" onClick={() => setFlashcardRevealed(!flashcardRevealed)}>
          <div className={`flashcard-inner ${flashcardRevealed ? 'flashcard-flipped' : ''} relative h-72`}>
            <div className="flashcard-face absolute inset-0 card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
              <Badge color="blue" size="md">{getVerb(card.verbId)?.infinitive}</Badge>
              <p className="text-xl font-medium text-slate-800 dark:text-slate-100 text-center mt-4 whitespace-pre-line font-serif">{card.question.split('\n')[1] || card.question}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-6">Tap to reveal</p>
            </div>
            <div className="flashcard-face flashcard-back absolute inset-0 card p-8 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950/40 dark:to-blue-900/20 border-blue-200 dark:border-blue-900/50">
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center font-serif animate-pop-in">{card.answer}</p>
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800 w-full text-center"><p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Memory pattern</p><p className="text-sm font-serif text-slate-600 dark:text-slate-300">{card.pattern}</p></div>
            </div>
          </div>
        </div>
        {flashcardRevealed ? (
          <div className="grid grid-cols-3 gap-3 animate-pop-in">
            <button onClick={() => handleFlashcardResult('didnt')} className="btn bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-200 dark:hover:bg-rose-900/40"><X className="w-4 h-4" /> Didn't know</button>
            <button onClick={() => handleFlashcardResult('almost')} className="btn bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/40">~ Almost</button>
            <button onClick={() => handleFlashcardResult('knew')} className="btn bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/40"><Check className="w-4 h-4" /> Knew it</button>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-400 dark:text-slate-500">Tap the card to reveal the answer</p>
        )}
      </div>
    );
  }

  if (mode === 'results') {
    const total = questions.length || flashcards.length;
    const finalScore = flashcardResults.knew || score;
    const weakAreas = getWeakAreas(mastery, 3);
    const percentage = total > 0 ? Math.round((finalScore / total) * 100) : 0;
    return (
      <div className="space-y-6 animate-fade-in max-w-2xl mx-auto text-center">
        <div className="card p-8">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Session Complete</h2>
          <ProgressRing value={percentage} size={120} strokeWidth={8} label={`${finalScore}/${total}`} sublabel="correct" />
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-4">{percentage >= 80 ? 'Excellent!' : percentage >= 50 ? 'Good effort!' : 'Keep practising!'}</p>
        </div>
        {weakAreas.length > 0 && (
          <div className="card p-5 text-left">
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-2"><Brain className="w-4 h-4" /> Focus next time</h3>
            <div className="space-y-2">
              {weakAreas.map((area, i) => {
                const verb = getVerb(area.verbId);
                return (<div key={i} className="flex items-center gap-3 text-sm"><span className="w-5 text-slate-300 dark:text-slate-600 font-bold">{i + 1}</span><span className="font-medium text-slate-700 dark:text-slate-200 flex-1">{verb?.infinitive} — {TENSE_LABELS[area.tense as keyof typeof TENSE_LABELS]}</span><span className="text-xs font-bold text-slate-400">{area.score}%</span></div>);
              })}
            </div>
          </div>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={() => setMode('menu')} className="btn-secondary"><RotateCcw className="w-4 h-4" /> Back to menu</button>
          <button onClick={startQuickPractice} className="btn-primary"><Zap className="w-4 h-4" /> Practice again</button>
        </div>
      </div>
    );
  }

  return null;
}
