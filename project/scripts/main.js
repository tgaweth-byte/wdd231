// main.js - Main JavaScript for home page
// Demonstrates: ES Modules, DOM manipulation, Event handling, Array methods

import { 
    fetchRecipes, 
    createDishCard, 
    createModalContent, 
    trackRecipeView,
    getViewStatistics,
    formatDate,
    saveToLocalStorage,
    getFromLocalStorage
} from './utils.js';

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const featuredDishesContainer = document.getElementById('featuredDishes');
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const categoryCards = document.querySelectorAll('.category-card');

// State
let allRecipes = [];

/**
 * Initialize the page
 */
async function init() {
    setupEventListeners();
    await loadFeaturedDishes();
    displayWelcomeMessage();
}

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Modal close events
    modalClose.addEventListener('click', closeModal);
    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            closeModal();
        }
    });
    
    // Keyboard accessibility for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Category cards click events
    categoryCards.forEach(card => {
        card.addEventListener('click', handleCategoryClick);
    });
}

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
}

/**
 * Load and display featured dishes
 * Demonstrates: Async/await, try-catch, array methods
 */
async function loadFeaturedDishes() {
    try {
        // Show loading state
        featuredDishesContainer.innerHTML = '<div class="loading">Loading delicious recipes...</div>';
        
        // Fetch recipes
        allRecipes = await fetchRecipes();
        
        if (allRecipes.length === 0) {
            featuredDishesContainer.innerHTML = '<p>No recipes available at the moment.</p>';
            return;
        }
        
        // Get 6 random featured dishes using array methods
        const featuredDishes = getRandomDishes(allRecipes, 6);
        
        // Display dishes using map and template literals
        displayDishes(featuredDishes);
        
        // Attach click handlers to dish cards
        attachDishCardHandlers();
        
    } catch (error) {
        console.error('Error loading featured dishes:', error);
        featuredDishesContainer.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
    }
}

/**
 * Get random dishes from array
 * Demonstrates: Array manipulation methods
 * @param {Array} dishes - All dishes
 * @param {number} count - Number of dishes to return
 * @returns {Array} Random dishes
 */
function getRandomDishes(dishes, count) {
    const shuffled = [...dishes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

/**
 * Display dishes in the grid
 * Demonstrates: Array map method, template literals, DOM manipulation
 * @param {Array} dishes - Dishes to display
 */
function displayDishes(dishes) {
    const dishesHTML = dishes
        .map(dish => createDishCard(dish))
        .join('');
    
    featuredDishesContainer.innerHTML = dishesHTML;
}

/**
 * Attach click handlers to all dish cards
 */
function attachDishCardHandlers() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        card.addEventListener('click', handleDishCardClick);
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDishCardClick.call(card, e);
            }
        });
    });
}

/**
 * Handle dish card click to show modal
 * Demonstrates: Event handling, DOM manipulation
 */
function handleDishCardClick(e) {
    const dishId = parseInt(this.getAttribute('data-id'));
    const dish = allRecipes.find(r => r.id === dishId);
    
    if (dish) {
        showModal(dish);
        trackRecipeView(dishId);
    }
}

/**
 * Show modal with dish details
 * @param {Object} dish - Dish object
 */
function showModal(dish) {
    modalBody.innerHTML = createModalContent(dish);
    recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

/**
 * Close modal
 */
function closeModal() {
    recipeModal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Handle category card click
 */
function handleCategoryClick() {
    const category = this.getAttribute('data-category');
    saveToLocalStorage('selectedCategory', category);
    window.location.href = 'recipes.html';
}

/**
 * Display welcome message based on user history
 * Demonstrates: localStorage usage
 */
function displayWelcomeMessage() {
    const stats = getViewStatistics();
    
    // Check if this is a returning visitor
    if (stats.totalViewed > 0) {
        console.log(`Welcome back! You've viewed ${stats.totalViewed} recipes.`);
        console.log(`Last visit: ${formatDate(stats.lastVisit)}`);
    } else {
        console.log('Welcome to Haitian Cuisine Heritage!');
    }
    
    // Update localStorage with current visit
    saveToLocalStorage('lastVisit', new Date().toISOString());
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}