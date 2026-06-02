'use client';

import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react';
import { Student } from '@/src/types/student';
import { cn } from '@/lib/utils';

interface MetricCardsProps {
  students: Student[];
}

function getTopDepartment(students: Student[]): string {
  if (students.length === 0) return '—';
  const counts: Record<string, number> = {};
  students.forEach((s) => {
    counts[s.course] = (counts[s.course] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

const cards = (students: Student[]) => {
  const active = students.filter((s) => s.status === 'Active').length;
  const courses = new Set(students.map((s) => s.course)).size;
  const topDept = getTopDepartment(students);

  return [
    {
      title: 'Total Students',
      value: students.length.toString(),
      change: '+12% this month',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Active Students',
      value: active.toString(),
      change: `${students.length > 0 ? Math.round((active / students.length) * 100) : 0}% of total`,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Active Courses',
      value: courses.toString(),
      change: 'Across all departments',
      icon: BookOpen,
      gradient: 'from-amber-500 to-orange-500',
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      badge: 'bg-amber-100 text-amber-700',
    },
    {
      title: 'Top Department',
      value: topDept,
      change: 'Highest enrollment',
      icon: Trophy,
      gradient: 'from-rose-500 to-pink-600',
      bg: 'bg-rose-50',
      text: 'text-rose-600',
      badge: 'bg-rose-100 text-rose-700',
    },
  ];
};

export default function MetricCards({ students }: MetricCardsProps) {
  const metrics = cards(students);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map(({ title, value, change, icon: Icon, gradient, bg, text, badge }) => (
        <div
          key={title}
          className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden hover:shadow-md transition-shadow duration-200"
        >
          {/* Subtle gradient orb */}
          <div className={cn('absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br', gradient)} />

          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
              <p className={cn('mt-2 text-3xl font-bold truncate', text)}>{value}</p>
              <span className={cn('mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full', badge)}>
                {change}
              </span>
            </div>
            <div className={cn('flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center', bg)}>
              <Icon className={cn('w-6 h-6', text)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
