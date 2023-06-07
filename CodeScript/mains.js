function initializeBookStore() {
  class BookStore {
    constructor() {
      this.books = [];
      this.loadBooksFromStorage();
      this.displayBooks();
      this.setupEventListeners();
    }

    loadBooksFromStorage() {
      const storedBooks = localStorage.getItem('books');
      if (storedBooks) {
        this.books = JSON.parse(storedBooks);
      }
    }

    saveBooksToStorage() {
      localStorage.setItem('books', JSON.stringify(this.books));
    }

    displayBooks() {
      const list = document.querySelector('#book-list');
      list.innerHTML = '';

      this.books.forEach((book, index) => {
        const row = document.createElement('tr');
        row.dataset.id = index; // Assign a unique identifier using the book's index
        row.innerHTML = `
          <td><span id="name">${book.title}</span> by ${book.author}</td>
          <td><button class="delete">remove</button></td>
        `;
        list.appendChild(row);
      });
    }

    addBook(title, author) {
      const book = {
        title,
        author,
      };
      this.books.push(book);
      this.saveBooksToStorage();
      this.displayBooks();
    }

    removeBook(id) {
      this.books.splice(id, 1); // Remove the book using its index
      this.saveBooksToStorage();
      this.displayBooks();
    }

    setupEventListeners() {
      const bookList = document.querySelector('#book-list');

      document.querySelector('#book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.querySelector('#title');
        const authorInput = document.querySelector('#author');
        const title = titleInput.value;
        const author = authorInput.value;
        this.addBook(title, author);
        titleInput.value = '';
        authorInput.value = '';
      });

      bookList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
          const row = e.target.parentElement.parentElement;
          const id = parseInt(row.dataset.id, 10);
          this.removeBook(id);
        }
      });
    }
  }

  const bookStore = new BookStore();
  return bookStore;
}

initializeBookStore();

// Single Page App functionality
const bookSection = document.getElementById('book-container');
const formSection = document.getElementById('form-section');
const contactSection = document.getElementById('contact-section');

const bookBtn = document.getElementById('list-link');
const formBtn = document.getElementById('book-link');
const contactBtn = document.getElementById('contact-link');

// Event listeners to show/hide sections
bookBtn.addEventListener('click', (event) => {
  event.preventDefault();
  bookSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

formBtn.addEventListener('click', (event) => {
  event.preventDefault();
  formSection.classList.remove('hidden');
  bookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

contactBtn.addEventListener('click', (event) => {
  event.preventDefault();
  contactSection.classList.remove('hidden');
  formSection.classList.add('hidden');
  bookSection.classList.add('hidden');
});
