import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { getDisplayAvatar } from '../utils/avatar';
import {
  User,
  Mail,
  CreditCard,
  Calendar,
  BookOpen,
  RotateCcw,
  Heart,
  Award,
  Edit3,
  CheckCircle2,
  X,
  Target,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, updateProfile, borrowedBooks, favorites, setActiveTab } = useLibrary();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: user.bio,
    readingGoal: user.readingGoal,
  });

  const totalBorrowed = borrowedBooks.length;
  const returnedCount = borrowedBooks.filter(b => b.status === 'returned').length;
  const activeCount = borrowedBooks.filter(b => b.status === 'active').length;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const goalPercentage = Math.min(100, Math.round((user.booksReadThisYear / (user.readingGoal || 1)) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          
          {/* Avatar with status indicator */}
          <div className="relative">
            <img
              src={getDisplayAvatar(user.avatar)}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-indigo-100 dark:border-indigo-950 shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cristiano_Ronaldo_2018.jpg';
              }}
            />
            <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-xs">
              Active
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {user.name}
                  </h1>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {user.role === 'admin' ? 'Librarian / Admin' : 'Active Member'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Member ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{user.memberId}</span>
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-2xs mx-auto sm:mx-0"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed pt-1">
              {user.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                Joined {user.joinedDate}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2 mx-auto sm:mx-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Total Borrowed</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">{totalBorrowed}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 mx-auto sm:mx-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Books Returned</span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">{returnedCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 mx-auto sm:mx-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Active Loans</span>
          <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-0.5 block">{activeCount}</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft text-center sm:text-left">
          <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2 mx-auto sm:mx-0">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Favorites</span>
          <span className="text-2xl font-extrabold text-rose-500 mt-0.5 block">{favorites.length}</span>
        </div>
      </div>

      {/* Reading Goal Progress Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-50/80 via-purple-50/40 to-slate-50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/60 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Annual Reading Milestone ({new Date().getFullYear()})
              </h3>
              <p className="text-xs text-slate-500">
                {user.booksReadThisYear} of {user.readingGoal} volumes completed
              </p>
            </div>
          </div>

          <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400 self-start sm:self-auto">
            {goalPercentage}% Achieved
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-indigo-600 to-purple-600 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${goalPercentage}%` }}
          />
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {goalPercentage >= 100
            ? 'Incredible milestone! You have reached your annual reading target. Keep going!'
            : `You are on pace to finish your reading challenge! Just ${user.readingGoal - user.booksReadThisYear} more books to reach your target.`}
        </p>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Member Profile
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Bio / Reading Philosophy
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Annual Reading Goal (Books)
                </label>
                <input
                  type="number"
                  min="1"
                  max="200"
                  value={formData.readingGoal}
                  onChange={e => setFormData({ ...formData, readingGoal: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
