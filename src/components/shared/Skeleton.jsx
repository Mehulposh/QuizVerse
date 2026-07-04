export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-shimmer rounded-2xl border border-foreground/10 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_25%,color-mix(in_oklab,var(--color-foreground)_14%,transparent)_37%,color-mix(in_oklab,var(--color-foreground)_6%,transparent)_63%)] ${className}`}
    />
  );
}