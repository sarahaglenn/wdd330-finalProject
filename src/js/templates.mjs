export function recipeCardTemplate(recipeData) {
  let imageSrc;
  if (recipeData.image) {
    imageSrc = recipeData.image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `
    <li class='recipe-card'>
    <a href="/recipe-details/index.html?recipe=${recipeData.id}">
    <img src="${imageSrc}"
    alt="${recipeData.title}"
    />
    <h2 class="recipe-name">${recipeData.title}</h2>
    </a>
    <button class="quick-details" class="quick-details" id="quick-view-btn" value="${recipeData.id}" >Quick View</button>
    </li>
    `;
}

export function quickViewTemplate(recipeData) {
  let imageSrc;
  if (recipeData.image) {
    imageSrc = recipeData.image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `
    <button id="close-quick-details">X</button>
    <h2 id="quick-name">${recipeData.title}</h2>
    <a href="/recipe-details/index.html?recipe=${recipeData.id}">
      <img
        src="${imageSrc}"
        alt="${recipeData.title}"/>
    </a>
    <h4>Ready in ${recipeData.readyInMinutes} minutes</h4>
    <p>${recipeData.summary}</p>
    `;
}

export function recommendedTemplate(recipeData) {
  let imageSrc;
  if (recipeData.Image) {
    imageSrc = recipeData.Image;
  } else imageSrc = `https://spoonacular.com/recipeImages/${recipeData.id}-556x370.${recipeData.imageType}`;
    return `
    <li class='recipe-card' id="recommended">
    <a href="/recipe-details/index.html?recipe=${recipeData.id}">
    <img src="${imageSrc}"
    alt="${recipeData.title}"
    />
    <h4 class="rec-recipe-name">${recipeData.title}</h4>
    </a>
    </li>
    `;
}
