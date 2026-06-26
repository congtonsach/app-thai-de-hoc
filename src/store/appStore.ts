import { create } from 'zustand';
import type { UserProgress, UserSettings } from '@/domain/types/lesson';
import { progressRepo } from '@/services/localStorageProgress';
import { DEFAULT_SETTINGS } from '@/domain/types/lesson';

interface AppState {
  progress: UserProgress | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProgress: () => Promise<void>;
  completeLesson: (lessonId: string, score?: number) => Promise<void>;
  updateSettings: (settings: Partial<UserSettings>) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const fallbackProgress: UserProgress = {
  userId: 'local-user',
  lessons: {},
  exerciseResults: [],
  streak: 0,
  dailyGoalMinutes: 15,
  todayMinutes: 0,
  settings: { ...DEFAULT_SETTINGS },
};

export const useAppStore = create<AppState>((set, get) => ({
  progress: null,
  isLoading: false,
  error: null,

  loadProgress: async () => {
    set({ isLoading: true, error: null });
    try {
      const progress = await progressRepo.getProgress();
      set({ progress, isLoading: false });
    } catch (e) {
      set({ progress: fallbackProgress, isLoading: false, error: 'Không thể tải tiến độ' });
    }
  },

  completeLesson: async (lessonId, score) => {
    await progressRepo.completeLesson(lessonId, score);
    await get().loadProgress();
  },

  updateSettings: async (settings) => {
    await progressRepo.updateSettings(settings);
    const prev = get().progress;
    if (prev) {
      set({ progress: { ...prev, settings: { ...prev.settings, ...settings } } });
    }
    // Apply dark mode
    if (settings.darkMode !== undefined) {
      document.documentElement.classList.toggle('dark', settings.darkMode);
    }
  },

  resetProgress: async () => {
    await progressRepo.resetProgress();
    await get().loadProgress();
  },
}));
