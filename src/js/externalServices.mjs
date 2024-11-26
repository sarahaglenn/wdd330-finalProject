const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = 'https://api.spoonacular.com/recipes';

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export async function getRecipesByCategory(category, value) {
  const response = await fetch(baseURL + `/complexSearch?apiKey=${apiKey}&${category}=${value}`);
    const data = await convertToJson(response);
    return data.results;
}

export async function getRecipesByKeyword(keyword, number) {
    const response = await fetch(baseURL + `/autocomplete?apiKey=${apiKey}&number=${number}&query=${keyword}`);
  const data = await convertToJson(response);
    return data;
}

// export async function getRecipeById(id) {
//     const response = await fetch(baseURL + `/apiKey=${apiKey}${id}`);
//   const data = await convertToJson(response);
//     return data;
// }
