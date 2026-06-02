'use client';

import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Student } from '@/src/types/student';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type SortKey = keyof Student;
type SortDir = 'asc' | 'desc';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
  loading: boolean;
}

const COURSE_COLORS: Record<string, string> = {
  'Computer Science': 'bg-blue-100 text-blue-700',
  'Engineering': 'bg-amber-100 text-amber-700',
  'Mathematics': 'bg-emerald-100 text-emerald-700',
  'Physics': 'bg-cyan-100 text-cyan-700',
  'Business': 'bg-rose-100 text-rose-700',
  'Biology': 'bg-green-100 text-green-700',
  'Chemistry': 'bg-orange-100 text-orange-700',
  'Psychology': 'bg-violet-100 text-violet-700',
};

function courseColor(course: string) {
  return COURSE_COLORS[course] ?? 'bg-slate-100 text-slate-700';
}

export default function StudentTable({ students, onEdit, onDelete, loading }: StudentTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sorted = [...students].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === 'number' && typeof bv === 'number'
      ? av - bv
      : String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 text-slate-300" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-blue-500" />
      : <ChevronDown className="w-3 h-3 text-blue-500" />;
  };

  const columns: { key: SortKey; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'course', label: 'Course' },
    { key: 'age', label: 'Age' },
    { key: 'status', label: 'Status' },
  ];

  if (loading) {
    return (
      <div className="space-y-3 p-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer select-none hover:text-slate-700 transition-colors"
                onClick={() => handleSort(key)}
              >
                <span className="flex items-center gap-1">
                  {label}
                  <SortIcon col={key} />
                </span>
              </th>
            ))}
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-sm">
                No students found matching your criteria.
              </td>
            </tr>
          ) : (
            sorted.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-50/70 transition-colors duration-100 group"
              >
                <td className="px-4 py-3.5 font-mono text-xs text-slate-400 font-medium">
                  #{String(student.id).padStart(3, '0')}
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-800">{student.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-slate-500">{student.email}</td>
                <td className="px-4 py-3.5">
                  <span className={cn('inline-block px-2.5 py-0.5 rounded-full text-xs font-medium', courseColor(student.course))}>
                    {student.course}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-slate-600">{student.age}</td>
                <td className="px-4 py-3.5">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold',
                      student.status === 'Active'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <span
                      className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        student.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                      )}
                    />
                    {student.status}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      onClick={() => onEdit(student)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                      title="Edit"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(student)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {sorted.length > 0 && (
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
          <span>Showing {sorted.length} student{sorted.length !== 1 ? 's' : ''}</span>
          <span className="text-slate-300">Sorted by {sortKey} ({sortDir})</span>
        </div>
      )}
    </div>
  );
}
