const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const fmt=n=>'$'+n.toLocaleString('en-US');
const Fav={
 get(){try{return JSON.parse(localStorage.getItem('haven-favs'))||[]}catch{return[]}},
 has(id){return this.get().includes(id)},
 toggle(id){let f=this.get();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];try{localStorage.setItem('haven-favs',JSON.stringify(f))}catch{}this.sync()},
 sync(){const f=this.get();$$('.fav-count').forEach(e=>e.textContent=f.length);
  $$('[data-fav]').forEach(b=>{const on=f.includes(+b.dataset.fav);b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)})}
};
function card(p){return `<article class="card"><div class="card-img"><a href="property.html?id=${p.id}"><img src="${p.images[0]}" alt="${p.title}" loading="lazy"></a>
<button class="heart" data-fav="${p.id}" aria-pressed="false" aria-label="Save ${p.title}">&#9829;</button><span class="tag">${p.type}</span></div>
<div class="card-body"><h3>${p.title}</h3><p class="loc">${p.location}</p><p class="specs">${p.beds} beds &nbsp; ${p.baths} baths &nbsp; ${p.area.toLocaleString()} sq ft</p>
<div class="card-foot"><strong>${fmt(p.price)}</strong><span><button class="link" data-quick="${p.id}">Quick view</button><a class="link" href="property.html?id=${p.id}">Details</a></span></div></div></article>`}
function galleryHTML(p){return `<div class="gallery" tabindex="0" aria-label="Photo gallery"><div class="g-main"><img src="${p.images[0]}" alt="${p.title}">
<button class="g-nav prev" aria-label="Previous photo">&lsaquo;</button><button class="g-nav next" aria-label="Next photo">&rsaquo;</button></div>
<div class="g-thumbs">${p.images.map((s,i)=>`<button data-i="${i}" class="${i?'':'on'}" aria-label="Photo ${i+1}"><img src="${s}" alt=""></button>`).join('')}</div></div>`}
function initGallery(root,p){let i=0;const m=$('.g-main img',root),t=$$('.g-thumbs button',root),n=p.images.length;
 const go=k=>{i=(k+n)%n;m.src=p.images[i];t.forEach((b,j)=>b.classList.toggle('on',j===i))};
 root.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
  if(b.classList.contains('next'))go(i+1);else if(b.classList.contains('prev'))go(i-1);else if(b.dataset.i)go(+b.dataset.i)});
 root.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1)})}
function detailHTML(p){return `<div class="detail">${galleryHTML(p)}<div class="detail-info"><p class="loc">${p.location}</p><h2>${p.title}</h2><p class="price">${fmt(p.price)}</p>
<dl class="specs-grid"><div><dt>Type</dt><dd>${p.type}</dd></div><div><dt>Bedrooms</dt><dd>${p.beds}</dd></div><div><dt>Bathrooms</dt><dd>${p.baths}</dd></div><div><dt>Interior</dt><dd>${p.area.toLocaleString()} sq ft</dd></div></dl>
<p>${p.desc}</p><ul class="features">${p.features.map(f=>`<li>${f}</li>`).join('')}</ul>
<div class="actions"><a class="btn" href="contact.html?property=${p.id}">Enquire about this home</a><button class="btn ghost" data-fav="${p.id}" aria-pressed="false">Save to favourites</button></div></div></div>`}
function openModal(id){const p=PROPERTIES.find(x=>x.id===id);if(!p)return;let d=$('#modal');
 if(!d){d=document.createElement('dialog');d.id='modal';document.body.appendChild(d);
  d.addEventListener('click',e=>{if(e.target===d||e.target.closest('.m-close'))d.close()})}
 d.innerHTML=`<button class="m-close" aria-label="Close">&times;</button>`+detailHTML(p);initGallery($('.gallery',d),p);d.showModal();Fav.sync()}

document.addEventListener('click',e=>{
 const f=e.target.closest('[data-fav]');if(f){Fav.toggle(+f.dataset.fav);document.dispatchEvent(new Event('favchange'))}
 const q=e.target.closest('[data-quick]');if(q)openModal(+q.dataset.quick)});

// Shared header and footer
const page=location.pathname.split('/').pop()||'index.html';
const links=[['index.html','Home'],['properties.html','Properties'],['about.html','About'],['contact.html','Contact']];
$('#site-header').innerHTML=`<div class="demo-bar">Demo project. All properties, people and prices are fictional.</div>
<header class="header"><a class="logo" href="index.html">Haven Estates</a>
<nav id="nav" aria-label="Main">${links.map(([h,t])=>`<a href="${h}" ${page===h?'aria-current="page"':''}>${t}</a>`).join('')}</nav>
<a class="saved" href="properties.html?saved=1" aria-label="Saved properties">&#9829; <span class="fav-count">0</span></a>
<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span></button></header>`;
$('#site-footer').innerHTML=`<footer class="footer"><div><strong class="logo">Haven Estates</strong><p>Haven Bay, a fictional coastal city.</p></div>
<p class="demo-note">This website is a demo portfolio project. Every listing is fictional and nothing here is for sale. Photography is used for illustration only.</p></footer>`;
const burger=$('.burger');burger.addEventListener('click',()=>{const o=document.body.classList.toggle('nav-open');burger.setAttribute('aria-expanded',o)});
$('#nav').addEventListener('click',()=>{document.body.classList.remove('nav-open');burger.setAttribute('aria-expanded',false)});

// Home: featured
const feat=$('#featured');if(feat)feat.innerHTML=PROPERTIES.filter(p=>p.featured).map(card).join('');

// Property page
const pd=$('#property-detail');
if(pd){const id=+new URLSearchParams(location.search).get('id'),p=PROPERTIES.find(x=>x.id===id);
 if(p){document.title=p.title+' | Haven Estates';pd.innerHTML=detailHTML(p);initGallery($('.gallery',pd),p)}
 else pd.innerHTML='<p class="empty">We could not find that property. <a href="properties.html">Browse all properties</a></p>'}

// Contact form validation
const form=$('#enquiry');
if(form){const pid=+new URLSearchParams(location.search).get('property'),pp=PROPERTIES.find(x=>x.id===pid);
 if(pp)form.message.value=`I am interested in ${pp.title} (${fmt(pp.price)}). `;
 const rules={name:v=>v.trim().length>=2||'Enter your full name.',
  email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||'Enter a valid email address, like name@example.com.',
  phone:v=>!v.trim()||/^[+\d][\d\s()-]{6,17}$/.test(v.trim())||'Enter a valid phone number, or leave this blank.',
  message:v=>v.trim().length>=10||'Write at least 10 characters so we can help.'};
 const check=n=>{const el=form[n],r=rules[n](el.value),err=$('#err-'+n);err.textContent=r===true?'':r;el.setAttribute('aria-invalid',r!==true);return r===true};
 Object.keys(rules).forEach(n=>{form[n].addEventListener('blur',()=>check(n));form[n].addEventListener('input',()=>form[n].getAttribute('aria-invalid')==='true'&&check(n))});
 form.addEventListener('submit',e=>{e.preventDefault();const ok=Object.keys(rules).map(check).every(Boolean);
  if(!ok){form.querySelector('[aria-invalid="true"]').focus();return}
  form.hidden=true;$('#sent').hidden=false;$('#sent').focus()})}
Fav.sync();
