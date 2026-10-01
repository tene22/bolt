import { useState, useMemo, useEffect, useRef } from 'react';
import { VERBS, getVerb } from '@/data/verbs';
import { Badge, SectionTitle } from '@/components/ui';
import { ConjugationTable } from '@/components/ConjugationTable';
import { search, SearchResult } from '@/lib/search';
import { Search, X, ArrowLeft, GitCompare, Dice5 } from 'lucide-react';
import type { Verb } from '@/types';

interface ExploreProps {
  initialVerbId?: string | null;
  onCompare: (verbId: string) => void;
}

export function Explore({ initialVerbId, onCompare }: ExploreProps) {
  const [query, setQuery] = useState('');
  const [selectedVerb, setSelectedVerb] = useState<Verb | null>(null);
  const [showTranslations, setShowTranslations] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { if (initialVerbId) { const verb = getVerb(initialVerbId); if (verb) setSelectedVerb(verb); } }, [initialVerbId]);
  const searchResults = useMemo(() => search(query), [query]);
  const grouped = useMemo(() => { if (query) return null; const groups: Record<string, Verb[]> = {}; for (const verb of VERBS) { if (!groups[verb.family]) groups[verb.family] = []; groups[verb.family].push(verb); } return groups; }, [query]);
  const familyLabels: Record<string, string> = { 'er-regular': 'Regular -ER', 'partir-sortir': 'Partir / Sortir', 'venir': 'Venir family', 'life-death': 'Life & Death', 'aller': 'Aller' };
  if (selectedVerb) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button onClick={() => setSelectedVerb(null)} className="btn-ghost text-sm"><ArrowLeft className="w-4 h-4" /> Back to all verbs</button>
        <div className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div><h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 font-serif">{selectedVerb.infinitive}</h1><p className="text-lg text-slate-500 dark:text-slate-400 mt-1">{selectedVerb.english}</p></div>
            <div className="flex flex-wrap gap-2"><Badge color="blue" size="md">être</Badge><Badge color="emerald" size="md">pp: {selectedVerb.pastParticiple}</Badge>{selectedVerb.dualAuxiliary && <Badge color="amber" size="md">être / avoir</Badge>}{selectedVerb.reflexive && <Badge color="rose" size="md">pronominal</Badge>}</div>
          </div>
          {selectedVerb.note && <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3">{selectedVerb.note}</p>}
          <div className="flex gap-2 mt-4"><button onClick={() => onCompare(selectedVerb.id)} className="btn-secondary text-xs"><GitCompare className="w-3.5 h-3.5" /> Compare with another verb</button></div>
        </div>
        {selectedVerb.dualAuxiliary && (
          <div className="card p-5 border-amber-200 dark:border-amber-900/50 bg-gradient-to-br from-amber-50 to-amber-100/30 dark:from-amber-950/30 dark:to-amber-900/20">
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">⚠️ Être or Avoir?</h3>
            <p className="text-sm text-amber-900 dark:text-amber-200 mb-4">{selectedVerb.dualAuxiliary.meaning}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white/60 dark:bg-black/20 rounded-xl p-3"><Badge color="blue" size="sm">être</Badge><p className="font-serif text-sm text-slate-700 dark:text-slate-200 mt-2">{selectedVerb.dualAuxiliary.êtreExample}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedVerb.dualAuxiliary.êtreTranslation}</p></div>
              <div className="bg-white/60 dark:bg-black/20 rounded-xl p-3"><Badge color="emerald" size="sm">avoir</Badge><p className="font-serif text-sm text-slate-700 dark:text-slate-200 mt-2">{selectedVerb.dualAuxiliary.avoirExample}</p><p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{selectedVerb.dualAuxiliary.avoirTranslation}</p></div>
            </div>
          </div>
        )}
        <ConjugationTable verb={selectedVerb} />
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4"><h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">Example Sentences</h3><button onClick={() => setShowTranslations(!showTranslations)} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">{showTranslations ? 'Hide' : 'Show'} translations</button></div>
          <div className="space-y-3">
            {selectedVerb.examples.map((ex, i) => (
              <div key={i} className="border-l-2 border-blue-200 dark:border-blue-800 pl-4"><p className="font-serif text-base text-slate-800 dark:text-slate-100">{ex.fr}</p>{showTranslations && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 animate-fade-in">{ex.en}</p>}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 animate-fade-in">
      <SectionTitle icon={<Search className="w-6 h-6 text-blue-500" />} title="Explore" subtitle="Search and browse all verbs and their complete conjugations." />
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input ref={searchRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search verbs, meanings, participles, or tenses... (e.g. 'come', 'venu', 'past')" className="input pl-12 pr-12 text-base" />
        {query && <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>}
      </div>
      {query && (
        <div className="space-y-2">
          {searchResults.length === 0 ? <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">No results for "{query}"</p> : searchResults.map((result, i) => <SearchResultRow key={i} result={result} onSelect={setSelectedVerb} />)}
        </div>
      )}
      {!query && grouped && (
        <div className="space-y-6">
          {Object.entries(grouped).map(([family, verbs]) => (
            <div key={family}>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">{familyLabels[family] || family}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {verbs.map((verb) => (
                  <button key={verb.id} onClick={() => setSelectedVerb(verb)} className="card p-4 text-left hover:shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0 group">
                    <div className="flex items-center justify-between mb-1"><p className="font-bold text-slate-800 dark:text-slate-100 font-serif">{verb.infinitive}</p>{verb.dualAuxiliary && <Badge color="amber">être/avoir</Badge>}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{verb.english}</p>
                    <p className="text-xs font-serif text-slate-400 dark:text-slate-500 mt-2">{verb.mentalModel}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchResultRow({ result, onSelect }: { result: SearchResult; onSelect: (verb: Verb) => void }) {
  const verb = result.verbId ? getVerb(result.verbId) : null;
  if (result.type === 'verb' && verb) {
    return (<button onClick={() => onSelect(verb)} className="card w-full p-3 flex items-center justify-between text-left hover:shadow-md transition group"><div><p className="font-bold text-slate-800 dark:text-slate-100 font-serif">{result.label}</p><p className="text-xs text-slate-500 dark:text-slate-400">{result.subtitle}</p></div><Badge color="blue">verb</Badge></button>);
  }
  if (result.type === 'tense') {
    return (<div className="card w-full p-3 flex items-center justify-between"><div><p className="font-bold text-slate-800 dark:text-slate-100">{result.label}</p><p className="text-xs text-slate-500 dark:text-slate-400">{result.subtitle}</p></div><Badge color="emerald">tense</Badge></div>);
  }
  return null;
}
