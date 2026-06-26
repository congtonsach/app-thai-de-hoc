import type { Lesson } from '@/domain/types/lesson';

export const lesson_1_1: Lesson = {
  id: 'lesson-1-1',
  moduleId: 'module-1',
  order: 1,
  title: 'Làm Quen Chữ Viết Tiếng Thái',
  subtitle: 'Khám phá hệ thống chữ viết độc đáo',
  estimatedMinutes: 10,
  objectives: [
    'Biết tiếng Thái sử dụng chữ viết riêng, không dùng Latin',
    'Nhận biết chữ viết tiếng Thái khác gì so với chữ Việt',
    'Hiểu cấu tạo cơ bản: phụ âm đầu + nguyên âm + phụ âm cuối',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Chữ Viết Tiếng Thái — Đẹp Và Độc Đáo',
    },
    {
      type: 'paragraph',
      content:
        'Tiếng Thái có hệ thống chữ viết riêng gọi là อักษรไทย (ak-sǒn thai), được phát triển từ thế kỷ 13. Chữ Thái không dùng chữ cái Latin như tiếng Việt đã được cải cách, mà dùng ký tự độc lập trông rất "tròn và cuộn".',
    },
    {
      type: 'example',
      thai: 'สวัสดี',
      phonetic: 'sa-wàt-dee',
      meaning: 'Xin chào',
    },
    {
      type: 'tip',
      title: 'Mẹo nhớ',
      content:
        'Chữ Thái không có dấu cách giữa các từ! Bạn cần đọc theo nhóm âm tiết. Đây là điều khó nhất lúc đầu, nhưng đọc nhiều sẽ quen.',
    },
    {
      type: 'comparison',
      title: 'So sánh hệ thống chữ viết',
      items: [
        { label: 'Tiếng Việt', thai: 'Xin chào', phonetic: 'sin chao', meaning: 'Dùng chữ Latin + dấu thanh' },
        { label: 'Tiếng Thái', thai: 'สวัสดี', phonetic: 'sa-wàt-dee', meaning: 'Dùng ký tự Thái riêng' },
        { label: 'Tiếng Nhật', thai: 'こんにちは', phonetic: 'kon-ni-chi-wa', meaning: 'Dùng Hiragana/Katakana' },
      ],
    },
    {
      type: 'paragraph',
      content:
        'Hệ thống chữ Thái gồm 3 thành phần chính: **Phụ âm đầu** (44 ký tự), **Nguyên âm** (32+ hình thức), và **Dấu thanh** (4 dấu). Ngoài ra còn có **Phụ âm cuối** đứng sau nguyên âm.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Cấu Tạo Một Âm Tiết Tiếng Thái',
    },
    {
      type: 'syllableBuilder',
      instruction: 'Một âm tiết tiếng Thái cơ bản gồm:',
      initial: 'ก',
      vowel: 'า',
      result: 'กา',
      phonetic: 'gaa',
      meaning: 'quạ (con quạ)',
    },
    {
      type: 'tip',
      content:
        'Nguyên âm tiếng Thái có thể đứng trước, sau, trên, dưới, hoặc bao quanh phụ âm. Điều này khác hoàn toàn với tiếng Việt — hãy làm quen dần!',
    },
    {
      type: 'quiz',
      question: 'Chữ viết tiếng Thái được gọi là gì?',
      options: ['อักษรโรมัน', 'อักษรไทย', 'อักษรจีน', 'อักษรเขมร'],
      correctIndex: 1,
      explanation: 'อักษรไทย (ak-sǒn thai) là tên gọi chữ viết tiếng Thái, nghĩa là "chữ cái Thái".',
    },
    {
      type: 'warning',
      title: 'Lỗi thường gặp',
      content:
        'Người Việt mới học hay nhầm chữ Thái với chữ Khmer (Campuchia) hoặc chữ Lào vì trông có vẻ giống nhau. Thực ra ba hệ thống này có nguồn gốc chung nhưng đã phát triển rất khác nhau.',
    },
    {
      type: 'summary',
      points: [
        'Tiếng Thái dùng chữ viết riêng — อักษรไทย (ak-sǒn thai)',
        'Không có dấu cách giữa các từ',
        'Một âm tiết = Phụ âm đầu + Nguyên âm (+ Phụ âm cuối)',
        'Nguyên âm có thể đứng ở bốn phía quanh phụ âm',
        'Có 44 phụ âm, 32+ nguyên âm và 4 dấu thanh',
      ],
    },
  ],
  tags: ['chữ-viết', 'nhập-môn'],
};
