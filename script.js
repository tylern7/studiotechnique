(function(){
  var btn=document.querySelector('.menu-btn'), menu=document.getElementById('menu');
  function set(o){btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu');menu.classList.toggle('open',o);}
  btn.addEventListener('click',function(){set(btn.getAttribute('aria-expanded')!=='true');});
  menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});

  // In-page links open the matching panel (and any panel around it).
  function openTo(id){var el=document.getElementById(id);if(!el)return;var p=el;while(p){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}
    setTimeout(function(){el.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});},30);}
  function fromHash(){var h=location.hash.slice(1);if(h)openTo(h);}
  window.addEventListener('hashchange',fromHash);fromHash();

  // Contact form. The old site had no form (only an email link), so this opens the visitor's
  // email app with the fields filled in, addressed to the studio. Swap in a form service later if wanted.
  var form=document.getElementById('contact-form');
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(!form.reportValidity())return;
    var f=form.elements;
    var body='Name: '+f.name.value+'\nPhone: '+f.phone.value+'\nEmail: '+f.email.value+'\nInterested in: '+f.interest.value+'\n\n'+f.message.value;
    window.location.href='mailto:'+form.getAttribute('data-to')+'?subject='+encodeURIComponent('Website enquiry from '+f.name.value)+'&body='+encodeURIComponent(body);
    form.querySelector('.form-note').textContent='Opening your email app to send your message to the studio.';
  });

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window){
    var els=document.querySelectorAll('.hero-head, .hero-media, .sec-head, .class-card, .band-head, .band-card, .band-photo, .rate, .tm, .about-grid figure, .visit-grid .card, .contact-copy, .form');
    document.documentElement.classList.add('js-reveal');
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:0.05});
    els.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=((i%3)*80)+'ms';io.observe(el);});
  }
})();
