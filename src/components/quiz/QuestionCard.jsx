import { useMemo } from 'react';
import { decodeHtml, shuffle } from '../../lib/utils';
import { CheckIcon, XIcon } from '../icon';

export default function QuestionCard({ question, selected, onSelect }) {
  const options = useMemo(
    () => shuffle([...(question.incorrect_answers || []), question.correct_answer]),
    [question]
  );

  const answered = selected != null;

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {decodeHtml(question.category)} · {question.difficulty}
      </p>
      <h2 className="mt-2 text-xl font-semibold leading-relaxed sm:text-2xl">
        {decodeHtml(question.question)}
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {options.map((opt) => {
          const isCorrect = opt === question.correct_answer;
          const isSelected = opt === selected;

          let style =
            'border-foreground/10 bg-white/10 dark:bg-white/5 hover:border-primary/40 hover:bg-white/20 dark:hover:bg-white/10 hover:-translate-y-0.5';
          if (answered) {
            if (isCorrect) {
              style = 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300';
            } else if (isSelected) {
              style = 'border-red-400/50 bg-red-500/15 text-red-300';
            } else {
              style = 'border-foreground/5 bg-white/5 text-muted-foreground opacity-60';
            }
          }

          return (
            <button
              key={opt}
              disabled={answered}
              onClick={() => onSelect(opt)}
              className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-200 disabled:cursor-default active:scale-[0.98] ${style}`}
            >
              <span className="font-medium">{decodeHtml(opt)}</span>
              {answered && isCorrect && <CheckIcon className="shrink-0 text-emerald-300" />}
              {answered && isSelected && !isCorrect && <XIcon className="shrink-0 text-red-300" />}
            </button>
          );
        })}
      </div>
    </>
  );
}