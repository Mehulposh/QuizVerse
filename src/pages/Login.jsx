import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { ArrowLeftIcon, LogoIcon, GoogleIcon } from '../components/icon';

export default function Login() {
  const { signIn, signUp, loginOrCreate } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    if (!password) {
      toast.error('Password is required');
      return;
    }
    try {
      const payload = {
        name: username || (email ? email.split('@')[0] : 'Guest'),
        username: username || undefined,
        email: email || undefined,
        password
      };
      if (mode === 'signup') {
        await signUp(payload);
      } else {
        await signIn(payload);
      }
      navigate('/play');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  const continueWithGoogle = async () => {
    try {
      await loginOrCreate({ name: 'Google User', email: 'you@gmail.com' });
      navigate('/play');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center p-6">
      <div
        className="bg-orb h-64 w-64 opacity-30"
        style={{ top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-primary)' }}
      />
      <Link
        to="/"
        className="relative z-10 mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon /> Back to home
      </Link>

      <div className="glass-strong animate-pop-in relative z-10 w-full rounded-3xl p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-[0_10px_30px_-8px_var(--color-primary)]">
          <LogoIcon />
        </div>
        <h1 className="text-center text-2xl font-bold">
          Welcome to <span className="text-gradient">QuizVerse</span>
        </h1>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Sign in to save your scores and stats
        </p>

        <button
          onClick={continueWithGoogle}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-foreground/10 bg-white/10 py-3 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-white/20"
        >
          <GoogleIcon /> Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-foreground/10" />
          OR
          <div className="h-px flex-1 bg-foreground/10" />
        </div>

        <div className="glass-inset flex rounded-xl p-1 text-sm font-medium">
          <button
            className={`flex-1 rounded-lg py-2 transition-colors ${mode === 'signin' ? 'glass-strong' : 'text-muted-foreground'}`}
            onClick={() => setMode('signin')}
          >
            Sign in
          </button>
          <button
            className={`flex-1 rounded-lg py-2 transition-colors ${mode === 'signup' ? 'glass-strong' : 'text-muted-foreground'}`}
            onClick={() => setMode('signup')}
          >
            Sign up
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Username</label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="yourname" />
          </div>
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && submit()}
            />
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={submit}>
          {mode === 'signin' ? 'Sign in' : 'Create account'}
        </Button>
      </div>
    </div>
  );
}