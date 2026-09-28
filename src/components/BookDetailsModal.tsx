import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import {
  X,
  Star,
  Heart,
  Bookmark,
  Calendar,
  BookOpen,
  MapPin,
  Barcode,
  Layers,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const BookDetailsModal: React.FC = () => {
  const {
    selectedBook,
    setSelectedBook,
    favorites,
    toggleFavorite,
    setBorrowingBook,
    setReadingBook,
    borrowedBooks,
    updateReadingProgress,
    books,
  } = useLibrary();

  if (!selectedBook) return null;

  const isFavorite = favorites.includes(selectedBook.id);
  const activeLoan = borrowedBooks.find(
    b => b.bookId === selectedBook.id && b.status === 'active'
  );
  const isAvailable = selectedBook.availableCopies > 0;

  // Find similar books in same category (excluding current)
  const similarBooks = books
    .filter(b => b.category === selectedBook.category && b.id !== selectedBook.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedBook(null)}
          className="absolute right-5 top-5 z-10 p-2 rounded-full bg-slate-100/80 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto">
          {/* Main Book Card Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Book Cover & Badges */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[260px] aspect-[2/3] rounded-2xl overflow-hidden shadow-book bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-800 group">
                <img
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Rating Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/85 text-amber-300 font-bold text-xs backdrop-blur-md flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{selectedBook.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Physical Location Box */}
              <div className="w-full max-w-[260px] mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-indigo-500 shrink-0" />
                <div>
                  <span className="font-semibold block">Physical Stacks:</span>
                  <span className="text-slate-500 dark:text-slate-400">{selectedBook.location}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Book Details */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Category & Genre Pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                  {selectedBook.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {selectedBook.genre}
                </span>
                {selectedBook.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Featured
                  </span>
                )}
              </div>

              {/* Title & Author */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  {selectedBook.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  by <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{selectedBook.author}</span>
                </p>
              </div>

              {/* Meta Grid (Pages, Year, ISBN, Borrow Count) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Pages</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedBook.pages}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Published</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{selectedBook.publishedYear}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">ISBN</span>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate block" title={selectedBook.ISBN}>{selectedBook.ISBN}</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-slate-400 block">Circulation</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{selectedBook.borrowCount || 0} loans</span>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Synopsis
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedBook.description}
                </p>
              </div>

              {/* Active Reading Progress (if user already borrowed this book) */}
              {activeLoan && (
                <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                      <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Currently in your library (Due: {activeLoan.dueDate})
                    </span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                      {activeLoan.progress}% read
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={activeLoan.progress}
                    onChange={e => updateReadingProgress(activeLoan.id, Number(e.target.value))}
                    className="w-full h-2 bg-indigo-200 dark:bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-[11px] text-slate-500">
                      Slide to update your reading progress
                    </span>
                    <button
                      onClick={() => {
                        setSelectedBook(null);
                        setReadingBook(selectedBook);
                      }}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Continue Reading in Reader
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {activeLoan ? (
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setReadingBook(selectedBook);
                    }}
                    className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open Reader View</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setBorrowingBook(selectedBook);
                    }}
                    disabled={!isAvailable}
                    className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                      isAvailable
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/25'
                        : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>{isAvailable ? `Borrow (${selectedBook.availableCopies} Copies Available)` : 'Currently Borrowed Out'}</span>
                  </button>
                )}

                <button
                  onClick={() => toggleFavorite(selectedBook.id)}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex items-center gap-2 ${
                    isFavorite
                      ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800 dark:text-rose-400'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300'
                  }`}
                  aria-label="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current text-rose-500' : ''}`} />
                  <span>{isFavorite ? 'Saved' : 'Save'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Similar Books Section */}
          {similarBooks.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-500" />
                  More from {selectedBook.category}
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similarBooks.map(simBook => (
                  <div
                    key={simBook.id}
                    onClick={() => setSelectedBook(simBook)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img
                      src={simBook.cover}
                      alt={simBook.title}
                      className="w-12 h-16 object-cover rounded-lg shrink-0 shadow-xs group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {simBook.title}
                      </h5>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {simBook.author}
                      </p>
                      <span className="text-[11px] font-semibold text-amber-500 flex items-center gap-0.5 mt-1">
                        ★ {simBook.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
