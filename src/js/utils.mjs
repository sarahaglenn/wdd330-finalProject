
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadTemplate(path) {
  return async function() {
    const res = await fetch(path);
    if(res.ok) {
      const html = await res.text();
      return html;
   }
  };
}

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = 'true') {
  if (clear) {
    parentElement.innerHTML = '';
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(''));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = 'afterbegin', clear = true) {
  if (clear) {
    parentElement.innerHTML = '';
  }

  const htmlString = await templateFn(data);

  parentElement.insertAdjacentHTML(position, htmlString);
  if (callback) {
    callback(data);
  }

}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate('src/partials/header.html');
  const footerTemplateFn = loadTemplate('src/partials/footer.html');

  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');

  await renderWithTemplate(headerTemplateFn, header);
  await renderWithTemplate(footerTemplateFn, footer);

  return Promise.resolve();
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function createErrorMsg(msg) {
  return `<div class="error-div">
            <p class="error-msg">${msg}<p/>
         <div/>`;
}

export function sortRecipes(recipes, sortBy) {
  const sortedRecipes = [...recipes];
  switch (sortBy) {
    case 'Name A - Z':
      return sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    case 'Name Z - A':
      return sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    // case 'Servings(low to high': recipe data doesn't include servings
    //   return sortedRecipes.sort((a, b) => a.servings - b.servings);
    // case 'Servings(high to low)':
    //   return sortedRecipes.sort((a, b) => b.servings - a.servings);
    default:
      return sortedRecipes;
  }
}

// delay for sorting option changes
export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

