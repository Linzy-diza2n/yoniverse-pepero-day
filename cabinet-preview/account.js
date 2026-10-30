(() => {
  const menu = document.getElementById('account-menu');
  const trigger = document.getElementById('profile');
  menu.addEventListener('toggle', event => {
    trigger.setAttribute('aria-expanded', String(event.newState === 'open'));
  });
  document.getElementById('account-logout').addEventListener('click', () => {
    // Preview only. Production must invalidate the authenticated session first.
    // Keep cabinet customization and school preferences when leaving the preview.
    menu.hidePopover();
    window.location.assign('landing.html');
  });
})();
