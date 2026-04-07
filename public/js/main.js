/* ═══════════════════════════════════════════════════════════
   MINAFAM – Ministerio de Familias  |  main.js
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar: scroll effect + active link ───────────── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const hamburger = document.getElementById('hamburger');
  const navLinksMenu = document.getElementById('navLinks');

  const updateNavbar = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  /* ── 2. Mobile hamburger menu ─────────────────────────── */
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksMenu.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinksMenu.classList.remove('open');
    }
  });

  /* ── 3. Back to top ───────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── 4. Fade-in animations on scroll ────────────────── */
  const fadeElements = [
    '.evento-card',
    '.ministerio-card',
    '.iglesia-card',
    '.paso-card',
    '.stat-item',
    '.evento-full-card',
    '.iglesia-card-full',
    '.ministerio-card-full'
  ];

  const allFadeTargets = document.querySelectorAll(fadeElements.join(','));
  allFadeTargets.forEach(el => el.classList.add('fade-in'));

  const animateOnScroll = () => {
    allFadeTargets.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll, { passive: true });
  animateOnScroll();

  /* ── 5. Animated counter for stats ───────────────────── */
  const counters = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated || counters.length === 0) return;
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    const rect = statsBar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      statsAnimated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
      });
    }
  };

  window.addEventListener('scroll', animateStats, { passive: true });

  /* ── 6. Testimonials carousel ─────────────────────────── */
  const testimonials = document.querySelectorAll('.testimonio-card:not(.testimonio-nav)');
  if (testimonials.length > 0) {
    const dots = document.querySelectorAll('.t-dot');
    const prevBtn = document.querySelector('.t-prev');
    const nextBtn = document.querySelector('.t-next');
    let currentTestimonial = 0;
    let autoSlide;

    const showTestimonial = (index) => {
      testimonials.forEach(t => t.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      currentTestimonial = (index + testimonials.length) % testimonials.length;
      testimonials[currentTestimonial].classList.add('active');
      dots[currentTestimonial].classList.add('active');
    };

    const startAutoSlide = () => {
      autoSlide = setInterval(() => showTestimonial(currentTestimonial + 1), 5000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlide);
      startAutoSlide();
    };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
        resetAutoSlide();
      });
      nextBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
        resetAutoSlide();
      });
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          showTestimonial(i);
          resetAutoSlide();
        });
      });
      startAutoSlide();
    }
  }

  /* ── 7. Contact form ───────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre  = contactForm.querySelector('#nombre').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const asunto  = contactForm.querySelector('#asunto').value;
      const mensaje = contactForm.querySelector('#mensaje').value.trim();

      if (!nombre || !email || !asunto || !mensaje) {
        shakeForm(contactForm);
        return;
      }
      if (!isValidEmail(email)) {
        shakeInput(contactForm.querySelector('#email'));
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      // Simular envío
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        const formSuccess = document.getElementById('formSuccess');
        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
      }, 1500);
    });
  }

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const shakeForm = (form) => {
    form.style.animation = 'none';
    form.offsetHeight;
    form.style.animation = 'shake .4s ease';
    setTimeout(() => form.style.animation = '', 600);
  };

  const shakeInput = (input) => {
    input.style.borderColor = '#e74c3c';
    input.style.animation = 'none';
    input.offsetHeight;
    input.style.animation = 'shake .4s ease';
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.animation = '';
    }, 600);
  };

  /* ── 8. Newsletter form ────────────────────────────────── */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (!isValidEmail(input.value.trim())) {
        shakeInput(input);
        return;
      }
      const btn = newsletterForm.querySelector('button');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      btn.style.background = '#27ae60';
      input.value = '';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
      }, 3000);
    });
  }

});

/* ── Shake keyframe ──────────────────────────────────── */
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-8px)}
    40%{transform:translateX(8px)}
    60%{transform:translateX(-6px)}
    80%{transform:translateX(6px)}
  }
`;
document.head.appendChild(shakeStyle);
