import { initMobileMenu } from './utils.js';

const formDataDiv = document.getElementById('formData');

function initThankYou() {
  initMobileMenu();
  displaySubmittedData();
}

function displaySubmittedData() {
  if (!formDataDiv) return;
  const params = new URLSearchParams(window.location.search);
  if ([...params].length === 0) {
    formDataDiv.innerHTML = '<p>No data submitted.</p>';
    return;
  }

  let html = '<dl class="submission-details-list">';
  const labels = {
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    subject: 'Subject',
    connection: 'Connection to Haitian Cuisine',
    message: 'Message',
    newsletter: 'Newsletter'
  };

  for (const [key, value] of params) {
    const label = labels[key] || key;
    const display = (value === 'on' || value === 'true') ? 'Yes' : (value || '—');
    html += `<dt>${label}</dt><dd>${display}</dd>`;
  }
  html += '</dl>';
  formDataDiv.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', initThankYou);