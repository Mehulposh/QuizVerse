const BASE = 'https://opentdb.com';

export async function fetchCategories() {
  const res = await fetch(`${BASE}/api_category.php`);
  return res.json();
}

export async function fetchQuestions({ amount = 10, category = '', difficulty = '' }) {
  const params = new URLSearchParams({ amount });
  if (category) params.set('category', category);
  if (difficulty) params.set('difficulty', difficulty);
  params.set('type', 'multiple');

  const res = await fetch(`${BASE}/api.php?${params.toString()}`);
  return res.json();
}