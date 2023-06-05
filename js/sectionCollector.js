// Book class : book presentation

class Book {
    constructor(title, author) {
      this.title = title;
      this.author = author;
    }
  }

// UI class : handle UI tasks
class UI {
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><button class="delete">remove</button></td>
        `;
        list.appendChild(row);
    }

   
}

// Store class take care of local storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

   // event delete you can add
}

// Event : display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);

// Event : add a book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    // prevent actual submit
    e.preventDefault();
    // get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    // instantiate book
    const book = new Book(title,author);
    // add book to UI
    UI.addBookToList(book);
    // add book to store
    Store.addBook(book);
    // clear fields
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
})