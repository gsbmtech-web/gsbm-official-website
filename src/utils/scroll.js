// ===== FILE: src/utils/scroll.js =====
export const go = (id) => {
  const element = document.getElementById(id);
  if (!element) return;

  // Dynamically get navbar height (handles responsive changes)
  const navbar = document.querySelector('nav') || document.querySelector('[data-navbar]');
  const offset = navbar ? navbar.getBoundingClientRect().height : 80;

  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const targetTop = elementTop - offset;

  window.scrollTo({
    top: targetTop,
    behavior: 'smooth'
  });
};