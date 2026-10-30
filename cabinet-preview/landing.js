const notice = document.getElementById('login-notice');
document.querySelectorAll('[data-start]').forEach(button => {
  button.addEventListener('click', () => notice.showModal());
});

// Use the app's registered HTTPS domain, not an invented custom URL scheme.
const appDownload = document.getElementById('app-download');
const storeChoice = document.getElementById('app-store-choice');
const appPlatform = /Android/i.test(navigator.userAgent) ? 'android'
  : (/iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)) ? 'ios' : 'desktop';
if (appPlatform === 'android') {
  // Chrome resolves the installed package, or opens Google Play when absent.
  const fallback = encodeURIComponent('https://play.google.com/store/apps/details?id=com.wiiee.yoniverse');
  appDownload.href = `intent://yoniverse.wiiee.co.kr/#Intent;scheme=https;package=com.wiiee.yoniverse;S.browser_fallback_url=${fallback};end`;
} else if (appPlatform === 'ios') {
  // Universal Links let iOS decide whether to open the associated installed app.
  // The HTTPS destination must provide the App Store fallback when uninstalled.
  appDownload.href = 'https://yoniverse.wiiee.co.kr/';
} else {
  appDownload.setAttribute('aria-haspopup', 'dialog');
  appDownload.addEventListener('click', event => {
    event.preventDefault();
    storeChoice.showModal();
  });
}

// Keep the primary action available after its original position scrolls away.
const heroStart = document.querySelector('.hero [data-start]');
if (heroStart) {
  const dock = document.createElement('div');
  dock.className = 'sticky-start-dock';
  dock.hidden = true;
  const stickyStart = heroStart.cloneNode(true);
  stickyStart.removeAttribute('data-start');
  stickyStart.addEventListener('click', () => notice.showModal());
  dock.append(stickyStart);
  document.body.append(dock);
  const observer = new IntersectionObserver(([entry]) => {
    dock.hidden = entry.isIntersecting || entry.boundingClientRect.bottom > 0;
  });
  observer.observe(heroStart);
}
