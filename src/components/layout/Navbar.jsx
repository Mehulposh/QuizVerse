import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { LogoIcon, GridIcon, ChartIcon, UserIcon, SunIcon, MoonIcon, LogoutIcon } from '../icon';

const navItems = [
  { to: '/play', label: 'Play', icon: GridIcon },
  { to: '/stats', label: 'Stats', icon: ChartIcon },
  { to: '/profile', label: 'Profile', icon: UserIcon }
];

const tabClass = ({ isActive }) =>
  `flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
  }`;

const iconBtn =
  'flex h-9 w-9 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={user ? '/play' : '/'} className="flex items-center gap-2 text-lg font-bold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
            <LogoIcon />
          </span>
          <span className="text-gradient">QuizVerse</span>
        </Link>

        {user && (
          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} className={tabClass}>
                <Icon />
                {label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-1.5">
          <button
            className={iconBtn}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          {user ? (
            <button className={iconBtn} onClick={logout} aria-label="Sign out">
              <LogoutIcon />
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_var(--color-primary)] transition-transform hover:-translate-y-0.5"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>

      {user && (
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-foreground/10 px-4 py-2 sm:hidden">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={tabClass}>
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}