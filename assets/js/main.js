// Set footer year
(function(){
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

// Reveal-on-scroll — fewer targets, earlier trigger, smoother
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  // Only target section headers and the .grid wrappers (not every tiny child)
  var nodes = document.querySelectorAll('h2, .grid');
  nodes.forEach(function(n){ n.classList.add('reveal'); });

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        e.target.classList.add('in');

        // Optional stagger for cards inside a revealed grid (cheap + smooth)
        if (e.target.classList.contains('grid')) {
          var cards = e.target.querySelectorAll('.card');
          cards.forEach(function(c, i){
            c.style.opacity = 0;
            c.style.transform = 'translateY(6px)';
            setTimeout(function(){
              c.style.transition = 'opacity .18s ease-out, transform .18s ease-out';
              c.style.opacity = 1;
              c.style.transform = 'translateY(0)';
            }, i * 30); // small stagger
          });
        }

        io.unobserve(e.target);
      }
    });
  }, {
    rootMargin: '100px 0px', // start a bit before it enters the viewport
    threshold: 0.01
  });

  nodes.forEach(function(n){ io.observe(n); });
})();

 //Parallax: DISABLED for smoothness. If you insist, enable a GPU-friendly version.
 //(Background-position on scroll causes paints and can feel janky.)
 (function(){
   var header = document.querySelector('header');
   if(!header) return;
   var ticking = false;
   function update(){
     var y = Math.min(200, window.scrollY);
     header.style.backgroundPosition = '0 ' + (-y/8) + 'px, 0 0';
     ticking = false;
   }
   window.addEventListener('scroll', function(){
     if (!ticking) { requestAnimationFrame(update); ticking = true; }
   }, {passive:true});
   update();
 })();
