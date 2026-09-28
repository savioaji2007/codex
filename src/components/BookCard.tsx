import React from 'react';
import { Book } from '../types';
import { useLibrary } from '../context/LibraryContext';
import { Star, Heart, Bookmark, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookCardProps {
  book: Book;
  compact?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, compact = false }) => {
  const {
    favorites,
    toggleFavorite,
    setSelectedBook,
    setBorrowingBook,
    borrowedBooks,
  } = useLibrary();

  const isFavorite = favorites.includes(book.id);
  const isAlreadyBorrowed = borrowedBooks.some(
    b => b.bookId === book.id && b.status === 'active'
  );
  const isAvailable = book.availableCopies > 0;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-soft hover:shadow-book-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Cover Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback placeholder if image fails to load
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Badges: Category & Favorite Button */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wide rounded-full bg-slate-900/80 text-white backdrop-blur-md shadow-sm border border-white/10">
            {book.category}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(book.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:scale-110'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Availability Badge at Bottom of Cover */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium backdrop-blur-md text-[11px] shadow-sm ${
              isAlreadyBorrowed
                ? 'bg-blue-600/90 text-white'
                : isAvailable
                ? 'bg-emerald-600/90 text-white'
                : 'bg-rose-600/90 text-white'
            }`}
          >
            {isAlreadyBorrowed ? (
              <>
                <CheckCircle2 className="w-3 h-3" />
                In Your Library
              </>
            ) : isAvailable ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                {book.availableCopies} of {book.totalCopies} Available
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3" />
                All Borrowed
              </>
            )}
          </span>

          {/* Rating */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-amber-300 font-semibold backdrop-blur-md text-[11px]">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {book.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Book Information */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex-1">
          <p className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1 truncate">
            {book.genre}
          </p>
          <h3
            onClick={() => setSelectedBook(book)}
            className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
            by {book.author}
          </p>
          {!compact && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          )}
        </div>

        {/* Footer Meta & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => setSelectedBook(book)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-400" />
            <span>Details</span>
          </button>

          {isAlreadyBorrowed ? (
            <button
              onClick={() => setSelectedBook(book)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Reading</span>
            </button>
          ) : (
            <button
              onClick={() => setBorrowingBook(book)}
              disabled={!isAvailable}
              className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl transition-all shadow-sm ${
                isAvailable
                  ? 'text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-600/25'
                  : 'text-slate-400 bg-slate-100 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed opacity-75'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isAvailable ? 'Borrow' : 'Waitlist'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
