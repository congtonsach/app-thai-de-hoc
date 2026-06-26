import type { Lesson } from '@/domain/types/lesson';

export const lesson_1_2: Lesson = {
  id: 'lesson-1-2',
  moduleId: 'module-1',
  order: 2,
  title: 'Chào Hỏi Cơ Bản',
  subtitle: 'Những câu giao tiếp đầu tiên',
  estimatedMinutes: 12,
  objectives: [
    'Nói được lời chào cơ bản bằng tiếng Thái',
    'Hiểu cách thêm kính ngữ ครับ/ค่ะ',
    'Giới thiệu bản thân đơn giản',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Chào Hỏi Tiếng Thái — Bắt Đầu Từ สวัสดี',
    },
    {
      type: 'paragraph',
      content:
        'Người Thái rất coi trọng phép lịch sự. Câu chào quan trọng nhất là สวัสดี (sa-wàt-dee), dùng được cho mọi thời điểm trong ngày: sáng, trưa, chiều, tối đều đúng!',
    },
    {
      type: 'vocabulary',
      items: [
        {
          id: 'v-sawatdee',
          thai: 'สวัสดี',
          phonetic: 'sa-wàt-dee',
          meaning: 'Xin chào / Tạm biệt',
          partOfSpeech: 'verb',
          category: 'chào-hỏi',
          level: 'beginner',
        },
        {
          id: 'v-khrap',
          thai: 'ครับ',
          phonetic: 'khráp',
          meaning: 'Kính ngữ dùng cho nam giới',
          partOfSpeech: 'particle',
          category: 'lịch-sự',
          level: 'beginner',
        },
        {
          id: 'v-kha',
          thai: 'ค่ะ / คะ',
          phonetic: 'khâ / khá',
          meaning: 'Kính ngữ dùng cho nữ giới',
          partOfSpeech: 'particle',
          category: 'lịch-sự',
          level: 'beginner',
        },
        {
          id: 'v-khun',
          thai: 'คุณ',
          phonetic: 'khun',
          meaning: 'Bạn / Anh / Chị (đại từ lịch sự)',
          partOfSpeech: 'pronoun',
          category: 'đại-từ',
          level: 'beginner',
        },
        {
          id: 'v-cheu',
          thai: 'ชื่อ',
          phonetic: 'chêu',
          meaning: 'Tên',
          partOfSpeech: 'noun',
          category: 'giới-thiệu',
          level: 'beginner',
        },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Kính Ngữ — Nét Đặc Trưng Văn Hóa Thái',
    },
    {
      type: 'paragraph',
      content:
        'Người Thái luôn thêm kính ngữ vào cuối câu. Nam nói **ครับ** (khráp), nữ nói **ค่ะ** (khâ) hoặc **คะ** (khá). Thiếu kính ngữ không phải lỗi ngữ pháp, nhưng bị xem là thiếu lịch sự.',
    },
    {
      type: 'comparison',
      title: 'Cách dùng kính ngữ',
      items: [
        { label: 'Nam nói', thai: 'สวัสดีครับ', phonetic: 'sa-wàt-dee khráp', meaning: 'Xin chào (nam)' },
        { label: 'Nữ nói', thai: 'สวัสดีค่ะ', phonetic: 'sa-wàt-dee khâ', meaning: 'Xin chào (nữ)' },
        { label: 'Câu hỏi - Nam', thai: 'ชื่ออะไรครับ', phonetic: 'chêu a-rai khráp', meaning: 'Tên bạn là gì? (nam)' },
        { label: 'Câu hỏi - Nữ', thai: 'ชื่ออะไรคะ', phonetic: 'chêu a-rai khá', meaning: 'Tên bạn là gì? (nữ)' },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Hội Thoại Mẫu',
    },
    {
      type: 'dialogue',
      lines: [
        { speaker: 'A', thai: 'สวัสดีครับ', phonetic: 'sa-wàt-dee khráp', meaning: 'Xin chào!' },
        { speaker: 'B', thai: 'สวัสดีค่ะ', phonetic: 'sa-wàt-dee khâ', meaning: 'Xin chào!' },
        { speaker: 'A', thai: 'คุณชื่ออะไรครับ', phonetic: 'khun chêu a-rai khráp', meaning: 'Bạn tên là gì?' },
        { speaker: 'B', thai: 'ผมชื่อสมชายครับ', phonetic: 'phǒm chêu sǒm-chaai khráp', meaning: 'Tôi tên là Somchai.' },
        { speaker: 'A', thai: 'ยินดีที่รู้จักครับ', phonetic: 'yin-dee thêe róo-jàk khráp', meaning: 'Rất vui được gặp bạn!' },
      ],
    },
    {
      type: 'tip',
      title: 'Văn hóa Thái',
      content:
        'Khi chào người Thái, họ thường vái tay (ประนมมือ — pra-nom-meu), đặt hai tay vào nhau như đang cầu nguyện. Đây là cử chỉ kính trọng, bạn không bắt buộc phải làm nhưng làm được thì người Thái rất vui!',
    },
    {
      type: 'flashcard',
      cards: [
        { front: 'สวัสดี', back: 'Xin chào', phonetic: 'sa-wàt-dee' },
        { front: 'ครับ', back: 'Kính ngữ nam', phonetic: 'khráp' },
        { front: 'ค่ะ', back: 'Kính ngữ nữ (câu thường)', phonetic: 'khâ' },
        { front: 'คุณ', back: 'Bạn / Anh / Chị', phonetic: 'khun' },
        { front: 'ชื่อ', back: 'Tên', phonetic: 'chêu' },
        { front: 'ยินดีที่รู้จัก', back: 'Rất vui được gặp', phonetic: 'yin-dee thêe róo-jàk' },
      ],
    },
    {
      type: 'quiz',
      question: 'Người phụ nữ Thái nên dùng kính ngữ nào khi hỏi?',
      options: ['ครับ (khráp)', 'คะ (khá)', 'นะ (ná)', 'จ้า (jâa)'],
      correctIndex: 1,
      explanation: 'Nữ giới dùng คะ (khá) cho câu hỏi và ค่ะ (khâ) cho câu thường. Nam giới dùng ครับ (khráp) cho cả hai.',
    },
    {
      type: 'warning',
      title: 'Lỗi thường gặp',
      content:
        'Người Việt hay nhầm: ครับ (khráp) nghe giống "cơm" trong tiếng Việt! Hãy nhớ: ครับ = kính ngữ nam, không phải từ "cơm". Phát âm là "khráp" với âm "kh" ở đầu.',
    },
    {
      type: 'summary',
      points: [
        'สวัสดี (sa-wàt-dee) = Xin chào, dùng mọi lúc trong ngày',
        'ครับ (khráp) = kính ngữ cho nam, ค่ะ/คะ (khâ/khá) cho nữ',
        'คุณ (khun) = đại từ lịch sự chỉ người thứ hai',
        'Luôn thêm kính ngữ vào cuối câu để lịch sự',
        'Vái tay (ประนมมือ) là cử chỉ kính trọng trong văn hóa Thái',
      ],
    },
  ],
  tags: ['chào-hỏi', 'giao-tiếp', 'kính-ngữ'],
};
