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
Object.assign(doodles, {"strawberry": "<path d=\"M21 40C15 63 40 88 50 91C63 86 87 59 79 40Q50 20 21 40Z\" fill=\"#ef819e\"/><path d=\"m50 34-22-9 11 17-20 3 24 8 7-14 8 14 23-9-20-3 11-16Z\" fill=\"#91cba5\"/><path d=\"m34 59 2 4m26-4-2 4m-12 9 2 4m-1-22 1 4\" stroke=\"#fff1ce\"/>", "butterfly": "<path d=\"M48 50C21 2 2 20 16 49Q-2 76 25 81Q41 80 49 59C59 87 84 91 87 72Q91 57 78 51C99 16 71 5 52 49Z\" fill=\"#c9b5ed\"/><path d=\"M48 45Q50 39 53 46L55 67Q50 75 46 67Z\" fill=\"#fff0b1\"/><path d=\"m48 44-9-16m13 16 9-16M23 36l13 11m31-10-7 11\"/>", "loveletter": "<path d=\"M12 25h76v53H12Z\" fill=\"#fff4db\"/><path d=\"m12 25 38 31 38-31M12 78l26-32m50 32L62 46\"/><path d=\"M50 62C29 51 38 37 50 47C63 36 72 51 50 62Z\" fill=\"#ef9dbf\"/>", "checkerheart": "<path d=\"M50 86C36 74 11 54 12 32C13 10 39 9 50 28C62 9 86 10 88 32C90 53 65 76 50 86Z\" fill=\"#f4b6cd\"/><path d=\"M32 30h18v18H32Zm18 18h18v18H50ZM16 30h16V16Q21 17 16 30ZM68 30h18Q83 18 68 16ZM32 66h18v18L32 69Z\" fill=\"#fff4dc\" stroke=\"none\"/>", "petal": "<path d=\"M50 42C16 5 3 37 31 50C3 65 23 96 50 61C77 96 97 64 69 50C96 35 80 5 50 42Z\" fill=\"#ffd887\"/><circle cx=\"50\" cy=\"51\" r=\"10\" fill=\"#ef9dbf\"/><path d=\"m21 12 4 6m59 63 5 5\"/>"});
function stickerSvg(key) { if(!doodles[key]) return ''; return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" fill="none" stroke="#151515" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+doodles[key]+'</svg>'; }
function sketchSvg(cls, body) { return '<svg class="'+cls+'" viewBox="0 0 240 420" preserveAspectRatio="none" aria-hidden="true" fill="none" stroke="#151515" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>'; }
$('cabinet').insertAdjacentHTML('afterbegin',sketchSvg('cabinet-ink','<path fill="var(--cab-dark)" d="M15 7 L227 7 Q232 7 236 15 L236 408 Q236 415 229 415 L15 410Z"/><path fill="var(--cab)" d="M14 5 Q7 5 7 13 L7 399 Q7 406 14 406 L222 406 Q229 406 229 399 L229 13 Q229 5 222 5Z"/>'));
$('door').insertAdjacentHTML('afterbegin',sketchSvg('door-ink','<path fill="var(--cab)" d="M15 6 Q8 6 8 14 L8 400 Q8 408 16 408 L223 408 Q230 408 230 400 L230 14 Q230 6 222 6Z"/><path d="M25 21 Q20 21 20 27 L20 387 Q20 393 26 393 L211 393 Q217 393 217 387 L217 27 Q217 21 211 21Z"/><path d="M60 370 Q119 369 178 370 M60 380 Q119 379 178 380"/>'));
document.querySelector('.mini-sticker').innerHTML=stickerSvg('☺');



let saved = {}; try { saved = JSON.parse(localStorage.getItem('cabinet-concept-v1')) || {}; } catch {}
const state = {name: typeof saved.name === 'string' && saved.name.trim() ? nameCharacters(saved.name.trim()).slice(0,NAME_LIMIT).join('') : '요니', color: Number.isInteger(saved.color) && colors[saved.color] ? saved.color : 0, sticker: ['♡','✿','✧','☺','cherry','planet','bow','bolt','cloud','pepero','music','sun','clover','cat','spark','strawberry','butterfly','loveletter','checkerheart','petal'].includes(saved.sticker) ? saved.sticker : '✧'};
const legacyStickers = [['sticker',.60,62],['stickerBottom',.75,46]].flatMap(([slot,y,size],index)=>{
 const key=saved[slot]===null?null:(Object.hasOwn(doodles,saved[slot])?saved[slot]:(index?'☺':'✧'));
 return key?[{id:'legacy-'+index,key,x:saved.positions?.[slot]?.x??.5,y:saved.positions?.[slot]?.y??y,size}]:[];
});
state.decorations=(Array.isArray(saved.decorations)?saved.decorations:legacyStickers)
 .filter(item=>item && Object.hasOwn(doodles,item.key))
 .map((item,index)=>({id:'sticker-'+index,key:item.key,x:Number.isFinite(item.x)?Math.max(.14,Math.min(.85,item.x)):.5,y:Number.isFinite(item.y)?Math.max(.30,Math.min(.86,item.y)):.6,size:item.size===46?46:62}));
let activeStickerSlot = null;
let timer;
function toast(message) { $('toast').textContent=message; $('toast').classList.add('show'); clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),2200); }
function save() { try {localStorage.setItem('cabinet-concept-v1',JSON.stringify(state));} catch {toast('저장 공간을 사용할 수 없어 이번 화면에만 적용했어요.');} }
function render() {
 syncEditorPreview();
 $('plateName').textContent=state.name; 
 syncDecorations($('door'),false);
 const c=colors[state.color]; ['--cab','--cab-dark','--cab-light'].forEach((key,i)=>document.documentElement.style.setProperty(key,c[i+1]));
 document.querySelectorAll('.swatch').forEach((b,i)=>{b.classList.toggle('selected',i===state.color);b.setAttribute('aria-pressed',i===state.color);});
 document.querySelectorAll('.sticker').forEach(b=>{b.classList.toggle('selected',b.dataset.sticker===state.decorations.find(item=>item.id===activeStickerSlot)?.key);b.setAttribute('aria-pressed',b.dataset.sticker===state.decorations.find(item=>item.id===activeStickerSlot)?.key);});
}
colors.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.className='swatch';b.style.background=c[1];b.setAttribute('aria-label',c[0]);b.onclick=()=>{state.color=i;render();};$('swatches').append(b);});
['♡','✿','✧','☺','cherry','planet','bow','bolt','cloud','pepero','music','sun','clover','cat','spark','strawberry','butterfly','loveletter','checkerheart','petal'].forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.className='sticker';b.dataset.sticker=s;b.innerHTML=stickerSvg(s);b.setAttribute('aria-label',['하트','꽃','별','스마일','체리','행성','리본','번개','구름','초콜릿','음표','해님','클로버','고양이','반짝임','딸기','나비','편지봉투','체커보드 하트','네잎꽃'][i]+' 스티커');b.onclick=()=>{
 const index=state.decorations.length;
 const item={id:crypto.randomUUID(),key:s,x:.27+(index%3)*.22,y:.59+(Math.floor(index/3)%3)*.10,size:62};
 state.decorations.push(item);activeStickerSlot=item.id;render();
};$('stickers').append(b);});
function cabinetPhase(now = new Date()) {
 if (new URLSearchParams(location.search).get('previewState') === 'unpaid') return 'payment';
 const opening = Date.parse('2026-11-11T00:00:00+09:00');
 const deadline = Date.parse('2026-11-12T00:00:00+09:00');
 return now.getTime() < opening ? 'waiting' : now.getTime() < deadline ? 'payment' : 'ended';
}
function showCabinetAccess() {
 if (cabinetPaymentCompleted) { openPaidCabinet(); return; }
 const phase = cabinetPhase();
 if (phase === 'waiting') {
  info('11월 11일에 열 수 있어요!', '보내온 마음은 그날까지 소중히 보관할게요. 11월 11일 00:00부터 990원으로 이번 행사에서 받은 선물을 모두 열어볼 수 있어요.');
 } else if (phase === 'payment') {
  info('나에게 누가 초콜릿을 보냈는지 확인할까요?', '990원을 한 번 결제하면 보낸 사람과 편지, 꾸민 초콜릿을 모두 볼 수 있어요. 결제 후 추가로 받은 선물도 포함돼요.');
  $('okay').textContent='990원으로 모두 열기';
  $('okay').onclick=showPaymentReview;
 } else {
  info('이번 이벤트 결제가 마감됐어요', '결제 가능 시간은 11월 11일 밤 11:59까지예요. 이미 결제한 선물의 열람은 계정·결제 내역 연동 후 제공돼요.');
 }
}
function showPaymentReview() {
 $('infoTitle').textContent='선물 열람 결제';
 $('infoBody').textContent='이번 행사에서 받은 모든 초콜릿 · 990원, 1회 결제. 이후 추가로 받은 선물도 재결제 없이 확인할 수 있어요.';
 $('paymentNotice').hidden=false;
 $('okay').textContent='확인했어요';
 $('okay').onclick=()=>$('info').close();
}
$('cabinet').classList.add('closed');
$('handle').setAttribute('aria-label','캐비넷 열람 안내');
$('gift').tabIndex=-1;
$('handle').onclick=showCabinetAccess;
let editorSnapshot;
function edit(){ activeStickerSlot=null; editorSnapshot=JSON.parse(JSON.stringify(state)); $('name').value=state.name; $('editor').returnValue=''; setNameError(''); buildEditorPreview(); render(); $('editor').showModal(); selectEditorTab('stickers'); resizeEditorCabinet(); }
$('editor').addEventListener('close',()=>{if($('editor').returnValue!=='save' && editorSnapshot){Object.assign(state,editorSnapshot);render();} editorSnapshot=null;});
$('customize').onclick=edit; $('nameplate').onclick=edit;
function setNameError(message) {
 $('nameError').textContent=message;
 $('nameError').hidden=!message;
 if(message) { $('name').setAttribute('aria-invalid','true'); $('name').setAttribute('aria-describedby','nameError'); }
 else { $('name').removeAttribute('aria-invalid'); $('name').removeAttribute('aria-describedby'); }
}
function validateName() {
 const name=$('name').value.trim();
 const error=!name ? '캐비넷 이름을 입력해 주세요.' : nameCharacters(name).length>NAME_LIMIT ? '이름은 6자까지 입력할 수 있어요.' : '';
 setNameError(error);
 return !error;
}
$('editForm').onsubmit=e=>{
 if(e.submitter?.value!=='save') return;
 if(!validateName()){e.preventDefault();selectEditorTab('name');$('name').focus();return;}
 state.name=$('name').value.trim();render();save();toast('캐비넷 꾸미기를 저장했어요');
};
$('name').oninput=()=>{validateName();syncEditorPreview();};
$('name').onblur=validateName;

