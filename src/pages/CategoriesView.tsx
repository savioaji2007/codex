import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { CATEGORIES_DATA } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { Search, Layers, Compass } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { books, setCategoryFilter, setActiveTab } = useLibrary();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCategory = (categoryName: string) => {
    setCategoryFilter(categoryName);
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCategories = CATEGORIES_DATA.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            Curated Collections
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Library Categories
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Browse our catalog systematically by intellectual discipline. Select any category to view all corresponding titles and availability.
          </p>
        </div>

        {/* Filter categories search input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search disciplines..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map(cat => {
          const count = books.filter(b => b.category === cat.name).length;
          return (
            <CategoryCard
              key={cat.id}
              category={cat}
              bookCount={count}
              onClick={() => handleSelectCategory(cat.name)}
            />
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
          <Layers className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No categories match "{searchTerm}"
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Try checking for another subject or clear your search input.
          </p>
        </div>
      )}

    </div>
  );
};
