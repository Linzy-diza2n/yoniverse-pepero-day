const storageKey = 'gift-draft:demo-yoni:v1';
const choices = [...document.querySelectorAll('input[name="shape"]')];
let draft = {};
try { const stored = JSON.parse(sessionStorage.getItem(storageKey)); if (stored && typeof stored === 'object' && !Array.isArray(stored)) draft = stored; } catch {}
for (const choice of choices) {
 if (choice.value === draft.shape) { choice.checked = true; }
 choice.addEventListener('change', () => {
  draft.shape = choice.value;
  try { sessionStorage.setItem(storageKey, JSON.stringify(draft)); }
  catch { /* Selection remains usable when session storage is unavailable. */ }
 });
}
const next = document.querySelector('.next-action');
function syncNext() { next.disabled = !choices.some(choice => choice.checked); }
choices.forEach(choice => choice.addEventListener('change', syncNext));
syncNext();
next.addEventListener('click', () => {
 const selected = choices.find(choice => choice.checked);
 if (selected) location.href = 'decorate-gift.html?shape=' + selected.value;
});
