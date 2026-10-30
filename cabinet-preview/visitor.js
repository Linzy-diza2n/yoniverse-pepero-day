const $ = (id) => document.getElementById(id);
const colors = [
  ['파스텔 민트','#B5E4D3','#82B6A3','#DEF3EA'],
  ['레몬 버터','#FFEDAB','#D1B970','#FFF7D6'],
  ['체리 밀크','#F6BDD3','#CA91A9','#FBE1EB'],
  ['파스텔 라일락','#D3C4EE','#A798C4','#EDE6FA'],
  ['소다 블루','#B8DFF0','#87B4C9','#DFF1F9'],
  ['살구 소르베','#F8CDB5','#C99D85','#FCE8DC'],
  ['바닐라 크림','#F2E6D1','#C4B59B','#FAF4E8']
];

const doodles = {
 'cherry': '<path d="M29 56 Q49 32 51 15 Q59 36 70 56" fill="none"/><path d="M51 16 Q72 8 78 21 Q62 30 51 16Z" fill="#83ba83"/><path d="M14 62 C13 43 43 44 44 62 C46 84 15 87 14 62Z" fill="#ed5349"/><path d="M54 65 C51 44 83 46 85 64 C87 88 55 89 54 65Z" fill="#ed5349"/><path d="M22 56 L26 53 M63 58 L67 55" stroke="white"/>',
 'planet': '<path d="M24 48 C24 13 74 10 80 43 C86 80 31 88 24 48Z" fill="#82c7e4"/><path d="M26 34 C-15 16 5 54 68 70 C108 80 95 57 79 51" fill="none"/><path d="M11 18 L11 7 M6 12 L17 12 M88 24 L93 19" fill="none"/>',
 'bow': '<path d="M45 47 Q15 12 11 32 Q3 54 16 64 Q32 63 46 51 M54 46 Q84 11 89 32 Q97 55 84 63 Q67 61 54 51" fill="#ed9ac1"/><path d="M43 52 L30 84 44 78 51 86 54 57 M55 51 L74 79 62 76 56 87 47 57" fill="#ed9ac1"/><path d="M38 42 Q50 33 59 43 L57 56 Q49 63 40 55Z" fill="#f5bfd7"/><path d="M21 39 L39 47 M78 38 L60 47" fill="none"/>',
 'bolt': '<path d="M51 9 L23 51 44 52 33 91 79 39 56 39 70 10Z" fill="#ffe26a"/><path d="M15 27 L9 22 M82 71 L91 76" fill="none"/>',
 'cloud': '<path d="M22 62 C1 62 5 39 24 39 C23 16 48 12 57 32 C73 18 90 31 83 45 C101 54 88 68 73 65 L22 65Z" fill="#c8e9f6"/><path d="M36 45 L36 49 M59 45 L59 49 M43 55 Q49 61 54 54" fill="none"/><path d="M25 78 L21 86 M72 78 L68 86" stroke="#6bb6d2"/>',
 'pepero': '<path d="M30 15 Q34 6 41 14 L63 82 Q65 90 58 91 Q53 92 51 84Z" fill="#e9bc7e"/><path d="M30 15 Q34 6 41 14 L58 67 46 71Z" fill="#785044"/><path d="M62 14 Q69 8 73 16 L49 85 Q46 94 40 90 Q36 88 39 80Z" fill="#e9bc7e"/><path d="M62 14 Q69 8 73 16 L55 67 43 63Z" fill="#ef9dbf"/><path d="M31 26 L43 24 M35 39 L47 37 M60 30 L68 34 M56 44 L64 48" stroke="#fff1d6" stroke-width="3"/>',

 '♡': '<path fill="#ed5349" d="M47 83 C38 72 9 49 12 29 C14 9 39 10 46 30 C53 3 79 11 84 26 C93 48 65 70 47 83Z"/><path d="M21 29 Q19 39 25 43" stroke="white"/><path d="M77 7 L81 2 M89 15 L96 12" fill="none"/>',
 '✿': '<path fill="#ed9ac1" d="M45 35 C15 6 8 30 30 45 C-1 49 14 74 36 59 C23 92 54 98 55 65 C78 94 95 70 69 53 C103 42 82 17 62 37 C68 3 39 4 45 35Z"/><path fill="#ffe26a" d="M42 46 C50 37 63 43 60 53 C56 65 38 59 42 46Z"/>',
 '✧': '<path fill="#ffe26a" d="M45 9 L54 34 83 23 66 48 88 65 59 63 53 91 40 66 13 76 29 51 10 36 36 36Z"/><path d="M76 6 L79 13 M91 76 L96 81 M6 58 L12 56" fill="none"/>',
 '☺': '<path fill="#f5c15e" d="M48 10 C75 5 88 29 85 56 C83 78 59 91 36 83 C10 75 9 52 15 32 C21 16 33 12 48 10Z"/><path d="M32 33 Q27 39 34 44 M57 29 Q53 35 59 41 M29 54 C41 77 66 68 72 48" fill="none"/>'
};
Object.assign(doodles, {
 'music':'<path d="M40 65V24L77 15V57" stroke-width="5"/><path d="M40 28L77 19V33L40 42Z" fill="#bca0f1"/><ellipse cx="28" cy="69" rx="13" ry="10" fill="#bca0f1"/><ellipse cx="65" cy="61" rx="13" ry="10" fill="#bca0f1"/>',
 'sun':'<circle cx="50" cy="50" r="23" fill="#ffe36e"/><path d="M50 7V17 M50 83V93 M7 50H17 M83 50H93 M19 19L26 26 M74 74L81 81 M19 81L26 74 M74 26L81 19 M40 44V48 M60 44V48 M40 58Q50 68 60 58"/>',
 'clover':'<path d="M51 49C14 29 22 7 40 16Q51 18 51 34C57 4 85 11 80 29Q77 42 60 49C91 51 90 79 72 78Q59 78 52 61C46 90 20 88 20 70Q20 55 43 50Z" fill="#73d8b3"/><path d="M51 54Q60 75 48 94"/>',
 'cat':'<path d="M20 43L18 14 40 29Q51 25 63 29L83 14 81 45Q94 82 51 85Q8 83 20 43Z" fill="#ffd6a0"/><path d="M35 49V54 M65 49V54 M46 59L51 63 56 59 M51 63Q43 72 39 65 M51 63Q58 72 63 65 M9 58L26 61 M9 70L26 67 M75 61L92 58 M75 67L92 70"/>',
 'spark':'<path d="M49 8Q53 43 87 49Q55 53 49 89Q44 55 10 49Q44 44 49 8Z" fill="#81cdf1"/><path d="M80 8V26 M71 17H89 M20 77V91 M13 84H27"/>'
});
const NAME_LIMIT = 6;
const nameCharacters = value => Array.from(new Intl.Segmenter('ko',{granularity:'grapheme'}).segment(value), part=>part.segment);
function stickerSvg(key) { return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" stroke="#151515" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">'+doodles[key]+'</svg>'; }
function sketchSvg(cls, body) { return '<svg class="'+cls+'" viewBox="0 0 240 420" preserveAspectRatio="none" aria-hidden="true" fill="none" stroke="#151515" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>'; }
$('cabinet').insertAdjacentHTML('afterbegin',sketchSvg('cabinet-ink','<path fill="var(--cab-dark)" d="M15 7 L227 7 Q232 7 236 15 L236 408 Q236 415 229 415 L15 410Z"/><path fill="var(--cab)" d="M14 5 Q7 5 7 13 L7 399 Q7 406 14 406 L222 406 Q229 406 229 399 L229 13 Q229 5 222 5Z"/>'));
$('door').insertAdjacentHTML('afterbegin',sketchSvg('door-ink','<path fill="var(--cab)" d="M15 6 Q8 6 8 14 L8 400 Q8 408 16 408 L223 408 Q230 408 230 400 L230 14 Q230 6 222 6Z"/><path d="M25 21 Q20 21 20 27 L20 387 Q20 393 26 393 L211 393 Q217 393 217 387 L217 27 Q217 21 211 21Z"/><path d="M60 370 Q119 369 178 370 M60 380 Q119 379 178 380"/>'));
document.querySelector('.mini-sticker').innerHTML=stickerSvg('☺');



// Align every cabinet to the visible body, including responsive scaling.
function alignCabinetRow() {
 const stage = document.querySelector('.stage');
 const stageRect = stage.getBoundingClientRect();
 const cabinet = $('cabinet');
 const cabinetInk = document.querySelector('.cabinet-ink');
 let frame = cabinetInk.getBoundingClientRect();
 // Center the visible SVG body, including its slightly asymmetric frame.
 const visibleCenter = frame.left + frame.width * 121.5 / 240;
 const correction = stageRect.left + stageRect.width / 2 - visibleCenter;
 const previousOffset = parseFloat(cabinet.style.getPropertyValue('--cabinet-center-offset')) || 0;
 cabinet.style.setProperty('--cabinet-center-offset', (previousOffset + correction) + 'px');
 frame = cabinetInk.getBoundingClientRect();
 const left = frame.left - stageRect.left + frame.width * 7 / 240;
 const top = frame.top - stageRect.top + frame.height * 5 / 420;
 const width = frame.width * 229 / 240;
 const height = frame.height * 410 / 420;
 const gap = 5;
 stage.style.setProperty('--row-width', width + 'px');
 stage.style.setProperty('--row-height', height + 'px');
 stage.style.setProperty('--row-top', top + 'px');
 stage.style.setProperty('--row-gap', gap + 'px');
 stage.style.setProperty('--row-left', (left - 3 * (width + gap)) + 'px');
 stage.style.setProperty('--row-right', (left + width + gap) + 'px');
 stage.style.setProperty('--row-bottom', (top + height) + 'px');
}
$('door').insertAdjacentHTML('beforeend','<span class="hinge hinge-top" aria-hidden="true"></span><span class="hinge hinge-bottom" aria-hidden="true"></span><span class="lock-cylinder" aria-hidden="true"></span>');
const rowObserver = new ResizeObserver(alignCabinetRow);
rowObserver.observe(document.querySelector('.stage'));
rowObserver.observe($('cabinet'));
alignCabinetRow();
if (document.fonts) document.fonts.ready.then(alignCabinetRow);


$('doorSticker').innerHTML=stickerSvg('♡');

$('door').insertAdjacentHTML('beforeend', '<div class="padlock" aria-label="잠긴 캐비넷"><svg viewBox="0 0 50 66" aria-hidden="true"><path class="lock-shackle" d="M13 29 V17 C13 1 37 1 37 17 V30" fill="none" stroke="#282830" stroke-width="9" stroke-linecap="round"/><path class="lock-shackle" d="M13 29 V17 C13 1 37 1 37 17 V30" fill="none" stroke="#e1e3e9" stroke-width="5" stroke-linecap="round"/><rect x="5" y="26" width="40" height="33" rx="6" fill="#ffe18a" stroke="#25242c" stroke-width="2.5"/><path d="M10 31 H40" stroke="#fff4c7" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="41" r="4" fill="#49424c"/><path d="M25 43 V49" stroke="#49424c" stroke-width="4" stroke-linecap="round"/></svg></div>');
$('door').insertAdjacentHTML('beforeend','<div class="gift-slot" role="img" aria-label="포장한 초콜릿을 넣는 선물 투입구"><span class="slot-lip"></span><span class="slot-opening"></span><span class="slot-caption">마음 넣는 곳 ↓</span></div>');

let localCabinet = null;
try { localCabinet = JSON.parse(localStorage.getItem('cabinet-concept-v1')); } catch {}
let cabinetData = localCabinet || {};
try { const shared = new URLSearchParams(location.search).get('cabinet'); if(shared) cabinetData = JSON.parse(shared); } catch {}
const recipient = typeof cabinetData.name === 'string' ? Array.from(cabinetData.name).slice(0,6).join('') : '요니';
document.querySelectorAll('[data-recipient]').forEach(el=>el.textContent=recipient);
$('plateName').textContent=recipient;
$('gift-action-label').textContent=recipient+'님에게 마음 남기기';
document.title=recipient+'님의 캐비넷';
document.querySelector('.stage').setAttribute('aria-label',recipient+'님의 닫힌 캐비넷');
const color=colors[cabinetData.color] || colors[0];
['--cab','--cab-dark','--cab-light'].forEach((key,i)=>document.documentElement.style.setProperty(key,color[i+1]));
$('doorSticker').remove();document.querySelector('.mini-sticker').remove();
const decorations=Array.isArray(cabinetData.decorations)?cabinetData.decorations:[{key:cabinetData.sticker||'✧',x:.5,y:.6,size:62},{key:'☺',x:.5,y:.75,size:46}];
for(const item of decorations){
 if(!item || !Object.hasOwn(doodles,item.key))continue;
 const el=document.createElement('div');el.className='placed-sticker';el.innerHTML=stickerSvg(item.key);
 el.style.left=(Number.isFinite(item.x)?Math.max(.14,Math.min(.85,item.x)):.5)*100+'%';
 el.style.top=(Number.isFinite(item.y)?Math.max(.3,Math.min(.86,item.y)):.6)*100+'%';
 el.style.width=el.style.height=(item.size===46?46:62)+'px';$('door').append(el);
}
if(localCabinet){$('myCabinet').textContent='내 캐비넷 가기';$('myCabinet').href='cabinet.html';}
