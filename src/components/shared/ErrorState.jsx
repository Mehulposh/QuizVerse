export default function ErrorState({ message = 'Something went wrong' }) {
  return (
    <div className="glass flex items-center gap-3 rounded-3xl border-destructive/30 p-6 text-destructive">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-lg">
        ⚠️
      </span>
      <p className="font-medium">{message}</p>
    </div>
  );
}