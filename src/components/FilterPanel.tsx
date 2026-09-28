import React from 'react';
import { FilterState, SortOption } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { RotateCcw, X, Check, Star } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  isMobileModal?: boolean;
  onCloseMobileModal?: () => void;
  availableGenres: string[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  isMobileModal = false,
  onCloseMobileModal,
  availableGenres,
}) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest Releases' },
    { value: 'title-asc', label: 'Title (A – Z)' },
    { value: 'pages-asc', label: 'Fewest Pages' },
  ];

  const content = (
    <div className="space-y-6">
      
      {/* Mobile Header */}
      {isMobileModal && (
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Filter & Sort Catalog
          </h3>
          <button
            onClick={onCloseMobileModal}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* 1. Sort By Dropdown */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Sort Catalog By
        </label>
        <select
          value={filters.sortBy}
          onChange={e => onFilterChange({ sortBy: e.target.value as SortOption })}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Category Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={e => onFilterChange({ category: e.target.value, genre: '' })}
          className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
        >
          <option value="">All Categories ({CATEGORIES_DATA.length})</option>
          {CATEGORIES_DATA.map(cat => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Genre Selector (if category chosen or generic) */}
      {availableGenres.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Specific Genre
          </label>
          <select
            value={filters.genre}
            onChange={e => onFilterChange({ genre: e.target.value })}
            className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          >
            <option value="">All Genres</option>
            {availableGenres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 4. Availability Segmented Control */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Availability Status
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
          {(['all', 'available', 'borrowed'] as const).map(status => {
            const isActive = filters.availability === status;
            return (
              <button
                key={status}
                type="button"
                onClick={() => onFilterChange({ availability: status })}
                className={`py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {status === 'all' ? 'All' : status === 'available' ? 'In Stock' : 'Out'}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Rating Filter */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Minimum Rating
        </label>
        <div className="space-y-1.5">
          {[
            { value: 0, label: 'Any Rating' },
            { value: 4.8, label: '4.8 & Above' },
            { value: 4.5, label: '4.5 & Above' },
            { value: 4.0, label: '4.0 & Above' },
          ].map(r => (
            <button
              key={r.value}
              type="button"
              onClick={() => onFilterChange({ minRating: r.value })}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                filters.minRating === r.value
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Star className={`w-3.5 h-3.5 ${filters.minRating === r.value ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                <span>{r.label}</span>
              </div>
              {filters.minRating === r.value && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Action */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>

    </div>
  );

  if (isMobileModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
        <div className="w-full max-w-lg bg-white dark:bg-slate-950 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 animate-slide-up">
          {content}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={onCloseMobileModal}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-md"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside className="w-full bg-white dark:bg-slate-900/70 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft">
      {content}
    </aside>
  );
};
