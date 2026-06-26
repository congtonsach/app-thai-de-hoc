import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { AppRoutes } from '@/routes';
import { useAppStore } from '@/store/appStore';

function AppInitializer() {
  const { loadProgress, progress } = useAppStore();

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  // Apply dark mode on boot
  useEffect(() => {
    if (progress?.settings.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress?.settings.darkMode]);

  return (
    <AppShell>
      <AppRoutes />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInitializer />
    </BrowserRouter>
  );
}
