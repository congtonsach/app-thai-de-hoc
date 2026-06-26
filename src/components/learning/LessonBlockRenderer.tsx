import React from 'react';
import type { LessonBlock } from '@/domain/types/lesson';
import {
  HeadingBlockComp,
  ParagraphBlockComp,
  VocabularyBlockComp,
  ExampleBlockComp,
  TipBlockComp,
  WarningBlockComp,
  ComparisonBlockComp,
  FlashcardBlockComp,
  QuizBlockComp,
  MatchingBlockComp,
  FillBlankBlockComp,
  SummaryBlockComp,
  DialogueBlockComp,
  PronunciationBlockComp,
  SyllableBuilderBlockComp,
} from './LessonBlocks';

// ============================================================
// BLOCK RENDERER REGISTRY
// To add a new block type:
// 1. Create its component in LessonBlocks.tsx
// 2. Add entry here: blockRenderers['yourType'] = YourComponent
// No other files need to change.
// ============================================================

type BlockComponent<T extends LessonBlock> = React.ComponentType<{ block: T }>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockRenderers: Record<string, BlockComponent<any>> = {
  heading: HeadingBlockComp,
  paragraph: ParagraphBlockComp,
  vocabulary: VocabularyBlockComp,
  example: ExampleBlockComp,
  tip: TipBlockComp,
  warning: WarningBlockComp,
  comparison: ComparisonBlockComp,
  flashcard: FlashcardBlockComp,
  quiz: QuizBlockComp,
  matching: MatchingBlockComp,
  fillBlank: FillBlankBlockComp,
  summary: SummaryBlockComp,
  dialogue: DialogueBlockComp,
  pronunciation: PronunciationBlockComp,
  syllableBuilder: SyllableBuilderBlockComp,
};

interface LessonBlockRendererProps {
  block: LessonBlock;
  index: number;
}

export function LessonBlockRenderer({ block, index }: LessonBlockRendererProps) {
  const Component = blockRenderers[block.type];

  if (!Component) {
    // Show debug info in dev, silently skip in prod
    const isDev = import.meta.env.DEV;
    if (isDev) {
      return (
        <div className="border border-dashed border-red-300 rounded p-3 text-xs text-red-500">
          Unknown block type: <strong>{block.type}</strong>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="lesson-block" data-block-type={block.type} data-block-index={index}>
      <Component block={block} />
    </div>
  );
}

interface LessonContentProps {
  blocks: LessonBlock[];
}

export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="flex flex-col gap-5">
      {blocks.map((block, i) => (
        <LessonBlockRenderer key={i} block={block} index={i} />
      ))}
    </div>
  );
}
