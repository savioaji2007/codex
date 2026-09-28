import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from '../components/BookCard';
import { CategoryCard } from '../components/CategoryCard';
import { StatisticsCard } from '../components/StatisticsCard';
import { CATEGORIES_DATA } from '../data/categories';
import {
  Search,
  BookOpen,
  Sparkles,
  TrendingUp,
  BookmarkCheck,
  Users,
  Compass,
  ArrowRight,
  Award,
  Library,
  Flame
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    books,
    setActiveTab,
    setSearchQuery,
    setCategoryFilter,
    borrowedBooks,
    user
  } = useLibrary();

  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch);
      setActiveTab('browse');
    }
  };

  const featuredBooks = books.filter(b => b.featured).slice(0, 4);
  const popularBooks = [...books].sort((a, b) => b.borrowCount - a.borrowCount).slice(0, 4);
  const recentlyAdded = [...books].reverse().slice(0, 4);
  const recommended = books.filter(b => b.rating >= 4.8).slice(0, 4);

  const totalCopies = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopies = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const totalCirculation = books.reduce((acc, b) => acc + (b.borrowCount || 0), 0);

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 rounded-3xl bg-gradient-to-b from-indigo-900/10 via-purple-900/5 to-transparent border border-indigo-100/50 dark:border-indigo-950/40">
        
        {/* Ambient background glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/80 dark:border-indigo-800 shadow-xs animate-slide-up">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Welcome to LibraHub Digital Library</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Discover Your Next <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 dark:from-indigo-400 dark:via-purple-300 dark:to-indigo-200 bg-clip-text text-transparent">
              Great Read
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in thousands of curated works across computer science, literature, science, and history. Instant checkout, seamless reading tracking, and zero fines.
          </p>

          {/* Hero Search Bar */}
          <form onSubmit={handleHeroSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center shadow-soft-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-indigo-500/50">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, author, genre, or ISBN..."
                value={heroSearch}
                onChange={e => setHeroSearch(e.target.value)}
                className="w-full pl-12 pr-32 py-4 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-600/25 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Badges / Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              {books.length}+ Handpicked Volumes
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <BookmarkCheck className="w-3.5 h-3.5 text-emerald-500" />
              {availableCopies} Copies Available Right Now
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              12 Curated Disciplines
            </span>
          </div>

        </div>
      </section>

      {/* 2. Reading Statistics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <StatisticsCard
            title="Total Catalog"
            value={`${books.length} Titles`}
            subtitle={`${totalCopies} Total physical & digital copies`}
            icon={Library}
            iconBgClass="bg-indigo-50 dark:bg-indigo-950/60"
            colorClass="text-indigo-600 dark:text-indigo-400"
          />
          <StatisticsCard
            title="Available Now"
            value={availableCopies}
            subtitle={`${Math.round((availableCopies / (totalCopies || 1)) * 100)}% on-shelf readiness`}
            trend="Instant Borrowing"
            icon={BookmarkCheck}
            iconBgClass="bg-emerald-50 dark:bg-emerald-950/60"
            colorClass="text-emerald-600 dark:text-emerald-400"
          />
          <StatisticsCard
            title="Circulation Count"
            value={totalCirculation}
            subtitle="Total student & member loans"
            trend="+18% this month"
            icon={TrendingUp}
            iconBgClass="bg-blue-50 dark:bg-blue-950/60"
            colorClass="text-blue-600 dark:text-blue-400"
          />
          <StatisticsCard
            title="Active Readers"
            value="1,420+"
            subtitle="Campus & remote members"
            icon={Users}
            iconBgClass="bg-purple-50 dark:bg-purple-950/60"
            colorClass="text-purple-600 dark:text-purple-400"
          />
        </div>
      </section>

      {/* 3. Featured Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Librarian Curations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Featured Books
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>View All Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 4. Popular Books Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4" />
              High Reader Demand
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Most Popular Books
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>See More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 5. Book Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              Structured Knowledge
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Explore by Category
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('categories')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>All 12 Disciplines</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CATEGORIES_DATA.slice(0, 8).map(cat => {
            const count = books.filter(b => b.category === cat.name).length;
            return (
              <CategoryCard
                key={cat.id}
                category={cat}
                bookCount={count}
                onClick={() => {
                  setCategoryFilter(cat.name);
                  setActiveTab('browse');
                }}
              />
            );
          })}
        </div>
      </section>

      {/* 6. Reading Challenge / Activity Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-md">
              {new Date().getFullYear()} Reading Challenge
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
              Track your reading milestones and expand your horizons.
            </h3>
            <p className="text-sm text-indigo-100 leading-relaxed">
              You have completed <span className="font-bold underline">{user.booksReadThisYear}</span> out of your{' '}
              <span className="font-bold">{user.readingGoal} books</span> annual reading goal. Log reading sessions, earn badges, and borrow new releases.
            </p>
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('my-library')}
                className="px-5 py-3 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all"
              >
                Go to My Library
              </button>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-5 py-3 rounded-xl bg-indigo-950/40 hover:bg-indigo-950/60 border border-white/20 text-white font-semibold text-xs transition-all"
              >
                Browse Books
              </button>
            </div>
          </div>

          <BookOpen className="w-64 h-64 text-white/5 absolute -right-12 -bottom-12 pointer-events-none" />
        </div>
      </section>

      {/* 7. Recommended For You Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              Highest Acclaim
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Top Rated Recommendations
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>Explore More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommended.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 8. Recently Added Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Catalog Arrivals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Recently Added Books
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('browse')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentlyAdded.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

    </div>
  );
};
