import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Map, BookOpen, Dumbbell, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Trang chủ', exact: true },
  { to: '/roadmap', icon: Map, label: 'Lộ trình', exact: false },
  { to: '/vocabulary', icon: BookOpen, label: 'Từ vựng', exact: false },
  { to: '/practice', icon: Dumbbell, label: 'Luyện tập', exact: false },
  { to: '/progress', icon: BarChart2, label: 'Tiến độ', exact: false },
  { to: '/settings', icon: Settings, label: 'Cài đặt', exact: false },
];

function NavItem({ to, icon: Icon, label, exact }: typeof navItems[0]) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex flex-col items-center gap-0.5 px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors
        ${isActive
          ? 'text-[var(--color-brand-600)] bg-[var(--color-brand-50)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'
        }`
      }
    >
      <Icon size={20} strokeWidth={1.8} />
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarNavItem({ to, icon: Icon, label, exact }: typeof navItems[0]) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm font-medium transition-colors
        ${isActive
          ? 'text-[var(--color-brand-600)] bg-[var(--color-brand-50)]'
          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-alt)]'
        }`
      }
    >
      <Icon size={18} strokeWidth={1.8} />
      <span>{label}</span>
    </NavLink>
  );
}

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)] dark:bg-[var(--color-dark-surface)]">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-56 bg-[var(--color-surface)] dark:bg-[var(--color-dark-surface-alt)] border-r border-[var(--color-border)] dark:border-[var(--color-dark-border)] z-20">
        {/* Logo */}
        <div className="px-4 py-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇹🇭</span>
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">THÁI DỄ HỌC</p>
              <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">Học tiếng Thái mỗi ngày</p>
            </div>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-2 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarNavItem key={item.to} {...item} />
          ))}
        </nav>
        {/* Footer */}
        <div className="px-4 py-3 border-t border-[var(--color-border)]">
          <p className="text-[10px] text-[var(--color-text-muted)]">v1.0 MVP · Phúc Thọ, VN</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-56 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>

      {/* Bottom nav — mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] z-20 px-1 py-1">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>
    </div>
  );
}
