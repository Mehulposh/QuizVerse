import { useMemo ,useState, useEffect} from 'react';
import { getStatsSummary } from '../lib/history';
import ResultCharts from '../components/quiz/ResultCharts';
import { ChartIcon } from '../components/icon';

export default function Stats() {
    const [history, setHistory] = useState(null); // null = still loading
  const [failed, setFailed] = useState(false);
 
  useEffect(() => {
    let ignore = false;
    getStatsSummary()
      .then((summary) => {
        if (!ignore) setHistory(Array.isArray(summary?.history) ? summary.history : []);
      })
      .catch(() => {
        if (!ignore) {
          setFailed(true);
          setHistory([]);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);
 
  const safeHistory = Array.isArray(history) ? history : [];
 
  const chartData = useMemo(() => {
    if (!safeHistory.length) return [];
    const correct = safeHistory.reduce((sum, h) => sum + (h?.correct || 0), 0);
    const total = safeHistory.reduce((sum, h) => sum + (h?.total || 0), 0);
    return [
      { name: 'Correct', value: correct },
      { name: 'Wrong', value: Math.max(0, total - correct) }
    ];
  }, [safeHistory]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Your <span className="text-gradient">stats</span>
        </h1>
        <p className="mt-2 text-foreground/70">A breakdown of every quiz you've played.</p>
      </div>

      {!safeHistory.length ? (
        <div className="glass animate-pop-in rounded-3xl p-14 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
            <ChartIcon />
          </div>
          <h2 className="mt-4 text-xl font-semibold">No stats yet</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Play a few quizzes to see beautiful visualizations here.
          </p>
        </div>
      ) : (
        <ResultCharts data={chartData} />
      )}
    </div>
  );
}