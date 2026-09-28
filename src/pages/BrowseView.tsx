import React, { useState, useMemo, useEffect } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { FilterState, SortOption, Book } from '../types';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { BookGrid } from '../components/BookGrid';
import { X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const BrowseView: React.FC = () => {
  const { books, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useLibrary();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: searchQuery || '',
    category: categoryFilter || '',
    genre: '',
    author: '',
    availability: 'all',
    minRating: 0,
    sortBy: 'popularity',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync external search query & category filter if updated globally
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery !== filters.searchQuery) {
      setFilters(prev => ({ ...prev, searchQuery }));
    }
  }, [searchQuery]);

  useEffect(() => {
    if (categoryFilter !== undefined && categoryFilter !== filters.category) {
      setFilters(prev => ({ ...prev, category: categoryFilter || '', genre: '' }));
    }
  }, [categoryFilter]);

  const handleFilterUpdate = (updated: Partial<FilterState>) => {
    setFilters(prev => {
      const next = { ...prev, ...updated };
      if (updated.searchQuery !== undefined) {
        setSearchQuery(updated.searchQuery);
      }
      if (updated.category !== undefined) {
        setCategoryFilter(updated.category || null);
      }
      return next;
    });
  };

  const handleResetFilters = () => {
    const defaultState: FilterState = {
      searchQuery: '',
      category: '',
      genre: '',
      author: '',
      availability: 'all',
      minRating: 0,
      sortBy: 'popularity',
    };
    setFilters(defaultState);
    setSearchQuery('');
    setCategoryFilter(null);
  };

  // Compute genres available for the selected category or all
  const availableGenres = useMemo(() => {
    const list = books
      .filter(b => (!filters.category ? true : b.category === filters.category))
      .map(b => b.genre);
    return Array.from(new Set(list)).sort();
  }, [books, filters.category]);

  // Count active non-default filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.genre) count++;
    if (filters.author) count++;
    if (filters.availability !== 'all') count++;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters]);

  // Filter and sort the book list
  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        // 1. Text search: title, author, ISBN, category, genre
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchTitle = book.title.toLowerCase().includes(q);
          const matchAuthor = book.author.toLowerCase().includes(q);
          const matchISBN = book.ISBN.toLowerCase().includes(q);
          const matchCategory = book.category.toLowerCase().includes(q);
          const matchGenre = book.genre.toLowerCase().includes(q);

          if (!matchTitle && !matchAuthor && !matchISBN && !matchCategory && !matchGenre) {
            return false;
          }
        }

        // 2. Category
        if (filters.category && book.category !== filters.category) {
          return false;
        }

        // 3. Genre
        if (filters.genre && book.genre !== filters.genre) {
          return false;
        }

        // 4. Availability
        if (filters.availability === 'available' && book.availableCopies <= 0) {
          return false;
        }
        if (filters.availability === 'borrowed' && book.availableCopies > 0) {
          return false;
        }

        // 5. Min Rating
        if (filters.minRating > 0 && book.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case 'popularity':
            return (b.borrowCount || 0) - (a.borrowCount || 0);
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.publishedYear - a.publishedYear;
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'pages-asc':
            return a.pages - b.pages;
          default:
            return 0;
        }
      });
  }, [books, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Page Title & Search Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Browse Catalog
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Search across our entire repository of physical and digital volumes with multi-faceted filtering.
          </p>
        </div>

        <SearchBar
          value={filters.searchQuery}
          onChange={val => handleFilterUpdate({ searchQuery: val })}
          onToggleFilter={() => setIsMobileFilterOpen(true)}
          isFilterOpen={isMobileFilterOpen}
          activeFilterCount={activeFilterCount}
          placeholder="Search by title, author, genre, category, or ISBN..."
        />
      </div>

      {/* Active Filter Chips */}
      {(activeFilterCount > 0 || filters.searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Active filters:</span>

          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Query: "{filters.searchQuery}"
              <button
                onClick={() => handleFilterUpdate({ searchQuery: '' })}
                className="hover:text-indigo-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.category && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Category: {filters.category}
              <button
                onClick={() => handleFilterUpdate({ category: '', genre: '' })}
                className="hover:text-indigo-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.genre && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Genre: {filters.genre}
              <button
                onClick={() => handleFilterUpdate({ genre: '' })}
                className="hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.availability !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              Availability: {filters.availability === 'available' ? 'In Stock' : 'Out of Stock'}
              <button
                onClick={() => handleFilterUpdate({ availability: 'all' })}
                className="hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.minRating > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              ★ {filters.minRating}+ Stars
              <button
                onClick={() => handleFilterUpdate({ minRating: 0 })}
                className="hover:text-amber-900 dark:hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleResetFilters}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content Area: Sidebar on Desktop, Book Grid on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterUpdate}
            onReset={handleResetFilters}
            availableGenres={availableGenres}
          />
        </div>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterUpdate}
            onReset={handleResetFilters}
            availableGenres={availableGenres}
            isMobileModal={true}
            onCloseMobileModal={() => setIsMobileFilterOpen(false)}
          />
        )}

        {/* Book Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-500">
              Showing <span className="text-slate-900 dark:text-white font-bold">{filteredBooks.length}</span> matching books
            </span>

            {/* Quick Sort Dropdown for mobile/tablet */}
            <div className="flex items-center gap-2 lg:hidden">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={filters.sortBy}
                onChange={e => handleFilterUpdate({ sortBy: e.target.value as SortOption })}
                className="text-xs bg-transparent border-0 text-indigo-600 dark:text-indigo-400 font-semibold focus:outline-none"
              >
                <option value="popularity">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
                <option value="title-asc">Title (A-Z)</option>
              </select>
            </div>
          </div>

          <BookGrid
            books={filteredBooks}
            onResetFilters={handleResetFilters}
            itemsPerPage={12}
            showPagination={true}
          />
        </div>

      </div>

    </div>
  );
};
