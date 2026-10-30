window.GiftArt = (() => {
const colors={brown:'#7c4c3d',pink:'#f1b1c9',white:'#fff0d6',dark:'#493028'};
const drizzleColors = {...colors, pink:'#d5638f'};
function topping(x,y,index,option) {
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

function svg(draft){
 const heart=draft.shape==='heart';
 const base=heart?'M167 222 C146 195 60 144 60 91 C60 36 121 31 140 81 C159 31 220 36 220 91 C220 144 134 195 113 222':'M113 223 L164 37';
 const coat=heart?'M150 204 C128 179 60 138 60 91 C60 36 121 31 140 81 C159 31 220 36 220 91 C220 138 152 179 130 204':'M125 178 L164 37';

 const points=heart?[[62,89],[84,55],[117,62],[196,55],[220,93],[202,139],[167,175],[100,158]]:[[160,51],[152,80],[145,107],[136,137],[128,166]];
 let drizzle='';if(draft.drizzle!=='none')for(let y=45;y<205;y+=18)drizzle+=`<path d="M35 ${y} Q140 ${y-18} 245 ${y+12}"/>`;
 const piece=(offset=0)=>`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${base}" stroke="#30251f" stroke-width="26"/><path d="${base}" stroke="#e6b87a" stroke-width="21"/><path d="${coat}" stroke="${colors[draft.coating]}" stroke-width="22"/><g mask="url(#coatMask)" stroke="${drizzleColors[draft.drizzle]||'none'}" stroke-width="3">${drizzle}</g></g>${points.map(([x,y],i)=>topping(x,y,i+offset,draft.topping)).join('')}`;
 const art=heart?piece():[[68,222,-15.3,.96],[104,222,-15.3,.96],[140,222,-15.3,.96],[176,222,-15.3,.96],[212,222,-15.3,.96]].map(([x,y,angle,size],i)=>`<g class="snack-stick" transform="translate(${x} ${y}) rotate(${angle}) scale(${size}) translate(-113 -223)">${piece(i*2)}</g>`).join('');
 return `<svg viewBox="0 0 280 260" aria-hidden="true"><defs><mask id="coatMask"><path d="${coat}" fill="none" stroke="white" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/></mask></defs>${art}</svg>`;

}
return {svg};
})();
