// ============================================================
// LESSON BLOCK TYPES — Discriminated union for block-based content
// To add a new block type: add interface + union entry only here.
// No other core files need to change.
// ============================================================

export interface HeadingBlock {
  type: 'heading';
  level: 1 | 2 | 3;
  content: string;
}

export interface ParagraphBlock {
  type: 'paragraph';
  content: string;
}

export interface VocabularyBlock {
  type: 'vocabulary';
  items: VocabularyItem[];
}

export interface ExampleBlock {
  type: 'example';
  thai: string;
  phonetic: string;
  meaning: string;
  audio?: string;
}

export interface TipBlock {
  type: 'tip';
  title?: string;
  content: string;
}

export interface WarningBlock {
  type: 'warning';
  title?: string;
  content: string;
}

export interface ComparisonBlock {
  type: 'comparison';
  title?: string;
  items: Array<{ label: string; thai: string; phonetic: string; meaning: string }>;
}

export interface AudioBlock {
  type: 'audio';
  label: string;
  thai: string;
  phonetic: string;
  src?: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface FlashcardBlock {
  type: 'flashcard';
  cards: Array<{ front: string; back: string; phonetic?: string }>;
}

export interface QuizBlock {
  type: 'quiz';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MatchingBlock {
  type: 'matching';
  instruction?: string;
  pairs: Array<{ left: string; right: string }>;
}

export interface FillBlankBlock {
  type: 'fillBlank';
  instruction?: string;
  sentence: string; // use ___ for blank
  answer: string;
  hint?: string;
}

export interface SummaryBlock {
  type: 'summary';
  points: string[];
}

export interface DialogueBlock {
  type: 'dialogue';
  lines: Array<{ speaker: string; thai: string; phonetic: string; meaning: string }>;
}

export interface PronunciationBlock {
  type: 'pronunciation';
  title?: string;
  items: Array<{ symbol: string; description: string; example: string; phonetic: string }>;
}

export interface SyllableBuilderBlock {
  type: 'syllableBuilder';
  instruction?: string;
  initial: string;
  vowel: string;
  final?: string;
  result: string;
  phonetic: string;
  meaning: string;
}

// Union of all block types
export type LessonBlock =
  | HeadingBlock
  | ParagraphBlock
  | VocabularyBlock
  | ExampleBlock
  | TipBlock
  | WarningBlock
  | ComparisonBlock
  | AudioBlock
  | ImageBlock
  | FlashcardBlock
  | QuizBlock
  | MatchingBlock
  | FillBlankBlock
  | SummaryBlock
  | DialogueBlock
  | PronunciationBlock
  | SyllableBuilderBlock;

// ============================================================
// LESSON & MODULE TYPES
// ============================================================

export type LessonStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'review';

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  subtitle?: string;
  estimatedMinutes: number;
  objectives: string[];
  blocks: LessonBlock[];
  tags?: string[];
  prerequisiteIds?: string[];
}

export interface Module {
  id: string;
  order: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  color: string;
  lessonIds: string[];
}

// ============================================================
// VOCABULARY TYPES
// ============================================================

export interface VocabularyItem {
  id: string;
  thai: string;
  phonetic: string;
  meaning: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'particle' | 'pronoun' | 'conjunction';
  category?: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  example?: { thai: string; phonetic: string; meaning: string };
  audio?: string;
  tags?: string[];
}

// ============================================================
// PROGRESS TYPES
// ============================================================

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  completedAt?: string;
  score?: number;
  attempts: number;
}

export interface ExerciseResult {
  lessonId: string;
  blockIndex: number;
  blockType: string;
  correct: boolean;
  answeredAt: string;
}

export interface UserProgress {
  userId: string;
  lessons: Record<string, LessonProgress>;
  exerciseResults: ExerciseResult[];
  streak: number;
  lastStudiedAt?: string;
  dailyGoalMinutes: number;
  todayMinutes: number;
  settings: UserSettings;
}

export interface UserSettings {
  showPhonetic: boolean;
  showMeaning: boolean;
  speechRate: number;
  volume: number;
  darkMode: boolean;
  dailyGoalMinutes: number;
  language: 'vi';
}

export const DEFAULT_SETTINGS: UserSettings = {
  showPhonetic: true,
  showMeaning: true,
  speechRate: 0.8,
  volume: 1,
  darkMode: false,
  dailyGoalMinutes: 15,
  language: 'vi',
};
