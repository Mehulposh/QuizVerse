const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const LogoIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 2l1.8 5.6L19 9l-5.2 1.4L12 16l-1.8-5.6L5 9l5.2-1.4L12 2z" />
    <path d="M19 15l.8 2.4L22 18l-2.2.6L19 21l-.8-2.4L16 18l2.2-.6L19 15z" />
  </svg>
);

export const GridIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const ChartIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 20V10M12 20V4M20 20v-7" />
  </svg>
);

export const UserIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" />
  </svg>
);

export const SunIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
  </svg>
);

export const MoonIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
);

export const LogoutIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M15 4H6a2 2 0 00-2 2v12a2 2 0 002 2h9" />
    <path d="M10 12h11M17 8l4 4-4 4" />
  </svg>
);

export const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const PlayIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
    <path d="M6 4.5v15l13-7.5z" />
  </svg>
);

export const TimerIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l3 2M10 2h4" />
  </svg>
);

export const CheckIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const XIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowLeftIcon = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...p}>
    <path d="M19 12H5M11 5l-7 7 7 7" />
  </svg>
);

export const TrophyIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M7 4h10v4a5 5 0 01-10 0V4z" />
    <path d="M7 5H4a3 3 0 003 4M17 5h3a3 3 0 01-3 4" />
    <path d="M12 13v3M9 20h6M10 16.5h4v3.5h-4z" />
  </svg>
);

export const TargetIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>
);

export const BoltIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...p}>
    <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export const BrainIcon = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 007 18a3 3 0 005-2.2V6a2 2 0 00-3-2z" />
    <path d="M15 4a3 3 0 013 3 3 3 0 011 5.8A3 3 0 0117 18a3 3 0 01-5-2.2V6a2 2 0 013-2z" />
  </svg>
);

export const GoogleIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
    <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.1-4 1.1-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.3 21.3 7.3 24 12 24z" />
    <path fill="#FBBC05" d="M5.4 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.4A12 12 0 000 12c0 1.9.5 3.8 1.4 5.4l4-3.1z" />
    <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
  </svg>
);