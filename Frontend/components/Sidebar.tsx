'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart2,
  Settings,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Students', href: '/students' },
  { icon: BookOpen, label: 'Courses', href: '/courses' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

const bottomItems = [
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: HelpCircle, label: 'Help & Support', href: '/help' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-slate-900 text-slate-100 transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 py-5 border-b border-slate-700/60', collapsed && 'justify-center px-0')}>
        <div className="flex-shrink-0 w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <p className="font-bold text-sm text-white leading-tight">EduManage</p>
            <p className="text-xs text-slate-400">Student Portal</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 z-10 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center shadow-md hover:bg-slate-600 transition-colors"
        aria-label="Toggle sidebar"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-slate-300" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-slate-300" />
        )}
      </button>

      {/* Main nav */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-hidden">
        {!collapsed && (
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            Main Menu
          </p>
        )}
        {navItems.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                active
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
                collapsed && 'justify-center px-0'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn('flex-shrink-0', active ? 'w-5 h-5 text-blue-400' : 'w-5 h-5')} />
              {!collapsed && <span>{label}</span>}
              {!collapsed && active && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-2 pb-4 space-y-1 border-t border-slate-700/60 pt-3">
        {bottomItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all duration-150',
              collapsed && 'justify-center px-0'
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="flex-shrink-0 w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}

        {/* User avatar */}
        <div className={cn('flex items-center gap-3 px-3 py-2 mt-2', collapsed && 'justify-center px-0')}>
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
            AD
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">Admin User</p>
              <p className="text-xs text-slate-500 truncate">admin@edumanage.io</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
