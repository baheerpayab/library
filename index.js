const addBtn = document.getElementById('add-btn');
const deleteModeBtn = document.getElementById('delete-mode');
const deleteOverlay = document.getElementById('delete-overlay');
const themeBtn = document.getElementById('theme');
const root = document.documentElement;

const compactAddBtn = document.getElementById('compact-add-btn');
const compactDeleteModeBtn = document.getElementById('compact-delete-mode');

const noBooksH1 = document.getElementById('no-books-h1');

const modalOverlay = document.getElementById('modal-overlay');
const bookModal = document.getElementById('book-modal');
const bookForm = document.getElementById('book-form');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const statusInput = document.getElementById('status');
const errorMsg = document.getElementById('error-msg');

const bookContainer = document.getElementById('book-container');

const library = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function statusColor(status, button) {
  const bookStatus = button;
  if (status === 'Read') {
    bookStatus.style.backgroundColor = 'var(--status-green)';
  } else {
    bookStatus.style.backgroundColor = 'var(--status-red)';
  }
}

function resetForm() {
  document.getElementById('book-form').reset();
}

function noBooksStatus() {
  if (bookContainer.innerHTML === '') {
    noBooksH1.style.display = 'block';
  } else {
    noBooksH1.style.display = 'none';
  }
}

root.classList = 'light';

function toggleTheme() {
  if (themeBtn.textContent === 'light_mode') {
    themeBtn.textContent = 'dark_mode';
    root.classList = 'dark';
  } else {
    themeBtn.textContent = 'light_mode';
    root.classList = 'light';
  }
}

function toggleBookModal() {
  modalOverlay.classList.toggle('active');
  bookModal.classList.toggle('active');
}

function addNewBook(book) {
  const bookItem = document.createElement('div');
  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('p');
  const bookPages = document.createElement('p');
  const bookStatus = document.createElement('button');
  const bookDeleteFormation = () => {
    const div = document.createElement('div');
    div.classList.add('delete');
    const span = document.createElement('span');
    span.classList.add('material-symbols-rounded', 'delete-icon');
    span.textContent = 'delete';
    div.appendChild(span);
    return div;
  };
  const bookDelete = bookDeleteFormation();

  bookItem.classList.add('book-item');
  bookItem.setAttribute('data-entry', library.length);
  bookTitle.classList.add('book-title');
  bookAuthor.classList.add('book-author');
  bookPages.classList.add('book-pages');
  bookStatus.classList.add('book-status');

  bookTitle.textContent = `${book.title}`;
  bookAuthor.textContent = `${book.author}`;
  bookPages.textContent = `${book.pages}`;
  bookStatus.textContent = `${book.status}`;

  bookContainer.appendChild(bookItem);
  bookItem.appendChild(bookTitle);
  bookItem.appendChild(bookAuthor);
  bookItem.appendChild(bookPages);
  bookItem.appendChild(bookStatus);
  bookItem.appendChild(bookDelete);

  function toggleStatus() {
    const toChange = bookStatus.parentNode.firstChild.textContent;
    const toChangePosition = library.findIndex((x) => x.title === toChange);
    if (bookStatus.textContent === 'Read') {
      bookStatus.textContent = 'Unread';
      statusColor('Unread', bookStatus);
      library[toChangePosition].status = 'Unread';
    } else {
      bookStatus.textContent = 'Read';
      statusColor('Read', bookStatus);
      library[toChangePosition].status = 'Read';
    }
  }

  bookStatus.addEventListener('click', toggleStatus);
  statusColor(book.status, bookStatus);
  noBooksStatus();
  resetForm();
}

function getNewBook(e) {
  e.preventDefault();
  if (library.some((x) => x.title === titleInput.value)) {
    errorMsg.classList.add('active');
    return;
  }
  toggleBookModal();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.value;
  const newBook = new Book(title, author, pages, status);
  library.push(newBook);
  addNewBook(library[library.length - 1]);
  errorMsg.classList.remove('active');
}

function toggleDeleteMode() {
  if (bookModal.classList.contains('active')) {
    return;
  }
  if (bookContainer.innerHTML === '' && deleteModeBtn.textContent === 'delete') {
    return;
  }
  const deleteBtns = document.querySelectorAll('.delete');
  if (deleteModeBtn.textContent === 'delete') {
    addBtn.removeEventListener('click', toggleBookModal);
    compactAddBtn.removeEventListener('click', toggleBookModal);
    deleteModeBtn.textContent = 'check_circle';
    compactDeleteModeBtn.firstChild.textContent = 'check_circle';
    deleteBtns.forEach((btn) => {
      btn.classList.toggle('active');
      btn.addEventListener('click', (e) => {
        const toRemove = e.target.parentNode.parentNode.firstChild.textContent;
        const toRemovePosition = library.findIndex((x) => x.title === toRemove);
        library.splice(toRemovePosition, 1);
        e.target.parentNode.parentNode.remove();
      });
    });
    deleteOverlay.classList.toggle('active');
  } else {
    addBtn.addEventListener('click', toggleBookModal);
    compactAddBtn.addEventListener('click', toggleBookModal);
    deleteModeBtn.textContent = 'delete';
    compactDeleteModeBtn.firstChild.textContent = 'delete';
    deleteBtns.forEach((btn) => {
      btn.classList.toggle('active');
    });
    deleteOverlay.classList.toggle('active');
    noBooksStatus();
  }
}

addBtn.addEventListener('click', toggleBookModal);
deleteModeBtn.addEventListener('click', toggleDeleteMode);
modalOverlay.addEventListener('click', toggleBookModal);
bookForm.addEventListener('submit', getNewBook);
themeBtn.addEventListener('click', toggleTheme);
noBooksStatus();

compactAddBtn.addEventListener('click', toggleBookModal);
compactDeleteModeBtn.addEventListener('click', toggleDeleteMode);
