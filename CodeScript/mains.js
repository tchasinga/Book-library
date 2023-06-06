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

      this.books.forEach((book) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td class="getClose">${book.author}</td>
            <hr>
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

    removeBook(title) {
      this.books = this.books.filter((book) => book.title !== title);
      this.saveBooksToStorage();
      this.displayBooks();
    }

    setupEventListeners() {
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

      document.querySelector('#book-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
          const row = e.target.parentElement.parentElement;
          const title = row.querySelector('td:first-child').textContent;
          this.removeBook(title);
        }
      });
    }
  }

  const bookStore = new BookStore();
  return bookStore;
}

initializeBookStore();