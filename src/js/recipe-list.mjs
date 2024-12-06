import { getRecipeById, getRecipesByCategory, getRecipesByKeyword } from './externalServices.mjs';
import { getLocalStorage, getParam, loadHeaderFooter, renderListWithTemplate, sortRecipes } from './utils.mjs';
import { quickViewTemplate, recipeCardTemplate } from './templates.mjs';
import { checkLogin, loadLoggedInButtons, logout } from './auth.mjs';

loadHeaderFooter().then(() => {
  if (checkLogin()) loadLoggedInButtons();
  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    logout();
  })
});

let sortBy = 'Name A - Z';
let recipes = [];
let sortedRecipes;
const sortDropdown = document.getElementById('sort-by');

sortDropdown.addEventListener('change', () => {
  sortBy = sortDropdown.value;
  sortedRecipes = sortRecipes(recipes, sortBy);
  renderRecipes(sortedRecipes);
});

const searchParam = getParam('keyword');
let categoryValue;
const category = getLocalStorage('category');

if (searchParam) {
  const title = document.querySelector('h2');
  title.innerHTML = `Recipes including '${searchParam}'`;
  loadRecipesByKeyword(searchParam);
} else if (category) {
  categoryValue = getParam(category);
  const title = document.querySelector('h2');
  title.innerHTML = `${categoryValue} Recipes`;
  loadRecipesByCategory();
  localStorage.removeItem('category');
}

async function loadRecipesByCategory() {
  recipes = await getRecipesByCategory(category, categoryValue);
  sortedRecipes = sortRecipes(recipes, sortBy);
  renderRecipes(sortedRecipes);
}

async function loadRecipesByKeyword(keyword) {
  recipes = await getRecipesByKeyword(keyword, 20);
  sortedRecipes = sortRecipes(recipes, sortBy);
  renderRecipes(recipes);
}

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

export async function openQuickView(id) {
  let itemData = await getRecipeById(id);
  const recipeDialog = document.createElement('dialog');
  recipeDialog.id = 'quick-view-popup';
  recipeDialog.innerHTML = quickViewTemplate(itemData);
  const element = document.querySelector('.recipe-list');
  element.appendChild(recipeDialog);
  recipeDialog.showModal();
  recipeDialog.addEventListener('click', (event) => {
    if (event.target === recipeDialog) {
      recipeDialog.close();
      recipeDialog.remove();
    }
  });
}
