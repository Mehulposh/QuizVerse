import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import useQuizApi from '../hooks/useQuizApi';
import QuestionCard from '../components/quiz/QuestionCard';
import Loader from '../components/shared/Loader';
import ErrorState from '../components/shared/ErrorState';
import { TimerIcon } from '../components/icon';
import { DEFAULT_TIMER } from '../lib/constants';

export default function Quiz() {
  const navigate = useNavigate();
  const { questions, loading, setScore, answers, setAnswers, timeLeft, setTimeLeft, setElapsedTime } =
    useQuiz();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const startedAt = useRef(Date.now());

  useQuizApi();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (!questions.length || selected != null) return;

    setTimeLeft(DEFAULT_TIMER);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [index, questions.length, selected, setTimeLeft]);

  const current = questions[index];

  const finish = () => {
    setElapsedTime(Math.round((Date.now() - startedAt.current) / 1000));
    navigate('/results');
  };

  const onSelect = (answer) => {
    if (!current || selected != null) return;

    const correct = answer === current.correct_answer;
    if (correct) setScore((s) => s + 1);
    setAnswers([...answers, { q: current.question, answer, correct }]);
    setSelected(answer);
  };

  const onNext = () => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      finish();
    }
  };

  if (loading) return <Loader />;

  if (!questions.length) {
    return <ErrorState message="No questions loaded. Head back and pick a category." />;
  }

  const progress = (index / questions.length) * 100;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="glass animate-pop-in rounded-3xl p-6 sm:p-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span className="flex items-center gap-1.5">
            <TimerIcon /> {timeLeft}s
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full gradient-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-5">
          <QuestionCard question={current} selected={selected} onSelect={onSelect} />
        </div>

        {selected != null && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onNext}
              className="inline-flex items-center justify-center rounded-xl gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_28px_-10px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
            >
              {index < questions.length - 1 ? 'Next question' : 'Finish quiz'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}