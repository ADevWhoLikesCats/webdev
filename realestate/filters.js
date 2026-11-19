const grid=$('#grid');
const S={q:'',type:'all',max:+$('#price').max,sort:'featured',saved:new URLSearchParams(location.search).get('saved')==='1'};
$('#saved-only').checked=S.saved;
$('#type').innerHTML='<option value="all">All types</option>'+[...new Set(PROPERTIES.map(p=>p.type))].sort().map(t=>`<option>${t}</option>`).join('');
function render(){
 const q=S.q.trim().toLowerCase();
 let list=PROPERTIES.filter(p=>(!q||(p.title+' '+p.location+' '+p.type).toLowerCase().includes(q))
  &&(S.type==='all'||p.type===S.type)&&p.price<=S.max&&(!S.saved||Fav.has(p.id)));
 if(S.sort==='asc')list.sort((a,b)=>a.price-b.price);
 if(S.sort==='desc')list.sort((a,b)=>b.price-a.price);
 $('#count').textContent=`${list.length} of ${PROPERTIES.length} properties`;
 $('#price-out').textContent='Up to '+fmt(S.max);
 grid.innerHTML=list.length?list.map(card).join(''):`<p class="empty">${S.saved&&!Fav.get().length?'You have not saved any properties yet. Tap the heart on a listing to save it.':'No properties match these filters. Try a higher price or a different type.'} <button class="link" id="reset">Clear filters</button></p>`;
 Fav.sync()}
$('#search').addEventListener('input',e=>{S.q=e.target.value;render()});
$('#type').addEventListener('change',e=>{S.type=e.target.value;render()});
$('#price').addEventListener('input',e=>{S.max=+e.target.value;render()});
$('#sort').addEventListener('change',e=>{S.sort=e.target.value;render()});
$('#saved-only').addEventListener('change',e=>{S.saved=e.target.checked;render()});
document.addEventListener('favchange',()=>S.saved&&render());
document.addEventListener('click',e=>{if(e.target.id==='reset'){Object.assign(S,{q:'',type:'all',max:+$('#price').max,sort:'featured',saved:false});
 $('#search').value='';$('#type').value='all';$('#price').value=S.max;$('#sort').value='featured';$('#saved-only').checked=false;render()}});
render();
