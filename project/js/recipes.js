import { fetchRecipes, createDishCard, createModalContent, filterRecipes, trackRecipeView, initMobileMenu, saveToLocalStorage, getFromLocalStorage } from './utils.js';

const recipesGrid = document.getElementById('recipesGrid');
const categoryFilter = document.getElementById('categoryFilter');
const difficultyFilter = document.getElementById('difficultyFilter');
const resetFiltersBtn = document.getElementById('resetFilters');
const recipeCount = document.getElementById('recipeCount');
const noResults = document.getElementById('noResults');
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

let allRecipes = [];

async function init() {
    initMobileMenu();
    await loadRecipes();
    setupFilters();
    applyStoredFilters();
}

async function loadRecipes() {
    allRecipes = await fetchRecipes();
    displayRecipes(allRecipes);
}

function setupFilters() {
    categoryFilter.addEventListener('change', applyFilters);
    difficultyFilter.addEventListener('change', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);

    modalClose.addEventListener('click', closeModal);
    recipeModal.addEventListener('click', e => { if (e.target === recipeModal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) closeModal();
    });
}

function displayRecipes(recipes) {
    if (!recipes.length) {
        noResults.style.display = 'block';
        recipeCount.textContent = '0';
        recipesGrid.innerHTML = '';
        return;
    }
    noResults.style.display = 'none';
    recipeCount.textContent = recipes.length;
    recipesGrid.innerHTML = recipes.map(r => createDishCard(r)).join('');

    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const recipe = allRecipes.find(r => r.id === id);
            if (recipe) {
                modalBody.innerHTML = createModalContent(recipe);
                recipeModal.classList.add('active');
                trackRecipeView(id);
            }
        });
    });
}

function applyFilters() {
    const cat = categoryFilter.value;
    const diff = difficultyFilter.value;
    saveToLocalStorage('filterPreferences', { category: cat, difficulty: diff });
    const filtered = filterRecipes(allRecipes, cat, diff);
    displayRecipes(filtered);
}

function resetFilters() {
    categoryFilter.value = 'all';
    difficultyFilter.value = 'all';
    localStorage.removeItem('filterPreferences');
    displayRecipes(allRecipes);
}

function applyStoredFilters() {
    const saved = getFromLocalStorage('filterPreferences');
    if (saved) {
        categoryFilter.value = saved.category || 'all';
        difficultyFilter.value = saved.difficulty || 'all';
        applyFilters();
    }
}

function closeModal() { recipeModal.classList.remove('active'); }

document.addEventListener('DOMContentLoaded', init);