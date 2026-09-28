import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  BookmarkCheck,
  X,
  ShieldAlert,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const BorrowModal: React.FC = () => {
  const { borrowingBook, setBorrowingBook, borrowBook } = useLibrary();
  const [durationDays, setDurationDays] = useState<number>(14);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!borrowingBook) return null;

  // Calculate return due date
  const today = new Date();
  const calculatedDueDate = new Date();
  calculatedDueDate.setDate(today.getDate() + durationDays);

  const formattedDueDate = calculatedDueDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleConfirmBorrow = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const success = borrowBook(borrowingBook.id, durationDays);
      setIsProcessing(false);

      if (success) {
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a855f7', '#3b82f6', '#10b981'],
        });
        setBorrowingBook(null);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-scale-in">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-indigo-200" />
            <h3 className="font-bold text-base">Borrow Book Checkout</h3>
          </div>
          <button
            onClick={() => setBorrowingBook(null)}
            className="p-1 rounded-full text-indigo-200 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Selected Book Overview */}
          <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800">
            <img
              src={borrowingBook.cover}
              alt={borrowingBook.title}
              className="w-20 h-28 object-cover rounded-xl shadow-soft shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  {borrowingBook.category}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1">
                  {borrowingBook.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  by {borrowingBook.author}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  {borrowingBook.location}
                </span>
                <span>•</span>
                <span>{borrowingBook.pages} pages</span>
              </div>
            </div>
          </div>

          {/* Loan Duration Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Loan Duration
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { days: 7, label: '7 Days' },
                { days: 14, label: '14 Days' },
                { days: 21, label: '21 Days' },
                { days: 30, label: '30 Days' },
              ].map(option => (
                <button
                  key={option.days}
                  type="button"
                  onClick={() => setDurationDays(option.days)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                    durationDays === option.days
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Due Date & Policies Card */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Return Due Date:
              </span>
              <span className="font-bold text-indigo-700 dark:text-indigo-300 text-sm">
                {formattedDueDate}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
              You may renew this title before the due date if no reader is on the hold queue. Progress can be logged in "My Library".
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setBorrowingBook(null)}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleConfirmBorrow}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Checkout</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
