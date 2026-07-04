export function decodeHtml(str = '') {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
}

export function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function buildStats(answers = []) {
  const correct = answers.filter((a) => a.correct).length;
  const wrong = answers.filter((a) => !a.correct).length;
  const skipped = Math.max(0, answers.length - correct - wrong);

  return [
    { name: 'Correct', value: correct },
    { name: 'Wrong', value: wrong },
    { name: 'Skipped', value: skipped }
  ];
}