/**
 * main.js - General utilities for the Chamber of Commerce website
 */

// SIMPLIFIED: Initialize all functionality
function initializeSite() {
  console.log('Initializing Chamber of Commerce site...');

  updateFooterDates();
  highlightCurrentPage();
  initResponsiveNavigation();
  enhanceAccessibility();

  console.log('Site initialization complete');
}

// SIMPLIFIED: Update footer dates
function updateFooterDates() {
  const yearElement = document.getElementById('currentyear');
  const lastModifiedElement = document.getElementById('lastModified');

  if (yearElement) yearElement.textContent = new Date().getFullYear();
  if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;
}

// SIMPLIFIED: Highlight current page
function highlightCurrentPage() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#primary-nav a').forEach(link => {
    const isActive = link.getAttribute('href') === currentPage;
    link.classList.toggle('active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : null);
  });
}

// SIMPLIFIED: Responsive navigation
function initResponsiveNavigation() {
  const nav = document.getElementById('primary-nav');
  const menuButton = document.getElementById('menu-button');

  if (!nav || !menuButton) return;

  const toggleMenu = () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active', !isExpanded);
  };

  // Set initial state based on viewport
  const updateNavVisibility = () => {
    const isMobile = window.innerWidth < 768;
    menuButton.setAttribute('aria-expanded', !isMobile);
    nav.classList.toggle('active', !isMobile);
    menuButton.style.display = isMobile ? 'block' : 'none';
  };

  menuButton.addEventListener('click', toggleMenu);
  window.addEventListener('resize', updateNavVisibility);

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 &&
      !nav.contains(e.target) &&
      !menuButton.contains(e.target) &&
      nav.classList.contains('active')) {
      toggleMenu();
    }
  });

  updateNavVisibility();
}

// SIMPLIFIED: Accessibility improvements
function enhanceAccessibility() {
  // Add skip link if not present
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);
  }

  // Add ARIA labels to view toggle buttons
  document.querySelectorAll('.view-toggle button').forEach(button => {
    if (!button.hasAttribute('aria-label')) {
      button.setAttribute('aria-label',
        button.textContent.includes('Grid')
          ? 'Display members in grid layout'
          : 'Display members in list layout');
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSite);