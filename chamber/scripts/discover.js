import { attractions } from '../data/attractions.mjs';

// localStorage Visitor Tracking
function displayVisitorMessage() {
  const visitText = document.getElementById('visit-text');
  const messageBox = document.getElementById('visitor-message');
  const closeBtn = document.getElementById('close-message');

  const lastVisit = localStorage.getItem('lastVisit');
  const now = Date.now();

  let message = '';

  if (!lastVisit) {
    // First visit
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysBetween < 1) {
      // Less than a day
      message = 'Back so soon! Awesome!';
    } else if (daysBetween === 1) {
      // Exactly 1 day
      message = 'You last visited 1 day ago.';
    } else {
      // More than 1 day
      message = `You last visited ${daysBetween} days ago.`;
    }
  }

  visitText.textContent = message;
  messageBox.style.display = 'flex';

  // Store current visit
  localStorage.setItem('lastVisit', now);

  // Close message functionality
  closeBtn.addEventListener('click', () => {
    messageBox.style.display = 'none';
  });
}

// Lazy Loading Images with Intersection Observer
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  images.forEach(img => imageObserver.observe(img));
}

// Create Attraction Cards
function createAttractionCards() {
  const grid = document.getElementById('attractions-grid');

  attractions.forEach((attraction, index) => {
    const card = document.createElement('article');
    card.className = 'attraction-card';
    card.style.gridArea = `area${index + 1}`;

    card.innerHTML = `
            <figure>
                <img 
                    data-src="images/discover/${attraction.image}" 
                    src="images/placeholder.webp"
                    alt="${attraction.title}"
                    width="300"
                    height="200"
                    loading="lazy"
                />
            </figure>
            <h2>${attraction.title}</h2>
            <address>${attraction.address}</address>
            <p>${attraction.description}</p>
            <button class="learn-more">Learn More</button>
        `;

    grid.appendChild(card);
  });

  // Initialize lazy loading after cards are created
  lazyLoadImages();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  displayVisitorMessage();
  createAttractionCards();
});