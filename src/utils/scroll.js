// ===== FILE: src/utils/scroll.js =====
export const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });