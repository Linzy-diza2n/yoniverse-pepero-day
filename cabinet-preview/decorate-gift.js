const key = 'gift-draft:demo-yoni:v1';
let draft = {};
try { const saved = JSON.parse(sessionStorage.getItem(key)); if (saved && typeof saved === 'object' && !Array.isArray(saved)) draft = saved; } catch {}
const shape = new URLSearchParams(location.search).get('shape');
if (['stick','heart'].includes(shape)) draft.shape = shape;
if (!['stick','heart'].includes(draft.shape)) location.replace('make-gift.html');
const colors = {brown:'#7c4c3d',pink:'#f1b1c9',white:'#fff0d6',dark:'#493028'};
const drizzleColors = {...colors, pink:'#d5638f'};
const coatings = [['brown','초코브라운'],['pink','핑크'],['white','화이트초콜릿']];
const toppings = [['none','없음']];
for (const [color,label] of [['white','화이트'],['dark','다크'],['pink','핑크']]) {
 for (const [type,name] of [['square','조각'],['heart','하트'],['star','별']]) toppings.push([color+'-'+type,label+' '+name]);
}
toppings.push(['nuts','견과류'],['star-pop','별톡톡'],['bow-pop','리본톡톡'],['heart-pop','하트톡톡'],['daisy','데이지']);
if(draft.topping==='pretzel')draft.topping='daisy';
const drizzles = [['none','없음'],['white','화이트'],['dark','다크'],['pink','핑크']];
for (const [field,options,fallback] of [['coating',coatings,'brown'],['topping',toppings,'none'],['drizzle',drizzles,'none']]) {
 if (!options.some(([value])=>value===draft[field])) draft[field]=fallback;
}
function save() {
 try { sessionStorage.setItem(key,JSON.stringify(draft)); }
 catch { const error=document.getElementById('saveError'); error.hidden=false; error.textContent='브라우저 저장을 사용할 수 없어 페이지를 나가면 꾸미기가 사라질 수 있어요.'; }
}
function toppingIcon(option) {
 let art;
 if(option === 'none') {
  art='<circle cx="40" cy="39" r="20" fill="none" stroke="#b5a79d" stroke-width="2"/><path d="M26 53 L54 25" stroke="#b5a79d" stroke-width="2"/><text x="40" y="74" text-anchor="middle" font-size="10" fill="#71635e">없음</text>';
 } else if(option.endsWith('-pop') || option === 'nuts') {
  art=[[26,27],[51,29],[39,51],[61,54],[18,52]].map(([x,y],i)=>`<g transform="translate(${x} ${y}) scale(.85)">${topping(0,0,i,option)}</g>`).join('');
 } else {
  art=`<ellipse cx="40" cy="62" rx="20" ry="4" fill="#60402d" opacity=".08"/><g transform="translate(40 39) scale(${option==='daisy'?2.3:2.1})">${topping(0,0,0,option)}</g>`;
 }
 return `<svg viewBox="0 0 80 80" aria-hidden="true" focusable="false">${art}</svg><span class="tile-check" aria-hidden="true">✓</span>`;
}
function ingredientIcon(field,value) {
 const color=(field==='drizzle'?drizzleColors:colors)[value];
 let art;
 if(!color) art='<circle cx="40" cy="40" r="22" fill="none" stroke="#b5a79d" stroke-width="2.5"/><path d="M24 56 L56 24" stroke="#b5a79d" stroke-width="2.5"/>';
 else if(field==='coating') {
  art=`<ellipse cx="41" cy="69" rx="23" ry="4" fill="#60402d" opacity=".09"/><g transform="rotate(-12 40 40)" stroke="#654536" stroke-width="1.4" stroke-linejoin="round"><path d="M20 14 H57 L62 20 V65 H25 L20 60Z" fill="${color}"/><path d="M20 14 L25 20 H62 M25 20 V65" fill="none" opacity=".4"/><rect x="19" y="12" width="38" height="48" rx="3" fill="${color}"/>${[18,32,46].map(y=>[24,40].map(x=>`<rect x="${x}" y="${y}" width="12" height="10" rx="1.5" fill="${color}"/><path d="M${x+2} ${y+7} V${y+2} H${x+9}" fill="none" stroke="white" stroke-opacity=".48" stroke-width="1.5"/>`).join('')).join('')}</g>`;
 } else {
  art=`<ellipse cx="36" cy="70" rx="20" ry="3" fill="#60402d" opacity=".08"/><g transform="rotate(24 40 38)" stroke="#654536" stroke-width="1.5" stroke-linejoin="round"><path d="M26 13 H54 L51 49 Q49 54 44 55 H36 Q31 54 29 49Z" fill="${color}"/><path d="M27 14 H53 L54 8 H26Z" fill="${color}"/><path d="M30 11 H50" fill="none" stroke="white" stroke-opacity=".5"/><path d="M35 55 H45 V60 H35Z" fill="#fff8ea"/><path d="M37 60 H43 L41 70 H39Z" fill="${color}"/><path d="M32 19 L34 43" fill="none" stroke="white" stroke-opacity=".45" stroke-width="3" stroke-linecap="round"/><path d="M35 33 Q40 23 45 33 Q48 40 40 42 Q32 40 35 33Z" fill="#fffaf4" stroke="none" opacity=".65"/></g><path d="M35 71 Q29 66 24 71 T12 71" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>`;
 }
 return `<svg class="ingredient-icon" viewBox="0 0 80 80" aria-hidden="true" focusable="false">${art}</svg>`;
}
function options(id,field,items) {
 const container=document.getElementById(id);
 for (const [value,label] of items) {
  const button=document.createElement('button'); button.type='button'; button.dataset.field=field;button.dataset.value=value;
  button.setAttribute('aria-label',label); button.title=label;
  if (field === 'topping') {
   button.classList.add('topping-tile');
   button.innerHTML = toppingIcon(value);
  }
  else {
   button.innerHTML=ingredientIcon(field,value);
   const labelText=document.createElement('span');labelText.textContent=label;button.append(labelText);
  }
  button.onclick=()=>{draft[field]=value;save();render();};container.append(button);
 }
}
options('coatingOptions','coating',coatings);options('toppingOptions','topping',toppings);options('drizzleOptions','drizzle',drizzles);
function topping(x,y,index,option=draft.topping) {
 if(option==='none')return '';
 const parts=option.split('-');
 const isPink=parts[0]==='pink'||(parts[1]==='pop'&&index%3===0);
 const fill=isPink?'#d9709e':colors[parts[0]] || ['#d9709e','#fff0b1','#9bd3c0'][index%3];
 let type=parts[1] || option;if(parts[1]==='pop')type=parts[0];
 const size=[1.08,.72,.9,1.18,.78,1,.68,.94][index%8];
 const angle=[-18,24,-9,12,-28,20,6,-14][index%8];
 let art='';
 if(type==='heart')art='<path d="M0 6 C-18 -5 -8 -14 0 -6 C8 -14 18 -5 0 6Z"/><path d="M-7 -6 Q-10 -5 -7 -2" fill="none" stroke="#fffaf0" stroke-opacity=".75" stroke-width="1.7" stroke-linecap="round"/>';
 else if(type==='star')art='<path d="M0 -11 L3 -4 11 -3 5 2 7 10 0 6 -7 10 -5 2 -11 -3 -3 -4Z" stroke-linejoin="round"/><path d="M0 -7 L1 -3 5 -2" fill="none" stroke="#fffaf0" stroke-opacity=".65" stroke-width="1.4" stroke-linecap="round"/>';
 else if(type==='bow')art='<path d="M0 0 L-11 -7 Q-16 0 -11 7Z M0 0 L11 -7 Q16 0 11 7Z"/><path d="M-10 -3 L-3 0 M10 -3 L3 0" stroke="#fffaf0" stroke-opacity=".65" stroke-width="1.2"/><rect x="-2.5" y="-3" width="5" height="6" rx="2"/>';
 else if(type==='nuts')art='<path fill="#dca568" d="M-6 -8 Q2 -13 7 -4 L3 5 -5 6 -9 0Z"/><path d="M-4 -6 L1 1 M-1 -8 L4 -2" fill="none" stroke="#966236" stroke-width="1.2"/><path fill="#f3ca8c" d="M-8 6 L-2 3 2 10 -5 12Z"/>';
 else if(type==='daisy')art=`<g stroke="#cba98a" stroke-width=".65">${[0,60,120,180,240,300].map(a=>`<ellipse cx="0" cy="-5.6" rx="3.2" ry="4.5" transform="rotate(${a})" fill="#fff9e9"/>`).join('')}<circle r="3.4" fill="#f4ca62" stroke="#c69743"/><circle cx="-1" cy="-1" r="1" fill="#fff0ac" stroke="none"/></g>`;
 else art='<rect x="-8" y="-8" width="16" height="16" rx="2"/><path d="M-5 5 V-5 H5" fill="none" stroke="white" stroke-opacity=".35" stroke-width="1.5"/><path d="M-5 5 H5 V-5" fill="none" stroke="#30251f" stroke-opacity=".25"/>';
 return `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${size})" fill="${fill}" stroke="${isPink?'#844258':'#543b2f'}" stroke-width="${isPink?1.2:.7}">${art}</g>`;
}
function render() {
 document.querySelectorAll('[data-field]').forEach(b=>b.setAttribute('aria-pressed',String(draft[b.dataset.field]===b.dataset.value)));
 const heart=draft.shape==='heart';
 document.getElementById('giftArt').innerHTML=GiftArt.svg(draft);
 document.getElementById('giftArt').setAttribute('aria-label',`${heart?'하트 모양':'막대 모양 5개 세트'}, ${coatings.find(([v])=>v===draft.coating)[1]} 코팅, 토핑 ${toppings.find(([v])=>v===draft.topping)[1]}, 드리즐 ${drizzles.find(([v])=>v===draft.drizzle)[1]}`);
}
document.getElementById('resetDecoration').onclick=()=>{draft.coating='brown';draft.topping='none';draft.drizzle='none';save();render();};
save();render();

const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
 tabs.forEach(item=>{
  const active=item===tab;
  item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;
  document.getElementById(item.getAttribute('aria-controls')).hidden=!active;
 });
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectTab(tab));
 tab.addEventListener('keydown',e=>{
  let target;
  if(e.key==='ArrowRight')target=tabs[(index+1)%tabs.length];
  if(e.key==='ArrowLeft')target=tabs[(index+tabs.length-1)%tabs.length];
  if(e.key==='Home')target=tabs[0];
  if(e.key==='End')target=tabs[tabs.length-1];
  if(target){e.preventDefault();selectTab(target);target.focus();}
 });
});
