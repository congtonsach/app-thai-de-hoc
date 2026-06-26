import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { allLessons, allModules, lessonsByModule } from '@/data/lessons';
import { ProgressBar, SectionCard, LoadingState } from '@/components/common';
import { ArrowRight, BookOpen, Flame, Target, CheckCircle2 } from 'lucide-react';

export function HomePage() {
  const { progress, isLoading, loadProgress } = useAppStore();

  useEffect(() => { loadProgress(); }, [loadProgress]);

  if (isLoading || !progress) return <LoadingState message="Đang tải tiến độ của bạn..." />;

  const completedCount = Object.values(progress.lessons).filter((l) => l.status === 'completed').length;
  const totalLessons = allLessons.length;
  const completedPct = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  // Find the first lesson that is not completed
  const currentLesson = allLessons.find((l) => progress.lessons[l.id]?.status !== 'completed') ?? allLessons[0];
  const currentModule = allModules.find((m) => m.id === currentLesson?.moduleId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm text-[var(--color-text-muted)]">Chào mừng trở lại 👋</p>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">THÁI DỄ HỌC 🇹🇭</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Học tiếng Thái từng ngày, từng bước vững chắc</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <SectionCard className="text-center">
          <div className="text-2xl font-bold text-[var(--color-brand-600)]">{completedCount}</div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Bài hoàn thành</p>
        </SectionCard>
        <SectionCard className="text-center">
          <div className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-500">
            <Flame size={22} />
            {progress.streak}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Ngày liên tiếp</p>
        </SectionCard>
        <SectionCard className="text-center">
          <div className="text-2xl font-bold text-[var(--color-tip-green)]">{Math.round(completedPct)}%</div>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Hoàn thành</p>
        </SectionCard>
      </div>

      {/* Overall progress */}
      <SectionCard className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Tiến độ tổng thể</p>
          <span className="text-xs text-[var(--color-text-muted)]">{completedCount}/{totalLessons} bài</span>
        </div>
        <ProgressBar value={completedPct} color="var(--color-brand-500)" size="md" />
      </SectionCard>

      {/* Continue lesson */}
      {currentLesson && (
        <SectionCard className="mb-5">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
            Tiếp tục học
          </p>
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              {currentModule && (
                <p className="text-xs text-[var(--color-brand-600)] font-medium mb-0.5">
                  {currentModule.icon} {currentModule.title}
                </p>
              )}
              <h3 className="font-semibold text-[var(--color-text-primary)] truncate">{currentLesson.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                ⏱ ~{currentLesson.estimatedMinutes} phút
              </p>
            </div>
            <Link
              to={`/lesson/${currentLesson.id}`}
              className="ml-4 flex items-center gap-2 px-4 py-2.5 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm font-medium hover:bg-[var(--color-brand-600)] transition-colors shrink-0"
            >
              Học ngay
              <ArrowRight size={14} />
            </Link>
          </div>
        </SectionCard>
      )}

      {/* Daily goal */}
      <SectionCard className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-[var(--color-brand-500)]" />
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Mục tiêu hôm nay</p>
        </div>
        <ProgressBar
          value={Math.min(100, (progress.todayMinutes / (progress.dailyGoalMinutes || 15)) * 100)}
          label={`${progress.todayMinutes}/${progress.dailyGoalMinutes || 15} phút`}
          color="var(--color-tip-green)"
        />
      </SectionCard>

      {/* Modules overview */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-[var(--color-text-primary)]">Chương trình học</h2>
          <Link to="/roadmap" className="text-sm text-[var(--color-brand-600)] font-medium hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {allModules.map((module) => {
            const lessons = lessonsByModule.get(module.id) ?? [];
            const done = lessons.filter((l) => progress.lessons[l.id]?.status === 'completed').length;
            const pct = lessons.length > 0 ? (done / lessons.length) * 100 : 0;
            return (
              <Link key={module.id} to="/roadmap" className="block">
                <SectionCard className="hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: module.color }}
                    >
                      {module.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                          {module.title}
                        </p>
                        <span className="text-xs text-[var(--color-text-muted)] ml-2 shrink-0">
                          {done}/{lessons.length}
                        </span>
                      </div>
                      <ProgressBar value={pct} size="sm" />
                    </div>
                    {done === lessons.length && lessons.length > 0 && (
                      <CheckCircle2 size={18} className="text-[var(--color-tip-green)] shrink-0" />
                    )}
                  </div>
                </SectionCard>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick access */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link to="/vocabulary" className="block">
          <SectionCard className="text-center hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer py-4">
            <BookOpen size={24} className="text-[var(--color-brand-500)] mx-auto mb-2" />
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Từ vựng</p>
            <p className="text-xs text-[var(--color-text-muted)]">{allLessons.length > 0 ? '25 từ mẫu' : ''}</p>
          </SectionCard>
        </Link>
        <Link to="/practice" className="block">
          <SectionCard className="text-center hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer py-4">
            <span className="text-2xl block mb-2">🎯</span>
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Luyện tập</p>
            <p className="text-xs text-[var(--color-text-muted)]">Flashcard & Quiz</p>
          </SectionCard>
        </Link>
      </div>
    </div>
  );
}
