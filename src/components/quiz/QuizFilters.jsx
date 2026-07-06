import { SearchIcon } from '../icon.jsx';

const fieldClass =
  'w-full rounded-xl border border-foreground/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl px-4 py-3 ' +
  'outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 ' +
  'focus:border-primary/50 focus:bg-white/20 dark:focus:bg-white/10 focus:ring-2 focus:ring-primary/30';

export default function QuizFilters({ search, onSearch, difficulty, onDifficulty, amount, onAmount }) {
  return (
    <div className="glass animate-pop-in grid gap-5 rounded-3xl p-6 sm:grid-cols-3">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Search category</label>
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            className={`${fieldClass} pl-10`}
            placeholder="e.g. Science, Sports..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Difficulty</label>
        <select className={`${fieldClass} cursor-pointer appearance-none`} value={difficulty} onChange={(e) => onDifficulty(e.target.value)}>
          <option value="">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">Questions: {amount}</label>
        <input
          type="range"
          min="5"
          max="25"
          step="5"
          value={amount}
          onChange={(e) => onAmount(Number(e.target.value))}
          className="mt-3.5 w-full accent-[var(--color-primary)]"
        />
      </div>
    </div>
  );
}