import { LogoIcon, PlayIcon } from '../icon.jsx';

export default function CategoryCard({ name, difficulty, amount, onStart }) {
  const diffLabel = difficulty ? `${difficulty[0].toUpperCase()}${difficulty.slice(1)}` : 'Mixed';

  return (
    <div className="glass glass-hover animate-pop-in flex flex-col justify-between rounded-3xl p-6">
      <div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
          <LogoIcon />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {diffLabel} Difficulty · {amount} Questions
        </p>
      </div>
      <button
        onClick={onStart}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl gradient-primary py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_28px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
      >
        <PlayIcon /> Start Quiz
      </button>
    </div>
  );
}