import React from 'react';
import { Loader2 } from 'lucide-react';

// ── ThaiText ──────────────────────────────────────────────
interface ThaiTextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const thaiSizeMap = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export function ThaiText({ children, size = 'md', className = '' }: ThaiTextProps) {
  return (
    <span
      className={`font-[var(--font-thai)] text-[var(--color-thai-blue)] leading-loose font-medium ${thaiSizeMap[size]} ${className}`}
    >
      {children}
    </span>
  );
}

// ── PhoneticText ──────────────────────────────────────────
interface PhoneticTextProps {
  children: React.ReactNode;
  className?: string;
}
export function PhoneticText({ children, className = '' }: PhoneticTextProps) {
  return (
    <span className={`text-[var(--color-phonetic-purple)] italic text-sm ${className}`}>
      /{children}/
    </span>
  );
}

// ── MeaningText ───────────────────────────────────────────
interface MeaningTextProps {
  children: React.ReactNode;
  className?: string;
}
export function MeaningText({ children, className = '' }: MeaningTextProps) {
  return (
    <span className={`text-[var(--color-meaning-orange)] font-semibold text-sm ${className}`}>
      {children}
    </span>
  );
}

// ── ProgressBar ───────────────────────────────────────────
interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  color?: string;
  className?: string;
  size?: 'sm' | 'md';
}
export function ProgressBar({ value, label, color = 'var(--color-brand-500)', className = '', size = 'md' }: ProgressBarProps) {
  const height = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div className={className}>
      {label && (
        <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mb-1">
          <span>{label}</span>
          <span>{Math.round(value)}%</span>
        </div>
      )}
      <div className={`w-full bg-[var(--color-border)] rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ── EmptyState ────────────────────────────────────────────
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}
export function EmptyState({ icon = '📭', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">{title}</h3>
      {description && <p className="text-[var(--color-text-secondary)] text-sm max-w-xs mb-6">{description}</p>}
      {action}
    </div>
  );
}

// ── LoadingState ──────────────────────────────────────────
export function LoadingState({ message = 'Đang tải...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--color-brand-500)]" />
      <p className="text-sm text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}
const badgeVariants = {
  default: 'bg-[var(--color-border)] text-[var(--color-text-secondary)]',
  success: 'bg-[var(--color-tip-light)] text-[var(--color-tip-green)]',
  warning: 'bg-[var(--color-highlight-light)] text-[var(--color-highlight-yellow)]',
  danger: 'bg-[var(--color-warning-light)] text-[var(--color-warning-red)]',
  info: 'bg-[var(--color-thai-blue-light)] text-[var(--color-thai-blue)]',
};
export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeVariants[variant]}`}>
      {children}
    </span>
  );
}

// ── SectionCard ───────────────────────────────────────────
interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}
export function SectionCard({ children, className = '', padding = true }: SectionCardProps) {
  return (
    <div
      className={`bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border)] shadow-[var(--shadow-card)] ${padding ? 'p-5' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

// ── TipBox / WarningBox ───────────────────────────────────
export function TipBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-tip-light)] border border-green-200 rounded-[var(--radius-md)] p-4">
      <p className="text-sm font-semibold text-[var(--color-tip-green)] mb-1">
        💡 {title || 'Mẹo ghi nhớ'}
      </p>
      <p className="text-sm text-green-800 leading-relaxed">{children}</p>
    </div>
  );
}

export function WarningBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--color-warning-light)] border border-red-200 rounded-[var(--radius-md)] p-4">
      <p className="text-sm font-semibold text-[var(--color-warning-red)] mb-1">
        ⚠️ {title || 'Lỗi thường gặp'}
      </p>
      <p className="text-sm text-red-800 leading-relaxed">{children}</p>
    </div>
  );
}

export function ExampleBox({ thai, phonetic, meaning }: { thai: string; phonetic: string; meaning: string }) {
  return (
    <div className="bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] rounded-[var(--radius-md)] p-4 flex items-center gap-4">
      <div className="flex-1">
        <ThaiText size="lg">{thai}</ThaiText>
      </div>
      <div className="text-right">
        <PhoneticText>{phonetic}</PhoneticText>
        <br />
        <MeaningText>{meaning}</MeaningText>
      </div>
    </div>
  );
}

// ── AudioButton ───────────────────────────────────────────
interface AudioButtonProps {
  text: string;
  lang?: string;
  className?: string;
}
export function AudioButton({ text, lang = 'th-TH', className = '' }: AudioButtonProps) {
  const speak = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = lang;
      utt.rate = 0.8;
      window.speechSynthesis.speak(utt);
    }
  };
  return (
    <button
      onClick={speak}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-brand-100)] text-[var(--color-brand-600)] hover:bg-[var(--color-brand-500)] hover:text-white transition-colors ${className}`}
      title="Nghe phát âm"
      aria-label="Nghe phát âm"
    >
      🔊
    </button>
  );
}
