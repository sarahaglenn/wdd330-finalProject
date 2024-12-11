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
  try {
    const response = await fetch(baseURL + `/complexSearch?apiKey=${apiKey}&${category}=${value}`);
    const data = await convertToJson(response);
    return data.results;
  } catch (error) {
    console.error('Error loading recipes by category', error);
    return [];
  }
}

export async function getRecipesByKeyword(keyword, number) {
  try {
    const response = await fetch(baseURL + `/autocomplete?apiKey=${apiKey}&number=${number}&query=${keyword}`);
    const data = await convertToJson(response);
    return data;
  } catch (error) {
    console.error('Error loading recipes by keyword', error);
    return [];
  }
}
export async function getRecipeById(id) {
  try {
    const response = await fetch(baseURL + `/${id}/information?apiKey=${apiKey}`);
    const data = await convertToJson(response);
    return data;
  } catch (error) {
    console.error('Error loading recipes by id', error);
    return [];
  }
}

export async function getSimilarRecipes(id, number) {
  try {
    const response = await fetch(baseURL + `/${id}/similar?apiKey=${apiKey}&number=${number}`);
    const data = await convertToJson(response);
    return data;
  } catch (error) {
    console.error('Error loading similar recipes', error);
    return [];
  }
}
