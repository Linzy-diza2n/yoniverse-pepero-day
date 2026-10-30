const key='gift-draft:demo-yoni:v1';
let draft={};
try{const stored=JSON.parse(sessionStorage.getItem(key));if(stored && typeof stored==='object' && !Array.isArray(stored))draft=stored;}catch{}
const wraps=[['bag','투명비닐'],['box','선물상자'],['bouquet','꽃다발 포장']];
const ribbons=[['pink','핑크','#e997b8'],['brown','초코','#704332'],['cream','크림','#f6dfa0'],['blue','소다','#8cc7dd'],['purple','라일락','#b9a2dc']];
if(draft.topping==='pretzel')draft.topping='daisy';
const toppingValues=['none','nuts','star-pop','bow-pop','heart-pop','daisy',...['white','dark','pink'].flatMap(c=>['square','heart','star'].map(s=>c+'-'+s))];
if(!['heart','stick'].includes(draft.shape))location.replace('make-gift.html');
for(const [field,allowed,fallback] of [['coating',['brown','pink','white'],'brown'],['drizzle',['none','white','dark','pink'],'none'],['topping',toppingValues,'none'],['wrap',wraps.map(x=>x[0]),'bag'],['ribbon',ribbons.map(x=>x[0]),'pink']])if(!allowed.includes(draft[field]))draft[field]=fallback;
function save(){try{sessionStorage.setItem(key,JSON.stringify(draft));}catch{const e=document.getElementById('saveError');e.hidden=false;e.textContent='이 브라우저에서는 포장을 저장할 수 없어요.';}}
function tinyHeart(x,y,size,fill){return `<path d="M0 4 C-10 -2 -6 -9 0 -4 C6 -9 10 -2 0 4Z" transform="translate(${x} ${y}) scale(${size})" fill="${fill}"/>`;}
function giftTag(x,y,angle=0){return `<g transform="translate(${x} ${y}) rotate(${angle})"><path d="M0 -16 Q-18 -12 -9 5" fill="none" stroke="#b28f68" stroke-width="1.2"/><path d="M-17 3 Q0 -4 17 3 L19 32 Q0 39 -19 32Z" fill="#fff9e8" stroke="#d7bc9e" stroke-width="1"/><circle cx="0" cy="5" r="2" fill="#d7bc9e"/>${tinyHeart(0,19,.95,'#d894a7')}<path d="M-8 28 H8" stroke="#dac5a9" stroke-width="1"/></g>`;}
function bow(color){return `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M-9 5 C-19 22 -14 43 -36 57 L-18 56 -12 67 C8 47 8 24 10 8 M8 4 C26 23 18 43 42 53 L30 37 46 34 C29 21 32 8 16 0" fill="${color}" stroke="#785460" stroke-opacity=".35" stroke-width="1.2"/>
<path d="M-7 6 C-31 -27 -60 -35 -62 -12 C-68 17 -35 28 -7 9 M7 5 C32 -28 62 -30 63 -8 C65 19 34 26 8 10" fill="${color}" stroke="#785460" stroke-opacity=".4" stroke-width="1.3"/>
<path d="M-57 -10 C-44 -7 -29 2 -9 8 C-37 20 -58 13 -57 -10 M58 -9 C43 -5 29 3 10 9 C39 19 58 12 58 -9" fill="#47242c" opacity=".14"/>
<path d="M-51 -19 Q-33 -22 -13 0 M50 -16 Q32 -20 14 0 M-13 24 Q-12 41 -23 51 M22 19 Q24 30 31 36" fill="none" stroke="#fff" stroke-opacity=".48" stroke-width="3"/>
<path d="M-10 -7 Q0 -12 10 -6 L13 11 Q2 18 -11 10Z" fill="${color}" stroke="#785460" stroke-opacity=".35" stroke-width="1.2"/><path d="M-5 -5 Q-2 1 -4 9" stroke="white" stroke-opacity=".45" stroke-width="2" fill="none"/><path d="M-53 -19 Q-40 -26 -14 -5 M52 -17 Q35 -23 15 -4 M-19 29 Q-20 45 -29 53 M29 22 L37 32" fill="none" stroke="#fff9ee" stroke-opacity=".7" stroke-width="1" stroke-dasharray="2 3"/>${tinyHeart(1,3,.55,'#fff2dd')}</g>`;}
function packageSvg(kind,mini=false){
 const color=ribbons.find(x=>x[0]===draft.ribbon)[2];
 const gift=GiftArt.svg(draft).replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'').replaceAll('coatMask',`coatMask-${kind}-${mini?'small':'large'}`);
 let back='',front='',extra='',transform='',ribbonX=160,ribbonY=80,bowScale=.78;
 if(kind==='bag'){
  back=`<path d="M115 19 Q138 28 160 17 Q183 28 207 18 L193 63 177 83 Q231 106 250 156 L260 296 Q260 316 239 319 L79 319 Q60 316 63 296 L74 153 Q88 108 143 83 L127 63Z" fill="#f1fbfc" fill-opacity=".55" stroke="#abc2c4" stroke-width="1.6"/><path d="M128 28 L146 77 M146 27 L155 76 M176 29 L165 76 M195 28 L175 76" stroke="#b4cdd0" stroke-width="1.3" fill="none"/>`;
  transform='translate(47 107) scale(.81)';
  front='<path d="M110 109 Q84 135 85 170 L76 294 Q78 305 91 305 M221 123 Q238 147 239 173 L249 283" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity=".9"/><path d="M91 298 L143 309 M239 299 L186 309 M78 192 L93 175 M242 229 L231 248" stroke="#bacfd1" stroke-width="1" fill="none"/><path d="M91 135 L102 119" stroke="white" stroke-width="3" stroke-linecap="round"/>';
  extra=[[94,150],[231,166],[82,230],[239,263],[110,303],[210,305]].map(([x,y],i)=>tinyHeart(x,y,.65,i%2?'#fff':'#efb7c8')).join('');
  extra+=giftTag(207,105,14);
 }else if(kind==='box'){
  back=`<rect x="46" y="43" width="239" height="280" rx="17" fill="#ce8b9f"/><rect x="35" y="28" width="242" height="282" rx="17" fill="#f4c5d3" stroke="#b77f8f" stroke-width="1.5"/><path d="M48 34 H264 M42 45 V289" stroke="#ffe8ef" stroke-width="3" fill="none"/><rect x="57" y="53" width="198" height="232" rx="40" fill="#fff8e8" stroke="#d8a8b1" stroke-width="2"/><rect x="64" y="60" width="184" height="218" rx="34" fill="none" stroke="#e9d6bc" stroke-dasharray="2 5"/><path d="M41 287 H273 V304 Q273 311 265 311 H48 Q41 311 41 304Z" fill="${color}" opacity=".85"/>`;
  const scallops=Array.from({length:28},(_,i)=>{const a=i*Math.PI*2/28;return `<circle cx="${156+84*Math.cos(a)}" cy="${166+103*Math.sin(a)}" r="9" fill="#fffdf4" stroke="#e8cbbd" stroke-width=".65"/>`;}).join('');
  back+=scallops+'<ellipse cx="156" cy="166" rx="83" ry="102" fill="#fffdf4"/><ellipse cx="156" cy="166" rx="76" ry="95" fill="none" stroke="#e5c7bb" stroke-width="1" stroke-dasharray="1 4"/>';
  back+='<g stroke="#e7cbb1" stroke-width="2" fill="none" stroke-linecap="round"><path d="M83 231 l10 -5 -2 10 13 -5 M113 258 l8 -8 5 10 10 -6 M168 260 l9 -7 5 8 11 -7 M210 238 l10 -5 -3 10 11 -6"/></g>';
  transform='translate(44 55) scale(.79)';ribbonX=226;ribbonY=276;bowScale=.69;
  front='<path d="M74 101 Q73 70 104 70 M235 235 Q235 265 204 265" fill="none" stroke="white" stroke-width="4" opacity=".85"/><path d="M83 125 L113 85 M96 130 L125 91" stroke="white" stroke-width="6" opacity=".32"/>';
  extra=giftTag(86,294,-12);
 }else{
  back='<path d="M24 92 L88 38 154 64 224 29 294 93 231 261 100 276Z" fill="#f0d1b1" stroke="#c8a686" stroke-width="1.3"/><path d="M47 78 L111 29 167 62 239 43 278 111 215 270 104 269Z" fill="#fff6e6" stroke="#e3ccb3" stroke-width="1.2"/><path d="M62 76 Q93 60 119 44 M189 65 L239 54" stroke="white" stroke-width="4" fill="none"/>';
  back+='<g fill="#dfbfa8" opacity=".65">'+[[81,64],[103,47],[120,58],[216,59],[235,62],[252,80],[67,84],[265,99]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2"/>`).join('')+'</g>';
  transform='translate(45 24) scale(.83)';
  front='<path d="M25 105 Q77 117 165 203 L134 300 93 331 Q79 268 61 209Z" fill="#e9a9bf" stroke="#c489a0" stroke-width="1.2"/><path d="M294 97 Q244 126 158 173 L119 293 222 329 Q240 231 294 97Z" fill="#f6cbd9" stroke="#c891a3" stroke-width="1.2"/><path d="M294 97 Q253 165 214 196 L158 173Z" fill="#ffe7ee"/><path d="M25 105 Q63 151 108 177 L165 203 Q110 141 25 105Z" fill="#f5c2d3"/><path d="M120 293 L93 331 160 309 222 329 206 286Z" fill="#edb6ca" stroke="#c891a3" stroke-width="1"/><path d="M127 268 Q101 210 78 183 M183 263 Q211 224 231 176 M145 301 L122 318" fill="none" stroke="#fff0f6" stroke-width="3" stroke-linecap="round"/>';ribbonY=264;bowScale=.88;
  extra='<g fill="#fff5f7" opacity=".8">'+[[76,184],[88,208],[99,232],[111,255],[211,213],[222,191],[200,237],[188,259]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.3"/>`).join('')+'</g>';
  extra+='<path d="M40 119 Q65 126 89 146 M280 112 Q250 133 228 147" stroke="#fff8f8" stroke-width="2" fill="none" stroke-dasharray="2 4"/>';
  extra+=giftTag(205,295,13);
 }
 return `<svg viewBox="0 0 320 370" aria-hidden="true"><ellipse cx="163" cy="344" rx="99" ry="9" fill="#805436" opacity=".07"/>${back}<g transform="${transform}">${gift}</g>${front}${extra}<g transform="translate(${ribbonX} ${ribbonY}) scale(${bowScale})">${bow(color)}</g></svg>`;
}
function render(){
 document.querySelectorAll('[data-field]').forEach(b=>b.setAttribute('aria-pressed',String(draft[b.dataset.field]===b.dataset.value)));
 document.getElementById('wrappedArt').innerHTML=packageSvg(draft.wrap);
 document.getElementById('wrappedArt').setAttribute('aria-label',`${draft.shape==='heart'?'하트':'막대 5개 세트'} 과자, ${wraps.find(x=>x[0]===draft.wrap)[1]}, ${ribbons.find(x=>x[0]===draft.ribbon)[1]} 리본`);
 document.querySelectorAll('[data-field="wrap"]').forEach(b=>b.querySelector('.wrap-thumb').innerHTML=packageSvg(b.dataset.value,true));
}
for(const [value,label] of wraps){const b=document.createElement('button');b.type='button';b.dataset.field='wrap';b.dataset.value=value;b.setAttribute('aria-label',label);b.innerHTML='<span class="wrap-thumb"></span><span>'+label+'</span>';b.onclick=()=>{draft.wrap=value;save();render();};document.getElementById('wrapOptions').append(b);}
for(const [value,label,color] of ribbons){const b=document.createElement('button');b.type='button';b.dataset.field='ribbon';b.dataset.value=value;b.setAttribute('aria-label',label+' 리본');b.innerHTML=`<svg viewBox="-75 -40 150 115" aria-hidden="true">${bow(color)}</svg><span>${label}</span>`;b.onclick=()=>{draft.ribbon=value;save();render();};document.getElementById('ribbonOptions').append(b);}
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab){tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});}
tabs.forEach((tab,i)=>{tab.onclick=()=>selectTab(tab);tab.onkeydown=e=>{let target;if(e.key==='ArrowLeft'||e.key==='ArrowRight')target=tabs[1-i];if(e.key==='Home')target=tabs[0];if(e.key==='End')target=tabs[1];if(target){e.preventDefault();selectTab(target);target.focus();}};});
save();render();
