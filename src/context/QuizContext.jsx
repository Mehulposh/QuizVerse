import { createContext, useContext, useMemo, useState } from 'react';

const QuizContext = createContext(null);
export const useQuiz = () => useContext(QuizContext);

export function QuizProvider({ children }) {
  const [quizConfig, setQuizConfig] = useState({
    category: '',
    categoryName: '',
    difficulty: '',
    amount: 10,
    search: ''
  });
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetQuiz = () => {
    setScore(0);
    setAnswers([]);
    setTimeLeft(0);
    setElapsedTime(0);
    setQuestions([]);
  };

  const value = useMemo(
    () => ({
      quizConfig,
      setQuizConfig,
      score,
      setScore,
      answers,
      setAnswers,
      timeLeft,
      setTimeLeft,
      elapsedTime,
      setElapsedTime,
      questions,
      setQuestions,
      loading,
      setLoading,
      resetQuiz
    }),
    [quizConfig, score, answers, timeLeft, elapsedTime, questions, loading]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}