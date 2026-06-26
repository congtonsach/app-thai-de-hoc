import type { VocabularyItem } from '@/domain/types/lesson';

export const vocabularyData: VocabularyItem[] = [
  // Chào hỏi
  { id: 'sawatdee', thai: 'สวัสดี', phonetic: 'sa-wàt-dee', meaning: 'Xin chào / Tạm biệt', partOfSpeech: 'verb', category: 'chào-hỏi', level: 'beginner' },
  { id: 'khop-khun', thai: 'ขอบคุณ', phonetic: 'khòp-khun', meaning: 'Cảm ơn', partOfSpeech: 'verb', category: 'chào-hỏi', level: 'beginner' },
  { id: 'khaw-thot', thai: 'ขอโทษ', phonetic: 'khǒ-thôot', meaning: 'Xin lỗi', partOfSpeech: 'verb', category: 'chào-hỏi', level: 'beginner' },
  { id: 'yindee', thai: 'ยินดี', phonetic: 'yin-dee', meaning: 'Vui lòng / Rất vui', partOfSpeech: 'adjective', category: 'chào-hỏi', level: 'beginner' },
  { id: 'lakon', thai: 'ลาก่อน', phonetic: 'laa-gòon', meaning: 'Tạm biệt', partOfSpeech: 'verb', category: 'chào-hỏi', level: 'beginner' },

  // Đại từ
  { id: 'phom', thai: 'ผม', phonetic: 'phǒm', meaning: 'Tôi (nam)', partOfSpeech: 'pronoun', category: 'đại-từ', level: 'beginner' },
  { id: 'dichan', thai: 'ดิฉัน', phonetic: 'di-chǎn', meaning: 'Tôi (nữ, lịch sự)', partOfSpeech: 'pronoun', category: 'đại-từ', level: 'beginner' },
  { id: 'chan', thai: 'ฉัน', phonetic: 'chǎn', meaning: 'Tôi (nữ, thân mật)', partOfSpeech: 'pronoun', category: 'đại-từ', level: 'beginner' },
  { id: 'khun', thai: 'คุณ', phonetic: 'khun', meaning: 'Bạn / Anh / Chị', partOfSpeech: 'pronoun', category: 'đại-từ', level: 'beginner' },
  { id: 'khao', thai: 'เขา', phonetic: 'khǎo', meaning: 'Anh ấy / Cô ấy / Họ', partOfSpeech: 'pronoun', category: 'đại-từ', level: 'beginner' },

  // Thức ăn
  { id: 'khao-rice', thai: 'ข้าว', phonetic: 'khâao', meaning: 'Cơm / Gạo', partOfSpeech: 'noun', category: 'thức-ăn', level: 'beginner' },
  { id: 'naam', thai: 'น้ำ', phonetic: 'náam', meaning: 'Nước', partOfSpeech: 'noun', category: 'thức-ăn', level: 'beginner' },
  { id: 'aroi', thai: 'อร่อย', phonetic: 'a-ròi', meaning: 'Ngon', partOfSpeech: 'adjective', category: 'thức-ăn', level: 'beginner' },
  { id: 'pet', thai: 'เผ็ด', phonetic: 'phèt', meaning: 'Cay', partOfSpeech: 'adjective', category: 'thức-ăn', level: 'beginner' },
  { id: 'wan', thai: 'หวาน', phonetic: 'wǎan', meaning: 'Ngọt', partOfSpeech: 'adjective', category: 'thức-ăn', level: 'beginner' },

  // Số đếm
  { id: 'nueng', thai: 'หนึ่ง', phonetic: 'nèung', meaning: 'Một (1)', partOfSpeech: 'noun', category: 'số-đếm', level: 'beginner' },
  { id: 'song', thai: 'สอง', phonetic: 'sǒong', meaning: 'Hai (2)', partOfSpeech: 'noun', category: 'số-đếm', level: 'beginner' },
  { id: 'saam', thai: 'สาม', phonetic: 'sǎam', meaning: 'Ba (3)', partOfSpeech: 'noun', category: 'số-đếm', level: 'beginner' },
  { id: 'see', thai: 'สี่', phonetic: 'sèe', meaning: 'Bốn (4)', partOfSpeech: 'noun', category: 'số-đếm', level: 'beginner' },
  { id: 'haa', thai: 'ห้า', phonetic: 'hâa', meaning: 'Năm (5)', partOfSpeech: 'noun', category: 'số-đếm', level: 'beginner' },

  // Động từ cơ bản
  { id: 'bpen', thai: 'เป็น', phonetic: 'bpen', meaning: 'Là / Biết làm gì', partOfSpeech: 'verb', category: 'động-từ', level: 'beginner' },
  { id: 'mii', thai: 'มี', phonetic: 'mii', meaning: 'Có', partOfSpeech: 'verb', category: 'động-từ', level: 'beginner' },
  { id: 'maa', thai: 'มา', phonetic: 'maa', meaning: 'Đến', partOfSpeech: 'verb', category: 'động-từ', level: 'beginner' },
  { id: 'bpai', thai: 'ไป', phonetic: 'bpai', meaning: 'Đi / Đến (nơi xa)', partOfSpeech: 'verb', category: 'động-từ', level: 'beginner' },
  { id: 'gin', thai: 'กิน', phonetic: 'gin', meaning: 'Ăn', partOfSpeech: 'verb', category: 'động-từ', level: 'beginner' },
];

export const vocabularyCategories = [
  ...new Set(vocabularyData.map((v) => v.category).filter(Boolean)),
] as string[];
