import type { UserProgress, LessonProgress, ExerciseResult, UserSettings } from '@/domain/types/lesson';
import { DEFAULT_SETTINGS } from '@/domain/types/lesson';
import type { ProgressRepository } from './progressRepository';

const STORAGE_KEY = 'thaidehoc_progress';

function createDefaultProgress(): UserProgress {
  return {
    userId: 'local-user',
    lessons: {},
    exerciseResults: [],
    streak: 0,
    lastStudiedAt: undefined,
    dailyGoalMinutes: 15,
    todayMinutes: 0,
    settings: { ...DEFAULT_SETTINGS },
  };
}

function load(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgress();
    return { ...createDefaultProgress(), ...JSON.parse(raw) };
  } catch {
    return createDefaultProgress();
  }
}

function save(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('[Progress] Failed to save:', e);
  }
}

// Singleton instance
export class LocalStorageProgressRepository implements ProgressRepository {
  async getProgress(): Promise<UserProgress> {
    return load();
  }

  async completeLesson(lessonId: string, score?: number): Promise<void> {
    const progress = load();
    progress.lessons[lessonId] = {
      lessonId,
      status: 'completed',
      completedAt: new Date().toISOString(),
      score: score ?? 100,
      attempts: (progress.lessons[lessonId]?.attempts ?? 0) + 1,
    };
    progress.lastStudiedAt = new Date().toISOString();
    save(progress);
  }

  async updateLessonStatus(lessonId: string, status: LessonProgress['status']): Promise<void> {
    const progress = load();
    progress.lessons[lessonId] = {
      ...progress.lessons[lessonId],
      lessonId,
      status,
      attempts: progress.lessons[lessonId]?.attempts ?? 0,
    };
    save(progress);
  }

  async saveExerciseResult(result: ExerciseResult): Promise<void> {
    const progress = load();
    progress.exerciseResults = [...(progress.exerciseResults ?? []).slice(-500), result];
    save(progress);
  }

  async updateSettings(settings: Partial<UserSettings>): Promise<void> {
    const progress = load();
    progress.settings = { ...progress.settings, ...settings };
    save(progress);
  }

  async resetProgress(): Promise<void> {
    save(createDefaultProgress());
  }
}

export const progressRepo: ProgressRepository = new LocalStorageProgressRepository();
