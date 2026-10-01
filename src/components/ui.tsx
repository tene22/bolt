import type { ReactNode } from 'react';

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
}

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  label,
  sublabel,
  color,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const strokeColor = color || (value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : value >= 25 ? '#f97316' : '#f43f5e');
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-slate-200 dark:stroke-slate-800" />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} stroke={strokeColor} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="text-lg font-bold text-slate-800 dark:text-slate-100">{label}</span>}
        {sublabel && <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{sublabel}</span>}
      </div>
    </div>
  );
}

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = '', showLabel = false }: ProgressBarProps) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-amber-500' : value >= 25 ? 'bg-orange-500' : 'bg-rose-500';
  return (
    <div className={`relative h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ${className}`}>
      <div className={`absolute inset-y-0 left-0 rounded-full ${color} transition-all duration-500`} style={{ width: `${value}%` }} />
      {showLabel && (<span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-500 dark:text-slate-400">{value}%</span>)}
    </div>
  );
}

interface BadgeProps {
  children: ReactNode;
  color?: 'blue' | 'emerald' | 'amber' | 'rose' | 'slate' | 'orange';
  size?: 'sm' | 'md';
}

export function Badge({ children, color = 'slate', size = 'sm' }: BadgeProps) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300',
    slate: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  };
  const sizes = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-3 py-1';
  return <span className={`chip ${colors[color]} ${sizes}`}>{children}</span>;
}

interface CollapsibleProps {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
}

export function Collapsible({ title, children, defaultOpen = false, icon }: CollapsibleProps) {
  return (
    <details className="card overflow-hidden group" open={defaultOpen}>
      <summary className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
        {icon && <span className="text-blue-500">{icon}</span>}
        <span className="flex-1 font-semibold text-sm text-slate-700 dark:text-slate-200">{title}</span>
        <svg className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </summary>
      <div className="px-4 pb-4 pt-0">{children}</div>
    </details>
  );
}

interface TabsProps {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-px -mb-px scrollbar-none">
      {tabs.map((tab) => (
        <button key={tab.id} onClick={() => onChange(tab.id)} className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all ${activeId === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{tab.label}</button>
      ))}
    </div>
  );
}

interface SectionTitleProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionTitle({ icon, title, subtitle, action }: SectionTitleProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-start gap-3">
        {icon && <span className="text-2xl shrink-0">{icon}</span>}
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
