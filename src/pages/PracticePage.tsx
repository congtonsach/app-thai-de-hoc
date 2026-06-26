import React, { useState, useCallback } from 'react';
import { vocabularyData } from '@/data/vocabulary';
import { ThaiText, PhoneticText, MeaningText, AudioButton, SectionCard } from '@/components/common';
import { Check, X, RotateCcw, Trophy } from 'lucide-react';
import type { VocabularyItem } from '@/domain/types/lesson';

type ExerciseMode = 'menu' | 'thai-to-meaning' | 'meaning-to-thai' | 'listen-choose' | 'result';

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correct: VocabularyItem, all: VocabularyItem[], count = 4): VocabularyItem[] {
  const others = shuffle(all.filter((v) => v.id !== correct.id)).slice(0, count - 1);
  return shuffle([correct, ...others]);
}

// ── MCQ Exercise ──────────────────────────────────────────
interface MCQProps {
  question: React.ReactNode;
  options: { label: React.ReactNode; value: string }[];
  correctValue: string;
  onAnswer: (correct: boolean) => void;
  explanation?: string;
}

function MCQExercise({ question, options, correctValue, onAnswer, explanation }: MCQProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctValue;

  const handleSelect = (value: string) => {
    if (answered) return;
    setSelected(value);
    setTimeout(() => onAnswer(value === correctValue), 800);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="p-5 bg-[var(--color-brand-50)] rounded-[var(--radius-lg)] text-center">
        {question}
      </div>
      <div className="flex flex-col gap-2">
        {options.map((opt) => {
          let style = 'border-[var(--color-border)] hover:border-[var(--color-brand-500)] text-[var(--color-text-primary)]';
          if (answered) {
            if (opt.value === correctValue) style = 'border-green-400 bg-[var(--color-tip-light)] text-[var(--color-tip-green)]';
            else if (opt.value === selected) style = 'border-red-400 bg-[var(--color-warning-light)] text-[var(--color-warning-red)]';
            else style = 'border-[var(--color-border)] opacity-50';
          }
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              disabled={answered}
              className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] border text-left text-sm transition-all ${style}`}
            >
              <span className="flex-1">{opt.label}</span>
              {answered && opt.value === correctValue && <Check size={16} />}
              {answered && opt.value === selected && opt.value !== correctValue && <X size={16} />}
            </button>
          );
        })}
      </div>
      {answered && explanation && (
        <p className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-3">
          {isCorrect ? '✅' : '❌'} {explanation}
        </p>
      )}
    </div>
  );
}

// ── Session runner ────────────────────────────────────────
interface SessionProps {
  mode: 'thai-to-meaning' | 'meaning-to-thai' | 'listen-choose';
  items: VocabularyItem[];
  onDone: (score: number, total: number) => void;
}

function ExerciseSession({ mode, items, onDone }: SessionProps) {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const current = items[index];

  const handleAnswer = useCallback((isCorrect: boolean) => {
    const newCorrect = correct + (isCorrect ? 1 : 0);
    if (index + 1 >= items.length) {
      onDone(newCorrect, items.length);
    } else {
      setCorrect(newCorrect);
      setIndex(index + 1);
    }
  }, [correct, index, items.length, onDone]);

  if (!current) return null;

  const options = getOptions(current, vocabularyData).map((v) => ({
    label: mode === 'thai-to-meaning' || mode === 'listen-choose'
      ? <span>{v.meaning} <span className="text-xs text-[var(--color-text-muted)]">({v.phonetic})</span></span>
      : <ThaiText size="sm">{v.thai}</ThaiText>,
    value: v.id,
  }));

  const question =
    mode === 'thai-to-meaning' ? (
      <div className="flex flex-col items-center gap-2">
        <ThaiText size="xl">{current.thai}</ThaiText>
        <PhoneticText>{current.phonetic}</PhoneticText>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">Chọn nghĩa đúng</p>
      </div>
    ) : mode === 'meaning-to-thai' ? (
      <div className="flex flex-col items-center gap-2">
        <MeaningText className="text-2xl!">{current.meaning}</MeaningText>
        <p className="text-xs text-[var(--color-text-muted)] mt-1">Chọn chữ Thái đúng</p>
      </div>
    ) : (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-[var(--color-text-secondary)]">Nghe và chọn nghĩa đúng</p>
        <AudioButton text={current.thai} className="w-14! h-14! text-2xl!" />
        <p className="text-xs text-[var(--color-text-muted)]">Nhấn 🔊 để nghe</p>
      </div>
    );

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-[var(--color-text-muted)]">Câu {index + 1}/{items.length}</span>
        <span className="text-sm text-[var(--color-tip-green)] font-medium">✓ {correct} đúng</span>
      </div>
      <div className="w-full bg-[var(--color-border)] rounded-full h-1.5 mb-5">
        <div className="h-1.5 bg-[var(--color-brand-500)] rounded-full transition-all" style={{ width: `${(index / items.length) * 100}%` }} />
      </div>
      <MCQExercise
        question={question}
        options={options}
        correctValue={current.id}
        onAnswer={handleAnswer}
        explanation={`${current.thai} (${current.phonetic}) = ${current.meaning}`}
      />
    </div>
  );
}

// ── Result screen ─────────────────────────────────────────
function ResultScreen({ score, total, onRetry }: { score: number; total: number; onRetry: () => void }) {
  const pct = Math.round((score / total) * 100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👏' : '💪';
  return (
    <div className="flex flex-col items-center gap-5 py-8">
      <div className="text-6xl">{emoji}</div>
      <div className="text-center">
        <p className="text-3xl font-bold text-[var(--color-text-primary)]">{score}/{total}</p>
        <p className="text-lg text-[var(--color-text-secondary)] mt-1">{pct}% chính xác</p>
      </div>
      <div className={`text-sm font-medium px-4 py-2 rounded-full ${pct >= 80 ? 'bg-[var(--color-tip-light)] text-[var(--color-tip-green)]' : pct >= 60 ? 'bg-[var(--color-highlight-light)] text-[var(--color-highlight-yellow)]' : 'bg-[var(--color-warning-light)] text-[var(--color-warning-red)]'}`}>
        {pct >= 80 ? 'Xuất sắc! Bạn đã nắm vững rồi!' : pct >= 60 ? 'Khá tốt! Tiếp tục luyện tập nhé!' : 'Cần ôn thêm! Đừng nản, cố lên!'}
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-lg)] font-medium hover:bg-[var(--color-brand-600)] transition-colors"
      >
        <RotateCcw size={16} /> Luyện tập lại
      </button>
    </div>
  );
}

// ── Main PracticePage ─────────────────────────────────────
const EXERCISE_MODES = [
  { id: 'thai-to-meaning' as const, icon: '🇹🇭→🇻🇳', title: 'Thái → Việt', desc: 'Nhìn chữ Thái, chọn nghĩa' },
  { id: 'meaning-to-thai' as const, icon: '🇻🇳→🇹🇭', title: 'Việt → Thái', desc: 'Nhìn nghĩa, chọn chữ Thái' },
  { id: 'listen-choose' as const, icon: '🔊→🇻🇳', title: 'Nghe → Việt', desc: 'Nghe âm, chọn nghĩa đúng' },
];

export function PracticePage() {
  const [exerciseMode, setExerciseMode] = useState<ExerciseMode>('menu');
  const [selectedMode, setSelectedMode] = useState<'thai-to-meaning' | 'meaning-to-thai' | 'listen-choose'>('thai-to-meaning');
  const [sessionItems, setSessionItems] = useState<VocabularyItem[]>([]);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const startSession = (mode: typeof selectedMode) => {
    setSelectedMode(mode);
    setSessionItems(shuffle(vocabularyData).slice(0, 10));
    setResult(null);
    setExerciseMode(mode);
  };

  const handleDone = (score: number, total: number) => {
    setResult({ score, total });
    setExerciseMode('result');
  };

  const handleRetry = () => {
    setSessionItems(shuffle(vocabularyData).slice(0, 10));
    setResult(null);
    setExerciseMode(selectedMode);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Luyện Tập 🎯</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Chọn loại bài tập và bắt đầu!</p>
      </div>

      {exerciseMode === 'menu' && (
        <div className="flex flex-col gap-3">
          {EXERCISE_MODES.map((m) => (
            <button key={m.id} onClick={() => startSession(m.id)} className="text-left block w-full">
              <SectionCard className="hover:shadow-[var(--shadow-elevated)] hover:border-[var(--color-brand-500)] transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{m.icon}</span>
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">{m.title}</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{m.desc}</p>
                  </div>
                </div>
              </SectionCard>
            </button>
          ))}
          <div className="mt-4 p-4 bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] text-center">
            <Trophy size={24} className="text-[var(--color-highlight-yellow)] mx-auto mb-2" />
            <p className="text-sm text-[var(--color-text-secondary)]">Mỗi bài gồm 10 câu hỏi ngẫu nhiên từ bộ từ vựng</p>
          </div>
        </div>
      )}

      {(exerciseMode === 'thai-to-meaning' || exerciseMode === 'meaning-to-thai' || exerciseMode === 'listen-choose') && (
        <div>
          <button
            onClick={() => setExerciseMode('menu')}
            className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-5 hover:text-[var(--color-text-primary)] transition-colors"
          >
            ← Quay lại chọn bài
          </button>
          <ExerciseSession mode={exerciseMode} items={sessionItems} onDone={handleDone} />
        </div>
      )}

      {exerciseMode === 'result' && result && (
        <ResultScreen score={result.score} total={result.total} onRetry={handleRetry} />
      )}
    </div>
  );
}
