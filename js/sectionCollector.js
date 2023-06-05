// class for book input
class ListBook{
    constructor(title, author){
        this.title = title;
        this.author = author;
    }
}

// UI side : handle UI code and set the output









const list = document.querySelector('#book-list');
const table =  document.createElement('p');

table.innerHTML = `
    <div class="mytable">
        <p>${}</p>
        <p>${}</p>
        <button class="delete"></button>
     </div>
`;
list.appendChild(table)