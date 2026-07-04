import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppShell() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="bg-orb animate-float-slow h-72 w-72 opacity-30"
        style={{ top: '5%', left: '-6rem', background: 'var(--color-primary)' }}
      />
      <div
        className="bg-orb animate-float-slow h-80 w-80 opacity-20"
        style={{ top: '35%', right: '-8rem', background: 'var(--color-accent)', animationDelay: '-3s' }}
      />

      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-7xl animate-pop-in px-4 py-8 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}