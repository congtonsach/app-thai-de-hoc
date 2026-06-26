import type { UserProgress, LessonProgress, ExerciseResult, UserSettings } from '@/domain/types/lesson';

// ============================================================
// PROGRESS REPOSITORY INTERFACE
// Implement LocalStorageProgressRepository for MVP.
// Swap to SupabaseProgressRepository without changing UI/hooks.
// ============================================================

export interface ProgressRepository {
  getProgress(): Promise<UserProgress>;
  completeLesson(lessonId: string, score?: number): Promise<void>;
  updateLessonStatus(lessonId: string, status: LessonProgress['status']): Promise<void>;
  saveExerciseResult(result: ExerciseResult): Promise<void>;
  updateSettings(settings: Partial<UserSettings>): Promise<void>;
  resetProgress(): Promise<void>;
}
