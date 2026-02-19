import { fetchRecipes, createDishCard, createModalContent, trackRecipeView, initMobileMenu } from './utils.js';

const featuredDishesContainer = document.getElementById('featuredDishes');
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');

let allRecipes = [];

async function init() {
    initMobileMenu();
    setupModal();
    await loadFeaturedDishes();
}

function setupModal() {
    modalClose.addEventListener('click', closeModal);
    recipeModal.addEventListener('click', e => { if (e.target === recipeModal) closeModal(); });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && recipeModal.classList.contains('active')) closeModal();
    });
}

async function loadFeaturedDishes() {
    featuredDishesContainer.innerHTML = '<div class="loading">Loading delicious recipes...</div>';
    allRecipes = await fetchRecipes();
    const featured = [...allRecipes].sort(() => 0.5 - Math.random()).slice(0, 6);
    featuredDishesContainer.innerHTML = featured.map(d => createDishCard(d)).join('');

    document.querySelectorAll('.dish-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const dish = allRecipes.find(r => r.id === id);
            if (dish) {
                modalBody.innerHTML = createModalContent(dish);
                recipeModal.classList.add('active');
                trackRecipeView(id);
            }
        });
    });
}

function closeModal() {
    recipeModal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', init);