function info(title,body){$('infoTitle').textContent=title;$('infoBody').textContent=body;$('paymentNotice').hidden=true;$('okay').textContent='알겠어요';$('okay').onclick=()=>$('info').close();if(!$('info').open)$('info').showModal();}
$('gift').onclick=()=>info('마음을 담은 편지','달콤한 하루가 되길 바라요! 응원하는 마음을 담아서 보냈어요. — 미리보기용 샘플 편지');
function cabinetShareLink(){
 const link=new URL("visitor.html",location.href);
 let school=null; try {school=JSON.parse(localStorage.getItem("yoniverse-school-preview-v1"));} catch {}
 link.searchParams.set("cabinet",JSON.stringify({name:state.name,color:state.color,decorations:state.decorations,school}));
 for(const key of [...link.searchParams.keys()]) if(key.startsWith('preview')) link.searchParams.delete(key);
 link.hash='';
 return link.href;
}
$('invite').onclick=async()=>{
 const link=cabinetShareLink();
 try { await navigator.clipboard.writeText(link); toast('링크를 복사했어요. 친구들에게 공유해요!'); }
 catch { info('링크를 직접 복사해 주세요',link); }
};
$('closeInfo').onclick=()=>$('info').close();$('okay').onclick=()=>$('info').close();
render();

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

