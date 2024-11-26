// write function to grab value from search input box after click or enter and
// pass in url params
// add this script
// write function to load results (or reuse from recipe-list)
// or include the loading recipe function on the recipe-list.mjs

// checks all clicks then checks if the id of a click matches the target
//    prevents selecting un-loaded dynamic content
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('search-button')) {
    performSearch();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.target.classList.contains('search-input') && event.key === 'Enter') {
    event.preventDefault();
        performSearch();
  }
});

function performSearch() {
  const searchBar = document.getElementById('search-bar');
    const keyword = searchBar.value.trim();
    if (keyword) {
      window.location.href = `../recipe-list/index.html?keyword=${encodeURIComponent(keyword)}`;

    }
    else {
      alert('Please enter a search term.')
      return;
    }
}
