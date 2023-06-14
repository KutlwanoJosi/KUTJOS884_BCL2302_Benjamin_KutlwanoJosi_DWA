import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

// Function to create a book preview element
function createBookPreviewElement({ author, id, image, title }) {
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  element.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  return element;
}

// Function to render book previews
function renderBookPreviews() {
  const bookSlice = matches.slice(0, BOOKS_PER_PAGE);

  for (const book of bookSlice) {
    const element = createBookPreviewElement(book);
    starting.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(starting);
}

// Render initial book previews
renderBookPreviews();

// Function to create genre option elements
function createGenreOptionElements() {
  const genreHtml = document.createDocumentFragment();
  const firstGenreElement = document.createElement('option');
  firstGenreElement.value = 'any';
  firstGenreElement.innerText = 'All Genres';
  genreHtml.appendChild(firstGenreElement);

  for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genreHtml.appendChild(element);
  }

  return genreHtml;
}

// Render genre options
document.querySelector('[data-search-genres]').appendChild(createGenreOptionElements());

// Function to create author option elements
function createAuthorOptionElements() {
  const authorsHtml = document.createDocumentFragment();
  const firstAuthorElement = document.createElement('option');
  firstAuthorElement.value = 'any';
  firstAuthorElement.innerText = 'All Authors';
  authorsHtml.appendChild(firstAuthorElement);

  for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
  }

  return authorsHtml;
}

// Render author options
document.querySelector('[data-search-authors]').appendChild(createAuthorOptionElements());

// Function to set theme based on user preference
function setTheme() {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDarkMode ? 'night' : 'day';
  const colorDark = prefersDarkMode ? '255, 255, 255' : '10, 10, 20';
  const colorLight = prefersDarkMode ? '10, 10, 20' : '255, 255, 255';

  document.querySelector('[data-settings-theme]').value = theme;
  document.documentElement.style.setProperty('--color-dark', colorDark);
  document.documentElement.style.setProperty('--color-light', colorLight);
}

// Set theme
setTheme();

// Function to update list button and remaining count
function updateListButton() {
  const remainingCount = matches.length - (page * BOOKS_PER_PAGE);
  const showMoreText = (remainingCount > 0) ? `Show more (${remainingCount})` : 'Show more';

  document.querySelector('[data-list-button]').innerText = showMoreText;
  document.querySelector('[data-list-button]').disabled = (remainingCount > 0);
}

// Update list button and remaining count
updateListButton();

// Function to handle cancel button click for search overlay
function handleSearchCancelClick() {
  document.querySelector('[data-search-overlay]').open = false;
}

// Function to handle cancel button click for settings overlay
function handleSettingsCancelClick() {
  document.querySelector('[data-settings-overlay]').open = false;
}

// Function to handle search button click in header
function handleHeaderSearchClick() {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
}

// Function to handle settings button click in header
function handleHeaderSettingsClick() {
  document.querySelector('[data-settings-overlay]').open = true;
}

// Function to handle form submit for settings
function handleSettingsFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  const colorDark = (theme === 'night') ? '255, 255, 255' : '10, 10, 20';
  const colorLight = (theme === 'night') ? '10, 10, 20' : '255, 255, 255';

  document.documentElement.style.setProperty('--color-dark', colorDark);
  document.documentElement.style.setProperty('--color-light', colorLight);
  document.querySelector('[data-settings-overlay]').open = false;
}

// Function to handle form submit for search
function handleSearchFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const result = [];

  for (const book of books) {
    let genreMatch = filters.genre === 'any';

    for (const singleGenre of book.genres) {
      if (genreMatch) break;
      if (singleGenre === filters.genre) {
        genreMatch = true;
      }
    }

    if (
      (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.author === 'any' || book.author === filters.author) &&
      genreMatch
    ) {
      result.push(book);
    }
  }

  page = 1;
  matches = result;

  const listMessage = document.querySelector('[data-list-message]');
  if (result.length < 1) {
    listMessage.classList.add('list__message_show');
  } else {
    listMessage.classList.remove('list__message_show');
  }

  document.querySelector('[data-list-items]').innerHTML = '';
  const newItems = document.createDocumentFragment();
  for (const book of result.slice(0, BOOKS_PER_PAGE)) {
    const element = createBookPreviewElement(book);
    newItems.appendChild(element);
  }
  document.querySelector('[data-list-items]').appendChild(newItems);
  document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1;
  updateListButton();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  document.querySelector('[data-search-overlay]').open = false;
}

// Function to handle list button click
function handleListButtonClick() {
  const fragment = document.createDocumentFragment();
  const start = page * BOOKS_PER_PAGE;
  const end = (page + 1) * BOOKS_PER_PAGE;

  for (const book of matches.slice(start, end)) {
    const element = createBookPreviewElement(book);
    fragment.appendChild(element);
  }

  document.querySelector('[data-list-items]').appendChild(fragment);
  page += 1;
}

// Function to handle click event on book previews
function handleBookPreviewClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      active = books.find(book => book.id === node.dataset.preview);
    }
  }

  if (active) {
    document.querySelector('[data-list-active]').open = true;
    document.querySelector('[data-list-blur]').src = active.image;
    document.querySelector('[data-list-image]').src = active.image;
    document.querySelector('[data-list-title]').innerText = active.title;
    document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    document.querySelector('[data-list-description]').innerText = active.description;
  }
}

// Function to create a book preview element
function createBookPreviewElement(book) {
  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', book.id);

  element.innerHTML = `
    <img
      class="preview__image"
      src="${book.image}"
    />
  
    <div class="preview__info">
      <h3 class="preview__title">${book.title}</h3>
      <div class="preview__author">${authors[book.author]}</div>
    </div>
  `;

  return element;
}

// Function to update the list button and remaining count
function updateListButton() {
  const remainingCount = matches.length - (page * BOOKS_PER_PAGE);
  const buttonText = (remainingCount > 0) ? `Show more (${remainingCount})` : 'Show more';
  const listButton = document.querySelector('[data-list-button]');
  listButton.innerText = buttonText;

  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(remainingCount > 0) ? remainingCount : 0})</span>
  `;
}

// Event listeners
document.querySelector('[data-search-cancel]').addEventListener('click', handleSearchCancelClick);
document.querySelector('[data-settings-cancel]').addEventListener('click', handleSettingsCancelClick);
document.querySelector('[data-header-search]').addEventListener('click', handleHeaderSearchClick);
document.querySelector('[data-header-settings]').addEventListener('click', handleHeaderSettingsClick);
document.querySelector('[data-settings-form]').addEventListener('submit', handleSettingsFormSubmit);
document.querySelector('[data-search-form]').addEventListener('submit', handleSearchFormSubmit);
document.querySelector('[data-list-button]').addEventListener('click', handleListButtonClick);
document.querySelector('[data-list-items]').addEventListener('click', handleBookPreviewClick);

// Initial setup
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;
updateListButton();