$('door').insertAdjacentHTML('beforeend', '<button class="padlock" id="padlock" aria-label="자물쇠 열기"><svg viewBox="0 0 50 66" aria-hidden="true"><path class="lock-shackle" d="M13 29 V17 C13 1 37 1 37 17 V30" fill="none" stroke="#282830" stroke-width="9" stroke-linecap="round"/><path class="lock-shackle" d="M13 29 V17 C13 1 37 1 37 17 V30" fill="none" stroke="#e1e3e9" stroke-width="5" stroke-linecap="round"/><rect x="5" y="26" width="40" height="33" rx="6" fill="#ffe18a" stroke="#25242c" stroke-width="2.5"/><path d="M10 31 H40" stroke="#fff4c7" stroke-width="3" stroke-linecap="round"/><circle cx="25" cy="41" r="4" fill="#49424c"/><path d="M25 43 V49" stroke="#49424c" stroke-width="4" stroke-linecap="round"/></svg></button>');
$('padlock').onclick=showCabinetAccess;
// Clip the moving reflection to the lock body and metal shackle.
const lockSvg = $('padlock').querySelector('svg');
lockSvg.insertAdjacentHTML('afterbegin', '<defs><clipPath id="lock-shimmer-clip"><path d="M13 29 V17 C13 1 37 1 37 17 V30" fill="none" stroke="white" stroke-width="9"/><rect x="5" y="26" width="40" height="33" rx="6"/></clipPath><linearGradient id="lock-shimmer-gradient"><stop offset="0" stop-color="#fff6b0" stop-opacity="0"/><stop offset=".36" stop-color="#fff6b0" stop-opacity=".65"/><stop offset=".5" stop-color="#fff"/><stop offset=".64" stop-color="#fffde8" stop-opacity=".85"/><stop offset="1" stop-color="#fff6b0" stop-opacity="0"/></linearGradient></defs>');
lockSvg.insertAdjacentHTML('beforeend', '<g clip-path="url(#lock-shimmer-clip)" class="lock-shimmer-surface"><path class="lock-shimmer-band" d="M-27 -10 H-12 L14 76 H-1Z" fill="url(#lock-shimmer-gradient)"/></g>');


