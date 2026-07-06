export default function ScoreBoard({ score, total, correct }) {
  return (
    <div className="glass flex items-center gap-4 rounded-2xl px-5 py-3 text-sm">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
          ⭐
        </span>
        <div>
          <p className="text-xs text-muted-foreground">Score</p>
          <p className="font-semibold">{score}</p>
        </div>
      </div>
      <div className="h-8 w-px bg-foreground/10" />
      <div>
        <p className="text-xs text-muted-foreground">Correct</p>
        <p className="font-semibold">
          {correct}<span className="text-muted-foreground">/{total}</span>
        </p>
      </div>
    </div>
  );
}