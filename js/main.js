// ===== NAV SCROLL =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 60);
});

// ===== MOBILE NAV =====
const toggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
toggle?.addEventListener('click', () => {
  mobileMenu?.classList.toggle('open');
  document.body.style.overflow = mobileMenu?.classList.contains('open') ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== FAQ ACCORDION =====
document.querySelectorAll('.faq-item').forEach(item => {
  const q = item.querySelector('.faq-question');
  const a = item.querySelector('.faq-answer');
  q?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      const ans = i.querySelector('.faq-answer');
      if (ans) ans.style.maxHeight = null;
    });
    // Open clicked if was closed
    if (!isOpen) {
      item.classList.add('open');
      if (a) a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// Open first FAQ by default
const firstFaq = document.querySelector('.faq-item');
if (firstFaq) {
  firstFaq.classList.add('open');
  const ans = firstFaq.querySelector('.faq-answer');
  if (ans) ans.style.maxHeight = ans.scrollHeight + 'px';
}

// ===== TABS =====
document.querySelectorAll('.tabs-nav').forEach(nav => {
  nav.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const parent = btn.closest('.tabbed-section');
      // Update buttons
      nav.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Update panels
      parent?.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.tab === target);
      });
    });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== HORIZONTAL GALLERY HINT =====
document.querySelectorAll('.mood-scroll-hint').forEach(btn => {
  btn.addEventListener('click', () => {
    const gallery = btn.closest('.road-mood-wrap, .tab-gallery-wrap')?.querySelector('.road-mood-gallery, .tab-slider');
    gallery?.scrollBy({ left: gallery.clientWidth * 0.75, behavior: 'smooth' });
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
