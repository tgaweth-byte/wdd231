// State
const state = {
  view: 'grid',
  members: []
};

// Membership levels
const MEMBERSHIP_TEXTS = ['Member', 'Silver Member', 'Gold Member'];

// DOM Elements
const elements = {
  container: document.getElementById('member-container'),
  gridButton: document.getElementById('grid-view'),
  listButton: document.getElementById('list-view')
};

// Initialize
async function initDirectory() {
  try {
    state.members = await loadMembers();
    displayMembers();
    setupViewToggle();
  } catch (error) {
    showError();
  }
}

// Load members from JSON
async function loadMembers() {
  const response = await fetch('data/members.json');
  if (!response.ok) throw new Error('Failed to load members');
  return response.json();
}

// Display members based on current view
function displayMembers(view = state.view) {
  state.view = view;
  elements.container.className = view;
  elements.container.innerHTML = state.members.length
    ? state.members.map(member => view === 'grid' ? createCard(member) : createListItem(member)).join('')
    : '<p class="no-members">No member data available.</p>';

  updateViewButtons();
}

// Create member card for grid view
function createCard(member) {
  const level = member.membershipLevel;
  const levelText = MEMBERSHIP_TEXTS[level - 1] || 'Member';

  return `
    <div class="member-card level-${level}">
      <div class="card-image">
        <img src="images/${member.image.replace('./images/', '')}" alt="${member.name}" loading="lazy">
        <span class="membership-badge">${levelText}</span>
      </div>
      <div class="card-content">
        <h3>${member.name}</h3>
        <p class="industry">${member.industry}</p>
        <p class="address">📍 ${member.address}</p>
        <p class="phone">📞 ${member.phone}</p>
        <p class="description">${member.description || 'Leading Haitian business'}</p>
        <a href="${member.website}" target="_blank" rel="noopener" class="website-link">Visit Website</a>
      </div>
    </div>
  `;
}

// Create list item for list view
function createListItem(member) {
  const levelText = MEMBERSHIP_TEXTS[member.membershipLevel - 1] || 'Member';

  return `
    <div class="member-list-item level-${member.membershipLevel}">
      <div class="list-item-content">
        <h3>${member.name} <span class="list-membership">${levelText}</span></h3>
        <p class="list-details">${member.industry} | ${member.address} | ${member.phone}</p>
      </div>
      <a href="${member.website}" target="_blank" rel="noopener" class="list-website-link">Website →</a>
    </div>
  `;
}

// Setup view toggle buttons
function setupViewToggle() {
  elements.gridButton.addEventListener('click', () => displayMembers('grid'));
  elements.listButton.addEventListener('click', () => displayMembers('list'));

  // Keyboard support
  [elements.gridButton, elements.listButton].forEach(button => {
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}

// Update active view button
function updateViewButtons() {
  const isGrid = state.view === 'grid';
  elements.gridButton.classList.toggle('active', isGrid);
  elements.gridButton.setAttribute('aria-pressed', isGrid);
  elements.listButton.classList.toggle('active', !isGrid);
  elements.listButton.setAttribute('aria-pressed', !isGrid);
}

// Show error message
function showError() {
  elements.container.innerHTML = `
    <div class="error-message">
      <h3>Unable to Load Directory</h3>
      <p>We're having trouble loading the business directory. Please try again later.</p>
    </div>
  `;
  elements.container.className = 'error';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDirectory);