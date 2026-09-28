import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { BookDetailsModal } from './components/BookDetailsModal';
import { BorrowModal } from './components/BorrowModal';
import { ReaderModal } from './components/ReaderModal';

// Pages
import { HomeView } from './pages/HomeView';
import { BrowseView } from './pages/BrowseView';
import { CategoriesView } from './pages/CategoriesView';
import { MyLibraryView } from './pages/MyLibraryView';
import { FavoritesView } from './pages/FavoritesView';
import { ProfileView } from './pages/ProfileView';
import { AdminView } from './pages/AdminView';

const MainLayout: React.FC = () => {
  const { activeTab } = useLibrary();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'browse':
        return <BrowseView />;
      case 'categories':
        return <CategoriesView />;
      case 'my-library':
        return <MyLibraryView />;
      case 'favorites':
        return <FavoritesView />;
      case 'profile':
        return <ProfileView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <Navbar />

      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      <Footer />

      {/* Global Modals & Notifications */}
      <BookDetailsModal />
      <BorrowModal />
      <ReaderModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <LibraryProvider>
      <MainLayout />
    </LibraryProvider>
  );
}

export default App;
