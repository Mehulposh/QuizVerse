import { NavLink } from 'react-router-dom';

const items = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/quiz', label: 'Quiz', icon: '🎯' },
  { to: '/results', label: 'Results', icon: '📊' },
  { to: '/profile', label: 'Profile', icon: '👤' },
  { to: '/settings', label: 'Settings', icon: '⚙️' }
];

const linkClass = ({ isActive }) =>
  `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
    isActive
      ? 'gradient-primary text-primary-foreground shadow-[0_10px_30px_-8px_var(--color-primary)]'
      : 'text-foreground/80 hover:bg-white/10 hover:text-foreground hover:translate-x-0.5'
  }`;

export default function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 md:block">
      <nav className="glass sticky top-24 space-y-1.5 rounded-3xl p-4">
        {items.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
            <span className="text-base leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}