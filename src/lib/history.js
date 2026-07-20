import { BASE_URL } from "../api/baseURl";

const API = BASE_URL;

export async function getHistory(userId) {
  const scope = userId != null ? `&userId=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`${API}/history?_sort=id&_order=desc&_limit=50${scope}`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addHistoryEntry(entry) {
  const res = await fetch(`${API}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...entry, date: new Date().toISOString() })
  });
  return res.json();
}

export async function getStatsSummary(userId) {
  const history = await getHistory(userId);
  if (!history.length) {
    return { bestScore: 0, accuracy: 0, quizzesPlayed: 0, history: [] };
  }

  const bestScore = Math.max(...history.map((h) => h.score));
  const totalCorrect = history.reduce((sum, h) => sum + h.score, 0);
  const totalQuestions = history.reduce((sum, h) => sum + h.total, 0);
  const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return { bestScore, accuracy, quizzesPlayed: history.length, history };
}