import React, { useState, useMemo } from 'react';
import { vocabularyData, vocabularyCategories } from '@/data/vocabulary';
import { ThaiText, PhoneticText, MeaningText, AudioButton, SectionCard, EmptyState } from '@/components/common';
import { Search, LayoutList, CreditCard, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import type { VocabularyItem } from '@/domain/types/lesson';

// ── VocabularyCard (list item) ────────────────────────────
function VocabularyListItem({ item }: { item: VocabularyItem }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <SectionCard
      className="cursor-pointer hover:shadow-[var(--shadow-elevated)] transition-shadow"
    >
      <div className="flex items-center gap-3" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <ThaiText size="lg">{item.thai}</ThaiText>
            <PhoneticText>{item.phonetic}</PhoneticText>
          </div>
          <MeaningText>{item.meaning}</MeaningText>
          {item.partOfSpeech && (
            <span className="text-xs text-[var(--color-text-muted)] ml-0.5">· {item.partOfSpeech}</span>
          )}
        </div>
        <AudioButton text={item.thai} />
      </div>
      {expanded && item.example && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Ví dụ:</p>
          <div className="flex flex-col gap-0.5">
            <ThaiText size="sm">{item.example.thai}</ThaiText>
            <PhoneticText>{item.example.phonetic}</PhoneticText>
            <MeaningText>{item.example.meaning}</MeaningText>
          </div>
        </div>
      )}
    </SectionCard>
  );
}

// ── Flashcard mode ────────────────────────────────────────
function FlashcardMode({ items }: { items: VocabularyItem[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = items[index];

  if (!card) return <EmptyState icon="📭" title="Không có từ nào" />;

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <p className="text-sm text-[var(--color-text-muted)]">{index + 1} / {items.length}</p>
      <div
        className="w-full max-w-sm h-52 cursor-pointer select-none"
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
        aria-label={flipped ? 'Nhấn để xem mặt trước' : 'Nhấn để xem nghĩa'}
      >
        <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-brand-500)] to-[var(--color-brand-700)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] shadow-[var(--shadow-elevated)]">
            <ThaiText size="xl" className="text-white! text-5xl!">{card.thai}</ThaiText>
            <p className="text-blue-200 text-xs">Nhấn để xem nghĩa</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-white border-2 border-[var(--color-brand-500)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center gap-2 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[var(--shadow-elevated)]">
            <p className="text-[var(--color-text-primary)] text-2xl font-bold">{card.meaning}</p>
            <PhoneticText className="text-base!">{card.phonetic}</PhoneticText>
            {card.partOfSpeech && (
              <span className="text-xs text-[var(--color-text-muted)] mt-1 px-2 py-0.5 bg-[var(--color-surface-alt)] rounded">
                {card.partOfSpeech}
              </span>
            )}
            <AudioButton text={card.thai} className="mt-1" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => { setIndex(Math.max(0, index - 1)); setFlipped(false); }}
          disabled={index === 0}
          className="p-2.5 rounded-full border border-[var(--color-border)] disabled:opacity-30 hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => { setIndex(0); setFlipped(false); }}
          className="p-2 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors"
          title="Bắt đầu lại"
        >
          <RotateCcw size={15} />
        </button>
        <button
          onClick={() => { setIndex(Math.min(items.length - 1, index + 1)); setFlipped(false); }}
          disabled={index === items.length - 1}
          className="p-2.5 rounded-full border border-[var(--color-border)] disabled:opacity-30 hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setFlipped(false); }}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--color-border)]'}`}
            aria-label={`Từ số ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main VocabularyPage ───────────────────────────────────
export function VocabularyPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [mode, setMode] = useState<'list' | 'flashcard'>('list');

  const filtered = useMemo(() => {
    return vocabularyData.filter((item) => {
      const matchSearch =
        !search ||
        item.thai.includes(search) ||
        item.phonetic.toLowerCase().includes(search.toLowerCase()) ||
        item.meaning.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'all' || item.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Từ Vựng 📖</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          {vocabularyData.length} từ · Tìm kiếm và luyện tập
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm theo tiếng Thái, phiên âm hoặc nghĩa..."
          className="w-full pl-9 pr-4 py-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] text-sm focus:outline-none focus:border-[var(--color-brand-500)] transition-colors"
        />
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
        {/* Mode toggle */}
        <div className="flex border border-[var(--color-border)] rounded-[var(--radius-md)] overflow-hidden shrink-0">
          <button
            onClick={() => setMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${mode === 'list' ? 'bg-[var(--color-brand-500)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]'}`}
          >
            <LayoutList size={14} /> Danh sách
          </button>
          <button
            onClick={() => setMode('flashcard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${mode === 'flashcard' ? 'bg-[var(--color-brand-500)] text-white' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]'}`}
          >
            <CreditCard size={14} /> Flashcard
          </button>
        </div>
        {/* Category filter */}
        <button
          onClick={() => setCategory('all')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${category === 'all' ? 'bg-[var(--color-brand-500)] text-white border-transparent' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)]'}`}
        >
          Tất cả
        </button>
        {vocabularyCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${category === cat ? 'bg-[var(--color-brand-500)] text-white border-transparent' : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-[var(--color-text-muted)] mb-4">
        Hiển thị {filtered.length} từ
        {search && ` cho "${search}"`}
        {category !== 'all' && ` trong "${category}"`}
      </p>

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="Không tìm thấy từ nào"
          description="Thử thay đổi từ khóa hoặc bộ lọc."
          action={
            <button
              onClick={() => { setSearch(''); setCategory('all'); }}
              className="px-4 py-2 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm"
            >
              Xóa bộ lọc
            </button>
          }
        />
      ) : mode === 'flashcard' ? (
        <FlashcardMode items={filtered} />
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((item) => (
            <VocabularyListItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
