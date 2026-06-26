import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { lessonById, getLessonNeighbors } from '@/data/lessons';
import { LessonContent } from '@/components/learning/LessonBlockRenderer';
import { ProgressBar, LoadingState, EmptyState, SectionCard } from '@/components/common';
import { ArrowLeft, ArrowRight, CheckCircle2, Target } from 'lucide-react';

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { progress, completeLesson, loadProgress } = useAppStore();
  const [completing, setCompleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => { loadProgress(); }, [loadProgress]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const lesson = lessonId ? lessonById.get(lessonId) : undefined;

  if (!lesson) {
    return (
      <EmptyState
        icon="📚"
        title="Không tìm thấy bài học"
        description="Bài học này không tồn tại hoặc đã bị xóa."
        action={<Link to="/roadmap" className="px-4 py-2 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm">Quay lại lộ trình</Link>}
      />
    );
  }

  const { prev, next } = getLessonNeighbors(lesson.id);
  const isCompleted = progress?.lessons[lesson.id]?.status === 'completed';

  const handleComplete = async () => {
    setCompleting(true);
    await completeLesson(lesson.id, 100);
    setCompleting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Sticky progress bar */}
      <div className="sticky top-0 z-10 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <ProgressBar value={scrollProgress} size="sm" />
        <div className="flex items-center gap-3 px-4 py-2.5">
          <button onClick={() => navigate('/roadmap')} className="p-1.5 rounded-full hover:bg-[var(--color-surface-alt)] transition-colors">
            <ArrowLeft size={18} className="text-[var(--color-text-secondary)]" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[var(--color-text-muted)] truncate">{lesson.title}</p>
          </div>
          {isCompleted && <CheckCircle2 size={18} className="text-[var(--color-tip-green)] shrink-0" />}
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Lesson header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{lesson.title}</h1>
          {lesson.subtitle && (
            <p className="text-[var(--color-text-secondary)] text-sm">{lesson.subtitle}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-muted)]">
            <span>⏱ ~{lesson.estimatedMinutes} phút</span>
            <span>·</span>
            <span>{lesson.blocks.length} phần</span>
          </div>
        </div>

        {/* Objectives */}
        {lesson.objectives.length > 0 && (
          <SectionCard className="mb-6 bg-[var(--color-brand-50)] border-[var(--color-brand-100)]">
            <div className="flex items-center gap-2 mb-2">
              <Target size={15} className="text-[var(--color-brand-600)]" />
              <p className="text-sm font-semibold text-[var(--color-brand-700)]">Mục tiêu bài học</p>
            </div>
            <ul className="flex flex-col gap-1.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2 text-sm text-[var(--color-brand-700)]">
                  <span className="text-[var(--color-brand-500)] font-bold shrink-0">→</span>
                  {obj}
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        {/* Lesson content */}
        <LessonContent blocks={lesson.blocks} />

        {/* Complete button */}
        <div className="mt-10 pt-6 border-t border-[var(--color-border)]">
          {isCompleted ? (
            <div className="flex items-center gap-2 justify-center p-4 bg-[var(--color-tip-light)] rounded-[var(--radius-lg)] text-[var(--color-tip-green)]">
              <CheckCircle2 size={20} />
              <span className="font-semibold">Bạn đã hoàn thành bài này!</span>
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="w-full py-3.5 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-brand-600)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {completing ? '⏳ Đang lưu...' : '✅ Đánh dấu hoàn thành'}
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {prev ? (
            <Link
              to={`/lesson/${prev.id}`}
              className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-brand-500)] transition-colors text-left"
            >
              <ArrowLeft size={16} className="text-[var(--color-text-muted)] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-muted)]">Bài trước</p>
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link
              to={`/lesson/${next.id}`}
              className="flex items-center justify-end gap-2 p-3 rounded-[var(--radius-md)] border border-[var(--color-border)] hover:border-[var(--color-brand-500)] transition-colors text-right"
            >
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-text-muted)]">Bài tiếp</p>
                <p className="text-xs font-medium text-[var(--color-text-primary)] truncate">{next.title}</p>
              </div>
              <ArrowRight size={16} className="text-[var(--color-text-muted)] shrink-0" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