// Gifts enter through this slot while the cabinet door stays locked.
$('door').insertAdjacentHTML('beforeend','<div class="gift-slot" role="img" aria-label="포장한 초콜릿을 넣는 선물 투입구"><span class="slot-lip"></span><span class="slot-opening"></span><span class="slot-caption">마음 넣는 곳 ↓</span></div>');

// Prototype access state. The payment integration must supply the verified
// entitlement; closing the payment explanation does not count as payment.
let cabinetPaymentCompleted = false;
let lockEffectTimer;
let previewLockEffects = new URLSearchParams(location.search).get('previewEffects') === '1';
$('door').insertAdjacentHTML('beforeend', '<div class="lock-sparkles" id="lockSparkles" aria-hidden="true">' +
 ['♡','✧','loveletter','pepero','♡','☺','loveletter','✧','pepero','✧','♡','☺'].map((key,i)=>'<span class="lock-particle particle-'+i+'">'+stickerSvg(key)+'</span>').join('') + '</div>');
function shouldCelebrateLock(now, paid) {
 return !paid && cabinetPhase(now) === 'payment';
}
function syncLockEffects(now = new Date()) {
 const active = !cabinetPaymentCompleted && (previewLockEffects || shouldCelebrateLock(now, cabinetPaymentCompleted));
 $('padlock').classList.toggle('celebrating', active);
 $('lockSparkles').classList.toggle('celebrating', active);
 clearTimeout(lockEffectTimer);
 const nextBoundary = cabinetPhase(now) === 'waiting'
  ? Date.parse('2026-11-11T00:00:00+09:00')
  : Date.parse('2026-11-12T00:00:00+09:00');
 if (nextBoundary > now.getTime()) {
  lockEffectTimer = setTimeout(syncLockEffects, Math.min(nextBoundary - now.getTime(), 2147483647));
 }
}
function setCabinetPaymentStatus(paid) {
 cabinetPaymentCompleted = paid === true;
 syncLockEffects();
 if (cabinetPaymentCompleted) openPaidCabinet();
}
document.addEventListener('visibilitychange', () => {
 if (!document.hidden) syncLockEffects();
});
syncLockEffects();

// Preview changes only decoration, never the event date or payment access.
const effectPreviewButton = document.createElement('button');
effectPreviewButton.className = 'effect-preview';
effectPreviewButton.type = 'button';
function renderEffectPreviewButton() {
 effectPreviewButton.textContent = previewLockEffects ? '(내부) 효과 미리보기 끄기' : '(내부) 11/11 효과 미리보기 ✧';
 effectPreviewButton.setAttribute('aria-pressed', String(previewLockEffects));
}
effectPreviewButton.onclick = () => {
 previewLockEffects = !previewLockEffects;
 renderEffectPreviewButton();
 syncLockEffects();
};
document.querySelector('.stage').append(effectPreviewButton);
renderEffectPreviewButton();

// Visual demo state is stored separately; it is never a real payment entitlement.
let cabinetOpenTimer;
let cabinetUnlocking = false;
const paymentPreviewButton = document.createElement('button');
paymentPreviewButton.type = 'button';
paymentPreviewButton.className = 'payment-preview';
paymentPreviewButton.textContent = '(내부) 결제 완료 장면 미리보기';
const previewControls = document.createElement('div');
previewControls.className = 'preview-controls';
document.querySelector('.stage').append(previewControls);
previewControls.append(effectPreviewButton, paymentPreviewButton);
function openPaidCabinet() {
 if (cabinetUnlocking || !$('cabinet').classList.contains('closed')) return;
 if ($('padlock').classList.contains('unlocked')) {
  $('cabinet').classList.remove('closed');
  $('gift').tabIndex = 0;
  paymentPreviewButton.textContent = '(내부) 캐비넷 문 닫기';
  return;
 }
 cabinetUnlocking = true;
 $('padlock').disabled = true;
 $('padlock').classList.add('unlocking');
 paymentPreviewButton.disabled = true;
 paymentPreviewButton.textContent = '(내부) 소중한 마음을 여는 중…';
 const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
 cabinetOpenTimer = setTimeout(() => {
  $('padlock').classList.add('unlocked');
  $('cabinet').classList.remove('closed');
  $('gift').tabIndex = 0;
  cabinetUnlocking = false;
  paymentPreviewButton.disabled = false;
  $('padlock').classList.remove('unlocking');
  $('padlock').disabled = false;
  $('padlock').setAttribute('aria-label','열린 자물쇠 · 캐비넷 열기');
  paymentPreviewButton.textContent = '(내부) 캐비넷 문 닫기';
 }, reducedMotion ? 0 : 1000);
}
paymentPreviewButton.onclick = () => {
 if (cabinetPaymentCompleted) {
  if ($('cabinet').classList.contains('closed')) openPaidCabinet();
  else {
   $('letterReader')?.close();
   $('cabinet').classList.add('closed');
   $('gift').tabIndex = -1;
   paymentPreviewButton.textContent = '(내부) 캐비넷 문 열기';
  }
 } else {
  try { localStorage.setItem('cabinet-payment-visual-demo-v1', 'completed'); } catch {}
  effectPreviewButton.disabled = true;
  setCabinetPaymentStatus(true);
 }
};
// Restore only this prototype's visual demo, never production payment access.
try {
 if (new URLSearchParams(location.search).get('previewState') !== 'unpaid' && localStorage.getItem('cabinet-payment-visual-demo-v1') === 'completed') {
  cabinetPaymentCompleted = true;
  $('padlock').classList.add('unlocked');
  $('padlock').setAttribute('aria-label','열린 자물쇠 · 캐비넷 열기');
  effectPreviewButton.disabled = true;
  paymentPreviewButton.textContent = '(내부) 캐비넷 문 열기';
  syncLockEffects();
 }
} catch {}

