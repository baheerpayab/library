const addBtn = document.getElementById('add-btn');
const overlay = document.getElementById('overlay');
const bookModal = document.getElementById('book-modal');
const bookForm = document.getElementById('book-form');
const bookContainer = document.getElementById('book-container');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const statusInput = document.getElementById('status');
/* const bookStatusBtns = Array.from(document.querySelectorAll('.book-status')); */
const deleteModeBtn = document.getElementById('delete-mode');
const deleteOverlay = document.getElementById('delete-overlay');

const library = [];
/* let bookCount = library.length - 1; */

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

/* function toggleStatus() {
  if (bookStatusBtn.textContent === 'Read') {
    bookStatusBtn.textContent = 'Unread';
    statusColor('Unread', bookStatusBtn);
  } else {
    bookStatusBtn.textContent = 'Read';
    statusColor('Read', bookStatusBtn);
  }
} */

function toggleBookModal() {
  overlay.classList.toggle('active');
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
    if (bookStatus.textContent === 'Read') {
      bookStatus.textContent = 'Unread';
      statusColor('Unread', bookStatus);
    } else {
      bookStatus.textContent = 'Read';
      statusColor('Read', bookStatus);
    }
  }

  bookStatus.addEventListener('click', toggleStatus);
  statusColor(book.status, bookStatus);
  resetForm();
}

function getNewBook(e) {
  e.preventDefault();
  toggleBookModal();
  const title = titleInput.value;
  const author = authorInput.value;
  const pages = pagesInput.value;
  const status = statusInput.value;
  const newBook = new Book(title, author, pages, status);
  library.push(newBook);
  addNewBook(library[library.length - 1]);
}

function toggleDeleteMode() {
  const deleteBtns = document.querySelectorAll('.delete');
  if (deleteModeBtn.textContent === 'delete') {
    deleteModeBtn.textContent = 'check_circle';
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
    deleteModeBtn.textContent = 'delete';
    deleteBtns.forEach((btn) => {
      btn.classList.toggle('active');
    });
    deleteOverlay.classList.toggle('active');
  }
}

addBtn.addEventListener('click', toggleBookModal);
bookForm.addEventListener('submit', getNewBook);
deleteModeBtn.addEventListener('click', toggleDeleteMode);

/* bookStatusBtns.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button);
    const currentBtn = button;
    if (button.textContent === 'Read') {
      currentBtn.textContent = 'Unread';
      statusColor('Unread', button);
    } else {
      currentBtn.textContent = 'Read';
      statusColor('Read', button);
    }
  });
}); */
