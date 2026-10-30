(() => {
 let receipt;
 try { receipt=JSON.parse(sessionStorage.getItem('gift-receipt:demo-yoni:v1')); } catch {}
 // Explicit demo entry only: never authenticates or sends a real gift.
 if(new URLSearchParams(location.search).get('preview')==='login') {
  let draft;
  try { draft=JSON.parse(sessionStorage.getItem('gift-draft:demo-yoni:v1')); } catch {}
  const sample={shape:'stick',coating:'brown',drizzle:'pink',topping:'none',wrap:'bag',ribbon:'pink',message:'달콤한 하루 보내!',sender:'나',letterFont:'neat'};
  const saved=draft && ['stick','heart'].includes(draft.shape) ? draft : receipt?.gift;
  receipt={gift:{...sample,...(saved || {})}};
  try {localStorage.setItem('yoniverse-session-preview-v1','signed-in');} catch {}
  const note=document.createElement('p');
  note.className='completion-preview-note';
  note.textContent='로그인·전송 완료 미리보기 · 실제 선물은 전송되지 않았어요.';
  document.querySelector('.completion h1').before(note);
 }
 if(!receipt || !receipt.gift || !['stick','heart'].includes(receipt.gift.shape)) {
  location.replace('make-gift.html'); return;
 }
 document.getElementById('completionReminders').hidden=false;
 document.getElementById('deliveredGift').innerHTML=WrapArt.svg(receipt.gift);
 const gift=receipt.gift;
 document.getElementById('deliveredLetter').dataset.font=['cute','neat','clean'].includes(gift.letterFont)?gift.letterFont:'cute';
 document.getElementById('deliveredMessage').textContent=typeof gift.message==='string'?gift.message:'';
 document.getElementById('deliveredSender').textContent='From. '+(typeof gift.sender==='string'?gift.sender:'');
})();
