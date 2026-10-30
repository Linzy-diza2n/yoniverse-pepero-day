(() => {
 const key='gift-draft:demo-yoni:v1';
 let draft={};
 try {const saved=JSON.parse(sessionStorage.getItem(key));if(saved&&typeof saved==='object'&&!Array.isArray(saved))draft=saved;}catch{}
 if(!['stick','heart'].includes(draft.shape)){location.replace('make-gift.html');return;}
 if(!['bag','box','bouquet'].includes(draft.wrap))draft.wrap='bag';
 if(!['pink','brown','cream','blue','purple'].includes(draft.ribbon))draft.ribbon='pink';
 const message=document.getElementById('message'),sender=document.getElementById('sender'),status=document.getElementById('letterStatus'),instagram=document.getElementById('instagram');
 message.value=typeof draft.message==='string'?draft.message:'';
 sender.value=typeof draft.sender==='string'?draft.sender.slice(0,20):'';
 instagram.value=typeof draft.instagram==='string'?draft.instagram.replace(/^@/,'').slice(0,30):'';
 const fontChoices=[...document.querySelectorAll('input[name="letterFont"]')];
 if(!['cute','neat','clean'].includes(draft.letterFont))draft.letterFont='cute';
 function applyFont(){
  document.querySelector('.letter-paper').dataset.font=draft.letterFont;
  fontChoices.forEach(input=>input.checked=input.value===draft.letterFont);
 }
 fontChoices.forEach(input=>input.addEventListener('change',()=>{draft.letterFont=input.value;applyFont();status.textContent='';save();}));
 applyFont();
 document.getElementById('letterGift').innerHTML=WrapArt.svg(draft);
 const count=()=>document.getElementById('letterCount').textContent=message.value.length;
 function save(){
  draft.message=message.value;draft.sender=sender.value;draft.instagram=instagram.value;count();
  try{sessionStorage.setItem(key,JSON.stringify(draft));return true;}
  catch{status.textContent='저장하지 못했어요. 편지 내용을 복사해 주세요.';return false;}
 }
 for(const input of [message,sender,instagram])input.addEventListener('input',()=>{input.setCustomValidity('');if(input===instagram)instagram.value=instagram.value.replace(/^@/,'');status.textContent='';save();});
 document.getElementById('letterForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(message.value.length>200){message.setCustomValidity('편지는 200자까지 적을 수 있어요.');message.reportValidity();return;}
  for(const [input,label] of [[message,'편지 내용'],[sender,'보내는 이름']]){
   input.setCustomValidity(input.value.trim()?'':label+'을 적어주세요.');
   if(!input.reportValidity())return;
  }
  if(!save())return;
  // Authentication must be verified by the delivery server, never by preview-session.
  location.href='gift-login.html';
 });
 count();
})();
