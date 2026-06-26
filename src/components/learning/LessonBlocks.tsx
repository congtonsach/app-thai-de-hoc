import React, { useState } from 'react';
import type {
  HeadingBlock, ParagraphBlock, VocabularyBlock, ExampleBlock,
  TipBlock, WarningBlock, ComparisonBlock, FlashcardBlock,
  QuizBlock, MatchingBlock, FillBlankBlock, SummaryBlock,
  DialogueBlock, PronunciationBlock, SyllableBuilderBlock,
} from '@/domain/types/lesson';
import { ThaiText, PhoneticText, MeaningText, TipBox, WarningBox, AudioButton, SectionCard } from '@/components/common';
import { Check, X, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';

// ── HeadingBlock ──────────────────────────────────────────
export function HeadingBlockComp({ block }: { block: HeadingBlock }) {
  const Tag = `h${block.level}` as 'h1' | 'h2' | 'h3';
  const styles = {
    1: 'text-2xl font-bold text-[var(--color-text-primary)] mt-6 mb-3',
    2: 'text-xl font-semibold text-[var(--color-text-primary)] mt-5 mb-2',
    3: 'text-lg font-semibold text-[var(--color-text-secondary)] mt-4 mb-2',
  };
  return <Tag className={styles[block.level]}>{block.content}</Tag>;
}

// ── ParagraphBlock ────────────────────────────────────────
export function ParagraphBlockComp({ block }: { block: ParagraphBlock }) {
  // Support **bold** markdown
  const html = block.content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  return (
    <p
      className="text-[var(--color-text-secondary)] leading-relaxed text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// ── VocabularyBlock ───────────────────────────────────────
export function VocabularyBlockComp({ block }: { block: VocabularyBlock }) {
  return (
    <div className="flex flex-col gap-2">
      {block.items.map((item) => (
        <SectionCard key={item.id} className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <ThaiText size="lg">{item.thai}</ThaiText>
              <PhoneticText>{item.phonetic}</PhoneticText>
            </div>
            <MeaningText>{item.meaning}</MeaningText>
            {item.partOfSpeech && (
              <span className="text-xs text-[var(--color-text-muted)] ml-1">({item.partOfSpeech})</span>
            )}
          </div>
          <AudioButton text={item.thai} />
        </SectionCard>
      ))}
    </div>
  );
}

// ── ExampleBlock ──────────────────────────────────────────
export function ExampleBlockComp({ block }: { block: ExampleBlock }) {
  return (
    <div className="bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] rounded-[var(--radius-md)] p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <ThaiText size="xl">{block.thai}</ThaiText>
          <PhoneticText>{block.phonetic}</PhoneticText>
          <MeaningText>{block.meaning}</MeaningText>
        </div>
        <AudioButton text={block.thai} />
      </div>
    </div>
  );
}

// ── TipBlock ──────────────────────────────────────────────
export function TipBlockComp({ block }: { block: TipBlock }) {
  return <TipBox title={block.title}>{block.content}</TipBox>;
}

// ── WarningBlock ──────────────────────────────────────────
export function WarningBlockComp({ block }: { block: WarningBlock }) {
  return <WarningBox title={block.title}>{block.content}</WarningBox>;
}

// ── ComparisonBlock ───────────────────────────────────────
export function ComparisonBlockComp({ block }: { block: ComparisonBlock }) {
  return (
    <SectionCard padding={false}>
      {block.title && (
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{block.title}</p>
        </div>
      )}
      <div className="divide-y divide-[var(--color-border)]">
        {block.items.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <span className="text-xs text-[var(--color-text-muted)] w-20 shrink-0">{item.label}</span>
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              <ThaiText size="md">{item.thai}</ThaiText>
              <PhoneticText>{item.phonetic}</PhoneticText>
              <span className="text-xs text-[var(--color-text-secondary)]">— {item.meaning}</span>
            </div>
            <AudioButton text={item.thai} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── SyllableBuilderBlock ──────────────────────────────────
export function SyllableBuilderBlockComp({ block }: { block: SyllableBuilderBlock }) {
  return (
    <div className="bg-[var(--color-highlight-light)] border border-yellow-200 rounded-[var(--radius-md)] p-5">
      {block.instruction && <p className="text-sm text-[var(--color-text-secondary)] mb-4">{block.instruction}</p>}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="text-center">
          <ThaiText size="xl">{block.initial}</ThaiText>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Phụ âm đầu</p>
        </div>
        <span className="text-2xl text-[var(--color-text-muted)]">+</span>
        <div className="text-center">
          <ThaiText size="xl">{block.vowel}</ThaiText>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Nguyên âm</p>
        </div>
        {block.final && (
          <>
            <span className="text-2xl text-[var(--color-text-muted)]">+</span>
            <div className="text-center">
              <ThaiText size="xl">{block.final}</ThaiText>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Phụ âm cuối</p>
            </div>
          </>
        )}
        <span className="text-2xl text-[var(--color-text-muted)]">=</span>
        <div className="text-center">
          <ThaiText size="xl" className="text-[var(--color-highlight-yellow)]!">{block.result}</ThaiText>
          <PhoneticText>{block.phonetic}</PhoneticText>
          <br />
          <MeaningText>{block.meaning}</MeaningText>
        </div>
        <AudioButton text={block.result} />
      </div>
    </div>
  );
}

// ── FlashcardBlock ────────────────────────────────────────
export function FlashcardBlockComp({ block }: { block: FlashcardBlock }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = block.cards[index];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full max-w-sm h-44 cursor-pointer select-none"
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
        aria-label={flipped ? 'Nhấn để lật lại' : 'Nhấn để xem đáp án'}
      >
        <div className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 bg-[var(--color-brand-500)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center [backface-visibility:hidden]">
            <ThaiText size="xl" className="text-white!">{card.front}</ThaiText>
            <p className="text-blue-100 text-xs mt-2">Nhấn để xem đáp án</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 bg-white border-2 border-[var(--color-brand-500)] rounded-[var(--radius-xl)] flex flex-col items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-[var(--color-text-primary)] text-xl font-semibold">{card.back}</p>
            {card.phonetic && <PhoneticText className="mt-1">{card.phonetic}</PhoneticText>}
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => { setIndex(Math.max(0, index - 1)); setFlipped(false); }}
          disabled={index === 0}
          className="p-2 rounded-full border border-[var(--color-border)] disabled:opacity-30 hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">{index + 1} / {block.cards.length}</span>
        <button
          onClick={() => { setIndex(Math.min(block.cards.length - 1, index + 1)); setFlipped(false); }}
          disabled={index === block.cards.length - 1}
          className="p-2 rounded-full border border-[var(--color-border)] disabled:opacity-30 hover:bg-[var(--color-surface-alt)] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => { setIndex(0); setFlipped(false); }}
          className="p-2 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] transition-colors"
          title="Bắt đầu lại"
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
}

// ── QuizBlock ─────────────────────────────────────────────
export function QuizBlockComp({ block }: { block: QuizBlock }) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <SectionCard>
      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">❓ {block.question}</p>
      <div className="flex flex-col gap-2">
        {block.options.map((opt, i) => {
          let style = 'border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]';
          if (answered) {
            if (i === block.correctIndex) style = 'border-green-400 bg-[var(--color-tip-light)] text-[var(--color-tip-green)]';
            else if (i === selected) style = 'border-red-400 bg-[var(--color-warning-light)] text-[var(--color-warning-red)]';
            else style = 'border-[var(--color-border)] text-[var(--color-text-muted)] opacity-60';
          }
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border text-left text-sm transition-all ${style}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                {answered && i === block.correctIndex ? <Check size={12} /> : answered && i === selected ? <X size={12} /> : String.fromCharCode(65 + i)}
              </span>
              <ThaiText size="sm" className={answered && i !== block.correctIndex && i !== selected ? 'opacity-60' : ''}>
                {opt}
              </ThaiText>
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="mt-4 p-3 bg-[var(--color-brand-50)] rounded-[var(--radius-md)]">
          <p className="text-xs font-semibold text-[var(--color-brand-600)] mb-1">
            {selected === block.correctIndex ? '✅ Chính xác!' : '❌ Chưa đúng'}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)]">{block.explanation}</p>
        </div>
      )}
    </SectionCard>
  );
}

// ── MatchingBlock ─────────────────────────────────────────
export function MatchingBlockComp({ block }: { block: MatchingBlock }) {
  const [selected, setSelected] = useState<{ left?: number; right?: number }>({});
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const shuffledRight = React.useMemo(() => {
    const indexed = block.pairs.map((p, i) => ({ text: p.right, origIndex: i }));
    return indexed.sort(() => Math.random() - 0.5);
  }, [block.pairs]);

  const handleLeft = (i: number) => {
    if (matched.has(i)) return;
    setSelected((s) => ({ ...s, left: i }));
  };
  const handleRight = (origIndex: number) => {
    if (matched.has(origIndex)) return;
    const newSel = { ...selected, right: origIndex };
    setSelected(newSel);
    if (newSel.left !== undefined && newSel.right !== undefined) {
      if (newSel.left === newSel.right) {
        setMatched((m) => new Set([...m, newSel.left!]));
      }
      setTimeout(() => setSelected({}), 500);
    }
  };

  const allMatched = matched.size === block.pairs.length;

  return (
    <SectionCard>
      {block.instruction && <p className="text-sm text-[var(--color-text-secondary)] mb-3">{block.instruction}</p>}
      {allMatched && (
        <div className="mb-3 p-2 bg-[var(--color-tip-light)] rounded text-xs text-[var(--color-tip-green)] font-semibold text-center">
          🎉 Hoàn thành! Bạn đã nối đúng tất cả!
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          {block.pairs.map((pair, i) => (
            <button
              key={i}
              onClick={() => handleLeft(i)}
              className={`px-3 py-2.5 rounded-[var(--radius-md)] border text-center transition-all text-sm
                ${matched.has(i) ? 'border-green-400 bg-[var(--color-tip-light)] opacity-70 cursor-default' :
                  selected.left === i ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]' :
                  'border-[var(--color-border)] hover:border-[var(--color-brand-500)]'}`}
            >
              <ThaiText size="sm">{pair.left}</ThaiText>
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {shuffledRight.map(({ text, origIndex }) => (
            <button
              key={origIndex}
              onClick={() => handleRight(origIndex)}
              className={`px-3 py-2.5 rounded-[var(--radius-md)] border text-center transition-all text-sm
                ${matched.has(origIndex) ? 'border-green-400 bg-[var(--color-tip-light)] opacity-70 cursor-default' :
                  selected.right === origIndex ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-50)]' :
                  'border-[var(--color-border)] hover:border-[var(--color-brand-500)]'}`}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ── FillBlankBlock ────────────────────────────────────────
export function FillBlankBlockComp({ block }: { block: FillBlankBlock }) {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const correct = value.trim() === block.answer.trim();

  const parts = block.sentence.split('___');

  return (
    <SectionCard>
      {block.instruction && <p className="text-sm text-[var(--color-text-secondary)] mb-3">{block.instruction}</p>}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <ThaiText size="md">{parts[0]}</ThaiText>
        <input
          type="text"
          value={value}
          onChange={(e) => { setValue(e.target.value); setSubmitted(false); }}
          className="border-b-2 border-[var(--color-brand-500)] bg-transparent px-2 py-1 text-center font-[var(--font-thai)] text-[var(--color-thai-blue)] text-lg outline-none w-24"
          placeholder="?"
        />
        {parts[1] && <ThaiText size="md">{parts[1]}</ThaiText>}
      </div>
      {block.hint && !submitted && (
        <p className="text-xs text-[var(--color-text-muted)] mb-3">💡 Gợi ý: {block.hint}</p>
      )}
      <button
        onClick={() => setSubmitted(true)}
        disabled={!value.trim()}
        className="px-4 py-2 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm font-medium disabled:opacity-40 hover:bg-[var(--color-brand-600)] transition-colors"
      >
        Kiểm tra
      </button>
      {submitted && (
        <div className={`mt-3 p-3 rounded-[var(--radius-md)] text-xs font-medium ${correct ? 'bg-[var(--color-tip-light)] text-[var(--color-tip-green)]' : 'bg-[var(--color-warning-light)] text-[var(--color-warning-red)]'}`}>
          {correct ? '✅ Đúng rồi!' : `❌ Chưa đúng. Đáp án đúng là: ${block.answer}`}
        </div>
      )}
    </SectionCard>
  );
}

// ── SummaryBlock ──────────────────────────────────────────
export function SummaryBlockComp({ block }: { block: SummaryBlock }) {
  return (
    <div className="bg-[var(--color-phonetic-light)] border border-purple-200 rounded-[var(--radius-lg)] p-5">
      <p className="text-sm font-bold text-[var(--color-phonetic-purple)] mb-3">📋 Tổng kết bài học</p>
      <ul className="flex flex-col gap-2">
        {block.points.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm text-purple-800">
            <Check size={16} className="text-[var(--color-phonetic-purple)] mt-0.5 shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── DialogueBlock ─────────────────────────────────────────
export function DialogueBlockComp({ block }: { block: DialogueBlock }) {
  return (
    <SectionCard padding={false}>
      <div className="px-4 py-3 border-b border-[var(--color-border)]">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">💬 Hội thoại mẫu</p>
      </div>
      <div className="divide-y divide-[var(--color-border)]">
        {block.lines.map((line, i) => (
          <div key={i} className={`px-4 py-3 flex gap-3 items-start ${i % 2 === 1 ? 'bg-[var(--color-surface-alt)]' : ''}`}>
            <span className="w-6 h-6 rounded-full bg-[var(--color-brand-500)] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-1">
              {line.speaker}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <ThaiText size="md">{line.thai}</ThaiText>
                <AudioButton text={line.thai} />
              </div>
              <div className="flex gap-2 flex-wrap mt-0.5">
                <PhoneticText>{line.phonetic}</PhoneticText>
                <span className="text-[var(--color-text-muted)] text-xs">—</span>
                <MeaningText>{line.meaning}</MeaningText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── PronunciationBlock ────────────────────────────────────
export function PronunciationBlockComp({ block }: { block: PronunciationBlock }) {
  return (
    <SectionCard padding={false}>
      {block.title && (
        <div className="px-4 py-3 border-b border-[var(--color-border)]">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">{block.title}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--color-border)]">
        {block.items.map((item, i) => (
          <div key={i} className="px-4 py-3 flex items-center gap-3">
            <div className="w-14 text-center shrink-0">
              <ThaiText size="lg">{item.symbol}</ThaiText>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--color-text-secondary)] leading-snug">{item.description}</p>
              <PhoneticText>{item.phonetic}</PhoneticText>
            </div>
            <AudioButton text={item.example} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
