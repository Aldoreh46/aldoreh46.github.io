(function(){
  var y=document.getElementById('y');
  if(y) y.textContent=new Date().getFullYear();
})();

(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  var targets=document.querySelectorAll('header .title, header .subtitle, header .chips, header .cta, h2, .grid .card');
  targets.forEach(function(n,i){ n.classList.add('reveal'); n.dataset.revealIdx=i; });
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var n=e.target, d=(parseInt(n.dataset.revealIdx,10)%8)*55;
      n.style.transitionDelay=d+'ms';
      n.classList.add('in');
      io.unobserve(n);
    });
  },{rootMargin:'120px 0px',threshold:0.02});
  targets.forEach(function(n){ io.observe(n); });
})();

(function(){
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce) return;
  var spot=document.createElement('div');
  spot.className='cursor-light';
  spot.setAttribute('aria-hidden','true');
  document.body.appendChild(spot);
  var mx=50,my=35,ticking=false;
  function raf(){ document.documentElement.style.setProperty('--mx',mx+'%'); document.documentElement.style.setProperty('--my',my+'%'); ticking=false; }
  function move(x,y){ mx=(x/window.innerWidth)*100; my=(y/window.innerHeight)*100; if(!ticking){ requestAnimationFrame(raf); ticking=true; } }
  window.addEventListener('pointermove',function(ev){ move(ev.clientX,ev.clientY); },{passive:true});
  move(window.innerWidth*0.5,window.innerHeight*0.35);
})();
