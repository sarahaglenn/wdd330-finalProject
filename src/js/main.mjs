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


// Newsletter sign-up dialog elements
const subscribeBtn = document.querySelector('.subscribe');
const signupBox = document.querySelector('.newsletter dialog');
const closeBtn = document.querySelector('.newsletter dialog button');
const submitBtn = document.querySelector('#submitBtn');

// Function to dismiss the dialog when clicking anywhere outside it
const dismiss = ({target:dialogBox}) => {
    if (dialogBox.nodeName === 'DIALOG')
        dialogBox.close('dismiss')
}

// Open the newsletter sign-up dialog
if (submitBtn) {
  subscribeBtn.addEventListener('click', () => {
    signupBox.showModal();
    signupBox.addEventListener('click', dismiss);
  })
};

if (closeBtn) {
  closeBtn.addEventListener('click', () => signupBox.close());
}
// Display a thank you message to confirm subscription
if (submitBtn) {
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const form = signupBox.querySelector('form');
    if (form.checkValidity()) {

      const thanksMsg = document.createElement('p');
      thanksMsg.textContent = `${form.name.value}, thanks for subscribing to the Spice of Life Newsletter!`;
  
      //replace form with the thanks message
      form.replaceWith(thanksMsg);
      // close the dialog after 3 seconds
      setTimeout(() => signupBox.close(), 3000);
    } else {
      form.reportValidity();
    }
  })
};
