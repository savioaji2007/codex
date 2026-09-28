# 📚 LibraHub — Next-Generation Online Library & Book Discovery Platform

LibraHub is a modern, responsive, and interactive digital library web application crafted with **React 19**, **TypeScript**, **Tailwind CSS**, and **Lucide Icons**. It provides a complete book discovery, borrowing, return, and catalog management experience with persistent local storage.

---

## ✨ Key Features & Pages

### 1. 🏠 Home & Discovery Dashboard
- **Hero Section**: Engaging tagline *"Discover Your Next Great Read"*, real-time search bar, and quick status pills.
- **Reading Statistics**: Live counters for total catalog titles, copies on shelf, circulation metrics, and active members.
- **Featured Books**: Handpicked librarian curations with quick borrow and favorite actions.
- **Most Popular Books**: Ranked by real checkout volume.
- **12 Curated Disciplines**: Interactive cards with custom gradients and book counts.
- **Reading Challenge Tracker**: Annual milestone tracker showing progress toward reading goals.
- **Recently Added & Recommended**: Dynamic sections highlighting highest-rated arrivals.

### 2. 🔍 Browse Catalog
- **Multi-Faceted Filtering**:
  - Filter by **Category** (12 disciplines)
  - Filter by **Genre / Sub-field**
  - Filter by **Availability Status** (In Stock vs. All Borrowed)
  - Filter by **Minimum Rating** (4.8+, 4.5+, 4.0+)
  - Sort by **Popularity**, **Highest Rated**, **Newest Releases**, **Title (A–Z)**, or **Page Count**
- **Active Filter Chips**: Quickly remove individual criteria or reset all filters with one click.
- **Pagination & Load More**: Smooth infinite loading experience.
- **Responsive Drawer**: Desktop sidebar and mobile modal filter drawer.

### 3. 📖 Book Details & Preview
- Comprehensive book modal featuring:
  - High-resolution book cover with hover zoom
  - Title, author, synopsis, genre, published year, ISBN, pages, and physical library location (*e.g., Floor 2, Shelf CS-104*)
  - Real-time availability indicator with copy count
  - Instant borrow trigger and save to favorites button
  - Interactive reading progress slider if already checked out
  - **Similar Books Section**: Discover related titles from the same category.

### 4. 🗂️ My Library (Borrowing Dashboard)
- **Currently Borrowed**: Displays active loans, countdown days remaining until due date (*with overdue alerts*), interactive progress slider, **"Continue Reading"**, and **"Return Book"** actions.
- **Interactive In-Browser Reader**: Clicking *"Continue Reading"* opens a rich reader modal with:
  - Font size controls (A- / A+)
  - Typography options (Serif vs. Sans)
  - Color themes (Light, Dark, Sepia/Warm)
  - Chapter flips and reading progress synchronizer.
- **Borrowing History**: Track all returned books with completion dates and 100% completion badges.
- **Saved Favorites**: Quick access to saved books.

### 5. ❤️ Saved Favorites
- Grid of bookmarked titles with one-click remove, detail inspection, and borrowing.
- Instant search filter within favorites.

### 6. 🏷️ Categories Directory
- 12 comprehensive academic and literary disciplines:
  - *Computer Science, Science, Technology, Fiction, Fantasy, Mystery, History, Biography, Self Development, Business, Engineering, Romance*
- Search categories and jump straight to filtered results.

### 7. 👤 User Profile & Milestones
- Member ID, joined date, avatar with status indicator.
- Total books borrowed, books returned, active loans, and favorites counters.
- Annual Reading Challenge goal tracker.
- **Edit Profile Modal**: Modify name, email, avatar URL, bio, and annual book targets with instant local persistence.

### 8. 🛡️ Librarian / Admin Dashboard
- **Circulation Analytics**:
  - High-resolution SVG bar chart for monthly checkout trends
  - Subject category distribution progress bars
  - Top 5 circulation champion volumes
- **Book Inventory Management**:
  - Searchable table of all catalog entries
  - **Add Book Modal**: Register new titles with custom categories, locations, and copy counts.
  - **Edit Book Modal**: Update existing book details.
  - **Delete Book**: Remove obsolete titles with confirmation dialogs.
- **Active Loans Management**: View borrower IDs, due dates, reading progress, and check-in (force return) loans.
- **Patron Directory**: Member list with loan activity.
- **Demo Reset Action**: Restore initial catalog state anytime.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: React 19 + Vite (Fast HMR & Optimized Production Bundles)
- **Language**: TypeScript with strict types and interfaces (`src/types/index.ts`)
- **Styling**: Tailwind CSS with custom glassmorphism, responsive utilities, and smooth micro-animations
- **Theme**: Seamless Light Mode & Dark Mode with automatic system preference detection and localStorage persistence
- **Icons**: Lucide React
- **Celebrations**: Canvas Confetti on successful checkout
- **State Management**: React Context (`src/context/LibraryContext.tsx`) + LocalStorage persistence
- **Backend-Ready Architecture**:
  - The business logic in `LibraryContext.tsx` is structured with clean service methods (`borrowBook`, `returnBook`, `addBook`, `updateBook`, `deleteBook`, `updateProfile`), making it straightforward to swap localStorage with API calls to **Supabase**, **PostgreSQL**, or **Firebase**.

---

## 🚀 Running Locally

1. Open a terminal in the project directory:
   ```bash
   cd "C:\Users\savio\.gemini\antigravity-ide\scratch\librahub"
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

4. Build for production:
   ```bash
   npm run build
   ```
