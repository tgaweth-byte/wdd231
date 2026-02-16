// thank-you.js - Affichage des données soumises via URLSearchParams

// Éléments du DOM
const formDataDiv = document.getElementById('formData');
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

// Menu hamburger (cohérent avec les autres pages)
function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  mainNav.classList.toggle('active');
}

// Affichage des données du formulaire
function displaySubmittedData() {
  if (!formDataDiv) return;

  const params = new URLSearchParams(window.location.search);

  if (params.keys().next().done) {
    formDataDiv.innerHTML = '<p>Aucune donnée n\'a été soumise.</p>';
    return;
  }

  let html = '<dl class="submission-details-list">';

  // Champs attendus (correspondance avec le formulaire)
  const fields = {
    fullName: 'Nom complet',
    email: 'Adresse email',
    phone: 'Numéro de téléphone',
    subject: 'Sujet',
    connection: 'Lien avec la cuisine haïtienne',
    message: 'Message',
    newsletter: 'Inscription newsletter'
  };

  for (const [key, value] of params.entries()) {
    const label = fields[key] || key.charAt(0).toUpperCase() + key.slice(1);
    const displayValue = value === 'on' ? 'Oui' : (value || '—');

    html += `
            <dt>${label}</dt>
            <dd>${displayValue}</dd>
        `;
  }

  html += '</dl>';
  formDataDiv.innerHTML = html;
}

// Initialisation
function initThankYou() {
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  displaySubmittedData();
}

document.addEventListener('DOMContentLoaded', initThankYou);