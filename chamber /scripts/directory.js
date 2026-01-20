/**
 * directory.js - Main functionality for the Chamber Directory Page
 */

// SIMPLIFIED: State management
const state = {
  view: 'grid',
  members: [],
  elements: {
    container: document.getElementById('member-container'),
    gridButton: document.getElementById('grid-view'),
    listButton: document.getElementById('list-view')
  }
};

// SIMPLIFIED: Main function using async/await
async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    state.members = await response.json();
    displayMembers(state.view);
    setupViewToggle();

  } catch (error) {
    state.elements.container.innerHTML = `
      <div class="error-message">
        <h3>Unable to Load Directory</h3>
        <p>We're having trouble loading the business directory. Please try again later.</p>
      </div>
    `;
    state.elements.container.className = 'error';
  }
}

// SIMPLIFIED: Display members based on current view
function displayMembers(view = state.view) {
  const { container } = state.elements;

  container.innerHTML = '';
  container.className = view;
  state.view = view;

  if (!state.members.length) {
    container.innerHTML = '<p class="no-members">No member data available.</p>';
    return;
  }

  state.members.forEach(member => {
    container.appendChild(view === 'grid' ? createCard(member) : createListItem(member));
  });

  updateActiveButton();
}

// SIMPLIFIED: Create grid card
function createCard(member) {
  const card = document.createElement('div');
  card.className = `member-card level-${member.membershipLevel}`;
  card.innerHTML = `
    <div class="card-image">
      <img src="images/${member.image.replace('./images/', '')}" 
           alt="${member.name}" 
           loading="lazy"
           width="400" height="300">
      <span class="membership-badge">${getMembershipText(member.membershipLevel)}</span>
    </div>
    <div class="card-content">
      <h3>${member.name}</h3>
      <p class="industry">${member.industry}</p>
      <p class="address">📍 ${member.address}</p>
      <p class="phone">📞 ${member.phone}</p>
      <p class="description">${member.description || 'Leading Haitian business'}</p>
      <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
        Visit Website
      </a>
    </div>
  `;
  return card;
}

// SIMPLIFIED: Create list item (no images)
function createListItem(member) {
  const item = document.createElement('div');
  item.className = `member-list-item level-${member.membershipLevel}`;
  item.innerHTML = `
    <div class="list-item-content">
      <h3>${member.name} <span class="list-membership">${getMembershipText(member.membershipLevel)}</span></h3>
      <p class="list-details">
        ${member.industry} | ${member.address} | ${member.phone}
      </p>
    </div>
    <a href="${member.website}" target="_blank" rel="noopener" class="list-website-link">
      Website →
    </a>
  `;
  return item;
}

// SIMPLIFIED: Get membership level text
function getMembershipText(level) {
  return ['Member', 'Silver Member', 'Gold Member'][level - 1] || 'Member';
}

// SIMPLIFIED: View toggle setup
function setupViewToggle() {
  const { gridButton, listButton } = state.elements;

  gridButton.addEventListener('click', () => displayMembers('grid'));
  listButton.addEventListener('click', () => displayMembers('list'));

  // Keyboard support
  [gridButton, listButton].forEach(button => {
    button.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        button.click();
      }
    });
  });
}

// SIMPLIFIED: Update active button state
function updateActiveButton() {
  const { gridButton, listButton } = state.elements;
  const isGrid = state.view === 'grid';

  gridButton.classList.toggle('active', isGrid);
  gridButton.setAttribute('aria-pressed', isGrid);
  listButton.classList.toggle('active', !isGrid);
  listButton.setAttribute('aria-pressed', !isGrid);
}

// Initialize
document.addEventListener('DOMContentLoaded', getMembers);