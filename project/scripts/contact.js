// contact.js - Gestion du formulaire de contact + menu hamburger

import { saveToLocalStorage, getFromLocalStorage } from './utils.js';

// Éléments du DOM
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const contactForm = document.getElementById('contactForm');

// Gestion du menu mobile
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mainNav.classList.toggle('active');
}

// Sauvegarde temporaire des champs du formulaire (draft)
function saveFormDraft() {
  if (!contactForm) return;

  const fields = ['fullName', 'email', 'phone', 'subject', 'connection', 'message', 'newsletter'];

  fields.forEach(field => {
    const input = document.getElementById(field);
    if (!input) return;

    // Charger la valeur sauvegardée
    const savedValue = getFromLocalStorage(`contactForm_${field}`);
    if (savedValue !== null) {
      if (input.type === 'checkbox') {
        input.checked = savedValue === 'true';
      } else {
        input.value = savedValue;
      }
    }

    // Sauvegarder à chaque modification
    input.addEventListener('input', () => {
      let value = input.type === 'checkbox' ? input.checked.toString() : input.value;
      saveToLocalStorage(`contactForm_${field}`, value);
    });
  });
}

// Nettoyage du draft après envoi réussi (optionnel)
function clearFormDraft() {
  const fields = ['fullName', 'email', 'phone', 'subject', 'connection', 'message', 'newsletter'];
  fields.forEach(field => {
    localStorage.removeItem(`contactForm_${field}`);
  });
}

// Initialisation
function initContact() {
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  if (contactForm) {
    saveFormDraft();

    // Optionnel : vider le draft si on arrive sur la page thank-you
    // (mais comme c'est une navigation GET, on peut le laisser ou le vider ici si voulu)
  }
}

document.addEventListener('DOMContentLoaded', initContact);