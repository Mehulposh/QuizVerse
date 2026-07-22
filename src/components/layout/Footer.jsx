import { LogoIcon } from '../icon';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-foreground/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 font-medium text-foreground/80">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg gradient-primary text-primary-foreground">
            <LogoIcon />
          </span>
          QuizVerse
        </div>
        <p>© {new Date().getFullYear()} QuizVerse. Built with React, Tailwind CSS &amp; Open Trivia DB.</p>
      </div>
    </footer>
  );
}