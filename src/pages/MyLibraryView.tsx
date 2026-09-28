import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BorrowedBook } from '../types';
import { BookCard } from '../components/BookCard';
import { ConfirmationModal } from '../components/ConfirmationModal';
import {
  Bookmark,
  Calendar,
  Clock,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  History,
  Heart,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

export const MyLibraryView: React.FC = () => {
  const {
    borrowedBooks,
    returnBook,
    updateReadingProgress,
    setReadingBook,
    setSelectedBook,
    setActiveTab,
    favorites,
    books,
    user
  } = useLibrary();

  const [activeSubTab, setActiveSubTab] = useState<'current' | 'history' | 'favorites'>('current');
  const [returnTarget, setReturnTarget] = useState<BorrowedBook | null>(null);

  const currentBorrows = borrowedBooks.filter(b => b.status === 'active');
  const pastBorrows = borrowedBooks.filter(b => b.status === 'returned');
  const favoriteBooksList = books.filter(b => favorites.includes(b.id));

  // Compute days until due date
  const getDueStatus = (dueDateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDateString);
    due.setHours(0, 0, 0, 0);

    const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { label: `Overdue by ${Math.abs(diffDays)} days`, isOverdue: true, color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800' };
    } else if (diffDays === 0) {
      return { label: 'Due today', isOverdue: false, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800' };
    } else {
      return { label: `${diffDays} days remaining`, isOverdue: false, color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' };
    }
  };

  const handleConfirmReturn = () => {
    if (returnTarget) {
      returnBook(returnTarget.id);
      setReturnTarget(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bookmark className="w-4 h-4" />
            Personal Repository
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Library
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your borrowed volumes, track reading progress, and view return schedules.
          </p>
        </div>

        {/* Quick Reader Stats Pill Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <span className="text-[11px] font-bold uppercase text-slate-400 block">Active Loans</span>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
              {currentBorrows.length} <span className="text-xs font-medium text-slate-400">/ 5 allowed</span>
            </span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft">
            <span className="text-[11px] font-bold uppercase text-slate-400 block">Books Completed</span>
            <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
              {user.booksReadThisYear} <span className="text-xs font-medium text-slate-400">/ {user.readingGoal} goal</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('current')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'current'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Currently Borrowed ({currentBorrows.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'history'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Borrowing History ({pastBorrows.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'favorites'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Favorites ({favoriteBooksList.length})</span>
        </button>
      </div>

      {/* Tab 1: Currently Borrowed Books */}
      {activeSubTab === 'current' && (
        <div className="space-y-6">
          {currentBorrows.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                No books currently borrowed
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-6">
                Your checkout slot is open. Browse our 36+ handpicked volumes and borrow your next read instantly!
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentBorrows.map(borrow => {
                const book = borrow.book;
                const dueStatus = getDueStatus(borrow.dueDate);

                return (
                  <div
                    key={borrow.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status bar */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${dueStatus.color}`}>
                          {dueStatus.label}
                        </span>

                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Due: {borrow.dueDate}
                        </span>
                      </div>

                      {/* Book info & cover */}
                      <div className="flex gap-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          onClick={() => setSelectedBook(book)}
                          className="w-20 h-28 object-cover rounded-xl shadow-soft shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            {book.category}
                          </span>
                          <h3
                            onClick={() => setSelectedBook(book)}
                            className="font-bold text-base text-slate-900 dark:text-white line-clamp-1 hover:text-indigo-600 cursor-pointer"
                          >
                            {book.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            by {book.author}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-2">
                            Borrowed on: {borrow.borrowDate}
                          </p>
                        </div>
                      </div>

                      {/* Reading Progress Slider */}
                      <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">
                            Reading Progress:
                          </span>
                          <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
                            {borrow.progress}%
                          </span>
                        </div>

                        {/* Interactive Progress Slider */}
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={borrow.progress}
                          onChange={e => updateReadingProgress(borrow.id, Number(e.target.value))}
                          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />

                        <div className="flex items-center justify-between text-[11px] text-slate-500">
                          <span>0%</span>
                          <span>~{Math.round((book.pages * borrow.progress) / 100)} of {book.pages} pages</span>
                          <span>100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                      <button
                        onClick={() => setReadingBook(book)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Continue Reading</span>
                      </button>

                      <button
                        onClick={() => setReturnTarget(borrow)}
                        className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Return Book</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Borrowing History */}
      {activeSubTab === 'history' && (
        <div className="space-y-4">
          {pastBorrows.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800">
              <History className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No return history yet
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Books you return will be logged here for your personal reading records.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Book Title</th>
                    <th className="px-6 py-4">Borrow Date</th>
                    <th className="px-6 py-4">Returned On</th>
                    <th className="px-6 py-4">Progress</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                  {pastBorrows.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <img
                          src={item.book.cover}
                          alt={item.book.title}
                          className="w-10 h-14 object-cover rounded shadow-xs shrink-0"
                        />
                        <div>
                          <span
                            onClick={() => setSelectedBook(item.book)}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 cursor-pointer block line-clamp-1"
                          >
                            {item.book.title}
                          </span>
                          <span className="text-slate-500 text-[11px]">{item.book.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                        {item.borrowDate}
                      </td>
                      <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.returnDate || 'Completed'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                          100% Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedBook(item.book)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Saved Favorites */}
      {activeSubTab === 'favorites' && (
        <div>
          {favoriteBooksList.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-slate-900/40 border border-dashed border-slate-300 dark:border-slate-800">
              <Heart className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No saved favorites yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Click the heart icon on any book card to pin it to your favorites.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
              >
                Browse Books
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteBooksList.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Return Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(returnTarget)}
        title="Confirm Book Return"
        message={`Are you sure you want to return "${returnTarget?.book.title}"? This book will be checked back into the catalog and removed from your active borrowed list.`}
        confirmLabel="Yes, Return Book"
        cancelLabel="Keep Reading"
        variant="primary"
        onConfirm={handleConfirmReturn}
        onCancel={() => setReturnTarget(null)}
      />

    </div>
  );
};
