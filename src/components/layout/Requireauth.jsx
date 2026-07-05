import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../shared/Loader';

export default function RequireAuth() {
  const { user, ready } = useAuth();

  if (!ready) return <Loader />;
  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
}