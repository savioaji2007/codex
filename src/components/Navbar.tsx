import React, { useState } from 'react';
import { useLibrary, NavigationTab } from '../context/LibraryContext';
import { getDisplayAvatar } from '../utils/avatar';
import {
  BookOpen,
  Search,
  Bookmark,
  Heart,
  User,
  ShieldCheck,
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  Sparkles,
  Library
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    borrowedBooks,
    favorites,
    user,
    setSearchQuery,
  } = useLibrary();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const activeLoansCount = borrowedBooks.filter(b => b.status === 'active').length;

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      setSearchQuery(quickSearch);
      setActiveTab('browse');
      setQuickSearch('');
      setMobileMenuOpen(false);
    }
  };

  const navItems: { tab: NavigationTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { tab: 'home', label: 'Home', icon: BookOpen },
    { tab: 'browse', label: 'Browse Books', icon: Library },
    { tab: 'categories', label: 'Categories', icon: Layers },
    { tab: 'my-library', label: 'My Library', icon: Bookmark, badge: activeLoansCount },
    { tab: 'favorites', label: 'Favorites', icon: Heart, badge: favorites.length },
    { tab: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 dark:from-white dark:via-indigo-200 dark:to-indigo-400 bg-clip-text text-transparent">
                  LibraHub
                </span>
                <span className="hidden sm:inline-block ml-1.5 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 rounded border border-indigo-200 dark:border-indigo-800">
                  v2.0
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map(({ tab, label, icon: Icon, badge }) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/50 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`} />
                  <span>{label}</span>
                  {typeof badge === 'number' && badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-indigo-600 text-white dark:bg-indigo-500 shadow-sm">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick search form */}
            <form onSubmit={handleQuickSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={quickSearch}
                onChange={e => setQuickSearch(e.target.value)}
                className="w-40 xl:w-56 pl-9 pr-3 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:w-64 transition-all duration-300"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Dark/Light mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle color theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 animate-fade-in" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600 animate-fade-in" />
              )}
            </button>

            {/* User Profile button */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all ${
                activeTab === 'profile'
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <img
                src={getDisplayAvatar(user.avatar)}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {/* Mobile search bar */}
          <form onSubmit={handleQuickSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search by title, author, ISBN..."
              value={quickSearch}
              onChange={e => setQuickSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map(({ tab, label, icon: Icon, badge }) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleNavClick(tab)}
                  className={`flex items-center justify-between p-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{label}</span>
                  </div>
                  {typeof badge === 'number' && badge > 0 && (
                    <span
                      className={`px-1.5 py-0.5 text-xs rounded-full font-bold ${
                        isActive
                          ? 'bg-white text-indigo-700'
                          : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => handleNavClick('profile')}
              className={`flex items-center gap-2.5 p-3 rounded-xl text-sm font-medium col-span-2 ${
                activeTab === 'profile'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200'
              }`}
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>User Profile & Reading Goals</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
