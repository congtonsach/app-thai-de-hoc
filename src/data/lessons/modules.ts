import type { Module } from '@/domain/types/lesson';

export const modules: Module[] = [
  {
    id: 'module-1',
    order: 1,
    title: 'Nhập Môn Tiếng Thái',
    subtitle: 'Làm quen với chữ viết và âm thanh',
    description: 'Khám phá hệ thống chữ viết tiếng Thái, nguồn gốc và cách đọc cơ bản.',
    icon: '🇹🇭',
    color: '#dbeafe',
    lessonIds: ['lesson-1-1', 'lesson-1-2'],
  },
  {
    id: 'module-2',
    order: 2,
    title: 'Phụ Âm Tiếng Thái',
    subtitle: 'Ba nhóm phụ âm và cách phân loại',
    description: 'Học 44 phụ âm tiếng Thái, phân thành ba nhóm: Trung, Cao, Thấp.',
    icon: '🔤',
    color: '#ede9fe',
    lessonIds: ['lesson-2-1', 'lesson-2-2'],
  },
  {
    id: 'module-3',
    order: 3,
    title: 'Nguyên Âm & Ghép Vần',
    subtitle: 'Nguyên âm cơ bản và cấu tạo âm tiết',
    description: 'Học các nguyên âm tiếng Thái và cách ghép với phụ âm tạo thành âm tiết.',
    icon: '🔊',
    color: '#dcfce7',
    lessonIds: ['lesson-3-1', 'lesson-3-2'],
  },
];
