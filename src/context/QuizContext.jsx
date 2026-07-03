import { createContext, useContext, useMemo, useState } from 'react';

const QuizContext = createContext(null);
export const useQuiz = () => useContext(QuizContext);

export function QuizProvider({ children }) {
  const [quizConfig, setQuizConfig] = useState({
    category: '',
    difficulty: '',
    amount: 10,
    search: ''
  });
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  const resetQuiz = () => {
    setScore(0);
    setAnswers([]);
    setTimeLeft(0);
  };

  const value = useMemo(() => ({
    quizConfig, setQuizConfig, score, setScore, answers, setAnswers, timeLeft, setTimeLeft, resetQuiz
  }), [quizConfig, score, answers, timeLeft]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}