import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoIcon, BrainIcon, TimerIcon, TrophyIcon, BoltIcon, ChartIcon } from '../components/icon';

const features = [
  {
    icon: BrainIcon,
    title: '24+ Categories',
    desc: 'Science, History, Sports, Anime, Music and more from Open Trivia DB.'
  },
  {
    icon: TimerIcon,
    title: 'Timed Challenges',
    desc: 'Beat the clock on each question. Faster answers earn more points.'
  },
  {
    icon: TrophyIcon,
    title: 'Track Progress',
    desc: 'Save every session. Review your accuracy and streaks over time.'
  },
  {
    icon: BoltIcon,
    title: 'Three Difficulties',
    desc: 'Easy, medium, hard — pick your level or mix them up.'
  },
  {
    icon: ChartIcon,
    title: 'Beautiful Stats',
    desc: 'Bar, line, and pie charts break down your performance.'
  },
  {
    icon: LogoIcon,
    title: 'Glassmorphic UI',
    desc: 'Dark and light modes with smooth motion and skeleton loaders.'
  }
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/play" replace />;

  return (
    <div className="space-y-16 pb-10 text-center">
      <section className="mx-auto max-w-3xl pt-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur-xl">
          <LogoIcon /> Real-time trivia. Endless categories.
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
          Master trivia in <span className="text-gradient">QuizVerse</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/70">
          Play thousands of questions across 24+ categories. Race the clock, climb the leaderboard,
          and track your progress with beautiful visual stats.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-xl gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
          >
            Start playing free
          </button>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center rounded-xl border border-foreground/15 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:bg-white/20"
          >
            Browse quizzes
          </button>
        </div>
      </section>

      <section className="grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="glass glass-hover animate-pop-in rounded-3xl p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
              <Icon />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-foreground/70">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}