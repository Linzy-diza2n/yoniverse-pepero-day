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
    trigger.innerHTML = '<svg class="reminder-bell" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4M12 2V1"/></svg><span>11월 11일 전 알림받기</span>';
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
  let returnTarget = trigger;
  const open = () => {
    if (sheet.open) return;
    sheet.showModal();
    document.documentElement.classList.add('reminder-sheet-open');
    sheet.querySelector('h2').focus({preventScroll:true});
  };
  trigger.addEventListener('click', () => { returnTarget = trigger; open(); });
  document.getElementById('account-reminders')?.addEventListener('click', () => {
    document.getElementById('account-menu').hidePopover();
    returnTarget = document.getElementById('profile');
    open();
  });
  sheet.addEventListener('click', event => {
    if (event.target !== sheet) return;
    const rect = sheet.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) sheet.close();
  });
  sheet.addEventListener('close', () => {
    document.documentElement.classList.remove('reminder-sheet-open');
    returnTarget.focus({preventScroll:true});
  });
  // Show only after the completion page has validated its preview receipt.
  if (completion) document.addEventListener('DOMContentLoaded', open, {once:true});
})();
