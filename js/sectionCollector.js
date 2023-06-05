/* eslint-disable no-use-before-define */
// Book class : book presentation

// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI class : handle UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><button class="delete">remove</button></td>
        `;
    list.appendChild(row);
  }

  static deleteBook(ul) {
    if (ul.classList.contains('delete')) {
      ul.parentElement.parentElement.remove();
    }
  }
}

// Store class take care of local storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // event delete you can add
  static removeBook(book) {
    const books = Store.getBooks();
    const index = books.indexOf(book);
    books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();
  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // instantiate book
  const book = new Book(title, author);
  // add book to UI
  UI.addBookToList(book);
  // add book to store
  Store.addBook(book);
  // clear fields
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
});

// Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});

// const removeBTN = document.querySelector('.delete');

// removeBTN.addEventListener('click',() => {
//     // Store.removeBook
//     console.log('remove the book now')
// })