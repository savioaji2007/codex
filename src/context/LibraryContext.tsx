import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BorrowedBook, UserProfile, ToastMessage } from '../types';
import { INITIAL_BOOKS, INITIAL_USER, INITIAL_BORROWED, INITIAL_FAVORITES } from '../data/mockBooks';

export type NavigationTab = 'home' | 'browse' | 'categories' | 'my-library' | 'favorites' | 'profile' | 'admin';

interface LibraryContextType {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  favorites: string[];
  user: UserProfile;
  theme: 'light' | 'dark';
  toasts: ToastMessage[];
  activeTab: NavigationTab;
  selectedBook: Book | null;
  borrowingBook: Book | null;
  returningBorrow: BorrowedBook | null;
  readingBook: Book | null;
  searchQuery: string;
  categoryFilter: string | null;

  // Actions
  setActiveTab: (tab: NavigationTab) => void;
  setSelectedBook: (book: Book | null) => void;
  setBorrowingBook: (book: Book | null) => void;
  setReturningBorrow: (borrow: BorrowedBook | null) => void;
  setReadingBook: (book: Book | null) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string | null) => void;
  toggleTheme: () => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
  toggleFavorite: (bookId: string) => void;
  borrowBook: (bookId: string, durationDays?: number) => boolean;
  returnBook: (borrowId: string) => void;
  updateReadingProgress: (borrowId: string, progress: number) => void;
  addBook: (newBook: Omit<Book, 'id' | 'borrowCount'> & { borrowCount?: number }) => void;
  updateBook: (updatedBook: Book) => void;
  deleteBook: (bookId: string) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetToMockData: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const STORAGE_KEYS = {
  BOOKS: 'librahub_books_v1',
  BORROWED: 'librahub_borrowed_v1',
  FAVORITES: 'librahub_favorites_v1',
  USER: 'librahub_user_v1',
  THEME: 'librahub_theme_v1',
};

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme to html root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Books state
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKS);
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKS, JSON.stringify(books));
  }, [books]);

  // Raw borrowed records
  const [rawBorrowed, setRawBorrowed] = useState<Omit<BorrowedBook, 'book'>[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BORROWED);
      return saved ? JSON.parse(saved) : INITIAL_BORROWED;
    } catch {
      return INITIAL_BORROWED;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BORROWED, JSON.stringify(rawBorrowed));
  }, [rawBorrowed]);

  // Denormalized borrowed books with joined book data
  const borrowedBooks: BorrowedBook[] = rawBorrowed.map(item => {
    const matchedBook = books.find(b => b.id === item.bookId) || {
      id: item.bookId,
      title: 'Archived Book',
      author: 'Unknown Author',
      description: 'Book record archived.',
      cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
      category: 'General',
      genre: 'General',
      ISBN: '000-0000000000',
      publishedYear: 2020,
      pages: 300,
      rating: 4.5,
      availableCopies: 0,
      totalCopies: 1,
      location: 'Main Vault',
      borrowCount: 1,
    };
    return {
      ...item,
      book: matchedBook,
    };
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : INITIAL_FAVORITES;
    } catch {
      return INITIAL_FAVORITES;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically migrate if using old placeholder avatar
        if (!parsed.avatar || parsed.avatar.includes('photo-1534528741775')) {
          parsed.avatar = INITIAL_USER.avatar;
          localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(parsed));
        }
        return parsed;
      }
      return INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  // UI state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [borrowingBook, setBorrowingBook] = useState<Book | null>(null);
  const [returningBorrow, setReturningBorrow] = useState<BorrowedBook | null>(null);
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Toast helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastMessage = { ...toast, id, duration: toast.duration || 4000 };
    setToasts(prev => [newToast, ...prev]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, newToast.duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle favorite
  const toggleFavorite = (bookId: string) => {
    const target = books.find(b => b.id === bookId);
    setFavorites(prev => {
      const isFav = prev.includes(bookId);
      if (isFav) {
        addToast({
          type: 'info',
          title: 'Removed from Favorites',
          message: `"${target?.title || 'Book'}" has been removed from your saved list.`,
        });
        return prev.filter(id => id !== bookId);
      } else {
        addToast({
          type: 'success',
          title: 'Saved to Favorites',
          message: `"${target?.title || 'Book'}" is now in your favorite collection!`,
        });
        return [...prev, bookId];
      }
    });
  };

  // Borrow a book
  const borrowBook = (bookId: string, durationDays = 14): boolean => {
    const book = books.find(b => b.id === bookId);
    if (!book) {
      addToast({
        type: 'error',
        title: 'Book Not Found',
        message: 'Could not locate the requested book in inventory.',
      });
      return false;
    }

    if (book.availableCopies <= 0) {
      addToast({
        type: 'warning',
        title: 'Copies Unavailable',
        message: `All copies of "${book.title}" are currently borrowed out.`,
      });
      return false;
    }

    // Check if user already borrowed this book and is currently active
    const alreadyBorrowed = rawBorrowed.some(b => b.bookId === bookId && b.status === 'active');
    if (alreadyBorrowed) {
      addToast({
        type: 'warning',
        title: 'Already Borrowed',
        message: `You currently have an active copy of "${book.title}" in your library.`,
      });
      return false;
    }

    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + durationDays);

    const newBorrow: Omit<BorrowedBook, 'book'> = {
      id: `bor-${Date.now()}`,
      bookId: book.id,
      userId: user.id,
      borrowDate: today.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      progress: 0,
      status: 'active',
    };

    // Decrement available copies & increment borrow count
    setBooks(prev =>
      prev.map(b =>
        b.id === bookId
          ? {
              ...b,
              availableCopies: Math.max(0, b.availableCopies - 1),
              borrowCount: (b.borrowCount || 0) + 1,
            }
          : b
      )
    );

    setRawBorrowed(prev => [newBorrow, ...prev]);

    addToast({
      type: 'success',
      title: 'Book Borrowed Successfully!',
      message: `"${book.title}" is ready. Due date: ${newBorrow.dueDate}. Enjoy reading!`,
      duration: 5000,
    });

    return true;
  };

  // Return book
  const returnBook = (borrowId: string) => {
    const targetBorrow = rawBorrowed.find(b => b.id === borrowId);
    if (!targetBorrow) return;

    const book = books.find(b => b.id === targetBorrow.bookId);

    // Update borrowed status to returned
    setRawBorrowed(prev =>
      prev.map(b =>
        b.id === borrowId
          ? {
              ...b,
              status: 'returned' as const,
              returnDate: new Date().toISOString().split('T')[0],
              progress: 100,
            }
          : b
      )
    );

    // Increment book availability
    if (book) {
      setBooks(prev =>
        prev.map(b =>
          b.id === book.id
            ? { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) }
            : b
        )
      );
    }

    // Update user stats
    setUser(prev => ({
      ...prev,
      booksReadThisYear: prev.booksReadThisYear + 1,
    }));

    addToast({
      type: 'success',
      title: 'Book Returned',
      message: `"${book?.title || 'Book'}" has been returned to the library. Thank you!`,
    });
  };

  // Update reading progress
  const updateReadingProgress = (borrowId: string, progress: number) => {
    const clampedProgress = Math.max(0, Math.min(100, Math.round(progress)));
    setRawBorrowed(prev =>
      prev.map(b => (b.id === borrowId ? { ...b, progress: clampedProgress } : b))
    );
  };

  // Add new book (Admin)
  const addBook = (newBookData: Omit<Book, 'id' | 'borrowCount'> & { borrowCount?: number }) => {
    const newBook: Book = {
      ...newBookData,
      id: `book-${Date.now()}`,
      borrowCount: 0,
      sampleContent: newBookData.sampleContent || [
        {
          chapter: 'Chapter 1: Opening',
          text: `Welcome to "${newBookData.title}". This book is part of the LibraHub digital library repository.`
        }
      ]
    };

    setBooks(prev => [newBook, ...prev]);

    addToast({
      type: 'success',
      title: 'Book Added to Catalog',
      message: `"${newBook.title}" by ${newBook.author} was registered successfully.`,
    });
  };

  // Update book (Admin)
  const updateBook = (updatedBook: Book) => {
    setBooks(prev => prev.map(b => (b.id === updatedBook.id ? updatedBook : b)));
    if (selectedBook && selectedBook.id === updatedBook.id) {
      setSelectedBook(updatedBook);
    }
    addToast({
      type: 'info',
      title: 'Book Updated',
      message: `Details for "${updatedBook.title}" were saved.`,
    });
  };

  // Delete book (Admin)
  const deleteBook = (bookId: string) => {
    const target = books.find(b => b.id === bookId);
    setBooks(prev => prev.filter(b => b.id !== bookId));
    setFavorites(prev => prev.filter(id => id !== bookId));
    setRawBorrowed(prev => prev.filter(b => b.bookId !== bookId));

    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(null);
    }

    addToast({
      type: 'warning',
      title: 'Book Removed',
      message: `"${target?.title || 'Book'}" was removed from the catalog.`,
    });
  };

  // Update user profile
  const updateProfile = (profileData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...profileData }));
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your member profile information has been saved.',
    });
  };

  // Reset to default sample state
  const resetToMockData = () => {
    setBooks(INITIAL_BOOKS);
    setRawBorrowed(INITIAL_BORROWED);
    setFavorites(INITIAL_FAVORITES);
    setUser(INITIAL_USER);
    localStorage.removeItem(STORAGE_KEYS.BOOKS);
    localStorage.removeItem(STORAGE_KEYS.BORROWED);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.USER);
    addToast({
      type: 'info',
      title: 'Library Reset',
      message: 'Initial catalog and sample reader records restored.',
    });
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        borrowedBooks,
        favorites,
        user,
        theme,
        toasts,
        activeTab,
        selectedBook,
        borrowingBook,
        returningBorrow,
        readingBook,
        searchQuery,
        categoryFilter,
        setActiveTab,
        setSelectedBook,
        setBorrowingBook,
        setReturningBorrow,
        setReadingBook,
        setSearchQuery,
        setCategoryFilter,
        toggleTheme,
        addToast,
        removeToast,
        toggleFavorite,
        borrowBook,
        returnBook,
        updateReadingProgress,
        addBook,
        updateBook,
        deleteBook,
        updateProfile,
        resetToMockData,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
