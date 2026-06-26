import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { allLessons, allModules, lessonsByModule } from '@/data/lessons';
import { ProgressBar, SectionCard, LoadingState, Badge } from '@/components/common';
import { CheckCircle2, BookOpen, Target, Clock } from 'lucide-react';

export function ProgressPage() {
  const { progress, isLoading, loadProgress } = useAppStore();

  useEffect(() => { loadProgress(); }, [loadProgress]);

  if (isLoading || !progress) return <LoadingState />;

  const completedLessons = allLessons.filter((l) => progress.lessons[l.id]?.status === 'completed');
  const totalLessons = allLessons.length;
  const completedPct = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  const exerciseResults = progress.exerciseResults ?? [];
  const totalAnswered = exerciseResults.length;
  const totalCorrect = exerciseResults.filter((r) => r.correct).length;
  const accuracyPct = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Tiến Độ 📊</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Theo dõi hành trình học tiếng Thái của bạn</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <SectionCard className="text-center">
          <BookOpen size={20} className="text-[var(--color-brand-500)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{completedLessons.length}<span className="text-sm text-[var(--color-text-muted)] font-normal">/{totalLessons}</span></p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Bài đã học</p>
        </SectionCard>
        <SectionCard className="text-center">
          <Target size={20} className="text-[var(--color-tip-green)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{accuracyPct}<span className="text-sm text-[var(--color-text-muted)] font-normal">%</span></p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Tỷ lệ đúng</p>
        </SectionCard>
        <SectionCard className="text-center">
          <span className="text-xl block mb-2">🔥</span>
          <p className="text-2xl font-bold text-orange-500">{progress.streak}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Ngày liên tiếp</p>
        </SectionCard>
        <SectionCard className="text-center">
          <Clock size={20} className="text-[var(--color-phonetic-purple)] mx-auto mb-2" />
          <p className="text-2xl font-bold text-[var(--color-text-primary)]">{totalAnswered}</p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">Bài tập đã làm</p>
        </SectionCard>
      </div>

      {/* Overall */}
      <SectionCard className="mb-5">
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Tổng tiến độ</p>
        <ProgressBar value={completedPct} label={`${completedLessons.length}/${totalLessons} bài hoàn thành`} size="md" />
      </SectionCard>

      {/* By module */}
      <div className="mb-5">
        <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">Theo Module</h2>
        <div className="flex flex-col gap-3">
          {allModules.map((module) => {
            const lessons = lessonsByModule.get(module.id) ?? [];
            const done = lessons.filter((l) => progress.lessons[l.id]?.status === 'completed').length;
            const pct = lessons.length > 0 ? (done / lessons.length) * 100 : 0;
            return (
              <SectionCard key={module.id}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{module.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">{module.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{done}/{lessons.length} bài</p>
                  </div>
                  {done === lessons.length && lessons.length > 0 && (
                    <CheckCircle2 size={18} className="text-[var(--color-tip-green)]" />
                  )}
                </div>
                <ProgressBar value={pct} size="sm" />
              </SectionCard>
            );
          })}
        </div>
      </div>

      {/* Completed lessons list */}
      {completedLessons.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-[var(--color-text-primary)] mb-3">Bài Đã Hoàn Thành</h2>
          <div className="flex flex-col gap-2">
            {completedLessons.map((lesson) => {
              const lp = progress.lessons[lesson.id];
              return (
                <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
                  <SectionCard className="hover:shadow-[var(--shadow-elevated)] transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-[var(--color-tip-green)] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{lesson.title}</p>
                        {lp?.completedAt && (
                          <p className="text-xs text-[var(--color-text-muted)]">
                            {new Date(lp.completedAt).toLocaleDateString('vi-VN')}
                          </p>
                        )}
                      </div>
                      <Badge variant="success">Xong</Badge>
                    </div>
                  </SectionCard>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {completedLessons.length === 0 && (
        <div className="text-center py-10">
          <p className="text-4xl mb-3">🌱</p>
          <p className="text-[var(--color-text-secondary)] text-sm">Bạn chưa hoàn thành bài học nào.</p>
          <Link to="/roadmap" className="mt-3 inline-block px-4 py-2 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm font-medium">
            Bắt đầu học ngay
          </Link>
        </div>
      )}
    </div>
  );
}
