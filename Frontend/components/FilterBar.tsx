'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  courseFilter: string;
  onCourseFilterChange: (val: string) => void;
  courses: string[];
}

export default function FilterBar({
  search,
  onSearchChange,
  courseFilter,
  onCourseFilterChange,
  courses,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-slate-400"
        />
      </div>

      {/* Course filter */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <Select value={courseFilter} onValueChange={onCourseFilterChange}>
          <SelectTrigger className="w-48 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500/30 bg-white text-sm">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
