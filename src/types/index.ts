export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  cover: string;
  category: string;
  genre: string;
  ISBN: string;
  publishedYear: number;
  pages: number;
  rating: number;
  availableCopies: number;
  totalCopies: number;
  location: string;
  featured?: boolean;
  popular?: boolean;
  borrowCount: number;
  sampleContent?: {
    chapter: string;
    text: string;
  }[];
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string; // ISO date
  dueDate: string;    // ISO date
  returnDate?: string;
  progress: number;   // 0 - 100 percentage
  status: 'active' | 'returned' | 'overdue';
  book: Book;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  memberId: string;
  joinedDate: string;
  avatar: string;
  bio: string;
  role: 'member' | 'admin';
  readingGoal: number; // books per year
  booksReadThisYear: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  bgGradient: string;
}

export type SortOption = 'popularity' | 'rating' | 'newest' | 'title-asc' | 'pages-asc';

export interface FilterState {
  searchQuery: string;
  category: string;
  genre: string;
  author: string;
  availability: 'all' | 'available' | 'borrowed';
  minRating: number;
  sortBy: SortOption;
}
