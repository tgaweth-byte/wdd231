// recipes.js - JavaScript for recipes page
// Demonstrates: Array filter method, DOM manipulation, Event handling

import { 
    fetchRecipes, 
    createDishCard, 
    createModalContent,
    filterRecipes,
    trackRecipeView,
    saveToLocalStorage,
    getFromLocalStorage
} from './utils.js';

// DOM Elements
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const recipesGrid = document.getElementById('recipesGrid');
const categoryFilter = document.getElementById('categoryFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const recipeCount = document.getElementById('recipeCount');
const noResults = document.getElementById('noResults');
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

// State
let allRecipes = [];
let filteredRecipes = [];

/**
 * Initialize the recipes page
 */
async function init() {
    setupEventListeners();
    await loadRecipes();
    applyStoredFilters();
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Filter controls
    categoryFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Modal events
    modalClose.addEventListener('click', closeModal);
    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            closeModal();
        }
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
}

/**
 * Load all recipes from JSON
 * Demonstrates: Fetch API with async/await and try-catch
 */
async function loadRecipes() {
    try {
        recipesGrid.innerHTML = '<div class="loading">Loading recipes...</div>';
        
        allRecipes = await fetchRecipes();
        
        if (allRecipes.length === 0) {
            recipesGrid.innerHTML = '<p>No recipes available.</p>';
            return;
        }
        
        filteredRecipes = [...allRecipes];
        displayRecipes(filteredRecipes);
        
    } catch (error) {
        console.error('Error loading recipes:', error);
        recipesGrid.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
    }
}

/**
 * Display recipes in the grid
 * Demonstrates: Array map method, template literals, DOM manipulation
 * @param {Array} recipes - Recipes to display
 */
function displayRecipes(recipes) {
    if (recipes.length === 0) {
        recipesGrid.innerHTML = '';
        noResults.style.display = 'block';
        recipeCount.textContent = '0';
        return;
    }
    
    noResults.style.display = 'none';
    
    // Use map to create HTML for each recipe
    const recipesHTML = recipes
        .map(recipe => createDishCard(recipe))
        .join('');
    
    recipesGrid.innerHTML = recipesHTML;
    recipeCount.textContent = recipes.length;
    
    // Attach event listeners to cards
    attachCardHandlers();
}

/**
 * Attach click handlers to recipe cards
 */
function attachCardHandlers() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    // Use forEach to iterate through cards
    dishCards.forEach(card => {
        card.addEventListener('click', handleCardClick);
        
        // Keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick.call(card, e);
            }
        });
    });
}

/**
 * Handle recipe card click
 */
function handleCardClick() {
    const recipeId = parseInt(this.getAttribute('data-id'));
    const recipe = allRecipes.find(r => r.id === recipeId);
    
    if (recipe) {
        showModal(recipe);
        trackRecipeView(recipeId);
    }
}

/**
 * Show modal with recipe details
 * @param {Object} recipe - Recipe object
 */
function showModal(recipe) {
    modalBody.innerHTML = createModalContent(recipe);
    recipeModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    recipeModal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Apply filters to recipes
 * Demonstrates: Array filter method
 */
function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedDifficulty = difficultyFilter.value;
    
    // Save filter preferences to localStorage
    saveToLocalStorage('filterPreferences', {
        category: selectedCategory,
        difficulty: selectedDifficulty
    });
    
    // Filter recipes using the utility function
    filteredRecipes = filterRecipes(allRecipes, selectedCategory, selectedDifficulty);
    
    displayRecipes(filteredRecipes);
}

/**
 * Reset all filters
 */
function resetFilters() {
    categoryFilter.value = 'all';
    difficultyFilter.value = 'all';
    
    // Clear localStorage
    localStorage.removeItem('filterPreferences');
    localStorage.removeItem('selectedCategory');
    
    filteredRecipes = [...allRecipes];
    displayRecipes(filteredRecipes);
}

/**
 * Apply stored filter preferences
 * Demonstrates: localStorage usage
 */
function applyStoredFilters() {
    // Check if user came from category card on home page
    const selectedCategory = getFromLocalStorage('selectedCategory');
    
    if (selectedCategory) {
        categoryFilter.value = selectedCategory;
        localStorage.removeItem('selectedCategory'); // Clear after use
        applyFilters();
        return;
    }
    
    // Otherwise, check for stored filter preferences
    const filterPrefs = getFromLocalStorage('filterPreferences');
    
    if (filterPrefs) {
        categoryFilter.value = filterPrefs.category || 'all';
        difficultyFilter.value = filterPrefs.difficulty || 'all';
        applyFilters();
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}