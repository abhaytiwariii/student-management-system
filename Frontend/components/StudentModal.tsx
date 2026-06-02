'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Student, CreateStudentInput } from '@/src/types/student';
import { cn } from '@/lib/utils';

const COURSES = [
  'Computer Science',
  'Engineering',
  'Mathematics',
  'Physics',
  'Business',
  'Biology',
  'Chemistry',
  'Psychology',
];

interface StudentModalProps {
  open: boolean;
  student?: Student | null;
  onClose: () => void;
  onSubmit: (data: CreateStudentInput) => Promise<void>;
  submitting: boolean;
}

type FormErrors = Partial<Record<keyof CreateStudentInput, string>>;

const empty: CreateStudentInput = {
  name: '',
  email: '',
  course: '',
  age: 0,
  status: 'Active',
};

function validate(data: CreateStudentInput): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required.';
  if (!data.email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Enter a valid email.';
  if (!data.course) errors.course = 'Please select a course.';
  if (!data.age || data.age <= 0) errors.age = 'Age must be greater than 0.';
  return errors;
}

export default function StudentModal({ open, student, onClose, onSubmit, submitting }: StudentModalProps) {
  const [form, setForm] = useState<CreateStudentInput>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open) {
      setForm(student ? { name: student.name, email: student.email, course: student.course, age: student.age, status: student.status } : empty);
      setErrors({});
      setTouched(new Set());
    }
  }, [open, student]);

  function set<K extends keyof CreateStudentInput>(key: K, value: CreateStudentInput[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (touched.has(key)) {
        const errs = validate(next);
        setErrors((e) => ({ ...e, [key]: errs[key] }));
      }
      return next;
    });
  }

  function touch(key: string) {
    setTouched((prev) => { const s = new Set(Array.from(prev)); s.add(key); return s; });
    const errs = validate(form);
    setErrors((e) => ({ ...e, [key]: errs[key as keyof CreateStudentInput] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allKeys = Object.keys(form) as (keyof CreateStudentInput)[];
    setTouched(new Set(allKeys));
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    await onSubmit(form);
  }

  if (!open) return null;

  const isEdit = !!student;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isEdit ? 'Edit Student' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEdit ? 'Update the student record below.' : 'Fill in the details to register a new student.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="px-6 py-5 space-y-4">
            {/* Name */}
            <Field label="Full Name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                onBlur={() => touch('name')}
                placeholder="e.g. Jane Smith"
                className={fieldClass(!!errors.name)}
              />
            </Field>

            {/* Email */}
            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => touch('email')}
                placeholder="e.g. jane@example.com"
                className={fieldClass(!!errors.email)}
              />
            </Field>

            {/* Course + Age row */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Course" error={errors.course}>
                <select
                  value={form.course}
                  onChange={(e) => set('course', e.target.value)}
                  onBlur={() => touch('course')}
                  className={fieldClass(!!errors.course)}
                >
                  <option value="">Select course</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>

              <Field label="Age" error={errors.age}>
                <input
                  type="number"
                  min={1}
                  value={form.age || ''}
                  onChange={(e) => set('age', parseInt(e.target.value, 10) || 0)}
                  onBlur={() => touch('age')}
                  placeholder="e.g. 20"
                  className={fieldClass(!!errors.age)}
                />
              </Field>
            </div>

            {/* Status */}
            <Field label="Status">
              <div className="flex gap-3">
                {(['Active', 'Inactive'] as const).map((s) => (
                  <label
                    key={s}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer text-sm font-medium transition-all',
                      form.status === s
                        ? s === 'Active'
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-700'
                          : 'border-slate-300 bg-slate-50 text-slate-600'
                        : 'border-slate-200 text-slate-400 hover:border-slate-300'
                    )}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={s}
                      checked={form.status === s}
                      onChange={() => set('status', s)}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'w-2 h-2 rounded-full',
                        form.status === s
                          ? s === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                          : 'bg-slate-200'
                      )}
                    />
                    {s}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 rounded-b-2xl border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
            >
              {submitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : isEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function fieldClass(hasError: boolean) {
  return cn(
    'w-full px-3.5 py-2.5 text-sm bg-white border rounded-xl focus:outline-none focus:ring-2 transition-all',
    hasError
      ? 'border-rose-300 focus:ring-rose-200 focus:border-rose-400'
      : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-400'
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
