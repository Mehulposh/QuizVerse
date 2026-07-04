import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchQuestions, withRateLimitRetry, RateLimitError } from '../lib/api';
import { useQuiz } from '../context/QuizContext';

export default function useQuizApi() {
  const { quizConfig, setQuestions, setLoading } = useQuiz();

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const data = await withRateLimitRetry(() => fetchQuestions(quizConfig, controller.signal), {
          retries: 2,
          delayMs: 5000,
          onRetry: (attempt) =>
            toast.info(`Open Trivia DB is rate limiting requests, retrying (${attempt}/2)...`)
        });
        setQuestions(data.results || []);
      } catch (err) {
        if (err.name === 'AbortError') return;
        toast.error(
          err instanceof RateLimitError
            ? 'Too many requests right now — please wait a few seconds and try again.'
            : 'Failed to load questions'
        );
        setQuestions([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => {
      // Aborts an in-flight request when the effect re-runs (e.g. React
      // Strict Mode's double-invoke in development) so we never fire two
      // real requests back-to-back and trip Open Trivia DB's rate limit.
      controller.abort();
    };
  }, [quizConfig, setQuestions, setLoading]);
}