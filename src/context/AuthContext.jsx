import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { BASE_URL } from "../api/baseURl";

const API = BASE_URL;
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

// Strips the password out of anything we keep in React state, so it never
// ends up floating around client-side beyond the moment it's checked.
// Note: json-server has no server-side code, so this check unavoidably
// happens in the browser and the password sits in db.json as plain text —
// fine for a local/dev project, not something to reuse for real users.
function stripPassword(account) {
  if (!account) return account;
  const { password, ...rest } = account;
  return rest;
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
      .then((data) => setUser(stripPassword(data)))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  const setSession = (account) => {
    if (account?.id != null) localStorage.setItem(SESSION_KEY, account.id);
    setUser(stripPassword(account));
  };

  // Sign up: fails if the username is already taken or no password is given.
  const signUp = async (payload) => {
    if (!payload.password || payload.password.length < 4) {
      throw new Error('Password must be at least 4 characters.');
    }

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
        avatar: payload.avatar || '',
        password: payload.password
      })
    });
    const created = await res.json();
    setSession(created);
    return stripPassword(created);
  };

  // Sign in: looks up the existing account and checks the password matches
  // before establishing a session, instead of trusting the username alone.
  const signIn = async (payload) => {
    const username = deriveUsername(payload);
    const existing = await findByUsername(username);
    if (!existing) throw new Error('No account found with that username. Try signing up instead.');
    if (existing.password !== payload.password) {
      throw new Error('Incorrect password.');
    }
    setSession(existing);
    return stripPassword(existing);
  };

  // Used for the "Continue with Google" mock — same account every time,
  // created on first use and reused (with saved edits) after that. There's
  // no real password here since it's standing in for OAuth.
  const loginOrCreate = async (payload) => {
    const username = deriveUsername(payload);
    const existing = await findByUsername(username);
    if (existing) {
      setSession(existing);
      return stripPassword(existing);
    }
    return signUp({ ...payload, password: `google-${username}` });
  };

  const updateProfile = async (fields) => {
    if (!user?.id) return null;
    // Never let a profile-edit PATCH accidentally touch the password field.
    const { password, ...safeFields } = fields;
    const res = await fetch(`${API}/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(safeFields)
    });
    const updated = await res.json();
    setUser(stripPassword(updated));
    return stripPassword(updated);
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