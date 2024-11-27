import { getRecipeById, getSimilarRecipes } from './externalServices.mjs';
import { getParam, setLocalStorage, getLocalStorage, loadHeaderFooter, createErrorMsg } from './utils.mjs';
import { recommendedTemplate } from './templates.mjs';

let recipe = {};
loadHeaderFooter();
const recipeId = getParam('recipe');

recipeDetails(recipeId);

async function recipeDetails(id) {
  recipe = await getRecipeById(id);

  if (recipe != undefined) {
    renderRecipeDetails(recipe);
  } else {
    const main = document.querySelector('main');
    const errMsg = createErrorMsg('This recipe is unavailable.')
    main.innerHTML = errMsg;
  }
}

document.getElementById('addToFavorites').addEventListener('click', addToFavorites);


function addToFavorites() {
  // for now maybe just save to local storage
  //could also create a json and save to it or try to connect database
  
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
