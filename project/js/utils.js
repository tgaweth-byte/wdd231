// utils.js - Simplified, no duplicates
export async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

export function saveToLocalStorage(key, data) {
    try { localStorage.setItem(key, JSON.stringify(data)); }
    catch (e) { console.error(e); }
}

export function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) { return null; }
}

export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.getElementById('mainNav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
}

export function createDishCard(dish) {
    return `
        <div class="dish-card" data-id="${dish.id}">
            <div class="dish-image">
                <img src="${dish.mainImage}" 
                     alt="${dish.name} - Traditional Haitian dish"
                     loading="lazy"
                     onerror="this.src='https://via.placeholder.com/400x300/F77F00/FFFFFF?text=${encodeURIComponent(dish.name)}';">
            </div>
            <div class="dish-content">
                <span class="dish-category">${dish.category}</span>
                <h3>${dish.name}</h3>
                <p>${dish.description.substring(0, 110)}${dish.description.length > 110 ? '...' : ''}</p>
                <div class="dish-meta">
                    <span>Prep: ${dish.prepTime}</span>
                    <span>Cook: ${dish.cookTime}</span>
                    <span>${dish.servings} servings</span>
                </div>
            </div>
        </div>
    `;
}

export function createModalContent(dish) {
    const ingredientsList = dish.ingredients.map(ing => `<li>${ing}</li>`).join('');
    return `
        <h2>${dish.name}</h2>
        <span class="dish-category">${dish.category}</span>
        <div class="modal-details">
            <div><strong>Prep:</strong> ${dish.prepTime}</div>
            <div><strong>Cook:</strong> ${dish.cookTime}</div>
            <div><strong>Servings:</strong> ${dish.servings}</div>
            <div><strong>Difficulty:</strong> ${dish.difficulty}</div>
        </div>
        <p>${dish.description}</p>
        <h4>Ingredients</h4>
        <ul>${ingredientsList}</ul>
        <h4>Cultural Significance</h4>
        <p>${dish.cultural}</p>
    `;
}

export function filterRecipes(recipes, category, difficulty) {
    return recipes.filter(r =>
        (category === 'all' || r.category === category) &&
        (difficulty === 'all' || r.difficulty === difficulty)
    );
}

export function trackRecipeView(recipeId) {
    let history = getFromLocalStorage('recipeViewHistory') || [];
    if (!history.includes(recipeId)) {
        history.push(recipeId);
        saveToLocalStorage('recipeViewHistory', history);
    }
}