import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { Book, BorrowedBook } from '../types';
import { CATEGORIES_DATA } from '../data/categories';
import { ConfirmationModal } from '../components/ConfirmationModal';
import {
  ShieldCheck,
  BookPlus,
  Edit2,
  Trash2,
  Users,
  BookmarkCheck,
  AlertTriangle,
  RotateCcw,
  Search,
  CheckCircle2,
  Clock,
  X,
  Library,
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const {
    books,
    borrowedBooks,
    addBook,
    updateBook,
    deleteBook,
    returnBook,
    resetToMockData,
    addToast
  } = useLibrary();

  const [activeAdminTab, setActiveAdminTab] = useState<'inventory' | 'borrowings' | 'users' | 'analytics'>('inventory');
  const [searchInventory, setSearchInventory] = useState('');

  // Modals state
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBookId, setDeletingBookId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [bookFormData, setBookFormData] = useState<Omit<Book, 'id' | 'borrowCount'>>({
    title: '',
    author: '',
    category: 'Computer Science',
    genre: 'Algorithms & Architecture',
    ISBN: '978-0000000000',
    publishedYear: 2024,
    pages: 350,
    rating: 4.8,
    availableCopies: 3,
    totalCopies: 5,
    location: 'Floor 2, Shelf CS-101',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: '',
    featured: false,
    popular: false,
  });

  // Derived metrics
  const totalBooks = books.length;
  const totalCopies = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableCopies = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const activeLoans = borrowedBooks.filter(b => b.status === 'active');
  const totalBorrowedCopies = totalCopies - availableCopies;

  // Compute overdue count
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueLoans = activeLoans.filter(b => {
    const due = new Date(b.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() < today.getTime();
  });

  const registeredUsers = [
    { id: 'usr-1', name: 'Savio Fernandez', email: 'savio.fernandez@librahub.io', memberId: 'LH-2024-8849', role: 'Administrator', activeLoans: 2, status: 'Active' },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena.rostova@mit.edu', memberId: 'LH-2023-1029', role: 'Research Fellow', activeLoans: 1, status: 'Active' },
    { id: 'usr-3', name: 'Marcus Chen', email: 'marcus.chen@stanford.edu', memberId: 'LH-2024-4412', role: 'Student', activeLoans: 0, status: 'Active' },
    { id: 'usr-4', name: 'Amara Okafor', email: 'amara.okafor@oxford.ac.uk', memberId: 'LH-2022-7719', role: 'Faculty', activeLoans: 1, status: 'Active' },
    { id: 'usr-5', name: 'David Kim', email: 'david.kim@berkeley.edu', memberId: 'LH-2024-9120', role: 'Student', activeLoans: 0, status: 'Active' },
  ];

  // Open Edit Modal with pre-filled inputs
  const handleOpenEdit = (book: Book) => {
    setEditingBook(book);
    setBookFormData({
      title: book.title,
      author: book.author,
      category: book.category,
      genre: book.genre,
      ISBN: book.ISBN,
      publishedYear: book.publishedYear,
      pages: book.pages,
      rating: book.rating,
      availableCopies: book.availableCopies,
      totalCopies: book.totalCopies,
      location: book.location,
      cover: book.cover,
      description: book.description,
      featured: Boolean(book.featured),
      popular: Boolean(book.popular),
    });
  };

  const handleOpenAdd = () => {
    setEditingBook(null);
    setBookFormData({
      title: '',
      author: '',
      category: 'Computer Science',
      genre: 'Distributed Systems',
      ISBN: `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      publishedYear: 2024,
      pages: 320,
      rating: 4.8,
      availableCopies: 3,
      totalCopies: 4,
      location: 'Floor 2, Shelf CS-301',
      cover: 'https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=800&q=80',
      description: 'An authoritative work on modern engineering practices and principles.',
      featured: false,
      popular: false,
    });
    setIsAddBookModalOpen(true);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook({
        ...editingBook,
        ...bookFormData,
      });
      setEditingBook(null);
    } else {
      addBook(bookFormData);
      setIsAddBookModalOpen(false);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingBookId) {
      deleteBook(deletingBookId);
      setDeletingBookId(null);
    }
  };

  // Filtered Inventory
  const filteredInventory = books.filter(b =>
    b.title.toLowerCase().includes(searchInventory.toLowerCase()) ||
    b.author.toLowerCase().includes(searchInventory.toLowerCase()) ||
    b.category.toLowerCase().includes(searchInventory.toLowerCase()) ||
    b.ISBN.toLowerCase().includes(searchInventory.toLowerCase())
  );

  // Top borrowed books
  const topBorrowed = [...books].sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0)).slice(0, 5);

  // Popular genres data
  const genreCounts: Record<string, number> = {};
  books.forEach(b => {
    genreCounts[b.category] = (genreCounts[b.category] || 0) + 1;
  });
  const popularCategoriesList = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  // Monthly activity mock data
  const monthlyActivity = [
    { month: 'Apr', count: 184 },
    { month: 'May', count: 220 },
    { month: 'Jun', count: 265 },
    { month: 'Jul', count: 310 },
    { month: 'Aug', count: 295 },
    { month: 'Sep', count: 340 },
  ];
  const maxMonthly = Math.max(...monthlyActivity.map(m => m.count));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Librarian Command Console
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Library Administration
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage repository inventory, active circulation, loan policies, and member credentials.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={resetToMockData}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            title="Reset catalog & borrowed records to initial demonstration state"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all"
          >
            <BookPlus className="w-4 h-4" />
            <span>Add New Book</span>
          </button>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Titles */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Titles</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 block">
            {totalBooks}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {totalCopies} Total Copies
          </span>
        </div>

        {/* Available Copies */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Available Copies</span>
          <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 block">
            {availableCopies}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 block">
            Ready on shelf
          </span>
        </div>

        {/* Active Borrowed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Active Loans</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1 block">
            {activeLoans.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Currently checked out
          </span>
        </div>

        {/* Registered Users */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Members</span>
          <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 mt-1 block">
            {registeredUsers.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Active patrons
          </span>
        </div>

        {/* Overdue Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Overdue Items</span>
          <span className={`text-2xl font-extrabold mt-1 block ${overdueLoans.length > 0 ? 'text-rose-600' : 'text-slate-400'}`}>
            {overdueLoans.length}
          </span>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Requires follow-up
          </span>
        </div>

      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveAdminTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'inventory'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>Book Inventory ({books.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('borrowings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'borrowings'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>Active Loans ({activeLoans.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'users'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Patron Directory ({registeredUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeAdminTab === 'analytics'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Circulation Analytics</span>
        </button>
      </div>

      {/* Tab 1: Book Inventory Table */}
      {activeAdminTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Table Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Filter by title, author, category, or ISBN..."
                value={searchInventory}
                onChange={e => setSearchInventory(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <span className="text-xs text-slate-500 self-end sm:self-center">
              Displaying {filteredInventory.length} of {books.length} titles
            </span>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Book Details</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Copies</th>
                  <th className="px-5 py-3.5">Shelf Location</th>
                  <th className="px-5 py-3.5">Rating</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                {filteredInventory.map(book => (
                  <tr key={book.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded shadow-2xs shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <span className="font-bold text-slate-900 dark:text-white block truncate" title={book.title}>
                          {book.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block truncate">
                          {book.author} • ISBN: {book.ISBN}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                        {book.category}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`font-bold ${book.availableCopies > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                        {book.availableCopies}
                      </span>
                      <span className="text-slate-400"> / {book.totalCopies}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                      {book.location}
                    </td>
                    <td className="px-5 py-3 font-semibold text-amber-500">
                      ★ {book.rating.toFixed(1)}
                    </td>
                    <td className="px-5 py-3 text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(book)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
                        title="Edit Book Details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingBookId(book.id)}
                        className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete Book"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Active Borrowings Management */}
      {activeAdminTab === 'borrowings' && (
        <div className="space-y-4">
          {activeLoans.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
              <BookmarkCheck className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <h3 className="font-bold text-slate-900 dark:text-white">All copies returned</h3>
              <p className="text-xs text-slate-500 mt-1">There are no active loans checked out currently.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-3.5">Book Title</th>
                    <th className="px-5 py-3.5">Borrower ID</th>
                    <th className="px-5 py-3.5">Loan Date</th>
                    <th className="px-5 py-3.5">Due Date</th>
                    <th className="px-5 py-3.5">Reading Progress</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                  {activeLoans.map(loan => (
                    <tr key={loan.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-5 py-3 flex items-center gap-3">
                        <img src={loan.book.cover} alt={loan.book.title} className="w-9 h-12 object-cover rounded shadow-2xs" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{loan.book.title}</span>
                          <span className="text-[11px] text-slate-500">{loan.book.author}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-slate-700 dark:text-slate-300">
                        {loan.userId}
                      </td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {loan.borrowDate}
                      </td>
                      <td className="px-5 py-3 text-indigo-600 dark:text-indigo-400 font-bold">
                        {loan.dueDate}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${loan.progress}%` }} />
                          </div>
                          <span className="text-[11px] font-semibold">{loan.progress}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button
                          onClick={() => returnBook(loan.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-semibold text-xs transition-colors"
                        >
                          Check In (Return)
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

      {/* Tab 3: Registered Users */}
      {activeAdminTab === 'users' && (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-soft">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Member Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Member ID</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Active Loans</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
              {registeredUsers.map(u => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-5 py-3.5 font-bold text-slate-900 dark:text-white">
                    {u.name}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
                    {u.email}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-indigo-600 dark:text-indigo-400 font-bold">
                    {u.memberId}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {u.role}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-800 dark:text-slate-200">
                    {u.activeLoans}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300 font-bold text-[11px]">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Circulation Analytics & Visual Charts */}
      {activeAdminTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Monthly Borrowing Activity (High-Res SVG Bar Chart) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Monthly Circulation Activity
                </h3>
                <p className="text-xs text-slate-500">Student & patron borrow checkouts</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
                +24% YoY
              </span>
            </div>

            <div className="pt-6">
              <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 border-b border-slate-200 dark:border-slate-800 pb-2">
                {monthlyActivity.map(item => {
                  const heightPercent = Math.round((item.count / maxMonthly) * 100);
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.count}
                      </span>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl h-full flex items-end">
                        <div
                          className="w-full rounded-t-xl bg-gradient-to-t from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300 shadow-xs"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 mt-1">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chart 2: Popular Disciplines Distribution */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Popular Categories & Distribution
              </h3>
              <p className="text-xs text-slate-500">Inventory depth per subject category</p>
            </div>

            <div className="space-y-3 pt-2">
              {popularCategoriesList.map(([catName, count]) => {
                const pct = Math.round((count / books.length) * 100);
                return (
                  <div key={catName} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {catName}
                      </span>
                      <span className="text-slate-500">
                        {count} titles ({pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct * 3}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 3: Most Borrowed Volumes */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Top Circulation Champions
              </h3>
              <p className="text-xs text-slate-500">Volumes with highest cumulative loans</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
              {topBorrowed.map((b, idx) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate" title={b.title}>
                      {b.title}
                    </h5>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                      {b.borrowCount} checkouts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* Add / Edit Book Modal */}
      {(isAddBookModalOpen || editingBook) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 my-auto animate-scale-in max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingBook ? `Edit "${editingBook.title}"` : 'Add New Book to Catalog'}
              </h3>
              <button
                onClick={() => {
                  setIsAddBookModalOpen(false);
                  setEditingBook(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.title}
                    onChange={e => setBookFormData({ ...bookFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.author}
                    onChange={e => setBookFormData({ ...bookFormData, author: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Category
                  </label>
                  <select
                    value={bookFormData.category}
                    onChange={e => setBookFormData({ ...bookFormData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {CATEGORIES_DATA.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Genre / Sub-field
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.genre}
                    onChange={e => setBookFormData({ ...bookFormData, genre: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.ISBN}
                    onChange={e => setBookFormData({ ...bookFormData, ISBN: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Physical Location
                  </label>
                  <input
                    type="text"
                    required
                    value={bookFormData.location}
                    onChange={e => setBookFormData({ ...bookFormData, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Total Copies
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={bookFormData.totalCopies}
                    onChange={e => {
                      const tot = Number(e.target.value);
                      setBookFormData({
                        ...bookFormData,
                        totalCopies: tot,
                        availableCopies: Math.min(bookFormData.availableCopies, tot)
                      });
                    }}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Available Copies
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={bookFormData.totalCopies}
                    required
                    value={bookFormData.availableCopies}
                    onChange={e => setBookFormData({ ...bookFormData, availableCopies: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Page Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={bookFormData.pages}
                    onChange={e => setBookFormData({ ...bookFormData, pages: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Published Year
                  </label>
                  <input
                    type="number"
                    min="1800"
                    max={2030}
                    required
                    value={bookFormData.publishedYear}
                    onChange={e => setBookFormData({ ...bookFormData, publishedYear: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={bookFormData.cover}
                  onChange={e => setBookFormData({ ...bookFormData, cover: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Description / Synopsis
                </label>
                <textarea
                  rows={3}
                  required
                  value={bookFormData.description}
                  onChange={e => setBookFormData({ ...bookFormData, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={bookFormData.featured}
                    onChange={e => setBookFormData({ ...bookFormData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={bookFormData.popular}
                    onChange={e => setBookFormData({ ...bookFormData, popular: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Mark as Popular</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddBookModalOpen(false);
                    setEditingBook(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  {editingBook ? 'Save Changes' : 'Add Book to Stacks'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={Boolean(deletingBookId)}
        title="Remove Book from Repository"
        message="Are you sure you want to permanently remove this title from the library catalog? This action will also cancel any active loans for this item."
        confirmLabel="Yes, Delete Book"
        cancelLabel="Keep in Catalog"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingBookId(null)}
      />

    </div>
  );
};
