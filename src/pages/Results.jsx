import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';
import { addHistoryEntry } from '../lib/history';
import { TrophyIcon } from '../components/icon';

export default function Results() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { score, questions, answers, elapsedTime, quizConfig, resetQuiz } = useQuiz();
  const saved = useRef(false);
  const total = questions.length || 0;
  const accuracy = total ? Math.round((score / total) * 100) : 0;

  useEffect(() => {
    if (saved.current || !total) return;
    saved.current = true;

    if (user) {
      addHistoryEntry({
        score,
        total,
        correct: score,
        category: quizConfig.categoryName || 'General Knowledge',
        difficulty: quizConfig.difficulty || 'mixed'
      });
      toast.success('Quiz saved to your history!');
    }
  }, [user, score, total, quizConfig, answers]);

  const stats = [
    { label: 'Correct', value: score },
    { label: 'Score', value: score },
    { label: 'Time', value: `${elapsedTime}s` }
  ];

  return (
    <div className="mx-auto max-w-xl">
      <div className="glass-strong animate-pop-in rounded-3xl p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-[0_10px_30px_-8px_var(--color-primary)]">
          <TrophyIcon />
        </div>
        <h1 className="mt-5 text-3xl font-bold">Quiz complete!</h1>
        <p className="mt-2 text-foreground/70">
          You scored {score}/{total} · {accuracy}% accuracy
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass-subtle rounded-2xl p-4">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-2xl font-bold text-gradient">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              resetQuiz();
              navigate('/quiz');
            }}
            className="rounded-xl border border-foreground/10 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-white/20"
          >
            ↺ Play again
          </button>
          <button
            onClick={() => navigate('/stats')}
            className="rounded-xl border border-foreground/10 bg-white/10 px-5 py-2.5 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-white/20"
          >
            View stats
          </button>
          <button
            onClick={() => {
              resetQuiz();
              navigate('/play');
            }}
            className="rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_28px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            More categories
          </button>
        </div>
      </div>
    </div>
  );
}