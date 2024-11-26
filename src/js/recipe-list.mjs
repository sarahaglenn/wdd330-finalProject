import { getRecipesByCategory, getRecipesByKeyword } from './externalServices.mjs';
import { getLocalStorage, getParam, loadHeaderFooter, renderListWithTemplate } from './utils.mjs';

loadHeaderFooter();

const searchParam = getParam('keyword');

if (searchParam) {
  const title = document.querySelector('h2');
  title.innerHTML = `Recipes including '${searchParam}'`;
  listRecipesByKeyword('.recipe-list', searchParam);
}

let categoryValue;
const category = getLocalStorage('category');
if (category) {
  categoryValue = getParam(category);
  const title = document.querySelector('h2');
  title.innerHTML = `${categoryValue} Recipes`;
  listRecipesByCategory('.recipe-list');
  localStorage.removeItem('category');
}

async function listRecipesByCategory(selector) {
    const element = document.querySelector(selector);
    let recipes = await getRecipesByCategory(category, categoryValue);

    renderListWithTemplate(recipeCardTemplate, element, recipes);
}

async function listRecipesByKeyword(selector, keyword) {
  const element = document.querySelector(selector);
  let recipes = await getRecipesByKeyword(keyword, 20);
  renderListWithTemplate(recipeCardTemplate, element, recipes);
}

function recipeCardTemplate(recipeData) {
  let imageSrc;
  if (recipeData.Image) {
    imageSrc = recipeData.Image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `</li>
    <li class='recipe-card'>
    <a href="/recipe-details/index.html?recipe=${recipeData.Id}">
    <img src="${imageSrc}"
    alt="${recipeData.title}"
    />
    <h2 class="recipe-name">${recipeData.title}</h2>
    </a>
    </li>
    `;
}