// This notice is shown only while the paid cabinet is open.
const cabinetPrivacyNotice = document.createElement('p');
cabinetPrivacyNotice.className = 'cabinet-privacy-notice';
cabinetPrivacyNotice.textContent = '열린 나의 캐비넷은 다른 사람이 볼 수 없어요.';
cabinetPrivacyNotice.setAttribute('role', 'status');
$('cabinet').prepend(cabinetPrivacyNotice);

// Dedicated interior preview keeps sample gifts separate from real entitlements.
if (new URLSearchParams(location.search).get('previewInterior') === '1') {
 cabinetPaymentCompleted = true;
 $('padlock').classList.add('unlocked');
 $('cabinet').classList.remove('closed');
 $('gift').tabIndex = 0;
 effectPreviewButton.disabled = true;
 paymentPreviewButton.textContent = '(내부) 캐비넷 문 닫기';
 syncLockEffects();
}

// Sample senders and letters for the interior prototype only.
const sampleGiftLetters = {
 pink: {name:'소희', instagram:'@sohee_sample', message:'좋아하는 분홍색으로 포장했어요! 바쁜 하루에도 달콤하게 웃는 순간이 많았으면 좋겠어요. 달콤한 하루 보내요!'},
 yellow: {name:'민준', instagram:'@minjun_sample', message:'어떤 말을 전할까 고민하다가, 오늘은 고맙다는 말을 하고 싶었어요. 별것 아닌 이야기에도 함께 웃어주고, 힘든 날에는 조용히 내 편이 되어줘서 고마워요. 이 초콜릿에는 좋아하는 달콤함과 내가 전하고 싶은 마음을 가득 담았어요. 앞으로도 맛있는 것 먹고, 예쁜 곳 구경하고, 소소한 추억을 많이 만들어요. 오늘 하루도 자신답게 반짝이길 바라요. 늘 응원할게요!'},
 purple: {name:'하린', instagram:'@harin_sample', message:'좋아하는 보라색으로 골랐어요. 사소한 순간에도 곁에서 응원하는 사람이 있다는 걸 기억해 줘요. 우리 곧 만나요 ✧'}
};
document.body.insertAdjacentHTML('beforeend', `<dialog id="letterReader" class="letter-reader" aria-labelledby="letterFrom"><button type="button" class="letter-close" aria-label="편지 접어두기">×</button><div class="letter-scene"><div class="envelope-back" aria-hidden="true"></div><div class="envelope-flap" aria-hidden="true"><svg viewBox="0 0 400 100" preserveAspectRatio="none"><path d="M0 100 L178 10 Q200 -2 222 10 L400 100Z" fill="var(--envelope-flap-tone)"/></svg></div><article class="letter-paper"><h2 id="letterTo"></h2><p id="letterMessage" class="letter-handwriting"></p><div class="letter-signature"><h3 id="letterFrom"></h3><span id="letterAccount"></span></div><small class="letter-sample">미리보기용 샘플 편지</small></article><div class="envelope-front" aria-hidden="true"><svg viewBox="0 0 400 180" preserveAspectRatio="none"><path d="M0 26 Q0 18 8 20 L182 40 Q200 43 218 40 L392 20 Q400 18 400 26 V158 Q400 180 378 180 H22 Q0 180 0 158Z" fill="var(--envelope-color)"/><path d="M1 20 L166 108 8 170 Q0 164 0 154Z M399 20 L234 108 392 170 Q400 164 400 154Z" fill="var(--envelope-fold-tone)"/><path d="M7 173 L184 99 Q200 91 216 99 L393 173 Q387 180 378 180 H22 Q13 180 7 173Z" fill="var(--envelope-color)"/></svg><span>a little note for you</span></div></div><button type="button" class="letter-keep">편지 접어두기</button></dialog>`);
let letterCloseAnimations = [];
async function foldLetterAway() {
 const reader = $('letterReader');
 if (!reader.open || reader.classList.contains('folding-away')) return;
 if (matchMedia('(prefers-reduced-motion: reduce)').matches) { reader.close(); return; }
 const paper = reader.querySelector('.letter-paper');
 const sheet = document.createElement('div');
 sheet.className = 'folded-sheet';
 sheet.setAttribute('aria-hidden','true');
 sheet.inert = true;
 const height = paper.offsetHeight;
 Object.assign(sheet.style,{left:paper.offsetLeft+'px',top:paper.offsetTop+'px',width:paper.offsetWidth+'px',height:height+'px'});
 sheet.style.setProperty('--half-paper',height/2+'px');

 for (const side of ['top','bottom']) {
  const half = document.createElement('div');
  half.className = 'fold-half fold-'+side;
  const face = document.createElement('div');
  face.className = 'fold-face';
  const copy = paper.cloneNode(true);
  copy.removeAttribute('id');
  copy.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  Object.assign(copy.style,{width:paper.offsetWidth+'px',height:height+'px',margin:'0'});
  face.append(copy);
  half.append(face);
  if (side === 'top') {
   const back = document.createElement('div');
   back.className = 'fold-reverse';
   half.append(back);
  }
  sheet.append(half);
 }
 reader.querySelector('.letter-scene').append(sheet);

 const scene = reader.querySelector('.letter-scene');
 const back = reader.querySelector('.envelope-back');
 const front = reader.querySelector('.envelope-front');
 const flap = reader.querySelector('.envelope-flap');
 const foldedScale = Math.min(1, 124 / (height / 2));
 sheet.style.transformOrigin = '50% 100%';
 const sceneHeight = scene.offsetHeight;
 const liftedY = sceneHeight - 180 - 18 - height - paper.offsetTop;
 const insertedY = sceneHeight - 8 - height - paper.offsetTop;
 reader.classList.add('folding-away');
 reader.setAttribute('aria-busy','true');
 const move = (element, frames, duration, delay = 0) => {
  const animation = element.animate(frames, {duration,delay,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
  letterCloseAnimations.push(animation);
  return animation.finished;
 };
 try {
  // The flap stays behind the paper throughout folding and insertion.
  reader.dataset.closeStep = 'fold';
  await move(sheet.querySelector('.fold-top'), [{transform:'rotateX(0deg)'},{transform:'rotateX(-180deg)'}], 260);
  reader.dataset.closeStep = 'align';
  await move(sheet,[{transform:'translateY(0) scale(1)'},{transform:`translateY(${liftedY}px) scale(${foldedScale})`}],180);
  reader.dataset.closeStep = 'insert';
  await move(sheet,[{transform:`translateY(${liftedY}px) scale(${foldedScale})`},{transform:`translateY(${insertedY}px) scale(${foldedScale})`}],330);
  sheet.style.visibility = 'hidden';
  reader.dataset.closeStep = 'seal';
  flap.style.zIndex = '6';
  await move(flap,[{transform:'rotateX(0deg)'},{transform:'rotateX(-180deg)'}],180);
  reader.dataset.closeStep = 'fade';
  await move(scene,[{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],150,50);
  reader.close();
 } catch { /* Closing or leaving the preview cancels its animations. */ }
}
$('letterReader').querySelector('.letter-close').onclick = foldLetterAway;
$('letterReader').querySelector('.letter-keep').onclick = foldLetterAway;
$('letterReader').addEventListener('cancel', event => { event.preventDefault(); foldLetterAway(); });
$('letterReader').addEventListener('close', () => {
 letterCloseAnimations.forEach(animation => animation.cancel());
 letterCloseAnimations = [];
 $('letterReader').querySelector('.envelope-flap').style.zIndex = '';
 delete $('letterReader').dataset.closeStep;
 $('letterReader').querySelector('.folded-sheet')?.remove();
 $('letterReader').classList.remove('folding-away');
 $('letterReader').removeAttribute('aria-busy');
});
function showGiftLetter(key) {
 if (!cabinetPaymentCompleted || $('cabinet').classList.contains('closed')) return;
 const gift = sampleGiftLetters[key];
 if (!gift) return;
 $('letterTo').textContent = 'To. ' + state.name;
 $('letterMessage').textContent = gift.message;
 $('letterFrom').textContent = 'From. ' + gift.name;
 $('letterAccount').textContent = gift.instagram;
 $('letterReader').style.setProperty('--envelope-color', {pink:'#ffc1d7',yellow:'#ffe792',purple:'#d5c4f8'}[key]);
 const paperHeight = $('letterReader').querySelector('.letter-paper');
 $('letterReader').showModal();
 $('letterReader').style.setProperty('--letter-slide-distance', (paperHeight.getBoundingClientRect().height + 28) + 'px');
}
document.querySelectorAll('[data-gift]').forEach(button => {
 button.onclick = () => showGiftLetter(button.dataset.gift);
});
$('gift').onclick = () => showGiftLetter('pink');

if (new URLSearchParams(location.search).get('previewLetter') === '200') showGiftLetter('yellow');

// Typeface comparison for the prototype; the sender's choice will be stored with the letter.
const letterFontPreview = document.createElement('fieldset');
letterFontPreview.className = 'letter-font-preview';
letterFontPreview.innerHTML = '<legend>서체 미리보기</legend><button type="button" data-letter-font="cute">귀여운 손글씨</button><button type="button" data-letter-font="neat">단정한 손글씨</button><button type="button" data-letter-font="clean">깔끔한 기본체</button>';
$('letterReader').append(letterFontPreview);
function selectLetterFont(font) {
 $('letterReader').dataset.font = font;
 letterFontPreview.querySelectorAll('button').forEach(button => {
  button.setAttribute('aria-pressed',String(button.dataset.letterFont === font));
 });
}
letterFontPreview.querySelectorAll('button').forEach(button => {
 button.onclick = () => selectLetterFont(button.dataset.letterFont);
});
selectLetterFont('cute');

// Closed cabinets must not expose shelf controls to keyboard navigation.
function syncCabinetInterior() {
 const closed = $('cabinet').classList.contains('closed');
 document.querySelector('.gift-interior').inert = closed;
}
new MutationObserver(syncCabinetInterior).observe($('cabinet'), {attributes:true, attributeFilter:['class']});
syncCabinetInterior();


// Full-screen workspace: preview, one tool panel, and a pinned save action.
const editorForm=$('editForm');
const editorHeader=document.createElement('div');editorHeader.className='editor-header';
editorHeader.append($('editorTitle'),editorForm.querySelector('.close'));
const editorLayout=document.createElement('div');editorLayout.className='editor-layout';
const editorPreview=document.createElement('div');editorPreview.id='editorPreview';editorPreview.className='editor-preview';
editorPreview.setAttribute('role','group');editorPreview.setAttribute('aria-label','꾸미는 캐비넷 미리보기');
const editorTools=document.createElement('div');editorTools.className='editor-tools';
const editorTabs=document.createElement('div');editorTabs.className='editor-tabs';editorTabs.setAttribute('role','tablist');editorTabs.setAttribute('aria-label','꾸미기 도구');
const namePanel=document.createElement('div');namePanel.id='tool-name';namePanel.className='editor-panel';
namePanel.append(editorForm.querySelector('label'),$('name'),$('nameError'));
const colorPanel=$('swatches').closest('fieldset');colorPanel.id='tool-color';colorPanel.classList.add('editor-panel');
const stickerPanel=$('stickers').closest('fieldset');stickerPanel.id='tool-stickers';stickerPanel.classList.add('editor-panel');
const hint=document.createElement('p');hint.className='sticker-hint';hint.textContent='누르면 새로 붙어요 · 붙인 스티커는 끌어서 옮겨요';stickerPanel.insertBefore(hint,$('stickers'));
const deleteSticker=document.createElement('button');deleteSticker.type='button';deleteSticker.className='delete-sticker';deleteSticker.textContent='스티커 모두 삭제';
deleteSticker.onclick=()=>{state.decorations=[];activeStickerSlot=null;render();};stickerPanel.append(deleteSticker);
for(const [key,label] of [['name','이름'],['color','컬러'],['stickers','스티커']]){
 const button=document.createElement('button');button.type='button';button.textContent=label;button.id='tab-'+key;button.dataset.tool=key;button.setAttribute('role','tab');button.setAttribute('aria-controls','tool-'+key);button.onclick=()=>selectEditorTab(key);editorTabs.append(button);
 const panel={name:namePanel,color:colorPanel,stickers:stickerPanel}[key];panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',button.id);
}
editorTools.append(editorTabs,namePanel,colorPanel,stickerPanel);
const editorFooter=document.createElement('div');editorFooter.className='editor-footer';editorFooter.append(editorForm.querySelector('.primary'));
editorLayout.append(editorPreview,editorTools);editorForm.replaceChildren(editorHeader,editorLayout,editorFooter);
function selectEditorTab(key){
 editorTabs.querySelectorAll('button').forEach(b=>{const selected=b.dataset.tool===key;b.setAttribute('aria-selected',String(selected));});
 [namePanel,colorPanel,stickerPanel].forEach(panel=>panel.hidden=panel.id!=='tool-'+key);
 editorPreview.classList.toggle('placing-stickers',key==='stickers');
}
function resizeEditorCabinet(){
 const box=$('editorPreview');if(!box || !$('editor').open)return;
 const mobileFactor = window.matchMedia('(max-width:650px)').matches ? .9 : 1;
 box.style.setProperty('--editor-scale',Math.max(.1,Math.min((box.clientHeight-30)/416,(box.clientWidth-50)/234,1.45))*mobileFactor);
}
new ResizeObserver(resizeEditorCabinet).observe(editorPreview);
function syncDecorations(door,editable){
 door.querySelectorAll('.door-sticker,.mini-sticker').forEach(el=>el.remove());
 door.querySelectorAll('.placed-sticker').forEach(el=>{if(!state.decorations.some(item=>item.id===el.dataset.stickerId))el.remove();});
 for(const item of state.decorations){
  let el=Array.from(door.querySelectorAll('.placed-sticker')).find(el=>el.dataset.stickerId===item.id);
  if(!el){
   el=document.createElement(editable?'button':'div');el.className='placed-sticker'+(editable?' sticker-target':'');el.dataset.stickerId=item.id;
   el.innerHTML=stickerSvg(item.key);
   if(editable){
    el.type='button';el.setAttribute('aria-label','붙인 스티커 '+(state.decorations.indexOf(item)+1)+' 이동');
    el.onclick=()=>{activeStickerSlot=item.id;selectEditorTab('stickers');render();};
    el.onpointerdown=event=>{
     if(event.button!==0)return;event.preventDefault();activeStickerSlot=item.id;selectEditorTab('stickers');render();el.setPointerCapture(event.pointerId);
     const rect=door.getBoundingClientRect(),origin={x:item.x,y:item.y},start={x:event.clientX,y:event.clientY};
     el.onpointermove=move=>{item.x=Math.max(.14,Math.min(.85,origin.x+(move.clientX-start.x)/rect.width));item.y=Math.max(.30,Math.min(.86,origin.y+(move.clientY-start.y)/rect.height));syncDecorations(door,true);syncDecorations($('door'),false);};
     const stop=()=>{el.onpointermove=null;el.onpointerup=null;el.onpointercancel=null;};el.onpointerup=stop;el.onpointercancel=stop;
    };
    el.onkeydown=event=>{
     if(event.key==='Delete'||event.key==='Backspace'){event.preventDefault();state.decorations=state.decorations.filter(sticker=>sticker.id!==item.id);activeStickerSlot=null;render();return;}
     const delta={ArrowLeft:[-.02,0],ArrowRight:[.02,0],ArrowUp:[0,-.02],ArrowDown:[0,.02]}[event.key];
     if(!delta)return;event.preventDefault();activeStickerSlot=item.id;item.x=Math.max(.14,Math.min(.85,item.x+delta[0]));item.y=Math.max(.30,Math.min(.86,item.y+delta[1]));render();
    };
   }
   door.append(el);
  }
  el.style.left=item.x*100+'%';el.style.top=item.y*100+'%';el.style.width=item.size+'px';el.style.height=item.size+'px';
  if(editable){el.setAttribute('aria-label','붙인 스티커 '+(state.decorations.indexOf(item)+1)+' 이동');const selected=item.id===activeStickerSlot;el.classList.toggle('selected-slot',selected);el.setAttribute('aria-pressed',String(selected));}
 }
 if(editable){
  let remove=door.querySelector('.remove-placed-sticker');
  if(!remove){
   remove=document.createElement('button');remove.type='button';remove.className='remove-placed-sticker';remove.textContent='×';remove.setAttribute('aria-label','선택한 스티커 삭제');
   remove.onclick=()=>{state.decorations=state.decorations.filter(item=>item.id!==activeStickerSlot);activeStickerSlot=null;render();$('stickers').querySelector('button')?.focus({preventScroll:true});};
   door.append(remove);
  }
  const selected=state.decorations.find(item=>item.id===activeStickerSlot);
  remove.hidden=!selected;
  if(selected){remove.style.left='calc('+selected.x*100+'% + '+selected.size/2+'px)';remove.style.top='calc('+selected.y*100+'% - '+selected.size/2+'px)';}
 }
}
function buildEditorPreview(){
 const cabinet=$('cabinet').cloneNode(true);cabinet.className='cabinet closed editor-cabinet';cabinet.removeAttribute('id');cabinet.removeAttribute('style');
 cabinet.querySelectorAll('button').forEach(b=>{b.disabled=true;b.tabIndex=-1;});
 cabinet.querySelectorAll('.inside,.cabinet-privacy-notice,.lock-sparkles,.lock-shimmer-surface,defs').forEach(el=>el.remove());
 cabinet.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 cabinet.querySelectorAll('.celebrating,.unlocking').forEach(el=>el.classList.remove('celebrating','unlocking'));
 cabinet.querySelectorAll('.placed-sticker').forEach(el=>el.remove());
 $('editorPreview').replaceChildren(cabinet);syncEditorPreview();
}
function syncEditorPreview(){
 const preview=$('editorPreview');if(!preview?.firstElementChild)return;
 preview.querySelector('.nameplate span').textContent=nameCharacters($('name').value.trim()).slice(0,NAME_LIMIT).join('')||'내 이름';
 syncDecorations(preview.querySelector('.door'),true);
 deleteSticker.hidden=state.decorations.length===0;
}
selectEditorTab('stickers');
