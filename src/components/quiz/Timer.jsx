export default function Timer({ timeLeft }) {
  const low = timeLeft <= 10;

  return (
    <div
      className={`glass inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${
        low ? 'border-destructive/40 text-destructive' : ''
      }`}
    >
      <span className={low ? 'animate-pulse' : ''} aria-hidden="true">
        ⏱️
      </span>
      Time left: {timeLeft}s
    </div>
  );
}