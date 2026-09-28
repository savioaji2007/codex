import React, { useState } from 'react';
import { Book } from '../types';
import { BookCard } from './BookCard';
import { BookX, RotateCcw } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  title?: string;
  subtitle?: string;
  itemsPerPage?: number;
  onResetFilters?: () => void;
  showPagination?: boolean;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  title,
  subtitle,
  itemsPerPage = 12,
  onResetFilters,
  showPagination = true,
}) => {
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  const displayedBooks = showPagination ? books.slice(0, visibleCount) : books;
  const hasMore = showPagination && visibleCount < books.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + itemsPerPage, books.length));
  };

  return (
    <div className="w-full">
      {/* Header if supplied */}
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            {title && (
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <span className="text-xs font-medium text-slate-500 mt-2 sm:mt-0">
            {books.length} {books.length === 1 ? 'title' : 'titles'} found
          </span>
        </div>
      )}

      {/* Empty State */}
      {books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800 my-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-500 mb-4 shadow-inner">
            <BookX className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No matching books found
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6">
            We couldn't find any titles matching your active criteria. Try broadening your keywords or clearing selected filters.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {displayedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-12 flex flex-col items-center justify-center gap-3">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all"
              >
                Load More Books ({books.length - visibleCount} remaining)
              </button>
              <span className="text-xs text-slate-500">
                Displaying {visibleCount} of {books.length} books
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
