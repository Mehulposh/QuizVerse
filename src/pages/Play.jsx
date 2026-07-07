import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQuiz } from '../context/QuizContext';
import { fetchCategories, withRateLimitRetry, RateLimitError } from '../lib/api';
import QuizFilters from '../components/quiz/QuizFilters';
import CategoryCard from '../components/quiz/CategoryCard';
import Skeleton from '../components/shared/Skeleton';
import ErrorState from '../components/shared/ErrorState';

export default function Play() {
  const navigate = useNavigate();
  const { quizConfig, setQuizConfig, resetQuiz } = useQuiz();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    withRateLimitRetry(() => fetchCategories(controller.signal), {
      retries: 2,
      delayMs: 5000,
      onRetry: (attempt) => toast.info(`Rate limited, retrying (${attempt}/2)...`)
    })
      .then((data) => {
        const list = [...(data.trivia_categories || [])].sort((a, b) => {
          if (a.name.includes('General Knowledge')) return -1;
          if (b.name.includes('General Knowledge')) return 1;
          return a.name.localeCompare(b.name);
        });
        setCategories(list);
        setError(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => {
      // Cancels a duplicate call from React Strict Mode's double-invoked
      // effect in development so we don't trip Open Trivia DB's rate limit.
      controller.abort();
    };
  }, []);

  const filtered = useMemo(
    () => categories.filter((c) => c.name.toLowerCase().includes(quizConfig.search.toLowerCase())),
    [categories, quizConfig.search]
  );

  const startQuiz = (category) => {
    resetQuiz();
    setQuizConfig((prev) => ({ ...prev, category: category.id, categoryName: category.name }));
    navigate('/quiz');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Pick your <span className="text-gradient">challenge</span>
        </h1>
        <p className="mt-2 text-foreground/70">Choose a category, set your difficulty, and start playing.</p>
      </div>

      <QuizFilters
        search={quizConfig.search}
        onSearch={(v) => setQuizConfig((p) => ({ ...p, search: v }))}
        difficulty={quizConfig.difficulty}
        onDifficulty={(v) => setQuizConfig((p) => ({ ...p, difficulty: v }))}
        amount={quizConfig.amount}
        onAmount={(v) => setQuizConfig((p) => ({ ...p, amount: v }))}
      />

      {error && <ErrorState message="Failed to load categories. Try again shortly." />}

      {loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              difficulty={quizConfig.difficulty}
              amount={quizConfig.amount}
              onStart={() => startQuiz(cat)}
            />
          ))}
        </div>
      )}
    </div>
  );
}