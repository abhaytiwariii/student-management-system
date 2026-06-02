'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PlusCircle, RefreshCw, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MetricCards from '@/components/MetricCards';
import FilterBar from '@/components/FilterBar';
import StudentTable from '@/components/StudentTable';
import StudentModal from '@/components/StudentModal';
import DeleteConfirm from '@/components/DeleteConfirm';
import { Student, CreateStudentInput } from '@/src/types/student';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from '@/src/services/api';

export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  const [addOpen, setAddOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllStudents();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load students.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const courses = useMemo(
    () => Array.from(new Set(students.map((s) => s.course))).sort(),
    [students]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return students.filter((s) => {
      const matchSearch =
        !q || s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchCourse = courseFilter === 'all' || s.course === courseFilter;
      return matchSearch && matchCourse;
    });
  }, [students, search, courseFilter]);

  async function handleAdd(data: CreateStudentInput) {
    setSubmitting(true);
    try {
      const created = await createStudent(data);
      setStudents((prev) => [...prev, created]);
      setAddOpen(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add student.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleEdit(data: CreateStudentInput) {
    if (!editStudent) return;
    setSubmitting(true);
    try {
      const updated = await updateStudent(editStudent.id, data);
      setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditStudent(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update student.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteStudent(deleteTarget.id);
      setStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete student.');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex-shrink-0 px-8 py-5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Student Management</h1>
            <p className="text-sm text-slate-400 mt-0.5">Monitor, manage, and analyze your student records.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchStudents}
              disabled={loading}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => setAddOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm shadow-blue-200"
            >
              <PlusCircle className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Error banner */}
          {error && (
            <div className="flex items-center gap-3 px-4 py-3 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
              <button
                onClick={fetchStudents}
                className="ml-auto text-xs font-semibold underline hover:no-underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* Metric cards */}
          <MetricCards students={loading ? [] : students} />

          {/* Table card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-800">Student Records</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {loading ? 'Loading...' : `${filtered.length} record${filtered.length !== 1 ? 's' : ''} found`}
                </p>
              </div>
              <FilterBar
                search={search}
                onSearchChange={setSearch}
                courseFilter={courseFilter}
                onCourseFilterChange={setCourseFilter}
                courses={courses}
              />
            </div>

            <StudentTable
              students={filtered}
              onEdit={(s) => setEditStudent(s)}
              onDelete={(s) => setDeleteTarget(s)}
              loading={loading}
            />
          </div>
        </div>
      </main>

      {/* Add modal */}
      <StudentModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
        submitting={submitting}
      />

      {/* Edit modal */}
      <StudentModal
        open={!!editStudent}
        student={editStudent}
        onClose={() => setEditStudent(null)}
        onSubmit={handleEdit}
        submitting={submitting}
      />

      {/* Delete confirm */}
      <DeleteConfirm
        open={!!deleteTarget}
        student={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}
