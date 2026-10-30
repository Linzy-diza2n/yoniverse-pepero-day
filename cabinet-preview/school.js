// Preview adapter: replace catalog and membership with authenticated server APIs.
(() => {
  // Progress fill is illustrative until the event threshold and server count are connected.
  const TARGET = 'nn'; // Participation threshold is not confirmed.
  const KEY = 'yoniverse-school-preview-v1';
  const visitor = document.body.dataset.view === 'visitor';
  function storedSchool(value) {
    const school = value?.school;
    return school && /^neis:[A-Z]\d+:\d+$/.test(school.id) &&
      typeof school.name === 'string' && typeof school.area === 'string' ? school : null;
  }
  let current = null;
  let nonStudent = false;
  let deferred = false;
  try { const saved = JSON.parse(localStorage.getItem(KEY)); current = storedSchool(saved); nonStudent = !current && saved?.status === 'non-student'; deferred = !current && saved?.status === 'deferred'; } catch {}
  if(visitor){
    try { const data=JSON.parse(new URLSearchParams(location.search).get('cabinet')); if(data && Object.hasOwn(data,'school')){current=storedSchool(data.school);nonStudent=!current&&data.school?.status==='non-student';} } catch {}
  }
  let selected = current;
  const card = document.createElement('section');
  card.className = 'school-card';
  card.setAttribute('aria-labelledby', 'school-card-title');
  card.innerHTML = `<div class="school-card-top"><span class="school-sticker">OUR SCHOOL ♡</span></div><p id="school-event-note" class="school-caption">nn명 이상 모이면, 우리학교에 달콤한 선물을!</p><h2 class="school-title-row"><button type="button" id="school-edit" class="school-name-button" aria-haspopup="dialog"><span id="school-card-title"></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></h2><p id="school-card-copy"></p><div id="school-count-wrap" hidden><div class="school-count-line"><strong id="school-count"></strong><span>목표 ${TARGET}명</span></div><div class="school-progress-track" role="progressbar" aria-label="우리 학교 참여 현황" aria-valuetext="1명 참여, 목표 nn명"><span class="school-progress-fill"></span></div></div><div id="school-share-area"><button type="button" id="school-share" class="school-button">친구에게 알리기 <span aria-hidden="true">↗</span></button><p id="school-share-status" class="school-caption" role="status" aria-live="polite"></p><input id="school-share-link" class="school-share-link" aria-label="친구에게 보낼 랜딩페이지 링크" readonly hidden></div>`;
  document.querySelector('.cabinet-sidebar').prepend(card);
  const dialog = document.createElement('dialog');
  dialog.className = 'school-dialog';
  dialog.setAttribute('aria-labelledby', 'school-title');
  dialog.innerHTML = `<form id="school-form"><div class="school-dialog-top"><span class="school-sticker">SWEET TOGETHER</span><button type="button" id="school-close" aria-label="학교 선택 닫기">×</button></div><h2 id="school-title">어느 학교에 다녀요?</h2><p class="school-lead">우리 학교 친구들이 nn명 이상 모이면<br>추첨을 통해 막대과자 선물을 쏠게요!</p><label for="school-search">학교 이름</label><input id="school-search" type="search" role="combobox" aria-autocomplete="list" aria-controls="school-results" aria-expanded="false" placeholder="예: 금호고, 서울고" autocomplete="off" maxlength="60" aria-describedby="school-search-hint"><p id="school-search-hint" class="school-caption">같은 이름의 학교는 지역을 확인해 주세요.</p><div id="school-results" class="school-results" role="listbox" aria-label="학교 검색 결과"></div><p id="school-feedback" role="status" class="school-caption"></p><div class="school-save-area"><button type="submit" id="school-save" class="school-button" disabled>학교 저장하기</button><button type="button" id="school-later" class="school-skip">나중에 선택하기</button><button type="button" id="school-nonstudent" class="school-skip">학생이 아니에요 · 학교 없이 시작하기</button></div></form>`;
  document.body.append(dialog);
  const el = id => document.getElementById(id);
  function renderCard() {
    el('school-card-title').textContent = current ? current.name : nonStudent ? '학교 없이도 마음을 나눠요 ♡' : '우리 학교 친구들, 모여라!';
    el('school-card-copy').hidden = Boolean(current);
    el('school-card-copy').textContent = current ? `${current.area} · 함께 모이고 있어요` : nonStudent ? '친구에게 선물을 보내고 내 캐비넷에 마음을 모아보세요.' : '학교를 고르고 함께 모인 친구들을 확인해요.';
    card.classList.toggle('school-card-compact', nonStudent);
    el('school-event-note').hidden = nonStudent;
    el('school-share-area').hidden = nonStudent;
    el('school-share-status').textContent = '';
    el('school-share-link').hidden = true;
    el('school-count-wrap').hidden = !current;
    el('school-count').textContent = '—명';
    card.querySelector('.school-progress-track').setAttribute('aria-valuetext', '참여 인원 정보 없음');
    card.querySelector('.school-progress-fill').style.width = '0';
    card.querySelector('.school-progress-fill').style.minWidth = '0';
    el('school-edit').setAttribute('aria-label', current ? `${current.name}, 학교 변경` : '내 학교 선택하기');
  }
  let matches = [];
  let activeIndex = -1;
  let searchVersion = 0;
  let searchTimer;
  let searchController;
  const normalize = value => value.replace(/\s/g, '').toLowerCase().normalize('NFD');
  function closeResults() {
    clearTimeout(searchTimer);
    searchVersion++;
    searchController?.abort();
    el('school-results').hidden = true;
    el('school-search').setAttribute('aria-expanded', 'false');
    el('school-search').removeAttribute('aria-activedescendant');
    activeIndex = -1;
  }
  function chooseSchool(school) {
    selected = school;
    el('school-search').value = school.name;
    closeResults();
    el('school-feedback').textContent = `${school.name} · ${school.area} 선택됨`;
    el('school-save').disabled = false;
    el('school-search').focus();
  }
  async function renderResults() {
    const query = el('school-search').value.trim();
    const version = ++searchVersion;
    searchController?.abort();
    searchController = new AbortController();
    matches = [];
    el('school-results').replaceChildren();
    el('school-results').hidden = true;
    el('school-search').setAttribute('aria-expanded', 'false');
    el('school-search').removeAttribute('aria-activedescendant');
    el('school-save').disabled = !selected;
    if (query) {
      el('school-feedback').textContent = '학교를 찾고 있어요…';
      try {
        const response = await fetch(`/api/schools?q=${encodeURIComponent(query)}`, { signal: searchController.signal });
        if (!(response.headers.get('content-type') || '').includes('application/json')) throw new Error('학교 검색에 연결할 수 없어요. 잠시 후 다시 시도해 주세요.');
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || '학교 검색에 실패했어요. 다시 시도해 주세요.');
        if (version !== searchVersion) return;
        matches = data.schools;
      } catch (error) {
        if (version !== searchVersion || error.name === 'AbortError') return;
        el('school-feedback').textContent = error.message;
        return;
      }
    }
    activeIndex = -1;
    el('school-search').removeAttribute('aria-activedescendant');
    el('school-results').replaceChildren();
    el('school-results').hidden = !matches.length;
    el('school-search').setAttribute('aria-expanded', String(matches.length > 0));
    matches.forEach((s, index) => {
      const option = document.createElement('div');
      option.id = `school-option-${index}`;
      option.className = 'school-result';
      option.setAttribute('role', 'option');
      option.setAttribute('aria-selected', 'false');
      const info = document.createElement('span');
      const name = document.createElement('strong');
      name.textContent = s.name;
      const area = document.createElement('small');
      area.textContent = s.area;
      info.append(name, area);
      const count = document.createElement('span');
      count.className = 'school-result-count';
      count.textContent = s.kind || '학교';
      option.append(info, count);
      option.addEventListener('mousedown', event => event.preventDefault());
      option.addEventListener('click', () => chooseSchool(s));
      el('school-results').append(option);
    });
    el('school-feedback').textContent = !query ? '학교 이름을 입력해 주세요.' : matches.length ? `${matches.length}개 학교를 찾았어요. 지역을 확인하고 선택해 주세요.` : '검색된 학교가 없어요. 학교 이름을 다시 확인해 주세요.';
    el('school-save').disabled = !selected;
  }
  el('school-search').addEventListener('input', () => {
    selected = null;
    closeResults();
    matches = [];
    el('school-save').disabled = true;
    el('school-feedback').textContent = el('school-search').value.trim() ? '학교를 찾고 있어요…' : '학교 이름을 입력해 주세요.';
    searchTimer = setTimeout(renderResults, 250);
  });
  el('school-search').addEventListener('keydown', event => {
    if (event.isComposing || event.keyCode === 229) return;
    if (event.key === 'Escape' && !el('school-results').hidden) {
      event.preventDefault(); event.stopPropagation(); closeResults(); return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (el('school-results').hidden) { renderResults(); return; }
      if (!matches.length) return;
      activeIndex = event.key === 'ArrowDown' ? (activeIndex + 1) % matches.length : (activeIndex <= 0 ? matches.length - 1 : activeIndex - 1);
      Array.from(el('school-results').children).forEach((option, index) => option.setAttribute('aria-selected', String(index === activeIndex)));
      const option = el('school-results').children[activeIndex];
      el('school-search').setAttribute('aria-activedescendant', option.id);
      option.scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (!el('school-results').hidden && activeIndex >= 0) chooseSchool(matches[activeIndex]);
    } else if (event.key === 'Tab') closeResults();
  });
  function openSelection() {
    selected = current;
    el('school-search').value = current?.name || '';
    el('school-close').hidden = false;
    if (selected) chooseSchool(selected);
    else renderResults();
    dialog.showModal();
    el('school-search').focus();
  }
  el('school-share').addEventListener('click', async () => {
    const button = el('school-share');
    const status = el('school-share-status');
    const fallback = el('school-share-link');
    const link = new URL('landing.html', window.location.href).href;
    button.disabled = true;
    fallback.hidden = true;
    try {
      await navigator.clipboard.writeText(link);
      status.textContent = '랜딩페이지 링크를 복사했어요. 친구에게 보내주세요!';
    } catch {
      status.textContent = '자동 복사가 안 됐어요. 아래 링크를 복사해서 친구에게 보내주세요.';
      fallback.value = link;
      fallback.hidden = false;
      fallback.focus();
      fallback.select();
    } finally {
      button.disabled = false;
    }
  });
  if (!visitor) el('school-edit').addEventListener('click', openSelection);
  function deferSelection() {
    if (!current && !nonStudent) {
      deferred = true;
      try { localStorage.setItem(KEY, JSON.stringify({ schoolId: null, status: 'deferred' })); } catch {}
    }
    closeResults();
    dialog.close();
    el('school-edit').focus({ preventScroll: true });
  }
  el('school-close').addEventListener('click', deferSelection);
  el('school-later').addEventListener('click', deferSelection);
  dialog.addEventListener('cancel', event => { event.preventDefault(); deferSelection(); });
  function saveMembership(school) {
    try { localStorage.setItem(KEY, JSON.stringify({ schoolId: school?.id || null, school, status: school ? 'student' : 'non-student' })); }
    catch { el('school-feedback').textContent = '저장하지 못했어요. 브라우저 저장 공간 설정을 확인하고 다시 시도해 주세요.'; return; }
    current = school;
    nonStudent = !school;
    deferred = false;
    renderCard();
    closeResults();
    dialog.close();
    card.scrollIntoView({ block: 'center', behavior: 'instant' });
    el('school-edit').focus({ preventScroll: true });
  }
  el('school-nonstudent').addEventListener('click', () => saveMembership(null));
  el('school-form').addEventListener('submit', event => {
    event.preventDefault();
    if (selected) saveMembership(selected);
  });
  renderCard();
  // This owner preview represents the post-login destination; production must authenticate first.
  if(visitor){
    const title=el('school-edit');
    const label=document.createElement('span');label.className='school-name-button';label.id='school-card-title';
    label.textContent=el('school-card-title').textContent;title.replaceWith(label);
    if(!current&&!nonStudent)el('school-card-copy').textContent='아직 학교를 선택하지 않은 캐비넷이에요.';
  } else if (!current && !nonStudent && !deferred) openSelection();
})();
