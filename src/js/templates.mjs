export function recipeCardTemplate(recipeData) {
  console.log(recipeData);
  let imageSrc;
  if (recipeData.Image) {
    imageSrc = recipeData.Image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `
    <li class='recipe-card'>
    <a href="/recipe-details/index.html?recipe=${recipeData.id}">
    <img src="${imageSrc}"
    alt="${recipeData.title}"
    />
    <h2 class="recipe-name">${recipeData.title}</h2>
    </a>
    </li>
    `;
}

export function recommendedTemplate(recipeData) {
  let imageSrc;
  if (recipeData.Image) {
    imageSrc = recipeData.Image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `
    <li class='recipe-card'>
    <a href="/recipe-details/index.html?recipe=${recipeData.id}">
    <img src="${imageSrc}"
    alt="${recipeData.title}"
    />
    <h4 class="recipe-name">${recipeData.title}</h4>
    </a>
    </li>
    `;
}
