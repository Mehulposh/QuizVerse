const BASE = 'https://opentdb.com';

class RateLimitError extends Error {
  constructor() {
    super('Rate limited by Open Trivia DB');
    this.name = 'RateLimitError';
  }
}

export async function fetchCategories(signal) {
  const res = await fetch(`${BASE}/api_category.php`, { signal });
  if (res.status === 429) throw new RateLimitError();
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export async function fetchQuestions({ amount = 10, category = '', difficulty = '' }, signal) {
  const params = new URLSearchParams({ amount });
  if (category) params.set('category', category);
  if (difficulty) params.set('difficulty', difficulty);
  params.set('type', 'multiple');

  const res = await fetch(`${BASE}/api.php?${params.toString()}`, { signal });
  if (res.status === 429) throw new RateLimitError();
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
  return res.json();
}

export { RateLimitError };

// Small helper: retries a request-returning function a few times when it hits
// Open Trivia DB's rate limit (roughly 1 request per 5s per IP), backing off
// between attempts instead of failing immediately.
export async function withRateLimitRetry(fn, { retries = 2, delayMs = 5000, onRetry } = {}) {
  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      return await fn();
    } catch (err) {
      const isRateLimit = err instanceof RateLimitError;
      if (!isRateLimit || attempt >= retries) throw err;
      attempt += 1;
      onRetry?.(attempt, delayMs);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
}