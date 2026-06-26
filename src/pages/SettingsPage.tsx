import React, { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';
import { SectionCard, LoadingState } from '@/components/common';
import { Moon, Sun, Volume2, Eye, EyeOff, Target, RotateCcw, AlertTriangle } from 'lucide-react';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

function Toggle({ checked, onChange, label, description, icon }: ToggleProps) {
  return (
    <div className="flex items-center gap-3 py-3">
      {icon && <div className="text-[var(--color-text-muted)] shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{label}</p>
        {description && <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{description}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--color-border)]'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : ''}`}
        />
      </button>
    </div>
  );
}

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  label: string;
  displayValue: string;
  icon?: React.ReactNode;
}

function Slider({ value, min, max, step, onChange, label, displayValue, icon }: SliderProps) {
  return (
    <div className="py-3">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-[var(--color-text-muted)] shrink-0">{icon}</div>}
        <p className="text-sm font-medium text-[var(--color-text-primary)] flex-1">{label}</p>
        <span className="text-sm text-[var(--color-brand-600)] font-semibold">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-[var(--color-brand-500)] h-1.5 rounded-full"
      />
    </div>
  );
}

export function SettingsPage() {
  const { progress, isLoading, loadProgress, updateSettings, resetProgress } = useAppStore();

  useEffect(() => { loadProgress(); }, [loadProgress]);

  if (isLoading || !progress) return <LoadingState />;

  const settings = progress.settings;
  const update = (partial: Parameters<typeof updateSettings>[0]) => updateSettings(partial);

  const handleReset = () => {
    if (window.confirm('Bạn chắc chắn muốn xóa toàn bộ tiến độ? Hành động này không thể hoàn tác!')) {
      resetProgress();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Cài Đặt ⚙️</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Tùy chỉnh trải nghiệm học của bạn</p>
      </div>

      {/* Display */}
      <SectionCard className="mb-4">
        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Hiển thị</p>
        <div className="divide-y divide-[var(--color-border)]">
          <Toggle
            checked={settings.darkMode}
            onChange={(v) => update({ darkMode: v })}
            label="Chế độ tối"
            description="Bảo vệ mắt khi học ban đêm"
            icon={settings.darkMode ? <Moon size={16} /> : <Sun size={16} />}
          />
          <Toggle
            checked={settings.showPhonetic}
            onChange={(v) => update({ showPhonetic: v })}
            label="Hiện phiên âm"
            description="Hiện phiên âm tiếng Việt dưới chữ Thái"
            icon={<Eye size={16} />}
          />
          <Toggle
            checked={settings.showMeaning}
            onChange={(v) => update({ showMeaning: v })}
            label="Hiện nghĩa tiếng Việt"
            description="Hiện nghĩa ngay bên cạnh từ Thái"
            icon={settings.showMeaning ? <Eye size={16} /> : <EyeOff size={16} />}
          />
        </div>
      </SectionCard>

      {/* Audio */}
      <SectionCard className="mb-4">
        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Âm thanh</p>
        <div className="divide-y divide-[var(--color-border)]">
          <Slider
            value={settings.speechRate}
            min={0.5}
            max={1.5}
            step={0.1}
            onChange={(v) => update({ speechRate: v })}
            label="Tốc độ đọc"
            displayValue={settings.speechRate === 0.8 ? 'Chậm' : settings.speechRate <= 1.0 ? 'Bình thường' : 'Nhanh'}
            icon={<Volume2 size={16} />}
          />
          <Slider
            value={settings.volume}
            min={0}
            max={1}
            step={0.1}
            onChange={(v) => update({ volume: v })}
            label="Âm lượng"
            displayValue={`${Math.round(settings.volume * 100)}%`}
            icon={<Volume2 size={16} />}
          />
        </div>
      </SectionCard>

      {/* Goals */}
      <SectionCard className="mb-4">
        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">Mục tiêu học</p>
        <div className="py-3">
          <div className="flex items-center gap-3 mb-3">
            <Target size={16} className="text-[var(--color-text-muted)]" />
            <p className="text-sm font-medium text-[var(--color-text-primary)] flex-1">Thời gian học mỗi ngày</p>
            <span className="text-sm text-[var(--color-brand-600)] font-semibold">{settings.dailyGoalMinutes} phút</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[5, 10, 15, 20, 30].map((mins) => (
              <button
                key={mins}
                onClick={() => update({ dailyGoalMinutes: mins })}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors
                  ${settings.dailyGoalMinutes === mins
                    ? 'bg-[var(--color-brand-500)] text-white border-transparent'
                    : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-brand-500)]'}`}
              >
                {mins} phút
              </button>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* About */}
      <SectionCard className="mb-4">
        <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wide mb-3">Về ứng dụng</p>
        <div className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
          <div className="flex justify-between">
            <span>Phiên bản</span>
            <span className="font-medium text-[var(--color-text-primary)]">1.0 MVP</span>
          </div>
          <div className="flex justify-between">
            <span>Số bài học</span>
            <span className="font-medium text-[var(--color-text-primary)]">6 bài</span>
          </div>
          <div className="flex justify-between">
            <span>Từ vựng</span>
            <span className="font-medium text-[var(--color-text-primary)]">25 từ</span>
          </div>
          <div className="flex justify-between">
            <span>Lưu trữ</span>
            <span className="font-medium text-[var(--color-text-primary)]">LocalStorage</span>
          </div>
        </div>
      </SectionCard>

      {/* Danger zone */}
      <SectionCard className="border-red-200 bg-[var(--color-warning-light)]">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle size={16} className="text-[var(--color-warning-red)]" />
          <p className="text-sm font-bold text-[var(--color-warning-red)]">Vùng nguy hiểm</p>
        </div>
        <p className="text-xs text-red-700 mb-3">Đặt lại tiến độ sẽ xóa toàn bộ bài đã học, kết quả bài tập và cài đặt.</p>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-warning-red)] text-white rounded-[var(--radius-md)] text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <RotateCcw size={14} /> Đặt lại tất cả
        </button>
      </SectionCard>
    </div>
  );
}
