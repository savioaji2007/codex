import React, { useState } from 'react';
import { useLibrary, NavigationTab } from '../context/LibraryContext';
import { BookOpen, Heart, Mail, Clock, MapPin, Phone, ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, setCategoryFilter, addToast } = useLibrary();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleCategoryClick = (categoryName: string) => {
    setCategoryFilter(categoryName);
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setSubscribed(true);
      addToast({
        type: 'success',
        title: 'Subscribed to LibraHub Gazette!',
        message: `Weekly book picks and literary digests will be sent to ${newsletterEmail}.`,
      });
      setNewsletterEmail('');
    } else {
      addToast({
        type: 'warning',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
      });
    }
  };

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                LibraHub
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              An open digital gateway for avid readers, scholars, and lifelong learners. Discover inspiring books, borrow titles instantly, and elevate your reading journey.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>450 University Ave, Cambridge Central Campus</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Open Mon–Sat: 8:00 AM – 10:00 PM | Sun: 10:00 AM – 6:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Library Help Desk: +1 (800) 542-7248</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home & Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('browse')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Browse Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('categories')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Explore Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('my-library')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  My Borrowed Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('favorites')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Saved Favorites
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Admin Management
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Popular Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {['Computer Science', 'Science', 'Technology', 'Fiction', 'Fantasy', 'Self Development'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-indigo-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter & Digest */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Reader’s Digest
            </h3>
            <p className="text-xs text-slate-400">
              Get notified of new acquisitions, author book clubs, and monthly reading challenges.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-md text-xs font-medium transition-colors flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[11px] text-slate-500 block">
                No spam. Unsubscribe anytime with 1 click.
              </span>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LibraHub Online Library System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Terms of Borrowing
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
