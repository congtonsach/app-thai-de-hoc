import type { Lesson } from '@/domain/types/lesson';

export const lesson_2_2: Lesson = {
  id: 'lesson-2-2',
  moduleId: 'module-2',
  order: 2,
  title: 'Phụ Âm Nhóm Trung Chi Tiết',
  subtitle: 'Học thuộc 9 phụ âm nhóm Trung với ví dụ',
  estimatedMinutes: 20,
  objectives: [
    'Nhận mặt và đọc được cả 9 phụ âm nhóm Trung',
    'Biết tên gọi truyền thống của mỗi phụ âm',
    'Luyện viết và nhận dạng qua flashcard',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Chi Tiết 9 Phụ Âm Nhóm Trung',
    },
    {
      type: 'paragraph',
      content:
        'Mỗi phụ âm Thái có tên riêng gắn với một từ mẫu — giống như "A như Ă", "B bờ" trong tiếng Việt. Tên này giúp phân biệt các phụ âm có âm giống nhau.',
    },
    {
      type: 'vocabulary',
      items: [
        { id: 'c-gor-gai', thai: 'ก — ก ไก่', phonetic: 'g — gǒ gài', meaning: 'G như con gà (ไก่ = gà)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-jor-jaan', thai: 'จ — จ จาน', phonetic: 'j — jǒ jaan', meaning: 'J như đĩa (จาน = đĩa)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-dor-dek', thai: 'ด — ด เด็ก', phonetic: 'd — dǒ dèk', meaning: 'D như trẻ em (เด็ก = trẻ em)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-tor-tao', thai: 'ต — ต เต่า', phonetic: 't — dtǒ dtào', meaning: 'T như rùa (เต่า = rùa)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-bor-baai', thai: 'บ — บ ใบไม้', phonetic: 'b — bǒ bai-máai', meaning: 'B như lá cây (ใบไม้ = lá cây)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-por-plaa', thai: 'ป — ป ปลา', phonetic: 'p — bpǒ bplaa', meaning: 'P như cá (ปลา = cá)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
        { id: 'c-or-aang', thai: 'อ — อ อ่าง', phonetic: '- — ǒ àang', meaning: 'Phụ âm câm (อ่าง = chậu)', partOfSpeech: 'noun', level: 'beginner', category: 'phụ-âm-trung' },
      ],
    },
    {
      type: 'tip',
      title: 'Mẹo phân biệt ก ข ค',
      content:
        'Ba chữ này dễ nhầm nhất: ก (nhóm Trung, âm g/k), ข (nhóm Cao, âm kh mạnh), ค (nhóm Thấp, âm kh nhẹ). Nhìn vào "đuôi": ก = không có đuôi, ข = có móc nhỏ phải trên, ค = có vòng tròn nhỏ dưới.',
    },
    {
      type: 'flashcard',
      cards: [
        { front: 'ก', back: 'g/k — Nhóm Trung', phonetic: 'gǒ gài (ก ไก่)' },
        { front: 'จ', back: 'j — Nhóm Trung', phonetic: 'jǒ jaan (จ จาน)' },
        { front: 'ด', back: 'd — Nhóm Trung', phonetic: 'dǒ dèk (ด เด็ก)' },
        { front: 'ต', back: 't — Nhóm Trung', phonetic: 'dtǒ dtào (ต เต่า)' },
        { front: 'บ', back: 'b — Nhóm Trung', phonetic: 'bǒ bai-máai (บ ใบไม้)' },
        { front: 'ป', back: 'p — Nhóm Trung', phonetic: 'bpǒ bplaa (ป ปลา)' },
        { front: 'อ', back: 'phụ âm câm — Nhóm Trung', phonetic: 'ǒ àang (อ อ่าง)' },
      ],
    },
    {
      type: 'quiz',
      question: 'Phụ âm nào KHÔNG thuộc Nhóm Trung?',
      options: ['ก (g/k)', 'บ (b)', 'ส (s)', 'ด (d)'],
      correctIndex: 2,
      explanation: 'ส (s) thuộc Nhóm Cao. Nhóm Trung gồm: ก จ ด ต บ ป อ ฎ ฏ (9 phụ âm). ส thuộc nhóm Cao cùng với ข ฉ ถ ผ ฝ ห.',
    },
    {
      type: 'matching',
      instruction: 'Nối phụ âm với âm đọc của nó:',
      pairs: [
        { left: 'ก', right: 'g/k' },
        { left: 'บ', right: 'b' },
        { left: 'ด', right: 'd' },
        { left: 'ป', right: 'p' },
      ],
    },
    {
      type: 'summary',
      points: [
        '9 phụ âm Nhóm Trung: ก จ ด ต บ ป อ (+ 2 ít dùng)',
        'Mỗi phụ âm có tên gắn với từ mẫu (ก ไก่, จ จาน...)',
        'อ là phụ âm câm — không có âm nhưng cần thiết khi không có phụ âm đầu',
        'ก/ข/ค trông giống nhau nhưng khác nhóm và khác thanh điệu',
      ],
    },
  ],
  tags: ['phụ-âm', 'nhóm-trung', 'luyện-tập'],
};

