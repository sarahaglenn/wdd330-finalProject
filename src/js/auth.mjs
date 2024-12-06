import { getLocalStorage, setLocalStorage } from './utils.mjs';
const validUsername = 'testUser123';
const validPassword = '1';

let loginBtn, logoutBtn, favoritesBtn;

export function login(username, password) {
  if (username === validUsername && password === validPassword) {
    setLocalStorage('isLoggedIn', true);
    setLocalStorage('username', username);

    loginBtn = document.querySelector('#login');
    logoutBtn = document.querySelector('#logout');
    favoritesBtn = document.querySelector('#favorites');

    favoritesBtn.className = 'show';
    logoutBtn.className = 'show';
    loginBtn.className = 'hidden';

    const redirect = getLocalStorage('redirectUrl');
    if (redirect) {
      window.location.href = `${redirect}`;
    } else {
      window.location.href = '../index.html';
    }
  } else {
    document.getElementById('error').innerText = 'Invalid username or password. Please try again.';
  }
}

export function checkLogin() {
  if (getLocalStorage('isLoggedIn') === true) return true;
  return false;
}

export function logout() {
  setLocalStorage('isLoggedIn', false);
  localStorage.removeItem('username');

  loginBtn = document.querySelector('#login');
  logoutBtn = document.querySelector('#logout');
  favoritesBtn = document.querySelector('#favorites');

  favoritesBtn.className = 'hidden';
  loginBtn.className = 'show';
  logoutBtn.className = 'hidden';

}

export function loadLoggedInButtons() {
    loginBtn = document.querySelector('#login');
    logoutBtn = document.querySelector('#logout');
    favoritesBtn = document.querySelector('#favorites');

    favoritesBtn.className = 'show';
    logoutBtn.className = 'show';
    loginBtn.className = 'hidden';
}
