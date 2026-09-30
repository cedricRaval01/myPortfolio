const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

// theme
const root=document.documentElement, tb=$('#theme');
tb.onclick=()=>{const d=root.dataset.theme==='dark';root.dataset.theme=d?'light':'dark';tb.textContent=d?'Dark mode':'Light mode'};

// cursor glow
addEventListener('pointermove',e=>{const g=$('#glow');g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});

// typed roles
const roles=['QA Intern','AR Developer','Bug Hunter','Fast Learner'];let ri=0,ci=0,del=false;
(function tick(){const w=roles[ri],el=$('#typed');el.textContent=w.slice(0,ci);
 if(!del&&ci===w.length){del=true;return setTimeout(tick,1400)}
 if(del&&ci===0){del=false;ri=(ri+1)%roles.length}
 ci+=del?-1:1;setTimeout(tick,del?45:90)})();

// counters
$$('[data-n]').forEach(el=>{const n=+el.dataset.n;let i=0;const t=setInterval(()=>{el.textContent=++i;if(i>=n)clearInterval(t)},500)});

// room demo
const grid=$('#grid');
for(let i=0;i<=6;i++){const x1=80+i*40,x2=10+i*63.3;grid.insertAdjacentHTML('beforeend',`<line x1="${x1}" y1="170" x2="${x2}" y2="270"/>`)}
for(let i=1;i<=3;i++){const y=170+i*33,o=i*(70/3);grid.insertAdjacentHTML('beforeend',`<line x1="${80-o}" y1="${y}" x2="${320+o}" y2="${y}"/>`)}
const cap=$('#cap');let placed=0;
$$('#furn .chip').forEach(b=>b.onclick=()=>{
  const on=b.getAttribute('aria-pressed')!=='true';
  b.setAttribute('aria-pressed',on);$('#f-'+b.dataset.f).classList.toggle('show',on);
  placed+=on?1:-1;cap.textContent=placed?`${placed} item${placed>1?'s':''} placed in a 4.2m × 3.6m room.`:'Room is empty. Place some furniture.';
});
const walls=[['#1b2557','Navy'],['#2b7a6b','Teal'],['#8a3b5a','Berry'],['#c9a56b','Sand']];
walls.forEach(([c,n],i)=>{const s=document.createElement('button');s.className='sw';s.style.background=c;s.title=n;s.setAttribute('aria-label',n+' wall');s.setAttribute('aria-pressed',i===0);
 s.onclick=()=>{$$('#paint .sw').forEach(x=>x.setAttribute('aria-pressed',false));s.setAttribute('aria-pressed',true);$('#backwall').style.fill=c;cap.textContent=n+' wall applied.'};
 $('#paint').append(s)});
$('#paint').insertAdjacentHTML('afterbegin','<span class="cap" style="margin:0 .3rem 0 0">Wall:</span>');

// accordion
$$('#acc button').forEach(b=>b.onclick=()=>{
  const p=b.nextElementSibling,o=p.classList.toggle('open');b.setAttribute('aria-expanded',o)});

// tabs
$$('.tab').forEach(t=>t.onclick=()=>{
  $$('.tab').forEach(x=>x.setAttribute('aria-selected',x===t));
  $$('.panel').forEach(p=>p.classList.toggle('on',p.id==='p-'+t.dataset.p))});

// skill test runner
const skills=[
 ['Programming','C#, Java, Python'],
 ['Web','HTML, CSS, JavaScript'],
 ['QA and Testing','Manual testing, test case design, defect reporting'],
 ['IT Fundamentals','Networking basics, hardware troubleshooting, OS installation and maintenance'],
 ['Soft skills','Communication, teamwork, problem-solving, fast learner, adaptability']];
const tests=$('#tests');
skills.forEach(([a,b])=>tests.insertAdjacentHTML('beforeend',`<div class="t"><div class="st">✓</div><b>${a}</b><span>${b}</span></div>`));
let running=false;
$('#run').onclick=async()=>{
  if(running)return;running=true;const rows=$$('.t');rows.forEach(r=>r.classList.remove('pass'));
  $('#bar').style.width='0';$('#score').textContent='0 / 5 passed';
  for(let i=0;i<rows.length;i++){await new Promise(r=>setTimeout(r,450));rows[i].classList.add('pass');
    $('#bar').style.width=((i+1)/rows.length*100)+'%';$('#score').textContent=`${i+1} / 5 passed`}
  running=false};

// copy email
$('#copyMail').onclick=async()=>{
  try{await navigator.clipboard.writeText('cedc632@gmail.com')}catch(e){}
  const t=$('#toast');t.classList.add('on');setTimeout(()=>t.classList.remove('on'),1800)};

// reveal + nav highlight
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('in')),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
const links=$$('nav a[href^="#"]');
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(s=>so.observe(s));