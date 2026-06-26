# Hướng dẫn thêm nội dung mới vào THÁI DỄ HỌC

## 1. Thêm bài học mới

### Tạo file bài học (src/data/lessons/lesson-X-Y.ts)

```typescript
import type { Lesson } from '@/domain/types/lesson';

export const lesson_X_Y: Lesson = {
  id: 'lesson-X-Y',         // Unique ID, dùng để lưu tiến độ
  moduleId: 'module-X',     // ID module cha
  order: Y,                 // Thứ tự trong module
  title: 'Tên bài học',
  subtitle: 'Mô tả ngắn',
  estimatedMinutes: 15,
  objectives: ['Mục tiêu 1', 'Mục tiêu 2'],
  blocks: [
    // Thêm các block ở đây
  ],
  tags: ['tag1', 'tag2'],   // Tùy chọn
};
```

### Đăng ký trong registry (src/data/lessons/index.ts)

```typescript
import { lesson_X_Y } from './lesson-X-Y';

export const allLessons: Lesson[] = [
  lesson_1_1, lesson_1_2, // ...existing
  lesson_X_Y,             // Thêm vào cuối hoặc đúng vị trí
];
```

### Gắn vào module (src/data/lessons/modules.ts)

```typescript
{
  id: 'module-X',
  lessonIds: ['lesson-X-1', 'lesson-X-2', 'lesson-X-Y'], // Thêm ID mới
}
```

---

## 2. Thêm module mới

Trong `src/data/lessons/modules.ts`:

```typescript
{
  id: 'module-4',
  order: 4,
  title: 'Thanh Điệu',
  subtitle: 'Năm thanh điệu của tiếng Thái',
  description: 'Học quy tắc thanh điệu và luyện phân biệt 5 thanh.',
  icon: '🎵',
  color: '#fce7f3',       // Màu nền nhạt
  lessonIds: [],          // Thêm ID bài học sau
}
```

---

## 3. Thêm từ vựng mới

Trong `src/data/vocabulary/index.ts`:

```typescript
{
  id: 'my-word',          // Unique ID
  thai: 'คำใหม่',
  phonetic: 'kham-mài',
  meaning: 'từ mới',
  partOfSpeech: 'noun',   // noun | verb | adjective | adverb | particle | pronoun | conjunction
  category: 'chủ-đề',
  level: 'beginner',      // beginner | intermediate | advanced
  example: {
    thai: 'นี่คือคำใหม่',
    phonetic: 'nêe keu kham-mài',
    meaning: 'Đây là từ mới',
  },
}
```

---

## 4. Thêm loại block mới

### Bước 1: Khai báo type (src/domain/types/lesson.ts)

```typescript
export interface MySpecialBlock {
  type: 'mySpecial';
  title: string;
  data: string[];
}

// Thêm vào union LessonBlock:
export type LessonBlock =
  | HeadingBlock
  | ParagraphBlock
  // ...existing...
  | MySpecialBlock; // ← thêm ở đây
```

### Bước 2: Tạo component (src/components/learning/LessonBlocks.tsx)

```typescript
export function MySpecialBlockComp({ block }: { block: MySpecialBlock }) {
  return (
    <div className="...">
      <h3>{block.title}</h3>
      {block.data.map((item, i) => <p key={i}>{item}</p>)}
    </div>
  );
}
```

### Bước 3: Đăng ký (src/components/learning/LessonBlockRenderer.tsx)

```typescript
import { MySpecialBlockComp } from './LessonBlocks';

const blockRenderers = {
  // ...existing
  mySpecial: MySpecialBlockComp,
};
```

**Chỉ 3 bước, không ảnh hưởng bài học cũ.**

---

## 5. Migrate sang Supabase

Tạo `src/services/supabaseProgress.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import type { ProgressRepository } from './progressRepository';

export class SupabaseProgressRepository implements ProgressRepository {
  async getProgress() { /* query Supabase */ }
  async completeLesson(lessonId, score) { /* upsert */ }
  // ...implement all methods
}
```

Trong `src/services/localStorageProgress.ts`, thay dòng cuối:

```typescript
// Before:
export const progressRepo: ProgressRepository = new LocalStorageProgressRepository();

// After:
export const progressRepo: ProgressRepository = new SupabaseProgressRepository();
```

**Tất cả UI, hooks và store không cần thay đổi.**
