import { initMobileMenu, saveToLocalStorage, getFromLocalStorage } from './utils.js';

const contactForm = document.getElementById('contactForm');

function initContact() {
  initMobileMenu();

  if (!contactForm) return;

  const fields = ['fullName', 'email', 'phone', 'subject', 'connection', 'message', 'newsletter'];
  fields.forEach(field => {
    const el = document.getElementById(field);
    if (!el) return;
    const saved = getFromLocalStorage(`contactForm_${field}`);
    if (saved !== null) {
      el.type === 'checkbox' ? el.checked = saved === 'true' : el.value = saved;
    }
    el.addEventListener('input', () => {
      saveToLocalStorage(`contactForm_${field}`, el.type === 'checkbox' ? el.checked.toString() : el.value);
    });
  });
}

document.addEventListener('DOMContentLoaded', initContact);