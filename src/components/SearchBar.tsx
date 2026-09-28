import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onToggleFilter?: () => void;
  isFilterOpen?: boolean;
  activeFilterCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by title, author, genre, or ISBN...',
  onToggleFilter,
  isFilterOpen,
  activeFilterCount = 0,
}) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3.5 text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 shadow-soft transition-all"
        />
        <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute right-3.5 top-3.5 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {onToggleFilter && (
        <button
          onClick={onToggleFilter}
          className={`relative inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold rounded-2xl border transition-all shadow-soft shrink-0 ${
            isFilterOpen || activeFilterCount > 0
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-indigo-600 dark:bg-slate-900 dark:text-indigo-400 text-xs font-bold flex items-center justify-center shadow-xs">
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};
