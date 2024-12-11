import { getLocalStorage, renderListWithTemplate, sortRecipes } from './utils.mjs';
import { getRecipeById } from './externalServices.mjs';
import { recipeCardTemplate } from './templates.mjs';
import { checkLogin } from './auth.mjs';
import { openQuickView } from './recipe-list.mjs';

localStorage.removeItem('category');
if (!checkLogin()) {
  document.querySelector('.favoritesMain').innerHTML = `<p>Unauthorized access. Please log in. </p>`;
}
const name = getLocalStorage('username');
document.querySelector('.favorites').innerHTML = `${name}'s Favorite Recipes`;
let favorites = getLocalStorage('favorites') || [];
let sortBy = 'Name A - Z';
let recipes = [];

async function loadFavorites() {
  for (const recipeId of favorites) {
    const recipe = await getRecipeById(recipeId);
    recipes.push(recipe);
  }
  if (recipes.length === 0) {
    const element = document.querySelector('.recipe-list');
    element.innerHTML = '<p>You don\'t have any saved recipes. Search by name or ingredient and start saving favorites!</p>';
  }
  const sortedRecipes = sortRecipes(recipes, sortBy);
  renderRecipes(sortedRecipes);
}

const sortDropdown = document.getElementById('sort-by');

sortDropdown.addEventListener('change', () => {
  sortBy = sortDropdown.value;
  const sortedRecipes = sortRecipes(recipes, sortBy);
  renderRecipes(sortedRecipes);
});

function renderRecipes(recipeList) {
  const element = document.querySelector('.recipe-list');
  renderListWithTemplate(recipeCardTemplate, element, recipeList);
}
// Quick-view
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('quick-details')) {
    const recipeId = event.target.value;
    openQuickView(recipeId);
  }
  if (event.target.id === 'close-quick-details') {
    const quickView = document.getElementById('quick-view-popup');
    if (quickView) {
      quickView.close();
      quickView.remove();
    }
  }
});
loadFavorites();