export const lesson_3_1: Lesson = {
  id: 'lesson-3-1',
  moduleId: 'module-3',
  order: 1,
  title: 'Nguyên Âm Cơ Bản',
  subtitle: 'Hình dạng, vị trí và cách đọc',
  estimatedMinutes: 18,
  objectives: [
    'Biết nguyên âm tiếng Thái đứng ở 4 vị trí khác nhau quanh phụ âm',
    'Đọc được các nguyên âm đơn cơ bản',
    'Ghép nguyên âm với phụ âm ก để tạo âm tiết',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Nguyên Âm Tiếng Thái — Khác Hoàn Toàn Với Tiếng Việt!',
    },
    {
      type: 'paragraph',
      content:
        'Nguyên âm tiếng Thái không đứng độc lập — chúng "bám" vào phụ âm. Và có thể đứng ở bốn phía: phía sau, phía trước, phía trên, phía dưới, hoặc bao quanh phụ âm. Đây là điều khó nhất với người Việt!',
    },
    {
      type: 'comparison',
      title: 'Vị trí của nguyên âm — Dùng ก làm ví dụ',
      items: [
        { label: 'Sau phụ âm', thai: 'กา', phonetic: 'gaa', meaning: 'quạ (nguyên âm า đứng sau ก)' },
        { label: 'Trước phụ âm', thai: 'เก', phonetic: 'gee', meaning: '(nguyên âm เ- đứng trước ก)' },
        { label: 'Trên phụ âm', thai: 'กิ', phonetic: 'gi', meaning: '(nguyên âm ิ đứng trên ก)' },
        { label: 'Dưới phụ âm', thai: 'กุ', phonetic: 'gu', meaning: '(nguyên âm ุ đứng dưới ก)' },
        { label: 'Bao quanh', thai: 'เกา', phonetic: 'gao', meaning: '(nguyên âm เ-า bao quanh ก)' },
      ],
    },
    {
      type: 'tip',
      content: 'Khi đọc chữ Thái, hãy tìm phụ âm đầu (thường ở bên trái giữa), sau đó nhìn xung quanh để tìm nguyên âm. Đọc từ trái sang phải, trên xuống dưới.',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Các Nguyên Âm Đơn Thường Gặp',
    },
    {
      type: 'pronunciation',
      title: 'Nguyên âm ngắn và dài',
      items: [
        { symbol: 'กา / กะ', description: 'า (dài) / ะ (ngắn)', example: 'กา', phonetic: 'aa / a' },
        { symbol: 'กี / กิ', description: 'ี (dài) / ิ (ngắn)', example: 'กี', phonetic: 'ii / i' },
        { symbol: 'กู / กุ', description: 'ู (dài) / ุ (ngắn)', example: 'กู', phonetic: 'uu / u' },
        { symbol: 'เก / เกะ', description: 'เ- (dài) / เ-ะ (ngắn)', example: 'เก', phonetic: 'ee / e' },
        { symbol: 'แก / แกะ', description: 'แ- (dài) / แ-ะ (ngắn)', example: 'แก', phonetic: 'ae / ae' },
        { symbol: 'โก / เกาะ', description: 'โ- (dài) / เ-าะ (ngắn)', example: 'โก', phonetic: 'oo / o' },
      ],
    },
    {
      type: 'syllableBuilder',
      instruction: 'Thử ghép ก + า:',
      initial: 'ก',
      vowel: 'า',
      result: 'กา',
      phonetic: 'gaa',
      meaning: 'quạ (con quạ)',
    },
    {
      type: 'flashcard',
      cards: [
        { front: 'กา', back: 'con quạ', phonetic: 'gaa' },
        { front: 'กี่', back: 'bao nhiêu?', phonetic: 'gèe' },
        { front: 'กู', back: 'tao (thô tục)', phonetic: 'guu' },
        { front: 'เก', back: 'cũ (từ bán chính thức)', phonetic: 'gào' },
        { front: 'แก', back: 'bạn (thân mật)', phonetic: 'gae' },
        { front: 'โก', back: 'nói dối (thông tục)', phonetic: 'goo' },
      ],
    },
    {
      type: 'quiz',
      question: 'Trong từ กา (quạ), nguyên âม า đứng ở đâu?',
      options: ['Phía trước ก', 'Phía sau ก', 'Phía trên ก', 'Phía dưới ก'],
      correctIndex: 1,
      explanation: 'า là nguyên âm đứng sau phụ âm. Chữ ก + า = กา (gaa). Đây là loại nguyên âm phổ biến nhất, đứng ở bên phải phụ âm.',
    },
    {
      type: 'warning',
      title: 'Lỗi thường gặp',
      content:
        'Người Việt hay nhầm nguyên âm tiếng Thái dài/ngắn vì không quen. Ví dụ กา (aa dài) ≠ กะ (a ngắn). Độ dài nguyên âm ảnh hưởng đến nghĩa từ và cả thanh điệu!',
    },
    {
      type: 'summary',
      points: [
        'Nguyên âm Thái có thể đứng sau, trước, trên, dưới, hoặc bao quanh phụ âm',
        'Hầu hết nguyên âm đều có hai dạng: ngắn và dài',
        'า đứng sau phụ âm = âm "aa" dài',
        'ิ đứng trên phụ âm = âm "i" ngắn',
        'เ- đứng trước phụ âm = âm "ee" dài',
      ],
    },
  ],
  tags: ['nguyên-âm', 'vị-trí', 'âm-tiết'],
};

