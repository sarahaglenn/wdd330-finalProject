import { getRecipeById, getSimilarRecipes } from './externalServices.mjs';
import { getParam, setLocalStorage, getLocalStorage, loadHeaderFooter, createErrorMsg } from './utils.mjs';
import { recommendedTemplate } from './templates.mjs';
import { checkLogin, loadLoggedInButtons, logout } from './auth.mjs';

let recipe = {};
setLocalStorage('redirectUrl', window.location.href);
loadHeaderFooter().then(() => {
  if (checkLogin()) loadLoggedInButtons();
  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    logout();
  })
});
const recipeId = getParam('recipe');

if (!getLocalStorage('favorites')) {
  setLocalStorage('favorites', []);
}
let favorites = getLocalStorage('favorites');

recipeDetails(recipeId);

async function recipeDetails(id) {
  recipe = await getRecipeById(id);

  if (recipe) {
    renderRecipeDetails(recipe);
  } else {
    const main = document.querySelector('main');
    const errMsg = createErrorMsg('This recipe is unavailable.')
    main.innerHTML = errMsg;
  }
}

document.getElementById('addToFavorites').addEventListener('click', () => {
  if (!checkLogin()) {
    alert('Please log in to save to favorites.');
    const currentUrl = window.location.href;
    setTimeout(() => {
      window.location.href = `/login/index.html?redirect=${encodeURIComponent(currentUrl)}`
    }, 4000)
  } else {
    addToFavorites(recipeId);
  }
});


function addToFavorites(id) {
  if (!favorites.includes(id)) {
    favorites.push(id);
    setLocalStorage('favorites', favorites);
    alert('Recipe added to favorites!')
  } else {
    alert('This recipe is already in your favorites.')
  }
}

function renderRecipeDetails() {
  document.querySelector('#recipeName').innerText = recipe.title;
  if (recipe.readyInMinutes) document.querySelector('#recipeReadyTime').innerText = `Ready in ${recipe.readyInMinutes} mins`;
  if (recipe.servings) document.querySelector('#recipeServings').innerText = `${recipe.servings} servings`;
  document.querySelector('#recipeImage').src = recipe.image;
  document.querySelector('#recipeImage').alt = recipe.title;
  document.querySelector('#recipeSourceLink').href = recipe.sourceUrl;
  document.querySelector('#recipeSummary').innerHTML = recipe.summary;
  if (recipe.preparationMinutes) document.querySelector('#recipePrepTime').innerText = `Prep time: ${recipe.preparationMinutes} mins`;
  if (recipe.cookingMinutes) document.querySelector('#recipeCookTime').innerText = `Cook time: ${recipe.cookingMinutes} mins`;
  document.querySelector('.ingredients-list').innerHTML = renderIngredients();
  document.querySelector('#recipeInstructions').innerHTML = recipe.instructions;
}

function renderIngredients() {
  let html = '';
  recipe.extendedIngredients.forEach((ingredient) => {
    html += `<li>${ingredient.original}</li>`
  })
  return html;
}

document.addEventListener('DOMContentLoaded', async () => {
  const recommendedEl = document.querySelector('.recommendedRecipes');
  let html = '';
  const recommendedRecipes = await getSimilarRecipes(recipeId, 4);
  recommendedRecipes.forEach((recRecipe) => {
    html += recommendedTemplate(recRecipe);
  })
  recommendedEl.insertAdjacentHTML('beforeend', html);
});
