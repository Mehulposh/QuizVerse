import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import RequireAuth from '../components/layout/RequireAuth';
import Home from '../pages/Home';
import Play from '../pages/Play';
import Quiz from '../pages/Quiz';
import Results from '../pages/Results';
import Stats from '../pages/Stats';
import Profile from '../pages/Profile';
import Login from '../pages/Login';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />

        <Route element={<RequireAuth />}>
          <Route path="/play" element={<Play />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}