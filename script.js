// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.exp-card, .skill-category, .projeto-card, .edu-item, .cert-item, .highlight-item, .contact-link').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('formSuccess').style.display = 'flex';
    form.reset();
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 4000);
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// i18n Language Switcher
const langBtns = document.querySelectorAll('.lang-btn');
let defaultLang = 'pt';

try {
  defaultLang = localStorage.getItem('language') || 'pt';
} catch (e) {
  console.warn("localStorage não disponível", e);
}

function setLanguage(lang) {
  // Update active button
  langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Save to localStorage
  try {
    localStorage.setItem('language', lang);
  } catch (e) { }

  // Apply translations (check if translations object exists)
  if (typeof translations === 'undefined') {
    console.error("Dicionário de traduções não carregado.");
    return;
  }

  const langData = translations[lang];
  if (!langData) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const keyPath = el.getAttribute('data-i18n');
    const keys = keyPath.split('.');
    let value = langData;
    keys.forEach(k => {
      if (value) value = value[k];
    });

    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', value);
      } else {
        el.innerHTML = value;
      }
    }
  });
}

// Event Listeners
langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(defaultLang);
});
