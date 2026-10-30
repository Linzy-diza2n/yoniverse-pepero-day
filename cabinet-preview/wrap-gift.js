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
const bow=WrapArt.bow;
const packageSvg=(kind,mini=false)=>WrapArt.svg(draft,kind,mini);
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
