// Initialize site
function initializeSite() {
  updateFooterDates();
  initResponsiveNavigation();
}

// Update footer dates
function updateFooterDates() {
  const yearElement = document.getElementById('currentyear');
  const lastModifiedElement = document.getElementById('lastModified');

  if (yearElement) yearElement.textContent = new Date().getFullYear();
  if (lastModifiedElement) lastModifiedElement.textContent = document.lastModified;
}

// Responsive navigation
function initResponsiveNavigation() {
  const nav = document.getElementById('primary-nav');
  const menuButton = document.getElementById('menu-button');

  if (!nav || !menuButton) return;

  const toggleMenu = () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active', !isExpanded);
  };

  const updateNavVisibility = () => {
    const isMobile = window.innerWidth < 768;
    menuButton.style.display = isMobile ? 'block' : 'none';
    nav.classList.toggle('active', !isMobile);
    menuButton.setAttribute('aria-expanded', !isMobile);
  };

  menuButton.addEventListener('click', toggleMenu);
  window.addEventListener('resize', updateNavVisibility);

  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 &&
      !nav.contains(e.target) &&
      !menuButton.contains(e.target) &&
      nav.classList.contains('active')) {
      toggleMenu();
    }
  });

  updateNavVisibility();
  addSkipLink();
}

// Add skip link for accessibility
function addSkipLink() {
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSite);