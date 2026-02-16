// utils.js - Utility functions for the Haitian Cuisine Heritage website

/**
 * Fetch recipes data from JSON file with error handling
 * Demonstrates: Fetch API, async/await, try-catch blocks
 */
export async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

/**
 * Save data to localStorage
 * @param {string} key - Storage key
 * @param {any} data - Data to store
 */
export function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

/**
 * Get data from localStorage
 * @param {string} key - Storage key
 * @returns {any} Parsed data or null
 */
export function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

/**
 * Create a dish card element using template literals
 * Demonstrates: Template literals, DOM manipulation
 * @param {Object} dish - Dish object
 * @returns {string} HTML string
 */
export function createDishCard(dish) {
    return `
        <div class="dish-card" data-id="${dish.id}">
            <div class="dish-image" style="background: linear-gradient(135deg, var(--sunset-orange), var(--primary-red))">
                <img src="https://via.placeholder.com/400x300/F77F00/FFFFFF?text=${encodeURIComponent(dish.name)}" 
                     alt="${dish.name}" 
                     loading="lazy">
            </div>
            <div class="dish-content">
                <span class="dish-category">${dish.category}</span>
                <h3>${dish.name}</h3>
                <p>${dish.description.substring(0, 100)}...</p>
                <div class="dish-meta">
                    <span>⏱️ ${dish.cookTime}</span>
                    <span>👥 ${dish.servings} servings</span>
                    <span>📊 ${dish.difficulty}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create modal content for a dish
 * @param {Object} dish - Dish object
 * @returns {string} HTML string
 */
export function createModalContent(dish) {
    const ingredientsList = dish.ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');

    return `
        <div class="modal-header">
            <h3>${dish.name}</h3>
            <span class="dish-category">${dish.category}</span>
        </div>
        <div class="modal-details">
            <div class="modal-detail">
                <strong>Prep Time:</strong>
                <span>${dish.prepTime}</span>
            </div>
            <div class="modal-detail">
                <strong>Cook Time:</strong>
                <span>${dish.cookTime}</span>
            </div>
            <div class="modal-detail">
                <strong>Servings:</strong>
                <span>${dish.servings} people</span>
            </div>
            <div class="modal-detail">
                <strong>Difficulty:</strong>
                <span>${dish.difficulty}</span>
            </div>
        </div>
        <p>${dish.description}</p>
        <div class="modal-ingredients">
            <h4>Ingredients</h4>
            <ul>${ingredientsList}</ul>
        </div>
        <div class="modal-cultural">
            <h4>Cultural Significance</h4>
            <p>${dish.cultural}</p>
        </div>
    `;
}

/**
 * Filter recipes by category and difficulty
 * Demonstrates: Array filter method
 * @param {Array} recipes - Array of recipe objects
 * @param {string} category - Category filter
 * @param {string} difficulty - Difficulty filter
 * @returns {Array} Filtered recipes
 */
export function filterRecipes(recipes, category, difficulty) {
    return recipes.filter(recipe => {
        const categoryMatch = category === 'all' || recipe.category === category;
        const difficultyMatch = difficulty === 'all' || recipe.difficulty === difficulty;
        return categoryMatch && difficultyMatch;
    });
}

/**
 * Update visited recipes count in localStorage
 * @param {number} recipeId - Recipe ID
 */
export function trackRecipeView(recipeId) {
    const viewHistory = getFromLocalStorage('recipeViewHistory') || [];

    if (!viewHistory.includes(recipeId)) {
        viewHistory.push(recipeId);
        saveToLocalStorage('recipeViewHistory', viewHistory);
    }

    // Update last viewed timestamp
    saveToLocalStorage('lastVisit', new Date().toISOString());
}

/**
 * Get view statistics
 * @returns {Object} Statistics object
 */
export function getViewStatistics() {
    const viewHistory = getFromLocalStorage('recipeViewHistory') || [];
    const lastVisit = getFromLocalStorage('lastVisit');

    return {
        totalViewed: viewHistory.length,
        lastVisit: lastVisit
    };
}

/**
 * Format date for display
 * @param {string} isoDate - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(isoDate) {
    if (!isoDate) return 'Never';

    const date = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options);
}
export function createDishCard(dish) {
    return `
        <div class="dish-card" data-id="${dish.id}">
            <div class="dish-image">
                <img src="${dish.mainImage}" 
                     alt="${dish.name} – Plat haïtien traditionnel"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(dish.name)}';">
            </div>
            <div class="dish-content">
                <span class="dish-category">${dish.category}</span>
                <h3>${dish.name}</h3>
                <p>${dish.description.substring(0, 100)}${dish.description.length > 100 ? '...' : ''}</p>
                <div class="dish-meta">
                    <span>Préparation: ${dish.prepTime}</span>
                    <span>Cuisson: ${dish.cookTime}</span>
                    <span>${dish.servings} pers.</span>
                </div>
            </div>
        </div>
    `;
}