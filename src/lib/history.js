const API = 'http://localhost:4000';

export async function getHistory() {
  // json-server query params: newest first, capped at 50 entries.
  const res = await fetch(`${API}/history?_sort=id&_order=desc&_limit=50`);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function addHistoryEntry(entry) {
  // POST to a json-server array resource auto-assigns an incrementing "id".
  const res = await fetch(`${API}/history`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...entry, date: new Date().toISOString() })
  });
  return res.json();
}

export async function getStatsSummary() {
  const history = await getHistory();
  if (!history.length) {
    return { bestScore: 0, accuracy: 0, quizzesPlayed: 0, history: [] };
  }

  const bestScore = Math.max(...history.map((h) => h.score));
  const totalCorrect = history.reduce((sum, h) => sum + h.score, 0);
  const totalQuestions = history.reduce((sum, h) => sum + h.total, 0);
  const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  return { bestScore, accuracy, quizzesPlayed: history.length, history };
}