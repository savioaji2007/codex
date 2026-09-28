import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import {
  X,
  Type,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sun,
  Moon,
  Coffee,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export const ReaderModal: React.FC = () => {
  const { readingBook, setReadingBook, borrowedBooks, updateReadingProgress, addToast } = useLibrary();
  
  const [readerTheme, setReaderTheme] = useState<'light' | 'dark' | 'sepia'>('light');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isSerif, setIsSerif] = useState<boolean>(true);
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);

  if (!readingBook) return null;

  // Find active loan record for this book to get progress
  const activeLoan = borrowedBooks.find(
    b => b.bookId === readingBook.id && b.status === 'active'
  );

  const currentProgress = activeLoan ? activeLoan.progress : 25;

  const chapters = readingBook.sampleContent && readingBook.sampleContent.length > 0
    ? readingBook.sampleContent
    : [
        {
          chapter: 'Chapter 1: Opening Horizons',
          text: `Welcome to "${readingBook.title}". Books are the treasured wealth of the world and the fit inheritance of generations and nations. Knowledge preserved in print inspires curiosity, sparks innovation, and expands the compass of human empathy.`
        },
        {
          chapter: 'Chapter 2: Deep Perspectives',
          text: `Continuing through "${readingBook.title}". To read is to travel through time and thought, discovering wisdom accumulated over centuries. Every sentence invites contemplation, questioning prior assumptions and opening new mental horizons.`
        }
      ];

  const activeChapter = chapters[currentChapterIndex] || chapters[0];

  const handleProgressChange = (newVal: number) => {
    if (activeLoan) {
      updateReadingProgress(activeLoan.id, newVal);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < chapters.length - 1) {
      const nextIdx = currentChapterIndex + 1;
      setCurrentChapterIndex(nextIdx);
      const approxProgress = Math.round(((nextIdx + 1) / chapters.length) * 100);
      handleProgressChange(approxProgress);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      const prevIdx = currentChapterIndex - 1;
      setCurrentChapterIndex(prevIdx);
      const approxProgress = Math.round((prevIdx / chapters.length) * 100);
      handleProgressChange(approxProgress);
    }
  };

  let themeContainerStyle = 'bg-white text-slate-800';
  if (readerTheme === 'dark') {
    themeContainerStyle = 'bg-slate-950 text-slate-100';
  } else if (readerTheme === 'sepia') {
    themeContainerStyle = 'bg-[#fbf0d9] text-[#4a3b2c]';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-2 sm:p-6 animate-fade-in">
      <div className={`relative w-full max-w-4xl h-[92vh] flex flex-col rounded-3xl shadow-2xl border border-slate-300 dark:border-slate-800 overflow-hidden ${themeContainerStyle}`}>
        
        {/* Top Header / Reader Controls */}
        <header className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-4 shrink-0 bg-black/5 dark:bg-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <BookOpen className="w-5 h-5 text-indigo-500 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm truncate">
                {readingBook.title}
              </h3>
              <p className="text-xs opacity-75 truncate">
                {readingBook.author} • {activeChapter.chapter}
              </p>
            </div>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Serif / Sans Toggle */}
            <button
              onClick={() => setIsSerif(!isSerif)}
              className="p-1.5 rounded-lg border border-current/20 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/10"
              title="Toggle Serif / Sans Font"
            >
              {isSerif ? 'Serif' : 'Sans'}
            </button>

            {/* Font Size decrease/increase */}
            <div className="flex items-center border border-current/20 rounded-lg overflow-hidden text-xs">
              <button
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 font-bold"
                title="Decrease Font Size"
              >
                A-
              </button>
              <span className="px-2 py-1 opacity-70 border-x border-current/20">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize(prev => Math.min(28, prev + 2))}
                className="px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10 font-bold"
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Reader Theme Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setReaderTheme('light')}
                className={`p-1.5 rounded-lg border ${readerTheme === 'light' ? 'border-indigo-600 bg-white text-slate-900 shadow-xs' : 'border-transparent opacity-60'}`}
                title="Light Reader"
              >
                <Sun className="w-4 h-4 text-amber-500" />
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`p-1.5 rounded-lg border ${readerTheme === 'sepia' ? 'border-amber-700 bg-[#fbf0d9] text-[#4a3b2c] shadow-xs' : 'border-transparent opacity-60'}`}
                title="Sepia Warm Reader"
              >
                <Coffee className="w-4 h-4 text-amber-700" />
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`p-1.5 rounded-lg border ${readerTheme === 'dark' ? 'border-indigo-400 bg-slate-900 text-white shadow-xs' : 'border-transparent opacity-60'}`}
                title="Dark Reader"
              >
                <Moon className="w-4 h-4 text-indigo-400" />
              </button>
            </div>

            {/* Close Reader */}
            <button
              onClick={() => setReadingBook(null)}
              className="ml-2 p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Exit Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Reader Document Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-16 py-10 max-w-3xl mx-auto w-full">
          <div className="mb-8 pb-4 border-b border-current/10">
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
              {readingBook.genre}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 mb-2">
              {activeChapter.chapter}
            </h2>
          </div>

          <div
            className={`leading-relaxed space-y-6 ${isSerif ? 'font-serif' : 'font-sans'}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {activeChapter.text.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {paragraph}
              </p>
            ))}

            <p className="indent-6 sm:indent-8 opacity-90">
              In this quiet library sanctuary, words form stepping stones toward new ideas. As you immerse yourself in "{readingBook.title}", each passage reveals nuances in craft and thought.
            </p>
          </div>

          {/* Chapter Navigation Buttons */}
          <div className="mt-16 pt-8 border-t border-current/15 flex items-center justify-between">
            <button
              onClick={handlePrevChapter}
              disabled={currentChapterIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-current/20 transition-all ${
                currentChapterIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Section
            </button>

            <span className="text-xs opacity-60">
              Chapter {currentChapterIndex + 1} of {chapters.length}
            </span>

            <button
              onClick={handleNextChapter}
              disabled={currentChapterIndex === chapters.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-current/20 transition-all ${
                currentChapterIndex === chapters.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/10'
              }`}
            >
              Next Section
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Interactive Progress Bar */}
        <footer className="px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 bg-black/5 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Bookmark className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="text-xs font-semibold shrink-0">
              Reading Progress: {currentProgress}%
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={currentProgress}
              onChange={e => handleProgressChange(Number(e.target.value))}
              className="w-full sm:w-48 h-2 bg-slate-300 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="flex items-center gap-3 text-xs opacity-75">
            <span>Estimated reading: ~{Math.round((readingBook.pages * (100 - currentProgress)) / 100 * 1.5)} mins left</span>
            <button
              onClick={() => {
                handleProgressChange(100);
                addToast({
                  type: 'success',
                  title: 'Finished Reading!',
                  message: `Congratulations on completing "${readingBook.title}". You can now return the book or keep it until the due date.`,
                });
              }}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Complete</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
