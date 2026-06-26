import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { allModules, lessonsByModule } from '@/data/lessons';
import { SectionCard, ProgressBar, LoadingState, Badge } from '@/components/common';
import { Clock, ChevronRight, CheckCircle2, Lock, PlayCircle } from 'lucide-react';
import type { LessonStatus } from '@/domain/types/lesson';

function lessonStatusBadge(status: LessonStatus) {
  switch (status) {
    case 'completed': return <Badge variant="success">✓ Hoàn thành</Badge>;
    case 'in-progress': return <Badge variant="info">Đang học</Badge>;
    case 'locked': return <Badge variant="default">🔒 Chưa mở</Badge>;
    default: return <Badge variant="default">Chưa học</Badge>;
  }
}

export function RoadmapPage() {
  const { progress, isLoading, loadProgress } = useAppStore();

  useEffect(() => { loadProgress(); }, [loadProgress]);

  if (isLoading || !progress) return <LoadingState />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Lộ Trình Học 🗺️</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Học từng bước theo thứ tự để nắm vững tiếng Thái
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {allModules.map((module, mIdx) => {
          const lessons = lessonsByModule.get(module.id) ?? [];
          const done = lessons.filter((l) => progress.lessons[l.id]?.status === 'completed').length;
          const pct = lessons.length > 0 ? (done / lessons.length) * 100 : 0;

          return (
            <div key={module.id}>
              {/* Module header */}
              <div
                className="rounded-[var(--radius-lg)] p-4 mb-4 border border-[var(--color-border)]"
                style={{ backgroundColor: module.color }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{module.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                        Module {mIdx + 1}
                      </span>
                      {done === lessons.length && lessons.length > 0 && (
                        <CheckCircle2 size={14} className="text-[var(--color-tip-green)]" />
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-[var(--color-text-primary)] mt-0.5">{module.title}</h2>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{module.description}</p>
                    <ProgressBar value={pct} className="mt-3" label={`${done}/${lessons.length} bài`} size="sm" />
                  </div>
                </div>
              </div>

              {/* Lessons */}
              <div className="flex flex-col gap-2 ml-2">
                {lessons.map((lesson, lIdx) => {
                  const lp = progress.lessons[lesson.id];
                  const status: LessonStatus = lp?.status ?? 'available';
                  const isCompleted = status === 'completed';

                  return (
                    <Link
                      key={lesson.id}
                      to={`/lesson/${lesson.id}`}
                      className="block group"
                    >
                      <SectionCard className="hover:shadow-[var(--shadow-elevated)] transition-all group-hover:border-[var(--color-brand-500)] cursor-pointer">
                        <div className="flex items-center gap-3">
                          {/* Step number */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
                              ${isCompleted
                                ? 'bg-[var(--color-tip-green)] text-white'
                                : 'bg-[var(--color-border)] text-[var(--color-text-muted)] group-hover:bg-[var(--color-brand-500)] group-hover:text-white'
                              }`}
                          >
                            {isCompleted ? <CheckCircle2 size={16} /> : lIdx + 1}
                          </div>
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                              {lesson.title}
                            </p>
                            {lesson.subtitle && (
                              <p className="text-xs text-[var(--color-text-muted)] truncate">{lesson.subtitle}</p>
                            )}
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                                <Clock size={11} /> {lesson.estimatedMinutes} phút
                              </span>
                              {lessonStatusBadge(status)}
                            </div>
                          </div>
                          {/* Action icon */}
                          <div className="shrink-0">
                            {isCompleted
                              ? <PlayCircle size={20} className="text-[var(--color-tip-green)]" />
                              : <ChevronRight size={20} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-brand-500)] transition-colors" />
                            }
                          </div>
                        </div>
                        {/* Objectives preview */}
                        {!isCompleted && lesson.objectives.length > 0 && (
                          <div className="mt-3 pl-11">
                            <p className="text-xs text-[var(--color-text-muted)] font-medium mb-1">Bạn sẽ học:</p>
                            <ul className="flex flex-col gap-0.5">
                              {lesson.objectives.slice(0, 2).map((obj, i) => (
                                <li key={i} className="text-xs text-[var(--color-text-secondary)] flex gap-1.5">
                                  <span className="text-[var(--color-brand-500)] shrink-0">•</span>
                                  {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </SectionCard>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
