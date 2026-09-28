import React from 'react';
import { CategoryInfo } from '../types';
import {
  BookOpen,
  Atom,
  Cpu,
  Terminal,
  Hourglass,
  UserCheck,
  Compass,
  Heart,
  Sparkles,
  TrendingUp,
  Briefcase,
  Wrench,
  ArrowRight
} from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  bookCount: number;
  onClick: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  Atom,
  Cpu,
  Terminal,
  Hourglass,
  UserCheck,
  Compass,
  Heart,
  Sparkles,
  TrendingUp,
  Briefcase,
  Wrench,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  bookCount,
  onClick,
}) => {
  const IconComponent = iconMap[category.iconName] || BookOpen;

  return (
    <div
      onClick={onClick}
      className={`group relative p-6 rounded-3xl bg-gradient-to-br ${category.bgGradient} bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-soft-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[170px]`}
    >
      {/* Decorative top blur */}
      <div
        className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-10 group-hover:opacity-20 transition-opacity blur-xl"
        style={{ backgroundColor: category.color }}
      />

      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: category.color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>

        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300">
          {bookCount} {bookCount === 1 ? 'book' : 'books'}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {category.name}
          </h3>
          <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
};
