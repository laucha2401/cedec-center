const header = document.getElementById('siteHeader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const animatedItems = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
const faqItems = document.querySelectorAll('.faq-item');

const whatsappUrl = 'https://wa.me/5491132770138?text=Hola!%20Vi%20la%20p%C3%A1gina%20web%20de%20CEDEC%20y%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20las%20clases.';

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.href = whatsappUrl;
});

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 24);
}

function closeMenu() {
  menuToggle.classList.remove('active');
  navLinks.classList.remove('open');
  header.classList.remove('menu-active');
  document.body.classList.remove('menu-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  header.classList.toggle('menu-active', isOpen);
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

animatedItems.forEach((item) => revealObserver.observe(item));

function openLightbox(src) {
  if (!lightbox || !lightboxImage || !src) return;
  lightboxImage.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('menu-open');
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  lightboxImage.src = '';
}

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item.dataset.lightboxSrc));
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

faqItems.forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  const icon = item.querySelector('.faq-icon');

  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    faqItems.forEach((otherItem) => {
      const otherQuestion = otherItem.querySelector('.faq-question');
      const otherAnswer = otherItem.querySelector('.faq-answer');
      const otherIcon = otherItem.querySelector('.faq-icon');
      otherItem.classList.remove('open');
      otherQuestion?.setAttribute('aria-expanded', 'false');
      if (otherAnswer) otherAnswer.style.maxHeight = '0px';
      if (otherIcon) otherIcon.textContent = '+';
    });

    if (!isOpen && answer) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
      if (icon) icon.textContent = '-';
    }
  });
});
