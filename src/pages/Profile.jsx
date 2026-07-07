import { useMemo, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStatsSummary } from '../lib/history';
import Input from '../components/ui/input';
import Button from '../components/ui/button';
import { TrophyIcon, TargetIcon, BoltIcon } from '../components/icon';

export default function Profile() {
  
 const { user, updateProfile } = useAuth();
  const [summary, setSummary] = useState({ bestScore: 0, accuracy: 0, quizzesPlayed: 0, history: [] });
 
  useEffect(() => {
    let ignore = false;
    getStatsSummary()
      .then((data) => {
        if (!ignore) setSummary(data);
      })
      .catch(() => {
        // Leave the safe default summary in place if the server is unreachable.
      });
    return () => {
      ignore = true;
    };
  }, []);
 
  const [form, setForm] = useState({
    avatar: user?.avatar || '',
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || ''
  });
 
  useEffect(() => {
    if (!user) return;
    setForm({
      avatar: user.avatar || '',
      name: user.name || '',
      username: user.username || '',
      email: user.email || ''
    });
  }, [user]);
 
  const initial = (form.name || 'G')[0].toUpperCase();
 
  const save = () => updateProfile(form);
 
  const { bestScore = 0, accuracy = 0, quizzesPlayed = 0, history: rawHistory } = summary || {};
  const history = Array.isArray(rawHistory) ? rawHistory : [];
 
  const statCards = [
    { label: 'Best score', value: bestScore, icon: TrophyIcon },
    { label: 'Accuracy', value: `${accuracy}%`, icon: TargetIcon },
    { label: 'Quizzes played', value: quizzesPlayed, icon: BoltIcon }
  ];
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Your <span className="text-gradient">profile</span>
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="glass animate-pop-in rounded-3xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Account details</h2>

          <div className="mt-5 flex items-center gap-4">
            {form.avatar ? (
              <img src={form.avatar} alt="Avatar" className="h-14 w-14 rounded-full object-cover" />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-xl font-bold text-primary-foreground">
                {initial}
              </div>
            )}
            <div className="flex-1 space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Avatar URL</label>
              <Input
                value={form.avatar}
                onChange={(e) => setForm((f) => ({ ...f, avatar: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="mt-5 space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Display name</label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>

          <div className="mt-5 space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Username</label>
            <Input value={form.username} onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))} />
          </div>

          <div className="mt-5 space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <Input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>

          <Button className="mt-6" onClick={save}>
            Save changes
          </Button>
        </div>

        <div className="space-y-4">
          {statCards.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass animate-pop-in flex items-center gap-3 rounded-2xl p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                <Icon />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xl font-bold">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="glass animate-pop-in rounded-3xl p-6 sm:p-8">
        <h2 className="text-lg font-semibold">Recent games</h2>
        {!history.length ? (
          <p className="mt-2 text-sm text-muted-foreground">No games played yet.</p>
        ) : (
          <div className="mt-4 space-y-2">
            {history.slice(0, 8).map((h, i) => (
              <div
                key={i}
                className="glass-subtle flex items-center justify-between rounded-xl px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-medium">{h.category}</p>
                  <p className="text-xs text-muted-foreground">
                    {h.difficulty} · {new Date(h.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-semibold text-gradient">
                  {h.score}/{h.total}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}