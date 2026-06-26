import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoadingState } from '@/components/common';

// Lazy load all pages for better initial load time
const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })));
const RoadmapPage = lazy(() => import('@/pages/RoadmapPage').then((m) => ({ default: m.RoadmapPage })));
const LessonPage = lazy(() => import('@/pages/LessonPage').then((m) => ({ default: m.LessonPage })));
const VocabularyPage = lazy(() => import('@/pages/VocabularyPage').then((m) => ({ default: m.VocabularyPage })));
const PracticePage = lazy(() => import('@/pages/PracticePage').then((m) => ({ default: m.PracticePage })));
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Trang không tồn tại</h1>
      <p className="text-[var(--color-text-secondary)] mb-6">Đường dẫn này không hợp lệ.</p>
      <a href="/" className="px-4 py-2 bg-[var(--color-brand-500)] text-white rounded-[var(--radius-md)] text-sm">
        Về trang chủ
      </a>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingState message="Đang tải trang..." />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/vocabulary" element={<VocabularyPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
