(() => {
  const host = document.querySelector('#signup-reminder-anchor') || document.querySelector('#login-notice .preview-link, .cabinet-signup');
  if (!host) return;
  const panel = document.createElement('section');
  panel.className = 'email-reminder';
  panel.setAttribute('aria-label', '가입 시 이메일 알림 설정');
  panel.innerHTML = `
    <h3>캐비넷 열기 전, 알려드릴게요</h3>
    <p>11월 10일 오후 9시, 다음 날 자정에 캐비넷을 열 수 있다는 알림을 보내드려요. (한국 시간)</p>
    <label><input id="reminder-account" type="checkbox" checked> 가입에 쓴 이메일로 알림 받기</label>
    <div id="reminder-custom" hidden><label for="reminder-email">알림 받을 이메일</label><input id="reminder-email" type="email" autocomplete="email" placeholder="you@example.com" disabled><p>입력한 주소를 인증한 뒤 알림을 받을 수 있어요.</p></div>
    <label><input id="reminder-consent" type="checkbox"> [선택] 이메일 알림 수신에 동의해요</label>
    <p class="reminder-preview">현재는 설정 시안이에요. 저장·이메일 인증·발송은 가입 기능 연결 후 제공돼요.</p>`;
  host.before(panel);
  const account = panel.querySelector('#reminder-account');
  const custom = panel.querySelector('#reminder-custom');
  const email = panel.querySelector('#reminder-email');
  account.addEventListener('change', () => {
    custom.hidden = account.checked;
    email.disabled = account.checked;
    if (!account.checked) email.focus();
  });
})();
