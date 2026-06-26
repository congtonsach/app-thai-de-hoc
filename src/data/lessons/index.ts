import type { Lesson, Module } from '@/domain/types/lesson';
import { modules } from './modules';
import { lesson_1_1 } from './lesson-1-1';
import { lesson_1_2 } from './lesson-1-2';
import { lesson_2_1 } from './lesson-2-1';
import { lesson_2_2, lesson_3_1, lesson_3_2 } from './lessons-2-2-3-1-3-2';

// ============================================================
// LESSON REGISTRY
// To add a new lesson:
// 1. Create /src/data/lessons/lesson-X-Y.ts
// 2. Import and add to allLessons array below
// 3. Add lesson id to module.lessonIds in modules.ts
// That's it — no other files need changing.
// ============================================================

export const allLessons: Lesson[] = [
  lesson_1_1,
  lesson_1_2,
  lesson_2_1,
  lesson_2_2,
  lesson_3_1,
  lesson_3_2,
];

export const allModules: Module[] = modules;

// Lookup maps for O(1) access
export const lessonById = new Map<string, Lesson>(
  allLessons.map((l) => [l.id, l])
);

export const moduleById = new Map<string, Module>(
  allModules.map((m) => [m.id, m])
);

export const lessonsByModule = new Map<string, Lesson[]>(
  allModules.map((m) => [
    m.id,
    m.lessonIds.map((id) => lessonById.get(id)).filter(Boolean) as Lesson[],
  ])
);

export function getLessonNeighbors(lessonId: string): { prev?: Lesson; next?: Lesson } {
  const index = allLessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return {};
  return {
    prev: index > 0 ? allLessons[index - 1] : undefined,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  };
}
