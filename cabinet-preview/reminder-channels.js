(() => {
  const create = () => {
    const section = document.createElement('section');
    section.className = 'reminder-channels';
    section.setAttribute('aria-label', '다른 방법으로 오픈 소식 받기');
    section.innerHTML = `
      <h2>다른 곳에서도 소식을 받아보세요</h2>
      <div class="reminder-channel-grid">
        <article><span class="channel-tag">INSTAGRAM</span><h3>요매거진 팔로우하기</h3>
          <p>요매거진을 팔로우하고 게시물·스토리에서 오픈 소식을 확인해요. 게시물 알림도 켜두면 좋아요.</p>
          <div class="channel-links"><a class="channel-cta" href="https://www.instagram.com/yomagazine_/" target="_blank" rel="noopener noreferrer">@yomagazine_ 팔로우하러 가기 ↗</a></div></article>
        <article><span class="channel-tag">YOUNIVERSE APP</span><h3>앱 푸시로 소식 받기</h3>
          <p>요니버스 앱에서 알림을 켜주세요. 휴대폰 설정에서도 요니버스 알림을 허용해 주세요.</p>
          <div class="channel-links"><button class="channel-cta app-download-trigger" type="button">요니버스 앱 다운로드 ↗</button></div></article>
      </div>`;
    section.querySelector('.app-download-trigger').addEventListener('click', () => {
      let dialog = document.getElementById('reminder-store-choice');
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.id = 'reminder-store-choice';
        dialog.className = 'reminder-store-dialog';
        dialog.setAttribute('aria-labelledby', 'reminder-store-title');
        dialog.innerHTML = `<form method="dialog"><button class="store-close" aria-label="닫기">×</button></form><h2 id="reminder-store-title">요니버스 앱 다운로드</h2><p>사용하는 휴대폰에 맞는 스토어를 선택해 주세요.</p><div class="channel-links"><a class="channel-cta" href="https://apps.apple.com/kr/app/id6803411489" target="_blank" rel="noopener noreferrer">App Store · iPhone ↗</a><a class="channel-cta" href="https://play.google.com/store/apps/details?id=com.wiiee.yoniverse" target="_blank" rel="noopener noreferrer">Google Play · Android ↗</a></div>`;
        document.body.append(dialog);
      }
      dialog.showModal();
    });
    return section;
  };
  const email = document.querySelector('.email-reminder');
  if (email) email.after(create());
  const main = document.querySelector('main');
  if (main && !main.contains(email) && !email?.closest('.reminder-sheet')) main.after(create());
})();
