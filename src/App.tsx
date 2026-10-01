import { useState, useEffect, useCallback } from 'react';
import type { MasteryState, AppSettings } from '@/types';
import { loadMastery, saveMastery, recomputeMastery, loadSettings, saveSettings } from '@/lib/storage';
import { Dashboard } from '@/components/Dashboard';
import { Learn } from '@/components/Learn';
import { Explore } from '@/components/Explore';
import { Practise } from '@/components/Practise';
import { QuickReference } from '@/components/QuickReference';
import { Progress } from '@/components/Progress';
import { Comparison } from '@/components/Comparison';
import { RandomVerb } from '@/components/RandomVerb';
import { Brain, Search, Target, BookOpen, TrendingUp, Moon, Sun, Menu, X, GitCompare, Dice5 } from 'lucide-react';

type Section = 'dashboard' | 'learn' | 'explore' | 'practise' | 'quick-ref' | 'progress' | 'compare' | 'random';

const NAV_ITEMS: { id: Section; label: string; icon: typeof Brain }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Brain },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'practise', label: 'Practise', icon: Target },
  { id: 'quick-ref', label: 'Quick Ref', icon: BookOpen },
  { id: 'progress', label: 'Progress', icon: TrendingUp },
  { id: 'compare', label: 'Compare', icon: GitCompare },
  { id: 'random', label: 'Random', icon: Dice5 },
];

function App() {
  const [section, setSection] = useState<Section>('dashboard');
  const [mastery, setMastery] = useState<MasteryState>(() => recomputeMastery(loadMastery()));
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [exploreVerbId, setExploreVerbId] = useState<string | null>(null);
  const [compareVerbId, setCompareVerbId] = useState<string | undefined>(undefined);
  const [practiseMode, setPractiseMode] = useState<string | null>(null);

  useEffect(() => { saveMastery(mastery); }, [mastery]);

  useEffect(() => {
    saveSettings(settings);
    const root = document.documentElement;
    if (settings.theme === 'dark') { root.classList.add('dark'); }
    else if (settings.theme === 'light') { root.classList.remove('dark'); }
    else {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [settings]);

  const handleMasteryUpdate = useCallback((state: MasteryState) => { setMastery(state); }, []);
  const navigate = useCallback((s: string) => { setSection(s as Section); setMobileNavOpen(false); }, []);
  const handleQuickPractice = useCallback(() => { setPractiseMode('quiz'); setSection('practise'); setMobileNavOpen(false); }, []);
  const handleFlashcards = useCallback(() => { setPractiseMode('flashcards'); setSection('practise'); setMobileNavOpen(false); }, []);
  const handleRandomVerb = useCallback(() => { setSection('random'); setMobileNavOpen(false); }, []);
  const handlePractiseVerb = useCallback((verbId: string) => { setExploreVerbId(verbId); setSection('explore'); setMobileNavOpen(false); }, []);
  const handleCompare = useCallback((verbId: string) => { setCompareVerbId(verbId); setSection('compare'); setMobileNavOpen(false); }, []);
  const handleExploreVerb = useCallback((verbId: string) => { setExploreVerbId(verbId); setSection('explore'); setMobileNavOpen(false); }, []);
  const toggleTheme = () => { setSettings((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })); };

  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return <Dashboard mastery={mastery} onNavigate={navigate} onQuickPractice={handleQuickPractice} onFlashcards={handleFlashcards} onRandomVerb={handleRandomVerb} />;
      case 'learn':
        return <Learn onPractiseVerb={handlePractiseVerb} />;
      case 'explore':
        return <Explore initialVerbId={exploreVerbId} onCompare={handleCompare} />;
      case 'practise':
        return <Practise key={practiseMode || 'menu'} mastery={mastery} onMasteryUpdate={handleMasteryUpdate} initialMode={practiseMode} />;
      case 'quick-ref':
        return <QuickReference onPractise={handleQuickPractice} />;
      case 'progress':
        return <Progress mastery={mastery} />;
      case 'compare':
        return <Comparison initialVerbId={compareVerbId} onClose={() => setSection('explore')} />;
      case 'random':
        return <RandomVerb onPractiseVerb={(vid, _tense) => handlePractiseVerb(vid)} onExplore={handleExploreVerb} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 dark:bg-slate-950">
      <aside className="hidden md:flex flex-col w-60 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">être</div>
            <div><h1 className="font-bold text-sm text-slate-800 dark:text-slate-100">French Verbs</h1><p className="text-[10px] text-slate-400 dark:text-slate-500">Conjugation trainer</p></div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (<button key={item.id} onClick={() => navigate(item.id)} className={`nav-link w-full ${section === item.id ? 'nav-link-active' : ''}`}><Icon className="w-4 h-4 shrink-0" /><span>{item.label}</span></button>);
          })}
        </nav>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-2 py-1"><span className="text-xs text-slate-400 dark:text-slate-500">Overall mastery</span><span className="text-xs font-bold text-slate-600 dark:text-slate-300">{mastery.overall}%</span></div>
          <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mt-1 mx-2">
            <div className={`h-full rounded-full transition-all duration-500 ${mastery.overall >= 80 ? 'bg-emerald-500' : mastery.overall >= 50 ? 'bg-amber-500' : mastery.overall >= 25 ? 'bg-orange-500' : 'bg-rose-500'}`} style={{ width: `${mastery.overall}%` }} />
          </div>
          <button onClick={toggleTheme} className="nav-link w-full mt-2">{settings.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}<span>{settings.theme === 'dark' ? 'Light mode' : 'Dark mode'}</span></button>
        </div>
      </aside>

      <div className="md:hidden sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs">être</div>
          <h1 className="font-bold text-sm text-slate-800 dark:text-slate-100">French Être Verbs</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="btn-ghost p-2">{settings.theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="btn-ghost p-2">{mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/30" onClick={() => setMobileNavOpen(false)}>
          <div className="absolute top-0 right-0 bottom-0 w-64 bg-white dark:bg-slate-900 p-4 overflow-y-auto animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1 mt-12">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (<button key={item.id} onClick={() => navigate(item.id)} className={`nav-link w-full ${section === item.id ? 'nav-link-active' : ''}`}><Icon className="w-4 h-4 shrink-0" /><span>{item.label}</span></button>);
              })}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-8 pb-24 md:pb-8">{renderSection()}</div>
      </main>
    </div>
  );
}

export default App;
