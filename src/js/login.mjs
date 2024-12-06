import { getParam, loadHeaderFooter, setLocalStorage } from './utils.mjs';
import { checkLogin, loadLoggedInButtons, login, logout } from './auth.mjs';

loadHeaderFooter().then(() => {
  if (checkLogin()) loadLoggedInButtons();
  const logoutBtn = document.getElementById('logout');
  logoutBtn.addEventListener('click', () => {
    logout();
  })
});

window.onload = () => {
  const redirectUrl = getParam('redirect');
  // const recipeId = getParam('recipe');

  if (redirectUrl) {
    setLocalStorage('redirectUrl', redirectUrl);
  }
  // if (recipeId) {
  //   setLocalStorage('recipeId', recipeId);
  // }
}

const loginBtn = document.getElementById('submitLogin')
loginBtn.addEventListener('click', (event) => {
  event.preventDefault()

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  login(username, password);
})
