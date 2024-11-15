import { getRecipesByCategory } from './externalServices.mjs';
import { getLocalStorage, getParam, renderListWithTemplate } from './utils.mjs';

const category = getLocalStorage('category');
console.log('category is', category);
const value = getParam(category);
const food = getParam('cuisine');
console.log('food is:', food);
console.log('value is', value);
const title = document.querySelector('h2');
title.innerHTML = `${value} Recipes`;

async function listRecipes(selector) {
    const element = document.querySelector(selector);
    let recipes = await getRecipesByCategory(category, value);

    renderListWithTemplate(recipeCardTemplate, element, recipes);
}

function recipeCardTemplate(recipeData) {
    return `</li>
    <li class='recipe-card'>
    <a href="/recipe-details/index.html?recipe=${recipeData.Id}">
    <img src="${recipeData.image}"
    alt="${recipeData.title}"
    />
    <h2 class="recipe-name">${recipeData.title}</h2>
    </a>
    </li>
    `;
}

listRecipes('.recipe-list', value);



