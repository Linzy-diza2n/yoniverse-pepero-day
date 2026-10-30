// Export only the public cabinet decoration, never received gifts or letters.
(() => {
 const trigger = document.createElement('button');
 trigger.type = 'button'; trigger.className = 'secondary story-trigger';
 trigger.textContent = '스토리 이미지 다운로드';
 document.querySelector('.cabinet-actions').append(trigger);
 document.body.insertAdjacentHTML('beforeend', `<dialog id="story-share" aria-labelledby="story-title"><button type="button" class="close" aria-label="닫기">×</button><h2 id="story-title">내 캐비넷을 스토리에!</h2><p>이미지를 저장하고, 스토리에 내 캐비넷 링크를 붙여주세요.</p><img class="story-preview" alt="내 이름과 꾸민 캐비넷이 담긴 스토리 이미지" hidden><p class="story-status" role="status"></p><a class="primary story-download" hidden>이미지 저장하기 ↓</a><button type="button" class="secondary story-copy">내 캐비넷 링크 복사</button></dialog>`);
 const dialog = document.getElementById('story-share');
 const preview = dialog.querySelector('img');
 const download = dialog.querySelector('a');
 const status = dialog.querySelector('.story-status');
 let outputURL;
 dialog.querySelector('.close').onclick = () => dialog.close();
 const copy = dialog.querySelector('.story-copy');
 const check = '<svg class="action-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
 for (const button of [download,copy]) button.insertAdjacentHTML('beforeend',check);
 const feedback=document.createElement('span');
 feedback.className='story-feedback';feedback.setAttribute('role','status');dialog.append(feedback);
 download.onclick=()=>{download.classList.add('action-done');feedback.textContent='이미지 다운로드를 시작했어요.';};
 copy.onclick=async()=>{
  copy.classList.remove('action-done');
  try {await navigator.clipboard.writeText(cabinetShareLink());copy.classList.add('action-done');feedback.textContent='내 캐비넷 링크를 복사했어요.';}
  catch {feedback.textContent='링크를 복사하지 못했어요. 다시 눌러주세요.';}
 };
 const loadImage = src => new Promise((resolve,reject) => { const image = new Image(); image.onload=()=>resolve(image); image.onerror=reject; image.src=src; });
 trigger.onclick = async () => {
  // Capture the latest decoration on every request, before asynchronous rendering.
  const currentCabinet = JSON.parse(JSON.stringify(state));
  for(const button of [download,copy]) button.classList.remove('action-done');
  feedback.textContent='';
  dialog.showModal(); preview.hidden=true; download.hidden=true; status.hidden=false; status.textContent='스토리 이미지를 만들고 있어요…'; trigger.disabled=true;
  try {
   await document.fonts.ready;
   const canvas=document.createElement('canvas'); canvas.width=1080; canvas.height=1920;
   const ctx=canvas.getContext('2d');
   const brown='#493128', pink='#f7b9cf', butter='#fff0b4';
   const text=(value,x,y,size,color=brown,weight=800)=>{ctx.fillStyle=color;ctx.font=`${weight} ${size}px "Noto Sans KR", sans-serif`;ctx.textAlign='center';ctx.fillText(value,x,y,960);};
   const box=(x,y,w,h,fill,r=20)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle=brown;ctx.lineWidth=4;ctx.stroke();};
   const svgImage=async(svg,x,y,w,h)=>{
    const url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));
    try {ctx.drawImage(await loadImage(url),x,y,w,h);} finally {URL.revokeObjectURL(url);}
   };
   const sticker=async(key,x,y,size)=>svgImage(stickerSvg(key).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" '),x,y,size,size);
   ctx.fillStyle='#fffaf0';ctx.fillRect(0,0,1080,1920);
   // A pink gingham border and cut-paper labels echo the landing's playful artwork.
   ctx.fillStyle='#f9dfE8';
   for(let x=0;x<1080;x+=60)for(let y=0;y<1920;y+=60){if((x/60+y/60)%2===0)ctx.fillRect(x,y,60,60);}
   box(40,65,1000,1790,'#fffaf0',48);
   text('youniverse',540,175,38);
   ctx.save();ctx.translate(540,265);ctx.rotate(-.045);box(-180,-42,360,74,butter,8);text('11.11  FOR YOU ♡',0,8,29);ctx.restore();
   text('내 캐비넷에',540,400,80);
   ctx.save();ctx.translate(540,484);ctx.rotate(-.025);ctx.fillStyle=pink;ctx.fillRect(-409,-59,818,88);text('마음을 남겨줘!',0,10,87);ctx.restore();
   ctx.fillStyle='#fce4eb';ctx.beginPath();ctx.ellipse(540,995,375,465,0,0,Math.PI*2);ctx.fill();
   const x=290,y=575,w=500,h=875;
   const door=document.getElementById('door');
   const ink=door.querySelector('.door-ink').cloneNode(true);
   ink.setAttribute('xmlns','http://www.w3.org/2000/svg');ink.setAttribute('width',String(w));ink.setAttribute('height',String(h));
   ink.innerHTML=ink.innerHTML.replaceAll('var(--cab)',colors[currentCabinet.color][1]);
   ctx.save();ctx.shadowColor=colors[currentCabinet.color][2];ctx.shadowOffsetX=16;ctx.shadowOffsetY=10;
   await svgImage(new XMLSerializer().serializeToString(ink),x,y,w,h);ctx.restore();
   // Read the cabinet's layout so its fixtures stay in the same positions as the page.
   const rect=door.getBoundingClientRect();
   const position=selector=>{const el=door.querySelector(selector);const r=el.getBoundingClientRect();return [x+(r.left-rect.left)/rect.width*w,y+(r.top-rect.top)/rect.height*h,r.width/rect.width*w,r.height/rect.height*h];};
   const plate=position('.nameplate');box(...plate,'#fffaf0',8);text(currentCabinet.name,plate[0]+plate[2]/2,plate[1]+plate[3]*.68,42);
   for(const item of currentCabinet.decorations){
    const size=item.size*w/door.offsetWidth;
    await sticker(item.key,x+item.x*w-size/2,y+item.y*h-size/2,size);
   }
   const slot=position('.gift-slot');
   box(slot[0],slot[1],slot[2],28,'#dadbe3',5);box(slot[0]+7,slot[1]+25,slot[2]-14,25,'#40333b',4);
   text('마음 넣는 곳 ↓',slot[0]+slot[2]/2,slot[1]+83,18,brown,500);
   const handle=position('.handle');box(...handle,'#dedee6',8);
   const lock=door.querySelector('.padlock svg').cloneNode(true);
   lock.querySelectorAll('defs,.lock-shimmer-surface').forEach(el=>el.remove());
   lock.setAttribute('xmlns','http://www.w3.org/2000/svg');lock.setAttribute('width','120');lock.setAttribute('height','158');
   const lockPosition=position('.padlock');await svgImage(new XMLSerializer().serializeToString(lock),...lockPosition);
   text('11 — 11',540,y+h-34,19,brown,500);
   await sticker('✧',100,650,140);await sticker('♡',840,1180,115);await sticker('pepero',825,685,140);
   ctx.save();ctx.translate(158,1400);ctx.rotate(-.15);box(-84,-44,168,88,butter,40);text('OPEN',0,-3,23);text('11.11',0,28,28);ctx.restore();
   // Leave a quiet, unlabelled area for the platform's interactive link sticker.
   ctx.save();ctx.setLineDash([9,12]);ctx.strokeStyle='#cba99d';ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(270,1535,540,130,55);ctx.stroke();ctx.restore();
   const blob=await new Promise((resolve,reject)=>canvas.toBlob(value=>value?resolve(value):reject(new Error('export failed')),'image/png'));
   if(outputURL) URL.revokeObjectURL(outputURL);
   outputURL=URL.createObjectURL(blob); preview.src=outputURL;preview.hidden=false;
   download.href=outputURL;download.download='youniverse-story.png';download.hidden=false;
   status.textContent=''; status.hidden=true;
  } catch { status.textContent='이미지를 만들지 못했어요. 닫고 다시 시도해 주세요.'; }
  finally {trigger.disabled=false;}
 };
})();
