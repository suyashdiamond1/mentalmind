'use client';

interface DifficultyFilterProps {
  difficulties: string[];
  activeDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
}

export default function DifficultyFilter({
  difficulties,
  activeDifficulty,
  onDifficultyChange,
}: DifficultyFilterProps) {
  const difficultyColors = {
    All: 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary',
    Beginner: 'bg-success/10 text-success hover:bg-success hover:text-success-foreground',
    Intermediate: 'bg-warning/10 text-warning hover:bg-warning hover:text-warning-foreground',
    Advanced: 'bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground',
  };

  return (
    <div className="flex flex-wrap gap-2">
      {difficulties.map((difficulty) => (
        <button
          key={difficulty}
          onClick={() => onDifficultyChange(difficulty)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-intelligent ${
            activeDifficulty === difficulty
              ? difficulty === 'All' ?'bg-primary text-primary-foreground shadow-brand-md'
                : difficultyColors[difficulty as keyof typeof difficultyColors].replace('hover:', '')
              : difficultyColors[difficulty as keyof typeof difficultyColors]
          }`}
        >
          {difficulty}
        </button>
      ))}
    </div>
  );
}