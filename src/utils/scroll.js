// src/utils/scroll.js

export class ScrollHelper {
  static smoothScroll(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    
    const offset = document.getElementById('navbar')?.offsetHeight + 10 || 60;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    
    window.scrollTo({
      top,
      behavior: 'smooth'
    });
  }

  static addFadeInOnScroll(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }
}
