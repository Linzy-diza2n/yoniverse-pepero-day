// Shared preview reminder drawer; no authentication or email delivery occurs here.
(() => {
  const completion = document.getElementById('completionReminders');
  let trigger = completion;
  if (completion?.hidden) return;
  if (!trigger) {
    const intro = document.querySelector('.intro');
    if (!intro) return;
    trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'reminder-open';
    trigger.textContent = '11월 11일 전 알림받기';
    intro.append(trigger);
  }
  const sheet = document.createElement('dialog');
  sheet.id = 'reminder-sheet';
  sheet.className = 'reminder-sheet';
  sheet.setAttribute('aria-labelledby', 'reminder-sheet-title');
  sheet.innerHTML = `<div class="reminder-sheet-header"><span class="sheet-grip" aria-hidden="true"></span><h2 id="reminder-sheet-title" tabindex="-1">11월 11일 전 알림받기</h2></div><div class="reminder-sheet-body"><div class="completion-reminders"><div id="signup-reminder-anchor"></div></div></div>`;
  document.body.append(sheet);
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', sheet.id);
  const open = () => {
    if (sheet.open) return;
    sheet.showModal();
    document.documentElement.classList.add('reminder-sheet-open');
    sheet.querySelector('h2').focus({preventScroll:true});
  };
  trigger.addEventListener('click', open);
  sheet.addEventListener('click', event => {
    if (event.target !== sheet) return;
    const rect = sheet.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) sheet.close();
  });
  sheet.addEventListener('close', () => {
    document.documentElement.classList.remove('reminder-sheet-open');
    trigger.focus({preventScroll:true});
  });
  // Show only after the completion page has validated its preview receipt.
  if (completion) document.addEventListener('DOMContentLoaded', open, {once:true});
})();
