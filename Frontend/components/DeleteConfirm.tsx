'use client';

import { AlertTriangle, X } from 'lucide-react';
import { Student } from '@/src/types/student';

interface DeleteConfirmProps {
  open: boolean;
  student: Student | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  deleting: boolean;
}

export default function DeleteConfirm({ open, student, onClose, onConfirm, deleting }: DeleteConfirmProps) {
  if (!open || !student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-start justify-between px-6 pt-6">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 pt-4 pb-6">
          <h3 className="text-lg font-bold text-slate-800">Delete Student</h3>
          <p className="mt-2 text-sm text-slate-500">
            Are you sure you want to delete{' '}
            <span className="font-semibold text-slate-700">{student.name}</span>? This action
            cannot be undone.
          </p>
        </div>

        <div className="px-6 py-4 bg-slate-50 rounded-b-2xl border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition-all disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={deleting}
            className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 rounded-xl hover:bg-rose-700 transition-all disabled:opacity-60 flex items-center gap-2 shadow-sm"
          >
            {deleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : 'Delete Student'}
          </button>
        </div>
      </div>
    </div>
  );
}
