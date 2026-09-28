import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/BookCard';
import { Heart, Search, ArrowRight, BookOpen } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { books, favorites, setActiveTab } = useLibrary();
  const [search, setSearch] = useState('');

  const favoriteBooks = books.filter(b => favorites.includes(b.id));

  const filteredFavorites = favoriteBooks.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-500" />
            Saved Collection
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Favorite Books
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            All your shortlisted and saved literary titles in one place.
          </p>
        </div>

        {/* Search within favorites */}
        {favoriteBooks.length > 0 && (
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search saved titles..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Grid of Favorite Books */}
      {favoriteBooks.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            You haven’t saved any favorites yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
            Click the heart icon on any book cover in the catalog to bookmark it for later reading.
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <span>Explore Books to Save</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFavorites.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {favoriteBooks.length > 0 && filteredFavorites.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-xs">
          No saved favorites matched "{search}".
        </div>
      )}

    </div>
  );
};
