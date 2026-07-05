import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API = 'http://localhost:4000';
// Only remembers *which* account is active on this device — the account
// data itself lives in db.json's "users" collection, not here.
const SESSION_KEY = 'quizverse_session_user_id';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

function deriveUsername(payload) {
  if (payload.username) return payload.username;
  if (payload.email) return payload.email.split('@')[0];
  return (payload.name || 'guest').toLowerCase().replace(/\s+/g, '');
}

async function findByUsername(username) {
  const res = await fetch(`${API}/users?username=${encodeURIComponent(username)}`);
  const matches = await res.json();
  return matches[0] || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      setReady(true);
      return;
    }
    fetch(`${API}/users/${id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const setSession = (account) => {
    if (account?.id != null) localStorage.setItem(SESSION_KEY, account.id);
    setUser(account);
  };

  // Sign up: fails if the username is already taken.
  const signUp = async (payload) => {
    const username = deriveUsername(payload);
    const existing = await findByUsername(username);
    if (existing) throw new Error('That username is already taken. Try signing in instead.');

    const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name || username,
        username,
        email: payload.email || `${username}@quizverse.app`,
        avatar: payload.avatar || ''
      })
    });
    const created = await res.json();
    setSession(created);
    return created;
  };

  // Sign in: looks up the existing account instead of recreating it, so any
  // profile edits made earlier are preserved.
  const signIn = async (payload) => {
    const username = deriveUsername(payload);
    const existing = await findByUsername(username);
    if (!existing) throw new Error('No account found with that username. Try signing up instead.');
    setSession(existing);
    return existing;
  };

  // Used for the "Continue with Google" mock — same account every time,
  // created on first use and reused (with saved edits) after that.
  const loginOrCreate = async (payload) => {
    const username = deriveUsername(payload);
    const existing = await findByUsername(username);
    if (existing) {
      setSession(existing);
      return existing;
    }
    return signUp(payload);
  };

  const updateProfile = async (fields) => {
    if (!user?.id) return null;
    const res = await fetch(`${API}/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fields)
    });
    const updated = await res.json();
    setUser(updated);
    return updated;
  };

  // Only forgets which account is active on this device — the account
  // itself is untouched in db.json.
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, loginOrCreate, logout, updateProfile }),
    [user, ready]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}