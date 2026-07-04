export default function Loader() {
  return (
    <div className="glass flex flex-col items-center justify-center gap-4 rounded-3xl p-12 text-center">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-foreground/10" />
        <div className="animate-spin-slow absolute inset-0 rounded-full border-4 border-transparent border-t-primary" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Loading...</p>
    </div>
  );
}