export const lesson_3_2: Lesson = {
  id: 'lesson-3-2',
  moduleId: 'module-3',
  order: 2,
  title: 'Ghép Vần — Cấu Tạo Âm Tiết',
  subtitle: 'Phụ âm + Nguyên âm + Phụ âm cuối',
  estimatedMinutes: 20,
  objectives: [
    'Ghép phụ âm đầu với nguyên âm tạo thành âm tiết mở',
    'Hiểu vai trò của phụ âm cuối',
    'Đọc được 10+ từ đơn giản',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Ghép Vần Tiếng Thái',
    },
    {
      type: 'paragraph',
      content:
        'Một âm tiết tiếng Thái đầy đủ có công thức: **Phụ âm đầu (C) + Nguyên âm (V) + Phụ âm cuối (C)**. Nhưng nhiều từ không có phụ âm cuối — gọi là âm tiết mở.',
    },
    {
      type: 'comparison',
      title: 'Âm tiết mở vs âm tiết đóng',
      items: [
        { label: 'Âm tiết mở (CV)', thai: 'กา', phonetic: 'gaa', meaning: 'quạ — ก + า (không có phụ âm cuối)' },
        { label: 'Âm tiết đóng (CVC)', thai: 'กาน', phonetic: 'gaan', meaning: 'việc — ก + า + น' },
        { label: 'Âm tiết mở (CV)', thai: 'มา', phonetic: 'maa', meaning: 'đến — ม + า' },
        { label: 'Âm tiết đóng (CVC)', thai: 'มาก', phonetic: 'mâak', meaning: 'nhiều — ม + า + ก' },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Phụ Âm Cuối (ตัวสะกด)',
    },
    {
      type: 'paragraph',
      content:
        'Không phải mọi phụ âm đều có thể đứng ở cuối từ. Tiếng Thái chỉ có 8 âm cuối: **-k, -t, -p, -m, -n, -ng, -y, -w**. Khi đứng cuối, phụ âm không bật hơi (unexploded).',
    },
    {
      type: 'pronunciation',
      title: 'Các âm cuối phổ biến',
      items: [
        { symbol: '-ก', description: 'âm cuối -k (không bật hơi)', example: 'มาก', phonetic: 'mâak = nhiều' },
        { symbol: '-น', description: 'âm cuối -n', example: 'กาน', phonetic: 'gaan = việc' },
        { symbol: '-ม', description: 'âm cuối -m', example: 'กาม', phonetic: 'gaam = công việc (cổ)' },
        { symbol: '-ง', description: 'âm cuối -ng', example: 'กาง', phonetic: 'gaang = mở rộng' },
        { symbol: '-ย', description: 'âm cuối -y (bán nguyên âm)', example: 'กาย', phonetic: 'gaai = thân thể' },
        { symbol: '-ว', description: 'âm cuối -w (bán nguyên âm)', example: 'กาว', phonetic: 'gaao = keo dán' },
      ],
    },
    {
      type: 'syllableBuilder',
      instruction: 'Ghép ม + า + ก:',
      initial: 'ม',
      vowel: 'า',
      final: 'ก',
      result: 'มาก',
      phonetic: 'mâak',
      meaning: 'nhiều / rất',
    },
    {
      type: 'vocabulary',
      items: [
        { id: 'w-maa', thai: 'มา', phonetic: 'maa', meaning: 'đến', partOfSpeech: 'verb', level: 'beginner', category: 'động-từ-cơ-bản' },
        { id: 'w-maak', thai: 'มาก', phonetic: 'mâak', meaning: 'nhiều / rất', partOfSpeech: 'adverb', level: 'beginner', category: 'trạng-từ' },
        { id: 'w-dee', thai: 'ดี', phonetic: 'dii', meaning: 'tốt / tốt lành', partOfSpeech: 'adjective', level: 'beginner', category: 'tính-từ' },
        { id: 'w-bpen', thai: 'เป็น', phonetic: 'bpen', meaning: 'là / biết làm', partOfSpeech: 'verb', level: 'beginner', category: 'động-từ-cơ-bản' },
        { id: 'w-gin', thai: 'กิน', phonetic: 'gin', meaning: 'ăn', partOfSpeech: 'verb', level: 'beginner', category: 'động-từ-cơ-bản' },
        { id: 'w-naam', thai: 'น้ำ', phonetic: 'náam', meaning: 'nước', partOfSpeech: 'noun', level: 'beginner', category: 'danh-từ-cơ-bản' },
        { id: 'w-khao', thai: 'ข้าว', phonetic: 'khâao', meaning: 'cơm / gạo', partOfSpeech: 'noun', level: 'beginner', category: 'danh-từ-cơ-bản' },
        { id: 'w-aroi', thai: 'อร่อย', phonetic: 'a-ròi', meaning: 'ngon', partOfSpeech: 'adjective', level: 'beginner', category: 'tính-từ' },
      ],
    },
    {
      type: 'dialogue',
      lines: [
        { speaker: 'A', thai: 'กินข้าวหรือยัง', phonetic: 'gin khâao rěu yang', meaning: 'Ăn cơm chưa?' },
        { speaker: 'B', thai: 'กินแล้วครับ อร่อยมาก', phonetic: 'gin láeo khráp a-ròi mâak', meaning: 'Ăn rồi anh. Ngon lắm!' },
        { speaker: 'A', thai: 'ดีมาก', phonetic: 'dii mâak', meaning: 'Tốt lắm!' },
      ],
    },
    {
      type: 'fillBlank',
      instruction: 'Điền từ còn thiếu:',
      sentence: 'น้ำ___ มาก (Nước này ngon lắm)',
      answer: 'อร่อย',
      hint: 'Từ có nghĩa là "ngon"',
    },
    {
      type: 'quiz',
      question: 'Từ มาก (mâak) kết thúc bằng âm cuối nào?',
      options: ['-n (น)', '-k (ก)', '-m (ม)', '-ng (ง)'],
      correctIndex: 1,
      explanation: 'มาก = ม + า + ก. Phụ âm cuối là ก, đọc là âm -k không bật hơi. Khi ก đứng cuối từ, bạn chặn âm lại không bung ra như khi đọc ก ở đầu từ.',
    },
    {
      type: 'summary',
      points: [
        'Công thức âm tiết: Phụ âm đầu + Nguyên âm (+ Phụ âm cuối tùy chọn)',
        'Âm tiết mở (CV): กา gaa, มา maa, ดี dii',
        'Âm tiết đóng (CVC): มาก mâak, กิน gin, ข้าว khâao',
        'Chỉ có 8 âm cuối: -k -t -p -m -n -ng -y -w',
        'Phụ âm cuối -k -t -p không bật hơi khi kết thúc từ',
      ],
    },
  ],
  tags: ['ghép-vần', 'âm-tiết', 'phụ-âm-cuối'],
};
