(() => {
 const pages = [['index.html','홈'],['cabinet.html','내 캐비넷'],['visitor.html','방문자 캐비넷'],['make-gift.html','선물 만들기']];
 const current = location.pathname.split('/').pop() || 'index.html';
 const nav = document.createElement('nav');
 nav.className = 'site-navigation'; nav.setAttribute('aria-label','사이트 메뉴');
 for (const [href,label] of pages) {
  const a = document.createElement('a'); a.href=href; a.textContent=label;
  if (current===href || (href==='index.html' && current==='landing.html') || (href==='make-gift.html' && ['decorate-gift.html','wrap-gift.html'].includes(current))) a.setAttribute('aria-current','page');
  nav.append(a);
 }
 document.body.append(nav);
})();
