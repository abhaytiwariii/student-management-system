"use client"

import Link from "next/link";
import { GraduationCap, Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-lg text-center space-y-8">
        {/* Logo mark */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-border flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-primary" />
          </div>
        </div>

        {/* 404 display */}
        <div className="space-y-1">
          <p className="text-[10rem] font-black leading-none tracking-tighter text-foreground/[0.06] select-none">
            404
          </p>
          <div className="-mt-10 space-y-3">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Page not found
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Suggestions */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-border bg-card p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-foreground">
              <Home className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              View your overview and student metrics
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-foreground">
              <Search className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">Students</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Search and manage all enrolled students
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium transition-opacity hover:opacity-90 w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go to dashboard
          </Link>
          <button
            onClick={() => history.back()}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-lg border border-input bg-background text-foreground text-sm font-medium transition-colors hover:bg-secondary w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground/60">
          EduAdmin · Student Management System
        </p>
      </div>
    </div>
  );
}
