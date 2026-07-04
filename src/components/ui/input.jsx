export default function Input(props) {
  return (
    <input
      {...props}
      className={
        `w-full rounded-xl border border-foreground/10 bg-white/10 dark:bg-white/5 backdrop-blur-xl px-4 py-3 ` +
        `outline-none placeholder:text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.2),inset_0_2px_6px_rgba(0,0,0,0.06)] ` +
        `transition-all duration-200 focus:border-primary/50 focus:bg-white/20 dark:focus:bg-white/10 ` +
        `focus:ring-2 focus:ring-primary/30 ${props.className || ''}`
      }
    />
  );
}