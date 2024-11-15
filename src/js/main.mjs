import { loadHeaderFooter, setLocalStorage } from './utils.mjs';

loadHeaderFooter();

const italianIcon = document.getElementById('italian');
const mexicanIcon = document.getElementById('mexican');
const americanIcon = document.getElementById('american');
const indianIcon = document.getElementById('indian');

const glutenFreeIcon = document.getElementById('glutenFree');
const paleoIcon = document.getElementById('paleo');
const vegetarianIcon = document.getElementById('vegetarian');
const ketoIcon = document.getElementById('keto');

italianIcon.addEventListener('click', () => {
  setLocalStorage('category', 'cuisine')
})

mexicanIcon.addEventListener('click', () => {
  setLocalStorage('category', 'cuisine')
})

americanIcon.addEventListener('click', () => {
  setLocalStorage('category', 'cuisine')
})

indianIcon.addEventListener('click', () => {
  setLocalStorage('category', 'cuisine')
})

glutenFreeIcon.addEventListener('click', () => {
  setLocalStorage('category', 'diet')
})

paleoIcon.addEventListener('click', () => {
  setLocalStorage('category', 'diet')
})

vegetarianIcon.addEventListener('click', () => {
  setLocalStorage('category', 'diet')
})

ketoIcon.addEventListener('click', () => {
  setLocalStorage('category', 'diet')
})
