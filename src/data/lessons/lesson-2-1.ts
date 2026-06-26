import type { Lesson } from '@/domain/types/lesson';

export const lesson_2_1: Lesson = {
  id: 'lesson-2-1',
  moduleId: 'module-2',
  order: 1,
  title: 'Ba Nhóm Phụ Âm',
  subtitle: 'Trung, Cao, Thấp — Chìa khóa của thanh điệu',
  estimatedMinutes: 15,
  objectives: [
    'Hiểu tại sao phụ âm tiếng Thái chia thành 3 nhóm',
    'Nhận biết một số phụ âm nhóm Trung cơ bản',
    'Hiểu mối quan hệ giữa nhóm phụ âm và thanh điệu',
  ],
  blocks: [
    {
      type: 'heading',
      level: 1,
      content: 'Ba Nhóm Phụ Âm Tiếng Thái',
    },
    {
      type: 'paragraph',
      content:
        'Đây là điều quan trọng nhất bạn cần nhớ về tiếng Thái: **Mỗi phụ âm thuộc một trong ba nhóm — Trung (กลาง), Cao (สูง), hoặc Thấp (ต่ำ)**. Nhóm phụ âm quyết định thanh điệu của toàn bộ âm tiết!',
    },
    {
      type: 'tip',
      title: 'Tại sao lại quan trọng?',
      content:
        'Tiếng Thái có 5 thanh điệu. Thanh của một từ được xác định bởi: (1) nhóm phụ âm đầu, (2) loại âm tiết, và (3) dấu thanh (nếu có). Hiểu nhóm phụ âm là bước đầu tiên để đọc đúng thanh!',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Nhóm Trung (อักษรกลาง) — 9 phụ âm',
    },
    {
      type: 'paragraph',
      content:
        'Nhóm Trung có 9 phụ âm. Đây là nhóm "trung tính" — khi không có dấu thanh, chúng đọc bằng thanh bằng (mid tone). Hãy học nhóm này trước vì nó là nền tảng!',
    },
    {
      type: 'pronunciation',
      title: 'Nhóm Trung — 9 phụ âm cơ bản',
      items: [
        { symbol: 'ก', description: 'ก ไก่ — "gài"', example: 'ก', phonetic: 'g / k' },
        { symbol: 'จ', description: 'จ จาน — "jaan"', example: 'จ', phonetic: 'j' },
        { symbol: 'ด', description: 'ด เด็ก — "dèk"', example: 'ด', phonetic: 'd' },
        { symbol: 'ต', description: 'ต เต่า — "tào"', example: 'ต', phonetic: 't' },
        { symbol: 'บ', description: 'บ ใบไม้ — "bai-máai"', example: 'บ', phonetic: 'b' },
        { symbol: 'ป', description: 'ป ปลา — "plaa"', example: 'ป', phonetic: 'p' },
        { symbol: 'อ', description: 'อ อ่าง — "àang"', example: 'อ', phonetic: 'silent / -' },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Nhóm Cao (อักษรสูง) — 11 phụ âm',
    },
    {
      type: 'paragraph',
      content:
        'Nhóm Cao có 11 phụ âm. Khi không có dấu thanh, chúng có xu hướng tạo ra thanh cao hơn. Một số phụ âm nhóm Cao trông giống nhóm Thấp nhưng phát âm khác.',
    },
    {
      type: 'pronunciation',
      title: 'Nhóm Cao — một số phụ âm tiêu biểu',
      items: [
        { symbol: 'ข', description: 'ข ไข่ — "khài"', example: 'ข', phonetic: 'kh (bật hơi mạnh)' },
        { symbol: 'ฉ', description: 'ฉ ฉิ่ง — "chìng"', example: 'ฉ', phonetic: 'ch' },
        { symbol: 'ถ', description: 'ถ ถุง — "thǔng"', example: 'ถ', phonetic: 'th' },
        { symbol: 'ผ', description: 'ผ ผึ้ง — "phêung"', example: 'ผ', phonetic: 'ph' },
        { symbol: 'ฝ', description: 'ฝ ฝา — "fǎa"', example: 'ฝ', phonetic: 'f' },
        { symbol: 'ส', description: 'ส เสือ — "sêua"', example: 'ส', phonetic: 's' },
        { symbol: 'ห', description: 'ห หีบ — "hèep"', example: 'ห', phonetic: 'h' },
      ],
    },
    {
      type: 'heading',
      level: 2,
      content: 'Nhóm Thấp (อักษรต่ำ) — 24 phụ âm',
    },
    {
      type: 'paragraph',
      content:
        'Nhóm Thấp có nhiều phụ âm nhất — 24 ký tự. Nhiều phụ âm trong nhóm này có âm tương tự nhóm Cao nhưng thuộc nhóm khác, tạo ra thanh điệu khác.',
    },
    {
      type: 'pronunciation',
      title: 'Nhóm Thấp — một số phụ âm tiêu biểu',
      items: [
        { symbol: 'ค', description: 'ค ควาย — "kwaai"', example: 'ค', phonetic: 'kh (nhẹ hơn ข)' },
        { symbol: 'ง', description: 'ง งู — "nguu"', example: 'ง', phonetic: 'ng' },
        { symbol: 'ช', description: 'ช ช้าง — "cháang"', example: 'ช', phonetic: 'ch (nhẹ hơn ฉ)' },
        { symbol: 'น', description: 'น หนู — "nǔu"', example: 'น', phonetic: 'n' },
        { symbol: 'พ', description: 'พ พาน — "phaan"', example: 'พ', phonetic: 'ph (nhẹ hơn ผ)' },
        { symbol: 'ม', description: 'ม ม้า — "máa"', example: 'ม', phonetic: 'm' },
        { symbol: 'ย', description: 'ย ยักษ์ — "yák"', example: 'ย', phonetic: 'y' },
        { symbol: 'ร', description: 'ร เรือ — "reua"', example: 'ร', phonetic: 'r' },
        { symbol: 'ล', description: 'ล ลิง — "ling"', example: 'ล', phonetic: 'l' },
        { symbol: 'ว', description: 'ว แหวน — "wǎen"', example: 'ว', phonetic: 'w' },
      ],
    },
    {
      type: 'comparison',
      title: 'Tóm tắt ba nhóm',
      items: [
        { label: 'Nhóm Trung', thai: 'อักษรกลาง', phonetic: 'ak-sǒn glaang', meaning: '9 phụ âm — ก จ ด ต บ ป อ ...' },
        { label: 'Nhóm Cao', thai: 'อักษรสูง', phonetic: 'ak-sǒn sǔung', meaning: '11 phụ âm — ข ฉ ถ ผ ฝ ส ห ...' },
        { label: 'Nhóm Thấp', thai: 'อักษรต่ำ', phonetic: 'ak-sǒn dtàm', meaning: '24 phụ âm — ค ง ช น พ ม ย ร ล ว ...' },
      ],
    },
    {
      type: 'quiz',
      question: 'Phụ âm ก (g/k) thuộc nhóm nào?',
      options: ['Nhóm Cao (อักษรสูง)', 'Nhóm Trung (อักษรกลาง)', 'Nhóm Thấp (อักษรต่ำ)', 'Không thuộc nhóm nào'],
      correctIndex: 1,
      explanation: 'ก thuộc Nhóm Trung (อักษรกลาง). Nhóm Trung gồm: ก จ ด ต บ ป อ (và thêm 2 ký tự nữa). Đây là nhóm ít nhất với 9 phụ âm.',
    },
    {
      type: 'warning',
      title: 'Lỗi thường gặp',
      content:
        'Người mới học hay nhầm ก (nhóm Trung) với ข (nhóm Cao) và ค (nhóm Thấp). Ba chữ này trông giống nhau! Mẹo: ก không có "đuôi", ข có "đuôi" nhỏ phía trên bên phải, ค có "vòng" phía dưới.',
    },
    {
      type: 'summary',
      points: [
        'Tiếng Thái có 44 phụ âm chia thành 3 nhóm: Trung, Cao, Thấp',
        'Nhóm Trung: 9 phụ âm — ก จ ด ต บ ป อ ...',
        'Nhóm Cao: 11 phụ âm — ข ฉ ถ ผ ฝ ส ห ...',
        'Nhóm Thấp: 24 phụ âm — nhiều nhất, gồm ค ง ช น พ ม ย ร ล ว ...',
        'Nhóm phụ âm + loại âm tiết + dấu thanh = thanh điệu của từ',
      ],
    },
  ],
  tags: ['phụ-âm', 'ba-nhóm', 'thanh-điệu'],
};
